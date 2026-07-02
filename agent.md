# Universal Agent Rules (agent.md)

This file contains universal instructions for AI agents and developers working on the Storefront repository.

## 💻 Development Commands
* **Start local server:** `npm run start` (Runs Angular application on port 4200/4201 depending on orchestrator configuration)
* **Linting:** `npm run lint` (ESLint checks)
* **Type checking:** `npm run typecheck` (TypeScript strict check)
* **Unit Tests (Karma/Jasmine):** `npm run test:ci` (Runs unit tests in headless mode)
* **E2E Tests (Cypress):** `npm run e2e` (Headless E2E run) or `npm run e2e:open` (Interactive runner)

## 🛠️ Code & Architecture Guidelines
* **Zero Hardcoding:** No static client branding, colors, or Firebase Project IDs in components. All dynamic tenant settings are retrieved at runtime from Cloud Firestore (`configuracion/store`).
* **Design Injection (Anti-FOUC):** The Angular `APP_INITIALIZER` must block view rendering while fetching tenant configuration. Colors (`primary`, `accent`, `background`) must be set dynamically on `document.documentElement.style` via CSS custom properties (`--color-primary`, etc.).
* **State Management:** Expose reactive states using Angular Signals. Always expose signals as read-only (`asReadonly()`) and mutate them through explicit public methods.
* **Error Handling:** Use a centralized handler that degrades gracefully, falling back to clean visual warnings via `SweetAlertService` rather than failing silently or crashing the layout.
* **Shared Contracts:** Schema contracts are consumed from `@vertex/contracts` via the local package path in `package.json` (`file:./packages/shared-contracts`).

## 🔄 Git Flow & PR Governance
* **Branch Protection:** Direct pushes to permanent branches `develop` and `main` are strictly blocked by server-side rules.
* **Pull Request Workflow:** Implement changes in a descriptive branch (`feat/*`, `fix/*`, `chore/*`) and submit a Pull Request to `develop`.
* **CI Hooks Bypass:** If host dependency resolution issues prevent pre-commit or pre-push Husky checks from running, bypass them locally using the `--no-verify` flag:
  ```bash
  git commit -m "commit message" --no-verify
  git push origin branch-name --no-verify
  ```
