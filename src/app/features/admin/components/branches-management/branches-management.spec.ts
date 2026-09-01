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

  it('should toggle day selection and update schedule', () => {
    component.toggleDay(0, 'Mié');
    expect(component.isDaySelected(0, 'Mié')).toBeTrue();
  });

  it('should submit valid form successfully', async () => {
    await component.onSubmit();
    expect(mockStoreConfigService.saveConfig).toHaveBeenCalled();
    expect(mockSweetAlert.success).toHaveBeenCalledWith(
      'Guardado exitoso',
      'Sucursales y logística guardadas correctamente.',
    );
  });
});
