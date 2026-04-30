export interface StoreTheme {
  primaryColor: string;
  primaryHoverColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}

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
  seedDataEnabled: boolean;
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
  theme: StoreTheme;
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
  theme: {
    primaryColor: '#ea580c',
    primaryHoverColor: '#fb923c',
    secondaryColor: '#4f46e5',
    accentColor: '#ef4444',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  contact: { email: '', phone: '', whatsapp: '' },
  seo: { metaTitle: 'Mi Tienda', metaDescription: 'Bienvenido a mi tienda online.' },
  features: {
    seedDataEnabled: true,
    reviewsEnabled: false,
    wishlistEnabled: false,
    blogEnabled: false,
  },
  currency: 'ARS',
  currencySymbol: '$',
  country: 'AR',
  createdAt: new Date(),
};
