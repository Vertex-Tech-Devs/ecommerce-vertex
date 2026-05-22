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

export interface StoreConfig {
  id?: string;
  storeName: string;
  strapline: string;
  logoUrl: string;
  faviconUrl?: string;
  contact: StoreContact;
  seo: StoreSeo;
  features: StoreFeatureFlags;
  currency: string;
  currencySymbol: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const DEFAULT_STORE_CONFIG: Omit<StoreConfig, 'id'> = {
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
