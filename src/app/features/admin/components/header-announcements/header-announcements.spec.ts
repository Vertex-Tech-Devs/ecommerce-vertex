import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
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
import {
  ANNOUNCEMENT_PRESETS,
  QUICK_ROUTE_PRESETS,
  WHATSAPP_MESSAGE_PRESETS,
} from './header-announcements.constants';

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
    expect(phoneCtrl?.hasValidator(Validators.required)).toBeTrue();

    // Disable (removes required but keeps defensive format validators)
    enabledCtrl?.setValue(false);
    expect(phoneCtrl?.hasValidator(Validators.required)).toBeFalse();
    expect(phoneCtrl?.validator).toBeTruthy();

    // Enable again and test autofocus
    const mockInput = document.createElement('input');
    spyOn(mockInput, 'focus');
    component.whatsappPhoneInput = { nativeElement: mockInput };

    enabledCtrl?.setValue(true);
    tick();

    expect(phoneCtrl?.hasValidator(Validators.required)).toBeTrue();
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

  it('createHeaderAnnouncementsForm should instantiate with default values and support isMarquee', () => {
    const fb = new FormBuilder();
    const headerForm = createHeaderAnnouncementsForm(fb);
    expect(headerForm.get('appearance.header.backgroundColor')?.value).toBe('#ffffff');
    expect(headerForm.get('announcementBar.enabled')?.value).toBeFalse();
    expect(headerForm.get('announcementBar.isMarquee')?.value).toBeFalse();
    expect(headerForm.get('floatingWhatsApp.enabled')?.value).toBeFalse();
  });

  it('createHeaderAnnouncementsForm should validate link format (empty, relative or absolute)', () => {
    const fb = new FormBuilder();
    const headerForm = createHeaderAnnouncementsForm(fb);
    const linkCtrl = headerForm.get('announcementBar.link');

    // Empty is valid
    linkCtrl?.setValue('');
    expect(linkCtrl?.valid).toBeTrue();

    // Relative link starting with / is valid
    linkCtrl?.setValue('/catalog');
    expect(linkCtrl?.valid).toBeTrue();

    // Absolute link starting with https:// is valid
    linkCtrl?.setValue('https://vertex.dev');
    expect(linkCtrl?.valid).toBeTrue();

    // Absolute link starting with http:// is valid
    linkCtrl?.setValue('http://vertex.dev');
    expect(linkCtrl?.valid).toBeTrue();

    // Invalid formats
    linkCtrl?.setValue('catalog');
    expect(linkCtrl?.invalid).toBeTrue();
    expect(linkCtrl?.hasError('pattern')).toBeTrue();

    linkCtrl?.setValue('javascript:alert(1)');
    expect(linkCtrl?.invalid).toBeTrue();
    expect(linkCtrl?.hasError('pattern')).toBeTrue();
  });

  it('createHeaderAnnouncementsForm should validate phoneNumber format defensively', () => {
    const fb = new FormBuilder();
    const headerForm = createHeaderAnnouncementsForm(fb);
    const phoneCtrl = headerForm.get('floatingWhatsApp.phoneNumber');

    // Empty is valid when not required
    phoneCtrl?.setValue('');
    expect(phoneCtrl?.valid).toBeTrue();

    // Valid digits with length >= 10
    phoneCtrl?.setValue('5492611234567');
    expect(phoneCtrl?.valid).toBeTrue();

    // Invalid length (< 10 digits)
    phoneCtrl?.setValue('123456789');
    expect(phoneCtrl?.invalid).toBeTrue();
    expect(phoneCtrl?.hasError('minlength')).toBeTrue();

    // Invalid format (contains non-digits)
    phoneCtrl?.setValue('549261123456a');
    expect(phoneCtrl?.invalid).toBeTrue();
    expect(phoneCtrl?.hasError('pattern')).toBeTrue();
  });

  it('should expose all commercial and quick presets in constants', () => {
    expect(ANNOUNCEMENT_PRESETS.length).toBe(8);
    expect(QUICK_ROUTE_PRESETS.length).toBe(3);
    expect(WHATSAPP_MESSAGE_PRESETS.length).toBe(3);

    const firstPreset = ANNOUNCEMENT_PRESETS[0];
    expect(firstPreset.id).toBe('free-shipping-national');
    expect(firstPreset.category).toBe('Envíos');
    expect(firstPreset.suggestedLink).toBe('/catalog');

    const firstRoute = QUICK_ROUTE_PRESETS[0];
    expect(firstRoute.path).toBe('/catalog');

    const firstWaMsg = WHATSAPP_MESSAGE_PRESETS[0];
    expect(firstWaMsg.message).toContain('Tengo una consulta');
  });

  it('applyAnnouncementPreset should enable switch if disabled, set text, suggested link, dirty flag and focus', fakeAsync(() => {
    component.form.patchValue({
      announcementBar: {
        enabled: false,
        text: '',
        link: '',
      },
    });
    component.form.markAsPristine();

    const mockInput = document.createElement('input');
    spyOn(mockInput, 'focus');
    spyOn(mockInput, 'select');
    component.announcementTextInput = { nativeElement: mockInput };

    const preset = ANNOUNCEMENT_PRESETS[0]; // Free shipping national ($100k, /catalog)
    component.applyAnnouncementPreset(preset);
    tick();

    expect(component.form.get('announcementBar.enabled')?.value).toBeTrue();
    expect(component.form.get('announcementBar.text')?.value).toBe(preset.text);
    expect(component.form.get('announcementBar.link')?.value).toBe('/catalog');
    expect(component.form.dirty).toBeTrue();
    expect(mockInput.focus).toHaveBeenCalled();
    expect(mockInput.select).toHaveBeenCalled();
  }));

  it('applyAnnouncementPreset should not overwrite existing link if already present', fakeAsync(() => {
    component.form.patchValue({
      announcementBar: {
        enabled: true,
        text: '',
        link: '/custom-destination',
      },
    });

    const preset = ANNOUNCEMENT_PRESETS[0]; // Has suggestedLink = '/catalog'
    component.applyAnnouncementPreset(preset);
    tick();

    expect(component.form.get('announcementBar.text')?.value).toBe(preset.text);
    expect(component.form.get('announcementBar.link')?.value).toBe('/custom-destination');
  }));

  it('applyQuickRoute should patch announcementBar.link and mark form as dirty', () => {
    component.form.markAsPristine();
    component.applyQuickRoute('/about');

    expect(component.form.get('announcementBar.link')?.value).toBe('/about');
    expect(component.form.get('announcementBar.link')?.dirty).toBeTrue();
    expect(component.form.dirty).toBeTrue();
  });

  it('applyWhatsAppMessagePreset should patch floatingWhatsApp.defaultMessage and mark dirty', () => {
    component.form.markAsPristine();
    const presetMsg = '¡Hola! Quería consultar disponibilidad de stock.';
    component.applyWhatsAppMessagePreset(presetMsg);

    expect(component.form.get('floatingWhatsApp.defaultMessage')?.value).toBe(presetMsg);
    expect(component.form.get('floatingWhatsApp.defaultMessage')?.dirty).toBeTrue();
    expect(component.form.dirty).toBeTrue();
  });

  it('liveWhatsAppTestUrl should compute URL reactively or return null for invalid phone', () => {
    // Empty phone -> null
    component.form.patchValue({
      floatingWhatsApp: {
        phoneNumber: '',
        defaultMessage: 'Hola',
      },
    });
    expect(component.liveWhatsAppTestUrl()).toBeNull();

    // Less than 10 digits -> null
    component.form.patchValue({
      floatingWhatsApp: {
        phoneNumber: '12345',
        defaultMessage: 'Hola',
      },
    });
    expect(component.liveWhatsAppTestUrl()).toBeNull();

    // Valid 13-digit phone -> wa.me URL
    component.form.patchValue({
      floatingWhatsApp: {
        phoneNumber: '5492611234567',
        defaultMessage: '¡Hola! Tengo una consulta',
      },
    });
    const url = component.liveWhatsAppTestUrl();
    expect(url).toContain('https://wa.me/5492611234567?text=');
    expect(url).toContain(encodeURIComponent('¡Hola! Tengo una consulta'));
  });

  it('liveAnnouncementIsMarquee should react to isMarquee changes', () => {
    expect(component.liveAnnouncementIsMarquee()).toBeFalse();

    component.form.patchValue({
      announcementBar: {
        isMarquee: true,
      },
    });
    expect(component.liveAnnouncementIsMarquee()).toBeTrue();

    component.form.patchValue({
      announcementBar: {
        isMarquee: false,
      },
    });
    expect(component.liveAnnouncementIsMarquee()).toBeFalse();
  });
});
