import { Injectable, inject, effect, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy } from '@angular/router';
import type { RouterStateSnapshot } from '@angular/router';

import { StoreConfigService } from '@core/services/store-config.service';

@Injectable()
export class StoreTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly storeConfig = inject(StoreConfigService);
  private readonly routeTitleSignal = signal<string | undefined>(undefined);

  constructor() {
    super();
    effect(() => {
      const storeName = this.storeConfig.storeName();
      const routeTitle = this.routeTitleSignal();
      if (routeTitle) {
        this.title.setTitle(storeName ? `${routeTitle} | ${storeName}` : routeTitle);
      } else if (storeName) {
        this.title.setTitle(storeName);
      }
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const routeTitle = this.buildTitle(snapshot);
    this.routeTitleSignal.set(routeTitle);
  }
}
