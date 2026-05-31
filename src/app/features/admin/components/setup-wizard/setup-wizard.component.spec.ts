import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { SetupWizardComponent } from './setup-wizard.component';
import { StoreConfigService } from '@core/services/store-config.service';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { Firestore } from '@angular/fire/firestore';

describe('SetupWizardComponent', () => {
  let component: SetupWizardComponent;
  let fixture: ComponentFixture<SetupWizardComponent>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  beforeEach(async () => {
    storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', ['saveConfig']);
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['uploadFile']);
    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['success', 'error']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    firestoreSpy = jasmine.createSpyObj('Firestore', ['type']);

    // Mock signals
    const mockStoreNameSignal = signal<string>('Test Store');
    const mockLogoUrlSignal = signal<string>('http://example.com/logo.png');
    const mockIsFirstRunSignal = signal<boolean>(true);

    Object.defineProperty(storeConfigServiceSpy, 'storeName', {
      value: mockStoreNameSignal.asReadonly(),
    });
    Object.defineProperty(storeConfigServiceSpy, 'logoUrl', {
      value: mockLogoUrlSignal.asReadonly(),
    });
    Object.defineProperty(storeConfigServiceSpy, 'isFirstRun', {
      value: mockIsFirstRunSignal.asReadonly(),
    });

    storeConfigServiceSpy.saveConfig.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [SetupWizardComponent, ReactiveFormsModule],
      providers: [
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
        { provide: Router, useValue: routerSpy },
        { provide: Firestore, useValue: firestoreSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupWizardComponent);
    component = fixture.componentInstance;
    spyOn(component, 'preAuthorizeAdminLocal').and.returnValue(Promise.resolve());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start at step 1', () => {
    expect(component.step()).toBe(1);
  });

  it('should validate step 1 correctly', () => {
    expect(component.isStep1Valid()).toBeFalse();
    component.form.patchValue({ storeName: 'White-Label', tagline: 'My Eslogan' });
    expect(component.isStep1Valid()).toBeTrue();
  });

  it('should advance steps when valid', () => {
    component.form.patchValue({ storeName: 'White-Label', tagline: 'My Eslogan' });
    component.next();
    expect(component.step()).toBe(2);
  });

  it('should not advance if step 1 is invalid', () => {
    component.next();
    expect(component.step()).toBe(1);
  });

  it('should go back when prev is called', () => {
    component.form.patchValue({ storeName: 'White-Label', tagline: 'My Eslogan' });
    component.next();
    expect(component.step()).toBe(2);
    component.prev();
    expect(component.step()).toBe(1);
  });

  it('should toggle MP key visibility flag', () => {
    expect(component.showMpKey()).toBeFalse();
    component.toggleMpKeyVisibility();
    expect(component.showMpKey()).toBeTrue();
  });

  it('should upload logo image file', () => {
    const file = new File(['image content'], 'logo.png', { type: 'image/png' });
    const mockUpload = {
      progress$: of(50),
      downloadUrl$: of('http://example.com/logo-uploaded.png'),
    };
    storageServiceSpy.uploadFile.and.returnValue(mockUpload);

    const mockEvent = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    component.onLogoUpload(mockEvent);

    expect(storageServiceSpy.uploadFile).toHaveBeenCalledWith(file, 'store/branding');
    expect(component.form.get('logoUrl')?.value).toBe('http://example.com/logo-uploaded.png');
  });

  it('should finalize configuration and save config successfully', async () => {
    component.form.patchValue({
      storeName: 'White-Label Store',
      tagline: 'Premium Store',
      contact: {
        phone: '12345678',
        email: 'test@shop.com',
      },
      payments: {
        mercadoPagoPublicKey: 'TEST-KEY',
      },
      seo: {
        metaDescription: 'My Meta Desc',
      },
    });

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(
        new Response(JSON.stringify({ result: { success: true } }), {
          status: 200,
          statusText: 'OK',
        })
      )
    );

    await component.onFinish();
    expect(storeConfigServiceSpy.saveConfig).toHaveBeenCalled();
    expect(sweetAlertSpy.success).toHaveBeenCalled();
  });
});
