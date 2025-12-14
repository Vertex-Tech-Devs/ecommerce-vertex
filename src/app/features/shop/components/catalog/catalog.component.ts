import { Component, inject, OnInit, HostListener, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith, debounceTime, take, switchMap, distinctUntilChanged } from 'rxjs/operators';

import { Product } from '@core/models/product.model';
import { Category } from '@core/models/category.model';
import { Attribute } from '@core/models/attribute.model';
import { ProductService, ProductFilters } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { AttributeService } from '@core/services/attribute.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private attributeService = inject(AttributeService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  public paginatedProducts$!: Observable<Product[]>;
  public categories$!: Observable<Category[]>;
  
  private allAttributes = signal<Attribute[]>([]);
  public activeAttributes = signal<Attribute[]>([]);
  private allCategories = signal<Map<string, Category>>(new Map());

  public filterForm: FormGroup;
  private sortSubject = new BehaviorSubject<string>('newest');
  private pageSubject = new BehaviorSubject<number>(1);
  private productsFromQuery$ = new BehaviorSubject<Product[]>([]);

  public isSidebarOpen = false;
  public totalPages = 0;
  public currentPage = 1;

  private itemsPerPage = new BehaviorSubject<number>(this.isMobile() ? 12 : 12);

  constructor() {
    this.filterForm = this.fb.group({
      category: [null],
      minPrice: [null],
      maxPrice: [null],
      dynamicAttributes: this.fb.group({})
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.itemsPerPage.next(this.isMobile() ? 12 : 12);
  }

  ngOnInit(): void {
    this.loadInitialDataAndInitializeForm();
  }

  private isMobile(): boolean {
    return window.innerWidth < 992;
  }

  private loadInitialDataAndInitializeForm(): void {
    this.categories$ = this.categoryService.getCategories().pipe(
      map(categories => {
        const categoryMap = new Map<string, Category>();
        categories.forEach(cat => categoryMap.set(cat.id!, cat));
        this.allCategories.set(categoryMap);
        return categories;
      })
    );

    this.attributeService.getAttributes().pipe(take(1)).subscribe(attrs => {
      this.allAttributes.set(attrs);
      this.activeAttributes.set([]);
      
      const dynamicGroup = this.filterForm.get('dynamicAttributes') as FormGroup;
      attrs.forEach(attr => {
        if (attr.id) {
          const controls = attr.values.reduce((acc, val) => {
            acc[val] = this.fb.control(false);
            return acc;
          }, {} as { [key: string]: FormControl });
          dynamicGroup.addControl(attr.id, this.fb.group(controls));
        }
      });
      
      this.setupFormListeners();
      this.setupProductLoadingPipeline();
      this.applyInitialCategoryFilter();
    });
  }

  private setupFormListeners(): void {
    const filters$ = this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value),
      debounceTime(200),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    );

    filters$.pipe(
      map(filters => filters.category),
      distinctUntilChanged(),
      switchMap(categoryId => {
        this.pageSubject.next(1);
        this.updateActiveFilters(categoryId ?? null);
        const catId = categoryId === 'all' ? null : categoryId;
        return this.productService.getProductsByQuery(catId);
      })
    ).subscribe(products => {
      this.productsFromQuery$.next(products);
    });
  }

  private updateActiveFilters(selectedCategoryId: string | null): void {
    if (!selectedCategoryId || selectedCategoryId === 'all') {
      this.activeAttributes.set([]);
      return;
    }

    const category = this.allCategories().get(selectedCategoryId);
    if (category && category.filterableAttributes) {
      const active = this.allAttributes().filter(attr => 
        category.filterableAttributes.includes(attr.id!)
      );
      this.activeAttributes.set(active);
    } else {
      this.activeAttributes.set([]);
    }
  }

  private setupProductLoadingPipeline(): void {
    const filteredProducts$ = combineLatest([
      this.productsFromQuery$,
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value), debounceTime(200))
    ]).pipe(
      map(([products, filters]) => {
        const { minPrice, maxPrice, dynamicAttributes } = filters;

        const dynamicFilters: { [key: string]: string[] } = {};
        for (const attrId in dynamicAttributes) {
          if (Object.prototype.hasOwnProperty.call(dynamicAttributes, attrId)) {
            const valuesGroup = dynamicAttributes[attrId];
            const selectedValues = Object.keys(valuesGroup).filter(key => valuesGroup[key]);
            if (selectedValues.length > 0) {
              dynamicFilters[attrId] = selectedValues;
            }
          }
        }
        
        const hasPriceFilter = (minPrice !== null && minPrice !== undefined) || (maxPrice !== null && maxPrice !== undefined && maxPrice > 0);
        const hasDynamicFilter = Object.keys(dynamicFilters).length > 0;

        return products.filter(product => {
          if (product.totalStock <= 0) {
            return false;
          }

          if (hasPriceFilter) {
            if (minPrice !== null && product.price < minPrice) {
              return false;
            }
            if (maxPrice !== null && maxPrice > 0 && product.price > maxPrice) {
              return false;
            }
          }

          if (hasDynamicFilter) {
            const match = Object.entries(dynamicFilters).every(([attrId, values]) => {
              const productAttributeValues = product.inStockAttributes[attrId];
              if (!productAttributeValues) {
                return false;
              }
              return values.some(val => productAttributeValues.includes(val));
            });
            if (!match) {
              return false;
            }
          }
          
          return true;
        });
      })
    );
    
    const sortedProducts$ = combineLatest([
      filteredProducts$,
      this.sortSubject
    ]).pipe(
      map(([products, sort]) => {
        const sorted = [...products];
        if (sort === 'priceAsc') {
          sorted.sort((a, b) => a.price - b.price);
        } else if (sort === 'priceDesc') {
          sorted.sort((a, b) => b.price - a.price);
        } else if (sort === 'newest') {
          sorted.sort((a, b) => {
            const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
            const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
            return dateB - dateA;
          });
        }
        return sorted;
      })
    );

    this.paginatedProducts$ = combineLatest([
      sortedProducts$,
      this.pageSubject,
      this.itemsPerPage
    ]).pipe(
      map(([products, page, itemsPerPageValue]) => {
        this.totalPages = Math.ceil(products.length / itemsPerPageValue);
        this.currentPage = page;
        this.cdr.detectChanges();

        const startIndex = (page - 1) * itemsPerPageValue;
        const endIndex = startIndex + itemsPerPageValue;
        return products.slice(startIndex, endIndex);
      })
    );
  }

  private applyInitialCategoryFilter(): void {
    this.route.queryParamMap.pipe(take(1)).subscribe(params => {
      const categoryId = params.get('category');
      if (categoryId) {
        this.filterForm.patchValue({ category: categoryId });
      } else {
        this.filterForm.patchValue({ category: 'all' });
      }
    });
  }

  public toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortSubject.next(selectElement.value);
    this.pageSubject.next(1);
  }

  clearFilters(): void {
    const dynamicGroup = this.filterForm.get('dynamicAttributes') as FormGroup;
    dynamicGroup.reset();
    this.filterForm.patchValue({
      category: this.filterForm.get('category')?.value,
      minPrice: null,
      maxPrice: null
    });
    this.pageSubject.next(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageSubject.next(page);
    }
  }
}