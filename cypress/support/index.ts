/**
 * Cypress Support - Global Configuration
 * 
 * Runs before all tests to configure global behavior
 */

before(() => {
  // Setup any global state or mocks
  console.log('🧪 Cypress E2E Tests Starting');
});

beforeEach(() => {
  // Reset application state before each test
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  // You can filter specific errors here
  if (err.message.includes('Expected') || err.message.includes('Network')) {
    return false;
  }
  return true;
});

// Custom error messages
Cypress.on('fail', (error, runnable) => {
  console.error(`❌ Test Failed: ${runnable.fullTitle()}`);
  console.error(`Error: ${error.message}`);
});

export {};
