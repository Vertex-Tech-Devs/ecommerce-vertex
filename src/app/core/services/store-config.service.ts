import { Injectable, inject, signal, computed } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { StoreConfig } from '@core/models/store-config.model';

@Injectable({ providedIn: 'root' })
export class StoreConfigService {
  private firestore = inject(Firestore);

  readonly config = signal<StoreConfig | null>(null);
  readonly storeName = computed(() => this.config()?.storeName ?? '');
  readonly isFirstRun = computed(() => this.config() === null);
  readonly features = computed(() => this.config()?.features ?? null);

  async loadConfig(): Promise<void> {
    try {
      const snap = await getDoc(doc(this.firestore, 'settings', 'storeConfig'));
      if (snap.exists()) {
        this.config.set(snap.data() as StoreConfig);
      }
    } catch {
      /* Firestore no configurado aún */
    }
  }

  async saveConfig(data: Omit<StoreConfig, 'id'>): Promise<void> {
    const payload = { ...data, updatedAt: new Date() };
    await setDoc(doc(this.firestore, 'settings', 'storeConfig'), payload);
    this.config.set(payload as StoreConfig);
  }
}
