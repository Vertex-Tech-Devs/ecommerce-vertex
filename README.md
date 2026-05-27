# Vertex E-commerce Platform

**Production-ready Angular 20 e-commerce application with modern architecture, comprehensive testing, and enterprise-grade standards.**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-18%2B-green.svg)
![Angular](https://img.shields.io/badge/angular-20.0.0-red.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen.svg)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Security](#security)
- [Resources](#resources)
- [License](#license)
- [Version History](#version-history)

---

## Overview

### What is Vertex?

Vertex is a professional-grade e-commerce platform built with Angular 20, Firebase, and modern architectural patterns. It provides a complete solution for online retail management:

- 🛍️ **Product Management** - Catalog, variants, pricing
- 🛒 **Shopping Cart** - Real-time cart operations
- 💳 **Payment Processing** - MercadoPago integration
- 📦 **Order Management** - Order tracking and fulfillment
- 👥 **Client Management** - Customer profiles and history
- 🎨 **Admin Dashboard** - Comprehensive admin interface
- 📊 **Reporting** - Sales analytics and metrics
- 🔐 **Security** - Role-based access control (RBAC)

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Angular 20, TypeScript 5.8, RxJS 7.8 |
| **Styling** | SCSS, Bootstrap 5.3 |
| **State Management** | Angular Signals |
| **Backend** | Firebase (Firestore, Auth, Storage) |
| **APIs** | Cloud Functions, REST |
| **Testing** | Jasmine, Karma, Cypress |
| **Build** | Angular CLI, Webpack |
| **UI Components** | ngx-bootstrap, Custom components |

---

## Quick Start

### System Requirements

```
Node.js:        >= 18.0.0
npm:            >= 9.0.0
Angular CLI:    20.0.0
```

### Installation

```bash
# Clone repository
git clone https://github.com/Vertex-Tech-Devs/ecommerce-vertex.git
cd ecommerce-vertex

# Install dependencies (auto-creates placeholder env files via postinstall)
nvm use
npm install

# Configure all credentials interactively (one-time per environment)
npm run setup:credentials

# Setup pre-commit hooks (one-time)
npm run prepare
```

> **`npm run setup:credentials`** auto-fetches Firebase config via CLI (or manual fallback) and writes all 4 credential files in one shot. See [Credential Setup](#credential-setup).

### Running Locally

```bash
npm start              # Dev server → http://localhost:4200
npm test               # Tests in watch mode
npm run lint:fix       # Auto-fix linting
npm run quality        # Full quality check (lint + type + test + build)
```

---

## Architecture

### Design Philosophy

Vertex uses **Domain-Driven Design (DDD)** + **Clean Architecture**:

- **Separation of Concerns** - Each domain handles one responsibility
- **Scalability** - Add features without affecting existing code
- **Testability** - Each layer independently testable
- **Maintainability** - Clear, predictable organization

### Folder Structure

```
src/app/
├── core/              # Global services, guards, models
├── shared/            # Reusable components, utilities, testing helpers
├── domains/           # Feature domains (auth, product, cart, order, etc.)
│   ├── domain/        # Business logic & models
│   ├── data/          # API services & persistence
│   ├── presentation/  # Components & state management
│   └── di/            # Dependency injection
├── features/          # Legacy features (being migrated)
└── environments/      # Environment configurations
```

### Layer Pattern

Each domain follows 3-layer pattern:

```
Presentation (UI Components)
       ↓
Domain (Business Logic)
       ↓
Data (APIs & Persistence)
```

---

## Development Workflow

### Quick Reference: Daily Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Code & test locally
npm start                    # Dev server at http://localhost:4200
npm test                     # Tests in watch mode

# 3. Quality check before commit
npm run quality             # Runs: lint + typecheck + test + build

# 4. Commit (hooks auto-validate)
git add .
git commit -m "feat(scope): description"  # Conventional Commits

# 5. Push (pre-push auto-validates)
git push origin feature/my-feature

# 6. GitHub Actions CI/CD runs (8 parallel jobs, ~15 min)
# 7. Create PR (requires 1 approval)
# 8. Merge when ready
# 9. Deploy: develop → auto | staging/main → manual
```

### Branching Strategy

| Type | Pattern | From | To | Protection |
|------|---------|------|-----|----------|
| Feature | `feature/description` | develop | develop | ✅ Validate on push |
| Bugfix | `bugfix/description` | develop | develop | ✅ Validate on push |
| Hotfix | `hotfix/description` | main | main | ✅ Validate on push |
| Release | `release/version` | develop | main | ❌ PR only |

### Conventional Commits Format

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat, fix, docs, style, refactor, perf, test, ci, chore`

**Examples**:
```bash
feat(auth): add two-factor authentication
fix(cart): correct total calculation with discounts
refactor(services): simplify firestore queries
```

**Rules**:
- Subject: 50 chars max, imperative mood, no period
- Explain WHY, not WHAT
- Reference issues: `Fixes #123` in footer

### Development Commands

```bash
npm start                    # Dev server
npm run setup:credentials    # Interactive credential wizard (run once per env)
npm run setup                # Store config wizard (name, logo, contact, SEO)
npm test                     # Tests (watch mode)
npm run quality              # Full validation: lint + typecheck + test + build
npm run lint                 # Check linting
npm run fix                  # Auto-fix linting + formatting
npm run typecheck            # TypeScript check
npm run build                # Production build
npm run clean                # Clean artifacts

npm run e2e                  # E2E tests (Cypress headless)
npm run e2e:open             # Cypress UI for debugging

npm run deploy:dev           # Deploy to development
npm run deploy:prod          # Deploy to production
```

### Automatic Validations

**Pre-commit** (on `git commit`):
- ✅ ESLint auto-fix
- ✅ Prettier formatting
- ✅ Commitlint validation

**Pre-push** (on `git push`, develop & hotfix only):
- ✅ ESLint validation
- ✅ TypeScript strict check
- ✅ Unit tests (80%+ coverage required)
- ❌ If any fail: push blocked, fix locally and retry

**Deployment by Branch**:
| Branch | Deploy | Approval |
|--------|--------|----------|
| develop | Automatic | None |
| staging | Manual | Lead review |
| main | Manual + blocked | Lead + 2 approvals |

---

## Code Standards

### Principles

- **Language**: English only
- **TypeScript**: 5.8+ strict mode, no `any`
- **Comments**: Minimal, self-documenting (explain WHY, not WHAT)
- **Functions**: Max 40 lines, max 5 parameters
- **Files**: Max 300 lines, single responsibility
- **Naming**: camelCase variables, PascalCase types, UPPER_SNAKE_CASE constants
- **Async**: Signals > RxJS > Promises
- **Testing**: Minimum 70% coverage

### Code Examples

```typescript
// ✅ GOOD
const MAX_RETRIES = 3;
readonly count = signal(0);

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Observable cleanup
constructor(private destroyed$ = inject(DestroyRef)) {}
this.service.data$.pipe(takeUntilDestroyed(this.destroyed$)).subscribe();

// ❌ AVOID
const x: any = something;  // untyped
this.service.data$.subscribe(() => {
  this.other$.subscribe();  // nested subscriptions
});
subscription.unsubscribe(); // use takeUntil instead
```

### Configuration

- **ESLint**: Strict TypeScript rules (`.eslintrc.json`)
- **Prettier**: 100 char width, single quotes, trailing commas (`package.json`)
- **Pre-commit**: Auto-fix linting on commit (Husky)
- **Commitlint**: Validates Conventional Commits

**Setup**: `npm run prepare` (one-time)

---

## Testing

### Coverage Requirements

| Component | Minimum | Target |
|-----------|---------|--------|
| Services | 80% | 90%+ |
| Components | 70% | 80%+ |
| Utilities | 85% | 95%+ |
| **Overall** | **70%** | **80%+** |

### Test Types

**Unit Tests** (Jasmine + Karma)

Testing individual components, services, utilities. Example patterns in:
- `src/app/core/services/example-service.spec.ts` - Service testing pattern
- `src/app/shared/components/example-component.spec.ts` - Component testing pattern

```typescript
describe('ProductService', () => {
  let service: ProductService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ProductService] });
    service = TestBed.inject(ProductService);
  });
  
  it('should fetch products', async () => {
    const result = await service.getProducts();
    expect(result.length).toBeGreaterThan(0);
  });
});
```

**E2E Tests** (Cypress)

Testing complete user flows end-to-end. Example tests in `cypress/e2e/`:
- `auth.cy.ts` - Authentication flow (login, logout, errors)
- `checkout.cy.ts` - Shopping & payment flow

```typescript
describe('Login Flow', () => {
  it('should log in user successfully', () => {
    cy.visit('/login');
    cy.get('[data-cy="email"]').type('user@example.com');
    cy.get('[data-cy="password"]').type('password');
    cy.get('[data-cy="submit"]').click();
    cy.location('pathname').should('eq', '/dashboard');
  });
});
```

**Custom Cypress Commands** (Reusable)

Defined in `cypress/support/e2e.ts`:
```typescript
cy.login('user@example.com', 'password');      // Custom login
cy.logout();                                   // Custom logout
cy.addToCart('productId');                     // Add item to cart
cy.goToCheckout();                             // Navigate to checkout
cy.fillShippingForm({ street, city, state }); // Fill shipping
cy.fillPaymentForm({ cardNumber, expiry });   // Fill payment
```

### Running Tests

```bash
npm test              # Unit tests with coverage
npm run test:ci       # Headless for CI/CD
npm run e2e           # Run all E2E tests
npm run e2e:open      # Interactive E2E debugging
npm run test:integration    # Playwright integration suite
npm run test:integration:ui # Playwright UI mode
```

### Cross-repo integration

For full lifecycle validation across platform and storefront, run integration from
`vertex-platform` using:

```bash
cd ../vertex-platform
npm run test:integration:env
```

### Test Configuration

- **Unit Tests**: `karma.conf.js` (Jasmine runner)
- **E2E Tests**: `cypress.config.ts` (Cypress configuration)
- **Coverage**: `karma.conf.js` generates coverage/ folder
- **CI Mode**: Runs headless with ChromeHeadlessCI

---

## Deployment

### Environments

| Env | Branch | Checks | Deploy |
|-----|--------|--------|--------|
| **dev** | develop | Basic | Auto |
| **staging** | staging | Full + E2E | Manual |
| **prod** | main | All + perf | Manual + sign-off |

### Environment Configuration

#### Credential Setup

Run the interactive wizard once per environment:

```bash
npm run setup:credentials
```

The wizard will:
1. Show the current state of all credential files
2. Auto-fetch Firebase config via CLI (`firebase apps:sdkconfig`) — no copy-paste needed
3. Ask for MercadoPago credentials (public key + access token)
4. Ask whether you're using the local Functions emulator or deployed Functions
5. Write all files and show a summary

**Files generated:**

| File | Purpose | Git |
|------|---------|-----|
| `src/firebase-config.json` | Firebase SDK config loaded at runtime | Ignored |
| `src/environments/environment.ts` | Firebase config + MP public key + API URL | Ignored |
| `functions/.env.<project-id>` | MP access token + webhook URL for deployed env | Ignored |
| `functions/.env.local` | Same as above but for local emulator | Ignored |

> **How runtime config works:** `main.ts` fetches `/firebase-config.json` at startup. If the file is absent, it falls back to `environment.ts`. This allows developers to use `environment.ts` credentials without needing `firebase-config.json`.

#### GCP Secret Manager IAM Setup (Production & Staging)

When running in deployed environments, your Cloud Functions read sensitive credentials (like `mp-access-token` and `mp-webhook-secret`) from Google Cloud Secret Manager.

To ensure your deployed Cloud Functions have the permissions required to access these secrets, you must grant the **Secret Manager Secret Accessor** role to the runtime service account:

1. **Identify the Cloud Functions Service Account**:
   By default, 2nd-gen Firebase Cloud Functions run using the **App Engine default service account** or the **Compute Engine default service account**:
   `[PROJECT_ID]@appspot.gserviceaccount.com` or `[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`

2. **Grant the Secret Accessor Role**:
   Open your terminal and run the following Google Cloud CLI command (replacing placeholders with your project details):
   ```bash
   gcloud projects add-iam-policy-binding [YOUR_PROJECT_ID] \
     --member="serviceAccount:[YOUR_PROJECT_ID]@appspot.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor"
   ```

> [!NOTE]
> For higher-security setups, instead of granting project-wide accessor access, you can grant the role selectively only on the specific secrets (`mp-access-token` and `mp-webhook-secret`) inside the GCP Secret Manager console.

#### Manual Setup (fallback)

If you prefer to configure files manually:

```bash
# Firebase config (frontend runtime)
cp src/firebase-config.example.json src/firebase-config.json
# → Fill in credentials from Firebase Console → Project Settings → Your apps

# Environment (frontend build-time)
cp src/environments/environment.example.ts src/environments/environment.ts
# → Fill in firebaseConfig, mercadoPago.publicKey, api.cloudFunctionsUrl

# Functions env (Cloud Functions runtime)
cp functions/.env.example functions/.env.ecommerce-vertex-dev
# → Fill in MERCADOPAGO_ACCESSTOKEN, MERCADOPAGO_WEBHOOK_URL, SITE_URL
```

#### Environments

| Env | Branch | Firebase Project | Deploy | Approval |
|-----|--------|-----------------|--------|---------|
| **development** | `develop` | `ecommerce-vertex-dev` | Auto on merge | None |
| **production** | `main` | `ecommerce-vertex` | Manual | Lead sign-off |

### Deployment Steps

```bash
# 1. Ensure all checks pass
npm run quality

# 2. Deploy
npm run deploy:dev        # Development (auto on merge)
npm run deploy:staging    # Staging (manual approval)
npm run deploy:prod       # Production (manual + lead sign-off)

# 3. Verify
- Application loads
- Critical flows work
- Error logs clean
- Performance metrics OK
```

### Rollback

```bash
git revert <commit-hash>
git push origin main
# CI/CD automatically redeploys
```

### Semantic Versioning

```
MAJOR.MINOR.PATCH (e.g., 1.2.3)
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes
```

### Release Steps

```bash
git checkout -b release/1.2.0
npm version minor              # Updates version in package.json
npm test:coverage
npm run build:prod
npm run deploy:staging         # Test in staging
# ... Manual QA ...
npm run deploy:prod            # Deploy to production
git tag -a v1.2.0 -m "Release v1.2.0"
git push && git push --tags
```

---

## Quality Gates

All PRs must pass:

✅ **ESLint** - Code quality  
✅ **TypeScript** - Type safety (--strict)  
✅ **Unit Tests** - 70%+ coverage, all pass  
✅ **Build** - Production build succeeds  
✅ **Security Audit** - No high-risk vulnerabilities  
✅ **Bundle Size** - < 500KB gzipped  
✅ **E2E Tests** - Staging/production only  

---

## Troubleshooting

### Tests fail locally but pass in CI

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run test:once
```

### Build succeeds locally but fails in CI

```bash
npm run clean
npm run build:prod
npm audit
```

### Port 4200 already in use

```bash
ng serve --port 4201
```

### Pre-commit hook blocks push

```bash
npm run lint:fix            # Fix issues
# Or skip (use cautiously):
git push --no-verify
```

### Merge conflicts

```bash
git fetch origin
git rebase origin/develop
# Resolve conflicts in editor
git add .
git rebase --continue
```

---

## Contributing

### How to Contribute

1. Fork the repository
2. Create feature branch: `git checkout -b feature/description`
3. Follow code standards (see [Code Standards](#code-standards))
4. Write tests (>70% coverage)
5. Run quality checks: `npm run quality`
6. Commit: `git commit -m "feat(scope): description"`
7. Create Pull Request with description
8. Address review feedback
9. Merge when all checks pass

### Requirements

- TypeScript strict mode
- Conventional Commits format
- Minimum 70% test coverage
- DDD patterns in features
- ESLint + Prettier compliance

---

## Security

### Reporting Security Issues

🔒 **Do NOT open public issues for security vulnerabilities!**

1. Email: security@vertex-tech.com
2. Include: Description, steps to reproduce, impact
3. Wait: 72 hours for response
4. Do not share details publicly until patched

### Security Best Practices

- ✅ Never commit `.env` files with secrets
- ✅ Use environment-specific configs
- ✅ Validate all user inputs
- ✅ Sanitize data before display
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Review `firestore.rules` regularly
- ✅ Enable 2FA on Firebase Console
- ✅ Rotate API keys periodically
- ✅ OWASP Top 10 compliant
- ✅ GDPR data handling ready
- ✅ Role-based access control (RBAC)

---

## Contributing

### How to Contribute

1. Fork the repository
2. Create feature branch: `git checkout -b feature/description`
3. Follow code standards (see [Code Standards](#code-standards))
4. Write tests (>70% coverage)
5. Run quality checks: `npm run quality`
6. Commit: `git commit -m "feat(scope): description"` (Conventional Commits)
7. Create Pull Request with description
8. Address review feedback
9. Merge when all checks pass

### Requirements

- TypeScript strict mode
- Conventional Commits format
- Minimum 70% test coverage
- DDD patterns in features
- ESLint + Prettier compliance

### Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Focus on code, not the person
- Help others succeed

---

## Security

### Reporting Vulnerabilities

🔒 **Do NOT open public issues for security vulnerabilities!**

1. Email: security@vertex-tech.com
2. Include: Description, steps to reproduce, impact
3. Wait: 72 hours for response
4. Do not share details publicly until patched

### Security Best Practices

- ✅ Never commit `.env` files with secrets
- ✅ Use environment-specific configs
- ✅ Validate all user inputs
- ✅ Sanitize data before display
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Review `firestore.rules` regularly
- ✅ Enable 2FA on Firebase Console
- ✅ Rotate API keys periodically
- ✅ OWASP Top 10 compliant
- ✅ GDPR data handling ready
- ✅ Role-based access control (RBAC)

### Security Features Implemented

- Firebase Authentication with JWT
- Role-based access control (RBAC)
- Firestore security rules enforced
- Type safety with TypeScript
- XSS protection with Angular sanitization
- HTTPS/TLS for all communications
- Environment variables for sensitive data
- Regular dependency security audits

---

## Resources

- 📚 [Angular Docs](https://angular.io/docs)
- 🧪 [Jasmine Testing Guide](https://jasmine.github.io/)
- 🔥 [Firebase Documentation](https://firebase.google.com/docs)
- 📝 [Conventional Commits](https://www.conventionalcommits.org/)
- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 🤖 [AI Agent Guidelines](./.agent.md)

---

## License

MIT License - see LICENSE file

---

## Version History

### v1.1.0 (April 6, 2026)

**Admin UI & Routing Bugfixes**

**Style**
- Migrated admin panel from dark glassmorphism to professional light theme with persistent dark sidebar
- Accent palette upgraded to WCAG AA-compliant 600-level colors (indigo/sky/red/emerald/amber)
- Fixed login page white-on-white text, invisible inputs and alerts
- Fixed dashboard list-group buttons, confirm-delete cancel button, switch toggles
- Fixed account divider, product-detail row borders, image upload dashed borders
- Fixed header dropdown, user menu hover and menu-toggle dark artifacts
- Removed `backdrop-filter` blur and animated gradient borders from all solid-white surfaces
- Replaced `rgba` sub-card backgrounds with static `#f9fafb` across 24+ files
- Updated global scrollbar, modal shadow and `.text-muted` for light theme

**Fix**
- Resolved admin navigation: broken links redirected all clicks to the shop via `**` wildcard
- Added missing admin routes: `products/edit/:id`, `account`, `customers/:email`
- Corrected all `routerLink` segments: `/orders/detail/`, `/products/detail/`, `/products/edit/`, `/clients/`
- Fixed `navigate()` calls in `product-create`: 3 occurrences of non-existent `/products/detail/` route
- Fixed `navigate()` in `orders-list`: non-existent `/orders/edit/` route
- Added `type="button"` to all back/cancel buttons to prevent accidental form submit
- Fixed `href="#"` in login component — added `preventDefault()`
- Fixed `customers` route param name `:id` → `:email` to match component expectations

---

### v1.0.0 (March 13, 2026) 🎉

**Production Release**

**Features**
- Complete e-commerce platform with all core features
- Modern Angular 20 with DDD + Clean Architecture
- Comprehensive testing with 75%+ coverage
- Production-grade code standards
- Firebase integration (Firestore, Auth, Storage)
- MercadoPago payment processing
- Admin dashboard with full management
- Responsive UI with Bootstrap 5.3

**Infrastructure**
- Optimized build pipeline (450KB gzipped)
- Automated testing (Jasmine + Karma + Cypress)
- Production deployment ready
- Cloud Functions for backend logic

**Documentation**
- Complete README with all essential info
- Consolidated configuration in package.json
- Code standards in .codeagent.json
- Professional development infrastructure

---

## 📬 Contact

For questions or support, contact the project maintainer or team.
