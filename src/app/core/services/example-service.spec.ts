import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

/**
 * Example Unit Test for Service
 * 
 * Pattern to follow for all services:
 * 1. Setup TestBed with required dependencies
 * 2. Test each method with success and error scenarios
 * 3. Verify HTTP calls, data transformation, error handling
 * 4. Use mocks for external dependencies
 */

describe('ExampleProductService', () => {
  let httpClientSpy: HttpClientTestingModule;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // ✅ Example: Test successful API call
  it('should fetch products successfully', () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 100 },
      { id: '2', name: 'Product 2', price: 200 },
    ];

    // This is an example - adapt to your actual service
    expect(mockProducts.length).toBe(2);
  });

  // ✅ Example: Test data transformation
  it('should transform product data correctly', () => {
    const rawData = { id: '1', name: 'Test', price: '100' };
    const expected = { id: '1', name: 'Test', price: 100 };

    expect(rawData.price).toEqual('100');
    // Verify transformation logic
  });

  // ✅ Example: Test error handling
  it('should handle API errors gracefully', () => {
    const errorMessage = 'Failed to fetch products';
    expect(errorMessage).toBeDefined();
  });
});
