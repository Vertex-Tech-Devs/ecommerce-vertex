import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Observable } from 'rxjs';
import type { Attribute } from '@core/models/attribute.model';
import { AttributeService } from '@core/services/attribute.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';

@Component({
  selector: 'app-attributes-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.scss'],
})
export class AttributesListComponent implements OnInit {
  private attributeService = inject(AttributeService);
  private sweetAlertService = inject(SweetAlertService);

  showAttributeForm = false;
  inlineAttribute: { id?: string; name: string; values: string } = { name: '', values: '' };

  attributes$!: Observable<Attribute[]>;

  ngOnInit(): void {
    this.attributes$ = this.attributeService.getAttributes();
  }

  toggleAttributeForm(attribute?: Attribute): void {
    if (attribute) {
      this.inlineAttribute = {
        id: attribute.id,
        name: attribute.name || '',
        values: (attribute.values || []).join(', '),
      };
    } else {
      this.inlineAttribute = { name: '', values: '' };
    }
    this.showAttributeForm = true;
  }

  cancelInlineForm(): void {
    this.showAttributeForm = false;
    this.inlineAttribute = { name: '', values: '' };
  }

  async saveInlineAttribute(): Promise<void> {
    const name = this.inlineAttribute.name.trim();
    if (!name || name.length < 3) {
      this.sweetAlertService.warning(
        'Aviso',
        'El nombre del atributo debe tener al menos 3 caracteres.'
      );
      return;
    }
    const values = this.inlineAttribute.values
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
    const uniqueValues = [...new Set(values)];

    try {
      if (this.inlineAttribute.id) {
        await this.attributeService.updateAttribute(this.inlineAttribute.id, {
          name,
          values: uniqueValues,
        });
        this.sweetAlertService.success('¡Éxito!', 'Atributo actualizado correctamente.');
      } else {
        await this.attributeService.addAttribute({
          name,
          values: uniqueValues,
        } as Attribute);
        this.sweetAlertService.success('¡Éxito!', 'Atributo creado correctamente.');
      }
      this.showAttributeForm = false;
      this.inlineAttribute = { name: '', values: '' };
      this.attributes$ = this.attributeService.getAttributes();
    } catch {
      this.sweetAlertService.error('Error', 'Hubo un problema al guardar el atributo.');
    }
  }

  async onDelete(attribute: Attribute): Promise<void> {
    const isConfirmed = await this.sweetAlertService.confirm(
      '¿Estás seguro?',
      `Esta acción eliminará el atributo "${attribute.name}". Los productos que lo usen ya no podrán filtrarse por él.`
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
