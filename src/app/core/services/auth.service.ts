import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import type { User, UserCredential } from '@angular/fire/auth';
import {
  Auth,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import type { Observable } from 'rxjs';
import { from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { user } from '@angular/fire/auth';
import { SweetAlertService } from './sweet-alert.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private sweetAlertService = inject(SweetAlertService);

  currentUser$ = user(this.auth);

  isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    switchMap((currentUser) => {
      if (!currentUser) {
        return of(false);
      }
      return from(currentUser.getIdTokenResult());
    }),
    map((tokenResult) => {
      if (tokenResult && typeof tokenResult === 'object') {
        return tokenResult.claims['admin'] === true;
      }
      return false;
    })
  );

  loginWithGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    return from(
      (async (): Promise<UserCredential> => {
        try {
          const result = await signInWithPopup(this.auth, provider);

          // Force refresh the token to grab custom claims.
          let tokenResult = await result.user.getIdTokenResult(true);

          if (!tokenResult.claims['admin']) {
            // Wait briefly to allow role claims propagation after a first Google sign-in.
            await new Promise((resolve) => setTimeout(resolve, 1800));
            tokenResult = await result.user.getIdTokenResult(true);
          }

          if (!tokenResult.claims['admin']) {
            await signOut(this.auth);
            throw new Error('permission-denied');
          }

          return result;
        } catch (err: unknown) {
          const code =
            err && typeof err === 'object' && 'code' in err
              ? String((err as { code?: string }).code)
              : '';
          if (code === 'auth/popup-blocked' || code === 'auth/unauthorized-domain') {
            throw new Error(code);
          }
          throw err;
        }
      })()
    );
  }

  async logout(options?: { title?: string; text?: string }): Promise<void> {
    try {
      await signOut(this.auth);

      const title = options?.title ?? 'Sesión Cerrada';
      const text = options?.text ?? 'Has sido redirigido a la página de inicio de sesión.';

      this.sweetAlertService.success(title, text);
      void this.router.navigate(['/admin/login']);
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      this.sweetAlertService.error(
        'Error',
        'No se pudo cerrar la sesión. Por favor, inténtalo de nuevo.'
      );
      throw err;
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(map((currentUser) => !!currentUser));
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    const currentUser: User | null = this.auth.currentUser;

    if (!currentUser?.email) {
      throw new Error('No hay usuario autenticado o el email no está disponible.');
    }

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      return true;
    } catch (error) {
      console.error('Error en el proceso de cambio de contraseña:', error);
      throw error;
    }
  }
}
