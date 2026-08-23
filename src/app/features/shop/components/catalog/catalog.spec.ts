import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Catalog } from './catalog';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { AttributeService } from '@core/services/attribute.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import type { Product } from '@core/models/product.model';
import type { Category } from '@core/models/category.model';
import type { Attribute } from '@core/models/attribute.model';

describe('Catalog Component', () => {
  let component: Catalog;
  let fixture: ComponentFixture<Catalog>;

  const mockProducts: Product[] = [
    {
      id: 'prod-1',
      name: 'Mancuerna Hexagonal',
      description: 'Mancuerna de goma 10kg',
      price: 25000,
      totalStock: 10,
      categoryId: 'cat-pesas',
      image: 'https://example.com/mancuerna.jpg',
      createdAt: new Date(),
      inStockAttributes: {},
      variantAttributes: [],
    },
    {
      id: 'prod-2',
      name: 'Mat de Yoga',
      description: 'Mat antideslizante 6mm',
      price: 15000,
      totalStock: 5,
      categoryId: 'cat-yoga',
      image: 'https://example.com/mat.jpg',
      createdAt: new Date(),
      inStockAttributes: {},
      variantAttributes: [],
    },
    {
      id: 'prod-3',
      name: 'Banda Elástica',
      description: 'Resistencia media',
      price: 5000,
      totalStock: 0,
      categoryId: 'cat-yoga',
      image: 'https://example.com/banda.jpg',
      createdAt: new Date(),
      inStockAttributes: {},
      variantAttributes: [],
    },
  ];

  const mockCategories: Category[] = [
    { id: 'cat-pesas', name: 'Pesas', slug: 'pesas', parentId: null, filterableAttributes: [] },
    { id: 'cat-yoga', name: 'Yoga', slug: 'yoga', parentId: null, filterableAttributes: [] },
  ];

  const mockAttributes: Attribute[] = [];

  beforeEach(async () => {
    const productServiceSpy = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of(mockProducts)),
      getProductsByQuery: jasmine.createSpy('getProductsByQuery').and.returnValue(of(mockProducts)),
    };

    const categoryServiceSpy = {
      getCategories: jasmine.createSpy('getCategories').and.returnValue(of(mockCategories)),
    };

    const attributeServiceSpy = {
      getAttributes: jasmine.createSpy('getAttributes').and.returnValue(of(mockAttributes)),
    };

    await TestBed.configureTestingModule({
      imports: [Catalog, ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: AttributeService, useValue: attributeServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(convertToParamMap({ category: 'all' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load active products excluding zero-stock', () => {
    expect(component).toBeTruthy();
    const filtered = component.filteredProducts();
    expect(filtered.length).toBe(2);
    expect(filtered.find((p) => p.id === 'prod-3')).toBeUndefined();
  });

  it('should filter by search term', () => {
    component.searchTerm.set('yoga');
    const filtered = component.filteredProducts();
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('prod-2');
  });

  it('should filter by price range', fakeAsync(() => {
    component.minPrice.set(20000);
    fixture.detectChanges();
    const filtered = component.filteredProducts();
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('prod-1');
  }));

  it('should filter by category', () => {
    component.selectedCategoryId.set('cat-yoga');
    const filtered = component.filteredProducts();
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('prod-2');
  });

  it('should sort products by price ascending and descending', () => {
    component.sort.set('priceAsc');
    let sorted = component.sortedProducts();
    expect(sorted[0].price).toBe(15000);
    expect(sorted[1].price).toBe(25000);

    component.sort.set('priceDesc');
    sorted = component.sortedProducts();
    expect(sorted[0].price).toBe(25000);
    expect(sorted[1].price).toBe(15000);
  });
});
