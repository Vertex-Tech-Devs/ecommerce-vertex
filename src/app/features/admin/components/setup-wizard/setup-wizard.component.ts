import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreConfigService } from '@core/services/store-config.service';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { StoreConfig } from '@core/models/store-config.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-setup-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setup-wizard.component.html',
  styleUrls: ['./setup-wizard.component.scss'],
})
export class SetupWizardComponent {
  private fb = inject(FormBuilder);
  private storeConfigService = inject(StoreConfigService);
  private storageService = inject(StorageService);
  private sweetAlert = inject(SweetAlertService);

  readonly step = signal(1);
  readonly totalSteps = 3;
  readonly isSubmitting = signal(false);

  // Uploading states
  logoProgress = signal<number>(0);
  logoUploading = signal<boolean>(false);

  // Visibility toggle
  showMpKey = signal<boolean>(false);

  readonly form: FormGroup = this.fb.group({
    storeId: ['white-label-store'],
    storeName: ['', Validators.required],
    tagline: ['', Validators.required],
    logoUrl: [''],
    faviconUrl: [''],
    colors: this.fb.group({
      primary: ['#ea580c', Validators.required],
      accent: ['#ef4444', Validators.required],
      background: ['#ffffff', Validators.required],
    }),
    payments: this.fb.group({
      mercadoPagoPublicKey: ['', Validators.required],
    }),
    contact: this.fb.group({
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsApp: [''],
      instagram: [''],
      facebook: [''],
    }),
    seo: this.fb.group({
      metaDescription: ['', Validators.required],
    }),
    setupCompleted: [true],
  });

  next(): void {
    if (this.step() === 1 && !this.isStep1Valid()) {
      this.form.get('storeName')?.markAsTouched();
      this.form.get('tagline')?.markAsTouched();
      return;
    }
    if (this.step() === 2 && !this.isStep2Valid()) {
      return;
    }
    if (this.step() < this.totalSteps) {
      this.step.update((s) => s + 1);
    }
  }

  prev(): void {
    if (this.step() > 1) {
      this.step.update((s) => s - 1);
    }
  }

  isStep1Valid(): boolean {
    return (
      (this.form.get('storeName')?.valid ?? false) && (this.form.get('tagline')?.valid ?? false)
    );
  }

  isStep2Valid(): boolean {
    return this.form.get('colors')?.valid ?? false;
  }

  onLogoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    this.logoUploading.set(true);
    this.logoProgress.set(0);

    const upload = this.storageService.uploadFile(file, 'store/branding');
    upload.progress$.subscribe((progress) => this.logoProgress.set(Math.round(progress)));
    upload.downloadUrl$.subscribe({
      next: (url) => {
        this.form.patchValue({ logoUrl: url });
        this.logoUploading.set(false);
        this.sweetAlert.success('Logo subido', 'El logo fue cargado exitosamente.');
      },
      error: (err) => {
        console.error(err);
        this.logoUploading.set(false);
        this.sweetAlert.error('Error de subida', 'No se pudo cargar el logo.');
      },
    });
  }

  toggleMpKeyVisibility(): void {
    this.showMpKey.update((val) => !val);
  }

  async onFinish(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.error(
        'Formulario incompleto',
        'Por favor completa todos los campos obligatorios del Paso 3.'
      );
      return;
    }

    this.isSubmitting.set(true);
    try {
      // Set meta description dynamically based on inputs if not yet personalized
      if (!this.form.get('seo.metaDescription')?.value) {
        this.form
          .get('seo.metaDescription')
          ?.setValue(`Bienvenido a ${this.form.get('storeName')?.value as string}.`);
      }

      const payload: StoreConfig = {
        ...this.form.value,
        tenantId: environment.tenantId,
      };

      await this.storeConfigService.saveConfig(payload);
      this.sweetAlert.success(
        '¡Felicitaciones!',
        'Tu tienda de marca blanca ha sido configurada con éxito corporativo.'
      );
    } catch (err) {
      console.error(err);
      this.sweetAlert.error('Error', 'No se pudo completar la configuración de la tienda.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
