import { bootstrapApplication } from '@angular/platform-browser';
import type { FirebaseOptions } from 'firebase/app';
import { createAppConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { normalizeFirebaseOptions } from './app/core/utils/firebase-config.util';
import { environment } from './environments/environment';
import { STORE_CONFIG } from './environments/store.config';

import { resolveTenantId } from './app/core/utils/tenant';

// 1. Dynamic Tenant ID inference
const resolvedTenant = resolveTenantId();
if (resolvedTenant) {
  environment.tenantId = resolvedTenant;
}

function inferStoreNameFromHostname(): string {
  const host = (globalThis.location?.hostname ?? '').trim().toLowerCase();
  if (!host) {
    return '';
  }

  let firstLabel = host.split('.')[0] ?? '';
  if (!firstLabel || firstLabel === 'localhost') {
    return '';
  }

  if (firstLabel.startsWith('vtx-')) {
    firstLabel = firstLabel.substring(4);
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

fetch('/firebase-config.json?t=' + new Date().getTime())
  .then((r) => (r.ok ? (r.json() as Promise<FirebaseOptions>) : Promise.reject(r.status)))
  .then((config) => {
    if (config && !config.projectId) {
      const inferredProject =
        config.authDomain?.trim().split('.')[0] ?? config.storageBucket?.trim().split('.')[0];
      if (inferredProject) {
        config.projectId = inferredProject;
      }
    }
    if (!config?.apiKey || !config.projectId) {
      throw new Error('Invalid or incomplete firebase-config.json');
    }
    return config;
  })
  .catch(() => environment.firebaseConfig)
  .then((firebaseConfig) =>
    bootstrapApplication(AppComponent, createAppConfig(normalizeFirebaseOptions(firebaseConfig))),
  )
  .catch((err) => {
    console.error('Failed to load Firebase config:', err);
    document.body.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#6b7280">Store configuration unavailable. Please try again later.</div>';
  });
