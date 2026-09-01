import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HeaderManagement } from './header-management';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { StoreConfig } from '@core/models/store-config.model';

describe('HeaderManagement', () => {
  let component: HeaderManagement;
  let fixture: ComponentFixture<HeaderManagement>;
  let mockStoreConfigService: jasmine.SpyObj<StoreConfigService>;
  let mockSweetAlert: jasmine.SpyObj<SweetAlertService>;

  beforeEach(async () => {
    mockStoreConfigService = jasmine.createSpyObj<StoreConfigService>(
      'StoreConfigService',
      ['loadConfig', 'saveConfig'],
      {
        storeConfig: signal({
          storeName: 'Mi Tienda',
          brandDisplayMode: 'both',
          appearance: {
            header: {
              backgroundColor: '#ffffff',
              textColor: '#000000',
              accentColor: '#2563eb',
              fontFamily: 'inter',
            },
          },
          announcementBar: {
            enabled: true,
            text: 'Envío gratis',
            link: '/shop',
            backgroundColor: '#000000',
            textColor: '#ffffff',
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
      imports: [HeaderManagement],
      providers: [
        provideRouter([]),
        { provide: StoreConfigService, useValue: mockStoreConfigService },
        { provide: SweetAlertService, useValue: mockSweetAlert },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderManagement);
    component = fixture.componentInstance;
    await component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create header management component', () => {
    expect(component).toBeTruthy();
    expect(component.form.get('brandDisplayMode')?.value).toBe('both');
  });

  it('should select font preset', () => {
    component.selectFont('montserrat');
    expect(component.headerGroup.get('fontFamily')?.value).toBe('montserrat');
  });

  it('should submit valid form successfully', async () => {
    await component.onSubmit();
    expect(mockStoreConfigService.saveConfig).toHaveBeenCalled();
    expect(mockSweetAlert.success).toHaveBeenCalledWith(
      'Guardado exitoso',
      'Configuración de cabecera guardada con éxito.',
    );
  });
});
