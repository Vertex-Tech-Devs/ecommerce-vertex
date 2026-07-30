import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';
import { of, throwError } from 'rxjs';
import type { Observable } from 'rxjs';
import type { DocumentReference } from '@angular/fire/firestore';
import { EmailSettingsService } from './email-settings.service';
import type { AdvancedTestEmailPayload } from './email-settings.service';
import type { EmailSettings } from '@core/models/email-settings.model';

interface EmailSettingsServiceTest {
  docRef: DocumentReference;
  getDocData(ref: DocumentReference): Observable<unknown>;
  setDocData(ref: DocumentReference, data: Record<string, unknown>): Promise<void>;
  callFunction(name: string, payload: Record<string, unknown>): Promise<unknown>;
}

describe('EmailSettingsService', () => {
  let service: EmailSettingsService;
  let serviceTest: EmailSettingsServiceTest;
  let firestoreSpy: jasmine.SpyObj<Firestore>;
  let functionsSpy: jasmine.SpyObj<Functions>;

  const mockEmailSettings: EmailSettings = {
    storeOwnerEmail: 'owner@store.com',
    storeWhatsappNumber: '123456789',
    adminNotification: {
      subject: 'Nuevo pedido recibido',
      template: 'Hola Admin, has recibido un nuevo pedido #{{orderId}}.',
      showManageButton: true,
    },
    customerConfirmation: {
      subject: 'Confirmación de tu pedido',
      template: 'Hola {{clientName}}, tu pedido #{{orderId}} ha sido confirmado.',
      showWhatsappButton: true,
    },
  };

  const dummyRef = {} as DocumentReference;

  beforeEach(() => {
    spyOn(console, 'error');
    spyOn(console, 'warn');
    firestoreSpy = jasmine.createSpyObj('Firestore', ['type']);
    functionsSpy = jasmine.createSpyObj('Functions', ['type']);

    TestBed.configureTestingModule({
      providers: [
        EmailSettingsService,
        { provide: Firestore, useValue: firestoreSpy },
        { provide: Functions, useValue: functionsSpy },
      ],
    });

    service = TestBed.inject(EmailSettingsService);
    serviceTest = service as unknown as EmailSettingsServiceTest;

    // Spy on the docRef getter to avoid running actual Firebase doc() function which validates firestore instance
    spyOnProperty(serviceTest, 'docRef', 'get').and.returnValue(dummyRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get email settings successfully', (done) => {
    spyOn(serviceTest, 'getDocData').and.returnValue(of(mockEmailSettings));

    service.getEmailSettings().subscribe((settings) => {
      expect(settings).toEqual(mockEmailSettings);
      done();
    });
  });

  it('should return undefined and catch error when getEmailSettings fails', (done) => {
    spyOn(serviceTest, 'getDocData').and.returnValue(
      throwError(() => new Error('Firestore read error')),
    );

    service.getEmailSettings().subscribe((settings) => {
      expect(settings).toBeUndefined();
      expect(console.warn).toHaveBeenCalled();
      done();
    });
  });

  it('should save email settings successfully', async () => {
    const setDocSpy = spyOn(serviceTest, 'setDocData').and.returnValue(Promise.resolve());

    await service.saveEmailSettings(mockEmailSettings);

    expect(setDocSpy).toHaveBeenCalledWith(
      jasmine.any(Object),
      mockEmailSettings as unknown as Record<string, unknown>,
    );
  });

  it('should send advanced test email successfully', async () => {
    const payload: AdvancedTestEmailPayload = {
      recipientEmail: 'client@example.com',
      testData: {
        orderId: 'order-123',
        clientName: 'Juan Espeche',
        clientEmail: 'client@example.com',
        clientPhone: '12345678',
        totalAmount: '$1500.00',
      },
      templates: {},
    };

    const callFnSpy = spyOn(serviceTest, 'callFunction').and.returnValue(
      Promise.resolve({ success: true }),
    );

    const result = await service.sendAdvancedTestEmail(payload);

    expect(callFnSpy).toHaveBeenCalledWith(
      'sendAdvancedTestEmail',
      payload as unknown as Record<string, unknown>,
    );
    expect(result).toEqual({ success: true });
  });
});
