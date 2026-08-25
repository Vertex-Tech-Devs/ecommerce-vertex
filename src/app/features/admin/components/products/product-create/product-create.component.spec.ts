import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { ProductCreate } from './product-create';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { AttributeService } from '@core/services/attribute.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { ProductMediaService } from './product-media.service';
import { ProductVariantFormService } from './product-variant-form.service';
import type { Product } from '@core/models/product.model';
import type { Category } from '@core/models/category.model';
import type { Attribute } from '@core/models/attribute.model';

describe('ProductCreate', () => {
  let component: ProductCreate;
  let fixture: ComponentFixture<ProductCreate>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let attributeServiceSpy: jasmine.SpyObj<AttributeService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;
  let mediaServiceSpy: jasmine.SpyObj<ProductMediaService>;
  let router: Router;
  let mockParamId: string | null = null;

  const mockCategories: Category[] = [{ id: 'cat-1', name: 'Ropa', slug: 'ropa' } as Category];

  const mockAttributes: Attribute[] = [
    { id: 'attr-1', name: 'Talle', values: ['S', 'M'] },
    { id: 'attr-2', name: 'Color', values: ['Rojo', 'Azul'] },
  ];

  beforeEach(async () => {
    mockParamId = null;
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductWithVariants',
      'createProductWithVariants',
      'updateProductWithVariants',
    ]);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    attributeServiceSpy = jasmine.createSpyObj('AttributeService', [
      'getAttributes',
      'addAttribute',
    ]);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', [
      'warning',
      'success',
      'error',
      'confirm',
    ]);
    mediaServiceSpy = jasmine.createSpyObj('ProductMediaService', [
      'createImageControl',
      'confirmRemoveImage',
      'uploadMainImage',
      'uploadGalleryImage',
    ]);

    categoryServiceSpy.getCategories.and.returnValue(of(mockCategories));
    attributeServiceSpy.getAttributes.and.returnValue(of(mockAttributes));
    mediaServiceSpy.createImageControl.and.callFake((fb, url = '') => fb.control(url, []));

    await TestBed.configureTestingModule({
      imports: [ProductCreate, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        ProductVariantFormService,
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: AttributeService, useValue: attributeServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
        { provide: ProductMediaService, useValue: mediaServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? mockParamId : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create product create component in creation mode', () => {
    expect(component).toBeTruthy();
    expect(component.isEditMode).toBeFalse();
    expect(component.pageTitle).toBe('Crear Nuevo Producto');
    expect(component.productForm).toBeTruthy();
  });

  it('should handle attribute checkbox changes', () => {
    const eventChecked = { target: { checked: true } } as unknown as Event;
    component.onAttributeCheckboxChange(eventChecked, 'attr-1');
    expect(component.variantAttributes.value).toContain('attr-1');

    const eventUnchecked = { target: { checked: false } } as unknown as Event;
    component.onAttributeCheckboxChange(eventUnchecked, 'attr-1');
    expect(component.variantAttributes.value).not.toContain('attr-1');
  });

  it('should toggle attribute form visibility and clear newAttributeName', () => {
    component.newAttributeName = 'Nuevo Atributo';
    component.toggleAttributeForm();
    expect(component.showAttributeForm).toBeTrue();
    expect(component.newAttributeName).toBe('');
  });

  it('should warn on createAttribute if name is less than 2 characters', fakeAsync(() => {
    component.newAttributeName = ' a ';
    void component.createAttribute();
    tick();

    expect(sweetAlertServiceSpy.warning).toHaveBeenCalled();
    expect(attributeServiceSpy.addAttribute).not.toHaveBeenCalled();
  }));

  it('should create attribute when valid', fakeAsync(() => {
    attributeServiceSpy.addAttribute.and.returnValue(
      Promise.resolve({ id: 'attr-3' } as unknown as ReturnType<AttributeService['addAttribute']>),
    );
    component.newAttributeName = 'Material';

    void component.createAttribute();
    tick();

    expect(attributeServiceSpy.addAttribute).toHaveBeenCalledWith(
      jasmine.objectContaining({ name: 'Material' }),
    );
    expect(sweetAlertServiceSpy.success).toHaveBeenCalled();
    expect(component.showAttributeForm).toBeFalse();
  }));

  it('should handle error when createAttribute fails', fakeAsync(() => {
    attributeServiceSpy.addAttribute.and.returnValue(Promise.reject(new Error('Add attr error')));
    component.newAttributeName = 'Material';

    void component.createAttribute();
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalled();
  }));

  it('should return first active attribute id', () => {
    component.variantAttributes.push(new FormControl('attr-2'));
    const firstId = component.getFirstActiveAttributeId(mockAttributes);
    expect(firstId).toBe('attr-2');
  });

  it('should add a variant and adjust pagination', () => {
    expect(component.variants.length).toBe(0);
    component.addVariant();
    expect(component.variants.length).toBe(1);
  });

  it('should remove variant when confirmed', fakeAsync(() => {
    component.addVariant();
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));

    const mockEvt = {
      preventDefault: jasmine.createSpy(),
      stopPropagation: jasmine.createSpy(),
    } as unknown as Event;
    void component.removeVariant(0, mockEvt);
    tick();

    expect(sweetAlertServiceSpy.confirm).toHaveBeenCalled();
    expect(component.variants.length).toBe(0);
  }));

  it('should not remove variant when confirmation cancelled', fakeAsync(() => {
    component.addVariant();
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(false));

    void component.removeVariant(0);
    tick();

    expect(component.variants.length).toBe(1);
  }));

  it('should add image control to gallery', () => {
    component.addImage('https://example.com/gallery.jpg');
    expect(component.images.length).toBe(1);
  });

  it('should warn when adding image if previous image control is empty', () => {
    component.addImage('');
    component.addImage('https://example.com/gallery2.jpg');

    expect(sweetAlertServiceSpy.warning).toHaveBeenCalled();
    expect(component.images.length).toBe(1);
  });

  it('should remove image if mediaService confirms removal', fakeAsync(() => {
    component.addImage('https://example.com/gallery.jpg');
    mediaServiceSpy.confirmRemoveImage.and.returnValue(Promise.resolve(true));

    void component.removeImage(0);
    tick();

    expect(mediaServiceSpy.confirmRemoveImage).toHaveBeenCalled();
  }));

  it('should upload main image on file selection', () => {
    mediaServiceSpy.uploadMainImage.and.callFake((file, pid, onProgress, onComplete) => {
      onProgress(50);
      onComplete('https://example.com/uploaded.jpg');
      return of(100);
    });

    const file = new File(['dummy'], 'main.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    expect(mediaServiceSpy.uploadMainImage).toHaveBeenCalled();
    expect(component.productForm.get('image')?.value).toBe('https://example.com/uploaded.jpg');
  });

  it('should upload gallery image on file selection', () => {
    component.addImage('');
    mediaServiceSpy.uploadGalleryImage.and.callFake((file, pid, index, onProgress, onComplete) => {
      onProgress(index, 50);
      onComplete('https://example.com/uploaded-gallery.jpg');
      return of(100);
    });

    const file = new File(['dummy'], 'gallery.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onGalleryFileSelected(event, 0);

    expect(mediaServiceSpy.uploadGalleryImage).toHaveBeenCalled();
    expect(component.images.at(0).value).toBe('https://example.com/uploaded-gallery.jpg');
  });

  it('should filter variants and calculate pagination controls', () => {
    component.addVariant();
    component.variantSearchControl.setValue('0');

    expect(component.filteredVariantsControls.length).toBe(1);
    expect(component.totalPages).toBe(1);
    expect(component.pages).toEqual([1]);
    expect(component.paginatedVariantsControls.length).toBe(1);
    expect(component.getVariantRealIndex(component.variants.at(0))).toBe(0);
  });

  it('should submit new product form successfully', fakeAsync(() => {
    productServiceSpy.createProductWithVariants.and.returnValue(Promise.resolve('new-p-id'));
    component.productForm.patchValue({
      name: 'Nuevo Producto',
      description: 'Descripción amplia',
      price: 1000,
      categoryId: 'cat-1',
      image: 'https://example.com/img.jpg',
    });

    const navigateSpy = spyOn(router, 'navigate');
    void component.onSubmit();
    tick();

    expect(productServiceSpy.createProductWithVariants).toHaveBeenCalled();
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith('¡Éxito!', 'Producto creado.');
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products', 'new-p-id']);
  }));

  it('should show error when submitting invalid form', fakeAsync(() => {
    component.productForm.patchValue({ name: '' });
    void component.onSubmit();
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith(
      'Formulario Inválido',
      jasmine.any(String),
    );
    expect(productServiceSpy.createProductWithVariants).not.toHaveBeenCalled();
  }));

  it('should handle error when createProductWithVariants fails', fakeAsync(() => {
    productServiceSpy.createProductWithVariants.and.returnValue(
      Promise.reject(new Error('Create error')),
    );
    component.productForm.patchValue({
      name: 'Nuevo Producto',
      description: 'Descripción amplia',
      price: 1000,
      categoryId: 'cat-1',
      image: 'https://example.com/img.jpg',
    });

    void component.onSubmit();
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error', jasmine.any(String));
  }));

  it('should navigate on cancel', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products']);
  });
});

describe('ProductCreate in Edit Mode', () => {
  let component: ProductCreate;
  let fixture: ComponentFixture<ProductCreate>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let attributeServiceSpy: jasmine.SpyObj<AttributeService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;
  let mediaServiceSpy: jasmine.SpyObj<ProductMediaService>;
  let router: Router;

  const mockProductData = {
    product: {
      id: 'p1',
      name: 'Remera Azul Edit',
      description: 'Descripción editada',
      price: 2000,
      categoryId: 'cat-1',
      image: 'https://example.com/img.jpg',
      images: [],
      variantAttributes: [],
    } as unknown as Product,
    variants: [],
  };

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductWithVariants',
      'updateProductWithVariants',
    ]);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    attributeServiceSpy = jasmine.createSpyObj('AttributeService', ['getAttributes']);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', ['error', 'success']);
    mediaServiceSpy = jasmine.createSpyObj('ProductMediaService', ['createImageControl']);

    productServiceSpy.getProductWithVariants.and.returnValue(of(mockProductData));
    categoryServiceSpy.getCategories.and.returnValue(of([]));
    attributeServiceSpy.getAttributes.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ProductCreate, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        ProductVariantFormService,
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: AttributeService, useValue: attributeServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
        { provide: ProductMediaService, useValue: mediaServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? 'p1' : null),
              },
            },
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize in edit mode and load product data', () => {
    expect(component.isEditMode).toBeTrue();
    expect(component.productId).toBe('p1');
    expect(component.pageTitle).toBe('Editar: Remera Azul Edit');
  });

  it('should update product on submit in edit mode', fakeAsync(() => {
    productServiceSpy.updateProductWithVariants.and.returnValue(Promise.resolve());
    const navigateSpy = spyOn(router, 'navigate');

    void component.onSubmit();
    tick();

    expect(productServiceSpy.updateProductWithVariants).toHaveBeenCalled();
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith('¡Éxito!', 'Producto actualizado.');
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products', 'p1']);
  }));

  it('should navigate to edit target on cancel', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.onCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products', 'p1']);
  });
});
