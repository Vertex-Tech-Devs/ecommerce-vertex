# Universal Agent Rules — Storefront (`ecommerce-vertex`)

This file contains instructions for AI agents and developers working on the Storefront repository.

---

## 🏗️ Arquitectura

- **Framework**: Angular 22+ (Standalone components, Signals, Clean Naming architecture, `@angular/build`)
- **Backend**: Firebase Cloud Functions v2 (TypeScript)
- **DB**: Cloud Firestore (multi-tenant, un proyecto Firebase por tienda)
- **Auth**: Firebase Auth — Google OAuth únicamente en `/admin`
- **Multi-tenancy**: El `tenantId` se inyecta en runtime; `firebase-config.json` es el archivo
  que diferencia cada shard/tienda. El `APP_INITIALIZER` bloquea el render hasta resolver la config.
- **Contratos compartidos**: `@vertex/contracts` consumido desde `file:./packages/shared-contracts`

### Rutas principales

| Ruta           | Acceso                | Descripción                      |
| -------------- | --------------------- | -------------------------------- |
| `/shop`        | Público               | Tienda visible para todos        |
| `/admin`       | Solo admin autorizado | Panel de backoffice de la tienda |
| `/admin/login` | Público               | Login Google OAuth               |

---

## 💻 Comandos de desarrollo

```bash
npm start                  # Dev server en puerto 4201
npm run lint               # ESLint
npm run typecheck          # TypeScript strict check
npm run test:ci            # Tests unitarios headless (280 specs)
npm run build              # Build producción (@angular/build)
npm run build:dev          # Build desarrollo
npm run e2e                # Cypress headless
npm run e2e:open           # Cypress interactivo

# Versioning (ejecutar en main o develop antes del merge a main)
npm run release:patch      # 0.5.0 → 0.5.1
npm run release:minor      # 0.5.0 → 0.6.0
npm run release:major      # 0.5.0 → 1.0.0
```

---

## 🔄 Git Flow & PR Governance

- Ramas permanentes: `develop` (dev) y `main` (prod)
- Feature branches: `feat/*`, `fix/*`, `chore/*` desde `develop`
- Direct push a `develop`/`main` **bloqueado** por server-side rules
- Bypass Husky local (solo cuando hay problemas de deps):
  ```bash
  HUSKY=0 git push origin branch-name
  ```

---

## 🔢 Versionado del Template

El storefront es el **template de tienda** versionado semánticamente (Semver).
Versión actual: `0.5.0`

| Tipo de cambio                     | Comando                 |
| ---------------------------------- | ----------------------- |
| Bugfix / ajuste visual             | `npm run release:patch` |
| Nueva feature                      | `npm run release:minor` |
| Breaking change en modelo de datos | `npm run release:major` |

**Flujo al hacer release:**

1. `npm run release:minor` → bump, commit, tag, push automático
2. CI `release.yml` crea GitHub Release y notifica a `vertex-platform`
3. `vertex-platform` abre PR automático para actualizar `CURRENT_TEMPLATE_VERSION`

---

## 📖 Regla de Oro: Mantenimiento Obligatorio de Documentación

**Toda tarea, bugfix, cambio de infraestructura o evolución arquitectónica DEBE mantener la documentación sincronizada antes de darse por finalizada.**

1. **Actualización Inmediata**: Al modificar flujos, reglas, modelos o CI/CD, actualizar de inmediato los documentos correspondientes (`agent.md`, `README.md`, y `.agents/AGENTS.md` en la raíz).
2. **Cero Desincronización**: Las versiones en la documentación deben coincidir con `package.json`.
3. **Documentación como Criterio de Aceptación (DoD)**: Un PR o desarrollo NO se considera terminado si no incluye la actualización de su respectiva documentación técnica y operacional.

---

## 💳 Flujo de Pagos, Carrito y Gestión de Stock (Mercado Pago)

### 1. Preservación del Carrito
- El carrito en `localStorage` **NO se vacía** al redirigir al checkout de Mercado Pago.
- Se vacía **únicamente** cuando el cliente navega a la pantalla de confirmación exitosa (`/shop/order-confirmation/:id`).
- Si el usuario cancela o regresa desde Mercado Pago sin pagar, el storefront lo redirige a `/shop/cart`, detecta el retorno sin pago, muestra una notificación informativa y **mantiene los productos en el carrito** para que no pierda su selección.

### 2. Ciclo de Vida del Stock
- **Reserva Inicial**: Al invocar `createPaymentPreference`, la Cloud Function decrementa de forma atómica el stock de la variante (`FieldValue.increment(-quantity)`) y registra `stockDecremented: true` en la orden (`status: 'processing'`).
- **Pago Aprobado**: El webhook `mercadoPagoWebhookHandler` recibe `status: 'approved'`, confirma el pago y la orden pasa a procesarse definitivamente.
- **Pago Cancelado o Rechazado**: El webhook ejecuta `revertStockOnFailure(orderId)`, revirtiendo mediante transacción el stock exacto a cada variante y marcando la orden como `cancelled`.
- **Abandono / Expiración de Pago**: La Cloud Function programada `cleanupExpiredOrders` corre cada 60 minutos, busca órdenes `processing` expiradas (`mercadopago_expiration_date <= now`) sin pago confirmado y devuelve el stock al inventario automáticamente.

### 3. Logs de Consola de Terceros en Checkout (Mercado Pago)
- Al interactuar con el iframe o la redirección de Mercado Pago, la consola del navegador puede registrar eventos de `TrackBuilder`, `Armor` (sistema antifraude de Mercado Libre), o avisos internos de CSP (`script-src 'nonce...'`) emitidos por el dominio `mercadopago.com.ar` / `mercadolibre.com`.
- Estos logs provienen de los scripts de la pasarela y cumplen con el estándar **PCI-DSS**. No exponen credenciales ni interfieren con el correcto funcionamiento de Vertex.

---

## 🚀 Ciclo de Vida de Canales de Preview Efímeros (PR Previews)

- **Despliegue y Sembrado Automático**: Cada PR hacia `develop` compila contra el shard de desarrollo (`build:dev-template`), despliega un canal efímero en Firebase Hosting y ejecuta `scripts/seed-pr-tenant.ts` generando productos con catálogo, imágenes, combinaciones completas de variantes (talles/colores) y stock real.
- **Retorno Dinámico**: Las URLs de retorno (`back_urls`) de Mercado Pago se calculan dinámicamente usando el origen de la preview activa (`https://ecommerce-vertex-dev--pr-XXX.web.app`).
- **Destrucción y Notificación Automática**: Al cerrar o mergear el PR, `preview-cleanup.yml`:
  1. Elimina el canal en Firebase Hosting (devuelve 404).
  2. Borra los documentos generados en Firestore (`vtx-pr-XXX`).
  3. Publica un comentario en el PR (`🗑️ Instancia de Preview Eliminada`).
  4. Elimina automáticamente la rama remota de GitHub.

---

## 🧹 Política de Higiene del Repositorio (Clean Repo Policy)

- **Archivos Prohibidos en Git**: No commitear carpetas locales de IDEs (`.antigravitycli/`, `.gemini/`, `.claude/`, `.cursor/`), logs (`firestore-debug.log`, `firebase-debug.log`, `*.log`), credenciales `.env`, ni datos locales de emuladores (`emulator-data/`).
- **Verificación**: Siempre verificar con `git status` y `.gitignore` antes de hacer commit.

---

## 🛡️ Reglas de código

- **Cero hardcoding**: no IDs de proyectos Firebase, colores ni textos de marca en componentes
- **Anti-FOUC**: `APP_INITIALIZER` debe bloquear render hasta resolver config de tenant
- **Signals**: exponer como `asReadonly()`, mutar solo desde métodos explícitos
- **Errores**: degradar con `SweetAlertService`, nunca silenciar ni crashear el layout
- **Confirmación destructiva**: toda acción de eliminación debe usar el modal de confirmación existente
- **Patrón de Estados de Carga & Empty States en Admin**:
  * Prohibido emitir arrays vacíos prematuramente (`startWith([])` o `BehaviorSubject([])`) que causan parpadeos (flashing) de 100ms.
  * Usar `isLoading = signal(true)` manejado mediante operadores `tap` / `finalize` / `catchError` en el stream observable.
  * Los templates del panel de administración deben usar control flow mutuamente excluyente:
    `@if (isLoading()) { <skeleton> } @else if (items$ | async; as items) { @if (items.length === 0) { <empty-state> } @else { <table/grid> <pagination> } }`
  * Prohibido superponer loading spinners y skeletons simultáneamente.
- **Clean Naming Architecture**:
  * Nombres de archivos directos sin sufijo `.component` (`home.ts`, `catalog.ts`, `cart.ts`, etc.).
  * Clases de componentes limpias (`Home`, `Catalog`, `Cart`, `Checkout`, `StoreConfig`, etc.).
  * Modelos de datos aliasados limpiamente en caso de colisión (`ProductModel`, `StoreConfigData`, `CartModel`).
- **Zero Vulnerabilities & Safe Overrides**:
  * Todo el árbol de dependencias debe mantener `npm audit: 0 vulnerabilities`.
  * Toda vulnerabilidad transitiva se mitiga mediante la sección `overrides` en `package.json`.

---

## 🔥 Firebase / Firestore

- Colección principal: `stores/{tenantId}/...`
- Reglas de seguridad: ver `firestore.rules`
- Nunca leer `admin_roles` directamente desde cliente; usar Cloud Functions callable
- Acceso multi-tenant: validado por `tenantId` en claims del token

---

## ⚠️ Errores comunes y soluciones

| Error                                                  | Causa                                          | Solución                                      |
| ------------------------------------------------------ | ---------------------------------------------- | --------------------------------------------- |
| `auth/operation-not-allowed`                           | Google OAuth no habilitado en Firebase Console | Habilitar en Authentication > Sign-in methods |
| `auth/popup-closed-by-user`                            | COOP header omitido o desconfigurado           | Garantizar `Cross-Origin-Opener-Policy: same-origin-allow-popups` en `firebase.json` |
| `7 PERMISSION_DENIED` en `createPaymentPreference`     | SA de Cloud Run 2da Gen sin rol datastore.user | `ensureShardProjectIam` asigna automáticamente `roles/datastore.user` a la SA del Compute Engine en el shard |
| `permission-denied` en Firestore                       | Email no en `admin_roles`                      | Agregar vía Cloud Function o plataforma       |
| `Cannot read properties of undefined (hasOwnProperty)` | Problema de DI en Angular con lazy loading     | Revisar barrel imports y providers            |
