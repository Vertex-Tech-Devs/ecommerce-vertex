/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

/**
 * Example Unit Test for Component
 * 
 * Pattern to follow for component tests:
 * 1. Create component fixture
 * 2. Test initial state
 * 3. Test user interactions
 * 4. Test data binding
 * 5. Verify template rendering
 */

xdescribe('ExampleProductListComponent', () => {
  let component: any;
  let fixture: ComponentFixture<any>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [ProductListComponent],
      // providers: [ProductService]
    }).compileComponents();

    fixture = TestBed.createComponent(Object);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  // ✅ Example: Test component initialization
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Example: Test initial state
  it('should have empty products list on init', () => {
    fixture.detectChanges();
    // Verify initial state
    expect(true).toBe(true); // Replace with actual assertion
  });

  // ✅ Example: Test template rendering
  it('should render product list', () => {
    component.products = [
      { id: '1', name: 'Product 1', price: 100 },
      { id: '2', name: 'Product 2', price: 200 },
    ];
    fixture.detectChanges();

    // Query for rendered elements
    const items = compiled.queryAll(By.css('[data-cy="product-item"]'));
    expect(items.length).toBeGreaterThanOrEqual(0); // Adapt to actual template
  });

  // ✅ Example: Test user interaction
  it('should add product to cart on click', () => {
    component.products = [{ id: '1', name: 'Product 1', price: 100 }];
    fixture.detectChanges();

    // Simulate user interaction
    const addButton = compiled.query(By.css('[data-cy="add-to-cart"]'));
    if (addButton) {
      addButton.nativeElement.click();
      fixture.detectChanges();
      // Verify state changed
    }
  });

  // ✅ Example: Test data binding
  it('should display product name correctly', () => {
    component.product = { name: 'Test Product', price: 100 };
    fixture.detectChanges();

    const nameElement = compiled.query(By.css('[data-cy="product-name"]'));
    if (nameElement) {
      expect(nameElement.nativeElement.textContent).toContain('Test Product');
    }
  });

  // ✅ Example: Test input/output
  it('should emit event when product selected', () => {
    spyOn(component.productSelected, 'emit');
    component.selectProduct({ id: '1', name: 'Product' });
    expect(component.productSelected.emit).toHaveBeenCalledWith({ id: '1', name: 'Product' });
  });
});
