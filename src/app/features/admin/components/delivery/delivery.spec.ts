import { type ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { signal, type ElementRef, type QueryList } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { DeliveryMethodConfig, StoreConfig } from '@core/models/store-config.model';
import { Delivery } from './delivery';
import { formatSchedule } from './delivery.constants';

describe('Delivery Component', () => {
  let component: Delivery;
  let fixture: ComponentFixture<Delivery>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;
  let mockStoreConfigSignal: ReturnType<typeof signal<StoreConfig | null>>;
  let mockIsLoadingSignal: ReturnType<typeof signal<boolean>>;

  const initialDeliveryConfig: DeliveryMethodConfig = {
    enableHomeDelivery: true,
    enableStorePickup: true,
    homeDeliveryDescription: 'Envío en 24hs',
    pickupLocations: [
      {
        id: 'loc-1',
        name: 'Sucursal Centro',
        address: 'San Martín 100',
        city: 'Mendoza',
        schedule: 'Lun a Vie: 09:00 a 18:00 hs',
        days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
        timeFrom1: '09:00',
        timeTo1: '18:00',
        hasSplitSchedule: false,
        timeFrom2: '16:30',
        timeTo2: '20:30',
        notes: 'Timbre 2B',
        enabled: true,
      },
    ],
  };

  const mockConfig: StoreConfig = {
    tenantId: 'test-tenant',
    storeId: 'test-store',
    storeName: 'Mi Tienda Test',
    tagline: '',
    faviconUrl: '',
    colors: { primary: '#000', accent: '#fff', background: '#fff' },
    payments: { mercadoPagoPublicKey: '' },
    contact: { phone: '', email: '', whatsApp: '', instagram: '', facebook: '' },
    seo: { metaDescription: '' },
    setupCompleted: true,
    deliveryMethods: initialDeliveryConfig,
  };

  beforeEach(async () => {
    mockStoreConfigSignal = signal<StoreConfig | null>(mockConfig);
    mockIsLoadingSignal = signal<boolean>(false);

    storeConfigServiceSpy = jasmine.createSpyObj(
      'StoreConfigService',
      ['loadConfig', 'updateDeliveryConfig'],
      {
        storeConfig: mockStoreConfigSignal,
        isLoading: mockIsLoadingSignal,
      },
    );
    storeConfigServiceSpy.loadConfig.and.returnValue(Promise.resolve());
    storeConfigServiceSpy.updateDeliveryConfig.and.returnValue(Promise.resolve());

    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['success', 'error', 'confirm']);

    await TestBed.configureTestingModule({
      imports: [Delivery, ReactiveFormsModule],
      providers: [
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Delivery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create delivery component', () => {
    expect(component).toBeTruthy();
    expect(component.saving()).toBeFalse();
    expect(component.loading()).toBeFalse();
  });

  it('should load config on ngOnInit if storeConfig is null', async () => {
    mockStoreConfigSignal.set(null);
    await component.ngOnInit();
    expect(storeConfigServiceSpy.loadConfig).toHaveBeenCalled();
  });

  it('should not call loadConfig on ngOnInit if storeConfig is already present', async () => {
    mockStoreConfigSignal.set(mockConfig);
    storeConfigServiceSpy.loadConfig.calls.reset();
    await component.ngOnInit();
    expect(storeConfigServiceSpy.loadConfig).not.toHaveBeenCalled();
  });

  it('should populate form from storeConfig signal effect', () => {
    expect(component.form.get('enableHomeDelivery')?.value).toBeTrue();
    expect(component.form.get('enableStorePickup')?.value).toBeTrue();
    expect(component.form.get('homeDeliveryDescription')?.value).toBe('Envío en 24hs');
    expect(component.pickupLocationsArray.length).toBe(1);

    const firstLoc = component.pickupLocationsArray.at(0);
    expect(firstLoc.get('name')?.value).toBe('Sucursal Centro');
    expect(firstLoc.get('city')?.value).toBe('Mendoza');
  });

  it('should add a new pickup location and mark form dirty', () => {
    const initialCount = component.pickupLocationsArray.length;
    component.addPickupLocation();

    expect(component.pickupLocationsArray.length).toBe(initialCount + 1);
    const newLoc = component.pickupLocationsArray.at(component.pickupLocationsArray.length - 1);
    expect(newLoc.get('name')?.value).toBe('');
    expect(newLoc.get('enabled')?.value).toBeTrue();
    expect(component.form.dirty).toBeTrue();
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

  it('should remove pickup location from array', () => {
    expect(component.pickupLocationsArray.length).toBe(1);
    component.removePickupLocation(0);

    expect(component.pickupLocationsArray.length).toBe(0);
    expect(component.form.dirty).toBeTrue();
  });

  it('should toggle enabled status of a pickup location', () => {
    const loc = component.pickupLocationsArray.at(0);
    expect(loc.get('enabled')?.value).toBeTrue();

    component.togglePickupLocationStatus(0);
    expect(loc.get('enabled')?.value).toBeFalse();

    component.togglePickupLocationStatus(0);
    expect(loc.get('enabled')?.value).toBeTrue();
  });

  it('should safely handle togglePickupLocationStatus with invalid index', () => {
    expect(() => component.togglePickupLocationStatus(999)).not.toThrow();
  });

  it('should toggle days in a pickup location and update schedule', () => {
    expect(component.isDaySelected(0, 'Sáb')).toBeFalse();

    component.toggleDay(0, 'Sáb');
    expect(component.isDaySelected(0, 'Sáb')).toBeTrue();
    expect(component.pickupLocationsArray.at(0).get('schedule')?.value).toContain('Sáb');

    component.toggleDay(0, 'Sáb');
    expect(component.isDaySelected(0, 'Sáb')).toBeFalse();
  });

  it('should safely handle toggleDay with invalid index', () => {
    expect(() => component.toggleDay(999, 'Lun')).not.toThrow();
  });

  it('should sync schedule with split time when hasSplitSchedule is true', () => {
    const loc = component.pickupLocationsArray.at(0);
    loc.patchValue({
      days: ['Lun', 'Mar'],
      timeFrom1: '09:00',
      timeTo1: '13:00',
      hasSplitSchedule: true,
      timeFrom2: '16:00',
      timeTo2: '20:00',
    });

    component.syncSchedule(0);
    expect(loc.get('schedule')?.value).toBe('Lun, Mar: 09:00 a 13:00 y 16:00 a 20:00 hs');
  });

  it('should safely handle syncSchedule with invalid index', () => {
    expect(() => component.syncSchedule(999)).not.toThrow();
  });

  it('should format schedule correctly via helper function', () => {
    const regular = formatSchedule(['Lun', 'Vie'], '08:00', '16:00', false, '', '');
    expect(regular).toBe('Lun, Vie: 08:00 a 16:00 hs');

    const split = formatSchedule(['Sáb'], '09:00', '13:00', true, '17:00', '21:00');
    expect(split).toBe('Sáb: 09:00 a 13:00 y 17:00 a 21:00 hs');

    const emptyDays = formatSchedule([], '09:00', '18:00', false, '', '');
    expect(emptyDays).toBe('Lun a Vie: 09:00 a 18:00 hs');
  });

  it('should reject invalid form submit and show error alert', async () => {
    component.addPickupLocation(); // newly added location has empty required fields
    const last = component.pickupLocationsArray.at(component.pickupLocationsArray.length - 1);
    expect(last.invalid).toBeTrue();

    await component.onSubmit();

    expect(sweetAlertSpy.error).toHaveBeenCalledWith(
      'Formulario inválido',
      'Revisá los campos obligatorios.',
    );
    expect(storeConfigServiceSpy.updateDeliveryConfig).not.toHaveBeenCalled();
    expect(component.saving()).toBeFalse();
  });

  it('should submit successfully, update delivery config, and show success alert', async () => {
    component.form.markAsDirty();
    await component.onSubmit();

    expect(storeConfigServiceSpy.updateDeliveryConfig).toHaveBeenCalled();
    expect(sweetAlertSpy.success).toHaveBeenCalledWith(
      '¡Listo!',
      'Los métodos de entrega fueron guardados con éxito.',
    );
    expect(component.form.pristine).toBeTrue();
    expect(component.saving()).toBeFalse();
  });

  it('should handle error when updateDeliveryConfig fails', async () => {
    spyOn(console, 'error');
    storeConfigServiceSpy.updateDeliveryConfig.and.returnValue(
      Promise.reject(new Error('Firestore error')),
    );
    component.form.markAsDirty();

    await component.onSubmit();

    expect(sweetAlertSpy.error).toHaveBeenCalledWith(
      'Error',
      'No se pudo guardar la configuración de entrega.',
    );
    expect(component.saving()).toBeFalse();
  });

  describe('Save button UI and interaction', () => {
    it('should render the save button in save-action-container with correct classes and initial text', () => {
      const container = fixture.debugElement.query(By.css('.save-action-container'));
      expect(container).toBeTruthy();

      const button = container.query(By.css('button.btn-save-primary'));
      expect(button).toBeTruthy();
      expect(button.nativeElement.textContent).toContain('Guardar Métodos de Entrega');

      const icon = button.query(By.css('i.bi-check2-circle'));
      expect(icon).toBeTruthy();
      expect(icon.nativeElement.classList.contains('d-none')).toBeFalse();
    });

    it('should be disabled when form is pristine', () => {
      const button = fixture.debugElement.query(By.css('.btn-save-primary'));
      expect(component.form.dirty).toBeFalse();
      expect(button.nativeElement.disabled).toBeTrue();
    });

    it('should be enabled when form is dirty and valid', () => {
      component.form.markAsDirty();
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('.btn-save-primary'));
      expect(component.form.valid).toBeTrue();
      expect(button.nativeElement.disabled).toBeFalse();
    });

    it('should be disabled when form is invalid even if dirty', () => {
      component.addPickupLocation();
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('.btn-save-primary'));
      expect(component.form.dirty).toBeTrue();
      expect(component.form.invalid).toBeTrue();
      expect(button.nativeElement.disabled).toBeTrue();
    });

    it('should show spinner and "Guardando..." when saving signal is true', () => {
      component.saving.set(true);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('.btn-save-primary'));
      expect(button.nativeElement.disabled).toBeTrue();
      expect(button.nativeElement.textContent).toContain('Guardando...');

      const spinner = button.query(By.css('.spinner-border'));
      expect(spinner).toBeTruthy();

      const icon = button.query(By.css('i.bi-check2-circle'));
      expect(icon.nativeElement.classList.contains('d-none')).toBeTrue();
    });
  });
});
