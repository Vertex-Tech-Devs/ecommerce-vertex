import { z } from 'zod';

export const StoreConfigSchema = z
  .object({
    id: z.string().optional(),
    tenantId: z.string().default('').catch(''),
    storeId: z.string().default('white-label-store').catch('white-label-store'),
    storeName: z.string().default('Mi Tienda').catch('Mi Tienda'),
    tagline: z.string().default('').catch(''),
    logoUrl: z.string().default('').catch(''),
    faviconUrl: z.string().default('').catch(''),
    colors: z
      .object({
        primary: z.string().default('#ea580c').catch('#ea580c'),
        accent: z.string().default('#ef4444').catch('#ef4444'),
        background: z.string().default('#ffffff').catch('#ffffff'),
      })
      .default({
        primary: '#ea580c',
        accent: '#ef4444',
        background: '#ffffff',
      }),
    payments: z
      .object({
        mercadoPagoPublicKey: z.string().default('').catch(''),
        mercadoPago: z
          .object({
            publicKey: z.string().optional(),
            accessTokenSecret: z.string().optional(),
            accessTokenMasked: z.string().optional(),
            accountEmail: z.string().optional(),
            validationStatus: z.string().optional(),
          })
          .optional(),
      })
      .default({
        mercadoPagoPublicKey: '',
      }),
    contact: z
      .object({
        phone: z.string().default('').catch(''),
        email: z.string().default('').catch(''),
        whatsApp: z.string().default('').catch(''),
        instagram: z.string().default('').catch(''),
        facebook: z.string().default('').catch(''),
      })
      .default({
        phone: '',
        email: '',
        whatsApp: '',
        instagram: '',
        facebook: '',
      }),
    seo: z
      .object({
        metaDescription: z.string().default('').catch(''),
      })
      .default({
        metaDescription: '',
      }),
    setupCompleted: z.boolean().default(true).catch(true),
    updatedAt: z.any().optional().nullable(),
    createdAt: z.any().optional().nullable(),

    // Configuración de emails (editable desde /admin/store-config)
    storeOwnerEmail: z.string().optional(),
    notificationEmail: z.string().optional(),
    emailSenderName: z.string().optional(),
    emailSignature: z.string().optional(),
    features: z.any().optional(),
    strapline: z.string().optional().nullable(),
    currency: z.string().optional().nullable(),
    currencySymbol: z.string().optional().nullable(),
    country: z.string().optional().nullable(),

    // Legacy compatibility fields
    contactPhone: z.string().optional(),
    contactEmail: z.string().optional(),
    socialInstagramUrl: z.string().optional(),
    socialFacebookUrl: z.string().optional(),
    socialWhatsAppUrl: z.string().optional(),
    copyrightText: z.string().optional(),
  })
  .passthrough();
