import { generateShortOrderId } from './order.service';

describe('generateShortOrderId', () => {
  it('should generate an 8-char id from the safe alphabet', () => {
    const id = generateShortOrderId();
    expect(id).toMatch(/^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{8}$/);
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
