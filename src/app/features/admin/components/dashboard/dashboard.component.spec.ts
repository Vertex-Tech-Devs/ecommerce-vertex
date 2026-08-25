import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Dashboard } from './dashboard';
import { ProductService } from '@core/services/product.service';
import { OrderService } from '@core/services/order.service';
import { ClientService } from '@core/services/client.service';
import type { Order } from '@core/models/order.model';
import type { Product } from '@core/models/product.model';
import type { Client } from '@core/models/client.model';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;

  const mockOrders: Order[] = [{ id: 'o1', total: 1000 } as Order];
  const mockProducts: Product[] = [{ id: 'p1', name: 'Prod 1', stock: 2 } as unknown as Product];
  const mockClients: Client[] = [{ id: 'c1', firstName: 'Juan' } as unknown as Client];

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductsLowInStock',
      'getLatestProducts',
    ]);
    orderServiceSpy = jasmine.createSpyObj('OrderService', [
      'getMonthlySalesAndOrders',
      'getGlobalSalesAndOrders',
      'getPendingOrProcessingOrders',
      'getLatestOrders',
    ]);
    clientServiceSpy = jasmine.createSpyObj('ClientService', [
      'getNewClientsThisMonth',
      'getTotalClients',
      'getLatestClients',
    ]);

    orderServiceSpy.getMonthlySalesAndOrders.and.returnValue(
      of({ monthlySales: 5000, monthlyOrders: 10 }),
    );
    clientServiceSpy.getNewClientsThisMonth.and.returnValue(of(3));

    orderServiceSpy.getGlobalSalesAndOrders.and.returnValue(
      of({ totalSales: 50000, totalOrders: 100 }),
    );
    clientServiceSpy.getTotalClients.and.returnValue(of(45));

    orderServiceSpy.getPendingOrProcessingOrders.and.returnValue(of(mockOrders));
    productServiceSpy.getProductsLowInStock.and.returnValue(of(mockProducts));
    orderServiceSpy.getLatestOrders.and.returnValue(of(mockOrders));
    clientServiceSpy.getLatestClients.and.returnValue(of(mockClients));
    productServiceSpy.getLatestProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideRouter([]),
        { provide: ProductService, useValue: productServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: ClientService, useValue: clientServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create dashboard component', () => {
    expect(component).toBeTruthy();
    expect(component.activeTab()).toBe('orders');
  });

  it('should load monthly metrics successfully', (done) => {
    component.monthlyMetrics$.subscribe((metrics) => {
      expect(metrics).toEqual({ sales: 5000, orders: 10, newClients: 3 });
      done();
    });
  });

  it('should handle errors in monthly metrics gracefully', (done) => {
    orderServiceSpy.getMonthlySalesAndOrders.and.returnValue(
      throwError(() => new Error('Error monthly')),
    );
    component.ngOnInit();

    component.monthlyMetrics$.subscribe((metrics) => {
      expect(metrics).toEqual({ sales: 0, orders: 0, newClients: 0 });
      done();
    });
  });

  it('should load global metrics successfully', (done) => {
    component.globalMetrics$.subscribe((metrics) => {
      expect(metrics).toEqual({ totalSales: 50000, totalOrders: 100, totalClients: 45 });
      done();
    });
  });

  it('should handle errors in global metrics gracefully', (done) => {
    clientServiceSpy.getTotalClients.and.returnValue(throwError(() => new Error('Error global')));
    component.ngOnInit();

    component.globalMetrics$.subscribe((metrics) => {
      expect(metrics).toEqual({ totalSales: 0, totalOrders: 0, totalClients: 0 });
      done();
    });
  });

  it('should change activeTab via setTab', () => {
    component.setTab('clients');
    expect(component.activeTab()).toBe('clients');

    component.setTab('products');
    expect(component.activeTab()).toBe('products');
  });

  it('should update screenWidth on window resize listener', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);
    component.onResize();

    expect(component.screenWidth()).toBe(500);
    expect(component.isMobile()).toBeTrue();
  });
});
