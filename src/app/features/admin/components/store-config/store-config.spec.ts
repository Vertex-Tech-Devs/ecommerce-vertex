import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import type { ElementRef, QueryList } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import type { FormGroup } from '@angular/forms';
import type { WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { StoreConfig } from './store-config';
import { StoreConfigService } from '@core/services/store-config.service';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AuthService } from '@core/services/auth.service';
import type { StoreConfig as StoreConfigModel } from '@core/models/store-config.model';

import { RouterTestingModule } from '@angular/router/testing';

describe('StoreConfig', () => {
  let component: StoreConfig;
  let fixture: ComponentFixture<StoreConfig>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let mockConfigSignal: WritableSignal<StoreConfigModel | null>;

  const mockConfig: StoreConfigModel = {
    tenantId: 'store',
    storeId: 'white-label-store',
    storeName: 'Test Store',
    tagline: 'Test Tagline',
    logoUrl: 'http://example.com/logo.png',
    faviconUrl: 'http://example.com/favicon.png',
    colors: {
      primary: '#ea580c',
      accent: '#ef4444',
      background: '#ffffff',
    },
    payments: {
      mercadoPagoPublicKey: 'TEST-PUBLIC-KEY',
    },
    contact: {
      phone: '+54 11 1234-5678',
      email: 'test@store.com',
      whatsApp: '+5491112345678',
      instagram: 'https://instagram.com/test',
      facebook: 'https://facebook.com/test',
    },
    seo: {
      metaDescription: 'Test SEO Description',
    },
    setupCompleted: true,
  };

  beforeEach(async () => {
    spyOn(console, 'error');
    spyOn(console, 'warn');
    storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', [
      'loadConfig',
      'saveConfig',
    ]);
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['uploadFile']);
    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['success', 'error']);
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      isOwner$: of(true),
    });

    // Mock signals
    mockConfigSignal = signal<StoreConfigModel | null>(mockConfig);
    const mockStoreNameSignal = signal<string>('Test Store');
    const mockLogoUrlSignal = signal<string>('http://example.com/logo.png');
    const mockIsFirstRunSignal = signal<boolean>(false);
    const mockIsLoadingSignal = signal<boolean>(false);

    Object.defineProperty(storeConfigServiceSpy, 'storeConfig', {
      value: mockConfigSignal.asReadonly(),
      configurable: true,
    });
    Object.defineProperty(storeConfigServiceSpy, 'storeName', {
      value: mockStoreNameSignal.asReadonly(),
      configurable: true,
    });
    Object.defineProperty(storeConfigServiceSpy, 'logoUrl', {
      value: mockLogoUrlSignal.asReadonly(),
      configurable: true,
    });
    Object.defineProperty(storeConfigServiceSpy, 'isFirstRun', {
      value: mockIsFirstRunSignal.asReadonly(),
      configurable: true,
    });
    Object.defineProperty(storeConfigServiceSpy, 'isLoading', {
      value: mockIsLoadingSignal.asReadonly(),
      configurable: true,
    });

    storeConfigServiceSpy.saveConfig.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [StoreConfig, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreConfig);
    component = fixture.componentInstance;
    TestBed.flushEffects();
    fixture.detectChanges();
  });

  it('should initialize form with values from StoreConfigService', () => {
    expect(component.form.get('storeName')?.value).toBe('Test Store');
    expect(component.form.get('colors.primary')?.value).toBe('#ea580c');
    expect(component.form.get('payments.mercadoPagoPublicKey')?.value).toBe('TEST-PUBLIC-KEY');
    expect(component.form.get('contact.email')?.value).toBe('test@store.com');
  });

  it('should show error alert if form is invalid on submit', async () => {
    component.form.patchValue({ storeName: '' }); // Invalid
    await component.onSubmit();
    expect(sweetAlertSpy.error).toHaveBeenCalled();
    expect(storeConfigServiceSpy.saveConfig).not.toHaveBeenCalled();
  });

  it('should call saveConfig and show success alert on valid submit', async () => {
    component.form.markAsDirty();
    await component.onSubmit();
    expect(storeConfigServiceSpy.saveConfig).toHaveBeenCalled();
    expect(sweetAlertSpy.success).toHaveBeenCalled();
  });

  it('should handle successful favicon upload', () => {
    const file = new File([''], 'favicon.png', { type: 'image/png' });
    const event = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    const mockUpload = {
      progress$: of(50, 100),
      downloadUrl$: of('http://example.com/new-favicon.png'),
    };
    storageServiceSpy.uploadFile.and.returnValue(
      mockUpload as unknown as ReturnType<StorageService['uploadFile']>,
    );

    component.onFaviconUpload(event);

    expect(storageServiceSpy.uploadFile).toHaveBeenCalledWith(file, jasmine.any(String));
    expect(component.form.get('faviconUrl')?.value).toBe('http://example.com/new-favicon.png');
    expect(component.form.get('faviconUrl')?.dirty).toBeTrue();
    expect(component.form.dirty).toBeTrue();
    expect(component.faviconUploading()).toBeFalse();
    expect(sweetAlertSpy.success).toHaveBeenCalled();
  });

  it('should handle failed favicon upload', () => {
    const file = new File([''], 'favicon.png', { type: 'image/png' });
    const event = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    const mockUpload = {
      progress$: of(50),
      downloadUrl$: throwError(() => new Error('Upload error')),
    };
    storageServiceSpy.uploadFile.and.returnValue(
      mockUpload as unknown as ReturnType<StorageService['uploadFile']>,
    );

    component.onFaviconUpload(event);

    expect(component.faviconUploading()).toBeFalse();
    expect(sweetAlertSpy.error).toHaveBeenCalled();
  });

  it('should initialize form with defaults via effect when config is null', () => {
    mockConfigSignal.set(null);
    TestBed.flushEffects();
    expect(component.form.get('storeName')?.value).toBe('Mi Tienda');
  });

  it('should use fallback values via effect when config is empty or missing properties', () => {
    mockConfigSignal.set({} as StoreConfigModel);
    TestBed.flushEffects();
    expect(component.form.get('storeName')?.value).toBe('Mi Tienda');
    expect(component.form.get('colors.primary')?.value).toBe('#ea580c');
    expect(component.form.get('contact.phone')?.value).toBe('+54 11 1234-5678');
    expect(component.form.get('contact.email')?.value).toBe('contacto@mitienda.com');
  });

  it('should return early onFaviconUpload if no files are selected', () => {
    const event = {
      target: {
        files: [],
      },
    } as unknown as Event;

    storageServiceSpy.uploadFile.calls.reset();
    component.onFaviconUpload(event);
    expect(storageServiceSpy.uploadFile).not.toHaveBeenCalled();
  });

  it('should handle saveConfig error on submit', async () => {
    storeConfigServiceSpy.saveConfig.and.returnValue(Promise.reject(new Error('Save error')));
    component.form.markAsDirty();

    await component.onSubmit();

    expect(sweetAlertSpy.error).toHaveBeenCalledWith(
      'Error',
      'No se pudo guardar la configuración de la tienda.',
    );
    expect(component.isSubmitting()).toBeFalse();
  });

  describe('deliveryMethods and pickup locations', () => {
    it('should initialize deliveryMethods FormGroup with default values', () => {
      const deliveryGroup = component.deliveryMethodsGroup;
      expect(deliveryGroup).toBeTruthy();
      expect(deliveryGroup.get('enableHomeDelivery')?.value).toBeTrue();
      expect(deliveryGroup.get('enableStorePickup')?.value).toBeFalse();
      expect(deliveryGroup.get('homeDeliveryDescription')?.value).toBe(
        'Coordinamos el envío y costo por WhatsApp',
      );
      expect(component.pickupLocationsArray).toBeTruthy();
    });

    it('should add a new pickup location group with enabled: true and required fields when calling addPickupLocation()', () => {
      const initialCount = component.pickupLocationsArray.length;
      component.addPickupLocation();

      expect(component.pickupLocationsArray.length).toBe(initialCount + 1);
      const newGroup = component.pickupLocationsArray.at(component.pickupLocationsArray.length - 1);
      expect(newGroup.get('enabled')?.value).toBeTrue();
      expect(newGroup.get('name')?.value).toBe('');
      expect(newGroup.get('address')?.value).toBe('');
      expect(newGroup.get('city')?.value).toBe('');
      expect(newGroup.get('schedule')?.value).toContain('Lun');
      expect(newGroup.invalid).toBeTrue();
    });

    it('should remove pickup location from array when calling removePickupLocation(index)', () => {
      component.addPickupLocation();
      const countBefore = component.pickupLocationsArray.length;
      expect(countBefore).toBeGreaterThan(0);

      component.removePickupLocation(0);
      expect(component.pickupLocationsArray.length).toBe(countBefore - 1);
    });

    it('should toggle enabled status when calling togglePickupLocationStatus(index)', () => {
      component.addPickupLocation();
      const lastIndex = component.pickupLocationsArray.length - 1;
      const group = component.pickupLocationsArray.at(lastIndex);

      expect(group.get('enabled')?.value).toBeTrue();
      component.togglePickupLocationStatus(lastIndex);
      expect(group.get('enabled')?.value).toBeFalse();

      component.togglePickupLocationStatus(lastIndex);
      expect(group.get('enabled')?.value).toBeTrue();
    });

    it('should invalidate pickup location form group if required fields (name, address, city, schedule) are empty', () => {
      component.addPickupLocation();
      const lastIndex = component.pickupLocationsArray.length - 1;
      const group = component.pickupLocationsArray.at(lastIndex);

      expect(group.invalid).toBeTrue();

      group.patchValue({
        name: 'Sucursal Test',
        address: 'Calle Falsa 123',
        city: 'Cordoba',
        schedule: '9-18',
      });
      expect(group.valid).toBeTrue();

      group.patchValue({ name: '' });
      expect(group.invalid).toBeTrue();

      group.patchValue({ name: 'Sucursal Test', address: '' });
      expect(group.invalid).toBeTrue();

      group.patchValue({ city: 'Cordoba', schedule: '' });
      expect(group.invalid).toBeTrue();
    });

    it('should toggle days and update schedule in pickup location group', () => {
      component.addPickupLocation();
      const index = component.pickupLocationsArray.length - 1;

      expect(component.isDaySelected(index, 'Sáb')).toBeFalse();
      component.toggleDay(index, 'Sáb');

      expect(component.isDaySelected(index, 'Sáb')).toBeTrue();

      component.toggleDay(index, 'Sáb');
      expect(component.isDaySelected(index, 'Sáb')).toBeFalse();
    });

    it('should format schedule with split time when hasSplitSchedule is true', () => {
      const formatted = component.formatSchedule(
        ['Lun', 'Mar'],
        '09:00',
        '13:00',
        true,
        '16:00',
        '20:00',
      );
      expect(formatted).toBe('Lun, Mar: 09:00 a 13:00 y 16:00 a 20:00 hs');
    });

    it('should focus locationNameInput after addPickupLocation timeout', fakeAsync(() => {
      const focusSpy = jasmine.createSpy('focus');
      component.locationNameInputs = {
        last: { nativeElement: { focus: focusSpy } } as ElementRef,
      } as unknown as QueryList<ElementRef>;

      component.addPickupLocation();
      tick(50);

      expect(focusSpy).toHaveBeenCalled();
    }));

    it('should safely handle syncSchedule or togglePickupLocationStatus with invalid index', () => {
      expect(() => component.syncSchedule(999)).not.toThrow();
      expect(() => component.toggleDay(999, 'Lun')).not.toThrow();
      expect(() => component.togglePickupLocationStatus(999)).not.toThrow();
    });

    it('should populate form when storeConfig has existing pickupLocations', () => {
      mockConfigSignal.set({
        ...mockConfig,
        deliveryMethods: {
          enableHomeDelivery: true,
          enableStorePickup: true,
          pickupLocations: [
            {
              id: 'loc-existing-1',
              name: 'Sucursal Existente',
              address: 'Av 1',
              city: 'CABA',
              schedule: 'Lun a Vie 9-18',
              enabled: true,
            },
          ],
        },
      });

      TestBed.flushEffects();
      fixture.detectChanges();

      expect(component.pickupLocationsArray.length).toBe(1);
      expect(component.pickupLocationsArray.at(0).get('name')?.value).toBe('Sucursal Existente');
    });
  });

  describe('Branding and Favicon removal', () => {
    it('removeFavicon() should clear faviconUrl control and mark dirty', () => {
      component.form.patchValue({ faviconUrl: 'http://example.com/fav.ico' });
      component.removeFavicon();

      expect(component.form.get('faviconUrl')?.value).toBe('');
      expect(component.form.get('faviconUrl')?.dirty).toBeTrue();
      expect(component.form.dirty).toBeTrue();
    });

    it('onFaviconUpload() should show error alert when file type is invalid', () => {
      const file = new File(['hello'], 'document.txt', { type: 'text/plain' });
      const event = {
        target: {
          files: [file],
        },
      } as unknown as Event;

      component.onFaviconUpload(event);

      expect(sweetAlertSpy.error).toHaveBeenCalledWith(
        'Formato no válido',
        'Selecciona un archivo válido (.ico, .png, .svg, .jpg).',
      );
      expect(storageServiceSpy.uploadFile).not.toHaveBeenCalled();
    });
  });

  describe('Brand Logo, Display Mode, Announcement Bar & Floating WhatsApp', () => {
    it('should initialize form with brandDisplayMode, announcementBar, and floatingWhatsApp defaults', () => {
      expect(component.form.get('brandDisplayMode')?.value).toBe('text');
      expect(component.form.get('announcementBar.enabled')?.value).toBeFalse();
      expect(component.form.get('announcementBar.backgroundColor')?.value).toBe('#111827');
      expect(component.form.get('announcementBar.textColor')?.value).toBe('#ffffff');
      expect(component.form.get('floatingWhatsApp.enabled')?.value).toBeFalse();
      expect(component.form.get('floatingWhatsApp.defaultMessage')?.value).toBe(
        '¡Hola! Tengo una consulta sobre un producto de la tienda',
      );
    });

    it('removeLogo() should clear logoUrl control and mark dirty', () => {
      component.form.patchValue({ logoUrl: 'http://example.com/logo.png' });
      component.removeLogo();

      expect(component.form.get('logoUrl')?.value).toBe('');
      expect(component.form.get('logoUrl')?.dirty).toBeTrue();
      expect(component.form.dirty).toBeTrue();
    });

    it('onLogoUpload() should return early if no file is selected', () => {
      const event = { target: { files: [] } } as unknown as Event;
      storageServiceSpy.uploadFile.calls.reset();
      component.onLogoUpload(event);
      expect(storageServiceSpy.uploadFile).not.toHaveBeenCalled();
    });

    it('onLogoUpload() should show error alert when file format is invalid', () => {
      const file = new File([''], 'doc.pdf', { type: 'application/pdf' });
      const event = { target: { files: [file] } } as unknown as Event;

      component.onLogoUpload(event);

      expect(sweetAlertSpy.error).toHaveBeenCalledWith(
        'Formato no válido',
        'Selecciona una imagen válida (.png, .svg, .jpg, .webp).',
      );
      expect(storageServiceSpy.uploadFile).not.toHaveBeenCalled();
    });

    it('onLogoUpload() should handle successful logo upload to stores/{tenantId}/branding/logo.{ext}', () => {
      const file = new File(['image'], 'logo.webp', { type: 'image/webp' });
      const event = { target: { files: [file] } } as unknown as Event;

      const mockUpload = {
        progress$: of(50, 100),
        downloadUrl$: of('http://example.com/new-logo.webp'),
      };
      storageServiceSpy.uploadFile.and.returnValue(
        mockUpload as unknown as ReturnType<StorageService['uploadFile']>,
      );

      component.onLogoUpload(event);

      expect(storageServiceSpy.uploadFile).toHaveBeenCalledWith(
        file,
        jasmine.stringMatching(/stores\/.*\/branding\/logo\.webp/),
      );
      expect(component.form.get('logoUrl')?.value).toBe('http://example.com/new-logo.webp');
      expect(component.form.get('logoUrl')?.dirty).toBeTrue();
      expect(component.isUploadingLogo()).toBeFalse();
      expect(sweetAlertSpy.success).toHaveBeenCalledWith(
        'Logotipo subido',
        'El logotipo de marca fue cargado exitosamente.',
      );
    });

    it('onLogoUpload() should handle upload failure gracefully', () => {
      const file = new File(['image'], 'logo.png', { type: 'image/png' });
      const event = { target: { files: [file] } } as unknown as Event;

      const mockUpload = {
        progress$: of(10),
        downloadUrl$: throwError(() => new Error('Upload error')),
      };
      storageServiceSpy.uploadFile.and.returnValue(
        mockUpload as unknown as ReturnType<StorageService['uploadFile']>,
      );

      component.onLogoUpload(event);

      expect(component.isUploadingLogo()).toBeFalse();
      expect(sweetAlertSpy.error).toHaveBeenCalledWith(
        'Error de subida',
        'No se pudo cargar el logotipo de marca.',
      );
    });

    it('should set text validator on announcementBar when enabled changes to true', () => {
      const announcementGroup = component.form.get('announcementBar') as FormGroup;
      const enabledCtrl = announcementGroup.get('enabled');
      const textCtrl = announcementGroup.get('text');

      expect(textCtrl?.valid).toBeTrue();

      enabledCtrl?.setValue(true);
      expect(textCtrl?.valid).toBeFalse();

      textCtrl?.setValue('¡Gran oferta!');
      expect(textCtrl?.valid).toBeTrue();

      enabledCtrl?.setValue(false);
      textCtrl?.setValue('');
      expect(textCtrl?.valid).toBeTrue();
    });

    it('should set phoneNumber validator on floatingWhatsApp when enabled changes to true', () => {
      const floatingGroup = component.form.get('floatingWhatsApp') as FormGroup;
      const enabledCtrl = floatingGroup.get('enabled');
      const phoneCtrl = floatingGroup.get('phoneNumber');

      expect(phoneCtrl?.valid).toBeTrue();

      enabledCtrl?.setValue(true);
      expect(phoneCtrl?.valid).toBeFalse();

      phoneCtrl?.setValue('5492611234567');
      expect(phoneCtrl?.valid).toBeTrue();

      enabledCtrl?.setValue(false);
      phoneCtrl?.setValue('');
      expect(phoneCtrl?.valid).toBeTrue();
    });

    it('should be invalid on submit if floatingWhatsApp is enabled and phoneNumber is empty', async () => {
      const floatingGroup = component.form.get('floatingWhatsApp') as FormGroup;
      floatingGroup.get('enabled')?.setValue(true);
      floatingGroup.get('phoneNumber')?.setValue('');

      await component.onSubmit();

      expect(component.form.invalid).toBeTrue();
      expect(sweetAlertSpy.error).toHaveBeenCalled();
      expect(storeConfigServiceSpy.saveConfig).not.toHaveBeenCalled();
    });

    it('should populate form when config contains announcementBar, floatingWhatsApp, and brandDisplayMode', () => {
      mockConfigSignal.set({
        ...mockConfig,
        brandDisplayMode: 'both',
        announcementBar: {
          enabled: true,
          text: 'Promo de Verano',
          link: '/summer-sale',
          backgroundColor: '#ff0000',
          textColor: '#ffffff',
        },
        floatingWhatsApp: {
          enabled: true,
          phoneNumber: '+5491199998888',
          defaultMessage: 'Hola tienda!',
        },
      });

      TestBed.flushEffects();
      fixture.detectChanges();

      expect(component.form.get('brandDisplayMode')?.value).toBe('both');
      expect(component.form.get('announcementBar.enabled')?.value).toBeTrue();
      expect(component.form.get('announcementBar.text')?.value).toBe('Promo de Verano');
      expect(component.form.get('announcementBar.link')?.value).toBe('/summer-sale');
      expect(component.form.get('announcementBar.backgroundColor')?.value).toBe('#ff0000');
      expect(component.form.get('floatingWhatsApp.enabled')?.value).toBeTrue();
      expect(component.form.get('floatingWhatsApp.phoneNumber')?.value).toBe('+5491199998888');
      expect(component.form.get('floatingWhatsApp.defaultMessage')?.value).toBe('Hola tienda!');
    });

    it('should initialize appearance form controls with fallback defaults when config has no appearance', () => {
      mockConfigSignal.set({
        ...mockConfig,
        appearance: undefined,
      });

      TestBed.flushEffects();
      fixture.detectChanges();

      expect(component.form.get('appearance.header.backgroundColor')?.value).toBe('#ffffff');
      expect(component.form.get('appearance.header.textColor')?.value).toBe('#1f2937');
      expect(component.form.get('appearance.header.accentColor')?.value).toBe('#0d6efd');
      expect(component.form.get('appearance.header.fontFamily')?.value).toBe('system');
    });

    it('should initialize appearance form controls from service when config provides appearance', () => {
      mockConfigSignal.set({
        ...mockConfig,
        appearance: {
          header: {
            backgroundColor: '#111827',
            textColor: '#f9fafb',
            accentColor: '#10b981',
            fontFamily: 'montserrat',
          },
        },
      });

      TestBed.flushEffects();
      fixture.detectChanges();

      expect(component.form.get('appearance.header.backgroundColor')?.value).toBe('#111827');
      expect(component.form.get('appearance.header.textColor')?.value).toBe('#f9fafb');
      expect(component.form.get('appearance.header.accentColor')?.value).toBe('#10b981');
      expect(component.form.get('appearance.header.fontFamily')?.value).toBe('montserrat');
    });

    it('should reactively update live preview styles when appearance form values change', () => {
      component.form.patchValue({
        appearance: {
          header: {
            backgroundColor: '#000000',
            textColor: '#ffffff',
            accentColor: '#ff0055',
            fontFamily: 'poppins',
          },
        },
      });
      fixture.detectChanges();

      const styles = component.liveHeaderStyles();
      expect(styles['--header-bg']).toBe('#000000');
      expect(styles['--header-text']).toBe('#ffffff');
      expect(styles['--header-accent']).toBe('#ff0055');
      expect(styles['--header-font-family']).toBe("'Poppins', sans-serif");
    });

    it('selectFontPreset should update fontFamily and mark form dirty', () => {
      expect(component.form.dirty).toBeFalse();
      component.selectFontPreset('space-grotesk');
      expect(component.form.get('appearance.header.fontFamily')?.value).toBe('space-grotesk');
      expect(component.form.dirty).toBeTrue();
    });

    it('selectFontPreset should support cursive and disruptive presets', () => {
      component.selectFontPreset('dancing-script');
      expect(component.form.get('appearance.header.fontFamily')?.value).toBe('dancing-script');

      component.selectFontPreset('bebas-neue');
      expect(component.form.get('appearance.header.fontFamily')?.value).toBe('bebas-neue');
    });
  });
});
