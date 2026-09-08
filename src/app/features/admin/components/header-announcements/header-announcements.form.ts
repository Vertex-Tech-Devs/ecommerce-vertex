import type { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

export function createAnnouncementItemForm(fb: FormBuilder): FormGroup {
  return fb.group({
    text: ['', Validators.required],
    link: [''],
    enabled: [true],
  });
}

export function createHeaderAnnouncementsForm(fb: FormBuilder): FormGroup {
  return fb.group({
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
      isMarquee: [false],
      link: ['', [Validators.pattern(/^(https?:\/\/|\/).*$/)]],
      backgroundColor: ['#111827'],
      textColor: ['#ffffff'],
    }),
    floatingWhatsApp: fb.group({
      enabled: [false],
      phoneNumber: ['', [Validators.pattern(/^[0-9]+$/), Validators.minLength(10)]],
      defaultMessage: ['¡Hola! Tengo una consulta sobre un producto de la tienda'],
    }),
  });
}
