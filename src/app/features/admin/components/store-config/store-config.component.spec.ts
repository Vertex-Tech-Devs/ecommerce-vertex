import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import type { WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { StoreConfigComponent } from './store-config.component';
import { StoreConfigService } from '@core/services/store-config.service';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AuthService } from '@core/services/auth.service';
import type { StoreConfig } from '@core/models/store-config.model';

import { RouterTestingModule } from '@angular/router/testing';

describe('StoreConfigComponent', () => {
  let component: StoreConfigComponent;
  let fixture: ComponentFixture<StoreConfigComponent>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let mockConfigSignal: WritableSignal<StoreConfig | null>;

  const mockConfig: StoreConfig = {
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
    mockConfigSignal = signal<StoreConfig | null>(mockConfig);
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
      imports: [StoreConfigComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreConfigComponent);
    component = fixture.componentInstance;
    TestBed.flushEffects();
    fixture.detectChanges();
  });

  it('should initialize form with values from StoreConfigService', () => {
    expect(component.form.get('storeName')?.value).toBe('Test Store');
    expect(component.form.get('tagline')?.value).toBe('Test Tagline');
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
    expect(component.form.get('tagline')?.value).toBe('La mejor tienda online');
  });

  it('should use fallback values via effect when config is empty or missing properties', () => {
    mockConfigSignal.set({} as StoreConfig);
    TestBed.flushEffects();
    expect(component.form.get('storeName')?.value).toBe('Mi Tienda');
    expect(component.form.get('tagline')?.value).toBe('La mejor tienda online');
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
      expect(newGroup.get('schedule')?.value).toBe('');
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

      group.patchValue({ address: 'Calle Falsa 123', city: '' });
      expect(group.invalid).toBeTrue();

      group.patchValue({ city: 'Cordoba', schedule: '' });
      expect(group.invalid).toBeTrue();
    });
  });
});
