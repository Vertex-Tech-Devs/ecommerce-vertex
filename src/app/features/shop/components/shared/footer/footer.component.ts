import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { StoreConfigService } from '@core/services/store-config.service';
import { FooterService } from '@core/services/footer.service';

function getCoalesced(...values: (string | undefined)[]): string {
  for (const v of values) {
    if (v !== undefined && v !== null) {
      return v;
    }
  }
  return '';
}

@Component({
  selector: 'app-shop-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  private storeConfig = inject(StoreConfigService);
  private footerService = inject(FooterService);

  private readonly footerData = toSignal(this.footerService.getFooterData());

  readonly viewData = computed(() => {
    const config = this.storeConfig.storeConfig();
    const footer = this.footerData();
    const contact = config?.contact;
    const storeNameVal = (config?.storeName ?? '').trim();
    const defaultCopyright = storeNameVal
      ? `${storeNameVal}. Todos los derechos reservados.`
      : 'Todos los derechos reservados.';

    return {
      contactPhone: getCoalesced(
        footer?.contactPhone,
        config?.contactPhone,
        contact?.phone,
        contact?.whatsApp,
      ),
      contactEmail: getCoalesced(footer?.contactEmail, config?.contactEmail, contact?.email),
      socialInstagramUrl: getCoalesced(
        footer?.socialInstagramUrl,
        config?.socialInstagramUrl,
        contact?.instagram,
      ),
      socialFacebookUrl: getCoalesced(
        footer?.socialFacebookUrl,
        config?.socialFacebookUrl,
        contact?.facebook,
      ),
      socialWhatsAppUrl: getCoalesced(
        footer?.socialWhatsAppUrl,
        config?.socialWhatsAppUrl,
        contact?.whatsApp,
      ),
      copyrightText: getCoalesced(footer?.copyrightText, config?.copyrightText, defaultCopyright),
    };
  });
}
