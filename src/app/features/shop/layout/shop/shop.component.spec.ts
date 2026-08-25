import type { WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Shop } from './shop';
import { CartService } from '@core/services/cart.service';
import { StoreConfigService } from '@core/services/store-config.service';
import { CategoryService } from '@core/services/category.service';
import { AuthService } from '@core/services/auth.service';
import { FooterService } from '@core/services/footer.service';
import type { StoreConfig } from '@core/models/store-config.model';
import type { Cart } from '@core/models/cart.model';

describe('Shop', () => {
  let component: Shop;
  let fixture: ComponentFixture<Shop>;
  let mockStoreConfigSignal: WritableSignal<StoreConfig | null>;
  let mockCartSignal: WritableSignal<Cart>;

  beforeEach(async () => {
    mockStoreConfigSignal = signal<StoreConfig | null>({
      storeName: 'Mi Tienda',
      logoUrl: 'logo.png',
    } as unknown as StoreConfig);

    mockCartSignal = signal<Cart>({ items: [], total: 0 });

    const cartServiceSpy = jasmine.createSpyObj('CartService', [], {
      cart: mockCartSignal,
      itemCount: signal(0),
    });
    const storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', [], {
      storeConfig: mockStoreConfigSignal,
      storeName: signal('Mi Tienda'),
      logoUrl: signal('logo.png'),
    });
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    categoryServiceSpy.getCategories.and.returnValue(of([]));

    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      currentUser$: of(null),
    });
    const footerServiceSpy = jasmine.createSpyObj('FooterService', ['getFooterData']);
    footerServiceSpy.getFooterData.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [Shop],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceSpy },
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: FooterService, useValue: footerServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Shop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the shop layout component', () => {
    expect(component).toBeTruthy();
  });
});
