# Changelog — ecommerce-vertex (storefront)

## [0.9.1] - 2026-09-11

### Fixed
- Soporte extendido para imágenes HEIC/HEIF y manejo seguro de errores no controlados en subidas a Storage.
- Corrección de tamaño y espaciado de badge en tiempo real en encabezado móvil de anuncios en el panel admin.
- Priorización de imagen primaria en la lista de productos del panel de administración.

## [0.9.0] - 2026-09-09

### Added
- Conversión HEIC/HEIF → WebP en navegador (punto único `StorageService.uploadFile`).
- Borrado de clientes y pedidos por admins de tienda con confirmación, auditoría (`admin_audit`) y restock automático.
- Estados finales de orden claros y regeneración de preferencias vencidas en webhook MP.

### Refactored
- `storage.service` con `startUpload` + pipeline HEIC lazy (import dinámico `heic2any`).

### Fixed
- Deliverabilidad de correos transaccionales (From SMTP autenticado, SPF/DKIM).
- Deducción atómica de inventario (isPaid/stockDecremented idempotentes) y estados `CANCELLED_UNPAID` para rechazadas/abandonadas.

### Changed
- Registro de clientes en el shard desde el webhook; fail-fast anti-master en resolución de tokens MP.
