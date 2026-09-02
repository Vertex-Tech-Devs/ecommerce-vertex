import { CommonModule } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { StoreConfig } from '@core/models/store-config.model';
import { computeHeaderCustomProperties } from '@core/utils/font-loader';
import { FONT_PRESETS, SHADOW_PRESETS } from '../store-config/store-config.constants';
import type { FontPresetItem, ShadowPresetItem } from '../store-config/store-config.constants';

@Component({
  selector: 'app-header-management',
  templateUrl: './header-management.html',
  styleUrl: './header-management.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class HeaderManagement implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly storeConfigService = inject(StoreConfigService);
  private readonly sweetAlert = inject(SweetAlertService);

  readonly isLoading = signal<boolean>(true);
  readonly isSaving = signal<boolean>(false);
  readonly fontPresets: FontPresetItem[] = FONT_PRESETS;
  readonly shadowPresets: ShadowPresetItem[] = SHADOW_PRESETS;

  readonly form: FormGroup = this.fb.group({
    brandDisplayMode: ['text'],
    appearance: this.fb.group({
      header: this.fb.group({
        backgroundColor: ['#ffffff', Validators.required],
        textColor: ['#1f2937', Validators.required],
        accentColor: ['#000000', Validators.required],
        fontFamily: ['system', Validators.required],
        shadowStyle: ['subtle', Validators.required],
      }),
    }),
    announcementBar: this.fb.group({
      enabled: [false],
      text: [''],
      link: [''],
      backgroundColor: ['#111827'],
      textColor: ['#ffffff'],
    }),
    floatingWhatsApp: this.fb.group({
      enabled: [false],
      phoneNumber: [''],
      defaultMessage: ['¡Hola! Tengo una consulta sobre un producto de la tienda'],
    }),
  });

  readonly formValue = toSignal(this.form.valueChanges, { initialValue: this.form.value });

  /** Computed signals for Live Preview */
  readonly liveStoreName = computed(
    () => this.storeConfigService.storeConfig()?.storeName ?? 'Mi Tienda',
  );
  readonly liveLogoUrl = computed(() => this.storeConfigService.storeConfig()?.logoUrl ?? '');
  readonly liveBrandDisplayMode = computed(
    () => (this.formValue().brandDisplayMode as string) ?? 'text',
  );
  readonly liveHeaderStyles = computed(() =>
    computeHeaderCustomProperties(this.formValue()?.appearance?.header),
  );
  readonly liveShadowStyle = computed(
    () => (this.formValue()?.appearance?.header?.shadowStyle as string) ?? 'subtle',
  );
  readonly liveAnnouncementText = computed(
    () => (this.formValue().announcementBar?.text as string) ?? 'Texto de anuncio de ejemplo',
  );

  get headerGroup(): FormGroup {
    return this.form.get('appearance.header') as FormGroup;
  }

  get announcementGroup(): FormGroup {
    return this.form.get('announcementBar') as FormGroup;
  }

  ngOnInit(): void {
    this.form.get('floatingWhatsApp.enabled')?.valueChanges.subscribe((enabled: boolean) => {
      const phone = this.form.get('floatingWhatsApp.phoneNumber');
      enabled ? phone?.setValidators(Validators.required) : phone?.clearValidators();
      phone?.updateValueAndValidity({ emitEvent: false });
    });
    void this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading.set(true);
    try {
      await this.storeConfigService.loadConfig();
      const config = this.storeConfigService.storeConfig();
      if (config) {
        this.form.patchValue({
          brandDisplayMode: config.brandDisplayMode ?? 'text',
          appearance: {
            header: {
              backgroundColor: config.appearance?.header?.backgroundColor ?? '#ffffff',
              textColor: config.appearance?.header?.textColor ?? '#1f2937',
              accentColor: config.appearance?.header?.accentColor ?? '#000000',
              fontFamily: config.appearance?.header?.fontFamily ?? 'system',
              shadowStyle: config.appearance?.header?.shadowStyle ?? 'subtle',
            },
          },
          announcementBar: {
            enabled: config.announcementBar?.enabled ?? false,
            text: config.announcementBar?.text ?? '',
            link: config.announcementBar?.link ?? '',
            backgroundColor: config.announcementBar?.backgroundColor ?? '#111827',
            textColor: config.announcementBar?.textColor ?? '#ffffff',
          },
          floatingWhatsApp: {
            enabled: config.floatingWhatsApp?.enabled ?? false,
            phoneNumber: config.floatingWhatsApp?.phoneNumber ?? '',
            defaultMessage:
              config.floatingWhatsApp?.defaultMessage ??
              '¡Hola! Tengo una consulta sobre un producto de la tienda',
          },
        });
      }
    } catch (err) {
      console.error('Error loading header configuration:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  selectFont(fontId: string): void {
    this.headerGroup.patchValue({ fontFamily: fontId });
    this.headerGroup.get('fontFamily')?.markAsDirty();
    this.form.markAsDirty();
  }

  selectShadowPreset(presetId: string): void {
    this.headerGroup.patchValue({ shadowStyle: presetId });
    this.headerGroup.get('shadowStyle')?.markAsDirty();
    this.form.markAsDirty();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.warning('Campos incompletos', 'Por favor verificá los campos de cabecera.');
      return;
    }

    this.isSaving.set(true);
    try {
      const currentConfig = this.storeConfigService.storeConfig();
      const formVal = this.form.value;

      const updatedConfig: StoreConfig = {
        ...(currentConfig ?? ({} as StoreConfig)),
        brandDisplayMode: formVal.brandDisplayMode,
        appearance: {
          ...(currentConfig?.appearance ?? {}),
          header: formVal.appearance.header,
        },
        announcementBar: formVal.announcementBar,
        floatingWhatsApp: formVal.floatingWhatsApp,
      };

      await this.storeConfigService.saveConfig(updatedConfig);
      this.sweetAlert.success('Guardado exitoso', 'Configuración de cabecera guardada con éxito.');
    } catch (err) {
      console.error('Error saving header config:', err);
      this.sweetAlert.error('Error al guardar', 'Error al guardar la cabecera.');
    } finally {
      this.isSaving.set(false);
    }
  }
}
