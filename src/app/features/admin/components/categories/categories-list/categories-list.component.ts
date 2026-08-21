import type { OnInit } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Observable } from 'rxjs';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Category } from '@core/models/category.model';
import { CategoryService } from '@core/services/category.service';
import { CategoryFormModalComponent } from '../category-form-modal/category-form-modal.component';
import { AdminSearchBarComponent } from '@shared/components/admin-search-bar/admin-search-bar.component';
import { AdminPaginationComponent } from '@shared/components/admin-pagination/admin-pagination.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CategoryFormModalComponent,
    AdminSearchBarComponent,
    AdminPaginationComponent,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private sweetAlertService = inject(SweetAlertService);

  showCategoryModal = false;
  selectedCategory: Category | undefined = undefined;

  searchTermSubject = new BehaviorSubject<string>('');
  currentPageSubject = new BehaviorSubject<number>(1);
  itemsPerPageSubject = new BehaviorSubject<number>(10);

  totalCategories = 0;
  totalPages = 0;

  readonly isLoading = signal<boolean>(true);
  categories$!: Observable<Category[]>;
  private rawCategories$ = new BehaviorSubject<Category[]>([]);

  ngOnInit(): void {
    this.loadCategories();

    this.categories$ = combineLatest([
      this.rawCategories$,
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.currentPageSubject,
      this.itemsPerPageSubject,
    ]).pipe(
      map(([allCategories, searchTerm, currentPage, itemsPerPage]) => {
        let filtered = allCategories;
        if (searchTerm) {
          const lower = searchTerm.toLowerCase();
          filtered = filtered.filter((cat) => cat.name.toLowerCase().includes(lower));
        }

        this.totalCategories = filtered.length;
        this.totalPages = Math.ceil(this.totalCategories / itemsPerPage);

        let correctedPage = currentPage;
        if (currentPage > this.totalPages && this.totalPages > 0) {
          correctedPage = this.totalPages;
        } else if (this.totalPages === 0) {
          correctedPage = 1;
        }

        const startIndex = (correctedPage - 1) * itemsPerPage;
        return filtered.slice(startIndex, startIndex + itemsPerPage);
      }),
    );
  }

  loadCategories(): void {
    this.categoryService
      .getCategories()
      .pipe(
        catchError((err) => {
          console.error('Error al cargar categorías:', err);
          return of([]);
        }),
      )
      .subscribe((cats) => {
        this.rawCategories$.next(cats);
        this.isLoading.set(false);
      });
  }

  onSearchChange(newValue: string): void {
    this.searchTermSubject.next(newValue);
    this.currentPageSubject.next(1);
  }

  onPageSizeChange(newSize: number): void {
    this.itemsPerPageSubject.next(newSize);
    this.currentPageSubject.next(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageSubject.next(page);
    }
  }

  toggleCategoryForm(category?: Category): void {
    this.selectedCategory = category;
    this.showCategoryModal = true;
  }

  closeCategoryModal(): void {
    this.showCategoryModal = false;
    this.selectedCategory = undefined;
  }

  onSaveSuccess(): void {
    this.closeCategoryModal();
    this.loadCategories();
  }

  async onDelete(category: Category): Promise<void> {
    const isConfirmed = await this.sweetAlertService.confirm(
      '¿Estás seguro?',
      `Esta acción eliminará la categoría "${category.name}". No podrás revertir esto.`,
    );

    if (isConfirmed && category.id) {
      try {
        await this.categoryService.deleteCategory(category.id);
        this.sweetAlertService.success('Eliminada', 'La categoría ha sido eliminada.');
        this.loadCategories();
      } catch {
        this.sweetAlertService.error('Error', 'Hubo un problema al eliminar la categoría.');
      }
    }
  }
}
