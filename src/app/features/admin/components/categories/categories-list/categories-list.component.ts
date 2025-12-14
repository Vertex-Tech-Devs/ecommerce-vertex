import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, map } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Category } from '@core/models/category.model';
import { CategoryService } from '@core/services/category.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { WithFieldValue } from '@angular/fire/firestore';
import { AttributeService } from '@core/services/attribute.service';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  private categoryService = inject(CategoryService);
  private attributeService = inject(AttributeService);
  private modalService = inject(BsModalService);
  private sweetAlertService = inject(SweetAlertService);

  public categories$!: Observable<Category[]>;
  private bsModalRef?: BsModalRef;
  private modalSubscription?: Subscription;
  
  public attributesMap: Map<string, string> = new Map();

  ngOnInit(): void {
    this.attributeService.getAttributes().pipe(
      map(attributes => attributes.forEach(attr => this.attributesMap.set(attr.id!, attr.name)))
    ).subscribe();
    
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }

  getAttributeNames(attributeIds: string[] | undefined): string {
    if (!attributeIds || attributeIds.length === 0) {
      return 'Ninguno';
    }
    return attributeIds.map(id => this.attributesMap.get(id) || 'ID Desconocido').join(', ');
  }

  openCategoryModal(category?: Category): void {
    const initialState = category ? { category: { ...category } } : {};
    this.bsModalRef = this.modalService.show(CategoryModalComponent, {
      initialState,
      class: 'modal-lg modal-dialog-centered',
    });

    this.modalSubscription = this.bsModalRef.content.onClose.subscribe((result: { name: string, slug: string, parentId: string | null, filterableAttributes: string[] } | null) => {
      if (result) {
        if (category && category.id) {
          this.updateCategory(category.id, result);
        } else {
          this.addCategory(result);
        }
      }
    });
  }

  private addCategory(categoryData: { name: string, slug: string, parentId: string | null, filterableAttributes: string[] }): void {
    const data: WithFieldValue<Omit<Category, 'id'>> = {
      ...categoryData,
    };
    this.categoryService.addCategory(data)
      .then(() => this.sweetAlertService.success('¡Éxito!', 'Categoría creada correctamente.'))
      .catch(err => this.sweetAlertService.error('Error', 'Hubo un problema al crear la categoría.'));
  }

  private updateCategory(id: string, categoryData: Partial<Category>): void {
    this.categoryService.updateCategory(id, categoryData)
      .then(() => this.sweetAlertService.success('¡Éxito!', 'Categoría actualizada correctamente.'))
      .catch(err => this.sweetAlertService.error('Error', 'Hubo un problema al actualizar la categoría.'));
  }

  async onDelete(category: Category): Promise<void> {
    const isConfirmed = await this.sweetAlertService.confirm(
      '¿Estás seguro?',
      `Esta acción eliminará la categoría "${category.name}". No podrás revertir esto.`
    );

    if (isConfirmed && category.id) {
      try {
        await this.categoryService.deleteCategory(category.id);
        this.sweetAlertService.success('Eliminada', 'La categoría ha sido eliminada.');
      } catch (err) {
        this.sweetAlertService.error('Error', 'Hubo un problema al eliminar la categoría.');
      }
    }
  }
}