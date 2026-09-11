# ecommerce-vertex — Estado del proyecto (corte 0.9.0)

> Documento vivo para futuros chats. Ver también `vertex-platform/PROJECT_STATUS.md`.

## ✅ Definitivo y funcional
- **Pagos/órdenes**: creación `PENDING_PAYMENT` sin stock; descuento atómico SOLO en webhook `approved`; rechazadas/canceladas → `CANCELLED_UNPAID`; preferencias vencidas regeneradas; `notification_url` con `tenant`+`projectId`; webhook tolerante a IAM (usa token real del shard).
- **Clientes**: registro en shard desde webhook (dashboard funcional) + backfill.
- **Emails**: remitente SMTP autenticado (no spam); templates institucionales.
- **Super admin/admins**: purga por tienda, borrado puntual cliente/pedido con `admin_audit` y restock.
- **Imágenes**: HEIC/HEIF → WebP en `StorageService` (único punto, lazy `heic2any`).
- **Admin de tienda**: botón eliminar cliente y pedido en lista y en detalle de cliente (admins y super admins).

## 🔲 Pendiente / deuda
- Validar galerías/logos/banners que no pasen por `StorageService.uploadFile` y llamen a `prepareUploadFile` cuando reciban HEIC.
- Suite: `npm test` (797) y functions (19) verdes con coverage ≥95%: no tocar specs sin correrlas.

## Referencia de producción
- Funciones/hosting desplegados por CI en `main`; tiendas reales entregadas: `kasakalle`, `vidrios-emilia`.

## ✅ Cierre master 0.9.0+ (sync)
- HEIC/HEIF → WebP, borrado con auditoría, estados `CANCELLED_UNPAID`, reconciliación por shard, mails desde cuenta autenticada. Todo en verde y sincronizado (0 divergencia).

## 🔲 Deuda técnica residual (no bloqueante)
- Validación HEIC en galerías/logos heredados que no pasen por `StorageService.uploadFile` (pendiente de barrido visual).


## 📦 Release: 0.9.1 (Producción)
- Versión cerrada y taggeada **v0.9.1**.