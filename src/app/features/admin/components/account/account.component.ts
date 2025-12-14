import { SweetAlertService } from '@core/services/sweet-alert.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmNewPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    if (password.value !== confirmPassword.value && confirmPassword.touched) {
      return { 'passwordsMismatch': true };
    }
    return null;
  };
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private sweetAlertService = inject(SweetAlertService);
  private router = inject(Router);

  passwordForm!: FormGroup;
  isSubmitting = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmNewPassword = false;

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    }, {
      validators: passwordsMatchValidator()
    });
  }

  get formControls() { return this.passwordForm.controls; }

  async onSubmit(): Promise<void> {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) {
      this.sweetAlertService.error('Formulario inválido', 'Por favor, corrige los errores.');
      return;
    }

    this.isSubmitting = true;
    const { currentPassword, newPassword } = this.passwordForm.value;

    try {
      const success = await this.authService.changePassword(currentPassword, newPassword);
      if (success) {
        await this.authService.logout({
          title: 'Contraseña Actualizada',
          text: 'Por favor, inicia sesión de nuevo con tus nuevas credenciales.'
        });
      }
    } catch (error: any) {
      let errorMessage = 'Ocurrió un error inesperado al cambiar la contraseña.';
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          errorMessage = 'La contraseña actual es incorrecta. Por favor, verifica tus credenciales.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Por favor, intenta de nuevo más tarde.';
          break;
        case 'auth/requires-recent-login':
          errorMessage = 'Tu sesión ha expirado. Por favor, cierra y vuelve a iniciar sesión para cambiar tu contraseña.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La nueva contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
          break;
        default:
          errorMessage = `Error: ${error.message || 'Error desconocido'}`;
          break;
      }
      this.sweetAlertService.error('Error al cambiar contraseña', errorMessage);
    } finally {
      this.isSubmitting = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}