import {
  Injectable,
  inject,
  signal,
  computed,
  effect,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import type { DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import type { StoreConfig } from '@core/models/store-config.model';
import { tenantPath, storeDocId, resolveTenantId } from '@core/utils/tenant';
import { StoreConfigSchema } from '@vertex/contracts';

export { StoreConfigSchema };

@Injectable({ providedIn: 'root' })
export class StoreConfigService {
  private firestore = inject(Firestore);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private injector = inject(Injector);

  private readonly _storeConfig = signal<StoreConfig | null>(null);
  readonly storeConfig = this._storeConfig.asReadonly();

  readonly storeName = computed(() => this.storeConfig()?.storeName ?? 'Mi Tienda');
  readonly logoUrl = computed(() => this.storeConfig()?.logoUrl ?? '');
  readonly isFirstRun = computed(() => {
    const config = this.storeConfig();
    return config ? !config.setupCompleted : false;
  });

  constructor() {
    // Dynamic theme, title and favicon injection reactive effect
    effect(() => {
      const config = this.storeConfig();
      if (config) {
        // 1b. SEO Meta Description reactivity
        if (config.seo?.metaDescription) {
          this.metaService.updateTag({ name: 'description', content: config.seo.metaDescription });
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
        const root = document.documentElement;
        if (config.colors) {
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

        // 4. Font family
        root.style.setProperty('--font-family', 'Inter');
      }
    });
  }

  protected getDocRef(path: string, ...segments: string[]): DocumentReference {
    return runInInjectionContext(this.injector, () => doc(this.firestore, path, ...segments));
  }

  protected async getDocSnap(ref: DocumentReference): Promise<DocumentSnapshot> {
    return runInInjectionContext(this.injector, () => getDoc(ref));
  }

  protected async setDocData(ref: DocumentReference, data: Record<string, unknown>): Promise<void> {
    return runInInjectionContext(this.injector, () => setDoc(ref, data, { merge: true }));
  }

  async loadConfig(): Promise<void> {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000));
    try {
      const docPromise = this.getDocSnap(
        this.getDocRef(tenantPath('configuracion'), storeDocId('store')),
      ).catch(() => null);
      const snap = await Promise.race([docPromise, timeout]);
      if (snap?.exists()) {
        const validatedData = StoreConfigSchema.parse(snap.data());
        this._storeConfig.set(validatedData as unknown as StoreConfig);
        this.applyConfigToDom(validatedData as unknown as StoreConfig);
      } else {
        this._storeConfig.set(null);
      }
    } catch (err) {
      console.error('Error al cargar la configuración de la tienda:', err);
      this._storeConfig.set(null);
    }
  }

  private parseLegacyConfigRaw(raw: Record<string, unknown>): Record<string, unknown> {
    const payments = raw['payments'] as Record<string, string> | undefined;
    return {
      tenantId: resolveTenantId(),
      storeId: (raw['storeId'] as string) ?? 'white-label-store',
      storeName: (raw['storeName'] as string) ?? 'Mi Tienda',
      tagline: (raw['tagline'] as string) ?? '',
      logoUrl: (raw['logoUrl'] as string) ?? '',
      faviconUrl: (raw['faviconUrl'] as string) ?? '',
      colors: (raw['colors'] as Record<string, string>) ?? {
        primary: '#ea580c',
        accent: '#ef4444',
        background: '#ffffff',
      },
      payments: {
        mercadoPagoPublicKey:
          (raw['mercadoPagoPublicKey'] as string) ?? payments?.['mercadoPagoPublicKey'] ?? '',
      },
      contact: {
        phone: (raw['contactPhone'] as string) ?? '',
        email: (raw['contactEmail'] as string) ?? '',
        whatsApp: (raw['socialWhatsAppUrl'] as string) ?? '',
        instagram: (raw['socialInstagramUrl'] as string) ?? '',
        facebook: (raw['socialFacebookUrl'] as string) ?? '',
      },
      seo: { metaDescription: (raw['metaDescription'] as string) ?? '' },
      setupCompleted: (raw['setupCompleted'] as boolean) ?? true,
    };
  }

  private stripUndefined(obj: unknown): unknown {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => this.stripUndefined(item));
    }
    const cleanObj: Record<string, unknown> = {};
    const record = obj as Record<string, unknown>;
    for (const key of Object.keys(record)) {
      if (record[key] !== undefined) {
        cleanObj[key] = this.stripUndefined(record[key]);
      }
    }
    return cleanObj;
  }

  async saveConfig(data: StoreConfig): Promise<void> {
    const docRef = this.getDocRef(tenantPath('configuracion'), storeDocId('store'));
    const cleanedPayload = this.stripUndefined({
      ...(data as unknown as Record<string, unknown>),
      updatedAt: new Date().toISOString(),
    });
    await this.setDocData(docRef, cleanedPayload as Record<string, unknown>);
    this._storeConfig.set(data);
  }

  private applyConfigToDom(config: StoreConfig): void {
    if (config.seo?.metaDescription) {
      this.metaService.updateTag({ name: 'description', content: config.seo.metaDescription });
    }
    if (config.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/x-icon';
        document.head.appendChild(link);
      }
      link.href = config.faviconUrl;
    }
    const root = document.documentElement;
    if (config.colors) {
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
    root.style.setProperty('--font-family', 'Inter');
  }
}
