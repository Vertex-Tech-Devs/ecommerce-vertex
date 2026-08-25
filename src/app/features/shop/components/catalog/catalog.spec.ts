import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Catalog } from './catalog';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { AttributeService } from '@core/services/attribute.service';
import type { Product } from '@core/models/product.model';
import type { Category } from '@core/models/category.model';
import type { Attribute } from '@core/models/attribute.model';
import type { FormGroup } from '@angular/forms';

describe('Catalog', () => {
  let component: Catalog;
  let fixture: ComponentFixture<Catalog>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let attributeServiceSpy: jasmine.SpyObj<AttributeService>;

  const makeProduct = (overrides: Partial<Product> = {}): Product =>
    ({
      id: 'p1',
      name: 'Camisa Blanca',
      description: 'Camisa elegante de algodón',
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

  const mockAttributes: Attribute[] = [
    { id: 'color', name: 'Color', values: ['Rojo', 'Azul'] },
    { id: 'talle', name: 'Talle', values: ['S', 'M', 'L'] },
  ];

  beforeEach(fakeAsync(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
      'getProductsByQuery',
      'getProductById',
    ]);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    attributeServiceSpy = jasmine.createSpyObj('AttributeService', ['getAttributes']);

    productServiceSpy.getProducts.and.returnValue(
      of([
        makeProduct({
          id: 'a',
          name: 'Zapatos',
          description: 'Zapatos de cuero',
          price: 500,
          createdAt: new Date('2026-01-01'),
        }),
        makeProduct({
          id: 'b',
          name: 'Abanico',
          description: 'Abanico de seda',
          price: 100,
          createdAt: new Date('2026-06-01'),
        }),
      ]),
    );
    categoryServiceSpy.getCategories.and.returnValue(
      of([
        {
          id: 'cat-1',
          name: 'Remeras',
          slug: 'remeras',
          parentId: null,
          filterableAttributes: ['color'],
        } as Category,
      ]),
    );
    attributeServiceSpy.getAttributes.and.returnValue(of(mockAttributes));

    await TestBed.configureTestingModule({
      imports: [Catalog],
      providers: [
        provideRouter([]),
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: AttributeService, useValue: attributeServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (key: string) => (key === 'category' ? 'cat-1' : null),
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(250);
  }));

  it('should create and load products/categories/attributes', () => {
    expect(component).toBeTruthy();
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
    expect(attributeServiceSpy.getAttributes).toHaveBeenCalled();
    expect(component.allProducts().length).toBe(2);
    expect(component.isLoading()).toBe(false);
  });

  it('should map categories into a lookup map', () => {
    expect(component.allCategories().get('cat-1')?.name).toBe('Remeras');
  });

  describe('Sorting Logic', () => {
    it('should sort products by price ascending (priceAsc and price-asc)', () => {
      component.sort.set('priceAsc');
      expect(component.sortedProducts().map((p) => p.id)).toEqual(['b', 'a']);

      component.onSortChange({ target: { value: 'price-asc' } } as unknown as Event);
      expect(component.sortedProducts().map((p) => p.id)).toEqual(['b', 'a']);
      expect(component.page()).toBe(1);
    });

    it('should sort products by price descending (priceDesc and price-desc)', () => {
      component.sort.set('priceDesc');
      expect(component.sortedProducts().map((p) => p.id)).toEqual(['a', 'b']);

      component.onSortChange({ target: { value: 'price-desc' } } as unknown as Event);
      expect(component.sortedProducts().map((p) => p.id)).toEqual(['a', 'b']);
    });

    it('should sort products by name ascending (nameAsc and name-asc)', () => {
      component.sort.set('nameAsc');
      expect(component.sortedProducts().map((p) => p.id)).toEqual(['b', 'a']); // Abanico then Zapatos
    });

    it('should sort products by name descending (nameDesc and name-desc)', () => {
      component.sort.set('nameDesc');
      expect(component.sortedProducts().map((p) => p.id)).toEqual(['a', 'b']); // Zapatos then Abanico
    });
  });

  describe('Filtering Logic', () => {
    it('should filter out products with totalStock <= 0', () => {
      component.allProducts.set([
        makeProduct({ id: 'in', totalStock: 5 }),
        makeProduct({ id: 'out', totalStock: 0 }),
      ]);
      expect(component.filteredProducts().map((p) => p.id)).toEqual(['in']);
    });

    it('should filter products by search term in name or description', () => {
      component.allProducts.set([
        makeProduct({ id: '1', name: 'Pantalon Jean', description: 'Azul' }),
        makeProduct({ id: '2', name: 'Campera', description: 'Cuero negro' }),
      ]);

      component.searchTerm.set('jean');
      expect(component.filteredProducts().map((p) => p.id)).toEqual(['1']);

      component.searchTerm.set('cuero');
      expect(component.filteredProducts().map((p) => p.id)).toEqual(['2']);

      component.searchTerm.set('inexistente');
      expect(component.filteredProducts().length).toBe(0);
    });

    it('should filter products by category matching id, slug or suffix', () => {
      component.allProducts.set([
        makeProduct({ id: '1', categoryId: 'cat-1' }),
        makeProduct({ id: '2', categoryId: 'cat-other' }),
      ]);
      component.selectedCategoryId.set('cat-1');
      expect(component.filteredProducts().map((p) => p.id)).toEqual(['1']);
    });

    it('should filter products by minPrice and maxPrice', () => {
      component.allProducts.set([
        makeProduct({ id: '1', price: 100 }),
        makeProduct({ id: '2', price: 500 }),
        makeProduct({ id: '3', price: 1000 }),
      ]);

      component.minPrice.set(200);
      expect(component.filteredProducts().map((p) => p.id)).toEqual(['2', '3']);

      component.maxPrice.set(600);
      expect(component.filteredProducts().map((p) => p.id)).toEqual(['2']);
    });

    it('should filter products by dynamic attributes', () => {
      component.allProducts.set([
        makeProduct({ id: '1', inStockAttributes: { color: ['Rojo', 'Azul'] } }),
        makeProduct({ id: '2', inStockAttributes: { color: ['Verde'] } }),
        makeProduct({ id: '3', inStockAttributes: {} }),
      ]);

      component.dynamicAttributesFilter.set({
        color: { Rojo: true, Verde: false },
      });

      expect(component.filteredProducts().map((p) => p.id)).toEqual(['1']);
    });
  });

  describe('Form changes and debounce', () => {
    it('should update filter signals when filterForm value changes', fakeAsync(() => {
      component.filterForm.patchValue({
        minPrice: 50,
        maxPrice: 300,
        category: 'cat-1',
      });
      tick(250);

      expect(component.minPrice()).toBe(50);
      expect(component.maxPrice()).toBe(300);
      expect(component.selectedCategoryId()).toBe('cat-1');
      expect(component.activeAttributes().length).toBe(1); // 'color' for cat-1
    }));
  });

  describe('Pagination & Sidebar', () => {
    it('should calculate totalPages, currentPage and pages list', () => {
      const products = Array.from({ length: 25 }, (_, i) => makeProduct({ id: `p${i}` }));
      component.allProducts.set(products);
      component.itemsPerPage.set(10);

      expect(component.totalPages).toBe(3);
      expect(component.currentPage).toBe(1);
      expect(component.pages).toEqual([1, 2, 3]);
    });

    it('should navigate to valid page via goToPage()', () => {
      const products = Array.from({ length: 25 }, (_, i) => makeProduct({ id: `p${i}` }));
      component.allProducts.set(products);
      component.itemsPerPage.set(10);

      component.goToPage(2);
      expect(component.page()).toBe(2);

      component.goToPage(0); // Out of bounds lower
      expect(component.page()).toBe(2);

      component.goToPage(99); // Out of bounds upper
      expect(component.page()).toBe(2);
    });

    it('should toggle sidebar state', () => {
      expect(component.isSidebarOpen).toBeFalse();
      component.toggleSidebar();
      expect(component.isSidebarOpen).toBeTrue();
      component.toggleSidebar();
      expect(component.isSidebarOpen).toBeFalse();
    });

    it('clearFilters() should reset dynamic attributes and form values', () => {
      const dynamicGroup = component.filterForm.get('dynamicAttributes') as FormGroup;
      dynamicGroup.addControl('color', component['fb'].group({ Rojo: true }));

      component.filterForm.patchValue({ category: 'cat-1', minPrice: 100 });
      component.searchTerm.set('test');

      component.clearFilters();

      expect(component.filterForm.get('category')?.value).toBe('all');
      expect(component.filterForm.get('minPrice')?.value).toBeNull();
      expect(component.searchTerm()).toBe('');
      expect(component.page()).toBe(1);
      expect(component.hasActiveFilters).toBeFalse();
    });
  });

  describe('Error handling', () => {
    it('should handle service errors gracefully in loadInitialData', () => {
      productServiceSpy.getProducts.and.returnValue(throwError(() => new Error('Error load')));
      categoryServiceSpy.getCategories.and.returnValue(throwError(() => new Error('Error load')));
      attributeServiceSpy.getAttributes.and.returnValue(throwError(() => new Error('Error load')));

      component['loadInitialData']();

      expect(component.allProducts()).toEqual([]);
      expect(component.isLoading()).toBeFalse();
    });
  });
});
