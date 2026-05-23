export interface StoreContact {
  email: string;
  phone: string;
  whatsapp: string;
  address?: string;
  instagram?: string;
  facebook?: string;
}

export interface StoreSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface StoreFeatureFlags {
  reviewsEnabled: boolean;
  wishlistEnabled: boolean;
  blogEnabled: boolean;
}

export interface StoreMercadoPagoConfig {
  publicKey: string;
  accessToken: string;
  webhookUrl: string;
  validationStatus?: 'pending' | 'valid' | 'invalid';
  validationMessage?: string;
  validatedAt?: Date | string;
}

export interface StorePayments {
  mercadoPago: StoreMercadoPagoConfig;
}

export interface StoreConfig {
  id?: string;
  storeName: string;
  strapline: string;
  logoUrl: string;
  faviconUrl?: string;
  contact: StoreContact;
  seo: StoreSeo;
  features: StoreFeatureFlags;
  payments: StorePayments;
  currency: string;
  currencySymbol: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const DEFAULT_STORE_CONFIG: Omit<StoreConfig, 'id'> = {
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
