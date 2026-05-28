import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { EmailManagementComponent } from './email-management.component';
import { EmailSettingsService } from '@core/services/email-settings.service';
import type { EmailSettings } from '@core/models/email-settings.model';
import { SweetAlertService } from '@core/services/sweet-alert.service';

describe('EmailManagementComponent', () => {
  let component: EmailManagementComponent;
  let fixture: ComponentFixture<EmailManagementComponent>;
  let emailSettingsSpy: jasmine.SpyObj<EmailSettingsService>;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;

  const validSettings = {
    storeOwnerEmail: 'owner@test.com',
    storeWhatsappNumber: '',
    adminNotification: {
      subject: 'Nuevo pedido',
      template: '<p>pedido</p>',
      showManageButton: false,
      showWhatsappButton: false,
    },
    customerConfirmation: {
      subject: 'Confirmación',
      template: '<p>gracias</p>',
      showWhatsappButton: false,
    },
  };

  beforeEach(async () => {
    emailSettingsSpy = jasmine.createSpyObj('EmailSettingsService', [
      'getEmailSettings',
      'saveEmailSettings',
      'sendAdvancedTestEmail',
    ]);
    emailSettingsSpy.getEmailSettings.and.returnValue(of(validSettings as EmailSettings));
    emailSettingsSpy.saveEmailSettings.and.returnValue(Promise.resolve());

    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['success', 'error', 'confirm']);
    sweetAlertSpy.confirm.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [EmailManagementComponent, ReactiveFormsModule],
      providers: [
        { provide: EmailSettingsService, useValue: emailSettingsSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load settings and mark form as pristine', () => {
    expect(emailSettingsSpy.getEmailSettings).toHaveBeenCalled();
    expect(component.emailForm.pristine).toBeTrue();
    expect(component.isLoading).toBeFalse();
  });

  it('should mark form as dirty when markFormDirty() is called (Quill change handler)', () => {
    expect(component.emailForm.dirty).toBeFalse();
    component.markFormDirty();
    expect(component.emailForm.dirty).toBeTrue();
  });

  it('save button should be enabled after markFormDirty()', () => {
    component.markFormDirty();
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn).toBeTruthy();
    expect(btn.disabled).toBeFalse();
  });

  it('save button should remain disabled when form is invalid', () => {
    component.emailForm.get('storeOwnerEmail')?.setValue('');
    component.markFormDirty();
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn.disabled).toBeTrue();
  });

  it('storeWhatsappNumber should be optional (no required validator)', () => {
    component.emailForm.get('storeWhatsappNumber')?.setValue('');
    component.markFormDirty();
    expect(component.emailForm.valid).toBeTrue();
  });

  it('should mark form as dirty when restoreDefaults is called with showAlert=false', async () => {
    await component.restoreDefaults(false);
    expect(component.emailForm.dirty).toBeTrue();
  });

  it('loadEmailSettings should NOT markAsPristine after restoreDefaults', async () => {
    emailSettingsSpy.getEmailSettings.and.returnValue(of<EmailSettings | undefined>(undefined));
    component['loadEmailSettings']();
    await fixture.whenStable();
    expect(component.emailForm.dirty).toBeTrue();
  });

  it('onSubmit should save and mark form as pristine on success', async () => {
    component.markFormDirty();
    fixture.detectChanges();

    await component.onSubmit();

    expect(emailSettingsSpy.saveEmailSettings).toHaveBeenCalled();
    expect(sweetAlertSpy.success).toHaveBeenCalled();
    expect(component.emailForm.pristine).toBeTrue();
  });
});
