import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Observable } from 'rxjs';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import type { Attribute } from '@core/models/attribute.model';
import { AttributeService } from '@core/services/attribute.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AttributeFormModalComponent } from '../attribute-form-modal/attribute-form-modal.component';
import { AdminSearchBarComponent } from '@shared/components/admin-search-bar/admin-search-bar.component';
import { AdminPaginationComponent } from '@shared/components/admin-pagination/admin-pagination.component';

@Component({
  selector: 'app-attributes-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AttributeFormModalComponent,
    AdminSearchBarComponent,
    AdminPaginationComponent,
  ],
  templateUrl: './attributes-list.component.html',
  styleUrl: './attributes-list.component.scss',
})
export class AttributesListComponent implements OnInit {
  private attributeService = inject(AttributeService);
  private sweetAlertService = inject(SweetAlertService);

  showAttributeModal = false;
  selectedAttribute: Attribute | undefined = undefined;

  searchTermSubject = new BehaviorSubject<string>('');
  currentPageSubject = new BehaviorSubject<number>(1);
  itemsPerPageSubject = new BehaviorSubject<number>(10);

  totalAttributes = 0;
  totalPages = 0;

  attributes$!: Observable<Attribute[]>;
  private rawAttributes$ = new BehaviorSubject<Attribute[]>([]);

  ngOnInit(): void {
    this.loadAttributes();

    this.attributes$ = combineLatest([
      this.rawAttributes$,
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.currentPageSubject,
      this.itemsPerPageSubject,
    ]).pipe(
      map(([allAttrs, searchTerm, currentPage, itemsPerPage]) => {
        let filtered = allAttrs;
        if (searchTerm) {
          const lower = searchTerm.toLowerCase();
          filtered = filtered.filter((attr) => attr.name.toLowerCase().includes(lower));
        }

        this.totalAttributes = filtered.length;
        this.totalPages = Math.ceil(this.totalAttributes / itemsPerPage);

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

  loadAttributes(): void {
    this.attributeService.getAttributes().subscribe((attrs) => {
      this.rawAttributes$.next(attrs);
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

  toggleAttributeForm(attribute?: Attribute): void {
    this.selectedAttribute = attribute;
    this.showAttributeModal = true;
  }

  closeAttributeModal(): void {
    this.showAttributeModal = false;
    this.selectedAttribute = undefined;
  }

  onSaveSuccess(): void {
    this.closeAttributeModal();
    this.loadAttributes();
  }

  async onDelete(attribute: Attribute): Promise<void> {
    const isConfirmed = await this.sweetAlertService.confirm(
      '¿Estás seguro?',
      `Esta acción eliminará el atributo "${attribute.name}". Los productos que lo usen ya no podrán filtrarse por él.`,
    );

    if (isConfirmed && attribute.id) {
      try {
        await this.attributeService.deleteAttribute(attribute.id);
        this.sweetAlertService.success('Eliminado', 'El atributo ha sido eliminado.');
        this.loadAttributes();
      } catch {
        this.sweetAlertService.error('Error', 'Hubo un problema al eliminar el atributo.');
      }
    }
  }
}
