import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, combineLatest, map, of, startWith, switchMap, take, finalize, BehaviorSubject } from 'rxjs';
import { WithFieldValue } from '@angular/fire/firestore';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { StorageService } from '@core/services/storage.service';
import { Product, ProductVariant } from '@core/models/product.model';
import { Category } from '@core/models/category.model';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AttributeService } from '@core/services/attribute.service';
import { Attribute } from '@core/models/attribute.model';
import { AttributeModalComponent } from '@features/admin/components/attributes/attribute-modal/attribute-modal.component';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private attributeService = inject(AttributeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sweetAlertService = inject(SweetAlertService);
  private storageService = inject(StorageService);
  private modalService = inject(BsModalService);

  public productForm!: FormGroup;
  public categories$!: Observable<Category[]>;
  
  private attributesSubject = new BehaviorSubject<Attribute[]>([]);
  public attributes$ = this.attributesSubject.asObservable();
  private bsModalRef?: BsModalRef;
  
  public isSubmitting = false;
  public isEditMode = false;
  public productId: string | null = null;
  public pageTitle = 'Crear Nuevo Producto';
  
  public uploadProgress: number | null = null;
  public galleryUploadProgress: { [key: number]: number | null } = {};

  private initialVariants: ProductVariant[] = [];

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
    this.loadAttributes();
    this.initializeForm();
    this.checkEditMode();
  }

  private loadAttributes(): void {
    this.attributeService.getAttributes().pipe(take(1)).subscribe(attrs => {
      this.attributesSubject.next(attrs);
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
    this.productService.getProductWithVariants(id).pipe(take(1)).subscribe({
      next: (data) => {
        if (data) {
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

          product.images?.forEach(img => this.images.push(this.fb.control(img)));
          
          product.variantAttributes?.forEach(attrId => this.variantAttributes.push(this.fb.control(attrId)));

          variants.forEach(variant => this.addVariant(variant));
        } else {
          this.sweetAlertService.error('Error', 'Producto no encontrado.');
          this.router.navigate(['/admin/products']);
        }
      },
      error: () => {
        this.sweetAlertService.error('Error', 'No se pudo cargar el producto.');
        this.router.navigate(['/admin/products']);
      },
    });
  }

  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get categoryId() { return this.productForm.get('categoryId'); }
  get image() { return this.productForm.get('image'); }
  get variants(): FormArray { return this.productForm.get('variants') as FormArray; }
  get images(): FormArray { return this.productForm.get('images') as FormArray; }
  get variantAttributes(): FormArray { return this.productForm.get('variantAttributes') as FormArray; }

  onAttributeSelectionChange(): void {
    this.attributes$.pipe(take(1)).subscribe(allAttributes => {
      this.variantAttributes.valueChanges.pipe(
        startWith(this.variantAttributes.value)
      ).subscribe(selectedIds => {
        this.variants.controls.forEach(control => {
          const attributesGroup = control.get('attributes') as FormGroup;
          const currentAttributeIds = Object.keys(attributesGroup.controls);

          const idsToRemove = currentAttributeIds.filter(id => !selectedIds.includes(id));
          idsToRemove.forEach(id => attributesGroup.removeControl(id));

          const idsToAdd = selectedIds.filter((id: string) => !currentAttributeIds.includes(id));
          idsToAdd.forEach((id: string) => {
            attributesGroup.addControl(id, this.fb.control(null, Validators.required));
          });
        });
      });
    });
  }

  public onAttributeCheckboxChange(event: Event, attrId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.variantAttributes.push(this.fb.control(attrId));
    } else {
      const index = this.variantAttributes.value.indexOf(attrId);
      if (index > -1) {
        this.variantAttributes.removeAt(index);
      }
    }
  }

  public openAttributeModal(): void {
    this.bsModalRef = this.modalService.show(AttributeModalComponent, {
      class: 'modal-lg modal-dialog-centered',
    });

    this.bsModalRef.content.onClose.subscribe((result: Partial<Attribute> | null) => {
      if (result) {
        this.attributeService.addAttribute(result as Attribute)
          .then(() => {
            this.sweetAlertService.success('¡Éxito!', 'Atributo creado.');
            this.loadAttributes();
          })
          .catch(err => this.sweetAlertService.error('Error', 'No se pudo crear el atributo.'));
      }
    });
  }

  createVariantGroup(variant?: ProductVariant): FormGroup {
    const group = this.fb.group({
      id: [variant?.id || null],
      attributes: this.fb.group({}),
      stock: [variant?.stock || 0, [Validators.required, Validators.min(0)]],
    });

    const attributesGroup = group.get('attributes') as FormGroup;
    const selectedIds = this.variantAttributes.value;
    
    selectedIds.forEach((id: string) => {
      attributesGroup.addControl(id, this.fb.control(variant?.attributes[id] || null, Validators.required));
    });

    return group;
  }

  addVariant(variant?: ProductVariant): void {
    this.variants.push(this.createVariantGroup(variant));
  }

  removeVariant(index: number): void {
    this.variants.removeAt(index);
  }

  addImage(imageUrl: string = ''): void {
    this.images.push(this.fb.control(imageUrl, [Validators.pattern('https?://.+')]));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.uploadProgress = 0;
    const { progress$, downloadUrl$ } = this.storageService.uploadFile(file, 'products/images');
    progress$.subscribe(progress => this.uploadProgress = progress);
    downloadUrl$.pipe(
      finalize(() => this.uploadProgress = null)
    ).subscribe(url => {
      this.productForm.get('image')?.setValue(url);
    });
  }

  onGalleryFileSelected(event: Event, index: number): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    const control = this.images.at(index);
    if (!file || !control) return;

    this.galleryUploadProgress[index] = 0;
    const { progress$, downloadUrl$ } = this.storageService.uploadFile(file, 'products/gallery');
    progress$.subscribe(progress => this.galleryUploadProgress[index] = progress);
    downloadUrl$.pipe(
      finalize(() => this.galleryUploadProgress[index] = null)
    ).subscribe(url => {
      control.setValue(url);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.sweetAlertService.error('Formulario Inválido', 'Revisa todos los campos.');
      return;
    }

    this.isSubmitting = true;
    const formValue = this.productForm.value;

    const productData: WithFieldValue<Omit<Product, 'id'>> = {
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      categoryId: formValue.categoryId,
      image: formValue.image,
      images: formValue.images || [],
      variantAttributes: formValue.variantAttributes || [],
      createdAt: new Date(),
      totalStock: 0,
      inStockAttributes: {}
    };

    try {
      if (this.isEditMode && this.productId) {
        const productUpdateData: Partial<Product> = {
          name: formValue.name,
          description: formValue.description,
          price: formValue.price,
          categoryId: formValue.categoryId,
          image: formValue.image,
          images: formValue.images,
          variantAttributes: formValue.variantAttributes
        };

        const variantsToUpdate: (Partial<ProductVariant> & { id: string })[] = [];
        const variantsToAdd: WithFieldValue<Omit<ProductVariant, 'id' | 'productId'>>[] = [];
        const variantIdsToDelete: string[] = [];
        const currentVariantIds = new Set<string>();

        formValue.variants.forEach((variant: any) => {
          if (variant.id) {
            const { price, ...rest } = variant;
            variantsToUpdate.push(rest);
            currentVariantIds.add(variant.id);
          } else {
            const { id, price, ...newVariantData } = variant;
            variantsToAdd.push(newVariantData);
          }
        });

        this.initialVariants.forEach(initialVariant => {
          if (!currentVariantIds.has(initialVariant.id)) {
            variantIdsToDelete.push(initialVariant.id);
          }
        });

        await this.productService.updateProductWithVariants(
          this.productId,
          productUpdateData,
          variantsToUpdate,
          variantsToAdd,
          variantIdsToDelete
        );
        this.sweetAlertService.success('¡Éxito!', 'Producto actualizado.');
        this.router.navigate(['/admin/products/detail', this.productId]);

      } else {
        const variantsData: WithFieldValue<Omit<ProductVariant, 'id' | 'productId'>>[] = formValue.variants.map((v: any) => ({
          attributes: v.attributes,
          stock: v.stock
        }));

        const newProductId = await this.productService.createProductWithVariants(productData, variantsData);
        this.sweetAlertService.success('¡Éxito!', 'Producto creado.');
        this.router.navigate(['/admin/products/detail', newProductId]);
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      this.sweetAlertService.error('Error', 'No se pudo guardar el producto.');
    } finally {
      this.isSubmitting = false;
    }
  }

  onCancel(): void {
    if (this.isEditMode && this.productId) {
      this.router.navigate(['/admin/products/detail', this.productId]);
    } else {
      this.router.navigate(['/admin/products']);
    }
  }
}