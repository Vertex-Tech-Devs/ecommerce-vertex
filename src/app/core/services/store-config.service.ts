import { Injectable, inject, signal, computed } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import type { StoreConfig } from '@core/models/store-config.model';

@Injectable({ providedIn: 'root' })
export class StoreConfigService {
  private firestore = inject(Firestore);
  private functions = getFunctions();

  readonly config = signal<StoreConfig | null>(null);
  readonly storeName = computed(() => this.config()?.storeName ?? '');
  readonly logoUrl = computed(() => this.config()?.logoUrl?.trim() ?? '');
  readonly isFirstRun = computed(() => this.config() === null);
  readonly features = computed(() => this.config()?.features ?? null);

  async loadConfig(): Promise<void> {
    try {
      const deadline = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 3000)
      );
      const snap = await Promise.race([
        getDoc(doc(this.firestore, 'settings', 'storeConfig')),
        deadline,
      ]);
      if (snap.exists()) {
        this.config.set(snap.data() as StoreConfig);
      }
    } catch {
      /* Firestore unreachable or not yet configured */
    }
  }

  async saveConfig(data: Omit<StoreConfig, 'id'>): Promise<void> {
    const payload = { ...data, updatedAt: new Date() };
    await setDoc(doc(this.firestore, 'settings', 'storeConfig'), payload);
    this.config.set(payload as StoreConfig);
  }

  async validateMercadoPagoCredentials(payload: {
    accessToken: string;
    webhookUrl?: string;
  }): Promise<{ valid: boolean; accountEmail?: string; userId?: string; message: string }> {
    const fn = httpsCallable<
      { accessToken: string; webhookUrl?: string },
      { valid: boolean; accountEmail?: string; userId?: string; message: string }
    >(this.functions, 'validateMercadoPagoCredentials');
    const result = await fn(payload);
    return result.data;
  }
}
