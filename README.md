# Vertex Ecommerce

Tenant storefront and admin template for the Vertex multi-tenant ecosystem.

Resumen ES: template ecommerce para storefront y backoffice por tenant.

## Quick Start (10 minutes) / Inicio Rapido (10 minutos)

### EN

1. Install dependencies.
2. Start app.
3. Run baseline quality checks.

### ES

1. Instala dependencias.
2. Inicia la aplicacion.
3. Ejecuta validaciones base.

Commands:

```bash
npm install
cd functions && npm ci && cd ..
npm start
npm run lint && npm run typecheck && npm run test:ci && npm run build
```

## Contents

- Overview / Resumen
- Architecture / Arquitectura
- Setup and Commands / Configuracion y Comandos
- Quality and Testing / Calidad y Testing
- Deployment and Releases / Despliegue y Releases
- Integration with Vertex Platform
- Incident Runbooks / Runbooks de Incidentes

## Overview / Resumen

### EN

Vertex Ecommerce provides the tenant-facing shopping experience and administrative interface.

### ES

Vertex Ecommerce ofrece la experiencia de compra y el panel administrativo para cada tenant.

Core capabilities:

- Product catalog and storefront flow
- Cart and checkout lifecycle
- Admin operations for products, clients, orders and store settings
- Firebase-backed data and authentication integrations

## Architecture / Arquitectura

Stack:

- Frontend: Angular 20
- Integrations: Firebase and Cloud Functions
- Testing: unit tests, Cypress E2E, Playwright integration
- CI/CD: GitHub Actions

Project areas:

- src/app
- functions/src
- cypress
- integration-tests

## Setup and Commands / Configuracion y Comandos

Prerequisites:

- Node.js 18+
- npm 9+

Core commands:

```bash
# Development
npm start
npm run lint
npm run typecheck
npm run test:ci
npm run build
npm run quality

# E2E and integration
npm run e2e:ci
npm run test:integration

# Deploy
npm run deploy:dev
npm run deploy:prod
```

## Quality and Testing / Calidad y Testing

Local baseline:

- lint
- typecheck
- unit tests
- production build

CI required gates:

- CI workflow
- CodeQL workflow
- Deploy workflow
- E2E and integration contexts based on branch/workflow

## Deployment and Releases / Despliegue y Releases

Branch intent:

- develop = integration
- main = production release

Mandatory release policy:

1. Promote only via PR develop -> main.
2. Immediately back-sync via PR main -> develop.
3. Keep branch protections enabled.
4. Do not merge with delete-branch when PR head is main or develop.

## Integration with Vertex Platform

- Platform dispatches provisioning/deploy events consumed by this template.
- Cross-repo integration tests validate lifecycle continuity.
- Some CI integration paths require secure repository credentials.

## Incident Runbooks / Runbooks de Incidentes

### 1) PR blocked by stale/cancelled required checks

1. Inspect required checks.
2. Re-run the run that owns the required red/cancelled context.
3. Wait for required checks to become green.
4. Merge through protected flow.

### 2) Branch drift between develop and main

1. Open sync PR main -> develop.
2. Validate required checks.
3. Merge safely without deleting long-lived heads.

### 3) Release close checklist

1. CI on develop green.
2. Deploy on develop green.
3. PR develop -> main merged.
4. CI on main green.
5. Deploy on main green.

## Governance Artifacts

- .github/CONTRIBUTING.md
- .github/dependabot.yml
- SECURITY.md
- .github/CODEOWNERS

Maintainer note: keep this README as canonical for daily development and release operations.
