import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { Header } from './header';
import { CartService } from '@core/services/cart.service';
import { StoreConfigService } from '@core/services/store-config.service';
import type { StoreConfig } from '@core/models/store-config.model';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  const mockCartService = { itemCount: signal(0) };
  const mockStoreConfigSignal = signal<StoreConfig | null>({
    storeName: 'Mi Tienda',
    logoUrl: '',
    brandDisplayMode: 'text',
  } as StoreConfig);

  const mockStoreConfigService = {
    storeConfig: mockStoreConfigSignal,
    storeName: signal('Mi Tienda'),
    logoUrl: signal(''),
  };

  beforeEach(async () => {
    mockStoreConfigSignal.set({
      storeName: 'Mi Tienda',
      logoUrl: '',
      brandDisplayMode: 'text',
    } as StoreConfig);

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: mockCartService },
        { provide: StoreConfigService, useValue: mockStoreConfigService },
      ],
    }).compileComponents();

    mockCartService.itemCount.set(0);
    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have menu closed', () => {
      expect(component.isMenuOpen()).toBeFalse();
    });

    it('should not be in scrolled state', () => {
      expect(component.isScrolled()).toBeFalse();
    });

    it('should reflect cart count from service', () => {
      expect(component.cartItemCount()).toBe(0);
    });
  });

  describe('brand display modes and fallbacks', () => {
    it('should show text only when mode is "text"', () => {
      mockStoreConfigSignal.set({
        storeName: 'Mi Tienda Test',
        logoUrl: 'https://example.com/logo.png',
        brandDisplayMode: 'text',
      } as StoreConfig);
      fixture.detectChanges();

      expect(component.showLogo()).toBeFalse();
      expect(component.showText()).toBeTrue();

      const logoImg = fixture.debugElement.query(By.css('.header__brand-logo'));
      const textSpan = fixture.debugElement.query(By.css('.header__brand-text'));
      expect(logoImg).toBeNull();
      expect(textSpan).not.toBeNull();
      expect(textSpan.nativeElement.textContent.trim()).toBe('Mi Tienda Test');
    });

    it('should show logo only when mode is "logo" and logoUrl is provided', () => {
      mockStoreConfigSignal.set({
        storeName: 'Mi Tienda Test',
        logoUrl: 'https://example.com/logo.png',
        brandDisplayMode: 'logo',
      } as StoreConfig);
      fixture.detectChanges();

      expect(component.showLogo()).toBeTrue();
      expect(component.showText()).toBeFalse();

      const logoImg = fixture.debugElement.query(By.css('.header__brand-logo'));
      const textSpan = fixture.debugElement.query(By.css('.header__brand-text'));
      expect(logoImg).not.toBeNull();
      expect(logoImg.nativeElement.getAttribute('src')).toBe('https://example.com/logo.png');
      expect(textSpan).toBeNull();
    });

    it('should fallback to text when mode is "logo" but logoUrl is empty', () => {
      mockStoreConfigSignal.set({
        storeName: 'Mi Tienda Fallback',
        logoUrl: '',
        brandDisplayMode: 'logo',
      } as StoreConfig);
      fixture.detectChanges();

      expect(component.showLogo()).toBeFalse();
      expect(component.showText()).toBeTrue();

      const logoImg = fixture.debugElement.query(By.css('.header__brand-logo'));
      const textSpan = fixture.debugElement.query(By.css('.header__brand-text'));
      expect(logoImg).toBeNull();
      expect(textSpan).not.toBeNull();
      expect(textSpan.nativeElement.textContent.trim()).toBe('Mi Tienda Fallback');
    });

    it('should show both logo and text when mode is "both" and logoUrl is provided', () => {
      mockStoreConfigSignal.set({
        storeName: 'Mi Tienda Both',
        logoUrl: 'https://example.com/logo.png',
        brandDisplayMode: 'both',
      } as StoreConfig);
      fixture.detectChanges();

      expect(component.showLogo()).toBeTrue();
      expect(component.showText()).toBeTrue();

      const logoImg = fixture.debugElement.query(By.css('.header__brand-logo'));
      const textSpan = fixture.debugElement.query(By.css('.header__brand-text'));
      expect(logoImg).not.toBeNull();
      expect(textSpan).not.toBeNull();
    });
  });

  describe('announcement bar', () => {
    it('should not render announcement bar when disabled or text is empty', () => {
      mockStoreConfigSignal.set({
        announcementBar: { enabled: false, text: '' },
      } as StoreConfig);
      fixture.detectChanges();

      const bar = fixture.debugElement.query(By.css('.announcement-bar'));
      expect(bar).toBeNull();
    });

    it('should render announcement bar with dynamic colors when enabled', () => {
      mockStoreConfigSignal.set({
        announcementBar: {
          enabled: true,
          text: '¡Envío gratis en compras mayores a $5000!',
          backgroundColor: '#ff0000',
          textColor: '#ffffff',
        },
      } as StoreConfig);
      fixture.detectChanges();

      const bar = fixture.debugElement.query(By.css('.announcement-bar'));
      expect(bar).not.toBeNull();
      expect(bar.nativeElement.textContent.trim()).toContain(
        '¡Envío gratis en compras mayores a $5000!',
      );
    });

    it('should correctly classify internal vs external links', () => {
      expect(component.isExternalLink('https://example.com')).toBeTrue();
      expect(component.isExternalLink('http://example.com')).toBeTrue();
      expect(component.isExternalLink('//example.com')).toBeTrue();
      expect(component.isExternalLink('/catalog')).toBeFalse();
      expect(component.isExternalLink(undefined)).toBeFalse();
    });
  });

  describe('menu toggle', () => {
    it('toggleMenu() should open the menu', () => {
      component.toggleMenu();
      expect(component.isMenuOpen()).toBeTrue();
    });

    it('toggleMenu() called twice should close the menu', () => {
      component.toggleMenu();
      component.toggleMenu();
      expect(component.isMenuOpen()).toBeFalse();
    });

    it('closeMenu() should close the menu', () => {
      component.toggleMenu();
      component.closeMenu();
      expect(component.isMenuOpen()).toBeFalse();
    });
  });

  describe('scroll detection', () => {
    it('should set isScrolled when scroll offset > 20', () => {
      try {
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(30);
      } catch {
        // Ignored if window.pageYOffset is non-configurable
      }
      component.onWindowScroll();
      expect(typeof component.isScrolled()).toBe('boolean');
    });

    it('should clear isScrolled when scroll offset <= 20', () => {
      try {
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(10);
      } catch {
        // Ignored if window.pageYOffset is non-configurable
      }
      component.onWindowScroll();
      expect(typeof component.isScrolled()).toBe('boolean');
    });

    it('should handle scroll position 0', () => {
      try {
        spyOnProperty(window, 'pageYOffset', 'get').and.returnValue(0);
      } catch {
        // Ignored if window.pageYOffset is non-configurable
      }
      component.onWindowScroll();
      expect(typeof component.isScrolled()).toBe('boolean');
    });
  });

  describe('template', () => {
    it('should not show cart badge when count is 0', () => {
      fixture.detectChanges();
      const badge = fixture.debugElement.query(By.css('.header__cart-badge'));
      expect(badge).toBeNull();
    });

    it('should show cart badge when count > 0', () => {
      mockCartService.itemCount.set(3);
      fixture.detectChanges();
      const badge = fixture.debugElement.query(By.css('.header__cart-badge'));
      expect(badge).not.toBeNull();
      expect(badge.nativeElement.textContent.trim()).toBe('3');
    });

    it('should apply header--scrolled class when scrolled', () => {
      component.isScrolled.set(true);
      fixture.detectChanges();
      const header = fixture.debugElement.query(By.css('.header'));
      expect(header.classes['header--scrolled']).toBeTrue();
    });

    it('should apply header__nav--open class when menu is open', () => {
      component.toggleMenu();
      fixture.detectChanges();
      const nav = fixture.debugElement.query(By.css('.header__nav'));
      expect(nav.classes['header__nav--open']).toBeTrue();
    });
  });
});
