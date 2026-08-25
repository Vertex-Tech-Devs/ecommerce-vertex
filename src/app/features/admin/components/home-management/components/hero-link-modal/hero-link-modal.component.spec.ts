import { SimpleChange } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeroLinkModal } from './hero-link-modal';
import type { HeroImage } from '@core/models/home-content.model';
import type { Category } from '@core/models/category.model';
import type { Product } from '@core/models/product.model';

describe('HeroLinkModal', () => {
  let component: HeroLinkModal;
  let fixture: ComponentFixture<HeroLinkModal>;

  const mockHeroImage: HeroImage = {
    imageUrl: 'https://example.com/banner.jpg',
    linkType: 'product',
    linkId: 'p1',
  };

  const mockProducts: Product[] = [
    { id: 'p1', name: 'Producto 1', price: 100 } as Product,
    { id: 'p2', name: 'Producto 2', price: 200 } as Product,
  ];

  const mockCategories: Category[] = [{ id: 'c1', name: 'Categoria 1' } as Category];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroLinkModal],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroLinkModal);
    component = fixture.componentInstance;

    component.heroImage = mockHeroImage;
    component.filteredProducts = mockProducts;
    component.categories = mockCategories;

    fixture.detectChanges();
  });

  it('should create modal component', () => {
    expect(component).toBeTruthy();
  });

  describe('selectedProduct', () => {
    it('should find and return product matching heroImage.linkId', () => {
      expect(component.selectedProduct).toEqual(mockProducts[0]);
    });

    it('should return undefined if linkId is not set or not found', () => {
      component.heroImage = { ...mockHeroImage, linkId: undefined };
      expect(component.selectedProduct).toBeUndefined();

      component.heroImage = { ...mockHeroImage, linkId: 'non-existent' };
      expect(component.selectedProduct).toBeUndefined();
    });
  });

  describe('ngOnChanges', () => {
    it('should handle isVisible change to true when linkType is product', fakeAsync(() => {
      spyOn(component, 'focusSearchInput');
      component.isDropdownOpen = true;

      component.ngOnChanges({
        isVisible: new SimpleChange(false, true, true),
      });

      expect(component.isDropdownOpen).toBeFalse();
      expect(component.focusSearchInput).toHaveBeenCalled();
    }));
  });

  describe('onClose', () => {
    it('should reset dropdown state and emit close', () => {
      spyOn(component.close, 'emit');
      component.isDropdownOpen = true;

      component.onClose();

      expect(component.isDropdownOpen).toBeFalse();
      expect(component.close.emit).toHaveBeenCalled();
    });
  });

  describe('onTypeChange', () => {
    it('should emit updateType product and open dropdown', () => {
      spyOn(component.updateType, 'emit');
      spyOn(component, 'focusSearchInput');

      const mockEvent = { target: { value: 'product' } } as unknown as Event;
      component.onTypeChange(mockEvent);

      expect(component.updateType.emit).toHaveBeenCalledWith('product');
      expect(component.isDropdownOpen).toBeTrue();
      expect(component.focusSearchInput).toHaveBeenCalled();
    });

    it('should emit updateType none and close dropdown', () => {
      spyOn(component.updateType, 'emit');

      const mockEvent = { target: { value: 'none' } } as unknown as Event;
      component.onTypeChange(mockEvent);

      expect(component.updateType.emit).toHaveBeenCalledWith('none');
      expect(component.isDropdownOpen).toBeFalse();
    });
  });

  describe('onIdChange', () => {
    it('should emit updateId with selected value', () => {
      spyOn(component.updateId, 'emit');

      const mockEvent = { target: { value: 'c1' } } as unknown as Event;
      component.onIdChange(mockEvent);

      expect(component.updateId.emit).toHaveBeenCalledWith('c1');
    });
  });

  describe('onSearch', () => {
    it('should emit searchProduct term and open dropdown', () => {
      spyOn(component.searchProduct, 'emit');

      const mockEvent = { target: { value: 'remera' } } as unknown as Event;
      component.onSearch(mockEvent);

      expect(component.searchProduct.emit).toHaveBeenCalledWith('remera');
      expect(component.isDropdownOpen).toBeTrue();
    });
  });

  describe('selectProduct', () => {
    it('should emit updateId, searchProduct, and close dropdown', () => {
      spyOn(component.updateId, 'emit');
      spyOn(component.searchProduct, 'emit');

      component.selectProduct(mockProducts[1]);

      expect(component.updateId.emit).toHaveBeenCalledWith('p2');
      expect(component.searchProduct.emit).toHaveBeenCalledWith('Producto 2');
      expect(component.isDropdownOpen).toBeFalse();
    });
  });

  describe('clearSelectedProduct', () => {
    it('should reset product selection, open dropdown, and focus input', () => {
      spyOn(component.updateId, 'emit');
      spyOn(component.searchProduct, 'emit');
      spyOn(component, 'focusSearchInput');

      component.clearSelectedProduct();

      expect(component.updateId.emit).toHaveBeenCalledWith('');
      expect(component.searchProduct.emit).toHaveBeenCalledWith('');
      expect(component.isDropdownOpen).toBeTrue();
      expect(component.focusSearchInput).toHaveBeenCalled();
    });
  });

  describe('focusSearchInput', () => {
    it('should focus element nativeElement after timeout', fakeAsync(() => {
      const focusSpy = jasmine.createSpy('focus');
      component.searchInput = {
        nativeElement: { focus: focusSpy } as unknown as HTMLInputElement,
      };

      component.focusSearchInput();
      tick();

      expect(focusSpy).toHaveBeenCalled();
    }));
  });
});
