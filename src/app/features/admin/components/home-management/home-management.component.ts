import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';

import { HomeContentService } from '@core/services/home-content.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { ImageValidationService } from '@core/services/image-validation.service';
import { CategoryService } from '@core/services/category.service';
import type {
  CarouselSettings,
  FeaturedCategory,
  HeroBanner,
} from '@core/models/home-content.model';
import type { Category } from '@core/models/category.model';
import type { Observable } from 'rxjs';

@Component({
  selector: 'app-home-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-management.component.html',
  styleUrls: ['./home-management.component.scss'],
})
export class HomeManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private homeContentService = inject(HomeContentService);
  private sweetAlertService = inject(SweetAlertService);
  private imageValidationService = inject(ImageValidationService);
  private categoryService = inject(CategoryService);

  bannerForm!: FormGroup;
  isSubmitting = false;
  categories$!: Observable<Category[]>;

  // Carrusel de imágenes hero
  heroImages: string[] = [];
  selectedHeroFiles: File[] = [];
  heroImagePreviews: string[] = [];
  isDragOver = false;
  carouselSettings: CarouselSettings = {
    interval: 4000,
    showIndicators: true,
  };

  // Legacy: Compatibilidad con banner único
  selectedBannerFile: File | null = null;
  bannerPreviewUrl: string | null = null;
  selectedCategoryFiles: (File | null)[] = [];
  categoryPreviewUrls: (string | null)[] = [];

  private categoryMap = new Map<string, { name: string; slug: string }>();
  private readonly MAX_HERO_IMAGES = 5;
  private readonly ALLOWED_IMAGE_TYPES = ['image/webp', 'image/jpeg', 'image/png'];
  private readonly ALLOWED_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png'];

  ngOnInit(): void {
    this.initializeForm();
    this.categories$ = this.categoryService.getCategories().pipe(
      take(1),
      map((categories: Category[]) => {
        this.categoryMap.clear();
        categories.forEach((cat: Category) =>
          this.categoryMap.set(cat.id!, { name: cat.name, slug: cat.slug })
        );
        return categories;
      })
    );
    this.loadContentData();
  }

  private initializeForm(): void {
    this.bannerForm = this.fb.group({
      carouselSettings: this.fb.group({
        interval: [4000, [Validators.required, Validators.min(1000)]],
        showIndicators: [true],
      }),
      featuredCategories: this.fb.array([]),
    });
  }

  private loadContentData(): void {
    this.homeContentService
      .getHeroBanner()
      .pipe(take(1))
      .subscribe((content) => {
        if (content) {
          // Cargar imágenes del carrusel
          if (content.heroImages && content.heroImages.length > 0) {
            this.heroImages = [...content.heroImages];
            this.heroImagePreviews = [...content.heroImages];
            this.selectedHeroFiles = [];
          }

          // Cargar configuración del carrusel
          if (content.carouselSettings) {
            this.carouselSettings = { ...content.carouselSettings };
          }

          this.bannerForm.patchValue({
            carouselSettings: this.carouselSettings,
          });

          this.featuredCategories.clear();
          this.selectedCategoryFiles = [];
          this.categoryPreviewUrls = [];
          if (content.featuredCategories) {
            content.featuredCategories.forEach((cat) => this.addFeaturedCategory(cat));
          }
        }
      });
  }

  get featuredCategories(): FormArray {
    return this.bannerForm.get('featuredCategories') as FormArray;
  }

  get carouselSettingsGroup(): FormGroup {
    return this.bannerForm.get('carouselSettings') as FormGroup;
  }

  get carouselIntervalControl(): AbstractControl | null {
    return this.carouselSettingsGroup.get('interval');
  }
  get emptySlots(): null[] {
    return Array(Math.max(0, this.MAX_HERO_IMAGES - this.heroImagePreviews.length)).fill(null);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.heroImages.length < this.MAX_HERO_IMAGES) {
      this.isDragOver = true;
    }
  }

  onDragLeave(): void {
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    if (this.heroImages.length >= this.MAX_HERO_IMAGES) {
      return;
    }
    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) {
      return;
    }
    const fakeEvent = { target: { files } } as unknown as Event;
    this.onHeroImagesSelected(fakeEvent);
  }
  get carouselShowIndicatorsControl(): AbstractControl | null {
    return this.carouselSettingsGroup.get('showIndicators');
  }

  private newFeaturedCategory(category?: FeaturedCategory): FormGroup {
    return this.fb.group({
      categoryId: [category?.categoryId ?? null, Validators.required],
      name: [category?.name ?? ''],
      slug: [category?.slug ?? ''],
      imageUrl: [category?.imageUrl ?? '', [Validators.pattern('https?://.+')]],
    });
  }

  addFeaturedCategory(category?: FeaturedCategory): void {
    if (this.featuredCategories.length < 3) {
      this.featuredCategories.push(this.newFeaturedCategory(category));
      this.selectedCategoryFiles.push(null);
      this.categoryPreviewUrls.push(null);
    }
  }

  removeFeaturedCategory(index: number): void {
    this.featuredCategories.removeAt(index);
    this.selectedCategoryFiles.splice(index, 1);
    this.categoryPreviewUrls.splice(index, 1);
  }

  onCategorySelectionChange(index: number, event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const categoryData = this.categoryMap.get(selectedId);
    if (categoryData) {
      this.featuredCategories.at(index).patchValue({
        name: categoryData.name,
        slug: categoryData.slug,
      });
    }
  }

  private isValidImageFile(file: File): boolean {
    return (
      this.ALLOWED_IMAGE_TYPES.includes(file.type) ||
      this.ALLOWED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext))
    );
  }

  onHeroImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    const newFiles = Array.from(input.files);
    const validFiles: File[] = [];

    // Validar cada archivo
    for (const file of newFiles) {
      if (!this.isValidImageFile(file)) {
        this.sweetAlertService.error(
          'Formato no permitido',
          `El archivo "${file.name}" no es un formato permitido (WebP, JPG, PNG).`
        );
        continue;
      }
      validFiles.push(file);
    }

    // Validar cantidad total de imágenes
    const totalImages = this.heroImages.length + validFiles.length;
    if (totalImages > this.MAX_HERO_IMAGES) {
      this.sweetAlertService.error(
        'Límite de imágenes',
        `Máximo ${this.MAX_HERO_IMAGES} imágenes permitidas. Tienes ${this.heroImages.length} actualmente.`
      );
      input.value = '';
      return;
    }

    // Validar dimensiones y calidad de cada imagen
    const validationPromises = validFiles.map(async (file) => {
      const validation = await this.imageValidationService.validateHeroImage(file);
      return { file, validation };
    });

    void Promise.all(validationPromises).then(async (results) => {
      const validatedFiles: File[] = [];
      const invalidFiles: Array<{ file: File; validation: (typeof results)[0]['validation'] }> = [];

      results.forEach(({ file, validation }) => {
        if (!validation.valid) {
          invalidFiles.push({ file, validation });
        } else {
          validatedFiles.push(file);
        }
      });

      // Mostrar confirmación para imágenes inválidas
      if (invalidFiles.length > 0) {
        const errorMessage = invalidFiles
          .map(
            (item) =>
              `📷 ${item.file.name}\n${item.validation.errors.map((e) => `  • ${e}`).join('\n')}`
          )
          .join('\n\n');

        const shouldContinue = await this.sweetAlertService.confirm(
          '⚠️ Imágenes de Baja Calidad',
          `${errorMessage}\n\nRecomendaciones:\n✓ Resolución ideal: ${this.imageValidationService.getQualityRecommendations().idealResolution}\n✓ Proporción: 16:9\n✓ Tamaño máximo: 2MB\n\n¿Deseas continuar de todas formas?`,
          'warning'
        );

        if (!shouldContinue) {
          input.value = '';
          return;
        }

        // Agregar también las imágenes inválidas
        validatedFiles.push(...invalidFiles.map((item) => item.file));
      }

      const filesToAdd = validatedFiles.length > 0 ? validatedFiles : validFiles;

      if (filesToAdd.length === 0) {
        input.value = '';
        return;
      }

      filesToAdd.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (): void => {
          const previewUrl = reader.result as string;
          this.heroImages.push(`file-${Date.now()}-${index}`); // Placeholder
          this.heroImagePreviews.push(previewUrl);
          this.selectedHeroFiles.push(file);
          this.bannerForm.markAsDirty();
        };
        reader.readAsDataURL(file);
      });

      input.value = '';
    });
  }

  removeHeroImage(index: number): void {
    this.heroImages.splice(index, 1);
    this.heroImagePreviews.splice(index, 1);
    this.selectedHeroFiles.splice(index, 1);
    this.bannerForm.markAsDirty();
  }

  moveHeroImageUp(index: number): void {
    if (index > 0) {
      [this.heroImages[index], this.heroImages[index - 1]] = [
        this.heroImages[index - 1],
        this.heroImages[index],
      ];
      [this.heroImagePreviews[index], this.heroImagePreviews[index - 1]] = [
        this.heroImagePreviews[index - 1],
        this.heroImagePreviews[index],
      ];
      [this.selectedHeroFiles[index], this.selectedHeroFiles[index - 1]] = [
        this.selectedHeroFiles[index - 1],
        this.selectedHeroFiles[index],
      ];
      this.bannerForm.markAsDirty();
    }
  }

  moveHeroImageDown(index: number): void {
    if (index < this.heroImages.length - 1) {
      [this.heroImages[index], this.heroImages[index + 1]] = [
        this.heroImages[index + 1],
        this.heroImages[index],
      ];
      [this.heroImagePreviews[index], this.heroImagePreviews[index + 1]] = [
        this.heroImagePreviews[index + 1],
        this.heroImagePreviews[index],
      ];
      [this.selectedHeroFiles[index], this.selectedHeroFiles[index + 1]] = [
        this.selectedHeroFiles[index + 1],
        this.selectedHeroFiles[index],
      ];
      this.bannerForm.markAsDirty();
    }
  }

  onFileSelected(event: Event, type: 'main' | number): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        this.sweetAlertService.error(
          'Archivo no válido',
          'Por favor, selecciona un archivo de imagen.'
        );
        input.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (): void => {
        const previewUrl = reader.result as string;
        if (type === 'main') {
          this.selectedBannerFile = file;
          this.bannerPreviewUrl = previewUrl;
        } else {
          this.selectedCategoryFiles[type] = file;
          this.categoryPreviewUrls[type] = previewUrl;
          this.featuredCategories.at(type).get('imageUrl')?.setValue('');
        }
        this.bannerForm.markAsDirty();
      };
      reader.readAsDataURL(file);
      input.value = '';
    }
  }

  async onSubmit(): Promise<void> {
    // Validar que haya al menos una imagen en el carrusel
    if (this.heroImages.length === 0) {
      this.sweetAlertService.error(
        'Imágenes requeridas',
        'Debes agregar al menos una imagen al carrusel hero.'
      );
      return;
    }

    if (this.bannerForm.invalid) {
      this.bannerForm.markAllAsTouched();
      this.sweetAlertService.error(
        'Formulario Inválido',
        'Por favor revisa los campos marcados en rojo.'
      );
      return;
    }

    this.isSubmitting = true;
    try {
      // Actualizar configuración del carrusel desde el formulario
      this.carouselSettings = this.carouselSettingsGroup.value;

      // Preparar datos para guardar
      const contentData: HeroBanner = {
        ...this.bannerForm.value,
        heroImages: this.heroImages,
        carouselSettings: this.carouselSettings,
        lastUpdated: new Date(),
      };

      await this.homeContentService.saveHomePageContent(
        contentData,
        this.selectedBannerFile,
        this.selectedCategoryFiles,
        this.selectedHeroFiles
      );

      this.sweetAlertService.success('¡Éxito!', 'La configuración de la Home ha sido guardada.');
      this.bannerPreviewUrl = null;
      this.selectedBannerFile = null;
      this.selectedCategoryFiles.fill(null);
      this.categoryPreviewUrls.fill(null);
      this.selectedHeroFiles = [];
      this.bannerForm.markAsPristine();
    } catch (error) {
      console.error('Error saving home page content:', error);
      this.sweetAlertService.error('Error', 'No se pudo guardar la configuración.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
