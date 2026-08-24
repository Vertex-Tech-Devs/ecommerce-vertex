import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Catalog } from './catalog';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { AttributeService } from '@core/services/attribute.service';
import type { Product } from '@core/models/product.model';
import type { Category } from '@core/models/category.model';
import type { Attribute } from '@core/models/attribute.model';

describe('Catalog', () => {
  let component: Catalog;
  let fixture: ComponentFixture<Catalog>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let attributeServiceSpy: jasmine.SpyObj<AttributeService>;

  const makeProduct = (overrides: Partial<Product> = {}): Product =>
    ({
      id: 'p1',
      name: 'Producto',
      description: 'd',
      categoryId: 'cat-1',
      price: 100,
      image: '',
      images: [],
      totalStock: 10,
      inStockAttributes: {},
      variantAttributes: [],
      createdAt: new Date(),
      ...overrides,
    }) as Product;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
      'getProductsByQuery',
      'getProductById',
    ]);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    attributeServiceSpy = jasmine.createSpyObj('AttributeService', ['getAttributes']);

    productServiceSpy.getProducts.and.returnValue(
      of([
        makeProduct({ id: 'a', price: 500, createdAt: new Date('2026-01-01') }),
        makeProduct({ id: 'b', price: 100, createdAt: new Date('2026-06-01') }),
      ]),
    );
    categoryServiceSpy.getCategories.and.returnValue(
      of([{ id: 'cat-1', name: 'Remeras', slug: 'remeras', parentId: null } as Category]),
    );
    attributeServiceSpy.getAttributes.and.returnValue(of([] as Attribute[]));

    await TestBed.configureTestingModule({
      imports: [Catalog],
      providers: [
        provideRouter([]),
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: AttributeService, useValue: attributeServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load products/categories', () => {
    expect(component).toBeTruthy();
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
    expect(component.allProducts().length).toBe(2);
    expect(component.isLoading()).toBe(false);
  });

  it('should map categories into a lookup map', () => {
    expect(component.allCategories().get('cat-1')?.name).toBe('Remeras');
  });

  it('should sort products by price ascending when sort changes', () => {
    component.onSortChange({ target: { value: 'price-asc' } } as unknown as Event);
    const sorted = component.sortedProducts();
    expect(sorted.map((p) => p.id)).toEqual(['b', 'a']);
  });

  it('should keep input order for default sort (products pre-sorted by service)', () => {
    const sorted = component.sortedProducts();
    expect(sorted.map((p) => p.id)).toEqual(['a', 'b']);
  });

  it('should filter products by category', () => {
    component.allProducts.set([
      makeProduct({ id: 'in', categoryId: 'cat-1' }),
      makeProduct({ id: 'out', categoryId: 'cat-other' }),
    ]);
    component.selectedCategoryId.set('cat-1');
    expect(component.filteredProducts().map((p) => p.id)).toEqual(['in']);
  });

  it('clearFilters() should reset the filter form', () => {
    component.filterForm.get('category')?.setValue('cat-1');
    component.filterForm.get('minPrice')?.setValue(10);
    component.clearFilters();
    expect(component.filterForm.get('category')?.value).toBe('all');
    expect(component.filterForm.get('minPrice')?.value).toBeNull();
    expect(component.page()).toBe(1);
  });

  it('paginatedProductsSignal should slice the first page', () => {
    const many = Array.from({ length: 20 }, (_, i) =>
      makeProduct({ id: `p${i}`, createdAt: new Date(2026, 0, i) }),
    );
    component.allProducts.set(many);
    const page = component.paginatedProductsSignal();
    expect(page.length).toBeLessThanOrEqual(component.itemsPerPage());
  });
});
