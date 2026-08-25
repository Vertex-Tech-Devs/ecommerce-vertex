import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string when value is null, undefined, or empty', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as unknown as string)).toBe('');
    expect(pipe.transform(undefined as unknown as string)).toBe('');
  });

  it('should return original string if length is less than or equal to default limit (50)', () => {
    const text = 'Este es un texto corto';
    expect(pipe.transform(text)).toBe(text);
  });

  it('should truncate string and append default ellipsis (...) when length exceeds default limit', () => {
    const longText = 'a'.repeat(60);
    const expected = 'a'.repeat(50) + '...';
    expect(pipe.transform(longText)).toBe(expected);
  });

  it('should truncate string using custom limit and custom ellipsis', () => {
    const text = 'Angular Standalone Signals';
    expect(pipe.transform(text, 7, '---')).toBe('Angular---');
  });
});
