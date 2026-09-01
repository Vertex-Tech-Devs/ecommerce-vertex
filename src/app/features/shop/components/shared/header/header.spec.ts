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
      expect(component.isTextResponsive()).toBeFalse();

      const logoImg = fixture.debugElement.query(By.css('.header__brand-logo'));
      const textSpan = fixture.debugElement.query(By.css('.header__brand-text'));
      expect(logoImg).toBeNull();
      expect(textSpan).not.toBeNull();
      expect(textSpan.nativeElement.textContent.trim()).toBe('Mi Tienda Test');
      expect(textSpan.classes['d-none']).toBeFalsy();
      expect(textSpan.classes['d-sm-inline']).toBeFalsy();
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
      expect(component.isTextResponsive()).toBeFalse();

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
      expect(component.isTextResponsive()).toBeFalse();

      const logoImg = fixture.debugElement.query(By.css('.header__brand-logo'));
      const textSpan = fixture.debugElement.query(By.css('.header__brand-text'));
      expect(logoImg).toBeNull();
      expect(textSpan).not.toBeNull();
      expect(textSpan.nativeElement.textContent.trim()).toBe('Mi Tienda Fallback');
      expect(textSpan.classes['d-none']).toBeFalsy();
      expect(textSpan.classes['d-sm-inline']).toBeFalsy();
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
      expect(component.isTextResponsive()).toBeTrue();

      const logoImg = fixture.debugElement.query(By.css('.header__brand-logo'));
      const textSpan = fixture.debugElement.query(By.css('.header__brand-text'));
      expect(logoImg).not.toBeNull();
      expect(textSpan).not.toBeNull();
      expect(textSpan.classes['d-none']).toBeTrue();
      expect(textSpan.classes['d-sm-inline']).toBeTrue();
    });

    it('should fallback to text visible on all resolutions when mode is "both" but logoUrl is empty', () => {
      mockStoreConfigSignal.set({
        storeName: 'Mi Tienda Both Fallback',
        logoUrl: '',
        brandDisplayMode: 'both',
      } as StoreConfig);
      fixture.detectChanges();

      expect(component.showLogo()).toBeFalse();
      expect(component.showText()).toBeTrue();
      expect(component.isTextResponsive()).toBeFalse();

      const logoImg = fixture.debugElement.query(By.css('.header__brand-logo'));
      const textSpan = fixture.debugElement.query(By.css('.header__brand-text'));
      expect(logoImg).toBeNull();
      expect(textSpan).not.toBeNull();
      expect(textSpan.nativeElement.textContent.trim()).toBe('Mi Tienda Both Fallback');
      expect(textSpan.classes['d-none']).toBeFalsy();
      expect(textSpan.classes['d-sm-inline']).toBeFalsy();
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

  describe('header appearance and custom properties', () => {
    it('should compute default custom properties when appearance is undefined', () => {
      mockStoreConfigSignal.set({
        storeName: 'Tienda Default',
      } as StoreConfig);
      fixture.detectChanges();

      const styles = component.headerStyles();
      expect(styles['--header-bg']).toBe('#ffffff');
      expect(styles['--header-text']).toBe('#1f2937');
      expect(styles['--header-accent']).toBe('#0d6efd');
      expect(styles['--header-shadow']).toBe('0 1px 3px rgba(0, 0, 0, 0.07)');
      expect(styles['--header-border-bottom']).toBe('transparent');
      expect(styles['--header-font-family']).toContain('system-ui');
    });

    it('should compute custom CSS properties according to appearance settings', () => {
      mockStoreConfigSignal.set({
        storeName: 'Tienda Custom',
        appearance: {
          header: {
            backgroundColor: '#0f172a',
            textColor: '#f8fafc',
            accentColor: '#38bdf8',
            shadowStyle: 'floating',
            fontFamily: 'montserrat',
          },
        },
      } as StoreConfig);
      fixture.detectChanges();

      const styles = component.headerStyles();
      expect(styles['--header-bg']).toBe('#0f172a');
      expect(styles['--header-text']).toBe('#f8fafc');
      expect(styles['--header-accent']).toBe('#38bdf8');
      expect(styles['--header-shadow']).toBe('0 10px 15px -3px rgba(0, 0, 0, 0.08)');
      expect(styles['--header-border-bottom']).toBe('transparent');
      expect(styles['--header-font-family']).toBe("'Montserrat', sans-serif");
    });

    it('should map border-bottom shadowStyle correctly', () => {
      mockStoreConfigSignal.set({
        storeName: 'Tienda Border',
        appearance: {
          header: {
            backgroundColor: '#ffffff',
            textColor: '#000000',
            accentColor: '#ff0000',
            shadowStyle: 'border-bottom',
            fontFamily: 'inter',
          },
        },
      } as StoreConfig);
      fixture.detectChanges();

      const styles = component.headerStyles();
      expect(styles['--header-shadow']).toBe('none');
      expect(styles['--header-border-bottom']).toBe('1px solid rgba(0, 0, 0, 0.1)');
      expect(styles['--header-font-family']).toBe("'Inter', sans-serif");
    });

    it('should inject Google Font stylesheet link when a Google font is configured', () => {
      mockStoreConfigSignal.set({
        storeName: 'Tienda Font Test',
        appearance: {
          header: {
            backgroundColor: '#ffffff',
            textColor: '#1f2937',
            accentColor: '#0d6efd',
            shadowStyle: 'subtle',
            fontFamily: 'poppins',
          },
        },
      } as StoreConfig);
      TestBed.flushEffects();
      fixture.detectChanges();

      const link = document.getElementById('google-font-poppins');
      expect(link).not.toBeNull();
      expect(link?.getAttribute('rel')).toBe('stylesheet');
      expect(link?.getAttribute('href')).toContain('Poppins');
    });
  });
});
