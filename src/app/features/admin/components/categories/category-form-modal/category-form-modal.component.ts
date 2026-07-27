import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Category } from '@core/models/category.model';
import { CategoryService } from '@core/services/category.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { WithFieldValue } from '@angular/fire/firestore';

@Component({
  selector: 'app-category-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-form-modal.component.html',
  styleUrl: './category-form-modal.component.scss',
})
export class CategoryFormModalComponent {
  private categoryService = inject(CategoryService);
  private sweetAlertService = inject(SweetAlertService);

  @Input() set category(value: Category | undefined) {
    if (value) {
      this.inlineCategory = {
        id: value.id,
        name: value.name || '',
      };
    } else {
      this.inlineCategory = { name: '' };
    }
  }

  @Output() closeModal = new EventEmitter<void>();
  @Output() saveSuccess = new EventEmitter<void>();

  inlineCategory: { id?: string; name: string } = { name: '' };

  close(): void {
    this.closeModal.emit();
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
      this.saveSuccess.emit();
    } catch {
      this.sweetAlertService.error('Error', 'Hubo un problema al guardar la categoría.');
    }
  }
}
