import { Component, inject, signal, DestroyRef, effect } from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StoreConfigService } from '@core/services/store-config.service';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AuthService } from '@core/services/auth.service';
import type { StoreConfig as StoreConfigData } from '@core/models/store-config.model';
import { resolveTenantId } from '@core/utils/tenant';
import { RouterModule } from '@angular/router';
import { createStoreConfigForm } from './store-config.form';

@Component({
  selector: 'app-store-config',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './store-config.html',
  styleUrl: './store-config.scss',
})
export class StoreConfig {
  private fb = inject(FormBuilder);
  private storeConfigService = inject(StoreConfigService);
  private storageService = inject(StorageService);
  private sweetAlert = inject(SweetAlertService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  readonly isOwner = toSignal(this.authService.isOwner$, { initialValue: false });
  readonly isLoading = this.storeConfigService.isLoading;
  isSubmitting = signal(false);

  faviconProgress = signal<number>(0);
  faviconUploading = signal<boolean>(false);

  logoUploadProgress = signal<number>(0);
  isUploadingLogo = signal<boolean>(false);

  form: FormGroup = createStoreConfigForm(this.fb);

  removeFavicon(): void {
    this.form.patchValue({ faviconUrl: '' });
    this.form.get('faviconUrl')?.markAsDirty();
    this.form.markAsDirty();
  }

  removeLogo(): void {
    this.form.patchValue({ logoUrl: '' });
    this.form.get('logoUrl')?.markAsDirty();
    this.form.markAsDirty();
  }

  constructor() {
    effect(() => {
      this.populateFormFromConfig(this.storeConfigService.storeConfig());
    });
  }

  private populateFormFromConfig(cfg: StoreConfigData | null): void {
    const currentTenant = resolveTenantId();
    this.patchGeneralSettings(cfg, currentTenant);
    this.patchBrandingAndColors(cfg);
  }

  private patchGeneralSettings(cfg: StoreConfigData | null, currentTenant: string): void {
    this.form.patchValue({
      tenantId: cfg?.tenantId ?? currentTenant,
      storeId: cfg?.storeId ?? currentTenant,
      storeName: cfg?.storeName ?? 'Mi Tienda',
      setupCompleted: cfg?.setupCompleted ?? true,
    });
  }

  private patchBrandingAndColors(cfg: StoreConfigData | null): void {
    this.form.patchValue({
      logoUrl: cfg?.logoUrl ?? '',
      faviconUrl: cfg?.faviconUrl ?? '',
      colors: {
        primary: cfg?.colors?.primary ?? '#ea580c',
        accent: cfg?.colors?.accent ?? '#ef4444',
        background: cfg?.colors?.background ?? '#ffffff',
      },
    });
  }

  onFaviconUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    const allowed = [
      'image/x-icon',
      'image/vnd.microsoft.icon',
      'image/png',
      'image/svg+xml',
      'image/jpeg',
    ];
    if (!allowed.includes(file.type) && !file.name.endsWith('.ico')) {
      this.sweetAlert.error(
        'Formato no válido',
        'Selecciona un archivo válido (.ico, .png, .svg, .jpg).',
      );
      return;
    }

    const storeId = resolveTenantId() ?? 'store';
    this.faviconUploading.set(true);
    this.faviconProgress.set(0);

    const upload = this.storageService.uploadFile(file, `tenants/${storeId}/branding/favicon`);
    upload.progress$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => this.faviconProgress.set(Math.round(p)));
    upload.downloadUrl$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (url) => {
        this.form.patchValue({ faviconUrl: url });
        this.form.get('faviconUrl')?.markAsDirty();
        let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = url;
        this.faviconUploading.set(false);
        this.sweetAlert.success(
          'Favicon subido',
          'El favicon corporativo fue cargado exitosamente.',
        );
      },
      error: () => {
        this.faviconUploading.set(false);
        this.sweetAlert.error('Error de subida', 'No se pudo cargar el favicon.');
      },
    });
  }

  onLogoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    const allowed = ['image/png', 'image/svg+xml', 'image/jpeg', 'image/webp'];
    if (!allowed.includes(file.type)) {
      this.sweetAlert.error(
        'Formato no válido',
        'Selecciona una imagen válida (.png, .svg, .jpg, .webp).',
      );
      return;
    }

    const storeId = resolveTenantId() ?? 'store';
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png';
    this.isUploadingLogo.set(true);
    this.logoUploadProgress.set(0);

    const upload = this.storageService.uploadFile(file, `stores/${storeId}/branding/logo.${ext}`);
    upload.progress$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => this.logoUploadProgress.set(Math.round(p)));
    upload.downloadUrl$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (url) => {
        this.form.patchValue({ logoUrl: url });
        this.form.get('logoUrl')?.markAsDirty();
        this.form.markAsDirty();
        this.isUploadingLogo.set(false);
        this.sweetAlert.success(
          'Logotipo subido',
          'El logotipo de marca fue cargado exitosamente.',
        );
      },
      error: () => {
        this.isUploadingLogo.set(false);
        this.sweetAlert.error('Error de subida', 'No se pudo cargar el logotipo de marca.');
      },
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.error('Formulario inválido', 'Revisá los campos obligatorios.');
      return;
    }
    this.isSubmitting.set(true);
    try {
      const currentConfig = this.storeConfigService.storeConfig();
      await this.storeConfigService.saveConfig({
        ...(currentConfig ?? ({} as StoreConfigData)),
        ...this.form.getRawValue(),
      } as StoreConfigData);
      await this.storeConfigService.loadConfig();
      this.form.markAsPristine();
      this.sweetAlert.success('¡Listo!', 'La configuración fue guardada con éxito.');
    } catch (err) {
      console.error('Error al guardar la configuración:', err);
      this.sweetAlert.error('Error', 'No se pudo guardar la configuración de la tienda.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
