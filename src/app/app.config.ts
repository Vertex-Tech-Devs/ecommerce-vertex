import type { ApplicationConfig } from '@angular/core';
import { importProvidersFrom, provideAppInitializer, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding, TitleStrategy } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { FirebaseOptions } from 'firebase/app';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideFunctions } from '@angular/fire/functions';
import { provideStorage } from '@angular/fire/storage';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

import { ModalModule } from 'ngx-bootstrap/modal';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { StoreConfigService } from './core/services/store-config.service';
import { SeoService } from './core/services/seo.service';
import { StoreTitleStrategy } from './core/strategies/store-title.strategy';
import { routes } from './app.routes';

export function createAppConfig(firebaseConfig: FirebaseOptions): ApplicationConfig {
  return {
    providers: [
      provideRouter(routes, withComponentInputBinding()),
      provideHttpClient(withInterceptors([loadingInterceptor])),

      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideFunctions(() => getFunctions()),
      provideStorage(() => getStorage()),

      importProvidersFrom(ModalModule.forRoot()),

      provideAppInitializer(() => inject(StoreConfigService).loadConfig()),
      provideAppInitializer(() => {
        inject(SeoService);
      }),
      { provide: TitleStrategy, useClass: StoreTitleStrategy },
    ],
  };
}
