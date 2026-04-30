import { bootstrapApplication } from '@angular/platform-browser';
import type { FirebaseOptions } from 'firebase/app';
import { createAppConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

fetch('/firebase-config.json')
  .then((r) => r.json() as Promise<FirebaseOptions>)
  .then((firebaseConfig) => bootstrapApplication(AppComponent, createAppConfig(firebaseConfig)))
  .catch((err) => console.error('Failed to load Firebase config:', err));
