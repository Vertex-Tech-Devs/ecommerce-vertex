import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { StoreConfigService } from '@core/services/store-config.service';
import type { StoreFeatureFlags } from '@core/models/store-config.model';

export const featureFlagGuard =
  (flag: keyof StoreFeatureFlags): CanActivateFn =>
  () => {
    const svc = inject(StoreConfigService);
    return svc.config()?.features?.[flag] === true
      ? true
      : inject(Router).createUrlTree(['/admin/dashboard']);
  };
