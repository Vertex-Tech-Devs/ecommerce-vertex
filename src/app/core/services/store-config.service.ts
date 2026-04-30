import { Injectable, inject, signal, computed } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { StoreConfig } from '@core/models/store-config.model';

@Injectable({ providedIn: 'root' })
export class StoreConfigService {
  private firestore = inject(Firestore);

  readonly config = signal<StoreConfig | null>(null);
  readonly storeName = computed(() => this.config()?.storeName ?? '');
  readonly theme = computed(() => this.config()?.theme ?? null);
  readonly isFirstRun = computed(() => this.config() === null);
  readonly features = computed(() => this.config()?.features ?? null);

  async loadConfig(): Promise<void> {
    try {
      const snap = await getDoc(doc(this.firestore, 'settings', 'storeConfig'));
      if (snap.exists()) {
        const cfg = snap.data() as StoreConfig;
        this.config.set(cfg);
        this.applyTheme(cfg);
      }
    } catch {
      /* Firestore no configurado aún — los CSS defaults se mantienen */
    }
  }

  applyTheme(config: StoreConfig): void {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', config.theme.primaryColor);
    root.style.setProperty('--color-primary-hover', config.theme.primaryHoverColor);
    root.style.setProperty('--color-secondary', config.theme.secondaryColor);
    root.style.setProperty('--color-accent', config.theme.accentColor);
    root.style.setProperty('--font-family', config.theme.fontFamily);
  }

  async saveConfig(data: Omit<StoreConfig, 'id'>): Promise<void> {
    const payload = { ...data, updatedAt: new Date() };
    await setDoc(doc(this.firestore, 'settings', 'storeConfig'), payload);
    this.config.set(payload as StoreConfig);
    this.applyTheme(payload as StoreConfig);
  }
}
