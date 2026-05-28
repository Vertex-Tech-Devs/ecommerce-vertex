import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreConfigManagementComponent } from './store-config-management.component';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';

describe('StoreConfigManagementComponent', () => {
  let component: StoreConfigManagementComponent;
  let fixture: ComponentFixture<StoreConfigManagementComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storeConfigServiceSpy: any;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;

  const initialConfig = {
    storeName: 'Mi tienda',
    strapline: 'El mejor rubro',
    logoUrl: '',
    faviconUrl: '',
    contact: {
      email: 'owner@test.com',
      phone: '',
      whatsapp: '',
      address: '',
      instagram: '',
      facebook: '',
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
    },
    features: {
      reviewsEnabled: false,
      wishlistEnabled: false,
      blogEnabled: false,
    },
    payments: {
      mercadoPago: {
        publicKey: '',
        accessTokenSecret: '',
        accessTokenMasked: '',
        accountEmail: '',
        accountUserId: '',
        webhookUrl: '',
        validationStatus: 'pending',
        validationMessage: '',
      },
    },
    currency: 'ARS',
    currencySymbol: '$',
    country: 'AR',
  };

  beforeEach(async () => {
    const configSignal = jasmine.createSpy('config').and.returnValue(initialConfig);
    storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', [
      'saveConfig',
      'upsertMercadoPagoCredentials',
    ]);
    storeConfigServiceSpy.config = configSignal;

    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [StoreConfigManagementComponent, ReactiveFormsModule],
      providers: [
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreConfigManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect missing public key when token is stored but public key is empty', () => {
    component.form.patchValue({
      payments: {
        mercadoPago: {
          accessTokenMasked: 'TEST-12345678-****-1234',
          publicKey: '',
        },
      },
    });
    expect(component.missingPublicKey).toBeTrue();
  });

  it('should NOT detect missing public key when public key is present', () => {
    component.form.patchValue({
      payments: {
        mercadoPago: {
          accessTokenMasked: 'TEST-12345678-****-1234',
          publicKey: 'APP_USR-1234-5678',
        },
      },
    });
    expect(component.missingPublicKey).toBeFalse();
  });

  it('should show error and prevent save on submit if payments token exists but public key is missing', async () => {
    component.form.patchValue({
      payments: {
        mercadoPago: {
          accessTokenSecret: 'mp-access-token',
          publicKey: '',
        },
      },
    });

    await component.onSubmit();

    expect(sweetAlertSpy.error).toHaveBeenCalledWith('Public Key requerida', jasmine.any(String));
    expect(storeConfigServiceSpy.saveConfig).not.toHaveBeenCalled();
  });

  it('should validate currency field with standard list regex pattern', () => {
    const control = component.form.get('currency');
    control?.setValue('USD');
    expect(control?.valid).toBeTrue();

    control?.setValue('ARS');
    expect(control?.valid).toBeTrue();

    control?.setValue('XYZ');
    expect(control?.valid).toBeFalse();
  });
});
