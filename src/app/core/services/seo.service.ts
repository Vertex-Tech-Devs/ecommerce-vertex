import { Injectable, inject, effect } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { StoreConfigService } from './store-config.service';
import type { StoreConfig } from '@core/models/store-config.model';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private storeConfig = inject(StoreConfigService);

  constructor() {
    effect(() => {
      const cfg = this.storeConfig.config();
      if (cfg) {
        this.applyMeta(cfg);
      }
    });
  }

  private applyMeta(cfg: StoreConfig): void {
    this.meta.updateTag({ name: 'description', content: cfg.seo.metaDescription });
    this.meta.updateTag({ property: 'og:title', content: cfg.seo.metaTitle });
    this.meta.updateTag({ property: 'og:description', content: cfg.seo.metaDescription });
    this.meta.updateTag({ property: 'og:site_name', content: cfg.storeName });
    if (cfg.logoUrl) {
      this.meta.updateTag({ property: 'og:image', content: cfg.logoUrl });
    }
  }
}
