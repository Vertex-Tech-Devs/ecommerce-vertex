# Changelog — Storefront (`ecommerce-vertex`)

Todos los cambios notables en este proyecto serán documentados en este archivo.
El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [0.8.0] - 2026-09-02

### 🧪 Calidad, Testing & Quality Gates
- **Quality Gate Obligatorio ≥95% (100% Ideal)**: Se estableció un umbral mínimo estricto del **95%** en las 4 métricas de cobertura (`statements`, `branches`, `functions`, `lines`) en todo el template de storefront.
- **Git Hooks Bloqueantes (`pre-commit` y `pre-push`)**: Hooks locales con Husky y script `verify-coverage.js` que rechazan automáticamente commits y pushes si la cobertura es menor al 95%.
- **Suite de Tests Unitarios Exhaustiva**:
  - **750 tests unitarios** pasando al 100% con Jasmine / Karma headless.
  - Verificación estricta de cobertura con exclusiones focalizadas en el builder `@angular/build`.

### 🧭 Backoffice Modular & Sidebar Accordion (`/admin`)
- **Arquitectura de 6 Grupos Modulares**:
  1. 📊 **Principal**: Dashboard (`/admin/dashboard`)
  2. 📦 **Catálogo**: Productos (`/admin/products`), Categorías (`/admin/categories`), Atributos (`/admin/attributes`)
  3. 🛒 **Ventas**: Pedidos (`/admin/orders`), Clientes (`/admin/customers`)
  4. 📍 **Puntos de Venta**: Sucursales & Retiro (`/admin/branches`)
  5. 🎨 **Tienda Online**: Encabezado & Anuncios (`/admin/header-management`), Portada & Banners (`/admin/home-management`), Pie de Página (`/admin/footer-management`), Páginas de Contenido (`/admin/about-management`)
  6. ⚙️ **Configuración**: Identidad & Marca (`/admin/store-config`), Notificaciones Email (`/admin/email-management`), Panel Dev (`/admin/_dev`)
- **Auto-expansión Inteligente**: El sidebar expande automáticamente el grupo correspondiente a la ruta activa y resalta el enlace con feedback visual.

### 💳 Checkout, Carrito & Notificaciones Transaccionales
- **Preservación del Carrito**: El carrito en `localStorage` se preserva al redirigir a Mercado Pago y solo se vacía al completar la compra en `/shop/order-confirmation/:id`.
- **Reserva Atómica de Stock**: Soporte universal para productos simples y variantes con decremento atómico y restitución automática por webhook ante cancelaciones.
- **Comprobantes Imprimibles**: Vista optimizada para impresión semántica del voucher de pedido (`window.print()`).
- **Notificaciones Multi-Tenant**: Notificación pública segura HTTPS `notifyOrderConfirmation` para comprador y vendedor sin problemas de audience OAuth.
