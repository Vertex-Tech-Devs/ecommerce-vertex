import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ClientDetails } from './client-details';
import { ClientService } from '@core/services/client.service';
import type { Client } from '@core/models/client.model';
import type { Order } from '@core/models/order.model';

describe('ClientDetails', () => {
  let component: ClientDetails;
  let fixture: ComponentFixture<ClientDetails>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;
  let router: Router;
  let paramMapSubject: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  const mockClient: Client = {
    id: 'c1',
    fullName: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '1122334455',
  } as Client;

  const mockOrders: Order[] = [
    { id: 'o1', total: 1500 } as Order,
    { id: 'o2', total: 3500 } as Order,
  ];

  beforeEach(async () => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', [
      'getClientByEmail',
      'getOrdersByClientEmail',
    ]);
    paramMapSubject = new BehaviorSubject(convertToParamMap({ email: 'juan@example.com' }));

    clientServiceSpy.getClientByEmail.and.returnValue(of(mockClient));
    clientServiceSpy.getOrdersByClientEmail.and.returnValue(of(mockOrders));

    await TestBed.configureTestingModule({
      imports: [ClientDetails],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: paramMapSubject.asObservable() } },
        { provide: ClientService, useValue: clientServiceSpy },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ClientDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create client details component and load client and orders', (done) => {
    expect(component).toBeTruthy();
    expect(component.clientEmail).toBe('juan@example.com');
    expect(component.isLoading()).toBeFalse();

    component.totalSpent$.subscribe((total) => {
      expect(total).toBe(5000);
      done();
    });
  });

  it('should redirect if email parameter is missing from route', () => {
    const navigateSpy = spyOn(router, 'navigate');
    paramMapSubject.next(convertToParamMap({}));

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/admin/customers']);
  });

  it('should handle error when loading client or orders fails', (done) => {
    clientServiceSpy.getClientByEmail.and.returnValue(throwError(() => new Error('Client error')));
    clientServiceSpy.getOrdersByClientEmail.and.returnValue(
      throwError(() => new Error('Orders error')),
    );

    paramMapSubject.next(convertToParamMap({ email: 'error@example.com' }));
    fixture.detectChanges();

    component.client$.subscribe((client) => {
      expect(client).toBeUndefined();
    });

    component.clientOrders$.subscribe((orders) => {
      expect(orders).toEqual([]);
      done();
    });
  });

  it('should navigate back to customers list on goBackToList', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goBackToList();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/customers']);
  });
});
