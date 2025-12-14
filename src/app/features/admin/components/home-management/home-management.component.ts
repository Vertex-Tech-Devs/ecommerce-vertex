import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { map, take } from 'rxjs/operators';

import { HomeContentService } from '@core/services/home-content.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { CategoryService } from '@core/services/category.service';
import { HeroBanner, FeaturedCategory } from '@core/models/home-content.model';
import { Category } from '@core/models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-management.component.html',
  styleUrls: ['./home-management.component.scss']
})
export class HomeManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private homeContentService = inject(HomeContentService);
  private sweetAlertService = inject(SweetAlertService);
  private categoryService = inject(CategoryService);

  public bannerForm!: FormGroup;
  public isSubmitting = false;
  public categories$!: Observable<Category[]>;

  public selectedBannerFile: File | null = null;
  public bannerPreviewUrl: string | null = null;
  public selectedCategoryFiles: (File | null)[] = [];
  public categoryPreviewUrls: (string | null)[] = [];

  private categoryMap = new Map<string, { name: string, slug: string }>();

  ngOnInit(): void {
    this.initializeForm();
    this.categories$ = this.categoryService.getCategories().pipe(
      take(1),
      map((categories: Category[]) => {
        this.categoryMap.clear();
        categories.forEach((cat: Category) => this.categoryMap.set(cat.id!, { name: cat.name, slug: cat.slug }));
        return categories;
      })
    );
    this.loadContentData();
  }

  private initializeForm(): void {
    this.bannerForm = this.fb.group({
      imageUrl: ['', [Validators.pattern('https?://.+')]],
      title: [''],
      buttonText: [''],
      buttonLink: [''],
      featuredCategories: this.fb.array([])
    });
  }

  private loadContentData(): void {
    this.homeContentService.getHeroBanner().pipe(take(1)).subscribe(content => {
      if (content) {
        this.bannerForm.patchValue({
          imageUrl: content.imageUrl,
          title: content.title,
          buttonText: content.buttonText,
          buttonLink: content.buttonLink,
        });
        
        this.featuredCategories.clear();
        this.selectedCategoryFiles = [];
        this.categoryPreviewUrls = [];
        if (content.featuredCategories) {
          content.featuredCategories.forEach(cat => this.addFeaturedCategory(cat));
        }
      }
    });
  }

  get imageUrl() { return this.bannerForm.get('imageUrl'); }
  get featuredCategories(): FormArray {
    return this.bannerForm.get('featuredCategories') as FormArray;
  }

  private newFeaturedCategory(category?: FeaturedCategory): FormGroup {
    return this.fb.group({
      categoryId: [category?.categoryId || null, Validators.required],
      name: [category?.name || ''],
      slug: [category?.slug || ''],
      imageUrl: [category?.imageUrl || '', [Validators.pattern('https?://.+')]]
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
        slug: categoryData.slug
      });
    }
  }

  onFileSelected(event: Event, type: 'main' | number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        this.sweetAlertService.error('Archivo no válido', 'Por favor, selecciona un archivo de imagen.');
        input.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result as string;
        if (type === 'main') {
          this.selectedBannerFile = file;
          this.bannerPreviewUrl = previewUrl;
          this.bannerForm.get('imageUrl')?.setValue('');
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
    if (this.bannerForm.invalid) {
      this.bannerForm.markAllAsTouched();
      this.sweetAlertService.error('Formulario Inválido', 'Por favor revisa los campos marcados en rojo.');
      return;
    }

    this.isSubmitting = true;
    try {
      await this.homeContentService.saveHomePageContent(
        this.bannerForm.value,
        this.selectedBannerFile,
        this.selectedCategoryFiles
      );
      this.sweetAlertService.success('¡Éxito!', 'La configuración de la Home ha sido guardada.');
      this.bannerPreviewUrl = null;
      this.selectedBannerFile = null;
      this.selectedCategoryFiles.fill(null);
      this.categoryPreviewUrls.fill(null);
      this.bannerForm.markAsPristine();
    } catch (error) {
      console.error('Error saving home page content:', error);
      this.sweetAlertService.error('Error', 'No se pudo guardar la configuración.');
    } finally {
      this.isSubmitting = false;
    }
  }
}