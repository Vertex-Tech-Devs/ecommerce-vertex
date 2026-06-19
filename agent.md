# Universal Agent Rules (agent.md)

## Development Commands
* **Start local server:** `npm run start`
* **Linting:** `npm run lint`
* **Type checking:** `npm run typecheck`
* **Unit Tests (Karma/Jasmine):** `npm run test:ci`

## Code Guidelines
* **Zero Hardcoding:** No static branding, colors, or Firebase IDs. Configuration must be read from Cloud Firestore (`configuracion/store`).
* **Design Injection:** Angular `APP_INITIALIZER` fetches config first to block FOUC. Global colors are set on `document.documentElement` dynamically.
* **State Management:** Use Angular Signals for state. Expose properties as read-only.
* **Error Handling:** Global handler degrades gracefully and uses `SweetAlertService`.
* **Git Flow:** Direct pushes to `main` are blocked. Commit to `develop` and open PR to merge.
