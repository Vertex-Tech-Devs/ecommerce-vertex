import type { OnInit } from '@angular/core';
import { Component, inject, DestroyRef, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup, FormArray } from '@angular/forms';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import type { Observable } from 'rxjs';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { AboutUsData, AboutUsFeatureCard } from '@core/models/about-us.model';
import { AboutUsService } from '@core/services/about-us.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-about-us-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about-us-management.component.html',
  styleUrl: './about-us-management.component.scss',
})
export class AboutUsManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private aboutUsService = inject(AboutUsService);
  private alertService = inject(SweetAlertService);
  private storageService = inject(StorageService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  aboutUsForm!: FormGroup;
  data$: Observable<AboutUsData | undefined>;
  isLoading = true;
  isSubmitting = false;
  mobileActiveSection: number = 1;

  selectedBannerFile: File | null = null;
  bannerPreviewUrl: string | null = null;
  selectedCentralFile: File | null = null;
  centralPreviewUrl: string | null = null;

  // Upload progress signals
  readonly isUploadingBanner = signal(false);
  readonly uploadProgressBanner = signal(0);
  readonly isUploadingCentral = signal(false);
  readonly uploadProgressCentral = signal(0);

  get isAnyUploading(): boolean {
    return this.isUploadingBanner() || this.isUploadingCentral();
  }

  constructor() {
    this.data$ = this.aboutUsService.getAboutUsData();
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadDataIntoForm();
  }

  toggleMobileSection(section: number): void {
    this.mobileActiveSection = this.mobileActiveSection === section ? 0 : section;
  }

  private buildForm(data: AboutUsData | null = null): void {
    const d = data ?? ({} as Partial<AboutUsData>);
    this.aboutUsForm = this.fb.group({
      bannerTitle: [d.bannerTitle ?? '', Validators.required],
      bannerSubtitle: [d.bannerSubtitle ?? ''],
      bannerImageUrl: [d.bannerImageUrl ?? '', [Validators.pattern('https?://.+')]],
      centralTitle: [d.centralTitle ?? '', Validators.required],
      centralImageUrl: [d.centralImageUrl ?? '', [Validators.pattern('https?://.+')]],
      centralDescription: [
        d.centralDescription ?? '',
        [Validators.required, Validators.minLength(50), Validators.maxLength(1000)],
      ],
      cardsSectionTitle: [d.cardsSectionTitle ?? '', Validators.required],
      featureCards: this.fb.array(
        [],
        [Validators.required, Validators.minLength(2), Validators.maxLength(3)],
      ),
    });
    this.initFeatureCards(data);
  }

  private initFeatureCards(data: AboutUsData | null): void {
    if (data?.featureCards && data.featureCards.length > 0) {
      data.featureCards.forEach((card) => this.addFeatureCard(card));
    }
    while (this.featureCards.length < 2) {
      this.addFeatureCard();
    }
  }

  private loadDataIntoForm(): void {
    this.isLoading = true;
    this.data$.pipe(take(1), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        if (data) {
          this.buildForm(data);
        } else {
          this.buildForm();
        }
        this.bannerPreviewUrl = null;
        this.centralPreviewUrl = null;
        this.selectedBannerFile = null;
        this.selectedCentralFile = null;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading About Us data:', err);
        this.buildForm(); // Initialize with empty values on error
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  get featureCards(): FormArray {
    return this.aboutUsForm.get('featureCards') as FormArray;
  }

  private createFeatureCardGroup(card: AboutUsFeatureCard | null = null): FormGroup {
    return this.fb.group({
      title: [card?.title ?? '', Validators.required],
      content: [card?.content ?? '', Validators.required],
    });
  }

  addFeatureCard(cardData?: AboutUsFeatureCard): void {
    if (this.featureCards.length >= 3) {
      return;
    }
    const cardGroup = this.createFeatureCardGroup(cardData ?? null);
    this.featureCards.push(cardGroup);
  }

  removeFeatureCard(index: number): void {
    if (this.featureCards.length <= 2) {
      return;
    }
    void this.alertService
      .confirm(
        '¿Eliminar tarjeta?',
        'Esta acción eliminará la tarjeta seleccionada de la lista.',
        'warning',
      )
      .then((confirmed) => {
        if (confirmed) {
          this.featureCards.removeAt(index);
          this.aboutUsForm.markAsDirty();
        }
      });
  }

  onFileSelected(event: Event, type: 'banner' | 'central'): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.[0]) {
      return;
    }
    const file = input.files[0];
    input.value = '';

    if (!file.type.startsWith('image/')) {
      this.alertService.error('Archivo no válido', 'Por favor, selecciona un archivo de imagen.');
      return;
    }

    // Show local preview immediately via FileReader
    const reader = new FileReader();
    reader.onload = (): void => {
      const previewUrl = reader.result as string;
      if (type === 'banner') {
        this.bannerPreviewUrl = previewUrl;
      } else {
        this.centralPreviewUrl = previewUrl;
      }
      this.cdr.markForCheck();
    };
    reader.readAsDataURL(file);

    // Start upload immediately and track real-time progress
    const storagePath = type === 'banner' ? 'pages/about-us/banner' : 'pages/about-us/central';
    const upload = this.storageService.uploadFile(file, storagePath);

    if (type === 'banner') {
      this.isUploadingBanner.set(true);
      this.uploadProgressBanner.set(0);
    } else {
      this.isUploadingCentral.set(true);
      this.uploadProgressCentral.set(0);
    }

    upload.progress$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (progress) => {
        if (type === 'banner') {
          this.uploadProgressBanner.set(Math.round(progress));
        } else {
          this.uploadProgressCentral.set(Math.round(progress));
        }
        this.cdr.markForCheck();
      },
    });

    upload.downloadUrl$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (url) => {
        if (type === 'banner') {
          this.bannerPreviewUrl = url;
          this.aboutUsForm.get('bannerImageUrl')?.setValue(url);
          this.selectedBannerFile = null;
          this.isUploadingBanner.set(false);
          this.uploadProgressBanner.set(0);
        } else {
          this.centralPreviewUrl = url;
          this.aboutUsForm.get('centralImageUrl')?.setValue(url);
          this.selectedCentralFile = null;
          this.isUploadingCentral.set(false);
          this.uploadProgressCentral.set(0);
        }
        this.aboutUsForm.markAsDirty();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(`Error uploading ${type} image:`, err);
        this.alertService.error(
          'Error al subir imagen',
          'No se pudo subir la imagen. Por favor, intenta de nuevo.',
        );
        if (type === 'banner') {
          this.isUploadingBanner.set(false);
          this.uploadProgressBanner.set(0);
          this.bannerPreviewUrl = null;
        } else {
          this.isUploadingCentral.set(false);
          this.uploadProgressCentral.set(0);
          this.centralPreviewUrl = null;
        }
        this.cdr.markForCheck();
      },
    });
  }

  onSubmit(): void {
    if (this.isAnyUploading) {
      this.alertService.error(
        'Carga en progreso',
        'Espera a que termine la subida de imágenes antes de guardar.',
      );
      return;
    }
    if (this.aboutUsForm.invalid) {
      this.aboutUsForm.markAllAsTouched();
      this.alertService.error(
        'Formulario Inválido',
        'Por favor, revisa todos los campos marcados en rojo.',
      );
      return;
    }

    this.isSubmitting = true;
    this.alertService.loading('Guardando Cambios...');

    const formData = this.aboutUsForm.value as AboutUsData;

    // Images are already uploaded; pass null files to avoid re-uploading
    this.aboutUsService
      .saveAboutUsData(formData, null, null)
      .then(() => {
        this.alertService.success(
          '¡Guardado!',
          'El contenido de la página "Nosotros" ha sido actualizado.',
        );
        this.aboutUsForm.markAsPristine();
        this.bannerPreviewUrl = null;
        this.centralPreviewUrl = null;
        this.selectedBannerFile = null;
        this.selectedCentralFile = null;
      })
      .catch((err) => {
        console.error('Error saving data:', err);
        this.alertService.error('Error', 'No se pudieron guardar los cambios.');
      })
      .finally(() => {
        this.isSubmitting = false;
        this.alertService.close();
      });
  }

  resetForm(): void {
    this.loadDataIntoForm();
  }
}
