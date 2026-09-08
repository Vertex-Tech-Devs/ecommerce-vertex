import type { HeaderFontPreset } from '@core/models/store-config.model';

export interface FontPresetItem {
  id: HeaderFontPreset;
  name: string;
  category: string;
  fontFamily: string;
}

export const FONT_PRESETS: FontPresetItem[] = [
  {
    id: 'system',
    name: 'Predeterminada',
    category: 'Sistema',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  {
    id: 'inter',
    name: 'Inter',
    category: 'Moderna',
    fontFamily: "'Inter', sans-serif",
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'Versátil',
    fontFamily: "'Montserrat', sans-serif",
  },
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'Redondeada',
    fontFamily: "'Poppins', sans-serif",
  },
  {
    id: 'raleway',
    name: 'Raleway',
    category: 'Sofisticada',
    fontFamily: "'Raleway', sans-serif",
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    category: 'Editorial',
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  {
    id: 'dancing-script',
    name: 'Dancing Script',
    category: 'Cursiva',
    fontFamily: "'Dancing Script', cursive",
  },
  {
    id: 'bebas-neue',
    name: 'Bebas Neue',
    category: 'Urbana',
    fontFamily: "'Bebas Neue', sans-serif",
  },
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    category: 'Elegante',
    fontFamily: "'Cormorant Garamond', serif",
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    category: 'Clásica',
    fontFamily: "'Cinzel', serif",
  },
  {
    id: 'tenor-sans',
    name: 'Tenor Sans',
    category: 'Minimalista',
    fontFamily: "'Tenor Sans', sans-serif",
  },
  {
    id: 'quicksand',
    name: 'Quicksand',
    category: 'Amigable',
    fontFamily: "'Quicksand', sans-serif",
  },
  {
    id: 'comfortaa',
    name: 'Comfortaa',
    category: 'Lúdica',
    fontFamily: "'Comfortaa', cursive",
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk',
    category: 'Tech',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  {
    id: 'oswald',
    name: 'Oswald',
    category: 'Condensada',
    fontFamily: "'Oswald', sans-serif",
  },
];

export interface AnnouncementPreset {
  id: string;
  category: 'Envíos' | 'Financiación' | 'Promociones' | 'Lanzamientos';
  emoji: string;
  label: string;
  text: string;
  suggestedLink?: string;
  badge?: string;
}

export const ANNOUNCEMENT_PRESETS: AnnouncementPreset[] = [
  {
    id: 'free-shipping-national',
    category: 'Envíos',
    emoji: '🚚',
    label: 'Envío País +$100k',
    text: '🚚 ¡Envío gratis a todo el país en compras superiores a $100.000!',
    suggestedLink: '/catalog',
    badge: 'Popular',
  },
  {
    id: 'free-shipping-mendoza',
    category: 'Envíos',
    emoji: '🚚',
    label: 'Gran Mendoza',
    text: '🚚 ¡Envío gratis a todo el Gran Mendoza!',
    suggestedLink: '/catalog',
    badge: 'Local',
  },
  {
    id: 'installments-3',
    category: 'Financiación',
    emoji: '💳',
    label: '3 Cuotas',
    text: '💳 3 cuotas sin interés con todas las tarjetas bancarias',
    badge: 'Finanzas',
  },
  {
    id: 'installments-3-6',
    category: 'Financiación',
    emoji: '💳',
    label: '3 y 6 Cuotas',
    text: '💳 3 y 6 cuotas sin interés con todas las tarjetas bancarias',
  },
  {
    id: 'transfer-discount',
    category: 'Financiación',
    emoji: '💵',
    label: '15% OFF Transferencia',
    text: '💵 15% de descuento abonando por transferencia o efectivo',
  },
  {
    id: 'season-clearance',
    category: 'Promociones',
    emoji: '🔥',
    label: 'Liquidación',
    text: '🔥 LIQUIDACIÓN: Hasta 40% OFF en productos seleccionados',
    suggestedLink: '/catalog',
    badge: 'Oferta',
  },
  {
    id: 'new-collection',
    category: 'Lanzamientos',
    emoji: '✨',
    label: 'Nueva Colección',
    text: '✨ ¡Nueva colección disponible! Descubrí los ingresos exclusivos',
    suggestedLink: '/catalog',
  },
  {
    id: 'flash-countdown',
    category: 'Promociones',
    emoji: '⏳',
    label: 'Flash Sale',
    text: '⏳ ¡Últimas horas! 20% OFF extra con cupón FLASH20',
    badge: 'Flash',
  },
];

export interface QuickRoutePreset {
  label: string;
  path: string;
  icon: string;
}

export const QUICK_ROUTE_PRESETS: QuickRoutePreset[] = [
  { label: 'Catálogo', path: '/catalog', icon: 'bi-grid' },
  { label: 'Nosotros', path: '/about', icon: 'bi-info-circle' },
  { label: 'Carrito', path: '/cart', icon: 'bi-cart' },
];

export interface WhatsAppMessagePreset {
  label: string;
  message: string;
  icon: string;
}

export const WHATSAPP_MESSAGE_PRESETS: WhatsAppMessagePreset[] = [
  {
    label: 'Consulta General',
    message: '¡Hola! Tengo una consulta sobre los productos de la tienda.',
    icon: 'bi-chat-dots',
  },
  {
    label: 'Stock y Envíos',
    message: '¡Hola! Quería consultar disponibilidad de stock y costos de envío.',
    icon: 'bi-box-seam',
  },
  {
    label: 'Pagos y Cuotas',
    message: '¡Hola! Me gustaría consultar por transferencias y cuotas disponibles.',
    icon: 'bi-credit-card',
  },
];
