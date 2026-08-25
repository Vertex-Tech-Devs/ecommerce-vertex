import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CategoriesList } from './categories-list';
import { CategoryService } from '@core/services/category.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Category } from '@core/models/category.model';

describe('CategoriesList', () => {
  let component: CategoriesList;
  let fixture: ComponentFixture<CategoriesList>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;

  const mockCategories: Category[] = [
    { id: 'c1', name: 'Ropa', slug: 'ropa' } as Category,
    { id: 'c2', name: 'Accesorios', slug: 'accesorios' } as Category,
  ];

  beforeEach(async () => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', [
      'getCategories',
      'deleteCategory',
    ]);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', [
      'confirm',
      'success',
      'error',
    ]);

    categoryServiceSpy.getCategories.and.returnValue(of(mockCategories));

    await TestBed.configureTestingModule({
      imports: [CategoriesList],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create categories list component', () => {
    expect(component).toBeTruthy();
    expect(component.isLoading()).toBeFalse();
  });

  it('should filter categories by search term', fakeAsync(() => {
    let result: Category[] = [];
    component.categories$.subscribe((cats) => (result = cats));

    component.onSearchChange('Ropa');
    tick(300);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('c1');
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

  it('should toggle and close category modal', () => {
    component.toggleCategoryForm(mockCategories[0]);
    expect(component.showCategoryModal).toBeTrue();
    expect(component.selectedCategory).toEqual(mockCategories[0]);

    component.closeCategoryModal();
    expect(component.showCategoryModal).toBeFalse();
    expect(component.selectedCategory).toBeUndefined();
  });

  it('should reload categories on save success', () => {
    spyOn(component, 'loadCategories');
    component.onSaveSuccess();

    expect(component.showCategoryModal).toBeFalse();
    expect(component.loadCategories).toHaveBeenCalled();
  });

  it('should delete category when confirmed', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));
    categoryServiceSpy.deleteCategory.and.returnValue(Promise.resolve());

    void component.onDelete(mockCategories[0]);
    tick();

    expect(sweetAlertServiceSpy.confirm).toHaveBeenCalled();
    expect(categoryServiceSpy.deleteCategory).toHaveBeenCalledWith('c1');
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith('Eliminada', jasmine.any(String));
  }));

  it('should handle error when deleting category', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));
    categoryServiceSpy.deleteCategory.and.returnValue(Promise.reject(new Error('Delete err')));

    void component.onDelete(mockCategories[0]);
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error', jasmine.any(String));
  }));

  it('should not delete if confirmation is cancelled', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(false));

    void component.onDelete(mockCategories[0]);
    tick();

    expect(categoryServiceSpy.deleteCategory).not.toHaveBeenCalled();
  }));

  it('should handle error when loading categories', () => {
    categoryServiceSpy.getCategories.and.returnValue(throwError(() => new Error('Load error')));
    component.loadCategories();

    expect(component.isLoading()).toBeFalse();
  });

  it('should ignore invalid page numbers in goToPage()', () => {
    component.totalPages = 3;
    component.goToPage(0);
    expect(component.currentPageSubject.value).toBe(1);

    component.goToPage(999);
    expect(component.currentPageSubject.value).toBe(1);
  });

  it('should handle empty search results setting totalPages to 0 and correctedPage to 1', fakeAsync(() => {
    let result: Category[] = [];
    component.categories$.subscribe((cats) => (result = cats));

    component.onSearchChange('NONEXISTENT_CATEGORY');
    tick(300);

    expect(result.length).toBe(0);
    expect(component.totalCategories).toBe(0);
    expect(component.totalPages).toBe(0);
  }));

  it('should clamp correctedPage to totalPages when currentPage > totalPages', fakeAsync(() => {
    let result: Category[] = [];
    component.categories$.subscribe((cats) => (result = cats));

    component.onPageSizeChange(1); // totalPages = 2
    component.currentPageSubject.next(5); // 5 > 2
    tick(300);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('c2');
  }));
});
