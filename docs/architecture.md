# Arquitectura — Storefront (ecommerce-vertex)

## Visión General

`ecommerce-vertex` es la **plantilla maestra de tienda** que Vertex Solutions provisiona para cada cliente. Contiene dos aplicaciones Angular en un mismo proyecto:

- **Storefront público (`/shop`)**: catálogo, carrito, checkout con Mercado Pago.
- **Panel de administración (`/admin`)**: gestión de productos, categorías, atributos, órdenes, clientes, contenido (home/about/footer), configuración de tienda, emails y staff.

## Estructura

```
storefront/
├── src/                          # Aplicación Angular 22 (standalone components)
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/         # ProductService, OrderService, ClientService, StoreConfigService,
│   │   │   │                     # FooterService, HomeContentService, AboutUsService, AttributeService,
│   │   │   │                     # CategoryService, FirestoreService, StorageService, AuthService, ...
│   │   │   ├── utils/            # tenant.ts (tenantPath, storeDocId, storeIdFilter, resolveTenantId)
│   │   │   ├── constants/        # seed-orders.constants.ts, seed-products.constants.ts
│   │   │   ├── models/           # Tipos y esquemas (Product, Order, Client, StoreConfig, ...)
│   │   │   └── guards/           # admin.guard, checkout.guard, dev.guard, owner.guard
│   │   ├── features/
│   │   │   ├── shop/             # Tienda pública (catalog, product-detail, cart, checkout)
│   │   │   └── admin/            # Panel admin (dashboard, products, orders, clients, home, store-config, login)
│   │   └── app.config.ts         # APP_INITIALIZER → StoreConfigService.loadConfig()
│   ├── environments/             # tenantId por entorno (dev-template, development, production)
│   └── styles/                   # SCSS global + variables
├── functions/src/                # Cloud Functions v2 (TypeScript)
│   ├── payment.functions.ts      # createPaymentPreference, mercadoPagoWebhookHandler, validación credenciales
│   ├── product.functions.ts      # onVariantStockChange (denormalización de stock)
│   ├── client.functions.ts       # onOrderCreateUpdateClients
│   ├── notifications.functions.ts# emails de pedido (plantillas por tienda)
│   ├── cleanup.functions.ts      # limpieza de órdenes expiradas (TTL)
│   ├── role.functions.ts         # sincronización de custom claims (admin_roles → claims)
│   ├── staff.functions.ts        # getAdminStaff / upsertAdminStaff / revokeAdminStaff
│   └── core/                     # config.ts (collectionPath/singletonDoc), mercadopago.service.ts, modelos Zod
├── firestore.rules               # Reglas de seguridad (público catálogo + admin)
├── storage.rules                 # Reglas de Firebase Storage (público lectura + admin MIME/5MB)
├── firestore.indexes.json        # Índices compuestos
└── cypress/ + integration-tests/ # E2E / integración
```

## Aislamiento Multi-Tenant

- `resolveTenantId()` resuelve el `storeId` activo: `environment.tenantId` → hostname (`{slug}-vtx` / `vtx-{slug}`) → query param (no-prod) → localStorage.
- `tenantPath(col)` devuelve la **colección plana** (sin namespace).
- `storeIdFilter()` = `where('storeId', '==', resolveTenantId())` aplicado en **todas** las consultas de catálogo/transaccionales.
- `storeDocId(base)` = `base_{storeId}` para los docs singleton (`store_`, `footer_`, `hero_`, `home_`, `aboutUs_`, `emailTemplates_`).

## Servicios Clave (`core/services`)

| Servicio                                                  | Responsabilidad                                                                            | Tenant |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------ |
| `FirestoreService<T>`                                     | CRUD genérico flat con `storeIdFilter()` en lecturas y `storeId` en creates                | ✅     |
| `ProductService`                                          | Productos + variantes (batch), stock, y **limpieza de imágenes en Storage al borrar**      | ✅     |
| `OrderService` / `ClientService`                          | Órdenes y clientes (cliente keyed `{storeId}_{email}`)                                     | ✅     |
| `StoreConfigService`                                      | `configuracion/store_{storeId}` vía `APP_INITIALIZER`; inyecta colores/tema en CSS `:root` | ✅     |
| `FooterService` / `HomeContentService` / `AboutUsService` | `footer_{storeId}`, `banners/home_{storeId}`, `pages/aboutUs_{storeId}`                    | ✅     |
| `StorageService`                                          | Upload con progreso y `deleteFileByUrl` (borrado de objetos)                               | —      |
| `ImageValidationService`                                  | Validación de imágenes: MIME `jpeg/png/webp`, ≤5MB, 16:9, resolución mínima                | —      |
| `AuthService`                                             | Google OAuth, claims `tenantId`/`admin`, errores tipados OAuth                             | ✅     |

## Cloud Functions (flat)

- Todas las funciones usan **colecciones planas** (`collectionPath` / `singletonDoc`).
- Los triggers escuchan rutas planas: `orders/{orderId}`, `products/{productId}/variants/{variantId}`.
- El `storeId` se lee del campo `storeId` de cada documento (no de un segmento de path).
- `mercadopago.service.ts` lee la configuración en `configuracion/store_{storeId}` y el token desde Secret Manager.

## Clean Naming Architecture & Build Tooling

- **Estandarización de Archivos**: Todos los componentes prescinden de sufijos redundantes `.component.*` (`<nombre>.ts`, `<nombre>.html`, `<nombre>.scss`, `<nombre>.spec.ts`).
- **Clases Limpias**: Se utilizan clases directas (`Home`, `Catalog`, `Product`, `Checkout`, `Cart`, `Admin`, `StoreConfig`, `Sidebar`, etc.).
- **Build System**: `@angular/build:application` y `@angular/build:karma` (esbuild/Vite) sustituyen los builders legacy Webpack, reduciendo los bundles de 1.71 MB a 1.10 MB.
- **Zero Vulnerabilities**: Todo el árbol de dependencias audita con **0 vulnerabilidades** en `npm audit` mediante `overrides` seguros.

## Ciclo de Vida del Template

1. La plataforma provisiona la tienda y despliega este template vía GitHub Actions.
2. El storefront lee `configuracion/store_{storeId}` en el arranque (`APP_INITIALIZER`) y aplica branding/tema.
3. El admin del cliente se autentica con Google OAuth (claims sincronizados por `role.functions.ts`).
4. Versionado SemVer (`release:patch|minor|major`) + `CURRENT_TEMPLATE_VERSION` en la plataforma.

Ver [README.md](../README.md) para inicio rápido y [security.md](security.md) para el modelo de seguridad.
