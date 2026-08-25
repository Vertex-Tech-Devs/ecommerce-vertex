import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ProductDetail } from './product-detail';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { AttributeService } from '@core/services/attribute.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Product, ProductVariant } from '@core/models/product.model';
import type { Category } from '@core/models/category.model';
import type { Attribute } from '@core/models/attribute.model';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let attributeServiceSpy: jasmine.SpyObj<AttributeService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;
  let router: Router;
  let paramMapSubject: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  const mockProduct: Product = {
    id: 'prod-1',
    name: 'Remera Deportiva',
    description: 'Remera dry-fit',
    price: 3500,
    categoryId: 'cat-1',
    variantAttributes: ['attr-1'],
  } as Product;

  const mockVariants: ProductVariant[] = [
    { id: 'v1', productId: 'prod-1', attributes: { 'attr-1': 'L' }, stock: 15 },
    { id: 'v2', productId: 'prod-1', attributes: { 'attr-1': 'XL' }, stock: 5 },
  ];

  const mockCategories: Category[] = [
    { id: 'cat-1', name: 'Deportes', slug: 'deportes' } as Category,
  ];

  const mockAttributes: Attribute[] = [{ id: 'attr-1', name: 'Talle', values: ['L', 'XL'] }];

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductWithVariants',
      'deleteProduct',
    ]);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    attributeServiceSpy = jasmine.createSpyObj('AttributeService', ['getAttributes']);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', ['confirm', 'error']);

    paramMapSubject = new BehaviorSubject(convertToParamMap({ id: 'prod-1' }));
    productServiceSpy.getProductWithVariants.and.returnValue(
      of({ product: mockProduct, variants: mockVariants }),
    );
    categoryServiceSpy.getCategories.and.returnValue(of(mockCategories));
    attributeServiceSpy.getAttributes.and.returnValue(of(mockAttributes));

    await TestBed.configureTestingModule({
      imports: [ProductDetail],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: paramMapSubject.asObservable() } },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: AttributeService, useValue: attributeServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create product detail component and load data correctly', (done) => {
    expect(component).toBeTruthy();
    component.data$.subscribe((data) => {
      expect(data.product.id).toBe('prod-1');
      expect(data.category?.name).toBe('Deportes');
      expect(data.variants.length).toBe(2);
      expect(component.variantAttributes()).toEqual([{ id: 'attr-1', name: 'Talle' }]);
      done();
    });
  });

  it('should return variant attribute value or fallback', () => {
    const val = component.getVariantAttributeValue(mockVariants[0], 'attr-1');
    expect(val).toBe('L');

    const fallback = component.getVariantAttributeValue(mockVariants[0], 'unknown');
    expect(fallback).toBe('N/A');
  });

  it('should calculate pagination helpers correctly', () => {
    expect(component.getTotalPages(mockVariants)).toBe(1);
    expect(component.getPagesArray(mockVariants)).toEqual([1]);
    expect(component.getPaginatedVariants(mockVariants).length).toBe(2);

    component.goToPage(1, mockVariants);
    expect(component.currentPage()).toBe(1);
  });

  it('should navigate back to products list on goBack', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products']);
  });

  it('should navigate to edit page on editProduct', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.editProduct('prod-1');
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products/edit', 'prod-1']);
  });

  it('should confirm and delete product successfully', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));
    productServiceSpy.deleteProduct.and.returnValue(Promise.resolve());
    const navigateSpy = spyOn(router, 'navigate');

    void component.confirmDeleteProduct(mockProduct);
    tick();

    expect(sweetAlertServiceSpy.confirm).toHaveBeenCalled();
    expect(productServiceSpy.deleteProduct).toHaveBeenCalledWith('prod-1');
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products']);
  }));

  it('should handle error when deleteProduct fails', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));
    productServiceSpy.deleteProduct.and.returnValue(Promise.reject(new Error('Delete err')));

    void component.confirmDeleteProduct(mockProduct);
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error', jasmine.any(String));
  }));

  it('should not delete product if confirm cancelled', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(false));

    void component.confirmDeleteProduct(mockProduct);
    tick();

    expect(productServiceSpy.deleteProduct).not.toHaveBeenCalled();
  }));

  it('should redirect if product id param is missing', () => {
    const navigateSpy = spyOn(router, 'navigate');
    paramMapSubject.next(convertToParamMap({}));
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products']);
  });

  it('should redirect if product fetch throws error', () => {
    productServiceSpy.getProductWithVariants.and.returnValue(
      throwError(() => new Error('Fetch error')),
    );
    const navigateSpy = spyOn(router, 'navigate');
    paramMapSubject.next(convertToParamMap({ id: 'err-id' }));
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products']);
  });
});
