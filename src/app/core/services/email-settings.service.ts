import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { Functions } from '@angular/fire/functions';
import { Functions as FirebaseFunctions, httpsCallable } from 'firebase/functions';
import { Observable } from 'rxjs';
import { EmailSettings, EmailTemplate } from '@core/models/email-settings.model';

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
  private readonly docPath = 'settings/emailTemplates';

  getEmailSettings(): Observable<EmailSettings | undefined> {
    return runInInjectionContext(this.injector, () => {
      const docRef = doc(this.firestore, this.docPath);
      return docData(docRef) as Observable<EmailSettings | undefined>;
    });
  }

  saveEmailSettings(settings: EmailSettings): Promise<void> {
    const docRef = doc(this.firestore, this.docPath);
    return setDoc(docRef, settings, { merge: true });
  }

  sendAdvancedTestEmail(payload: AdvancedTestEmailPayload): Promise<any> {
    const sendTestEmailFn = httpsCallable(
      this.functions,
      'sendAdvancedTestEmail'
    );
    return sendTestEmailFn(payload);
  }
}
