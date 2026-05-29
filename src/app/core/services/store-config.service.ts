import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
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

  async loadConfig(): Promise<void> {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));
    try {
      const docRef = doc(this.firestore, 'configuracion', environment.tenantId);
      const snap = await Promise.race([getDoc(docRef), timeout]);
      if (snap?.exists()) {
        const validatedData = StoreConfigSchema.parse(snap.data());
        this._storeConfig.set(validatedData as StoreConfig);
      } else {
        this._storeConfig.set(null);
      }
    } catch (err) {
      console.error('Error al cargar la configuración de la tienda:', err);
      this._storeConfig.set(null);
    }
  }

  async saveConfig(data: StoreConfig): Promise<void> {
    const docRef = doc(this.firestore, 'configuracion', environment.tenantId);
    await setDoc(docRef, { ...data, updatedAt: new Date() });
    this._storeConfig.set(data);
  }
}
