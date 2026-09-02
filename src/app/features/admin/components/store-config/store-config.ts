import {
  Component,
  inject,
  signal,
  computed,
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
  HeaderShadowPreset,
  HeaderFontPreset,
} from '@core/models/store-config.model';
import {
  DEFAULT_DELIVERY_METHOD_CONFIG,
  DEFAULT_HEADER_APPEARANCE,
  WEEK_DAYS,
  TIME_SLOTS,
} from '@core/models/store-config.model';
import { computeHeaderCustomProperties, loadGoogleFont } from '@core/utils/font-loader';
import { resolveTenantId } from '@core/utils/tenant';
import { RouterModule } from '@angular/router';
import { SHADOW_PRESETS, FONT_PRESETS, formatSchedule } from './store-config.constants';
import { createStoreConfigForm, createPickupLocationGroup } from './store-config.form';

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

  readonly shadowPresets = SHADOW_PRESETS;
  readonly fontPresets = FONT_PRESETS;

  @ViewChildren('locationNameInput', { read: ElementRef })
  locationNameInputs!: QueryList<ElementRef>;

  readonly isOwner = toSignal(this.authService.isOwner$, { initialValue: false });
  readonly isLoading = this.storeConfigService.isLoading;
  isSubmitting = signal(false);

  faviconProgress = signal<number>(0);
  faviconUploading = signal<boolean>(false);

  logoUploadProgress = signal<number>(0);
  isUploadingLogo = signal<boolean>(false);

  form: FormGroup = createStoreConfigForm(this.fb);

  readonly formValue = toSignal(this.form.valueChanges, { initialValue: this.form.value });

  readonly liveStoreName = computed(() => this.formValue()?.storeName ?? 'Mi Tienda');
  readonly liveLogoUrl = computed(() => this.formValue()?.logoUrl ?? '');
  readonly liveBrandDisplayMode = computed(() => this.formValue()?.brandDisplayMode ?? 'text');
  readonly liveHeaderStyles = computed(() =>
    computeHeaderCustomProperties(this.formValue()?.appearance?.header),
  );
  readonly liveFontFamily = computed(
    () => this.formValue()?.appearance?.header?.fontFamily ?? 'system',
  );
  readonly liveShadowStyle = computed(
    () => this.formValue()?.appearance?.header?.shadowStyle ?? 'subtle',
  );
  readonly liveHeaderBg = computed(
    () => this.formValue()?.appearance?.header?.backgroundColor ?? '#ffffff',
  );
  readonly liveHeaderText = computed(
    () => this.formValue()?.appearance?.header?.textColor ?? '#1f2937',
  );
  readonly liveHeaderAccent = computed(
    () => this.formValue()?.appearance?.header?.accentColor ?? '#0d6efd',
  );

  get headerAppearanceGroup(): FormGroup {
    return this.form.get('appearance.header') as FormGroup;
  }

  selectShadowPreset(preset: HeaderShadowPreset): void {
    this.headerAppearanceGroup.patchValue({ shadowStyle: preset });
    this.headerAppearanceGroup.get('shadowStyle')?.markAsDirty();
    this.form.markAsDirty();
  }

  selectFontPreset(font: HeaderFontPreset): void {
    this.headerAppearanceGroup.patchValue({ fontFamily: font });
    this.headerAppearanceGroup.get('fontFamily')?.markAsDirty();
    this.form.markAsDirty();
  }

  get deliveryMethodsGroup(): FormGroup {
    return this.form.get('deliveryMethods') as FormGroup;
  }

  get pickupLocationsArray(): FormArray {
    return this.deliveryMethodsGroup.get('pickupLocations') as FormArray;
  }

  createPickupLocationGroup(location?: Partial<StorePickupLocation>): FormGroup {
    return createPickupLocationGroup(this.fb, location);
  }

  formatSchedule(
    days: string[],
    from1: string,
    to1: string,
    hasSplit: boolean,
    from2: string,
    to2: string,
  ): string {
    return formatSchedule(days, from1, to1, hasSplit, from2, to2);
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

  removeLogo(): void {
    this.form.patchValue({ logoUrl: '' });
    this.form.get('logoUrl')?.markAsDirty();
    this.form.markAsDirty();
  }

  constructor() {
    effect(() => {
      this.populateFormFromConfig(this.storeConfigService.storeConfig());
    });

    effect(() => {
      const font = this.liveFontFamily();
      if (font) {
        loadGoogleFont(font);
      }
    });

    const announcementGroup = this.form.get('announcementBar') as FormGroup;
    announcementGroup
      .get('enabled')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((enabled: boolean) => {
        const textCtrl = announcementGroup.get('text');
        if (enabled) {
          textCtrl?.setValidators([Validators.required]);
        } else {
          textCtrl?.clearValidators();
        }
        textCtrl?.updateValueAndValidity();
      });

    const floatingWhatsAppGroup = this.form.get('floatingWhatsApp') as FormGroup;
    floatingWhatsAppGroup
      .get('enabled')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((enabled: boolean) => {
        const phoneCtrl = floatingWhatsAppGroup.get('phoneNumber');
        if (enabled) {
          phoneCtrl?.setValidators([Validators.required]);
        } else {
          phoneCtrl?.clearValidators();
        }
        phoneCtrl?.updateValueAndValidity();
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
    this.patchBrandingAndColors(cfg);
    this.patchAppearance(cfg);
    this.patchSocialAndWidgets(cfg);
  }

  private patchAppearance(cfg: StoreConfigData | null): void {
    const header = cfg?.appearance?.header ?? DEFAULT_HEADER_APPEARANCE;
    this.form.patchValue({
      appearance: {
        header: {
          backgroundColor: header.backgroundColor ?? '#ffffff',
          textColor: header.textColor ?? '#1f2937',
          accentColor: header.accentColor ?? '#0d6efd',
          shadowStyle: header.shadowStyle ?? 'subtle',
          fontFamily: header.fontFamily ?? 'system',
        },
      },
    });
  }

  private patchBrandingAndColors(cfg: StoreConfigData | null): void {
    this.form.patchValue({
      logoUrl: cfg?.logoUrl ?? '',
      faviconUrl: cfg?.faviconUrl ?? '',
      brandDisplayMode: cfg?.brandDisplayMode ?? 'text',
      colors: {
        primary: cfg?.colors?.primary ?? '#ea580c',
        accent: cfg?.colors?.accent ?? '#ef4444',
        background: cfg?.colors?.background ?? '#ffffff',
      },
      payments: { mercadoPagoPublicKey: cfg?.payments?.mercadoPagoPublicKey ?? '' },
    });
  }

  private patchSocialAndWidgets(cfg: StoreConfigData | null): void {
    this.patchContactInfo(cfg);
    this.patchWidgets(cfg);
  }

  private patchContactInfo(cfg: StoreConfigData | null): void {
    this.form.patchValue({
      contact: {
        phone: cfg?.contact?.phone ?? '+54 11 1234-5678',
        email: cfg?.contact?.email ?? 'contacto@mitienda.com',
        whatsApp: cfg?.contact?.whatsApp ?? '',
        instagram: cfg?.contact?.instagram ?? '',
        facebook: cfg?.contact?.facebook ?? '',
      },
    });
  }

  private patchWidgets(cfg: StoreConfigData | null): void {
    const isFloatingEnabled = cfg?.floatingWhatsApp?.enabled ?? false;
    const phoneCtrl = this.form.get('floatingWhatsApp.phoneNumber');
    if (isFloatingEnabled) {
      phoneCtrl?.setValidators([Validators.required]);
    } else {
      phoneCtrl?.clearValidators();
    }

    this.form.patchValue({
      announcementBar: {
        enabled: cfg?.announcementBar?.enabled ?? false,
        text: cfg?.announcementBar?.text ?? '',
        link: cfg?.announcementBar?.link ?? '',
        backgroundColor: cfg?.announcementBar?.backgroundColor ?? '#111827',
        textColor: cfg?.announcementBar?.textColor ?? '#ffffff',
      },
      floatingWhatsApp: {
        enabled: isFloatingEnabled,
        phoneNumber: cfg?.floatingWhatsApp?.phoneNumber ?? '',
        defaultMessage:
          cfg?.floatingWhatsApp?.defaultMessage ??
          '¡Hola! Tengo una consulta sobre un producto de la tienda',
      },
    });

    phoneCtrl?.updateValueAndValidity();
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
