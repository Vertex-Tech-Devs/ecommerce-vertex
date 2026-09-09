import type { OnInit, ElementRef } from '@angular/core';
import { Component, inject, DestroyRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup, AbstractControl } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import type { FooterData } from '@core/models/footer.model';
import { FooterService } from '@core/services/footer.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import {
  normalizeInstagramUrl,
  normalizeFacebookUrl,
  normalizeWhatsAppUrl,
} from '@core/utils/url.utils';

@Component({
  selector: 'app-footer-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './footer-management.html',
  styleUrl: './footer-management.scss',
})
export class FooterManagement implements OnInit {
  private fb = inject(FormBuilder);
  private footerService = inject(FooterService);
  private alertService = inject(SweetAlertService);
  private destroyRef = inject(DestroyRef);

  @ViewChild('firstInput') firstInput?: ElementRef<HTMLInputElement>;

  footerForm!: FormGroup;

  readonly isLoading = signal(false);
  readonly isSaving = signal(false);

  /** Getter for backwards-compatibility */
  get isSubmitting(): boolean {
    return this.isSaving();
  }

  // Permissive pattern that allows full URLs, wa.me URLs, @handles, domain paths, or phone numbers
  private urlPattern =
    /^(|https?:\/\/[^\s$.?#].[^\s]*|wa\.me\/[^\s]+|@[\w.-]+|[\w.-]+\.[a-z]{2,}[^\s]*|\+?[0-9\s()-]{6,})$/i;

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadDataIntoForm();
  }

  private buildForm(data: FooterData | null = null): void {
    this.footerForm = this.fb.group({
      contactPhone: [data?.contactPhone ?? ''],
      contactEmail: [data?.contactEmail ?? '', [Validators.required, Validators.email]],

      socialInstagramUrl: [data?.socialInstagramUrl ?? '', [Validators.pattern(this.urlPattern)]],
      socialFacebookUrl: [data?.socialFacebookUrl ?? '', [Validators.pattern(this.urlPattern)]],
      socialWhatsAppUrl: [data?.socialWhatsAppUrl ?? '', [Validators.pattern(this.urlPattern)]],

      copyrightText: [data?.copyrightText ?? '', Validators.required],
    });
  }

  private loadDataIntoForm(): void {
    this.isLoading.set(true);
    this.footerService
      .getFooterData()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          if (data) {
            this.buildForm(data);
          } else {
            this.buildForm();
          }
          this.isLoading.set(false);
          this.scheduleAutofocus();
        },
        error: (err) => {
          console.error('Error loading Footer data:', err);
          this.buildForm();
          this.isLoading.set(false);
          this.scheduleAutofocus();
        },
      });
  }

  private scheduleAutofocus(): void {
    setTimeout(() => {
      this.firstInput?.nativeElement?.focus();
    }, 0);
  }

  get contactPhone(): AbstractControl {
    return this.footerForm.get('contactPhone')!;
  }
  get email(): AbstractControl {
    return this.footerForm.get('contactEmail')!;
  }
  get instagram(): AbstractControl {
    return this.footerForm.get('socialInstagramUrl')!;
  }
  get facebook(): AbstractControl {
    return this.footerForm.get('socialFacebookUrl')!;
  }
  get whatsapp(): AbstractControl {
    return this.footerForm.get('socialWhatsAppUrl')!;
  }
  get copyright(): AbstractControl {
    return this.footerForm.get('copyrightText')!;
  }

  onSubmit(): void {
    if (this.footerForm.invalid) {
      this.footerForm.markAllAsTouched();
      this.alertService.error(
        'Formulario Inválido',
        'Revisa los campos, algunas URLs o el email no son válidos.',
      );
      return;
    }

    this.isSaving.set(true);
    this.alertService.loading('Actualizando Footer...');

    const rawData = this.footerForm.value;
    const formData: FooterData = {
      contactPhone: rawData.contactPhone ?? '',
      contactEmail: rawData.contactEmail ?? '',
      socialInstagramUrl: normalizeInstagramUrl(rawData.socialInstagramUrl),
      socialFacebookUrl: normalizeFacebookUrl(rawData.socialFacebookUrl),
      socialWhatsAppUrl: normalizeWhatsAppUrl(rawData.socialWhatsAppUrl),
      copyrightText: rawData.copyrightText ?? '',
    };

    this.footerService
      .saveFooterData(formData)
      .then(() => {
        this.alertService.success('¡Actualizado!', 'La información del footer ha sido guardada.');
        this.footerForm.markAsPristine();
      })
      .catch((err) => {
        console.error('Error saving footer data:', err);
        this.alertService.error('Error', 'No se pudieron guardar los cambios.');
      })
      .finally(() => {
        this.isSaving.set(false);
      });
  }

  resetForm(): void {
    void this.alertService
      .confirm(
        'Descartar Cambios',
        '¿Quieres descartar los cambios no guardados y recargar los datos actuales?',
      )
      .then((confirmed) => {
        if (confirmed) {
          this.loadDataIntoForm();
        }
      });
  }
}
