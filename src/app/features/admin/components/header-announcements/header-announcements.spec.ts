import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import type { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import type { WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { HeaderAnnouncements } from './header-announcements';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { StoreConfig as StoreConfigModel } from '@core/models/store-config.model';
import { RouterTestingModule } from '@angular/router/testing';
import {
  createAnnouncementItemForm,
  createHeaderAnnouncementsForm,
} from './header-announcements.form';

describe('HeaderAnnouncements', () => {
  let component: HeaderAnnouncements;
  let fixture: ComponentFixture<HeaderAnnouncements>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;
  let mockConfigSignal: WritableSignal<StoreConfigModel | null>;
  let mockIsLoadingSignal: WritableSignal<boolean>;

  const mockConfig: StoreConfigModel = {
    tenantId: 'test-tenant',
    storeId: 'white-label-store',
    storeName: 'Tienda Test',
    tagline: 'Eslogan Test',
    logoUrl: 'https://test.com/logo.png',
    faviconUrl: 'https://test.com/favicon.ico',
    brandDisplayMode: 'both',
    appearance: {
      header: {
        backgroundColor: '#112233',
        textColor: '#ffffff',
        accentColor: '#10b981',
        fontFamily: 'montserrat',
        shadowStyle: 'subtle',
      },
    },
    announcementBar: {
      enabled: true,
      text: 'Envío gratis a todo el país',
      link: '/ofertas',
      backgroundColor: '#000000',
      textColor: '#ffffff',
    },
    floatingWhatsApp: {
      enabled: true,
      phoneNumber: '5492619876543',
      defaultMessage: 'Hola, quiero consultar por un producto',
    },
    colors: {
      primary: '#ea580c',
      accent: '#ef4444',
      background: '#ffffff',
    },
    payments: { mercadoPagoPublicKey: '' },
    contact: {
      phone: '',
      email: '',
      whatsApp: '',
      instagram: '',
      facebook: '',
    },
    seo: { metaDescription: '' },
    setupCompleted: true,
  };

  beforeEach(async () => {
    spyOn(console, 'error');
    spyOn(console, 'warn');

    storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', [
      'loadConfig',
      'updateHeaderAndAnnouncements',
    ]);
    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['success', 'error']);

    mockConfigSignal = signal<StoreConfigModel | null>(mockConfig);
    mockIsLoadingSignal = signal<boolean>(false);

    Object.defineProperty(storeConfigServiceSpy, 'storeConfig', {
      value: mockConfigSignal.asReadonly(),
      configurable: true,
    });
    Object.defineProperty(storeConfigServiceSpy, 'isLoading', {
      value: mockIsLoadingSignal.asReadonly(),
      configurable: true,
    });

    storeConfigServiceSpy.updateHeaderAndAnnouncements.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [HeaderAnnouncements, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderAnnouncements);
    component = fixture.componentInstance;
    TestBed.flushEffects();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.fontPresets.length).toBeGreaterThan(0);
    expect(component.saving()).toBeFalse();
    expect(component.loading()).toBeFalse();
  });

  it('should initialize form with data from StoreConfigService via effect', () => {
    expect(component.form.get('appearance.header.backgroundColor')?.value).toBe('#112233');
    expect(component.form.get('appearance.header.textColor')?.value).toBe('#ffffff');
    expect(component.form.get('appearance.header.accentColor')?.value).toBe('#10b981');
    expect(component.form.get('appearance.header.fontFamily')?.value).toBe('montserrat');

    expect(component.form.get('announcementBar.enabled')?.value).toBeTrue();
    expect(component.form.get('announcementBar.text')?.value).toBe('Envío gratis a todo el país');
    expect(component.form.get('announcementBar.link')?.value).toBe('/ofertas');

    expect(component.form.get('floatingWhatsApp.enabled')?.value).toBeTrue();
    expect(component.form.get('floatingWhatsApp.phoneNumber')?.value).toBe('5492619876543');
    expect(component.form.get('floatingWhatsApp.defaultMessage')?.value).toBe(
      'Hola, quiero consultar por un producto',
    );
  });

  it('should fallback to defaults when config has no appearance or widgets', () => {
    mockConfigSignal.set({
      ...mockConfig,
      appearance: undefined,
      announcementBar: undefined,
      floatingWhatsApp: undefined,
    });
    TestBed.flushEffects();
    fixture.detectChanges();

    expect(component.form.get('appearance.header.backgroundColor')?.value).toBe('#ffffff');
    expect(component.form.get('appearance.header.fontFamily')?.value).toBe('system');
    expect(component.form.get('announcementBar.enabled')?.value).toBeFalse();
    expect(component.form.get('floatingWhatsApp.enabled')?.value).toBeFalse();
  });

  it('should update live preview signals dynamically when appearance form changes', () => {
    component.form.patchValue({
      appearance: {
        header: {
          backgroundColor: '#223344',
          textColor: '#eeddcc',
          accentColor: '#ef4444',
          fontFamily: 'poppins',
        },
      },
    });
    fixture.detectChanges();

    expect(component.liveHeaderBg()).toBe('#223344');
    expect(component.liveHeaderText()).toBe('#eeddcc');
    expect(component.liveHeaderAccent()).toBe('#ef4444');
    expect(component.liveFontFamily()).toBe('poppins');
    expect(component.liveHeaderStyles()['--header-bg']).toBe('#223344');
    expect(component.liveHeaderStyles()['--header-text']).toBe('#eeddcc');
    expect(component.liveHeaderStyles()['--header-accent']).toBe('#ef4444');
  });

  it('selectFontPreset should patch fontFamily and mark dirty', () => {
    expect(component.form.dirty).toBeFalse();
    component.selectFontPreset('space-grotesk');
    expect(component.form.get('appearance.header.fontFamily')?.value).toBe('space-grotesk');
    expect(component.form.dirty).toBeTrue();
  });

  it('should toggle validators and trigger autofocus for announcementBar', fakeAsync(() => {
    const announcementGroup = component.form.get('announcementBar') as FormGroup;
    const enabledCtrl = announcementGroup.get('enabled');
    const textCtrl = announcementGroup.get('text');

    // Initially true from mock
    expect(textCtrl?.validator).toBeTruthy();

    // Disable
    enabledCtrl?.setValue(false);
    expect(textCtrl?.validator).toBeNull();

    // Enable again and test autofocus
    const mockInput = document.createElement('input');
    spyOn(mockInput, 'focus');
    component.announcementTextInput = { nativeElement: mockInput };

    enabledCtrl?.setValue(true);
    tick();

    expect(textCtrl?.validator).toBeTruthy();
    expect(mockInput.focus).toHaveBeenCalled();
  }));

  it('should toggle validators and trigger autofocus for floatingWhatsApp', fakeAsync(() => {
    const floatingGroup = component.form.get('floatingWhatsApp') as FormGroup;
    const enabledCtrl = floatingGroup.get('enabled');
    const phoneCtrl = floatingGroup.get('phoneNumber');

    // Initially true from mock
    expect(phoneCtrl?.validator).toBeTruthy();

    // Disable
    enabledCtrl?.setValue(false);
    expect(phoneCtrl?.validator).toBeNull();

    // Enable again and test autofocus
    const mockInput = document.createElement('input');
    spyOn(mockInput, 'focus');
    component.whatsappPhoneInput = { nativeElement: mockInput };

    enabledCtrl?.setValue(true);
    tick();

    expect(phoneCtrl?.validator).toBeTruthy();
    expect(mockInput.focus).toHaveBeenCalled();
  }));

  it('should show error alert if form is invalid on submit', async () => {
    component.form.patchValue({
      appearance: {
        header: {
          backgroundColor: '', // Required
        },
      },
    });

    await component.onSubmit();

    expect(sweetAlertSpy.error).toHaveBeenCalledWith(
      'Formulario inválido',
      'Revisá los campos obligatorios.',
    );
    expect(storeConfigServiceSpy.updateHeaderAndAnnouncements).not.toHaveBeenCalled();
  });

  it('should call updateHeaderAndAnnouncements and show success alert on valid submit', async () => {
    component.form.patchValue({
      appearance: {
        header: {
          backgroundColor: '#000000',
          textColor: '#ffffff',
          accentColor: '#f59e0b',
          fontFamily: 'raleway',
        },
      },
    });

    await component.onSubmit();

    expect(storeConfigServiceSpy.updateHeaderAndAnnouncements).toHaveBeenCalledWith(
      jasmine.objectContaining({
        backgroundColor: '#000000',
        textColor: '#ffffff',
        accentColor: '#f59e0b',
        fontFamily: 'raleway',
      }),
      jasmine.objectContaining({
        announcementBar: jasmine.any(Object),
        floatingWhatsApp: jasmine.any(Object),
      }),
    );
    expect(sweetAlertSpy.success).toHaveBeenCalledWith(
      '¡Listo!',
      'El encabezado y los anuncios fueron guardados con éxito.',
    );
    expect(component.saving()).toBeFalse();
    expect(component.form.pristine).toBeTrue();
  });

  it('should handle service error gracefully on submit', async () => {
    storeConfigServiceSpy.updateHeaderAndAnnouncements.and.returnValue(
      Promise.reject(new Error('Firestore error')),
    );

    await component.onSubmit();

    expect(sweetAlertSpy.error).toHaveBeenCalledWith(
      'Error',
      'No se pudo guardar la configuración de encabezado y anuncios.',
    );
    expect(component.saving()).toBeFalse();
  });

  it('should expose brand details from service in computed signals for live mockup', () => {
    expect(component.liveStoreName()).toBe('Tienda Test');
    expect(component.liveLogoUrl()).toBe('https://test.com/logo.png');
    expect(component.liveBrandDisplayMode()).toBe('both');

    mockConfigSignal.set(null);
    TestBed.flushEffects();

    expect(component.liveStoreName()).toBe('Mi Tienda');
    expect(component.liveLogoUrl()).toBe('');
    expect(component.liveBrandDisplayMode()).toBe('text');
  });

  it('createAnnouncementItemForm factory should return valid form group', () => {
    const fb = new FormBuilder();
    const itemForm = createAnnouncementItemForm(fb);
    expect(itemForm.get('text')?.value).toBe('');
    expect(itemForm.get('enabled')?.value).toBeTrue();
  });

  it('createHeaderAnnouncementsForm should instantiate with default values', () => {
    const fb = new FormBuilder();
    const headerForm = createHeaderAnnouncementsForm(fb);
    expect(headerForm.get('appearance.header.backgroundColor')?.value).toBe('#ffffff');
    expect(headerForm.get('announcementBar.enabled')?.value).toBeFalse();
    expect(headerForm.get('floatingWhatsApp.enabled')?.value).toBeFalse();
  });
});
