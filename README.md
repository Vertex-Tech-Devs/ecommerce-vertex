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
- [Git Workflow & Push Flow](#git-workflow--push-flow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Security](#security)
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

# Setup
nvm use
npm install
npm install --prefix functions

# Configure Firebase
firebase login
firebase use development

# Setup environment
cp src/environments/environment.example.ts src/environments/environment.ts

# Setup pre-commit hooks (one-time)
npm run prepare
```

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

### Daily Workflow

1. **Branch**: `git checkout -b feature/description`
2. **Code**: Make changes locally (`npm start` for dev server)
3. **Test**: Run `npm test` (watch mode)
4. **Validate**: `npm run quality` before push
5. **Commit**: `git commit -m "feat(scope): description"` (Conventional Commits)
6. **Push**: `git push origin feature/description`
7. **PR**: Create pull request → CI/CD validation
8. **Merge**: Approve & merge when checks pass

### Branching Strategy

| Type | Pattern | From | To | Pre-Push |
|------|---------|------|-----|----------|
| Feature | `feature/description` | develop | develop | ✅ Validate |
| Bugfix | `bugfix/description` | develop | develop | ✅ Validate |
| Hotfix | `hotfix/description` | main | main | ✅ Validate |
| Release | `release/version` | develop | main | ✅ Validate |

**Branch Protection**:
- 🟢 **develop** (DEV): Auto-fix + validate on push
  - Format/linting auto-corrected
  - TypeScript & tests must pass
  - Direct push allowed (for your team)

- 🔴 **main** (PRODUCTION): Push BLOCKED
  - Only merge via GitHub PR (develop → main)
  - Requires team approval
  - GitHub Actions auto-deploys after merge

### Commit Conventions

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, perf, test, ci, chore

**Examples**:
```bash
feat(auth): add two-factor authentication
fix(cart): correct total calculation with discounts
docs(readme): update setup instructions
refactor(services): simplify firestore queries
perf(bundle): optimize component lazy loading
test(auth): add unit tests for login
```

**Rules**:
- One logical change per commit
- Subject: 50 chars max, imperative mood ("add" not "added")
- Explain WHY, not WHAT
- Reference issues: `Fixes #123` in footer

### Development Commands

```bash
# Daily Development
npm start                 # Dev server (http://localhost:4200)
npm test                  # Tests + coverage
npm run build             # Production build

# Optional Validation (before pushing)
npm run validate          # Full check: lint + typecheck + test + build
npm run fix               # Auto-fix code (also runs on push)

# E2E Testing
npm run e2e               # Run E2E tests (Cypress)
npm run e2e:open          # Open Cypress UI for debugging

# Deployment
npm run deploy:dev        # Deploy to development
npm run deploy:prod       # Deploy to production

# Advanced/Utils
npm run lint              # Check linting only
npm run typecheck         # TypeScript check only
npm run clean             # Clean build artifacts
```

---
- [ ] No `console.log()` or `debugger` statements
- [ ] Documentation updated
- [ ] Commit messages follow Conventional Commits
- [ ] Build succeeds (`npm run build`)

---

## Git Workflow & Push Flow

### Complete Push & Validation Flow

```
LOCAL DEVELOPMENT                 GIT COMMIT                PRE-PUSH (AUTOMATIC)
├─ Code locally              ├─ git add .               ├─ npm run lint
├─ npm start (dev server)    ├─ git commit -m "..."     ├─ npm run typecheck
├─ npm test (watch)          │                           ├─ npm run test:once
└─ npm run lint:fix          ✅ HUSKY PRE-COMMIT       └─ (Auto on git push)
                             ├─ ESLint --fix
                             ├─ Prettier format    
                             ├─ Commitlint validate
                             └─ Commit created

GIT PUSH                      CI/CD PIPELINE (PARALLEL)
├─ git push origin feat/...   ├─ ✅ Linting (1m)
│                             ├─ ✅ Type Check (1m)
└─ Pre-push runs auto         ├─ ✅ Unit Tests (2m)
   (if fails → push blocked)  ├─ ✅ Build (2m)
                              ├─ ✅ Security (1m)
                              ├─ ✅ E2E Tests (PR only)
                              ├─ ✅ Functions (1m)
                              └─ ✅ Performance (PR only)

CODE REVIEW               MERGE & DEPLOY
├─ Min 1 approval         ├─ develop → auto Firebase dev
├─ All checks pass        ├─ staging → manual Firebase staging
└─ Approve merge          └─ main → manual Firebase prod
```

### Developer Workflow (Day-to-Day)

```bash
# 1. New feature
git checkout -b feature/my-feature

# 2. Code & test locally
npm start                    # Dev server
npm test                     # Watch tests

# 3. Quality check before commit
npm run quality             # Runs: lint + typecheck + test + build

# 4. Commit (hooks run automatically)
git add .
git commit -m "feat(scope): description"
# ✅ ESLint fix, Prettier format, Commitlint validate

# 5. Push (pre-push validates automatically)
git push origin feature/my-feature
# ✅ Lint, TypeScript, Tests run automatically
# ❌ If fails → Fix locally, push again

# 6. GitHub Actions CI/CD (10-15 min, 8 jobs parallel)
# ✅ All pass → Ready for PR review

# 7. Code review & merge
# ✅ Approved → Merge to develop/staging/main

# 8. Automatic/Manual deployment
# develop → auto deploy (5 min)
# staging → manual (10 min)
# main → manual + lead sign-off (5 min)
```

### Commit Format (Conventional Commits)

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, perf, test, ci, chore

**Examples**:
```bash
feat(auth): add two-factor authentication
fix(cart): correct total calculation with discounts
docs(readme): update setup instructions
refactor(services): simplify firestore queries
perf(bundle): optimize component lazy loading
test(auth): add unit tests for login
```

### Quality Gates (All Must Pass)

| Check | Tool | Auto | Required |
|-------|------|------|----------|
| Lint | ESLint | Pre-commit | ✅ Yes |
| Format | Prettier | Pre-commit | ✅ Yes |
| Type | TypeScript | Pre-push | ✅ Yes |
| Tests | Jasmine/Karma | Pre-push | ✅ Yes (80%+) |
| Build | Angular CLI | CI/CD | ✅ Yes |
| Security | npm audit | CI/CD | ✅ Yes |
| E2E | Cypress | CI/CD (PR) | ✅ PR only |
| Performance | Lighthouse | CI/CD (PR) | ✅ PR only |

### How It Works

**Pre-commit Hooks (Automatic on `git commit`)**:
```bash
✅ ESLint --fix      (auto-fix issues)
✅ Prettier          (format code)
✅ Commitlint        (validate message format)
→ If all pass: commit created
→ If any fail: commit blocked, fix and retry
```

**Pre-push Validation (Automatic on `git push`)**:
```bash
Branch: develop (DEV)
  🔧 npm run fix        (Auto-fix ESLint + Prettier)
  ✅ npm run lint       (ESLint validation)
  ✅ npm run typecheck  (TypeScript --strict)
  ✅ npm run test       (Unit tests, 80%+ coverage required)
  → If ALL pass: push allowed
  → If ANY fail: push blocked, fix locally and retry

Branch: main (PRODUCTION)
  ❌ PUSH BLOCKED automatically
  → Must merge via GitHub PR (develop → main)
  → Requires team approval
  → GitHub Actions auto-deploys
```

**Deployment by Branch**:
| Branch | Deploy | Approval | Time |
|--------|--------|----------|------|
| develop | Auto | None | 5m |
| staging | Manual | Lead review | 10m |
| main | Manual | Lead + 2 approvals | 5m |

---

## Code Standards

### Principles

- **Language**: English only
- **TypeScript**: 5.8+, strict mode, no `any`
- **Comments**: Minimal, self-documenting code (explain WHY, not WHAT)
- **Functions**: Max 40 lines, max 5 parameters, explicit types
- **Files**: Max 300 lines, single responsibility
- **Naming**: camelCase variables, PascalCase types, UPPER_SNAKE_CASE constants
- **Async**: Signals > RxJS > Promises
- **Testing**: Minimum 70% coverage, max 80%

### Code Examples

```typescript
// ✅ GOOD: Clear naming, explicit types
const USER_MAX_RETRIES = 3;
const userName = 'John';
type UserProfile = { name: string; email: string };

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ GOOD: Signals for state
readonly count = signal(0);

// ✅ GOOD: Observable cleanup
constructor(private destroyed$ = inject(DestroyRef)) {}
this.service.data$
  .pipe(takeUntilDestroyed(this.destroyed$))
  .subscribe();

// ❌ AVOID: Untyped, nested subscriptions, manual unsubscribe
const x: any = something;
this.service.data$.subscribe(() => {
  this.other$.subscribe();  // NESTED
});
subscription.unsubscribe(); // USE takeUntil instead
```

### Configuration

All tools consolidated in `package.json`:

- **ESLint**: Strict TypeScript rules (see `.eslintrc.json`)
- **Prettier**: 100 char width, single quotes, trailing commas
- **Pre-commit**: Auto-fix linting on commit
- **Commitlint**: Validates Conventional Commits format
- **Code Reference**: `.codeagent.json` for detailed standards

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
npm test              # Watch mode (unit tests)
npm run test:once     # Single run
npm run test:coverage # With coverage report (see coverage/index.html)
npm run test:ci       # Headless for CI/CD
npm run test:debug    # Debug in Chrome UI
npm run e2e           # Run all E2E tests
npm run e2e:open      # Interactive E2E debugging
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

## Development Standards Summary

### What We Follow

1. **Code Quality**: ESLint strict mode + TypeScript 5.8+ strict
2. **Formatting**: Prettier (100 char width, single quotes, trailing commas)
3. **Commits**: Conventional Commits with automated validation
4. **Testing**: 70%+ coverage minimum (Jasmine + Karma + Cypress)
5. **Architecture**: Domain-Driven Design + Clean Architecture layers
6. **Async**: Signals > RxJS Observables > Promises
7. **Comments**: Minimal, explaining WHY not WHAT
8. **Naming**: camelCase vars, PascalCase types, UPPER_SNAKE_CASE constants

### The Complete Development Process

```
NEW FEATURE → CODE LOCALLY → TEST LOCALLY → COMMIT (hooks) 
  → VALIDATE (pre-push) → PUSH → CI/CD (8 jobs) → REVIEW 
  → APPROVE → MERGE → AUTO/MANUAL DEPLOY → MONITOR
```

### Quality Gates (All Must Pass)

| Gate | Tool | Action |
|------|------|--------|
| Linting | ESLint | Fix async (pre-commit) |
| Type Safety | TypeScript | Via npm run typecheck |
| Unit Tests | Jasmine/Karma | 70%+ coverage required |
| Format Check | Prettier | Fix async (pre-commit) |
| Build | Angular CLI | Production build must succeed |
| Security | npm audit | No critical vulnerabilities |
| E2E Tests | Cypress | Critical flows on PR/staging/prod |
| Performance | Lighthouse | Initial load < 2s on PR |

### Files You Need to Know

| File | Purpose |
|------|---------|
| `README.md` | You are here - complete guide |
| `PUSH_FLOW.md` | Detailed push flow & CI/CD explanation |
| `.codeagent.json` | Code standards reference (for AI) |
| `.eslintrc.json` | ESLint rules configuration |
| `package.json` | Prettier, lint-staged, commitlint config |
| `karma.conf.js` | Unit test configuration |
| `cypress.config.ts` | E2E test configuration |
| `.github/workflows/ci-cd.yml` | GitHub Actions pipeline |

### Example Workflow (Start to Finish)

```bash
# 1. Create feature
git checkout -b feature/add-product-search

# 2. Code & test
npm start                # Dev server
npm test                 # Tests watch mode

# 3. Before commit
npm run quality          # Full validation

# 4. Commit (hooks run automatically)
git add .
git commit -m "feat(product): add search functionality"
# ✅ ESLint fix, Prettier format, Commitlint validate

# 5. Pre-push validation
npm run pre-push
# ✅ Lint check, TypeScript check, Unit tests

# 6. Push to GitHub
git push origin feature/add-product-search
# ▶️ GitHub Actions starts (8 parallel jobs)
# ✅ All pass → Ready for review
# ❌ One fails → Check logs, fix locally, push again

# 7. Create PR (template auto-loads)
# - Fill description
# - Reference issue if any
# - Add notes for reviewer

# 8. Approval & Merge
# - Min 1 approval
# - All CI checks must pass
# - Squash/rebase commit

# 9. Deploy
# develop → Auto to dev Firebase
# staging → Manual to staging Firebase
# main → Manual to prod Firebase (lead sign-off)
```

---

| Metric | Value |
|--------|-------|
| Lines of Code | ~50,000 |
| Components | ~45 |
| Services | ~18 |
| Test Coverage | 75%+ |
| Bundle Size | 450KB (gzipped) |
| Initial Load | < 2s |

---

## Resources

- 📚 [Angular Docs](https://angular.io/docs)
- 🧪 [Jasmine Testing Guide](https://jasmine.github.io/)
- 🔥 [Firebase Documentation](https://firebase.google.com/docs)
- 📝 [Conventional Commits](https://www.conventionalcommits.org/)
- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 🤖 [AI Agent Guidelines](./.agent.md) - For AI agents only

---

## License

MIT License - see LICENSE file

---

## Version History

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
