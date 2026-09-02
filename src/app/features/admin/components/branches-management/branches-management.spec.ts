import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BranchesManagement } from './branches-management';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { StoreConfig } from '@core/models/store-config.model';

describe('BranchesManagement', () => {
  let component: BranchesManagement;
  let fixture: ComponentFixture<BranchesManagement>;
  let mockStoreConfigService: jasmine.SpyObj<StoreConfigService>;
  let mockSweetAlert: jasmine.SpyObj<SweetAlertService>;

  beforeEach(async () => {
    mockStoreConfigService = jasmine.createSpyObj<StoreConfigService>(
      'StoreConfigService',
      ['loadConfig', 'saveConfig'],
      {
        storeConfig: signal({
          storeName: 'Mi Tienda',
          deliveryMethods: {
            enableHomeDelivery: true,
            homeDeliveryDescription: 'Envío por correo',
            enableStorePickup: true,
            pickupLocations: [
              {
                id: 'loc-1',
                name: 'Local Centro',
                address: 'Av. Corrientes 1000',
                city: 'CABA',
                days: ['Lun', 'Mar'],
                timeFrom1: '09:00',
                timeTo1: '18:00',
                schedule: 'Lun y Mar de 09:00 a 18:00',
                enabled: true,
              },
            ],
          },
        } as unknown as StoreConfig),
      },
    );
    mockStoreConfigService.loadConfig.and.resolveTo();
    mockStoreConfigService.saveConfig.and.resolveTo();

    mockSweetAlert = jasmine.createSpyObj<SweetAlertService>('SweetAlertService', [
      'success',
      'warning',
      'error',
    ]);

    await TestBed.configureTestingModule({
      imports: [BranchesManagement],
      providers: [
        provideRouter([]),
        { provide: StoreConfigService, useValue: mockStoreConfigService },
        { provide: SweetAlertService, useValue: mockSweetAlert },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BranchesManagement);
    component = fixture.componentInstance;
    await component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create branches management component', () => {
    expect(component).toBeTruthy();
    expect(component.pickupLocationsArray.length).toBe(1);
  });

  it('should add a new pickup location', () => {
    component.addPickupLocation();
    expect(component.pickupLocationsArray.length).toBe(2);
  });

  it('should remove a pickup location', () => {
    component.removePickupLocation(0);
    expect(component.pickupLocationsArray.length).toBe(0);
  });

  it('should toggle pickup location status and handle invalid index', () => {
    component.togglePickupLocationStatus(0);
    expect(component.pickupLocationsArray.at(0).get('enabled')?.value).toBeFalse();

    component.togglePickupLocationStatus(99);
  });

  it('should toggle day on and off and handle split schedule in updateComputedSchedule', () => {
    expect(component.isDaySelected(0, 'Lun')).toBeTrue();
    component.toggleDay(0, 'Lun');
    expect(component.isDaySelected(0, 'Lun')).toBeFalse();

    component.toggleDay(99, 'Lun');

    const group = component.pickupLocationsArray.at(0);
    group.patchValue({ hasSplitSchedule: true, timeFrom2: '17:00', timeTo2: '21:00' });
    component.updateComputedSchedule(0);
    expect(group.get('schedule')?.value).toContain('17:00 a 21:00');

    component.updateComputedSchedule(99);
  });

  it('should handle form invalid on submit', async () => {
    const group = component.pickupLocationsArray.at(0);
    group.patchValue({ name: '' });
    await component.onSubmit();
    expect(mockSweetAlert.warning).toHaveBeenCalledWith(
      'Campos incompletos',
      'Por favor, completá los campos obligatorios de tus sucursales.',
    );
  });

  it('should handle saveConfig error on submit', async () => {
    mockStoreConfigService.saveConfig.and.rejectWith(new Error('Save error'));
    await component.onSubmit();
    expect(mockSweetAlert.error).toHaveBeenCalledWith(
      'Error al guardar',
      'No se pudieron guardar las sucursales.',
    );
  });

  it('should handle loadData error gracefully', async () => {
    mockStoreConfigService.loadConfig.and.rejectWith(new Error('Load error'));
    await component.loadData();
    expect(component.isLoading()).toBeFalse();
  });
});
