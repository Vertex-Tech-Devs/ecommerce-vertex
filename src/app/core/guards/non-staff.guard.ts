import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { take, map } from 'rxjs';

export const NonStaffGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isStaff$.pipe(
    take(1),
    map((isStaff) => (isStaff ? router.createUrlTree(['/admin/orders']) : true)),
  );
};
