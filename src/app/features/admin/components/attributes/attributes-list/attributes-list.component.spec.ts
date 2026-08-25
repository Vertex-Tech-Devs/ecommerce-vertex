import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AttributesList } from './attributes-list';
import { AttributeService } from '@core/services/attribute.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Attribute } from '@core/models/attribute.model';

describe('AttributesList', () => {
  let component: AttributesList;
  let fixture: ComponentFixture<AttributesList>;
  let attributeServiceSpy: jasmine.SpyObj<AttributeService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;

  const mockAttributes: Attribute[] = [
    { id: 'a1', name: 'Color', values: ['Rojo', 'Azul'] },
    { id: 'a2', name: 'Talle', values: ['S', 'M', 'L'] },
  ];

  beforeEach(async () => {
    attributeServiceSpy = jasmine.createSpyObj('AttributeService', [
      'getAttributes',
      'deleteAttribute',
    ]);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', [
      'confirm',
      'success',
      'error',
    ]);

    attributeServiceSpy.getAttributes.and.returnValue(of(mockAttributes));

    await TestBed.configureTestingModule({
      imports: [AttributesList],
      providers: [
        { provide: AttributeService, useValue: attributeServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AttributesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create attributes list component', () => {
    expect(component).toBeTruthy();
    expect(component.isLoading()).toBeFalse();
  });

  it('should filter attributes by search term', fakeAsync(() => {
    let result: Attribute[] = [];
    component.attributes$.subscribe((attrs) => (result = attrs));

    component.onSearchChange('Color');
    tick(300);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('a1');
  }));

  it('should update page size', fakeAsync(() => {
    component.onPageSizeChange(5);
    tick(300);

    expect(component.itemsPerPageSubject.value).toBe(5);
    expect(component.currentPageSubject.value).toBe(1);
  }));

  it('should navigate to valid page', () => {
    component.totalPages = 3;
    component.goToPage(2);
    expect(component.currentPageSubject.value).toBe(2);
  });

  it('should toggle and close attribute modal', () => {
    component.toggleAttributeForm(mockAttributes[0]);
    expect(component.showAttributeModal).toBeTrue();
    expect(component.selectedAttribute).toEqual(mockAttributes[0]);

    component.closeAttributeModal();
    expect(component.showAttributeModal).toBeFalse();
    expect(component.selectedAttribute).toBeUndefined();
  });

  it('should reload attributes on save success', () => {
    spyOn(component, 'loadAttributes');
    component.onSaveSuccess();

    expect(component.showAttributeModal).toBeFalse();
    expect(component.loadAttributes).toHaveBeenCalled();
  });

  it('should delete attribute when confirmed', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));
    attributeServiceSpy.deleteAttribute.and.returnValue(Promise.resolve());

    void component.onDelete(mockAttributes[0]);
    tick();

    expect(sweetAlertServiceSpy.confirm).toHaveBeenCalled();
    expect(attributeServiceSpy.deleteAttribute).toHaveBeenCalledWith('a1');
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith('Eliminado', jasmine.any(String));
  }));

  it('should handle error when deleting attribute', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));
    attributeServiceSpy.deleteAttribute.and.returnValue(Promise.reject(new Error('Delete err')));

    void component.onDelete(mockAttributes[0]);
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error', jasmine.any(String));
  }));

  it('should not delete if confirmation is cancelled', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(false));

    void component.onDelete(mockAttributes[0]);
    tick();

    expect(attributeServiceSpy.deleteAttribute).not.toHaveBeenCalled();
  }));

  it('should handle error when loading attributes', () => {
    attributeServiceSpy.getAttributes.and.returnValue(throwError(() => new Error('Load error')));
    component.loadAttributes();

    expect(component.isLoading()).toBeFalse();
  });
});
