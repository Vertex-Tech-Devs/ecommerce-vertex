import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import type { DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import type { StoreConfig } from '@core/models/store-config.model';
import { environment } from '../../../environments/environment';
import { z } from 'zod';

export const StoreConfigSchema = z.object({
  tenantId: z.string(),
  storeId: z.string(),
  storeName: z.string(),
  tagline: z.string(),
  logoUrl: z.string(),
  faviconUrl: z.string(),
  colors: z.object({
    primary: z.string(),
    accent: z.string(),
    background: z.string(),
  }),
  payments: z.object({
    mercadoPagoPublicKey: z.string(),
  }),
  contact: z.object({
    phone: z.string(),
    email: z.string(),
    whatsApp: z.string(),
    instagram: z.string(),
    facebook: z.string(),
  }),
  seo: z.object({
    metaDescription: z.string(),
  }),
  setupCompleted: z.boolean(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  socialInstagramUrl: z.string().optional(),
  socialFacebookUrl: z.string().optional(),
  socialWhatsAppUrl: z.string().optional(),
  copyrightText: z.string().optional(),
});

@Injectable({ providedIn: 'root' })
export class StoreConfigService {
  private firestore = inject(Firestore);

  private readonly _storeConfig = signal<StoreConfig | null>(null);
  readonly storeConfig = this._storeConfig.asReadonly();

  readonly storeName = computed(() => this.storeConfig()?.storeName ?? 'Mi Tienda');
  readonly logoUrl = computed(() => this.storeConfig()?.logoUrl ?? '');
  readonly isFirstRun = computed(() => !this.storeConfig()?.setupCompleted);

  private titleService = inject(Title);

  constructor() {
    // Dynamic theme, title and favicon injection reactive effect
    effect(() => {
      const config = this.storeConfig();
      if (config) {
        // 1. Title reactivity
        if (config.storeName) {
          this.titleService.setTitle(config.storeName);
        }

        // 2. Favicon reactivity
        if (config.faviconUrl) {
          const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
          if (link) {
            link.href = config.faviconUrl;
          } else {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.type = 'image/x-icon';
            newLink.href = config.faviconUrl;
            document.head.appendChild(newLink);
          }
        }

        // 3. Colors styling injection
        if (config.colors) {
          const root = document.documentElement;
          if (config.colors.primary) {
            root.style.setProperty('--color-primary', config.colors.primary);
          }
          if (config.colors.accent) {
            root.style.setProperty('--color-accent', config.colors.accent);
          }
          if (config.colors.background) {
            root.style.setProperty('--shop-bg', config.colors.background);
          }
        }
      }
    });
  }

  protected getDocRef(path: string, ...segments: string[]): DocumentReference {
    return doc(this.firestore, path, ...segments);
  }

  protected async getDocSnap(ref: DocumentReference): Promise<DocumentSnapshot> {
    return getDoc(ref);
  }

  protected async setDocData(ref: DocumentReference, data: Record<string, unknown>): Promise<void> {
    return setDoc(ref, data);
  }

  async loadConfig(): Promise<void> {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));
    try {
      const docRef = this.getDocRef('configuracion', environment.tenantId);
      const snap = await Promise.race([this.getDocSnap(docRef), timeout]);
      if (snap?.exists()) {
        const validatedData = StoreConfigSchema.parse(snap.data());
        this._storeConfig.set(validatedData as StoreConfig);
      } else {
        const fallbackRef = this.getDocRef('settings', 'storeConfig');
        const fallbackSnap = await Promise.race([this.getDocSnap(fallbackRef), timeout]);
        if (fallbackSnap?.exists()) {
          const raw = (fallbackSnap.data() as Record<string, unknown>) || {};
          const fallbackData = {
            tenantId: environment.tenantId,
            storeId: 'white-label-store',
            storeName: (raw['storeName'] as string) ?? 'Mi Tienda',
            tagline: (raw['tagline'] as string) ?? (raw['strapline'] as string) ?? '',
            logoUrl: (raw['logoUrl'] as string) ?? '',
            faviconUrl: (raw['faviconUrl'] as string) ?? '',
            colors: raw['colors'] ?? {
              primary: '#ea580c',
              accent: '#ef4444',
              background: '#ffffff',
            },
            payments: {
              mercadoPagoPublicKey: (raw['payments'] as Record<string, unknown>)?.['mercadoPago']
                ? ((raw['payments'] as Record<string, Record<string, string>>)['mercadoPago'][
                    'publicKey'
                  ] ?? '')
                : '',
            },
            contact: {
              phone: (raw['contact'] as Record<string, string>)?.['phone'] ?? '',
              email: (raw['contact'] as Record<string, string>)?.['email'] ?? '',
              whatsApp: (raw['contact'] as Record<string, string>)?.['whatsapp'] ?? '',
              instagram: '',
              facebook: '',
            },
            seo: {
              metaDescription:
                (raw['seo'] as Record<string, string>)?.['metaDescription'] ?? 'Bienvenido',
            },
            setupCompleted: true,
          };
          const validatedData = StoreConfigSchema.parse(fallbackData);
          this._storeConfig.set(validatedData as StoreConfig);
        } else {
          this._storeConfig.set(null);
        }
      }
    } catch (err) {
      console.error('Error al cargar la configuración de la tienda:', err);
      this._storeConfig.set(null);
    }
  }

  async saveConfig(data: StoreConfig): Promise<void> {
    const docRef = this.getDocRef('configuracion', environment.tenantId);
    await this.setDocData(docRef, {
      ...(data as unknown as Record<string, unknown>),
      updatedAt: new Date().toISOString(),
    });
    this._storeConfig.set(data);
  }
}
