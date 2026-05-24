import { bootstrapApplication } from '@angular/platform-browser';
import type { FirebaseOptions } from 'firebase/app';
import { createAppConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { STORE_CONFIG } from './environments/store.config';

function inferStoreNameFromHostname(): string {
  const host = (globalThis.location?.hostname ?? '').trim().toLowerCase();
  if (!host) {
    return '';
  }

  const firstLabel = host.split('.')[0] ?? '';
  if (!firstLabel || firstLabel === 'localhost') {
    return '';
  }

  return firstLabel
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const bootTitle = STORE_CONFIG.storeName?.trim() || inferStoreNameFromHostname();
if (bootTitle) {
  document.title = bootTitle;
}

fetch('/firebase-config.json')
  .then((r) => (r.ok ? (r.json() as Promise<FirebaseOptions>) : Promise.reject(r.status)))
  .catch(() => environment.firebaseConfig)
  .then((firebaseConfig) => bootstrapApplication(AppComponent, createAppConfig(firebaseConfig)))
  .catch((err) => {
    console.error('Failed to load Firebase config:', err);
    document.body.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#6b7280">Store configuration unavailable. Please try again later.</div>';
  });
