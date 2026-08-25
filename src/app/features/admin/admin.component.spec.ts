import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { Admin } from './admin';
import { StoreConfigService } from '@core/services/store-config.service';
import { CategoryService } from '@core/services/category.service';
import { ProductService } from '@core/services/product.service';
import { OrderService } from '@core/services/order.service';
import { AuthService } from '@core/services/auth.service';
import { Auth } from '@angular/fire/auth';

describe('Admin', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;

  beforeEach(async () => {
    storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', [], {
      isFirstRun: signal(false),
      config: signal(null),
      logoUrl: signal(null),
      storeName: signal('Mi Tienda'),
    });

    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrders']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      currentUser$: of(null),
      isAdmin$: of(true),
    });
    const authSpy = jasmine.createSpyObj('Auth', ['type']);

    categoryServiceSpy.getCategories.and.returnValue(of([]));
    productServiceSpy.getProducts.and.returnValue(of([]));
    orderServiceSpy.getOrders.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [Admin],
      providers: [
        provideRouter([]),
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Auth, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create admin layout component', () => {
    expect(component).toBeTruthy();
    expect(component.isSidebarOpen).toBeFalse();
  });

  it('should toggle sidebar state', () => {
    expect(component.isSidebarOpen).toBeFalse();
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeTrue();
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBeFalse();
  });

  it('should close sidebar if open', () => {
    component.isSidebarOpen = true;
    component.closeSidebar();
    expect(component.isSidebarOpen).toBeFalse();

    component.closeSidebar();
    expect(component.isSidebarOpen).toBeFalse();
  });

  it('should close sidebar on screen resize if width is greater than 1024px', () => {
    component.isSidebarOpen = true;
    component.onResize({} as Event);
    if (window.innerWidth > 1024) {
      expect(component.isSidebarOpen).toBeFalse();
    }
  });
});
