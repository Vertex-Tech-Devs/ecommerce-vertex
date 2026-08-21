import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Attribute } from '@core/models/attribute.model';
import { AttributeService } from '@core/services/attribute.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';

@Component({
  selector: 'app-attribute-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attribute-form-modal.html',
  styleUrl: './attribute-form-modal.scss',
})
export class AttributeFormModal {
  private attributeService = inject(AttributeService);
  private sweetAlertService = inject(SweetAlertService);

  @Input() set attribute(value: Attribute | undefined) {
    if (value) {
      this.inlineAttribute = {
        id: value.id,
        name: value.name || '',
        values: (value.values || []).join(', '),
      };
    } else {
      this.inlineAttribute = { name: '', values: '' };
    }
  }

  @Output() closeModal = new EventEmitter<void>();
  @Output() saveSuccess = new EventEmitter<void>();

  inlineAttribute: { id?: string; name: string; values: string } = { name: '', values: '' };

  close(): void {
    this.closeModal.emit();
  }

  async saveAttribute(): Promise<void> {
    const name = this.inlineAttribute.name.trim();
    if (!name || name.length < 3) {
      this.sweetAlertService.warning(
        'Aviso',
        'El nombre del atributo debe tener al menos 3 caracteres.',
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
      this.saveSuccess.emit();
    } catch {
      this.sweetAlertService.error('Error', 'Hubo un problema al guardar el atributo.');
    }
  }
}
