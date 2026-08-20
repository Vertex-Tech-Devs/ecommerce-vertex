export interface StorePickupLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  schedule: string; // Ej: "Lun a Vie 09:00 a 18:00 hs"
  notes?: string; // Ej: "Presentar DNI y número de pedido"
  enabled: boolean;
}

export interface DeliveryMethodConfig {
  enableStorePickup: boolean;
  enableHomeDelivery: boolean;
  homeDeliveryDescription?: string; // Ej: "Coordinamos el envío y costo por WhatsApp"
  pickupLocations: StorePickupLocation[];
}

export const DEFAULT_DELIVERY_METHOD_CONFIG: DeliveryMethodConfig = {
  enableStorePickup: false,
  enableHomeDelivery: true,
  homeDeliveryDescription: 'Coordinamos el envío y costo por WhatsApp',
  pickupLocations: [],
};

export interface StoreConfig {
  readonly tenantId: string;
  storeId: string;
  storeName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
  };
  payments: {
    mercadoPagoPublicKey: string;
    mercadoPago?: {
      publicKey?: string;
      accessTokenSecret?: string;
      accessTokenMasked?: string;
      accountEmail?: string;
      validationStatus?: string;
    };
  };
  contact: {
    phone: string;
    email: string;
    whatsApp: string;
    instagram: string;
    facebook: string;
  };
  seo: {
    metaDescription: string;
  };
  setupCompleted: boolean;

  // Métodos de entrega
  deliveryMethods?: DeliveryMethodConfig;

  // Configuración de emails (editable desde /admin/store-config)
  storeOwnerEmail?: string;
  notificationEmail?: string;
  emailSenderName?: string;
  emailSignature?: string;

  // Legacy compatibility fields
  contactPhone?: string;
  contactEmail?: string;
  socialInstagramUrl?: string;
  socialFacebookUrl?: string;
  socialWhatsAppUrl?: string;
  copyrightText?: string;
}

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  tenantId: 'white-label-store',
  storeId: 'white-label-store',
  storeName: 'Mi Tienda Online',
  tagline: 'Tu tienda de moda de marca blanca',
  logoUrl: '',
  faviconUrl: '',
  colors: {
    primary: '#ea580c',
    accent: '#ef4444',
    background: '#ffffff',
  },
  payments: {
    mercadoPagoPublicKey: '',
  },
  contact: {
    phone: '',
    email: '',
    whatsApp: '',
    instagram: '',
    facebook: '',
  },
  seo: {
    metaDescription: 'Bienvenido a nuestra tienda online.',
  },
  setupCompleted: false,
  deliveryMethods: DEFAULT_DELIVERY_METHOD_CONFIG,
};
