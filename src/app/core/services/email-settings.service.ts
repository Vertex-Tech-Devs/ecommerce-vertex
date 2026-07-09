import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
import { doc, setDoc, getDoc } from '@angular/fire/firestore';
import type { DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';
import type { Functions as FirebaseFunctions } from 'firebase/functions';
import { httpsCallable } from 'firebase/functions';
import type { Observable } from 'rxjs';
import { of, from } from 'rxjs';
import { catchError, timeout, map } from 'rxjs/operators';
import type { EmailSettings, EmailTemplate } from '@core/models/email-settings.model';
import { tenantPath } from '@core/utils/tenant';

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
    return doc(this.firestore, tenantPath('settings'), 'emailTemplates');
  }

  protected getDocData(ref: DocumentReference): Observable<unknown> {
    return docData(ref);
  }

  protected setDocData(ref: DocumentReference, data: Record<string, unknown>): Promise<void> {
    return setDoc(ref, data, { merge: true });
  }

  protected callFunction(name: string, payload: Record<string, unknown>): Promise<unknown> {
    const fn = httpsCallable(this.functions, name);
    return fn(payload);
  }

  getEmailSettings(): Observable<EmailSettings | undefined> {
    return runInInjectionContext(this.injector, () => {
      return from(getDoc(this.docRef)).pipe(
        timeout(8000),
        map((snap) => (snap.exists() ? (snap.data() as EmailSettings) : undefined)),
        catchError((err) => {
          console.warn('Unable to load email settings:', err);
          return of(undefined);
        }),
      );
    });
  }

  saveEmailSettings(settings: EmailSettings): Promise<void> {
    return this.setDocData(this.docRef, settings as unknown as Record<string, unknown>);
  }

  sendAdvancedTestEmail(payload: AdvancedTestEmailPayload): Promise<unknown> {
    return this.callFunction(
      'sendAdvancedTestEmail',
      payload as unknown as Record<string, unknown>,
    );
  }
}
