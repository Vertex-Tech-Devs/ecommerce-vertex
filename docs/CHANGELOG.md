# CHANGELOG — Storefront & Backoffice (`ecommerce-vertex`)

Todas las notas de cambios notables para la plantilla y panel de administración de tiendas.

---

## [0.9.3] - 2026-09-16

### 🐛 Correcciones y Mejoras
- **fix(seo):** Added static Open Graph and Twitter Card baseline metadata in `index.html` and implemented modern `SeoService` with signals/inject to support WhatsApp and social preview unfurling.
- **fix(about):** Made banner title optional in "Nosotros" management form and refined storefront banner to conditionally render text overlay/scrim for clean photography.
- **fix(catalog):** Resolved accessibility WCAG blockers on filter inputs (replaced `display: none` with `.visually-hidden`), fixed skeleton/card CLS with `aspect-ratio: 1 / 1`, added reset filters button to empty state, and purified signal reactivity without `toObservable()` round-trips.

---

## [0.8.0] - 2026-09-01

### ✨ Características Principales
- **Reorganización Integral del Sidebar**: Menú lateral administrativo compacto y segmentado en 5 bloques semánticos (Principal, Catálogo, Ventas, Diseño & Contenido, Ajustes del Negocio).
- **Humanización del Backoffice**: Reemplazo de tecnicismos por terminología de negocios clara y adición de subtítulos de ayuda (`text-muted small`) en formularios.
- **Flujo Real de Mercado Pago**: Eliminación de bypass y simulaciones mock; integración directa con la API de Mercado Pago con fallback automático a credenciales de prueba en desarrollo.
- **Pantalla de Mantenimiento y Actualización (`DeployingState`)**: Componente standalone profesional para capturar transitorios de redespliegue y evitar pantallas en blanco o errores no controlados.
- **Estandarización de Encabezados en Vistas de Detalle**: Header responsivo con botón circular de retorno y títulos con truncamiento seguro en productos, pedidos y clientes.

### 🐛 Correcciones y Mejoras
- **Resiliencia en Checkout**: Agregado timeout defensivo de 2s en `pruneUnavailableItems()` para evitar bloqueos por microcortes en listeners de Firestore.
- **Sanitización Recursiva de Pedidos**: Limpieza de valores `undefined` antes de persistir documentos en Firestore con `cleanFirestoreData()`.
- **Automatización de Dependencias**: Configurado workflow `dependabot-automerge.yml` para actualizar dependencias menores y parches automáticamente tras verificar Quality Gates.

---

## [0.7.0] - 2026-08-30
- Soporte para productos simples sin variantes con generación automática de variante base.
- Motor de rubros comerciales con 21 presets y selector modular `RubroSelector`.
- Integración de notificaciones transaccionales concurrentes para comprador y vendedor.
