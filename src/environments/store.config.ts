import type { StoreConfig } from '../app/core/models/store-config.model';

export const STORE_CONFIG: Omit<StoreConfig, 'id'> = {
  storeName: 'Mi Tienda',
  strapline: 'Tu tienda online',
  logoUrl: '',
  contact: { email: '', phone: '', whatsapp: '' },
  seo: { metaTitle: 'Mi Tienda', metaDescription: 'Bienvenido a mi tienda online.' },
  features: {
    reviewsEnabled: false,
    wishlistEnabled: false,
    blogEnabled: false,
  },
  currency: 'ARS',
  currencySymbol: '$',
  country: 'AR',
  createdAt: new Date(),
};
