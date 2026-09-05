import type { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { resolveTenantId } from '@core/utils/tenant';

export function createStoreConfigForm(fb: FormBuilder): FormGroup {
  return fb.group({
    tenantId: [''],
    storeId: [resolveTenantId()],
    storeName: ['', Validators.required],
    logoUrl: [''],
    faviconUrl: [''],
    brandDisplayMode: ['text'],
    appearance: fb.group({
      header: fb.group({
        backgroundColor: ['#ffffff', Validators.required],
        textColor: ['#1f2937', Validators.required],
        accentColor: ['#000000', Validators.required],
        fontFamily: ['system', Validators.required],
      }),
    }),
    announcementBar: fb.group({
      enabled: [false],
      text: [''],
      link: [''],
      backgroundColor: ['#111827'],
      textColor: ['#ffffff'],
    }),
    floatingWhatsApp: fb.group({
      enabled: [false],
      phoneNumber: [''],
      defaultMessage: ['¡Hola! Tengo una consulta sobre un producto de la tienda'],
    }),
    colors: fb.group({
      primary: ['#ea580c', Validators.required],
      accent: ['#ef4444', Validators.required],
      background: ['#ffffff', Validators.required],
    }),
    payments: fb.group({ mercadoPagoPublicKey: [''] }),
    contact: fb.group({
      phone: [''],
      email: [''],
      whatsApp: [''],
      instagram: [''],
      facebook: [''],
    }),
    seo: fb.group({ metaDescription: [''] }),
    setupCompleted: [true],
    storeOwnerEmail: [''],
    notificationEmail: [''],
    emailSenderName: [''],
    emailSignature: [''],
  });
}
