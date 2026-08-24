import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import * as firestore from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';
import { OrderService, generateShortOrderId } from './order.service';
import type { Order } from '../models/order.model';

describe('generateShortOrderId', () => {
  it('should generate an 8-char id from the safe alphabet', () => {
    const id = generateShortOrderId();
    expect(id).toMatch(/^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{8}$/);
  });

  it('should generate unique ids', () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateShortOrderId()));
    expect(ids.size).toBe(50);
  });

  it('should not contain ambiguous characters (0,O,1,I,L)', () => {
    for (let i = 0; i < 20; i++) {
      const id = generateShortOrderId();
      expect(id).not.toMatch(/[01OIL]/);
    }
  });
});

describe('OrderService', () => {
  let service: OrderService;
  let firestoreServiceSpy: jasmine.SpyObj<FirestoreService<Order>>;

  const makeOrder = (overrides: Partial<Order> = {}): Order =>
    ({
      id: 'ABC12345',
      userId: 'anonymous-user',
      clientName: 'Juan Pérez',
      clientEmail: 'juan@example.com',
      clientPhone: '54911',
      orderDate: new Date('2026-01-01T00:00:00Z'),
      total: 1000,
      status: 'pending',
      items: [],
      paymentDetails: {
        paymentMethod: 'Mercado Pago',
        subtotal: 1000,
        shippingCost: 0,
        taxAmount: 0,
      },
      shippingAddress: { street: 'x', city: 'y', state: 'z', zipCode: '0000', country: 'AR' },
      stockDecremented: false,
      ...overrides,
    }) as Order;

  beforeEach(() => {
    firestoreServiceSpy = jasmine.createSpyObj('FirestoreService', [
      'getAll',
      'get',
      'create',
      'update',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [
        OrderService,
        { provide: FirestoreService, useValue: firestoreServiceSpy },
        { provide: firestore.Firestore, useValue: {} },
      ],
    });

    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getOrders() should sort by orderDate desc', () => {
    const older = makeOrder({ id: 'A', orderDate: new Date('2025-01-01') });
    const newer = makeOrder({ id: 'B', orderDate: new Date('2026-01-01') });
    firestoreServiceSpy.getAll.and.returnValue(of([older, newer]));

    service.getOrders().subscribe((result) => {
      expect(result.map((o) => o.id)).toEqual(['B', 'A']);
    });
    expect(firestoreServiceSpy.getAll).toHaveBeenCalledWith('orders');
  });

  it('getOrderById() should delegate to firestoreService.get', () => {
    firestoreServiceSpy.get.and.returnValue(of(makeOrder({ id: 'ABC12345' })));
    service.getOrderById('ABC12345').subscribe((result) => {
      expect(result?.id).toBe('ABC12345');
    });
    expect(firestoreServiceSpy.get).toHaveBeenCalledWith('orders', 'ABC12345');
  });

  it('updateOrder() should delegate to firestoreService.update', async () => {
    firestoreServiceSpy.update.and.returnValue(Promise.resolve());
    await service.updateOrder('ABC12345', { status: 'delivered' });
    expect(firestoreServiceSpy.update).toHaveBeenCalledWith('orders', 'ABC12345', {
      status: 'delivered',
    });
  });

  it('deleteOrder() should delegate to firestoreService.delete', async () => {
    firestoreServiceSpy.delete.and.returnValue(Promise.resolve());
    await service.deleteOrder('ABC12345');
    expect(firestoreServiceSpy.delete).toHaveBeenCalledWith('orders', 'ABC12345');
  });
});
