import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { environment } from '../../../environments/environment';

export const DevGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isEnabled = environment.features?.seedDataEnabled ?? false;
  if (!isEnabled) {
    router.navigate(['/admin/dashboard']);
    return false;
  }
  return true;
};
