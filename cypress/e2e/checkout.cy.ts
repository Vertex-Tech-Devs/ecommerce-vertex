/**
 * Shopping Cart & Checkout Flow E2E Test
 * 
 * Tests the complete purchase flow:
 * 1. Browse products
 * 2. Add items to cart
 * 3. View cart
 * 4. Proceed to checkout
 * 5. Enter shipping info
 * 6. Process payment
 * 7. Order confirmation
 */

describe('Shopping & Checkout Flow', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'TestPassword123!'); // Custom command
    cy.visit('/shop');
  });

  // ✅ Test: Browse products
  it('should display product catalog', () => {
    cy.get('[data-cy="product-grid"]').should('be.visible');
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);

    // Verify product details
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="product-name"]').should('be.visible');
      cy.get('[data-cy="product-price"]').should('be.visible');
      cy.get('[data-cy="add-to-cart-btn"]').should('be.visible');
    });
  });

  // ✅ Test: Add items to cart
  it('should add product to cart', () => {
    // Get initial cart count
    cy.get('[data-cy="cart-badge"]').then(($badge) => {
      const initialCount = parseInt($badge.text() || '0');

      // Add product to cart
      cy.get('[data-cy="product-card"]').first().within(() => {
        cy.get('[data-cy="add-to-cart-btn"]').click();
      });

      // Verify cart count increased
      cy.get('[data-cy="cart-badge"]').should('contain', initialCount + 1);

      // Verify success message
      cy.get('[data-cy="success-message"]').should('be.visible');
      cy.get('[data-cy="success-message"]').should('contain', 'Added to cart');
    });
  });

  // ✅ Test: View and modify cart
  it('should display cart with correct items', () => {
    // Add multiple products
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click();
    });

    // Navigate to cart
    cy.get('[data-cy="cart-icon"]').click();

    // Verify cart page
    cy.location('pathname').should('eq', '/cart');
    cy.get('[data-cy="cart-items"]').should('be.visible');
    cy.get('[data-cy="cart-item"]').should('have.length', 1);

    // Verify totals
    cy.get('[data-cy="subtotal"]').should('be.visible');
    cy.get('[data-cy="tax"]').should('be.visible');
    cy.get('[data-cy="total"]').should('be.visible');
  });

  // ✅ Test: Proceed to checkout
  it('should proceed to checkout with items in cart', () => {
    // Add product
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click();
    });

    // Navigate to cart
    cy.get('[data-cy="cart-icon"]').click();

    // Click checkout
    cy.get('[data-cy="checkout-btn"]').click();

    // Verify checkout page
    cy.location('pathname').should('eq', '/checkout');
    cy.get('[data-cy="shipping-form"]').should('be.visible');
  });

  // ✅ Test: Enter shipping info
  it('should fill shipping information', () => {
    // Setup: Add product and go to checkout
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click();
    });
    cy.get('[data-cy="cart-icon"]').click();
    cy.get('[data-cy="checkout-btn"]').click();

    // Fill shipping form
    cy.get('[data-cy="street-input"]').type('123 Main St');
    cy.get('[data-cy="city-input"]').type('New York');
    cy.get('[data-cy="state-select"]').select('NY');
    cy.get('[data-cy="zip-input"]').type('10001');

    // Verify form is valid
    cy.get('[data-cy="shipping-errors"]').should('not.exist');
  });

  // ✅ Test: Process payment
  it('should process payment and create order', () => {
    // Setup: Add product and reach checkout
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click();
    });
    cy.get('[data-cy="cart-icon"]').click();
    cy.get('[data-cy="checkout-btn"]').click();

    // Fill shipping
    cy.get('[data-cy="street-input"]').type('123 Main St');
    cy.get('[data-cy="city-input"]').type('New York');
    cy.get('[data-cy="state-select"]').select('NY');
    cy.get('[data-cy="zip-input"]').type('10001');

    // Proceed to payment
    cy.get('[data-cy="next-payment-btn"]').click();

    // Fill payment (mock)
    cy.get('[data-cy="card-number"]').type('4111111111111111');
    cy.get('[data-cy="card-expiry"]').type('12/25');
    cy.get('[data-cy="card-cvc"]').type('123');

    // Submit payment
    cy.get('[data-cy="pay-btn"]').click();

    // Verify success
    cy.get('[data-cy="confirmation-page"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('be.visible');
    cy.get('[data-cy="success-message"]').should('contain', 'Order placed');
  });

  // ✅ Test: Order confirmation
  it('should display order confirmation details', () => {
    // Complete purchase first
    cy.login('test@example.com', 'TestPassword123!');
    cy.visit('/shop');
    
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="add-to-cart-btn"]').click();
    });
    cy.get('[data-cy="cart-icon"]').click();
    cy.get('[data-cy="checkout-btn"]').click();

    // Navigate to confirmation (should be automatic after payment)
    cy.location('pathname').should('include', '/confirmation');

    // Verify all details
    cy.get('[data-cy="order-number"]').should('be.visible');
    cy.get('[data-cy="order-items"]').should('be.visible');
    cy.get('[data-cy="order-total"]').should('be.visible');
    cy.get('[data-cy="shipping-address"]').should('be.visible');
    cy.get('[data-cy="estimated-delivery"]').should('be.visible');
  });
});
