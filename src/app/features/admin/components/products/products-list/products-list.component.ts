import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { Product } from '@core/models/product.model';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmDeleteModalComponent } from '../../shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { TruncatePipe } from "../../shared/pipes/truncate.pipe";
import { CategoryService } from '@core/services/category.service';
import { Category } from '@core/models/category.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    CurrencyPipe,
    FormsModule,
    TitleCasePipe,
    TruncatePipe
  ],
  standalone: true,
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public products$!: Observable<Product[]>;
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private modalService = inject(BsModalService);

  bsModalRef?: BsModalRef;
  private modalSubscription?: Subscription;

  public searchTermSubject = new BehaviorSubject<string>('');
  public filterCategorySubject = new BehaviorSubject<string>('all');
  public categories$!: Observable<Category[]>;
  private categoriesMap: Map<string, string> = new Map();
  
  public currentPageSubject = new BehaviorSubject<number>(1);
  public itemsPerPageSubject = new BehaviorSubject<number>(10);
  public itemsPerPageOptions = [5, 10, 20, 30];

  public totalProducts = 0;
  public totalPages = 0;

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories().pipe(
      map(categories => {
        this.categoriesMap.clear();
        categories.forEach(cat => this.categoriesMap.set(cat.id!, cat.name));
        return categories;
      })
    );

    this.products$ = combineLatest([
      this.productService.getProducts(),
      this.categories$,
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.filterCategorySubject,
      this.currentPageSubject,
      this.itemsPerPageSubject
    ]).pipe(
      map(([allProducts, categories, searchTerm, filterCategoryId, currentPage, itemsPerPage]) => {
        let filteredProducts = allProducts;
        
        if (searchTerm) {
          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.description.toLowerCase().includes(lowerCaseSearchTerm)
          );
        }

        if (filterCategoryId !== 'all') {
          filteredProducts = filteredProducts.filter(product =>
            product.categoryId === filterCategoryId
          );
        }

        this.totalProducts = filteredProducts.length;
        this.totalPages = Math.ceil(this.totalProducts / itemsPerPage);

        if (currentPage > this.totalPages && this.totalPages > 0) {
          this.currentPageSubject.next(this.totalPages);
          currentPage = this.totalPages;
        } else if (this.totalPages === 0 && currentPage !== 1) {
          this.currentPageSubject.next(1);
          currentPage = 1;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
      })
    );
  }

  getCategoryName(categoryId: string): string {
    return this.categoriesMap.get(categoryId) || 'Sin Categoría';
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
    }
  }

  onItemsPerPageChange(newValue: string): void {
    this.itemsPerPageSubject.next(Number(newValue));
    this.currentPageSubject.next(1);
  }

  ngOnDestroy(): void {
    this.bsModalRef?.hide();
    this.modalSubscription?.unsubscribe();
  }

  confirmDelete(product: Product): void {
    this.bsModalRef = this.modalService.show(ConfirmDeleteModalComponent, {
      initialState: {
        title: 'Confirmar Eliminación de Producto',
        message: `¿Estás seguro de que deseas eliminar el producto "${product.name}"? Esta acción no se puede deshacer.`,
      },
      class: 'modal-md modal-dialog-centered',
    });

    this.modalSubscription = this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.productService.deleteProduct(product.id);
      }
    });
  }

  newProduct(): void {
    this.router.navigate(['/admin/products/create']);
  }
}