import {
  Component,
  inject,
  signal,
  DestroyRef,
  effect,
  ViewChildren,
  ElementRef,
  type QueryList,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import type { FormGroup, FormArray } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreConfigService } from '@core/services/store-config.service';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AuthService } from '@core/services/auth.service';
import type { StoreConfig, StorePickupLocation } from '@core/models/store-config.model';
import { DEFAULT_DELIVERY_METHOD_CONFIG } from '@core/models/store-config.model';
import { resolveTenantId } from '@core/utils/tenant';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-store-config',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './store-config.component.html',
  styleUrl: './store-config.component.scss',
})
export class StoreConfigComponent {
  private fb = inject(FormBuilder);
  private storeConfigService = inject(StoreConfigService);
  private storageService = inject(StorageService);
  private sweetAlert = inject(SweetAlertService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  @ViewChildren('locationNameInput', { read: ElementRef })
  locationNameInputs!: QueryList<ElementRef>;

  readonly isOwner = toSignal(this.authService.isOwner$, { initialValue: false });
  readonly isLoading = this.storeConfigService.isLoading;
  isSubmitting = signal(false);

  // File uploading states
  faviconProgress = signal<number>(0);
  faviconUploading = signal<boolean>(false);

  form: FormGroup = this.fb.group({
    tenantId: [''],
    storeId: [resolveTenantId()],
    storeName: ['', Validators.required],
    tagline: [''],
    logoUrl: [''],
    faviconUrl: [''],
    colors: this.fb.group({
      primary: ['#ea580c', Validators.required],
      accent: ['#ef4444', Validators.required],
      background: ['#ffffff', Validators.required],
    }),
    payments: this.fb.group({
      mercadoPagoPublicKey: [''],
    }),
    contact: this.fb.group({
      phone: [''],
      email: [''],
      whatsApp: [''],
      instagram: [''],
      facebook: [''],
    }),
    seo: this.fb.group({
      metaDescription: [''],
    }),
    setupCompleted: [true],
    storeOwnerEmail: [''],
    notificationEmail: [''],
    emailSenderName: [''],
    emailSignature: [''],
    deliveryMethods: this.fb.group({
      enableHomeDelivery: [true],
      enableStorePickup: [false],
      homeDeliveryDescription: ['Coordinamos el envío y costo por WhatsApp'],
      pickupLocations: this.fb.array([]),
    }),
  });

  get deliveryMethodsGroup(): FormGroup {
    return this.form.get('deliveryMethods') as FormGroup;
  }

  get pickupLocationsArray(): FormArray {
    return this.deliveryMethodsGroup.get('pickupLocations') as FormArray;
  }

  createPickupLocationGroup(location?: Partial<StorePickupLocation>): FormGroup {
    return this.fb.group({
      id: [
        location?.id ??
          (typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now().toString()),
      ],
      name: [location?.name ?? '', Validators.required],
      address: [location?.address ?? '', Validators.required],
      city: [location?.city ?? '', Validators.required],
      schedule: [location?.schedule ?? '', Validators.required],
      notes: [location?.notes ?? ''],
      enabled: [location?.enabled ?? true],
    });
  }

  addPickupLocation(): void {
    this.pickupLocationsArray.push(this.createPickupLocationGroup());
    this.form.markAsDirty();
    setTimeout(() => {
      this.locationNameInputs.last?.nativeElement.focus();
    }, 50);
  }

  removePickupLocation(index: number): void {
    this.pickupLocationsArray.removeAt(index);
    this.form.markAsDirty();
  }

  togglePickupLocationStatus(index: number): void {
    const group = this.pickupLocationsArray.at(index) as FormGroup;
    if (group) {
      const enabledControl = group.get('enabled');
      if (enabledControl) {
        enabledControl.setValue(!enabledControl.value);
        enabledControl.markAsDirty();
        this.form.markAsDirty();
      }
    }
  }

  constructor() {
    effect(() => {
      const cfg = this.storeConfigService.storeConfig();
      const currentTenant = resolveTenantId();
      const deliveryConfig = cfg?.deliveryMethods ?? DEFAULT_DELIVERY_METHOD_CONFIG;

      if (cfg) {
        this.form.patchValue({
          tenantId: cfg.tenantId || currentTenant,
          storeId: cfg.storeId || currentTenant,
          storeName: cfg.storeName || 'Mi Tienda',
          tagline: cfg.tagline || 'La mejor tienda online',
          logoUrl: cfg.logoUrl || '',
          faviconUrl: cfg.faviconUrl || '',
          colors: {
            primary: cfg.colors?.primary || '#ea580c',
            accent: cfg.colors?.accent || '#ef4444',
            background: cfg.colors?.background || '#ffffff',
          },
          payments: {
            mercadoPagoPublicKey: cfg.payments?.mercadoPagoPublicKey || '',
          },
          contact: {
            phone: cfg.contact?.phone ?? '+54 11 1234-5678',
            email: cfg.contact?.email ?? 'contacto@mitienda.com',
            whatsApp: cfg.contact?.whatsApp ?? '',
            instagram: cfg.contact?.instagram ?? '',
            facebook: cfg.contact?.facebook ?? '',
          },
          seo: {
            metaDescription: cfg.seo?.metaDescription || 'Bienvenidos a mi tienda virtual.',
          },
          setupCompleted: cfg.setupCompleted ?? true,
          storeOwnerEmail: cfg.storeOwnerEmail ?? '',
          notificationEmail: cfg.notificationEmail ?? '',
          emailSenderName: cfg.emailSenderName ?? '',
          emailSignature: cfg.emailSignature ?? '',
          deliveryMethods: {
            enableHomeDelivery: deliveryConfig.enableHomeDelivery ?? true,
            enableStorePickup: deliveryConfig.enableStorePickup ?? false,
            homeDeliveryDescription:
              deliveryConfig.homeDeliveryDescription ?? 'Coordinamos el envío y costo por WhatsApp',
          },
        });

        this.pickupLocationsArray.clear();
        const locations = deliveryConfig.pickupLocations ?? [];
        locations.forEach((loc) => {
          this.pickupLocationsArray.push(this.createPickupLocationGroup(loc));
        });
      } else {
        this.form.patchValue({
          tenantId: currentTenant,
          storeId: currentTenant,
          storeName: 'Mi Tienda',
          tagline: 'La mejor tienda online',
          logoUrl: '',
          faviconUrl: '',
          colors: {
            primary: '#ea580c',
            accent: '#ef4444',
            background: '#ffffff',
          },
          payments: {
            mercadoPagoPublicKey: '',
          },
          contact: {
            phone: '+54 11 1234-5678',
            email: 'contacto@mitienda.com',
            whatsApp: '',
            instagram: '',
            facebook: '',
          },
          seo: {
            metaDescription: 'Bienvenidos a mi tienda virtual.',
          },
          setupCompleted: true,
          deliveryMethods: {
            enableHomeDelivery: DEFAULT_DELIVERY_METHOD_CONFIG.enableHomeDelivery,
            enableStorePickup: DEFAULT_DELIVERY_METHOD_CONFIG.enableStorePickup,
            homeDeliveryDescription: DEFAULT_DELIVERY_METHOD_CONFIG.homeDeliveryDescription,
          },
        });

        this.pickupLocationsArray.clear();
        (DEFAULT_DELIVERY_METHOD_CONFIG.pickupLocations ?? []).forEach((loc) => {
          this.pickupLocationsArray.push(this.createPickupLocationGroup(loc));
        });
      }
    });
  }

  onFaviconUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    const allowedTypes = [
      'image/x-icon',
      'image/vnd.microsoft.icon',
      'image/png',
      'image/svg+xml',
      'image/jpeg',
    ];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.ico')) {
      this.sweetAlert.error(
        'Formato no válido',
        'Por favor selecciona un archivo de favicon válido (.ico, .png, .svg, .jpg).',
      );
      return;
    }

    const storeId = resolveTenantId() || 'store';
    this.faviconUploading.set(true);
    this.faviconProgress.set(0);

    const upload = this.storageService.uploadFile(file, `tenants/${storeId}/branding/favicon`);
    upload.progress$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((progress) => this.faviconProgress.set(Math.round(progress)));
    upload.downloadUrl$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (url) => {
        this.form.patchValue({ faviconUrl: url });
        const faviconCtrl = this.form.get('faviconUrl');
        if (faviconCtrl) {
          faviconCtrl.markAsDirty();
          faviconCtrl.updateValueAndValidity();
        }
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
      error: (err) => {
        console.error('Error al subir el favicon:', err);
        this.faviconUploading.set(false);
        this.sweetAlert.error('Error de subida', 'No se pudo cargar el favicon corporativo.');
      },
    });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.display = 'none';
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.error(
        'Formulario inválido',
        'Revisá los campos obligatorios en cada pestaña.',
      );
      return;
    }
    this.isSubmitting.set(true);
    try {
      const rawValue = this.form.getRawValue();
      await this.storeConfigService.saveConfig(rawValue as unknown as StoreConfig);
      await this.storeConfigService.loadConfig();
      this.form.markAsPristine();
      this.sweetAlert.success(
        '¡Listo!',
        'La configuración de marca blanca fue guardada con éxito.',
      );
    } catch (err) {
      console.error('Error al guardar la configuración:', err);
      this.sweetAlert.error('Error', 'No se pudo guardar la configuración de la tienda.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
