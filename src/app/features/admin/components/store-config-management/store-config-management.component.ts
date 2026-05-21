import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { StoreConfig } from '@core/models/store-config.model';

@Component({
  selector: 'app-store-config-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './store-config-management.component.html',
  styleUrls: ['./store-config-management.component.scss'],
})
export class StoreConfigManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private storeConfigService = inject(StoreConfigService);
  private sweetAlert = inject(SweetAlertService);

  isSubmitting = false;

  readonly currencies = [
    { value: 'ARS', label: 'ARS — Peso argentino', symbol: '$', country: 'AR' },
    { value: 'USD', label: 'USD — Dólar (US$)', symbol: 'US$', country: 'US' },
    { value: 'MXN', label: 'MXN — Peso mexicano', symbol: '$', country: 'MX' },
    { value: 'BRL', label: 'BRL — Real brasileño', symbol: 'R$', country: 'BR' },
    { value: 'CLP', label: 'CLP — Peso chileno', symbol: '$', country: 'CL' },
    { value: 'COP', label: 'COP — Peso colombiano', symbol: '$', country: 'CO' },
    { value: 'EUR', label: 'EUR — Euro', symbol: '€', country: 'ES' },
  ];

  form: FormGroup = this.fb.group({
    storeName: ['', Validators.required],
    strapline: [''],
    logoUrl: [''],
    contact: this.fb.group({
      email: [''],
      phone: [''],
      whatsapp: [''],
      instagram: [''],
      facebook: [''],
    }),
    seo: this.fb.group({
      metaTitle: [''],
      metaDescription: [''],
    }),
    features: this.fb.group({
      reviewsEnabled: [false],
      wishlistEnabled: [false],
      blogEnabled: [false],
    }),
    currency: ['ARS'],
    currencySymbol: ['$'],
    country: ['AR'],
  });

  ngOnInit(): void {
    const cfg = this.storeConfigService.config();
    if (cfg) {
      this.form.patchValue({
        storeName: cfg.storeName,
        strapline: cfg.strapline ?? '',
        logoUrl: cfg.logoUrl ?? '',
        contact: cfg.contact,
        seo: cfg.seo,
        features: cfg.features,
        currency: cfg.currency,
        currencySymbol: cfg.currencySymbol,
        country: cfg.country,
      });
    }
  }

  onCurrencyChange(event: Event): void {
    const code = (event.target as HTMLSelectElement).value;
    const found = this.currencies.find((c) => c.value === code);
    if (found) {
      this.form.patchValue({ currencySymbol: found.symbol, country: found.country });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.error('Formulario inválido', 'Revisá los campos marcados en rojo.');
      return;
    }
    this.isSubmitting = true;
    try {
      await this.storeConfigService.saveConfig(this.form.value as Omit<StoreConfig, 'id'>);
      this.sweetAlert.success('¡Guardado!', 'La configuración fue actualizada.');
    } catch {
      this.sweetAlert.error('Error', 'No se pudo guardar la configuración.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
