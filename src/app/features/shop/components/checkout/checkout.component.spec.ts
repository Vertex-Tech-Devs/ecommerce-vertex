import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import type { WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { CheckoutComponent } from './checkout.component';
import { CartService } from '@core/services/cart.service';
import { PaymentService } from '@core/services/payment.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { OrderService } from '@core/services/order.service';
import { StoreConfigService } from '@core/services/store-config.service';
import type { Cart, CartItem } from '@core/models/cart.model';
import type { StoreConfig } from '@core/models/store-config.model';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let paymentServiceSpy: jasmine.SpyObj<PaymentService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;
  let mockCartSignal: WritableSignal<Cart>;
  let mockStoreConfigSignal: WritableSignal<StoreConfig | null>;

  const mockPickupLocation = {
    id: 'loc-centro-1',
    name: 'Sucursal Centro',
    address: 'Av. Corrientes 1234',
    city: 'CABA',
    schedule: 'Lun a Vie 9 a 18 hs',
    notes: 'Retiro por mostrador',
    enabled: true,
  };

  const mockConfig: StoreConfig = {
    tenantId: 'tenant-1',
    storeId: 'store-1',
    storeName: 'Test Store',
    tagline: 'Test Tagline',
    logoUrl: '',
    faviconUrl: '',
    colors: {
      primary: '#ea580c',
      accent: '#ef4444',
      background: '#ffffff',
    },
    payments: {
      mercadoPagoPublicKey: '',
    },
    contact: {
      phone: '',
      email: '',
      whatsApp: '',
      instagram: '',
      facebook: '',
    },
    seo: {
      metaDescription: '',
    },
    setupCompleted: true,
    deliveryMethods: {
      enableHomeDelivery: true,
      enableStorePickup: true,
      homeDeliveryDescription: 'Envío a domicilio',
      pickupLocations: [mockPickupLocation],
    },
  };

  const mockCartItem: CartItem = {
    id: 'item-1',
    productId: 'prod-1',
    variantId: 'var-1',
    name: 'Producto Test',
    price: 1500,
    quantity: 2,
    image: 'https://example.com/img.jpg',
    attributes: {},
    stock: 10,
  };

  beforeEach(async () => {
    mockCartSignal = signal<Cart>({
      items: [mockCartItem],
      total: 3000,
    });

    mockStoreConfigSignal = signal<StoreConfig | null>(mockConfig);

    cartServiceSpy = jasmine.createSpyObj('CartService', ['clearCart'], {
      cart: mockCartSignal,
    });
    paymentServiceSpy = jasmine.createSpyObj('PaymentService', ['initiatePayment']);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', [
      'loading',
      'error',
      'success',
    ]);
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['createOrder', 'updateOrder']);
    storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', [], {
      storeConfig: mockStoreConfigSignal,
    });

    paymentServiceSpy.initiatePayment.and.returnValue(
      Promise.resolve({ success: false, error: 'Payment prevented in test environment' }),
    );
    orderServiceSpy.createOrder.and.returnValue(
      Promise.resolve({ id: 'order-999' } as unknown as ReturnType<OrderService['createOrder']>),
    );

    await TestBed.configureTestingModule({
      imports: [CheckoutComponent, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceSpy },
        { provide: PaymentService, useValue: paymentServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and initialize with available pickup locations', () => {
    expect(component).toBeTruthy();
    expect(component.availablePickupLocations().length).toBe(1);
    expect(component.availablePickupLocations()[0].id).toBe('loc-centro-1');
  });

  it('should toggle selectedDeliveryType when setDeliveryType() is called', () => {
    expect(component.selectedDeliveryType()).toBe('home_delivery');

    component.setDeliveryType('store_pickup');
    expect(component.selectedDeliveryType()).toBe('store_pickup');

    component.setDeliveryType('home_delivery');
    expect(component.selectedDeliveryType()).toBe('home_delivery');
  });

  it('should relax shipping address validators when selectedDeliveryType is store_pickup', () => {
    const shippingGroup = component.checkoutForm.get('shippingInfo');
    expect(shippingGroup?.valid).toBeFalse();

    component.setDeliveryType('store_pickup');
    expect(shippingGroup?.valid).toBeTrue();

    component.setDeliveryType('home_delivery');
    expect(shippingGroup?.valid).toBeFalse();
  });

  it('should generate order payload with store_pickup deliverySelection in createOrder', async () => {
    component.checkoutForm.get('contactInfo')?.patchValue({
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@example.com',
      phone: '1122334455',
      dni: '12345678',
    });

    component.setDeliveryType('store_pickup');

    expect(component.checkoutForm.valid).toBeTrue();

    await component.onSubmit();

    expect(orderServiceSpy.createOrder).toHaveBeenCalled();
    const createdOrderArg = orderServiceSpy.createOrder.calls.mostRecent().args[0];

    expect(createdOrderArg.deliverySelection).toEqual({
      type: 'store_pickup',
      pickupLocationId: 'loc-centro-1',
      pickupAddressFormatted: 'Sucursal Centro - Av. Corrientes 1234, CABA',
      notes: 'Retiro por mostrador',
    });
    expect(createdOrderArg.shippingAddress).toEqual({
      street: 'Av. Corrientes 1234',
      city: 'CABA',
      state: 'CABA',
      zipCode: '0000',
      country: 'Argentina',
    });
  });
});
