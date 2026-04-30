import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { StoreConfigService } from '@core/services/store-config.service';

export const firstRunGuard: CanActivateFn = () => {
  const svc = inject(StoreConfigService);
  return svc.isFirstRun() ? inject(Router).createUrlTree(['/admin/setup']) : true;
};

export const setupCompleteGuard: CanActivateFn = () => {
  const svc = inject(StoreConfigService);
  return svc.isFirstRun() ? true : inject(Router).createUrlTree(['/admin/dashboard']);
};
