import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Observable } from 'rxjs';
import type { Attribute } from '@core/models/attribute.model';
import { AttributeService } from '@core/services/attribute.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AttributeFormModalComponent } from '../attribute-form-modal/attribute-form-modal.component';

@Component({
  selector: 'app-attributes-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AttributeFormModalComponent],
  templateUrl: './attributes-list.component.html',
  styleUrl: './attributes-list.component.scss',
})
export class AttributesListComponent implements OnInit {
  private attributeService = inject(AttributeService);
  private sweetAlertService = inject(SweetAlertService);

  showAttributeModal = false;
  selectedAttribute: Attribute | undefined = undefined;

  attributes$!: Observable<Attribute[]>;

  ngOnInit(): void {
    this.attributes$ = this.attributeService.getAttributes();
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
    this.attributes$ = this.attributeService.getAttributes();
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
      } catch {
        this.sweetAlertService.error('Error', 'Hubo un problema al eliminar el atributo.');
      }
    }
  }
}

