import { CommonModule } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { StoreConfig } from '@core/models/store-config.model';
import { FONT_PRESETS } from '../store-config/store-config.constants';
import type { FontPresetItem } from '../store-config/store-config.constants';

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

  readonly form: FormGroup = this.fb.group({
    brandDisplayMode: ['text'],
    appearance: this.fb.group({
      header: this.fb.group({
        backgroundColor: ['#ffffff', Validators.required],
        textColor: ['#1f2937', Validators.required],
        accentColor: ['#000000', Validators.required],
        fontFamily: ['system', Validators.required],
      }),
    }),
    announcementBar: this.fb.group({
      enabled: [false],
      text: [''],
      link: [''],
      backgroundColor: ['#111827'],
      textColor: ['#ffffff'],
    }),
  });

  get headerGroup(): FormGroup {
    return this.form.get('appearance.header') as FormGroup;
  }

  get announcementGroup(): FormGroup {
    return this.form.get('announcementBar') as FormGroup;
  }

  ngOnInit(): void {
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
            },
          },
          announcementBar: {
            enabled: config.announcementBar?.enabled ?? false,
            text: config.announcementBar?.text ?? '',
            link: config.announcementBar?.link ?? '',
            backgroundColor: config.announcementBar?.backgroundColor ?? '#111827',
            textColor: config.announcementBar?.textColor ?? '#ffffff',
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
