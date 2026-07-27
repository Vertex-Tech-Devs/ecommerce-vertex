import type { OnInit, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Component, inject, ViewChildren, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { Observable } from 'rxjs';
import { startWith, take, BehaviorSubject } from 'rxjs';

import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import type { ProductVariant } from '@core/models/product.model';
import type { Category } from '@core/models/category.model';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AttributeService } from '@core/services/attribute.service';
import type { Attribute } from '@core/models/attribute.model';
import { ProductVariantFormService } from './product-variant-form.service';
import type { ProductFormValue } from './product-variant-form.service';
import { ProductMediaService } from './product-media.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private attributeService = inject(AttributeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private sweetAlertService = inject(SweetAlertService);
  private mediaService = inject(ProductMediaService);
  private variantFormService = inject(ProductVariantFormService);
  private cdr = inject(ChangeDetectorRef);
  private focusNewImage = false;
  private focusNewVariant = false;

  @ViewChildren('galleryInput') galleryInputs!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('variantSelect') variantSelects!: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('variantStock') variantStocks!: QueryList<ElementRef<HTMLInputElement>>;

  productForm!: FormGroup;
  categories$!: Observable<Category[]>;

  showAttributeForm = false;
  newAttributeName = '';
  private attributesSubject = new BehaviorSubject<Attribute[]>([]);
  attributes$ = this.attributesSubject.asObservable();

  isSubmitting = false;
  isEditMode = false;
  productId: string | null = null;
  pageTitle = 'Crear Nuevo Producto';
  uploadProgress: number | null = null;
  galleryUploadProgress: Record<number, number | null> = {};
  private initialVariants: ProductVariant[] = [];

  currentPage = 1;
  pageSize = 5;

  get totalPages(): number {
 return Math.ceil(this.variants.length / this.pageSize) || 1; 
}
  get pages(): number[] {
 return Array.from({ length: this.totalPages }, (_, i) => i + 1); 
}

  get paginatedVariantsControls(): AbstractControl[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.variants.controls.slice(start, start + this.pageSize);
  }

  getVariantRealIndex(control: AbstractControl): number {
    return this.variants.controls.indexOf(control);
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.attributeService
      .getAttributes()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((attrs) => {
        this.attributesSubject.next(attrs);
        this.cdr.markForCheck();
      });
    this.initializeForm();
    this.checkEditMode();
  }

  ngAfterViewInit(): void {
    this.galleryInputs.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((queryList: QueryList<ElementRef<HTMLInputElement>>) => {
        if (this.focusNewImage && queryList.last) {
          queryList.last.nativeElement.focus();
          this.focusNewImage = false;
          this.cdr.markForCheck();
        }
      });

    this.variantSelects.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((queryList: QueryList<ElementRef<HTMLSelectElement>>) => {
        if (!this.focusNewVariant) {
return;
}
        const attrCount = this.variantAttributes.length;
        const arr = queryList.toArray();
        const targetIdx = arr.length - attrCount;
        if (targetIdx >= 0 && arr[targetIdx]) {
          arr[targetIdx].nativeElement.focus();
        } else if (this.variantStocks.last) {
          this.variantStocks.last.nativeElement.focus();
        }
        this.focusNewVariant = false;
        this.cdr.markForCheck();
      });

    this.variantStocks.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((queryList: QueryList<ElementRef<HTMLInputElement>>) => {
        if (this.focusNewVariant && this.variantSelects.length === 0 && queryList.last) {
          queryList.last.nativeElement.focus();
          this.focusNewVariant = false;
          this.cdr.markForCheck();
        }
      });
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      categoryId: [null, Validators.required],
      image: ['', [Validators.required]],
      images: this.fb.array([]),
      variantAttributes: this.fb.array([], Validators.required),
      variants: this.fb.array([], Validators.required),
    });
    this.onAttributeSelectionChange();
  }

  private checkEditMode(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      this.loadProductForEdit(this.productId);
    }
  }

  private loadProductForEdit(id: string): void {
    this.productService
      .getProductWithVariants(id)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          if (!data) {
            this.sweetAlertService.error('Error', 'Producto no encontrado.');
            void this.router.navigate(['/admin/products']);
            return;
          }
          const { product, variants } = data;
          this.initialVariants = variants;
          this.pageTitle = `Editar: ${product.name}`;
          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            categoryId: product.categoryId,
            image: product.image,
          });
          const imageControls = (product.images ?? []).map((img) =>
            this.fb.control(img, [Validators.required, Validators.pattern('https?://.+')]),
          );
          this.productForm.setControl('images', this.fb.array(imageControls));

          const attributeControls = (product.variantAttributes ?? []).map((attrId) =>
            this.fb.control(attrId),
          );
          this.productForm.setControl('variantAttributes', this.fb.array(attributeControls), {
            emitEvent: false,
          });

          const variantControls = variants.map((v) =>
            this.variantFormService.createVariantGroup(product.variantAttributes ?? [], v),
          );
          this.productForm.setControl('variants', this.fb.array(variantControls), {
            emitEvent: false,
          });

          this.productForm.updateValueAndValidity();
          this.cdr.markForCheck();
        },
        error: () => {
          this.sweetAlertService.error('Error', 'No se pudo cargar el producto.');
          void this.router.navigate(['/admin/products']);
        },
      });
  }

  get name(): AbstractControl {
    return this.productForm.get('name')!;
  }
  get price(): AbstractControl {
    return this.productForm.get('price')!;
  }
  get categoryId(): AbstractControl {
    return this.productForm.get('categoryId')!;
  }
  get image(): AbstractControl {
    return this.productForm.get('image')!;
  }
  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }
  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }
  get variantAttributes(): FormArray {
    return this.productForm.get('variantAttributes') as FormArray;
  }

  onAttributeSelectionChange(): void {
    this.variantAttributes.valueChanges
      .pipe(
        startWith(this.variantAttributes.value as string[]),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((selectedIds: string[]) => {
        this.variants.controls.forEach((control) => {
          const attributesGroup = control.get('attributes') as FormGroup;
          const currentIds = Object.keys(attributesGroup.controls);
          currentIds
            .filter((id) => !selectedIds.includes(id))
            .forEach((id) => attributesGroup.removeControl(id));
          selectedIds
            .filter((id) => !currentIds.includes(id))
            .forEach((id) => {
              attributesGroup.addControl(id, this.fb.control(null, Validators.required));
            });
        });
        this.cdr.markForCheck();
      });
  }

  onAttributeCheckboxChange(event: Event, attrId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.variantAttributes.push(this.fb.control(attrId));
      return;
    }
    const index = (this.variantAttributes.value as string[]).indexOf(attrId);
    if (index > -1) {
this.variantAttributes.removeAt(index);
}
  }

  toggleAttributeForm(): void {
    this.showAttributeForm = !this.showAttributeForm;
    this.newAttributeName = '';
  }

  async createAttribute(): Promise<void> {
    const name = this.newAttributeName.trim();
    if (!name || name.length < 2) {
      this.sweetAlertService.warning(
        'Aviso',
        'El nombre del atributo debe tener al menos 2 caracteres.',
      );
      return;
    }
    try {
      await this.attributeService.addAttribute({ name, values: [] } as unknown as Attribute);
      this.sweetAlertService.success('¡Éxito!', 'Atributo creado.');
      this.newAttributeName = '';
      this.showAttributeForm = false;
      this.attributeService
        .getAttributes()
        .pipe(take(1), takeUntilDestroyed(this.destroyRef))
        .subscribe((a) => {
          this.attributesSubject.next(a);
          this.cdr.markForCheck();
        });
    } catch {
      this.sweetAlertService.error('Error', 'No se pudo crear el atributo.');
    }
  }

  getFirstActiveAttributeId(attributes: Attribute[]): string | null {
    const selectedIds = this.variantAttributes.value as string[];
    const firstSelected = attributes.find((a) => a.id && selectedIds.includes(a.id));
    return firstSelected?.id ?? null;
  }

  addVariant(variant?: ProductVariant): void {
    this.focusNewVariant = true;
    this.variants.push(
      this.variantFormService.createVariantGroup(this.variantAttributes.value, variant),
    );
    this.currentPage = this.totalPages;
    this.cdr.markForCheck();
  }

  async removeVariant(index: number): Promise<void> {
    const isConfirmed = await this.sweetAlertService.confirm(
      '¿Estás seguro?',
      '¿Estás seguro de eliminar la variante?',
    );
    if (!isConfirmed) {
return;
}
    this.variants.removeAt(index);
    if (this.currentPage > this.totalPages) {
this.currentPage = this.totalPages;
}
    this.cdr.markForCheck();
  }

  generateVariantCombinations(): void {
    this.attributes$
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((allAttributes) => {
        const selectedIds = this.variantAttributes.value as string[];
        if (!selectedIds.length) {
          this.sweetAlertService.warning('Aviso', 'Selecciona al menos un atributo primero.');
          return;
        }
        const selectedAttrs = allAttributes.filter((a) => a.id && selectedIds.includes(a.id));
        if (!selectedAttrs.length) {
          this.sweetAlertService.error('Error', 'No se encontraron los atributos seleccionados.');
          return;
        }
        const combos = this.variantFormService.generateCombinations(selectedAttrs);
        if (!combos.length) {
          this.sweetAlertService.warning(
            'Aviso',
            'No se pueden generar combinaciones con los atributos seleccionados.',
          );
          return;
        }
        const limitedCombos = combos.slice(0, 20);
        this.variants.clear();
        this.currentPage = 1;
        limitedCombos.forEach((combo) => {
          this.variants.push(
            this.fb.group({
              id: [null],
              attributes: this.fb.group(combo, Validators.required),
              stock: [0, [Validators.required, Validators.min(0)]],
            }),
          );
        });
        this.sweetAlertService.success(
          '¡Éxito!',
          `Se generaron ${limitedCombos.length} variantes.`,
        );
        this.cdr.markForCheck();
        setTimeout(() => {
          const firstSelect = this.variantSelects.first;
          if (firstSelect) {
            firstSelect.nativeElement.focus();
          }
        });
      });
  }

  addImage(imageUrl: string = ''): void {
    if (this.images.length > 0) {
      const lastControl = this.images.at(this.images.length - 1);
      if (!lastControl.value) {
        this.sweetAlertService.warning(
          'Advertencia',
          'Debes cargar la imagen actual antes de solicitar otra.',
        );
        return;
      }
    }
    this.focusNewImage = true;
    this.images.push(this.mediaService.createImageControl(this.fb, imageUrl));
    this.cdr.markForCheck();
  }

  async removeImage(index: number): Promise<void> {
    const removed = await this.mediaService.confirmRemoveImage(this.images, index);
    if (removed) {
      this.cdr.markForCheck();
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
return;
}
    this.uploadProgress = 0;
    this.cdr.markForCheck();
    this.mediaService
      .uploadMainImage(
        file,
        (p) => {
          this.uploadProgress = p;
          this.cdr.markForCheck();
        },
        (url) => {
          this.productForm.get('image')?.setValue(url);
          this.uploadProgress = null;
          this.cdr.markForCheck();
        },
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  onGalleryFileSelected(event: Event, index: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    const control = this.images.at(index);
    if (!file || !control) {
return;
}
    this.galleryUploadProgress[index] = 0;
    this.cdr.markForCheck();
    this.mediaService
      .uploadGalleryImage(
        file,
        index,
        (idx, p) => {
          this.galleryUploadProgress[idx] = p;
          this.cdr.markForCheck();
        },
        (url) => {
          control.setValue(url);
          this.galleryUploadProgress[index] = null;
          this.cdr.markForCheck();
        },
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.sweetAlertService.error('Formulario Inválido', 'Revisa todos los campos.');
      return;
    }
    this.isSubmitting = true;
    const formValue = this.productForm.value as ProductFormValue;
    try {
      if (this.isEditMode && this.productId) {
        const { toUpdate, toAdd, toDelete } = this.variantFormService.buildEditChanges(
          formValue.variants,
          this.initialVariants,
        );
        const { name, description, price, categoryId, image, images, variantAttributes } =
          formValue;
        await this.productService.updateProductWithVariants(
          this.productId,
          { name, description, price, categoryId, image, images, variantAttributes },
          toUpdate,
          toAdd,
          toDelete,
        );
        this.sweetAlertService.success('¡Éxito!', 'Producto actualizado.');
        void this.router.navigate(['/admin/products', this.productId]);
      } else {
        const productData = this.variantFormService.buildProductData(formValue);
        const variantsData = formValue.variants.map((v) => ({
          attributes: v.attributes,
          stock: v.stock,
        }));
        const newId = await this.productService.createProductWithVariants(
          productData,
          variantsData,
        );
        this.sweetAlertService.success('¡Éxito!', 'Producto creado.');
        void this.router.navigate(['/admin/products', newId]);
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      this.sweetAlertService.error('Error', 'No se pudo guardar el producto.');
    } finally {
      this.isSubmitting = false;
      this.cdr.markForCheck();
    }
  }

  onCancel(): void {
    void this.router.navigate(
      this.isEditMode && this.productId ? ['/admin/products', this.productId] : ['/admin/products'],
    );
  }
}
