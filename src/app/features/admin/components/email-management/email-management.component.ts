import type { OnInit, ElementRef } from '@angular/core';
import { Component, ViewChild, inject, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { QuillEditorComponent } from 'ngx-quill';
import { QuillModule } from 'ngx-quill';
import type { AdvancedTestEmailPayload } from '@core/services/email-settings.service';
import { EmailSettingsService } from '@core/services/email-settings.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { EmailSettings } from '@core/models/email-settings.model';
import {
  DEFAULT_ADMIN_SUBJECT,
  DEFAULT_ADMIN_TEMPLATE,
  DEFAULT_CUSTOMER_SUBJECT,
  DEFAULT_CUSTOMER_TEMPLATE,
} from './email-management.constants';

@Component({
  selector: 'app-email-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './email-management.component.html',
  styleUrl: './email-management.component.scss',
})
export class EmailManagementComponent implements OnInit {
  private fb = inject(FormBuilder);
  private emailSettingsService = inject(EmailSettingsService);
  private sweetAlertService = inject(SweetAlertService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  @ViewChild('adminEditor') adminEditor!: QuillEditorComponent;
  @ViewChild('customerEditor') customerEditor!: QuillEditorComponent;
  @ViewChild('recipientEmailInput') recipientEmailInput?: ElementRef<HTMLInputElement>;

  emailForm!: FormGroup;
  testEmailModalForm!: FormGroup;
  isSubmitting = false;
  isLoading = true;
  isSendingAdvancedTest = false;
  testSendSuccess = false;
  testSendSuccessMessage = '';
  testSendError = '';
  isTestModalVisible = false;
  mobileActiveSection: number = 1;

  availablePlaceholders: { key: string; label: string; description: string }[] = [
    {
      key: '{orderId}',
      label: 'ID del Pedido',
      description: 'El ID único del pedido (ej: 2f4bA9x...)',
    },
    {
      key: '{clientName}',
      label: 'Nombre del Cliente',
      description: 'El nombre completo del cliente',
    },
    {
      key: '{clientEmail}',
      label: 'Email del Cliente',
      description: 'El correo electrónico del cliente',
    },
    {
      key: '{clientPhone}',
      label: 'Teléfono del Cliente',
      description: 'El número de teléfono del cliente',
    },
    {
      key: '{itemsList}',
      label: 'Lista de Productos',
      description: 'Una lista (HTML) con los productos del pedido',
    },
    {
      key: '{totalAmount}',
      label: 'Monto Total',
      description: 'El monto total pagado en el pedido',
    },
  ];

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video'],
    ],
  };

  ngOnInit(): void {
    this.initializeForm();
    this.initializeTestModalForm();
    this.loadEmailSettings();
  }

  toggleMobileSection(section: number): void {
    this.mobileActiveSection = this.mobileActiveSection === section ? 0 : section;
  }

  markFormDirty(): void {
    this.emailForm.markAsDirty();
  }

  private initializeForm(): void {
    this.emailForm = this.fb.group({
      storeOwnerEmail: ['', [Validators.required, Validators.email]],
      storeWhatsappNumber: [
        '',
        [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$')],
      ],
      adminNotification: this.fb.group({
        subject: ['', Validators.required],
        template: ['', Validators.required],
        showManageButton: [false],
        showWhatsappButton: [false],
      }),
      customerConfirmation: this.fb.group({
        subject: ['', Validators.required],
        template: ['', Validators.required],
        showWhatsappButton: [false],
      }),
    });
  }

  private initializeTestModalForm(): void {
    this.testEmailModalForm = this.fb.group({
      recipientEmail: ['', [Validators.required, Validators.email]],
      templatesToTest: this.fb.group({
        adminNotification: [true],
        customerConfirmation: [true],
      }),
      testData: this.fb.group({
        orderId: ['TEST-1234', Validators.required],
        clientName: ['Juan Pérez de Prueba', Validators.required],
        clientEmail: ['cliente.prueba@email.com', [Validators.required, Validators.email]],
        clientPhone: ['+5491122334455', Validators.required],
        totalAmount: ['125.50', Validators.required],
      }),
    });
  }

  private loadEmailSettings(): void {
    this.isLoading = true;
    this.emailSettingsService
      .getEmailSettings()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (settings) => {
          if (settings?.storeOwnerEmail) {
            this.emailForm.patchValue(settings);
            this.emailForm.markAsPristine();
          } else {
            void this.restoreDefaults(false);
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading Email settings:', err);
          void this.restoreDefaults(false); // Fallback to defaults
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }

  openTestModal(): void {
    const currentAdminEmail = this.emailForm.get('storeOwnerEmail')?.value;
    this.testEmailModalForm.get('recipientEmail')?.setValue(currentAdminEmail);
    this.testSendSuccess = false;
    this.testSendSuccessMessage = '';
    this.testSendError = '';
    this.isTestModalVisible = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.recipientEmailInput?.nativeElement.focus();
    }, 0);
  }

  closeTestModal(): void {
    this.isTestModalVisible = false;
    this.testSendSuccess = false;
    this.testSendError = '';
  }

  insertPlaceholder(placeholder: string, editorComponent: QuillEditorComponent): void {
    const quill = editorComponent.quillEditor;
    const range = quill.getSelection(true);
    quill.insertText(range.index, placeholder, 'user');
    quill.setSelection(range.index + placeholder.length, 0, 'user');
    quill.focus();
  }

  async restoreDefaults(showAlert: boolean = true): Promise<void> {
    const applyChanges = (): void => {
      this.emailForm.patchValue({
        adminNotification: {
          subject: DEFAULT_ADMIN_SUBJECT,
          template: DEFAULT_ADMIN_TEMPLATE,
        },
        customerConfirmation: {
          subject: DEFAULT_CUSTOMER_SUBJECT,
          template: DEFAULT_CUSTOMER_TEMPLATE,
        },
      });
      this.emailForm.markAsDirty();
      if (showAlert) {
        this.sweetAlertService.success(
          'Plantillas Restauradas',
          'El contenido ha sido restaurado a los valores por defecto en el editor.',
        );
      }
    };

    if (showAlert) {
      const isConfirmed = await this.sweetAlertService.confirm(
        '¿Restaurar Plantillas?',
        'Esto reemplazará el contenido actual de las plantillas con los valores por defecto. Los cambios no se guardarán hasta que hagas clic en "Guardar Cambios".',
      );
      if (isConfirmed) {
        applyChanges();
      }
    } else {
      applyChanges();
    }
  }

  async onSendAdvancedTest(): Promise<void> {
    if (this.testEmailModalForm.invalid) {
      this.testEmailModalForm.markAllAsTouched();
      this.sweetAlertService.error('Formulario Inválido', 'Revisa los campos del modal.');
      return;
    }

    const { recipientEmail, templatesToTest, testData } = this.testEmailModalForm.value;
    if (!templatesToTest.adminNotification && !templatesToTest.customerConfirmation) {
      this.sweetAlertService.error(
        'Error',
        'Debes seleccionar al menos una plantilla para probar.',
      );
      return;
    }

    this.isSendingAdvancedTest = true;
    this.testSendSuccess = false;
    this.testSendSuccessMessage = '';
    this.testSendError = '';

    testData.totalAmount = String(testData.totalAmount);

    const payload: AdvancedTestEmailPayload = {
      recipientEmail,
      testData,
      templates: {},
    };

    if (templatesToTest.adminNotification) {
      payload.templates.adminNotification = this.emailForm.get('adminNotification')?.value;
    }
    if (templatesToTest.customerConfirmation) {
      payload.templates.customerConfirmation = this.emailForm.get('customerConfirmation')?.value;
    }

    try {
      await this.emailSettingsService.sendAdvancedTestEmail(payload);
      this.testSendSuccess = true;
      this.testSendSuccessMessage = `✓ ¡Email de prueba enviado exitosamente a ${recipientEmail}! Revisá tu bandeja de entrada o spam.`;
      this.sweetAlertService.success(
        '¡Email Enviado!',
        `El correo de prueba ha sido entregado exitosamente a ${recipientEmail}.`,
      );
      this.cdr.detectChanges();
      setTimeout(() => {
        if (this.testSendSuccess && this.isTestModalVisible) {
          this.closeTestModal();
        }
      }, 3000);
    } catch (error: unknown) {
      console.error('Error sending advanced test email:', error);
      const msg = error instanceof Error ? error.message : String(error);
      this.testSendError =
        msg || 'No se pudo enviar el email de prueba. Verificá las credenciales del servidor.';
      this.sweetAlertService.error('Error de Envío', this.testSendError);
      this.cdr.detectChanges();
    } finally {
      this.isSendingAdvancedTest = false;
      this.cdr.detectChanges();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      this.sweetAlertService.error(
        'Formulario Inválido',
        'Por favor revisa los campos marcados en rojo.',
      );
      return;
    }

    this.isSubmitting = true;
    try {
      await this.emailSettingsService.saveEmailSettings(this.emailForm.value as EmailSettings);
      this.sweetAlertService.success('¡Éxito!', 'La configuración de los emails ha sido guardada.');
      this.emailForm.markAsPristine();
    } catch (error) {
      console.error('Error saving email settings:', error);
      this.sweetAlertService.error('Error', 'No se pudo guardar la configuración de los emails.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
