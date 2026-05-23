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
  private readonly urlPattern = /^(|https?:\/\/[^\s$.?#].[^\s]*)$/i;

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
    storeName: ['', [Validators.required, Validators.maxLength(80)]],
    strapline: [''],
    logoUrl: ['', [Validators.pattern(this.urlPattern)]],
    faviconUrl: ['', [Validators.pattern(this.urlPattern)]],
    contact: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      whatsapp: [''],
      address: [''],
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
    payments: this.fb.group({
      mercadoPago: this.fb.group({
        publicKey: [''],
        accessToken: [''],
        accessTokenSecret: ['mp-access-token'],
        accessTokenMasked: [''],
        accountEmail: [''],
        accountUserId: [''],
        webhookUrl: ['', [Validators.pattern(this.urlPattern)]],
        validationStatus: ['pending'],
        validationMessage: [''],
      }),
    }),
    currency: ['ARS', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    currencySymbol: ['$', [Validators.required, Validators.maxLength(5)]],
    country: ['AR', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
  });

  ngOnInit(): void {
    const cfg = this.storeConfigService.config();
    if (cfg) {
      this.form.patchValue({
        storeName: cfg.storeName,
        strapline: cfg.strapline ?? '',
        logoUrl: cfg.logoUrl ?? '',
        faviconUrl: cfg.faviconUrl ?? '',
        contact: cfg.contact,
        seo: cfg.seo,
        features: cfg.features,
        payments: {
          mercadoPago: {
            publicKey: cfg.payments?.mercadoPago?.publicKey ?? '',
            accessToken: '',
            accessTokenSecret: cfg.payments?.mercadoPago?.accessTokenSecret ?? 'mp-access-token',
            accessTokenMasked: cfg.payments?.mercadoPago?.accessTokenMasked ?? '',
            accountEmail: cfg.payments?.mercadoPago?.accountEmail ?? '',
            accountUserId: cfg.payments?.mercadoPago?.accountUserId ?? '',
            webhookUrl: cfg.payments?.mercadoPago?.webhookUrl ?? '',
            validationStatus: cfg.payments?.mercadoPago?.validationStatus ?? 'pending',
            validationMessage: cfg.payments?.mercadoPago?.validationMessage ?? '',
          },
        },
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

  onCountryBlur(): void {
    const countryControl = this.form.get('country');
    const value = countryControl?.value;
    if (typeof value === 'string') {
      countryControl?.setValue(value.trim().toUpperCase());
    }
  }

  onCurrencyBlur(): void {
    const currencyControl = this.form.get('currency');
    const value = currencyControl?.value;
    if (typeof value === 'string') {
      currencyControl?.setValue(value.trim().toUpperCase());
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
      const payload = this.form.value as Omit<StoreConfig, 'id'>;
      const mercadoPago = payload.payments?.mercadoPago;

      if (mercadoPago) {
        mercadoPago.publicKey = (mercadoPago.publicKey ?? '').trim();
        mercadoPago.accessToken = (mercadoPago.accessToken ?? '').trim();
        mercadoPago.webhookUrl = (mercadoPago.webhookUrl ?? '').trim();

        if (mercadoPago.accessToken) {
          const validation = await this.storeConfigService.upsertMercadoPagoCredentials({
            accessToken: mercadoPago.accessToken,
            webhookUrl: mercadoPago.webhookUrl,
          });
          mercadoPago.validationStatus = validation.valid ? 'valid' : 'invalid';
          mercadoPago.validationMessage = validation.message;
          mercadoPago.accountEmail = validation.accountEmail;
          mercadoPago.accountUserId = validation.userId;
          mercadoPago.accessTokenSecret = validation.secretName;
          mercadoPago.accessTokenMasked = validation.maskedToken;
          mercadoPago.validatedAt = new Date().toISOString();
        } else {
          mercadoPago.validationStatus = mercadoPago.accessTokenSecret ? 'valid' : 'pending';
          mercadoPago.validationMessage = mercadoPago.accessTokenSecret
            ? (mercadoPago.validationMessage ?? 'Token almacenado en Secret Manager.')
            : 'Sin token configurado.';
        }

        mercadoPago.accessToken = '';
      }

      await this.storeConfigService.saveConfig(payload);
      this.sweetAlert.success('¡Guardado!', 'La configuración fue actualizada.');
    } catch {
      this.sweetAlert.error('Error', 'No se pudo guardar la configuración.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
