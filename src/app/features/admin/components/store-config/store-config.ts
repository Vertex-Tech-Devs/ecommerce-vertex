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
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import type { FormGroup, FormArray } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreConfigService } from '@core/services/store-config.service';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AuthService } from '@core/services/auth.service';
import type {
  StoreConfig as StoreConfigData,
  StorePickupLocation,
} from '@core/models/store-config.model';
import {
  DEFAULT_DELIVERY_METHOD_CONFIG,
  WEEK_DAYS,
  TIME_SLOTS,
} from '@core/models/store-config.model';
import { resolveTenantId } from '@core/utils/tenant';
import { RouterModule } from '@angular/router';

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

  readonly weekDays = WEEK_DAYS;
  readonly timeSlots = TIME_SLOTS;

  @ViewChildren('locationNameInput', { read: ElementRef })
  locationNameInputs!: QueryList<ElementRef>;

  readonly isOwner = toSignal(this.authService.isOwner$, { initialValue: false });
  readonly isLoading = this.storeConfigService.isLoading;
  isSubmitting = signal(false);

  faviconProgress = signal<number>(0);
  faviconUploading = signal<boolean>(false);

  form: FormGroup = this.fb.group({
    tenantId: [''],
    storeId: [resolveTenantId()],
    storeName: ['', Validators.required],
    logoUrl: [''],
    faviconUrl: [''],
    colors: this.fb.group({
      primary: ['#ea580c', Validators.required],
      accent: ['#ef4444', Validators.required],
      background: ['#ffffff', Validators.required],
    }),
    payments: this.fb.group({ mercadoPagoPublicKey: [''] }),
    contact: this.fb.group({
      phone: [''],
      email: [''],
      whatsApp: [''],
      instagram: [''],
      facebook: [''],
    }),
    seo: this.fb.group({ metaDescription: [''] }),
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
    const days = location?.days ?? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
    const timeFrom1 = location?.timeFrom1 ?? '09:00';
    const timeTo1 = location?.timeTo1 ?? '18:00';
    const hasSplit = location?.hasSplitSchedule ?? false;
    const timeFrom2 = location?.timeFrom2 ?? '16:30';
    const timeTo2 = location?.timeTo2 ?? '20:30';
    const initialSchedule =
      location?.schedule ??
      this.formatSchedule(days, timeFrom1, timeTo1, hasSplit, timeFrom2, timeTo2);

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
      days: [days],
      timeFrom1: [timeFrom1],
      timeTo1: [timeTo1],
      hasSplitSchedule: [hasSplit],
      timeFrom2: [timeFrom2],
      timeTo2: [timeTo2],
      schedule: [initialSchedule, Validators.required],
      notes: [location?.notes ?? ''],
      enabled: [location?.enabled ?? true],
    });
  }

  formatSchedule(
    days: string[],
    from1: string,
    to1: string,
    hasSplit: boolean,
    from2: string,
    to2: string,
  ): string {
    const daysStr = days.length > 0 ? days.join(', ') : 'Lun a Vie';
    if (hasSplit && from2 && to2) {
      return `${daysStr}: ${from1} a ${to1} y ${from2} a ${to2} hs`;
    }
    return `${daysStr}: ${from1} a ${to1} hs`;
  }

  syncSchedule(index: number): void {
    const group = this.pickupLocationsArray.at(index) as FormGroup;
    if (!group) {
      return;
    }
    const {
      days = [],
      timeFrom1 = '09:00',
      timeTo1 = '18:00',
      hasSplitSchedule = false,
      timeFrom2 = '16:30',
      timeTo2 = '20:30',
    } = group.value;
    group
      .get('schedule')
      ?.setValue(
        this.formatSchedule(days, timeFrom1, timeTo1, hasSplitSchedule, timeFrom2, timeTo2),
      );
    group.markAsDirty();
    this.form.markAsDirty();
  }

  toggleDay(locationIndex: number, day: string): void {
    const group = this.pickupLocationsArray.at(locationIndex) as FormGroup;
    if (!group) {
      return;
    }
    const currentDays: string[] = [...(group.get('days')?.value ?? [])];
    const dayIdx = currentDays.indexOf(day);
    if (dayIdx > -1) {
      currentDays.splice(dayIdx, 1);
    } else {
      currentDays.push(day);
    }
    group.get('days')?.setValue(currentDays);
    this.syncSchedule(locationIndex);
  }

  isDaySelected(locationIndex: number, day: string): boolean {
    return (this.pickupLocationsArray.at(locationIndex)?.get('days')?.value ?? []).includes(day);
  }

  addPickupLocation(): void {
    this.pickupLocationsArray.push(this.createPickupLocationGroup());
    this.form.markAsDirty();
    setTimeout(() => this.locationNameInputs.last?.nativeElement.focus(), 50);
  }

  removePickupLocation(index: number): void {
    this.pickupLocationsArray.removeAt(index);
    this.form.markAsDirty();
  }

  togglePickupLocationStatus(index: number): void {
    const group = this.pickupLocationsArray.at(index) as FormGroup;
    const enabledCtrl = group?.get('enabled');
    if (enabledCtrl) {
      enabledCtrl.setValue(!enabledCtrl.value);
      enabledCtrl.markAsDirty();
      this.form.markAsDirty();
    }
  }

  removeFavicon(): void {
    this.form.patchValue({ faviconUrl: '' });
    this.form.get('faviconUrl')?.markAsDirty();
    this.form.markAsDirty();
  }

  constructor() {
    effect(() => {
      this.populateFormFromConfig(this.storeConfigService.storeConfig());
    });
  }

  private populateFormFromConfig(cfg: StoreConfigData | null): void {
    const currentTenant = resolveTenantId();
    const delivery = cfg?.deliveryMethods ?? DEFAULT_DELIVERY_METHOD_CONFIG;

    this.patchGeneralSettings(cfg, currentTenant);
    this.patchBrandingAndSocial(cfg);
    this.patchDeliverySettings(delivery);
  }

  private patchGeneralSettings(cfg: StoreConfigData | null, currentTenant: string): void {
    this.form.patchValue({
      tenantId: cfg?.tenantId ?? currentTenant,
      storeId: cfg?.storeId ?? currentTenant,
      storeName: cfg?.storeName ?? 'Mi Tienda',
      setupCompleted: cfg?.setupCompleted ?? true,
      storeOwnerEmail: cfg?.storeOwnerEmail ?? '',
      notificationEmail: cfg?.notificationEmail ?? '',
      emailSenderName: cfg?.emailSenderName ?? '',
      emailSignature: cfg?.emailSignature ?? '',
      seo: { metaDescription: cfg?.seo?.metaDescription ?? 'Bienvenidos a mi tienda virtual.' },
    });
  }

  private patchBrandingAndSocial(cfg: StoreConfigData | null): void {
    this.form.patchValue({
      logoUrl: cfg?.logoUrl ?? '',
      faviconUrl: cfg?.faviconUrl ?? '',
      colors: {
        primary: cfg?.colors?.primary ?? '#ea580c',
        accent: cfg?.colors?.accent ?? '#ef4444',
        background: cfg?.colors?.background ?? '#ffffff',
      },
      payments: { mercadoPagoPublicKey: cfg?.payments?.mercadoPagoPublicKey ?? '' },
      contact: {
        phone: cfg?.contact?.phone ?? '+54 11 1234-5678',
        email: cfg?.contact?.email ?? 'contacto@mitienda.com',
        whatsApp: cfg?.contact?.whatsApp ?? '',
        instagram: cfg?.contact?.instagram ?? '',
        facebook: cfg?.contact?.facebook ?? '',
      },
    });
  }

  private patchDeliverySettings(delivery: typeof DEFAULT_DELIVERY_METHOD_CONFIG): void {
    this.form.patchValue({
      deliveryMethods: {
        enableHomeDelivery: delivery.enableHomeDelivery ?? true,
        enableStorePickup: delivery.enableStorePickup ?? false,
        homeDeliveryDescription:
          delivery.homeDeliveryDescription ?? 'Coordinamos el envío y costo por WhatsApp',
      },
    });

    this.pickupLocationsArray.clear();
    (delivery.pickupLocations ?? []).forEach((loc) => {
      this.pickupLocationsArray.push(this.createPickupLocationGroup(loc));
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

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.error('Formulario inválido', 'Revisá los campos obligatorios.');
      return;
    }
    this.isSubmitting.set(true);
    try {
      await this.storeConfigService.saveConfig(
        this.form.getRawValue() as unknown as StoreConfigData,
      );
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
