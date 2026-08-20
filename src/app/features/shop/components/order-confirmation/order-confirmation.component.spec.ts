import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import type { WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { OrderConfirmationComponent } from './order-confirmation.component';
import { OrderService } from '@core/services/order.service';
import { StoreConfigService } from '@core/services/store-config.service';
import { CartService } from '@core/services/cart.service';
import type { Order } from '@core/models/order.model';
import type { StoreConfig } from '@core/models/store-config.model';

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let mockStoreConfigSignal: WritableSignal<StoreConfig | null>;

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
      whatsApp: '+54 9 11 9876-5432',
      phone: '+54 11 1234-5678',
      email: 'test@store.com',
      instagram: '',
      facebook: '',
    },
    seo: {
      metaDescription: '',
    },
    setupCompleted: true,
  };

  const mockOrderPickup: Order = {
    id: 'ORD-1001',
    userId: 'user-1',
    clientName: 'María Pérez',
    clientEmail: 'maria@example.com',
    clientPhone: '1198765432',
    orderDate: new Date(),
    total: 5000,
    status: 'pending',
    items: [],
    shippingAddress: {
      street: 'Av. Cabildo 2000',
      city: 'CABA',
      state: 'CABA',
      zipCode: '0000',
      country: 'Argentina',
    },
    paymentDetails: {
      paymentMethod: 'Mercado Pago',
      subtotal: 5000,
      shippingCost: 0,
      taxAmount: 0,
    },
    deliverySelection: {
      type: 'store_pickup',
      pickupLocationId: 'loc-1',
      pickupAddressFormatted: 'Sucursal Belgrano - Av. Cabildo 2000, CABA',
    },
  };

  const mockOrderHomeDelivery: Order = {
    ...mockOrderPickup,
    id: 'ORD-1002',
    deliverySelection: {
      type: 'home_delivery',
    },
  };

  const mockOrderLegacy: Order = {
    ...mockOrderPickup,
    id: 'ORD-1003',
    deliverySelection: undefined,
  };

  beforeEach(async () => {
    mockStoreConfigSignal = signal<StoreConfig | null>(mockConfig);

    orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrderById']);
    storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', [], {
      storeConfig: mockStoreConfigSignal,
    });
    cartServiceSpy = jasmine.createSpyObj('CartService', ['clearCart']);

    orderServiceSpy.getOrderById.and.returnValue(of(mockOrderPickup));

    await TestBed.configureTestingModule({
      imports: [OrderConfirmationComponent],
      providers: [
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'ORD-1001' })),
            queryParamMap: of(convertToParamMap({ status: 'approved' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should format pickup message with store address when order.deliverySelection.type is store_pickup', () => {
    const whatsappUrl = component.getWhatsappUrl(mockOrderPickup);
    const expectedMessageText =
      'Hola! Hice el pedido #ORD-1001 para retirar por el local (Sucursal Belgrano - Av. Cabildo 2000, CABA). ¿Cuándo puedo pasar a buscarlo?';
    const expectedEncoded = encodeURIComponent(expectedMessageText);

    expect(whatsappUrl).toBe(`https://wa.me/5491198765432?text=${expectedEncoded}`);
  });

  it('should format standard home delivery message when order.deliverySelection.type is home_delivery', () => {
    const whatsappUrl = component.getWhatsappUrl(mockOrderHomeDelivery);
    const expectedMessageText =
      'Hola! Hice el pedido #ORD-1002 y quisiera coordinar el envío a domicilio.';
    const expectedEncoded = encodeURIComponent(expectedMessageText);

    expect(whatsappUrl).toBe(`https://wa.me/5491198765432?text=${expectedEncoded}`);
  });

  it('should format standard home delivery message when order is legacy (deliverySelection is undefined)', () => {
    const whatsappUrl = component.getWhatsappUrl(mockOrderLegacy);
    const expectedMessageText =
      'Hola! Hice el pedido #ORD-1003 y quisiera coordinar el envío a domicilio.';
    const expectedEncoded = encodeURIComponent(expectedMessageText);

    expect(whatsappUrl).toBe(`https://wa.me/5491198765432?text=${expectedEncoded}`);
  });

  it('should properly encode URL parameters using encodeURIComponent', () => {
    const whatsappUrl = component.getWhatsappUrl(mockOrderPickup);
    const rawMessageText =
      'Hola! Hice el pedido #ORD-1001 para retirar por el local (Sucursal Belgrano - Av. Cabildo 2000, CABA). ¿Cuándo puedo pasar a buscarlo?';
    const encoded = encodeURIComponent(rawMessageText);

    expect(whatsappUrl).toContain(`text=${encoded}`);
    expect(whatsappUrl.includes(' ')).toBeFalse();
  });
});
