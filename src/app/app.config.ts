import type { ApplicationConfig } from '@angular/core';
import { importProvidersFrom, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding, TitleStrategy } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { FirebaseOptions } from 'firebase/app';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideFunctions } from '@angular/fire/functions';
import { provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { getFirestore, initializeFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import type { Firestore } from 'firebase/firestore';

import { ModalModule } from 'ngx-bootstrap/modal';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { StoreConfigService } from './core/services/store-config.service';
import { SeoService } from './core/services/seo.service';
import { StoreTitleStrategy } from './core/strategies/store-title.strategy';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';
import { routes } from './app.routes';

export function createAppConfig(firebaseConfig: FirebaseOptions): ApplicationConfig {
  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocal) {
    firebaseConfig = {
      ...firebaseConfig,
      projectId: 'demo-vertex',
    };
  }

  const createFirestore = (): Firestore => {
    const app = getApp();
    const isCypress =
      typeof window !== 'undefined' && (window as unknown as { Cypress?: unknown }).Cypress;
    try {
      if (isCypress) {
        return getFirestore(app);
      }
      return initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
    } catch {
      return getFirestore(app);
    }
  };

  return {
    providers: [
      provideRouter(routes, withComponentInputBinding()),
      importProvidersFrom(BrowserAnimationsModule),
      provideHttpClient(withInterceptors([loadingInterceptor, httpErrorInterceptor])),

      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => {
        const auth = getAuth();
        if (isLocal) {
          connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        }
        return auth;
      }),
      provideFirestore(() => {
        const db = createFirestore();
        if (isLocal) {
          connectFirestoreEmulator(db, 'localhost', 8080);
        }
        return db;
      }),
      provideFunctions(() => {
        const fns = getFunctions();
        if (isLocal) {
          connectFunctionsEmulator(fns, 'localhost', 5001);
        }
        return fns;
      }),
      provideStorage(() => getStorage()),

      importProvidersFrom(ModalModule.forRoot()),

      {
        provide: APP_INITIALIZER,
        useFactory: (configService: StoreConfigService) => (): Promise<void> =>
          configService.loadConfig(),
        deps: [StoreConfigService],
        multi: true,
      },
      {
        provide: APP_INITIALIZER,
        useFactory: (_seoService: SeoService) => (): void => {},
        deps: [SeoService],
        multi: true,
      },
      { provide: TitleStrategy, useClass: StoreTitleStrategy },
      { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ],
  };
}
