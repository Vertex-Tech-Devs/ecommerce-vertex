import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ClientDetails } from './client-details';
import { ClientService } from '@core/services/client.service';
import { OrderService } from '@core/services/order.service';
import type { Client } from '@core/models/client.model';
import type { Order } from '@core/models/order.model';

describe('ClientDetails', () => {
  let component: ClientDetails;
  let fixture: ComponentFixture<ClientDetails>;
  let clientServiceMock: jasmine.SpyObj<ClientService>;
  let orderServiceMock: { getOrdersByClient: jasmine.Spy };
  let router: Router;

  const mockClient: Client = {
    id: 'c1',
    fullName: 'Juan Pérez',
    email: 'test@client.com',
    phone: '1122334455',
  } as Client;

  const mockOrders: Order[] = [
    { id: 'o1', total: 1500 } as Order,
    { id: 'o2', total: 3500 } as Order,
  ];

  beforeEach(async () => {
    spyOn(console, 'error');
    spyOn(console, 'warn');

    clientServiceMock = jasmine.createSpyObj('ClientService', [
      'getClientByEmail',
      'getOrdersByClientEmail',
    ]);
    clientServiceMock.getClientByEmail.and.returnValue(of(mockClient));
    clientServiceMock.getOrdersByClientEmail.and.returnValue(of(mockOrders));

    orderServiceMock = {
      getOrdersByClient: jasmine.createSpy('getOrdersByClient').and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [ClientDetails],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ email: 'test@client.com' })),
          },
        },
        { provide: ClientService, useValue: clientServiceMock },
        { provide: OrderService, useValue: orderServiceMock },
      ],
    }).compileComponents();
  });

  it('should create client details component and load client and orders', fakeAsync(() => {
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);
    fixture = TestBed.createComponent(ClientDetails);
    component = fixture.componentInstance;

    fixture.detectChanges();
    tick();

    expect(component).toBeTruthy();
    expect(component.clientEmail).toBe('test@client.com');
    expect(component.isLoading()).toBeFalse();

    let totalSpent = 0;
    component.totalSpent$.subscribe((total) => {
      totalSpent = total;
    });
    tick();

    expect(totalSpent).toBe(5000);
  }));

  it('should redirect if email parameter is missing from route', fakeAsync(() => {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: {
        paramMap: of(convertToParamMap({})),
      },
    });
    router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate').and.resolveTo(true);
    fixture = TestBed.createComponent(ClientDetails);

    fixture.detectChanges();
    tick();

    expect(console.warn).toHaveBeenCalledWith('No se encontró el email del cliente en la URL.');
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/customers']);
  }));

  it('should handle error when loading client or orders fails', fakeAsync(() => {
    clientServiceMock.getClientByEmail.and.returnValue(throwError(() => new Error('Client error')));
    clientServiceMock.getOrdersByClientEmail.and.returnValue(
      throwError(() => new Error('Orders error')),
    );
    orderServiceMock.getOrdersByClient.and.returnValue(throwError(() => new Error('Orders error')));

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ClientDetails);

    fixture.detectChanges();
    tick();

    expect(console.error).toHaveBeenCalled();
  }));

  it('should navigate back to customers list on goBackToList', () => {
    router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate').and.resolveTo(true);
    fixture = TestBed.createComponent(ClientDetails);
    component = fixture.componentInstance;

    component.goBackToList();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin/customers']);
  });
});
