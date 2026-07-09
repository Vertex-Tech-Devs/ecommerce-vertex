import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe, ViewportScroller } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Observable } from 'rxjs';
import { BehaviorSubject, combineLatest } from 'rxjs';
import type { Product } from '@core/models/product.model';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { CategoryService } from '@core/services/category.service';
import type { Category } from '@core/models/category.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  imports: [CommonModule, RouterModule, CurrencyPipe, FormsModule, TitleCasePipe, TruncatePipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  products$!: Observable<Product[]>;
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private sweetAlertService = inject(SweetAlertService);
  private viewportScroller = inject(ViewportScroller);

  searchTermSubject = new BehaviorSubject<string>('');
  filterCategorySubject = new BehaviorSubject<string>('all');
  categories$!: Observable<Category[]>;
  private categoriesMap: Map<string, string> = new Map();

  currentPageSubject = new BehaviorSubject<number>(1);
  itemsPerPageSubject = new BehaviorSubject<number>(12);

  totalProducts = 0;
  totalPages = 0;

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories().pipe(
      map((categories) => {
        this.categoriesMap.clear();
        categories.forEach((cat) => this.categoriesMap.set(cat.id!, cat.name));
        return categories;
      }),
    );

    this.products$ = combineLatest([
      this.productService.getProducts(),
      this.categories$,
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.filterCategorySubject,
      this.currentPageSubject,
      this.itemsPerPageSubject,
    ]).pipe(
      map(([allProducts, _categories, searchTerm, filterCategoryId, currentPage, itemsPerPage]) => {
        let filteredProducts = allProducts;

        if (searchTerm) {
          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
              product.description.toLowerCase().includes(lowerCaseSearchTerm),
          );
        }

        if (filterCategoryId !== 'all') {
          filteredProducts = filteredProducts.filter(
            (product) => product.categoryId === filterCategoryId,
          );
        }

        this.totalProducts = filteredProducts.length;
        this.totalPages = Math.ceil(this.totalProducts / itemsPerPage);

        if (currentPage > this.totalPages && this.totalPages > 0) {
          const corrected = this.totalPages;
          currentPage = corrected;
          void Promise.resolve().then(() => this.currentPageSubject.next(corrected));
        } else if (this.totalPages === 0 && currentPage !== 1) {
          currentPage = 1;
          void Promise.resolve().then(() => this.currentPageSubject.next(1));
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
      }),
    );
  }

  getCategoryName(categoryId: string): string {
    return this.categoriesMap.get(categoryId) ?? 'Sin Categoría';
  }

  onSearchChange(newValue: string): void {
    this.searchTermSubject.next(newValue);
    this.currentPageSubject.next(1);
  }

  onFilterCategoryChange(newValue: string): void {
    this.filterCategorySubject.next(newValue);
    this.currentPageSubject.next(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageSubject.next(page);

      setTimeout(() => {
        this.viewportScroller.scrollToPosition([0, 0]);

        const container = document.querySelector('.admin-shell__main');
        if (container) {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }
  }

  async confirmDelete(product: Product): Promise<void> {
    const isConfirmed = await this.sweetAlertService.confirm(
      'Confirmar Eliminación de Producto',
      `¿Estás seguro de que deseas eliminar el producto "${product.name}"? Esta acción no se puede deshacer.`,
    );
    if (isConfirmed && product.id) {
      try {
        await this.productService.deleteProduct(product.id);
        this.sweetAlertService.success('Eliminado', 'El producto ha sido eliminado.');
      } catch {
        this.sweetAlertService.error('Error', 'Hubo un problema al eliminar el producto.');
      }
    }
  }

  newProduct(): void {
    void this.router.navigate(['/admin/products/create']);
  }

  goToDetail(productId: string | undefined): void {
    if (productId) {
      void this.router.navigate(['/admin/products', productId]);
    }
  }
}
