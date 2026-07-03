import type { OnInit, QueryList, ElementRef } from '@angular/core';
import { Component, inject, ViewChildren, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import type { Observable } from 'rxjs';
import { startWith, take, finalize, BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { StorageService } from '@core/services/storage.service';
import type { ProductVariant } from '@core/models/product.model';
import type { Category } from '@core/models/category.model';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AttributeService } from '@core/services/attribute.service';
import type { Attribute } from '@core/models/attribute.model';
import { ProductVariantFormService } from './product-variant-form.service';
import type { ProductFormValue } from './product-variant-form.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private attributeService = inject(AttributeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private sweetAlertService = inject(SweetAlertService);
  private storageService = inject(StorageService);
  private variantFormService = inject(ProductVariantFormService);

  @ViewChildren('additionalImageInput') additionalImageInputs!: QueryList<
    ElementRef<HTMLInputElement>
  >;
  @ViewChildren('variantFirstSelect') variantFirstSelects!: QueryList<
    ElementRef<HTMLSelectElement>
  >;

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

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.attributeService
      .getAttributes()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((attrs) => this.attributesSubject.next(attrs));
    this.initializeForm();
    this.checkEditMode();
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
          product.images?.forEach((img) => this.images.push(this.fb.control(img)));
          product.variantAttributes?.forEach((attrId) =>
            this.variantAttributes.push(this.fb.control(attrId)),
          );
          variants.forEach((v) =>
            this.variants.push(
              this.variantFormService.createVariantGroup(this.variantAttributes.value, v),
            ),
          );
        },
        error: () => {
          this.sweetAlertService.error('Error', 'No se pudo cargar el producto.');
          void this.router.navigate(['/admin/products']);
        },
      });
  }

  get name(): AbstractControl | null {
    return this.productForm.get('name');
  }
  get price(): AbstractControl | null {
    return this.productForm.get('price');
  }
  get categoryId(): AbstractControl | null {
    return this.productForm.get('categoryId');
  }
  get image(): AbstractControl | null {
    return this.productForm.get('image');
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
      });
  }

  onAttributeCheckboxChange(event: Event, attrId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.variantAttributes.push(this.fb.control(attrId));
    } else {
      const index = (this.variantAttributes.value as string[]).indexOf(attrId);
      if (index > -1) {
        this.variantAttributes.removeAt(index);
      }
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
        .subscribe((a) => this.attributesSubject.next(a));
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
    this.variants.push(
      this.variantFormService.createVariantGroup(this.variantAttributes.value, variant),
    );
  }

  removeVariant(index: number): void {
    this.variants.removeAt(index);
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
        this.variants.clear();
        combos.forEach((combo) => {
          this.variants.push(
            this.fb.group({
              id: [null],
              attributes: this.fb.group(combo, Validators.required),
              stock: [0, [Validators.required, Validators.min(0)]],
            }),
          );
        });
        this.sweetAlertService.success('¡Éxito!', `Se generaron ${combos.length} variantes.`);
      });
  }

  addImage(imageUrl: string = ''): void {
    this.images.push(this.fb.control(imageUrl, [Validators.pattern('https?://.+')]));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }
    this.uploadProgress = 0;
    const { progress$, downloadUrl$ } = this.storageService.uploadFile(file, 'products/images');
    progress$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((p) => (this.uploadProgress = p));
    downloadUrl$
      .pipe(
        finalize(() => (this.uploadProgress = null)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((url) => this.productForm.get('image')?.setValue(url));
  }

  onGalleryFileSelected(event: Event, index: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    const control = this.images.at(index);
    if (!file || !control) {
      return;
    }
    this.galleryUploadProgress[index] = 0;
    const { progress$, downloadUrl$ } = this.storageService.uploadFile(file, 'products/gallery');
    progress$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((p) => (this.galleryUploadProgress[index] = p));
    downloadUrl$
      .pipe(finalize(() => (this.galleryUploadProgress[index] = null)))
      .subscribe((url) => control.setValue(url));
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
        await this.productService.updateProductWithVariants(
          this.productId,
          {
            name: formValue.name,
            description: formValue.description,
            price: formValue.price,
            categoryId: formValue.categoryId,
            image: formValue.image,
            images: formValue.images,
            variantAttributes: formValue.variantAttributes,
          },
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
    }
  }

  onCancel(): void {
    void this.router.navigate(
      this.isEditMode && this.productId ? ['/admin/products', this.productId] : ['/admin/products'],
    );
  }
}
