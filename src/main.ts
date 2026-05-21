import { bootstrapApplication } from '@angular/platform-browser';
import type { FirebaseOptions } from 'firebase/app';
import { createAppConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

fetch('/firebase-config.json')
  .then((r) => (r.ok ? (r.json() as Promise<FirebaseOptions>) : Promise.reject(r.status)))
  .catch(() => environment.firebaseConfig)
  .then((firebaseConfig) => bootstrapApplication(AppComponent, createAppConfig(firebaseConfig)))
  .catch((err) => {
    console.error('Failed to load Firebase config:', err);
    document.body.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#6b7280">Store configuration unavailable. Please try again later.</div>';
  });
