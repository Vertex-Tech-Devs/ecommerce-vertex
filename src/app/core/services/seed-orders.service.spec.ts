import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { SeedOrdersService } from './seed-orders.service';
import type { SeedProduct } from './seed-products.service';
import type { SeedClient } from './seed-orders.service';

describe('SeedOrdersService', () => {
  let service: SeedOrdersService;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    firestoreSpy = jasmine.createSpyObj('Firestore', ['type']);

    TestBed.configureTestingModule({
      providers: [SeedOrdersService, { provide: Firestore, useValue: firestoreSpy }],
    });

    service = TestBed.inject(SeedOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should seed clients into firestore', fakeAsync(() => {
    spyOn(
      service as unknown as { run: (fn: () => Promise<unknown>) => Promise<unknown> },
      'run',
    ).and.callFake(() => {
      return Promise.resolve({ id: 'client-doc-1' });
    });

    let clientsResult: SeedClient[] | null = null;
    void service.seedClients().then((clients) => {
      clientsResult = clients;
    });

    tick();
    expect(clientsResult).toBeTruthy();
    if (clientsResult) {
      expect((clientsResult as SeedClient[]).length).toBeGreaterThan(0);
      expect((clientsResult as SeedClient[])[0].id).toBe('client-doc-1');
    }
  }));

  it('should seed orders into firestore', fakeAsync(() => {
    spyOn(
      service as unknown as { run: (fn: () => Promise<unknown>) => Promise<unknown> },
      'run',
    ).and.callFake(() => {
      return Promise.resolve({ id: 'order-doc-1' });
    });

    const mockProds: SeedProduct[] = [
      {
        id: 'p1',
        name: 'Remera Test',
        finalPrice: 15000,
        image: 'https://example.com/img.jpg',
        categoryName: 'Remeras',
      },
    ];

    const mockClients: SeedClient[] = [
      {
        id: 'c1',
        fullName: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '1122334455',
      },
    ];

    let completed = false;
    void service.seedOrders(mockProds, mockClients).then(() => {
      completed = true;
    });

    tick();
    expect(completed).toBeTrue();
  }));
});
