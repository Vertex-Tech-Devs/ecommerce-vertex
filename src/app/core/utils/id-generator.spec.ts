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

  it('should fallback to Math.random when crypto.getRandomValues is unavailable', () => {
    const origCrypto = window.crypto;
    try {
      Object.defineProperty(window, 'crypto', {
        value: undefined,
        writable: true,
        configurable: true,
      });
      const id = generateShortId(6);
      expect(id.length).toBe(6);
    } finally {
      Object.defineProperty(window, 'crypto', {
        value: origCrypto,
        writable: true,
        configurable: true,
      });
    }
  });
});
