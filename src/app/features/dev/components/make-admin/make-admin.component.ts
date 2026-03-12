import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-make-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="make-admin-container">
      <div class="make-admin-card">
        <h1>Conviértete en Admin</h1>
        <p>Esta es una herramienta de desarrollo temporal.</p>
        <p>Haz clic en el botón para darte permisos de administrador.</p>
        <div *ngIf="currentUser; else notLoggedIn">
          <p>Usuario: <strong>{{ currentUser.email }}</strong></p>
          <button (click)="makeAdmin()" [disabled]="isLoading">
            {{ isLoading ? 'Procesando...' : 'Convertirme en Admin' }}
          </button>
        </div>
        <ng-template #notLoggedIn>
          <p>Por favor, inicia sesión para continuar.</p>
          <button (click)="goToLogin()">Ir a Login</button>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .make-admin-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f2f5;
    }
    .make-admin-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      text-align: center;
    }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 1rem;
    }
    button:disabled {
      background-color: #cccccc;
    }
  `]
})
export class MakeAdminComponent implements OnInit {
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private sweetAlertService = inject(SweetAlertService);
  private router = inject(Router);

  currentUser: User | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  goToLogin(): void {
    this.router.navigate(['/admin/login']);
  }

  async makeAdmin(): Promise<void> {
    if (!this.currentUser || !this.currentUser.email) {
      this.sweetAlertService.error('Error', 'No hay un usuario autenticado.');
      return;
    }

    this.isLoading = true;
    const email = this.currentUser.email;

    try {
      const adminRoleRef = doc(this.firestore, `admin_roles/${email}`);
      await setDoc(adminRoleRef, { role: 'admin' });

      this.sweetAlertService.success(
        '¡Éxito!',
        'Ahora eres administrador. La página se recargará para aplicar los cambios.'
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
    } catch (error: any) {
      this.isLoading = false;
      this.sweetAlertService.error(
        'Error',
        `No se pudieron dar los permisos: ${error.message}`
      );
    }
  }
}
