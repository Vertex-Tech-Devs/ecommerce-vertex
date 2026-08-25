import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { SeedDataService } from './seed-data.service';
import { SweetAlertService } from './sweet-alert.service';
import { SeedContentService } from './seed-content.service';
import { SeedProductsService } from './seed-products.service';
import { SeedOrdersService } from './seed-orders.service';

describe('SeedDataService', () => {
  let service: SeedDataService;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;
  let contentServiceSpy: jasmine.SpyObj<SeedContentService>;
  let productsServiceSpy: jasmine.SpyObj<SeedProductsService>;
  let ordersServiceSpy: jasmine.SpyObj<SeedOrdersService>;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    firestoreSpy = jasmine.createSpyObj('Firestore', ['type']);
    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', [
      'loading',
      'close',
      'success',
      'error',
    ]);
    contentServiceSpy = jasmine.createSpyObj('SeedContentService', [
      'seedAttributes',
      'seedCategories',
      'seedHeroBanner',
      'seedAboutUs',
      'seedFooter',
    ]);
    productsServiceSpy = jasmine.createSpyObj('SeedProductsService', ['seedProducts']);
    ordersServiceSpy = jasmine.createSpyObj('SeedOrdersService', ['seedClients', 'seedOrders']);

    contentServiceSpy.seedAttributes.and.returnValue(Promise.resolve());
    contentServiceSpy.seedCategories.and.returnValue(
      Promise.resolve({} as Record<string, { id: string; name: string }>),
    );
    productsServiceSpy.seedProducts.and.returnValue(Promise.resolve([]));
    ordersServiceSpy.seedClients.and.returnValue(Promise.resolve([]));
    ordersServiceSpy.seedOrders.and.returnValue(Promise.resolve());
    contentServiceSpy.seedHeroBanner.and.returnValue(Promise.resolve());
    contentServiceSpy.seedAboutUs.and.returnValue(Promise.resolve());
    contentServiceSpy.seedFooter.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      providers: [
        SeedDataService,
        { provide: Firestore, useValue: firestoreSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
        { provide: SeedContentService, useValue: contentServiceSpy },
        { provide: SeedProductsService, useValue: productsServiceSpy },
        { provide: SeedOrdersService, useValue: ordersServiceSpy },
      ],
    });

    service = TestBed.inject(SeedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run seedAllData successfully', fakeAsync(() => {
    spyOn(service as unknown as { clearAll: () => Promise<void> }, 'clearAll').and.returnValue(
      Promise.resolve(),
    );

    void service.seedAllData();
    tick();

    expect(sweetAlertSpy.loading).toHaveBeenCalledWith('Regenerando datos…');
    expect(contentServiceSpy.seedAttributes).toHaveBeenCalled();
    expect(contentServiceSpy.seedCategories).toHaveBeenCalled();
    expect(productsServiceSpy.seedProducts).toHaveBeenCalled();
    expect(ordersServiceSpy.seedClients).toHaveBeenCalled();
    expect(ordersServiceSpy.seedOrders).toHaveBeenCalled();
    expect(contentServiceSpy.seedHeroBanner).toHaveBeenCalled();
    expect(contentServiceSpy.seedAboutUs).toHaveBeenCalled();
    expect(contentServiceSpy.seedFooter).toHaveBeenCalled();
    expect(sweetAlertSpy.close).toHaveBeenCalled();
    expect(sweetAlertSpy.success).toHaveBeenCalledWith('¡Listo!', jasmine.any(String));
  }));

  it('should handle error during seedAllData', fakeAsync(() => {
    spyOn(service as unknown as { clearAll: () => Promise<void> }, 'clearAll').and.returnValue(
      Promise.reject(new Error('Clear error')),
    );
    spyOn(console, 'error');

    void service.seedAllData();
    tick();

    expect(sweetAlertSpy.error).toHaveBeenCalledWith('Error', jasmine.any(String));
  }));

  it('should run seedAllDataSilently successfully', fakeAsync(() => {
    spyOn(service as unknown as { clearAll: () => Promise<void> }, 'clearAll').and.returnValue(
      Promise.resolve(),
    );

    void service.seedAllDataSilently('Test Store');
    tick();

    expect(contentServiceSpy.seedFooter).toHaveBeenCalledWith('Test Store');
    expect(sweetAlertSpy.loading).not.toHaveBeenCalled();
  }));

  it('should handle error silently during seedAllDataSilently', fakeAsync(() => {
    spyOn(service as unknown as { clearAll: () => Promise<void> }, 'clearAll').and.returnValue(
      Promise.reject(new Error('Silent error')),
    );
    spyOn(console, 'error');

    void service.seedAllDataSilently();
    tick();

    expect(console.error).toHaveBeenCalled();
  }));
});
