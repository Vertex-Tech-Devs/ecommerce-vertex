import type { OnInit } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreConfigService, StoreConfigSchema } from '@core/services/store-config.service';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AuthService } from '@core/services/auth.service';
import type { StoreConfig } from '@core/models/store-config.model';

@Component({
  selector: 'app-store-config',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './store-config.component.html',
  styleUrls: ['./store-config.component.scss'],
})
export class StoreConfigComponent implements OnInit {
  private fb = inject(FormBuilder);
  private storeConfigService = inject(StoreConfigService);
  private storageService = inject(StorageService);
  private sweetAlert = inject(SweetAlertService);
  private authService = inject(AuthService);

  readonly isOwner = toSignal(this.authService.isOwner$, { initialValue: false });
  isSubmitting = false;
  activeTab = signal<'identity' | 'colors' | 'payments' | 'contact-seo'>('identity');

  // File uploading states
  logoProgress = signal<number>(0);
  faviconProgress = signal<number>(0);
  logoUploading = signal<boolean>(false);
  faviconUploading = signal<boolean>(false);

  // Visibility toggle for keys
  showMpKey = signal<boolean>(false);

  form: FormGroup = this.fb.group({
    tenantId: [''],
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

  ngOnInit(): void {
    const cfg = this.storeConfigService.storeConfig();
    if (cfg) {
      this.form.patchValue(cfg);
    }

    // Manage payments validators dynamically so non-owner admins can submit changes to identity/contact
    this.authService.isOwner$.subscribe((isOwner) => {
      const pmCtrl = this.form.get('payments.mercadoPagoPublicKey');
      if (pmCtrl) {
        if (isOwner) {
          pmCtrl.setValidators([Validators.required]);
        } else {
          pmCtrl.clearValidators();
        }
        pmCtrl.updateValueAndValidity();
      }
    });
  }

  setTab(tab: 'identity' | 'colors' | 'payments' | 'contact-seo'): void {
    this.activeTab.set(tab);
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
        this.sweetAlert.success('Logo subido', 'El logo corporativo fue cargado exitosamente.');
      },
      error: (err) => {
        console.error('Error al subir el logo:', err);
        this.logoUploading.set(false);
        this.sweetAlert.error('Error de subida', 'No se pudo cargar el logo corporativo.');
      },
    });
  }

  onFaviconUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    this.faviconUploading.set(true);
    this.faviconProgress.set(0);

    const upload = this.storageService.uploadFile(file, 'store/branding');
    upload.progress$.subscribe((progress) => this.faviconProgress.set(Math.round(progress)));
    upload.downloadUrl$.subscribe({
      next: (url) => {
        this.form.patchValue({ faviconUrl: url });
        this.faviconUploading.set(false);
        this.sweetAlert.success(
          'Favicon subido',
          'El favicon corporativo fue cargado exitosamente.'
        );
      },
      error: (err) => {
        console.error('Error al subir el favicon:', err);
        this.faviconUploading.set(false);
        this.sweetAlert.error('Error de subida', 'No se pudo cargar el favicon corporativo.');
      },
    });
  }

  toggleMpKeyVisibility(): void {
    this.showMpKey.update((val) => !val);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.error(
        'Formulario inválido',
        'Revisá los campos obligatorios en cada pestaña.'
      );
      return;
    }
    this.isSubmitting = true;
    try {
      // Validate form value at runtime using Zod
      const rawValue = this.form.value;
      const validatedData = StoreConfigSchema.parse(rawValue);
      await this.storeConfigService.saveConfig(validatedData as StoreConfig);
      this.sweetAlert.success(
        '¡Listo!',
        'La configuración de marca blanca fue guardada con éxito.'
      );
    } catch (err) {
      console.error('Error al guardar la configuración:', err);
      this.sweetAlert.error('Error', 'No se pudo guardar la configuración de la tienda.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
