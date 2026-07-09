import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Observable } from 'rxjs';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Category } from '@core/models/category.model';
import { CategoryService } from '@core/services/category.service';
import { CategoryFormModalComponent } from '../category-form-modal/category-form-modal.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryFormModalComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private sweetAlertService = inject(SweetAlertService);

  showCategoryModal = false;
  selectedCategory: Category | undefined = undefined;

  categories$!: Observable<Category[]>;

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
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
    this.categories$ = this.categoryService.getCategories();
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
      } catch {
        this.sweetAlertService.error('Error', 'Hubo un problema al eliminar la categoría.');
      }
    }
  }
}
