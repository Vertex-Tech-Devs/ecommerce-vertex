import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoryFormModal } from './category-form-modal';
import { CategoryService } from '@core/services/category.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Category } from '@core/models/category.model';

describe('CategoryFormModal', () => {
  let component: CategoryFormModal;
  let fixture: ComponentFixture<CategoryFormModal>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;

  beforeEach(async () => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['updateCategory', 'addCategory']);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', [
      'warning',
      'success',
      'error',
    ]);

    await TestBed.configureTestingModule({
      imports: [CategoryFormModal],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFormModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create category form modal', () => {
    expect(component).toBeTruthy();
  });

  it('should set category input correctly when editing', () => {
    const existing: Category = { id: 'c1', name: 'Calzado' } as Category;
    component.category = existing;
    expect(component.inlineCategory).toEqual({ id: 'c1', name: 'Calzado' });
  });

  it('should reset inlineCategory when setting category to undefined', () => {
    component.category = undefined;
    expect(component.inlineCategory).toEqual({ name: '' });
  });

  it('should emit closeModal when close() is called', () => {
    spyOn(component.closeModal, 'emit');
    component.close();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should warn if category name is less than 3 characters', fakeAsync(() => {
    component.inlineCategory = { name: '  ab  ' };
    void component.saveCategory();
    tick();

    expect(sweetAlertServiceSpy.warning).toHaveBeenCalledWith(
      'Aviso',
      'El nombre de la categoría debe tener al menos 3 caracteres.',
    );
    expect(categoryServiceSpy.addCategory).not.toHaveBeenCalled();
  }));

  it('should create new category when no id is present', fakeAsync(() => {
    categoryServiceSpy.addCategory.and.returnValue(
      Promise.resolve({ id: 'new-id' } as unknown as ReturnType<CategoryService['addCategory']>),
    );
    spyOn(component.saveSuccess, 'emit');

    component.inlineCategory = { name: '  Ropa Masculina  ' };
    void component.saveCategory();
    tick();

    expect(categoryServiceSpy.addCategory).toHaveBeenCalledWith(
      jasmine.objectContaining({
        name: 'Ropa Masculina',
        slug: 'ropa-masculina',
      }),
    );
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith(
      '¡Éxito!',
      'Categoría creada correctamente.',
    );
    expect(component.saveSuccess.emit).toHaveBeenCalled();
  }));

  it('should update existing category when id is present', fakeAsync(() => {
    categoryServiceSpy.updateCategory.and.returnValue(Promise.resolve());
    spyOn(component.saveSuccess, 'emit');

    component.inlineCategory = { id: 'c1', name: 'Calzado Deportivo' };
    void component.saveCategory();
    tick();

    expect(categoryServiceSpy.updateCategory).toHaveBeenCalledWith('c1', {
      name: 'Calzado Deportivo',
      slug: 'calzado-deportivo',
    });
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith(
      '¡Éxito!',
      'Categoría actualizada correctamente.',
    );
    expect(component.saveSuccess.emit).toHaveBeenCalled();
  }));

  it('should handle error when saveCategory fails', fakeAsync(() => {
    categoryServiceSpy.addCategory.and.returnValue(Promise.reject(new Error('Save failed')));

    component.inlineCategory = { name: 'Accesorios' };
    void component.saveCategory();
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error', jasmine.any(String));
  }));
});
