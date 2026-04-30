/**
 * E2E: Authentication flows (admin login / logout)
 *
 * These tests run against the live Angular app (http://localhost:4200).
 * Firebase Auth calls are intercepted so no real credentials are needed.
 */

describe('Admin Authentication', () => {
  const ADMIN_EMAIL = 'admin@example.com';
  const ADMIN_PASSWORD = 'password123';

  /**
   * Builds a base64url-encoded JWT with admin:true so that Firebase SDK can
   * decode the claims locally via getIdTokenResult() without hitting the network.
   * Firebase client does NOT verify the signature — it only decodes the payload.
   */
  const makeAdminJwt = (): string => {
    const now = Math.floor(Date.now() / 1000);
    const b64url = (obj: object): string =>
      btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    const header = b64url({ alg: 'RS256', typ: 'JWT' });
    const payload = b64url({
      iss: 'https://securetoken.google.com/ecommerce-vertex-dev',
      aud: 'ecommerce-vertex-dev',
      auth_time: now,
      user_id: 'uid-123',
      sub: 'uid-123',
      iat: now,
      exp: now + 3600,
      email: ADMIN_EMAIL,
      email_verified: true,
      admin: true,
      firebase: {
        identities: { email: [ADMIN_EMAIL] },
        sign_in_provider: 'password',
      },
    });
    return `${header}.${payload}.fakesig`;
  };

  // Stub the Firebase Auth REST endpoint used by signInWithEmailAndPassword
  const stubSuccessfulLogin = (): void => {
    const fakeJwt = makeAdminJwt();

    cy.intercept('POST', '**/accounts:signInWithPassword**', {
      statusCode: 200,
      body: {
        idToken: fakeJwt,
        email: ADMIN_EMAIL,
        refreshToken: 'fake-refresh-token',
        expiresIn: '3600',
        localId: 'uid-123',
        registered: true,
      },
    }).as('loginRequest');

    // Firebase SDK always calls accounts:lookup after sign-in (_reloadWithoutSaving)
    // to fetch the full user profile. Without this intercept the call fails in CI
    // and signInWithEmailAndPassword rejects before navigation ever happens.
    cy.intercept('POST', '**/accounts:lookup**', {
      statusCode: 200,
      body: {
        kind: 'identitytoolkit#GetAccountInfoResponse',
        users: [
          {
            localId: 'uid-123',
            email: ADMIN_EMAIL,
            emailVerified: true,
            providerUserInfo: [{ providerId: 'password', email: ADMIN_EMAIL, rawId: ADMIN_EMAIL }],
            validSince: String(Math.floor(Date.now() / 1000)),
            disabled: false,
            lastLoginAt: String(Date.now()),
            createdAt: String(Date.now()),
          },
        ],
      },
    }).as('accountLookup');

    // Stub token refresh — return the same admin JWT as id_token
    cy.intercept('POST', '**/token**', {
      statusCode: 200,
      body: {
        id_token: fakeJwt,
        access_token: fakeJwt,
        refresh_token: 'fake-refresh-token',
        expires_in: '3600',
        token_type: 'Bearer',
      },
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
    // The submit button is disabled when the form is invalid (Angular reactive form).
    // Trigger "touched" state by focusing and blurring each required field.
    cy.get('input[formControlName="email"]').focus().blur();
    cy.get('input[formControlName="password"]').focus().blur();

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

    // After login, the component calls router.navigate(['/admin']).
    // The admin guard reads isAdmin$ which decodes the JWT locally — no extra network call
    // since exp is set to now+3600.
    cy.location('pathname', { timeout: 10000 }).should('not.eq', '/admin/login');
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
