/// <reference types="cypress" />

// Block all outbound Firebase/Google API calls before every test.
// This ensures Angular boots instantly in CI (no waiting for unreachable backends).
// Individual tests register their own cy.intercept() calls, which take precedence
// over this global stub because Cypress matches interceptors in LIFO order.
beforeEach(() => {
  cy.intercept('**/googleapis.com/**', { statusCode: 401, body: {} });
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const FIREBASE_API_KEY = 'AIzaSyCmADhCFtiRKHz3ICFZo0rmWqXJ5e-ONFg';

function buildAdminJwt(projectId: string = 'vertex-platform-dev'): string {
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: 'test-uid-admin',
      email: 'admin@tienda.test',
      name: 'Admin Test',
      admin: true,
      iss: `https://securetoken.google.com/${projectId}`,
      aud: projectId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    })
  );
  return `${header}.${payload}.fake-signature`;
}

// ✅ Custom command: Login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-cy="email-input"]').type(email);
  cy.get('[data-cy="password-input"]').type(password);
  cy.get('[data-cy="submit-btn"]').click();
  cy.location('pathname').should('eq', '/dashboard');
});

// ✅ Custom command: Logout
Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="user-menu"]').click();
  cy.get('[data-cy="logout-btn"]').click();
  cy.location('pathname').should('eq', '/login');
});

// ✅ Custom command: Add product to cart
Cypress.Commands.add('addToCart', (productId: string) => {
  cy.get(`[data-cy="product-${productId}"]`).within(() => {
    cy.get('[data-cy="add-to-cart-btn"]').click();
  });
  cy.get('[data-cy="success-message"]').should('be.visible');
});

// ✅ Custom command: Navigate to checkout
Cypress.Commands.add('goToCheckout', () => {
  cy.get('[data-cy="cart-icon"]').click();
  cy.get('[data-cy="checkout-btn"]').click();
  cy.location('pathname').should('eq', '/checkout');
});

// ✅ Custom command: Fill shipping form
Cypress.Commands.add('fillShippingForm', (shippingData: any) => {
  cy.get('[data-cy="street-input"]').type(shippingData.street);
  cy.get('[data-cy="city-input"]').type(shippingData.city);
  cy.get('[data-cy="state-select"]').select(shippingData.state);
  cy.get('[data-cy="zip-input"]').type(shippingData.zip);
});

// ✅ Custom command: Fill payment form
Cypress.Commands.add('fillPaymentForm', (paymentData: any) => {
  cy.get('[data-cy="card-number"]').type(paymentData.cardNumber);
  cy.get('[data-cy="card-expiry"]').type(paymentData.expiry);
  cy.get('[data-cy="card-cvc"]').type(paymentData.cvc);
});

// ✅ Custom command: Check API response
import type { Method } from 'cypress/types/net-stubbing';

Cypress.Commands.add('interceptAPI', (method: Method, pattern: string, fixture: string) => {
  cy.intercept(method, pattern, { fixture });
});

/**
 * cy.loginAsAdmin()
 *
 * Seeds localStorage with a fake Firebase admin user and intercepts
 * all token/claim calls so the AdminGuard passes without a real backend.
 */
Cypress.Commands.add('loginAsAdmin', () => {
  const localToken = buildAdminJwt('vertex-platform-dev');
  const ciToken = buildAdminJwt('ci-stub');

  const localUserData = JSON.stringify({
    uid: 'test-uid-admin',
    email: 'admin@tienda.test',
    displayName: 'Admin Test',
    emailVerified: true,
    isAnonymous: false,
    providerData: [
      {
        providerId: 'google.com',
        uid: 'admin@tienda.test',
        email: 'admin@tienda.test',
        displayName: 'Admin Test',
        photoURL: null,
      },
    ],
    stsTokenManager: {
      refreshToken: 'fake-refresh-token',
      accessToken: localToken,
      expirationTime: Date.now() + 3_600_000,
    },
    createdAt: '1700000000000',
    lastLoginAt: String(Date.now()),
  });

  const ciUserData = JSON.stringify({
    uid: 'test-uid-admin',
    email: 'admin@tienda.test',
    displayName: 'Admin Test',
    emailVerified: true,
    isAnonymous: false,
    providerData: [
      {
        providerId: 'google.com',
        uid: 'admin@tienda.test',
        email: 'admin@tienda.test',
        displayName: 'Admin Test',
        photoURL: null,
      },
    ],
    stsTokenManager: {
      refreshToken: 'fake-refresh-token',
      accessToken: ciToken,
      expirationTime: Date.now() + 3_600_000,
    },
    createdAt: '1700000000000',
    lastLoginAt: String(Date.now()),
  });

  window.localStorage.setItem(`firebase:authUser:${FIREBASE_API_KEY}:[DEFAULT]`, localUserData);
  window.localStorage.setItem('firebase:authUser:test:[DEFAULT]', ciUserData);

  cy.intercept('POST', `**/token?key=*`, (req) => {
    const isCI = req.url.includes('key=test');
    const projectId = isCI ? 'ci-stub' : 'vertex-platform-dev';
    req.reply({
      statusCode: 200,
      body: {
        id_token: buildAdminJwt(projectId),
        refresh_token: 'fake-refresh',
        expires_in: '3600',
        token_type: 'Bearer',
      },
    });
  }).as('tokenRefresh');

  cy.intercept('POST', '**/accounts:lookup*', {
    statusCode: 200,
    body: {
      users: [
        {
          localId: 'test-uid-admin',
          email: 'admin@tienda.test',
          displayName: 'Admin Test',
          customAttributes: JSON.stringify({ admin: true }),
        },
      ],
    },
  }).as('accountLookup');
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      logout(): Chainable<void>;
      addToCart(productId: string): Chainable<void>;
      goToCheckout(): Chainable<void>;
      fillShippingForm(data: any): Chainable<void>;
      fillPaymentForm(data: any): Chainable<void>;
      interceptAPI(method: Method, pattern: string, fixture: string): Chainable<void>;
      loginAsAdmin(): Chainable<void>;
    }
  }
}

export {};
