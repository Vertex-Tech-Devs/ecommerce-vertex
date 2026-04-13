import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { switchMap, map, take, from, of } from 'rxjs';

export const AdminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    switchMap(user => {
      if (!user) { return of(false); }
      return from(user.getIdTokenResult());
    }),
    map(result => {
      if (result && typeof result === 'object' && result.claims?.['admin'] === true) {
        return true;
      }
      return router.createUrlTree(['/admin/login']);
    })
  );
};
