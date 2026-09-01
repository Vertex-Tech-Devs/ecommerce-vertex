import { z } from 'zod';

export const HeaderFontPresetSchema = z.enum([
  'system',
  'inter',
  'montserrat',
  'poppins',
  'raleway',
  'playfair',
  'dancing-script',
  'bebas-neue',
  'cormorant',
  'cinzel',
  'tenor-sans',
  'quicksand',
  'comfortaa',
  'space-grotesk',
  'oswald',
]);
export type HeaderFontPreset = z.infer<typeof HeaderFontPresetSchema>;

export const HeaderAppearanceConfigSchema = z.object({
  backgroundColor: z.string().default('#ffffff').catch('#ffffff'),
  textColor: z.string().default('#1f2937').catch('#1f2937'),
  accentColor: z.string().default('#000000').catch('#000000'),
  fontFamily: HeaderFontPresetSchema.default('system').catch('system'),
});
export type HeaderAppearanceConfig = z.infer<typeof HeaderAppearanceConfigSchema>;

export const StoreAppearanceConfigSchema = z.object({
  header: HeaderAppearanceConfigSchema.default({
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#000000',
    fontFamily: 'system',
  }),
});
export type StoreAppearanceConfig = z.infer<typeof StoreAppearanceConfigSchema>;

export const StoreConfigSchema = z
  .object({
    id: z.string().optional(),
    tenantId: z.string().default('').catch(''),
    storeId: z.string().default('white-label-store').catch('white-label-store'),
    storeName: z.string().default('Mi Tienda').catch('Mi Tienda'),
    tagline: z.string().default('').catch(''),
    logoUrl: z.string().optional().default('').catch(''),
    faviconUrl: z.string().default('').catch(''),
    brandDisplayMode: z.enum(['text', 'logo', 'both']).optional().default('text').catch('text'),
    announcementBar: z
      .object({
        enabled: z.boolean().default(false).catch(false),
        text: z.string().default('').catch(''),
        link: z.string().optional(),
        backgroundColor: z.string().optional(),
        textColor: z.string().optional(),
      })
      .optional(),
    floatingWhatsApp: z
      .object({
        enabled: z.boolean().default(false).catch(false),
        phoneNumber: z.string().optional(),
        defaultMessage: z.string().optional(),
      })
      .optional(),
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
    appearance: StoreAppearanceConfigSchema.optional(),
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
