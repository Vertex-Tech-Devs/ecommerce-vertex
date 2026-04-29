import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartService } from './cart.service';
import { SweetAlertService } from './sweet-alert.service';
import { AttributeService } from './attribute.service';
import type { Product, ProductVariant } from '@core/models/product.model';

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 'prod-1',
  name: 'Test Product',
  description: 'A product',
  price: 100,
  categoryId: 'cat-1',
  image: 'https://example.com/img.jpg',
  images: [],
  variantAttributes: [],
  totalStock: 10,
  inStockAttributes: {},
  createdAt: new Date(),
  ...overrides,
});

const makeVariant = (overrides: Partial<ProductVariant> = {}): ProductVariant => ({
  id: 'var-1',
  productId: 'prod-1',
  attributes: { color: 'Red' },
  stock: 10,
  ...overrides,
});

describe('CartService', () => {
  let service: CartService;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;
  let attributeServiceSpy: jasmine.SpyObj<AttributeService>;

  beforeEach(() => {
    localStorage.clear();

    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['success', 'error']);
    attributeServiceSpy = jasmine.createSpyObj('AttributeService', ['getAttributes']);
    attributeServiceSpy.getAttributes.and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: SweetAlertService, useValue: sweetAlertSpy },
        { provide: AttributeService, useValue: attributeServiceSpy },
      ],
    });

    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty cart', () => {
    expect(service.cart().items).toEqual([]);
    expect(service.cart().total).toBe(0);
    expect(service.itemCount()).toBe(0);
  });

  describe('addItem()', () => {
    it('should add a new item to the cart', () => {
      service.addItem(makeProduct(), makeVariant(), 1);

      expect(service.cart().items.length).toBe(1);
      expect(service.cart().items[0].productId).toBe('prod-1');
      expect(service.cart().items[0].quantity).toBe(1);
    });

    it('should calculate the total correctly', () => {
      service.addItem(makeProduct({ price: 50 }), makeVariant(), 3);

      expect(service.cart().total).toBe(150);
    });

    it('should increase quantity when same variant is added again', () => {
      service.addItem(makeProduct(), makeVariant(), 2);
      service.addItem(makeProduct(), makeVariant(), 3);

      expect(service.cart().items.length).toBe(1);
      expect(service.cart().items[0].quantity).toBe(5);
    });

    it('should show error and not add item when quantity exceeds stock', () => {
      service.addItem(makeProduct(), makeVariant({ stock: 2 }), 5);

      expect(service.cart().items).toEqual([]);
      expect(sweetAlertSpy.error).toHaveBeenCalled();
    });

    it('should update itemCount computed signal', () => {
      service.addItem(makeProduct(), makeVariant(), 4);
      expect(service.itemCount()).toBe(4);
    });
  });

  describe('removeItem()', () => {
    it('should remove the item from the cart', () => {
      service.addItem(makeProduct(), makeVariant(), 1);
      service.removeItem('var-1');

      expect(service.cart().items).toEqual([]);
      expect(service.cart().total).toBe(0);
    });

    it('should show success alert when removing', () => {
      service.addItem(makeProduct(), makeVariant(), 1);
      service.removeItem('var-1');

      // 1 for addItem + 1 for removeItem
      expect(sweetAlertSpy.success).toHaveBeenCalledTimes(2);
    });
  });

  describe('updateQuantity()', () => {
    it('should update quantity of an existing item', () => {
      service.addItem(makeProduct({ price: 10 }), makeVariant(), 1);
      service.updateQuantity('var-1', 5);

      expect(service.cart().items[0].quantity).toBe(5);
      expect(service.cart().total).toBe(50);
    });

    it('should cap quantity at available stock', () => {
      service.addItem(makeProduct(), makeVariant({ stock: 3 }), 1);
      service.updateQuantity('var-1', 10);

      expect(service.cart().items[0].quantity).toBe(3);
      expect(sweetAlertSpy.error).toHaveBeenCalled();
    });

    it('should enforce minimum quantity of 1', () => {
      service.addItem(makeProduct(), makeVariant(), 3);
      service.updateQuantity('var-1', 0);

      expect(service.cart().items[0].quantity).toBe(1);
    });
  });

  describe('clearCart()', () => {
    it('should empty the cart completely', () => {
      service.addItem(makeProduct(), makeVariant(), 2);
      service.clearCart();

      expect(service.cart().items).toEqual([]);
      expect(service.cart().total).toBe(0);
      expect(service.itemCount()).toBe(0);
    });
  });

  describe('localStorage persistence', () => {
    it('should persist the cart to localStorage on changes', () => {
      service.addItem(makeProduct(), makeVariant(), 1);
      TestBed.flushEffects();

      const stored = localStorage.getItem('my_cart');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.items.length).toBe(1);
    });

    it('should load the cart from localStorage on init', () => {
      const cart = { items: [{ id: 'var-1', quantity: 2, price: 50 }], total: 100 };
      localStorage.setItem('my_cart', JSON.stringify(cart));

      // Re-create service to trigger constructor load
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          CartService,
          { provide: SweetAlertService, useValue: sweetAlertSpy },
          { provide: AttributeService, useValue: attributeServiceSpy },
        ],
      });
      const newService = TestBed.inject(CartService);

      expect(newService.cart().items.length).toBe(1);
    });
  });
});
