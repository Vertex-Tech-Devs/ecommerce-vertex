import { Injectable, inject, signal, computed } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import type { StoreConfig } from '@core/models/store-config.model';
import { STORE_CONFIG } from '../../../environments/store.config';

@Injectable({ providedIn: 'root' })
export class StoreConfigService {
  private firestore = inject(Firestore);
  private functions = getFunctions();

  readonly config = signal<StoreConfig | null>(null);
  readonly storeName = computed(() => {
    const fromFirestore = this.config()?.storeName?.trim() ?? '';
    if (fromFirestore) {
      return fromFirestore;
    }

    const fromStaticConfig = STORE_CONFIG.storeName?.trim() ?? '';
    if (fromStaticConfig) {
      return fromStaticConfig;
    }

    return this.inferStoreNameFromHostname();
  });
  readonly logoUrl = computed(() => this.config()?.logoUrl?.trim() ?? '');
  readonly isFirstRun = computed(() => this.config() === null);
  readonly features = computed(() => this.config()?.features ?? null);

  private inferStoreNameFromHostname(): string {
    const host = (globalThis.location?.hostname ?? '').trim().toLowerCase();
    if (!host) {
      return 'Store';
    }

    const firstLabel = host.split('.')[0] ?? '';
    if (!firstLabel || firstLabel === 'localhost') {
      return 'Store';
    }

    return firstLabel
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

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

  async upsertMercadoPagoCredentials(payload: {
    accessToken: string;
    webhookUrl?: string;
  }): Promise<{
    valid: boolean;
    accountEmail?: string;
    userId?: string;
    secretName: string;
    maskedToken: string;
    message: string;
  }> {
    const fn = httpsCallable<
      { accessToken: string; webhookUrl?: string },
      {
        valid: boolean;
        accountEmail?: string;
        userId?: string;
        secretName: string;
        maskedToken: string;
        message: string;
      }
    >(this.functions, 'upsertMercadoPagoCredentials');
    const result = await fn(payload);
    return result.data;
  }
}
