import {
  Component,
  inject,
  signal,
  computed,
  DestroyRef,
  effect,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import type { ElementRef } from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type {
  StoreConfig,
  HeaderAppearanceConfig,
  HeaderFontPreset,
} from '@core/models/store-config.model';
import { DEFAULT_HEADER_APPEARANCE } from '@core/models/store-config.model';
import { computeHeaderCustomProperties, loadGoogleFont } from '@core/utils/font-loader';
import { FONT_PRESETS } from './header-announcements.constants';
import { createHeaderAnnouncementsForm } from './header-announcements.form';

@Component({
  selector: 'app-header-announcements',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './header-announcements.html',
  styleUrl: './header-announcements.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderAnnouncements {
  private fb = inject(FormBuilder);
  private storeConfigService = inject(StoreConfigService);
  private sweetAlert = inject(SweetAlertService);
  private destroyRef = inject(DestroyRef);

  readonly fontPresets = FONT_PRESETS;

  saving = signal(false);
  loading = signal(true);

  @ViewChild('announcementTextInput') announcementTextInput?: ElementRef<HTMLInputElement>;
  @ViewChild('whatsappPhoneInput') whatsappPhoneInput?: ElementRef<HTMLInputElement>;

  form: FormGroup = createHeaderAnnouncementsForm(this.fb);

  readonly formValue = toSignal(this.form.valueChanges, { initialValue: this.form.value });

  readonly liveStoreName = computed(
    () => this.storeConfigService.storeConfig()?.storeName ?? 'Mi Tienda',
  );
  readonly liveLogoUrl = computed(() => this.storeConfigService.storeConfig()?.logoUrl ?? '');
  readonly liveBrandDisplayMode = computed(
    () => this.storeConfigService.storeConfig()?.brandDisplayMode ?? 'text',
  );

  readonly liveHeaderStyles = computed(() =>
    computeHeaderCustomProperties(this.formValue()?.appearance?.header),
  );
  readonly liveFontFamily = computed(
    () => this.formValue()?.appearance?.header?.fontFamily ?? 'system',
  );
  readonly liveHeaderBg = computed(
    () => this.formValue()?.appearance?.header?.backgroundColor ?? '#ffffff',
  );
  readonly liveHeaderText = computed(
    () => this.formValue()?.appearance?.header?.textColor ?? '#1f2937',
  );
  readonly liveHeaderAccent = computed(
    () => this.formValue()?.appearance?.header?.accentColor ?? '#000000',
  );

  get headerAppearanceGroup(): FormGroup {
    return this.form.get('appearance.header') as FormGroup;
  }

  constructor() {
    effect(() => {
      const cfg = this.storeConfigService.storeConfig();
      const isServiceLoading = this.storeConfigService.isLoading();
      if (!isServiceLoading) {
        this.loading.set(false);
      }
      if (cfg) {
        this.populateFormFromConfig(cfg);
      }
    });

    effect(() => {
      const font = this.liveFontFamily();
      if (font) {
        loadGoogleFont(font);
      }
    });

    this.setupConditionalValidatorsAndFocus();
  }

  private setupConditionalValidatorsAndFocus(): void {
    const announcementGroup = this.form.get('announcementBar') as FormGroup;
    announcementGroup
      .get('enabled')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((enabled: boolean) => {
        const textCtrl = announcementGroup.get('text');
        if (enabled) {
          textCtrl?.setValidators([Validators.required]);
          setTimeout(() => {
            this.announcementTextInput?.nativeElement?.focus();
          });
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
          setTimeout(() => {
            this.whatsappPhoneInput?.nativeElement?.focus();
          });
        } else {
          phoneCtrl?.clearValidators();
        }
        phoneCtrl?.updateValueAndValidity();
      });
  }

  selectFontPreset(font: HeaderFontPreset): void {
    this.headerAppearanceGroup.patchValue({ fontFamily: font });
    this.headerAppearanceGroup.get('fontFamily')?.markAsDirty();
    this.form.markAsDirty();
  }

  private populateFormFromConfig(cfg: StoreConfig): void {
    const header = cfg.appearance?.header ?? DEFAULT_HEADER_APPEARANCE;
    const isFloatingEnabled = cfg.floatingWhatsApp?.enabled ?? false;
    const phoneCtrl = this.form.get('floatingWhatsApp.phoneNumber');
    const textCtrl = this.form.get('announcementBar.text');

    if (isFloatingEnabled) {
      phoneCtrl?.setValidators([Validators.required]);
    } else {
      phoneCtrl?.clearValidators();
    }

    if (cfg.announcementBar?.enabled) {
      textCtrl?.setValidators([Validators.required]);
    } else {
      textCtrl?.clearValidators();
    }

    this.form.patchValue({
      appearance: {
        header: {
          backgroundColor: header.backgroundColor ?? '#ffffff',
          textColor: header.textColor ?? '#1f2937',
          accentColor: header.accentColor ?? '#000000',
          fontFamily: header.fontFamily ?? 'system',
        },
      },
      announcementBar: {
        enabled: cfg.announcementBar?.enabled ?? false,
        text: cfg.announcementBar?.text ?? '',
        link: cfg.announcementBar?.link ?? '',
        backgroundColor: cfg.announcementBar?.backgroundColor ?? '#111827',
        textColor: cfg.announcementBar?.textColor ?? '#ffffff',
      },
      floatingWhatsApp: {
        enabled: isFloatingEnabled,
        phoneNumber: cfg.floatingWhatsApp?.phoneNumber ?? '',
        defaultMessage:
          cfg.floatingWhatsApp?.defaultMessage ??
          '¡Hola! Tengo una consulta sobre un producto de la tienda',
      },
    });

    phoneCtrl?.updateValueAndValidity();
    textCtrl?.updateValueAndValidity();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.error('Formulario inválido', 'Revisá los campos obligatorios.');
      return;
    }

    this.saving.set(true);
    try {
      const raw = this.form.getRawValue();
      const currentHeader = this.storeConfigService.storeConfig()?.appearance?.header;
      const headerConfig: HeaderAppearanceConfig = {
        backgroundColor: raw.appearance?.header?.backgroundColor ?? '#ffffff',
        textColor: raw.appearance?.header?.textColor ?? '#1f2937',
        accentColor: raw.appearance?.header?.accentColor ?? '#000000',
        fontFamily: raw.appearance?.header?.fontFamily ?? 'system',
        shadowStyle: currentHeader?.shadowStyle ?? DEFAULT_HEADER_APPEARANCE.shadowStyle,
      };
      const announcementsConfig = {
        announcementBar: raw.announcementBar,
        floatingWhatsApp: raw.floatingWhatsApp,
      };

      await this.storeConfigService.updateHeaderAndAnnouncements(headerConfig, announcementsConfig);
      this.form.markAsPristine();
      this.sweetAlert.success(
        '¡Listo!',
        'El encabezado y los anuncios fueron guardados con éxito.',
      );
    } catch (err) {
      console.error('Error al guardar la configuración de encabezado y anuncios:', err);
      this.sweetAlert.error(
        'Error',
        'No se pudo guardar la configuración de encabezado y anuncios.',
      );
    } finally {
      this.saving.set(false);
    }
  }
}
