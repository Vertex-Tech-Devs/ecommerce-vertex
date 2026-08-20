import { generateShortId } from './id-generator';

describe('generateShortId', () => {
  it('should generate an ID of default length 8', () => {
    const id = generateShortId();
    expect(id).toBeDefined();
    expect(id.length).toBe(8);
  });

  it('should generate an ID of custom length 7', () => {
    const id = generateShortId(7);
    expect(id.length).toBe(7);
  });

  it('should generate unique IDs', () => {
    const set = new Set<string>();
    for (let i = 0; i < 100; i++) {
      set.add(generateShortId());
    }
    expect(set.size).toBe(100);
  });

  it('should only contain safe alphanumeric characters', () => {
    const safeRegex = /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz]+$/;
    for (let i = 0; i < 50; i++) {
      const id = generateShortId();
      expect(safeRegex.test(id)).toBeTrue();
    }
  });
});
