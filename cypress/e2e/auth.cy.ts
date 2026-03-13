/**
 * Login Flow E2E Test
 * 
 * Tests the complete authentication flow:
 * 1. User navigates to login page
 * 2. Enters credentials
 * 3. Submits form
 * 4. Redirected to dashboard
 * 5. Dashboard loads with user data
 */

describe('Authentication Flow', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'TestPassword123!',
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  // ✅ Test: Login page loads
  it('should display login form', () => {
    cy.get('[data-cy="login-form"]').should('be.visible');
    cy.get('[data-cy="email-input"]').should('exist');
    cy.get('[data-cy="password-input"]').should('exist');
    cy.get('[data-cy="submit-btn"]').should('exist');
  });

  // ✅ Test: Successful login
  it('should log in user successfully', () => {
    cy.get('[data-cy="email-input"]').type(testUser.email);
    cy.get('[data-cy="password-input"]').type(testUser.password);
    cy.get('[data-cy="submit-btn"]').click();

    // Verify redirect to dashboard
    cy.location('pathname').should('eq', '/dashboard');

    // Verify dashboard loads
    cy.get('[data-cy="user-welcome"]').should('be.visible');
    cy.get('[data-cy="user-email"]').should('contain', testUser.email);
  });

  // ✅ Test: Invalid credentials
  it('should show error for invalid credentials', () => {
    cy.get('[data-cy="email-input"]').type('wrong@example.com');
    cy.get('[data-cy="password-input"]').type('WrongPassword');
    cy.get('[data-cy="submit-btn"]').click();

    // Verify error message
    cy.get('[data-cy="error-message"]').should('be.visible');
    cy.get('[data-cy="error-message"]').should('contain', 'Invalid credentials');

    // Should remain on login page
    cy.location('pathname').should('eq', '/login');
  });

  // ✅ Test: Validation messages
  it('should show validation errors for empty fields', () => {
    cy.get('[data-cy="submit-btn"]').click();

    // Verify validation messages
    cy.get('[data-cy="email-error"]').should('be.visible');
    cy.get('[data-cy="password-error"]').should('be.visible');
  });

  // ✅ Test: Logout
  it('should log out user and redirect to login', () => {
    // First login
    cy.login(testUser.email, testUser.password); // Custom command

    // Verify logged in
    cy.location('pathname').should('eq', '/dashboard');

    // Click logout
    cy.get('[data-cy="logout-btn"]').click();

    // Verify redirect to login
    cy.location('pathname').should('eq', '/login');
  });
});
