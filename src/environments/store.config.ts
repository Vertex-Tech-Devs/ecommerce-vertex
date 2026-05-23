import type { StoreConfig } from '../app/core/models/store-config.model';

export const STORE_CONFIG: Omit<StoreConfig, 'id'> = {
  storeName: '',
  strapline: '',
  logoUrl: '',
  contact: { email: '', phone: '', whatsapp: '' },
  seo: { metaTitle: '', metaDescription: '' },
  features: {
    reviewsEnabled: false,
    wishlistEnabled: false,
    blogEnabled: false,
  },
  payments: {
    mercadoPago: {
      publicKey: '',
      accessToken: '',
      accessTokenSecret: 'mp-access-token',
      accessTokenMasked: '',
      webhookUrl: '',
      validationStatus: 'pending',
      validationMessage: '',
    },
  },
  currency: 'ARS',
  currencySymbol: '$',
  country: 'AR',
  createdAt: new Date(),
};
