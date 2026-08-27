import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { take, switchMap, map } from 'rxjs';

export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Distinguir entre "no autenticado" y "autenticado sin permisos":
  // - No autenticado → /admin/login (flujo normal)
  // - Autenticado pero sin claim admin → /admin/login?unauthorized=1
  //   Así el login puede mostrar el mensaje correcto y resetear el spinner.
  return authService.isAdmin$.pipe(
    take(1),
    switchMap((isAdmin) => {
      if (isAdmin) {
        return [true as const];
      }
      return authService.isAuthenticated().pipe(
        take(1),
        map((isAuth) =>
          isAuth
            ? router.createUrlTree(['/admin/login'], { queryParams: { unauthorized: '1' } })
            : router.createUrlTree(['/admin/login']),
        ),
      );
    }),
  );
};
