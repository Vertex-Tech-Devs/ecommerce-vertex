import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User
} from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { user } from '@angular/fire/auth';
import { SweetAlertService } from './sweet-alert.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private sweetAlertService = inject(SweetAlertService);

  public currentUser$ = user(this.auth);

  public isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    switchMap(currentUser => {
      if (!currentUser) {
        return of(false);
      }
      return from(currentUser.getIdTokenResult());
    }),
    map(tokenResult => {
      if (tokenResult && typeof tokenResult === 'object') {
        return tokenResult.claims['admin'] === true;
      }
      return false;
    })
  );

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  async logout(options?: { title?: string; text?: string }): Promise<void> {
    try {
      await signOut(this.auth);

      const title = options?.title || 'Sesión Cerrada';
      const text = options?.text || 'Has sido redirigido a la página de inicio de sesión.';

      this.sweetAlertService.success(title, text);
      this.router.navigate(['/admin/login']);

    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      this.sweetAlertService.error('Error', 'No se pudo cerrar la sesión. Por favor, inténtalo de nuevo.');
      throw err;
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(currentUser => !!currentUser)
    );
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
    const currentUser: User | null = this.auth.currentUser;

    if (!currentUser || !currentUser.email) {
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
