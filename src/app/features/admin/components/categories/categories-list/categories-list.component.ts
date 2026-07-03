import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Observable } from 'rxjs';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Category } from '@core/models/category.model';
import type { WithFieldValue } from '@angular/fire/firestore';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private sweetAlertService = inject(SweetAlertService);

  showCategoryForm = false;
  inlineCategory: { id?: string; name: string } = { name: '' };

  categories$!: Observable<Category[]>;

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }

  toggleCategoryForm(category?: Category): void {
    if (category) {
      this.inlineCategory = { id: category.id, name: category.name || '' };
    } else {
      this.inlineCategory = { name: '' };
    }
    this.showCategoryForm = true;
  }

  cancelCategoryForm(): void {
    this.showCategoryForm = false;
    this.inlineCategory = { name: '' };
  }

  async saveCategory(): Promise<void> {
    const name = this.inlineCategory.name.trim();
    if (!name || name.length < 3) {
      this.sweetAlertService.warning(
        'Aviso',
        'El nombre de la categoría debe tener al menos 3 caracteres.',
      );
      return;
    }
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    try {
      if (this.inlineCategory.id) {
        await this.categoryService.updateCategory(this.inlineCategory.id, {
          name,
          slug,
        });
        this.sweetAlertService.success('¡Éxito!', 'Categoría actualizada correctamente.');
      } else {
        await this.categoryService.addCategory({
          name,
          slug,
          parentId: null,
          filterableAttributes: [],
        } as unknown as WithFieldValue<Omit<Category, 'id'>>);
        this.sweetAlertService.success('¡Éxito!', 'Categoría creada correctamente.');
      }
      this.showCategoryForm = false;
      this.inlineCategory = { name: '' };
      this.categories$ = this.categoryService.getCategories();
    } catch {
      this.sweetAlertService.error('Error', 'Hubo un problema al guardar la categoría.');
    }
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
