export interface AboutUsFeatureCard {
  icon?: string;
  title: string;
  content: string;
}

export interface AboutUsIconOption {
  id: string;
  iconClass: string;
  label: string;
}

export const ABOUT_US_CARD_ICONS: readonly AboutUsIconOption[] = [
  { id: 'truck', iconClass: 'bi-truck', label: 'Envíos Rápidos / Nacionales' },
  { id: 'shield-check', iconClass: 'bi-shield-check', label: 'Garantía y Seguridad' },
  { id: 'headset', iconClass: 'bi-headset', label: 'Atención Personalizada 24/7' },
  {
    id: 'arrow-counterclockwise',
    iconClass: 'bi-arrow-counterclockwise',
    label: 'Cambios y Devoluciones',
  },
  { id: 'patch-check', iconClass: 'bi-patch-check', label: 'Calidad Certificada' },
  { id: 'leaf', iconClass: 'bi-leaf', label: 'Sustentabilidad y Eco-friendly' },
  { id: 'credit-card', iconClass: 'bi-credit-card', label: 'Medios de Pago y Cuotas' },
  { id: 'lightning-charge', iconClass: 'bi-lightning-charge', label: 'Despacho Inmediato' },
  { id: 'tag', iconClass: 'bi-tag', label: 'Precios Justos y Ofertas' },
  { id: 'bullseye', iconClass: 'bi-bullseye', label: 'Nuestra Misión' },
  { id: 'star', iconClass: 'bi-star', label: 'Opiniones y Calificaciones' },
  { id: 'lock', iconClass: 'bi-lock', label: 'Compra 100% Protegida' },
  { id: 'box-seam', iconClass: 'bi-box-seam', label: 'Empaque Seguro' },
  { id: 'people', iconClass: 'bi-people', label: 'Comunidad / Equipo Local' },
  { id: 'heart', iconClass: 'bi-heart', label: 'Pasión y Cuidado' },
];

export interface AboutUsData {
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImageUrl: string;

  centralTitle: string;
  centralImageUrl: string;
  centralDescription: string;

  cardsSectionTitle: string;
  featureCards: AboutUsFeatureCard[];
}
