import type { WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Footer } from './footer';
import { StoreConfigService } from '@core/services/store-config.service';
import { FooterService } from '@core/services/footer.service';
import type { StoreConfig } from '@core/models/store-config.model';
import type { FooterData } from '@core/models/footer.model';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let footerServiceSpy: jasmine.SpyObj<FooterService>;
  let mockStoreConfigSignal: WritableSignal<StoreConfig | null>;

  const mockConfig: StoreConfig = {
    storeName: 'Mi Tienda',
    contactPhone: '11223344',
    contactEmail: 'info@mitienda.com',
    socialInstagramUrl: 'https://instagram.com/mitienda',
    socialFacebookUrl: 'https://facebook.com/mitienda',
    socialWhatsAppUrl: 'https://wa.me/11223344',
    copyrightText: 'Copyright 2026 Mi Tienda',
    contact: {
      phone: '999999',
      email: 'contact@mitienda.com',
      whatsApp: '999999',
      instagram: 'https://instagram.com/contact',
      facebook: 'https://facebook.com/contact',
    },
  } as unknown as StoreConfig;

  const mockFooterData: FooterData = {
    contactPhone: '555-FOOTER-PHONE',
    contactEmail: 'footer@mitienda.com',
    socialInstagramUrl: 'https://instagram.com/footer',
    socialFacebookUrl: 'https://facebook.com/footer',
    socialWhatsAppUrl: 'https://wa.me/footer',
    copyrightText: 'Copyright Footer Data',
  } as unknown as FooterData;

  beforeEach(async () => {
    mockStoreConfigSignal = signal<StoreConfig | null>(mockConfig);
    const storeConfigSpy = jasmine.createSpyObj('StoreConfigService', [], {
      storeConfig: mockStoreConfigSignal,
    });

    footerServiceSpy = jasmine.createSpyObj('FooterService', ['getFooterData']);
    footerServiceSpy.getFooterData.and.returnValue(of(mockFooterData));

    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [
        { provide: StoreConfigService, useValue: storeConfigSpy },
        { provide: FooterService, useValue: footerServiceSpy },
      ],
    }).compileComponents();
  });

  function setupComponent(): void {
    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create the component', () => {
    setupComponent();
    expect(component).toBeTruthy();
    expect(component.currentYear).toBe(new Date().getFullYear());
    expect(component.storeVersion).toMatch(/^v\d+\.\d+\.\d+/);
  });

  it('should compute viewData prioritizing footerData when available', () => {
    setupComponent();
    const view = component.viewData();
    expect(view.contactPhone).toBe('555-FOOTER-PHONE');
    expect(view.contactEmail).toBe('footer@mitienda.com');
    expect(view.socialInstagramUrl).toBe('https://instagram.com/footer');
    expect(view.socialFacebookUrl).toBe('https://facebook.com/footer');
    expect(view.socialWhatsAppUrl).toBe('https://wa.me/footer');
    expect(view.copyrightText).toBe('Copyright Footer Data');
  });

  it('should fallback to storeConfig properties when footerData values are missing', () => {
    footerServiceSpy.getFooterData.and.returnValue(of({} as FooterData));
    setupComponent();

    const view = component.viewData();
    expect(view.contactPhone).toBe('11223344');
    expect(view.contactEmail).toBe('info@mitienda.com');
    expect(view.socialInstagramUrl).toBe('https://instagram.com/mitienda');
    expect(view.socialFacebookUrl).toBe('https://facebook.com/mitienda');
    expect(view.socialWhatsAppUrl).toBe('https://wa.me/11223344');
    expect(view.copyrightText).toBe('Copyright 2026 Mi Tienda');
  });

  it('should fallback to contact object and default copyright when storeConfig root properties are empty', () => {
    footerServiceSpy.getFooterData.and.returnValue(of(undefined));
    mockStoreConfigSignal.set({
      storeName: 'Tienda Test',
      contact: {
        phone: '12345',
        email: 'test@test.com',
        whatsApp: '12345',
        instagram: 'instatest',
        facebook: 'fbtest',
      },
    } as unknown as StoreConfig);

    setupComponent();

    const view = component.viewData();
    expect(view.contactPhone).toBe('12345');
    expect(view.contactEmail).toBe('test@test.com');
    expect(view.socialInstagramUrl).toBe('instatest');
    expect(view.socialFacebookUrl).toBe('fbtest');
    expect(view.socialWhatsAppUrl).toBe('12345');
    expect(view.copyrightText).toBe('Tienda Test. Todos los derechos reservados.');
  });

  it('should return default copyright text when storeName is empty', () => {
    footerServiceSpy.getFooterData.and.returnValue(of(undefined));
    mockStoreConfigSignal.set({ storeName: '' } as unknown as StoreConfig);

    setupComponent();

    const view = component.viewData();
    expect(view.copyrightText).toBe('Todos los derechos reservados.');
  });
});
