import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc, getDoc } from '@angular/fire/firestore';
import type { DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';
import type { Functions as FirebaseFunctions } from 'firebase/functions';
import { httpsCallable } from 'firebase/functions';
import type { Observable } from 'rxjs';
import { of, from, firstValueFrom } from 'rxjs';
import { catchError, timeout, map } from 'rxjs/operators';
import type { EmailSettings, EmailTemplate } from '@core/models/email-settings.model';
import { tenantPath, storeDocId, resolveTenantId } from '@core/utils/tenant';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

export interface AdvancedTestEmailPayload {
  recipientEmail: string;
  testData: {
    orderId: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    totalAmount: string;
  };
  templates: {
    adminNotification?: EmailTemplate;
    customerConfirmation?: EmailTemplate;
  };
}

@Injectable({
  providedIn: 'root',
})
export class EmailSettingsService {
  private firestore: Firestore = inject(Firestore);
  private functions: FirebaseFunctions = inject(Functions);
  private injector = inject(Injector);

  protected get docRef(): DocumentReference<DocumentData> {
    return runInInjectionContext(this.injector, () =>
      doc(this.firestore, tenantPath('settings'), storeDocId('emailTemplates')),
    );
  }

  protected getDocData(ref: DocumentReference): Observable<unknown> {
    return runInInjectionContext(this.injector, () =>
      from(getDoc(ref)).pipe(map((snap) => (snap.exists() ? snap.data() : undefined))),
    );
  }

  protected setDocData(ref: DocumentReference, data: Record<string, unknown>): Promise<void> {
    return runInInjectionContext(this.injector, () => setDoc(ref, data, { merge: true }));
  }

  protected callFunction(name: string, payload: Record<string, unknown>): Promise<unknown> {
    return runInInjectionContext(this.injector, () => {
      const fn = httpsCallable(this.functions, name);
      return fn(payload);
    });
  }

  getEmailSettings(): Observable<EmailSettings | undefined> {
    return runInInjectionContext(this.injector, () => {
      return (this.getDocData(this.docRef) as Observable<EmailSettings | undefined>).pipe(
        timeout(8000),
        catchError((err) => {
          console.warn('Unable to load email settings:', err);
          return of(undefined);
        }),
      );
    });
  }

  saveEmailSettings(settings: EmailSettings): Promise<void> {
    return this.setDocData(this.docRef, {
      ...(settings as unknown as Record<string, unknown>),
      storeId: resolveTenantId(),
    });
  }

  async sendAdvancedTestEmail(payload: AdvancedTestEmailPayload): Promise<unknown> {
    const authService = runInInjectionContext(this.injector, () =>
      inject(AuthService, { optional: true }),
    );
    const currentUser = authService
      ? await firstValueFrom(authService.currentUser$).catch(() => null)
      : null;
    const idToken = currentUser ? await currentUser.getIdToken().catch(() => '') : '';
    const tenantId = resolveTenantId();

    const response = await fetch(`${environment.api.cloudFunctionsUrl}/sendAdvancedTestEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
      },
      body: JSON.stringify({
        data: {
          ...payload,
          idToken,
          tenantId,
        },
      }),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      const msg =
        errJson?.error?.message ??
        errJson?.message ??
        `Error HTTP ${response.status} al enviar el email de prueba.`;
      throw new Error(msg);
    }

    const resJson = await response.json();
    return resJson.result ?? resJson;
  }
}
