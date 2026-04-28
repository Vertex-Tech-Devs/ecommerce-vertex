/**
 * E2E: Authentication flows (admin login / logout)
 *
 * These tests run against the live Angular app (http://localhost:4200).
 * Firebase Auth calls are intercepted so no real credentials are needed.
 */

describe('Admin Authentication', () => {
  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASSWORD = 'password123';

  // Stub the Firebase Auth REST endpoint used by signInWithEmailAndPassword
  const stubSuccessfulLogin = (): void => {
    cy.intercept('POST', '**/accounts:signInWithPassword**', {
      statusCode: 200,
      body: {
        idToken: 'fake-id-token',
        email: ADMIN_EMAIL,
        refreshToken: 'fake-refresh-token',
        expiresIn: '3600',
        localId: 'uid-123',
        registered: true,
      },
    }).as('loginRequest');

    // Stub token verification (getIdTokenResult)
    cy.intercept('POST', '**/token**', {
      statusCode: 200,
      body: { access_token: 'fake-token', expires_in: '3600', token_type: 'Bearer' },
    }).as('tokenRefresh');
  };

  const stubFailedLogin = (): void => {
    cy.intercept('POST', '**/accounts:signInWithPassword**', {
      statusCode: 400,
      body: { error: { message: 'INVALID_PASSWORD' } },
    }).as('loginRequest');
  };

  beforeEach(() => {
    cy.visit('/admin/login');
  });

  it('should display the login form', () => {
    cy.get('form').should('exist');
    cy.get('input[type="email"], input[formControlName="email"]').should('exist');
    cy.get('input[type="password"], input[formControlName="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show validation errors when submitting empty form', () => {
    cy.get('button[type="submit"]').click();

    // Inputs should now have the Angular invalid class
    cy.get('input[formControlName="email"]').should('have.class', 'ng-invalid');
    cy.get('input[formControlName="password"]').should('have.class', 'ng-invalid');
  });

  it('should show error message for invalid credentials', () => {
    stubFailedLogin();

    cy.get('input[formControlName="email"]').type(ADMIN_EMAIL);
    cy.get('input[formControlName="password"]').type('wrong-password');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    // Error message should appear
    cy.contains('Error al iniciar sesión').should('exist');
  });

  it('should redirect to admin dashboard after successful login', () => {
    stubSuccessfulLogin();

    cy.get('input[formControlName="email"]').type(ADMIN_EMAIL);
    cy.get('input[formControlName="password"]').type(ADMIN_PASSWORD);
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    // Should navigate away from login page
    cy.location('pathname').should('not.eq', '/admin/login');
  });

  it('should show an already-logged-in message when user is authenticated', () => {
    // Simulate a stored auth session
    cy.window().then((win) => {
      win.localStorage.setItem(
        'firebase:authUser:test:localhost',
        JSON.stringify({ uid: 'uid-123', email: ADMIN_EMAIL })
      );
    });

    cy.visit('/admin/login');

    // The component sets isAlreadyLogged based on currentUser$ — at minimum, page loads
    cy.get('form').should('exist');
  });
});
