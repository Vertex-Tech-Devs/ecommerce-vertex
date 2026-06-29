import type { ApplicationConfig } from '@angular/core';
import { ErrorHandler, APP_INITIALIZER, inject, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, TitleStrategy } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FirebaseApp } from '@angular/fire/app';
import type { FirebaseOptions } from 'firebase/app';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideFunctions } from '@angular/fire/functions';
import { provideStorage } from '@angular/fire/storage';
import { provideAnimations } from '@angular/platform-browser/animations';

import { getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { getFirestore } from '@angular/fire/firestore';
import { initializeFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from '@angular/fire/functions';
import { getStorage, connectStorageEmulator } from '@angular/fire/storage';
import type { Firestore } from '@angular/fire/firestore';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { normalizeFirebaseOptions } from './core/utils/firebase-config.util';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { StoreConfigService } from './core/services/store-config.service';
import { SeoService } from './core/services/seo.service';
import { StoreTitleStrategy } from './core/strategies/store-title.strategy';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';
import { routes } from './app.routes';

export function createAppConfig(firebaseConfig: FirebaseOptions): ApplicationConfig {
  firebaseConfig = normalizeFirebaseOptions(firebaseConfig);

  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocal) {
    firebaseConfig = {
      ...firebaseConfig,
      projectId: 'demo-vertex',
      storageBucket: 'demo-vertex.appspot.com',
    };
  }

  const createFirestore = (app: FirebaseApp): Firestore => {
    const isCypress =
      typeof window !== 'undefined' && (window as unknown as { Cypress?: unknown }).Cypress;
    try {
      if (isCypress) {
        return getFirestore(app);
      }
      return initializeFirestore(app, { experimentalAutoDetectLongPolling: true, forceLongPolling: true });
    } catch {
      return getFirestore(app);
    }
  };

  return {
    providers: [
      provideRouter(routes, withComponentInputBinding()),
      provideAnimations(),
      provideHttpClient(withInterceptors([loadingInterceptor, httpErrorInterceptor])),

      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => {
        const auth = getAuth(inject(FirebaseApp));
        if (isLocal) {
          connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        }
        return auth;
      }),
      provideFirestore(() => {
        const db = createFirestore(inject(FirebaseApp));
        if (isLocal) {
          connectFirestoreEmulator(db, 'localhost', 8080);
        }
        return db;
      }),
      provideFunctions(() => {
        const fns = getFunctions(inject(FirebaseApp));
        if (isLocal) {
          connectFunctionsEmulator(fns, 'localhost', 5001);
        }
        return fns;
      }),
      provideStorage(() => {
        const storage = getStorage(inject(FirebaseApp));
        if (isLocal) {
          connectStorageEmulator(storage, 'localhost', 9199);
        }
        return storage;
      }),
      importProvidersFrom(ModalModule),
      BsModalService,
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
