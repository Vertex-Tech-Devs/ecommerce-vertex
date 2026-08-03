# Universal Agent Rules — Storefront (`ecommerce-vertex`)

This file contains instructions for AI agents and developers working on the Storefront repository.

---

## 🏗️ Arquitectura

- **Framework**: Angular 20+ (Standalone components, Signals)
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
npm run test:ci            # Tests unitarios headless
npm run build              # Build producción
npm run build:dev          # Build desarrollo
npm run e2e                # Cypress headless
npm run e2e:open           # Cypress interactivo

# Versioning (ejecutar en main o develop antes del merge a main)
npm run release:patch      # 0.1.0 → 0.1.1
npm run release:minor      # 0.1.0 → 0.2.0
npm run release:major      # 0.1.0 → 1.0.0
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

## 🛡️ Reglas de código

- **Cero hardcoding**: no IDs de proyectos Firebase, colores ni textos de marca en componentes
- **Anti-FOUC**: `APP_INITIALIZER` debe bloquear render hasta resolver config de tenant
- **Signals**: exponer como `asReadonly()`, mutar solo desde métodos explícitos
- **Errores**: degradar con `SweetAlertService`, nunca silenciar ni crashear el layout
- **Confirmación destructiva**: toda acción de eliminación debe usar el modal de confirmación existente

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
| `permission-denied` en Firestore                       | Email no en `admin_roles`                      | Agregar vía Cloud Function o plataforma       |
| `Cannot read properties of undefined (hasOwnProperty)` | Problema de DI en Angular con lazy loading     | Revisar barrel imports y providers            |
