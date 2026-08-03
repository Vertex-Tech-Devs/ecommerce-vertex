# Seguridad — Storefront (ecommerce-vertex)

## 1. Autenticación (Google OAuth)

- Acceso al panel `/admin` **solo con Google OAuth** (`signInWithPopup` + `GoogleAuthProvider`).
- `AuthService.loginWithGoogle()` refresca el token (`getIdTokenResult(true)`) para obtener los custom claims y sincroniza vía callable `refreshMyAdminClaim` si es necesario.
- Claims relevantes: `tenantId` (== `storeId`), `admin`, `role` (`owner`/`admin`), `superAdmin`, `platformAdmin`.
- Errores capturados y notificados de forma amigable (`auth.service.ts` + `login.component.ts`):
  - `permission-denied`, `wrong-tenant`, `auth/unauthorized-domain`, `auth/popup-blocked`,
    `auth/popup-closed-by-user`, `auth/invalid-continue-uri`, `auth/redirect-uri-mismatch`, `redirect_uri_mismatch`.

## 2. Reglas de Firestore (`firestore.rules`)

### Lectura pública (catálogo)

```js
match /products/{productId}      { allow read: if true; ... }   // + subcolección variants
match /categories/{categoryId}   { allow read: if true; ... }
match /attributes/{attributeId}  { allow read: if true; ... }
match /configuracion/{docId}     { allow read: if true; ... }   // store_/footer_/hero_ (branding público)
match /store_payments/{storeId}  { allow read: if isStoreAdmin(storeId); ... }  // PRIVADO
match /banners/{docId}           { allow read: if true; ... }
match /pages/{docId}             { allow read: if true; ... }
```

> **Nota**: los datos de pago (`payments.mercadoPago`) viven en el doc **privado** `store_payments/{storeId}` (solo admin), nunca en el doc público `configuracion/store_{storeId}`.

### Escritura de administradores (aislada por tienda)

```js
function isStoreAdmin(storeId) {
  return isAuthenticated() && (
    isSuperAdmin() ||
    (request.auth.token.get('admin', false) == true && request.auth.token.get('tenantId', '') == storeId) ||
    exists(/databases/$(database)/documents/admin_roles/$(storeId + '_' + request.auth.token.email)) &&
    role in ['owner', 'admin']
  );
}

allow write: if isStoreAdmin(request.resource.data.storeId);
```

### Colecciones transaccionales

| Colección          | Regla                                                                                                                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orders`           | público `get` (guest checkout); `create` público **solo con forma válida** (`status == 'pending'`, `items ≤ 100`, `stockDecremented == false`); `list` requiere `admin` + `request.query.get('storeId') == token.tenantId`; `update`/`delete` admin |
| `clients`          | `get`/`list` solo admin (filtro `storeId`); `write: false`                                                                                                                                                                                          |
| `reviews`          | `read` público; `create` con `userId == auth.uid`; update/delete autor o admin                                                                                                                                                                      |
| `settings`, `mail` | solo admin (filtro `storeId` en list)                                                                                                                                                                                                               |
| `admin_roles`      | lectura solo si el `compositeId` pertenece al `tenantId` del token; escritura `false` (solo Admin SDK)                                                                                                                                              |

**Catch-all**: `allow read, write: if false;` — cualquier ruta no declarada queda denegada.

## 3. Firebase Storage (`storage.rules`)

```js
function isStoreAdmin() {
  return request.auth != null && (
    request.auth.token.get('superAdmin', false) == true ||
    request.auth.token.get('platformAdmin', false) == true ||
    request.auth.token.get('admin', false) == true
  );
}

allow read: if true;   // imágenes públicas
allow create, update: if isStoreAdmin()
  && request.resource.size < 5 * 1024 * 1024
  && request.resource.contentType.matches('image/(jpeg|png|webp)');
allow delete: if isStoreAdmin();
```

### Validación en cliente (`image-validation.service.ts`)

- MIME permitido: `image/jpeg`, `image/png`, `image/webp`.
- Tamaño máximo: **5MB**.
- Resolución mínima 1200×675 y aspect ratio 16:9 (±5%) para hero.

### Borrado limpio (evitar archivos huérfanos)

- `StorageService.deleteFileByUrl(url)` → `deleteObject` sobre el bucket de Firebase.
- Se invoca al **borrar un producto** (`ProductService.deleteProduct` limpia `image` + `images[]`) y al **reemplazar imágenes** en `about-us` / `home-content`.

## 4. Buenas Prácticas Aplicadas

- **Principio de mínimo privilegio**: lecturas públicas solo para las 6 colecciones de catálogo; todo lo demás admin.
- **Aislamiento por `storeId`**: ninguna query cruza tiendas (filtro `storeId` en todos los servicios y reglas).
- **Secretos**: tokens de pago en Secret Manager; en Firestore solo referencias y valores enmascarados.
- **Auditoría**: el plano de control registra acciones en `auditLog` (ver `platform/docs/`).
- **Validación de reglas en CI**: el repo `vertex-platform` valida la estructura de reglas en modo standalone (`validate-firestore-rules.ts`).
