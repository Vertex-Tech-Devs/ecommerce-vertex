import { Component, inject, signal } from '@angular/core';
import type { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup, AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Functions, httpsCallable } from '@angular/fire/functions';
import type { HttpsCallable } from '@angular/fire/functions';
import { firstValueFrom } from 'rxjs';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AuthService } from '@core/services/auth.service';

export interface AdminRole {
  email: string;
  role: 'admin';
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  private functions = inject(Functions);
  private fb = inject(FormBuilder);
  private sweetAlertService = inject(SweetAlertService);
  private authService = inject(AuthService);

  readonly staffList = signal<AdminRole[]>([]);
  readonly staffForm: FormGroup;
  readonly roleOptions: Array<{ value: 'admin'; label: string }> = [
    { value: 'admin', label: 'Administrador (Acceso completo)' },
  ];

  readonly isLoading = signal(true);
  readonly isAdding = signal(false);
  readonly addError = signal('');
  readonly removingEmail = signal<string | null>(null);

  constructor() {
    this.staffForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['admin', [Validators.required]],
    });
  }

  getCallable<T, R>(name: string): HttpsCallable<T, R> {
    return httpsCallable<T, R>(this.functions, name);
  }

  ngOnInit(): void {
    void this.loadStaff();
  }

  async loadStaff(): Promise<void> {
    this.isLoading.set(true);
    this.addError.set('');
    try {
      const getStaff = this.getCallable<Record<string, never>, { staff: AdminRole[] }>(
        'getAdminStaff'
      );
      const response = await getStaff({});
      this.staffList.set(response.data.staff ?? []);
    } catch (err) {
      console.error('[Load Staff Error]:', err);
      this.addError.set(
        'No se pudo cargar el equipo administrativo. Verificá tu sesión y volvé a intentar.'
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.staffForm.controls;
  }

  async addStaff(): Promise<void> {
    if (this.staffForm.invalid) {
      this.staffForm.markAllAsTouched();
      return;
    }

    const { email, role } = this.staffForm.value;
    const normalizedEmail = email.trim().toLowerCase();

    if (this.staffList().some((m) => m.email.toLowerCase() === normalizedEmail)) {
      this.addError.set('Este email ya está autorizado como administrador.');
      return;
    }

    this.isAdding.set(true);
    this.addError.set('');

    try {
      const upsertStaff = this.getCallable<
        { email: string; role: 'admin' },
        { success: boolean; email: string; role: 'admin' }
      >('upsertAdminStaff');
      await upsertStaff({ email: normalizedEmail, role: role as 'admin' });

      this.sweetAlertService.success(
        'Miembro Agregado',
        `El usuario ${normalizedEmail} fue autorizado como administrador.`
      );
      this.staffForm.reset({ email: '', role: 'admin' });
      await this.loadStaff();
    } catch (err: unknown) {
      console.error('[Add Staff Error]:', err);
      this.addError.set(
        'No se pudieron conceder los permisos. Verificá tu conexión, claims de administrador y volvé a intentar.'
      );
      this.sweetAlertService.error('Error', 'Hubo un problema al agregar al miembro del equipo.');
    } finally {
      this.isAdding.set(false);
    }
  }

  async removeStaff(email: string): Promise<void> {
    const currentUser = await firstValueFrom(this.authService.currentUser$);
    if (currentUser?.email?.toLowerCase() === email.toLowerCase()) {
      this.sweetAlertService.error(
        'Acción no permitida',
        'No podés revocar tus propios privilegios de administrador.'
      );
      return;
    }

    const confirmResult = await this.sweetAlertService.confirm(
      '¿Confirmás la revocación?',
      `El usuario ${email} perderá todo el acceso administrativo a esta tienda de forma inmediata.`,
      'warning'
    );

    if (!confirmResult) {
      return;
    }

    this.removingEmail.set(email);

    try {
      const revokeStaff = this.getCallable<{ email: string }, { success: boolean; email: string }>(
        'revokeAdminStaff'
      );
      await revokeStaff({ email: email.toLowerCase() });

      this.sweetAlertService.success(
        'Acceso Revocado',
        `Se eliminaron todos los permisos de administrador para ${email}.`
      );
      await this.loadStaff();
    } catch (err: unknown) {
      console.error('[Remove Staff Error]:', err);
      this.sweetAlertService.error('Error', 'No se pudieron revocar los privilegios del usuario.');
    } finally {
      this.removingEmail.set(null);
    }
  }
}
