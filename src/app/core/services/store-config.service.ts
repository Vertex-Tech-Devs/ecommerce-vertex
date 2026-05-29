import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import type { StoreConfig } from '@core/models/store-config.model';

@Injectable({ providedIn: 'root' })
export class StoreConfigService {
  private firestore = inject(Firestore);

  private readonly _storeConfig = signal<StoreConfig | null>(null);
  readonly storeConfig = this._storeConfig.asReadonly();

  readonly storeName = computed(() => this.storeConfig()?.storeName ?? 'Mi Tienda');
  readonly logoUrl = computed(() => this.storeConfig()?.logoUrl ?? '');
  readonly isFirstRun = computed(() => !this.storeConfig()?.setupCompleted);

  constructor() {
    // Dynamic theme injection reactive effect
    effect(() => {
      const config = this.storeConfig();
      if (config?.colors) {
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
    });
  }

  async loadConfig(): Promise<void> {
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));
    try {
      const docRef = doc(this.firestore, 'configuracion', 'store');
      const snap = await Promise.race([getDoc(docRef), timeout]);
      if (snap?.exists()) {
        this._storeConfig.set(snap.data() as StoreConfig);
      } else {
        this._storeConfig.set(null);
      }
    } catch (err) {
      console.error('Error al cargar la configuración de la tienda:', err);
      this._storeConfig.set(null);
    }
  }

  async saveConfig(data: StoreConfig): Promise<void> {
    const docRef = doc(this.firestore, 'configuracion', 'store');
    await setDoc(docRef, { ...data, updatedAt: new Date() });
    this._storeConfig.set(data);
  }
}
