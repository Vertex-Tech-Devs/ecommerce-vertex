import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductsList } from './products-list';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Product } from '@core/models/product.model';
import type { Category } from '@core/models/category.model';

describe('ProductsList', () => {
  let component: ProductsList;
  let fixture: ComponentFixture<ProductsList>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;
  let router: Router;

  const mockCategories: Category[] = [
    { id: 'cat-1', name: 'Ropa', slug: 'ropa' } as Category,
    { id: 'cat-2', name: 'Calzado', slug: 'calzado' } as Category,
  ];

  const mockProducts: Product[] = [
    {
      id: 'p1',
      name: 'Remera Negra',
      description: 'Remera de algodón',
      categoryId: 'cat-1',
      price: 1500,
    } as Product,
    {
      id: 'p2',
      name: 'Zapatillas Running',
      description: 'Zapatillas deportivas',
      categoryId: 'cat-2',
      price: 5000,
    } as Product,
  ];

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', [
      'confirm',
      'success',
      'error',
    ]);

    productServiceSpy.getProducts.and.returnValue(of(mockProducts));
    categoryServiceSpy.getCategories.and.returnValue(of(mockCategories));

    await TestBed.configureTestingModule({
      imports: [ProductsList],
      providers: [
        provideRouter([]),
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create products list component', () => {
    expect(component).toBeTruthy();
    expect(component.isLoading()).toBeFalse();
  });

  it('should get category name by id or fallback to Sin Categoría', () => {
    expect(component.getCategoryName('cat-1')).toBe('Ropa');
    expect(component.getCategoryName('unknown')).toBe('Sin Categoría');
  });

  it('should filter products by search term', fakeAsync(() => {
    let result: Product[] = [];
    component.products$.subscribe((products) => (result = products));

    component.onSearchChange('Remera');
    tick(300);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('p1');
  }));

  it('should filter products by category', fakeAsync(() => {
    let result: Product[] = [];
    component.products$.subscribe((products) => (result = products));

    component.onFilterCategoryChange('cat-2');
    tick(300);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('p2');
  }));

  it('should handle page size changes', fakeAsync(() => {
    component.onPageSizeChange(5);
    tick(300);

    expect(component.itemsPerPageSubject.value).toBe(5);
    expect(component.currentPageSubject.value).toBe(1);
  }));

  it('should navigate to page if valid', fakeAsync(() => {
    component.totalPages = 3;
    component.goToPage(2);
    tick(60);

    expect(component.currentPageSubject.value).toBe(2);
  }));

  it('should delete product when confirmed', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));
    productServiceSpy.deleteProduct.and.returnValue(Promise.resolve());

    void component.confirmDelete(mockProducts[0]);
    tick();

    expect(sweetAlertServiceSpy.confirm).toHaveBeenCalled();
    expect(productServiceSpy.deleteProduct).toHaveBeenCalledWith('p1');
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith('Eliminado', jasmine.any(String));
  }));

  it('should handle error when deleting product', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));
    productServiceSpy.deleteProduct.and.returnValue(Promise.reject(new Error('Delete error')));

    void component.confirmDelete(mockProducts[0]);
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error', jasmine.any(String));
  }));

  it('should not delete if confirmation rejected', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(false));

    void component.confirmDelete(mockProducts[0]);
    tick();

    expect(productServiceSpy.deleteProduct).not.toHaveBeenCalled();
  }));

  it('should navigate to new product page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.newProduct();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products/create']);
  });

  it('should navigate to product detail page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToDetail('p1');
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/products', 'p1']);
  });

  it('should handle error when loading products', () => {
    productServiceSpy.getProducts.and.returnValue(throwError(() => new Error('Load error')));
    component.loadProducts();

    expect(component.isLoading()).toBeFalse();
  });

  it('should not navigate in goToDetail if productId is undefined', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToDetail(undefined);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should ignore invalid page numbers in goToPage()', () => {
    component.totalPages = 3;
    component.goToPage(0);
    expect(component.currentPageSubject.value).toBe(1);

    component.goToPage(999);
    expect(component.currentPageSubject.value).toBe(1);
  });

  it('should fallback to empty array when getCategories throws error', (done) => {
    categoryServiceSpy.getCategories.and.returnValue(throwError(() => new Error('Cat err')));
    component.ngOnInit();
    component.categories$.subscribe((cats) => {
      expect(cats).toEqual([]);
      done();
    });
  });

  it('should correct currentPage when currentPage exceeds totalPages', fakeAsync(() => {
    let result: Product[] = [];
    component.products$.subscribe((products) => (result = products));

    component.onPageSizeChange(1); // totalPages = 2
    component.currentPageSubject.next(5); // 5 > 2
    tick(300);

    expect(result.length).toBe(1);
  }));
});
