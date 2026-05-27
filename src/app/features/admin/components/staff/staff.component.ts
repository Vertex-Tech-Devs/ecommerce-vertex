import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup, AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import type { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AuthService } from '@core/services/auth.service';

export interface AdminRole {
  id: string; // Document ID (email)
  role: string;
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent {
  private firestore = inject(Firestore);
  private fb = inject(FormBuilder);
  private sweetAlertService = inject(SweetAlertService);
  private authService = inject(AuthService);

  readonly staffList$: Observable<AdminRole[]>;
  readonly staffForm: FormGroup;

  readonly isAdding = signal(false);
  readonly addError = signal('');
  readonly removingEmail = signal<string | null>(null);

  constructor() {
    // Initialize staff form with reactive validations
    this.staffForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['admin', [Validators.required]], // Default role is admin
    });

    // Fetch live list of admin roles from Firestore
    const colRef = collection(this.firestore, 'admin_roles');
    this.staffList$ = collectionData(colRef, { idField: 'id' }) as Observable<AdminRole[]>;
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

    this.isAdding.set(true);
    this.addError.set('');

    try {
      // Write document using email as ID
      const docRef = doc(this.firestore, 'admin_roles', normalizedEmail);
      await setDoc(docRef, { role });

      this.sweetAlertService.success(
        'Miembro Agregado',
        `El usuario ${normalizedEmail} ahora tiene permisos de administrador.`
      );
      this.staffForm.reset({ email: '', role: 'admin' });
    } catch (err: unknown) {
      console.error('[Add Staff Error]:', err);
      this.addError.set('No se pudieron conceder los permisos. Verificá tu conexión y permisos.');
      this.sweetAlertService.error('Error', 'Hubo un problema al agregar al miembro del equipo.');
    } finally {
      this.isAdding.set(false);
    }
  }

  async removeStaff(email: string): Promise<void> {
    // Prevent self-revocation
    this.authService.currentUser$.pipe(take(1)).subscribe((user): void => {
      void (async (): Promise<void> => {
        if (user?.email?.toLowerCase() === email.toLowerCase()) {
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
          const docRef = doc(this.firestore, 'admin_roles', email.toLowerCase());
          await deleteDoc(docRef);

          this.sweetAlertService.success(
            'Acceso Revocado',
            `Se eliminaron todos los permisos de administrador para ${email}.`
          );
        } catch (err: unknown) {
          console.error('[Remove Staff Error]:', err);
          this.sweetAlertService.error(
            'Error',
            'No se pudieron revocar los privilegios del usuario.'
          );
        } finally {
          this.removingEmail.set(null);
        }
      })();
    });
  }
}
