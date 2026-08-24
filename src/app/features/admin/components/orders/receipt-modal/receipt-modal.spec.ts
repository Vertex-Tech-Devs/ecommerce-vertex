import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { ReceiptModal } from './receipt-modal';
import { StoreConfigService } from '@core/services/store-config.service';
import type { Order } from '@core/models/order.model';

describe('ReceiptModal', () => {
  let component: ReceiptModal;
  let fixture: ComponentFixture<ReceiptModal>;

  const makeOrder = (): Order =>
    ({
      id: 'ABC12345',
      userId: 'u1',
      clientName: 'Juan',
      clientEmail: 'j@x.com',
      clientPhone: '54911',
      orderDate: new Date('2026-01-01T00:00:00Z'),
      total: 350,
      status: 'delivered',
      items: [
        {
          productId: 'p1',
          variantId: 'v1',
          productName: 'Prod',
          quantity: 2,
          price: 100,
          productImage: '',
          attributes: {},
        },
        {
          productId: 'p2',
          variantId: 'v2',
          productName: 'Prod2',
          quantity: 3,
          price: 50,
          productImage: '',
          attributes: {},
        },
      ],
      paymentDetails: {
        paymentMethod: 'Mercado Pago',
        subtotal: 350,
        shippingCost: 0,
        taxAmount: 0,
      },
      shippingAddress: { street: 'x', city: 'y', state: 'z', zipCode: '0000', country: 'AR' },
      stockDecremented: true,
    }) as Order;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptModal],
      providers: [
        provideNoopAnimations(),
        {
          provide: StoreConfigService,
          useValue: { storeName: signal('Mi Tienda'), logoUrl: signal('https://x.com/logo.png') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiptModal);
    component = fixture.componentInstance;
    component.order = makeOrder();
    fixture.detectChanges();
  });

  it('should render the store name and order id', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Mi Tienda');
    expect(el.textContent).toContain('ABC12345');
  });

  it('getItemSubtotal() should compute price * quantity', () => {
    const item = makeOrder().items[0];
    expect(component.getItemSubtotal(item)).toBe(200);
  });

  it('printReceipt() should call window.print', () => {
    spyOn(window, 'print');
    component.printReceipt();
    expect(window.print).toHaveBeenCalled();
  });
});
