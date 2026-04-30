import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { StoreConfig } from '@core/models/store-config.model';
import { DEFAULT_STORE_CONFIG } from '@core/models/store-config.model';

const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

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
  private sweetAlert = inject(SweetAlertService);
  private router = inject(Router);

  readonly step = signal(1);
  readonly totalSteps = 4;
  readonly isSubmitting = signal(false);

  readonly stepTitles = ['Identidad', 'Colores', 'Contacto', 'Listo'];

  readonly identityGroup: FormGroup = this.fb.group({
    storeName: ['', Validators.required],
    strapline: ['Tu tienda online'],
    logoUrl: [''],
  });

  readonly themeGroup: FormGroup = this.fb.group({
    primaryColor: ['#ea580c', [Validators.required, Validators.pattern(HEX_RE)]],
    primaryHoverColor: ['#fb923c', [Validators.required, Validators.pattern(HEX_RE)]],
    secondaryColor: ['#4f46e5', [Validators.required, Validators.pattern(HEX_RE)]],
    accentColor: ['#ef4444', [Validators.required, Validators.pattern(HEX_RE)]],
    fontFamily: [DEFAULT_STORE_CONFIG.theme.fontFamily],
  });

  readonly contactGroup: FormGroup = this.fb.group({
    email: [''],
    phone: [''],
    whatsapp: [''],
    instagram: [''],
    facebook: [''],
  });

  private readonly themeChanges = toSignal(this.themeGroup.valueChanges);

  constructor() {
    effect(() => {
      const theme = this.themeChanges();
      if (!theme) {
        return;
      }
      this.storeConfigService.applyTheme({
        ...DEFAULT_STORE_CONFIG,
        theme,
      } as StoreConfig);
    });
  }

  syncColor(field: string, event: Event): void {
    this.themeGroup.get(field)?.setValue((event.target as HTMLInputElement).value);
  }

  next(): void {
    if (this.step() < this.totalSteps) {
      this.step.update((s) => s + 1);
    }
  }

  prev(): void {
    if (this.step() > 1) {
      this.step.update((s) => s - 1);
    }
  }

  canAdvance(): boolean {
    if (this.step() === 1) {
      return this.identityGroup.valid;
    }
    if (this.step() === 2) {
      return this.themeGroup.valid;
    }
    return true;
  }

  async onFinish(): Promise<void> {
    this.isSubmitting.set(true);
    try {
      const payload: Omit<StoreConfig, 'id'> = {
        ...this.identityGroup.value,
        theme: this.themeGroup.value,
        contact: this.contactGroup.value,
        seo: {
          metaTitle: this.identityGroup.value.storeName as string,
          metaDescription: `Bienvenido a ${this.identityGroup.value.storeName as string}.`,
        },
        features: DEFAULT_STORE_CONFIG.features,
        currency: DEFAULT_STORE_CONFIG.currency,
        currencySymbol: DEFAULT_STORE_CONFIG.currencySymbol,
        country: DEFAULT_STORE_CONFIG.country,
        createdAt: new Date(),
      };
      await this.storeConfigService.saveConfig(payload);
      void this.router.navigate(['/admin/dashboard']);
    } catch {
      this.sweetAlert.error('Error', 'No se pudo guardar la configuración.');
      this.isSubmitting.set(false);
    }
  }
}
