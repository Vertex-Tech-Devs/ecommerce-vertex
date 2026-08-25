import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AttributeFormModal } from './attribute-form-modal';
import { AttributeService } from '@core/services/attribute.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Attribute } from '@core/models/attribute.model';

describe('AttributeFormModal', () => {
  let component: AttributeFormModal;
  let fixture: ComponentFixture<AttributeFormModal>;
  let attributeServiceSpy: jasmine.SpyObj<AttributeService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;

  beforeEach(async () => {
    attributeServiceSpy = jasmine.createSpyObj('AttributeService', [
      'updateAttribute',
      'addAttribute',
    ]);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', [
      'warning',
      'success',
      'error',
    ]);

    await TestBed.configureTestingModule({
      imports: [AttributeFormModal],
      providers: [
        { provide: AttributeService, useValue: attributeServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AttributeFormModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create attribute form modal', () => {
    expect(component).toBeTruthy();
  });

  it('should set attribute input correctly when editing', () => {
    const existing: Attribute = { id: 'a1', name: 'Color', values: ['Rojo', 'Azul'] };
    component.attribute = existing;
    expect(component.inlineAttribute).toEqual({ id: 'a1', name: 'Color', values: 'Rojo, Azul' });
  });

  it('should reset inlineAttribute when setting attribute to undefined', () => {
    component.attribute = undefined;
    expect(component.inlineAttribute).toEqual({ name: '', values: '' });
  });

  it('should emit closeModal when close() is called', () => {
    spyOn(component.closeModal, 'emit');
    component.close();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should warn if attribute name is less than 3 characters', fakeAsync(() => {
    component.inlineAttribute = { name: '  a  ', values: 'val' };
    void component.saveAttribute();
    tick();

    expect(sweetAlertServiceSpy.warning).toHaveBeenCalledWith(
      'Aviso',
      'El nombre del atributo debe tener al menos 3 caracteres.',
    );
    expect(attributeServiceSpy.addAttribute).not.toHaveBeenCalled();
  }));

  it('should create new attribute with trimmed and deduplicated values when no id is present', fakeAsync(() => {
    attributeServiceSpy.addAttribute.and.returnValue(
      Promise.resolve({ id: 'new-id' } as unknown as ReturnType<AttributeService['addAttribute']>),
    );
    spyOn(component.saveSuccess, 'emit');

    component.inlineAttribute = { name: '  Material  ', values: ' Algodón, Lana, Algodón,  ' };
    void component.saveAttribute();
    tick();

    expect(attributeServiceSpy.addAttribute).toHaveBeenCalledWith({
      name: 'Material',
      values: ['Algodón', 'Lana'],
    } as Attribute);
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith(
      '¡Éxito!',
      'Atributo creado correctamente.',
    );
    expect(component.saveSuccess.emit).toHaveBeenCalled();
  }));

  it('should update existing attribute when id is present', fakeAsync(() => {
    attributeServiceSpy.updateAttribute.and.returnValue(Promise.resolve());
    spyOn(component.saveSuccess, 'emit');

    component.inlineAttribute = { id: 'a1', name: 'Color Principal', values: 'Rojo, Verde' };
    void component.saveAttribute();
    tick();

    expect(attributeServiceSpy.updateAttribute).toHaveBeenCalledWith('a1', {
      name: 'Color Principal',
      values: ['Rojo', 'Verde'],
    });
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith(
      '¡Éxito!',
      'Atributo actualizado correctamente.',
    );
    expect(component.saveSuccess.emit).toHaveBeenCalled();
  }));

  it('should handle error when saveAttribute fails', fakeAsync(() => {
    attributeServiceSpy.addAttribute.and.returnValue(Promise.reject(new Error('Save failed')));

    component.inlineAttribute = { name: 'Talle', values: 'S, M, L' };
    void component.saveAttribute();
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error', jasmine.any(String));
  }));
});
