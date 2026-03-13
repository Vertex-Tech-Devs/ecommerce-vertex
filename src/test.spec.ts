/// <reference types="jasmine" />

/**
 * Basic smoke test to verify testing infrastructure is working
 * 
 * Every feature module should have similar test patterns.
 * Use this as a reference for creating tests in your application.
 */

describe('Testing Infrastructure', () => {
  it('should setup testing correctly', () => {
    expect(true).toBe(true);
  });

  it('should have access to jasmine matchers', () => {
    const testValue = 42;
    expect(testValue).toEqual(42);
    expect(testValue).toBeDefined();
    expect(testValue).not.toBeNull();
  });
});
