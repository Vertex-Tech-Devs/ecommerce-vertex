import { SumItemsPipe } from './sum-items.pipe';
import type { OrderItem } from '@core/models/order.model';

describe('SumItemsPipe', () => {
  let pipe: SumItemsPipe;

  beforeEach(() => {
    pipe = new SumItemsPipe();
  });

  const item = (price: number, quantity: number): OrderItem =>
    ({
      productId: 'p1',
      variantId: 'v1',
      productName: 'Prod',
      quantity,
      price,
      productImage: '',
      attributes: {},
    }) as OrderItem;

  it('should return 0 for undefined or empty items', () => {
    expect(pipe.transform(undefined, 'price', 'quantity')).toBe(0);
    expect(pipe.transform([], 'price', 'quantity')).toBe(0);
  });

  it('should sum price * quantity', () => {
    const total = pipe.transform([item(100, 2), item(50, 3)], 'price', 'quantity');
    expect(total).toBe(350);
  });

  it('should skip non-numeric values with a warning', () => {
    spyOn(console, 'warn');
    const bad = { ...item(100, 2), price: 'abc' as unknown as number };
    const total = pipe.transform([bad, item(10, 1)], 'price', 'quantity');
    expect(total).toBe(10);
    expect(console.warn).toHaveBeenCalled();
  });
});
