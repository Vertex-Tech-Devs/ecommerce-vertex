import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { StoreConfig } from '@core/models/store-config.model';
import { DEFAULT_STORE_CONFIG } from '@core/models/store-config.model';
import { resolveTenantId } from '@core/utils/tenant';

@Component({
  selector: 'app-first-run-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './first-run-wizard.component.html',
  styleUrl: './first-run-wizard.component.scss',
})
export class FirstRunWizardComponent {
  private fb = inject(FormBuilder);
  private storeConfigService = inject(StoreConfigService);
  private sweetAlert = inject(SweetAlertService);

  currentStep = signal<number>(1);
  isSubmitting = signal<boolean>(false);

  form = this.fb.group({
    storeName: ['', Validators.required],
    tagline: [''],
    primaryColor: ['#ea580c', Validators.required],
    accentColor: ['#ef4444', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  nextStep(): void {
    if (this.currentStep() === 1 && this.form.get('storeName')?.invalid) {
      this.form.get('storeName')?.markAsTouched();
      return;
    }
    if (this.currentStep() === 2 && (this.form.get('primaryColor')?.invalid || this.form.get('accentColor')?.invalid)) {
      this.form.get('primaryColor')?.markAsTouched();
      this.form.get('accentColor')?.markAsTouched();
      return;
    }
    this.currentStep.update(s => s + 1);
  }

  prevStep(): void {
    this.currentStep.update(s => s - 1);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.error('Formulario incompleto', 'Completá todos los campos obligatorios antes de continuar.');
      return;
    }

    this.isSubmitting.set(true);
    try {
      const val = this.form.value;
      const payload: StoreConfig = {
        ...DEFAULT_STORE_CONFIG,
        tenantId: resolveTenantId(),
        storeId: resolveTenantId(),
        storeName: val.storeName || '',
        tagline: val.tagline || '',
        colors: {
          primary: val.primaryColor || '#ea580c',
          accent: val.accentColor || '#ef4444',
          background: '#ffffff',
        },
        contact: {
          phone: val.phone || '',
          email: val.email || '',
          whatsApp: '',
          instagram: '',
          facebook: '',
        },
        seo: {
          metaDescription: `Bienvenidos a ${val.storeName}.`,
        },
        setupCompleted: true,
      };

      await this.storeConfigService.saveConfig(payload);
      await this.storeConfigService.loadConfig();
      this.sweetAlert.success('¡Felicitaciones!', 'Tu tienda ha sido configurada e inicializada con éxito.');
    } catch (err) {
      console.error('Error al guardar la configuración inicial:', err);
      this.sweetAlert.error('Error', 'No se pudo guardar la configuración de la tienda.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
