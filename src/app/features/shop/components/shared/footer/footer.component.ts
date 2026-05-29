import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FooterData } from '@core/models/footer.model';
import { FooterService } from '@core/services/footer.service';
import { StoreConfigService } from '@core/services/store-config.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shop-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  private footerService = inject(FooterService);
  private storeConfig = inject(StoreConfigService);

  readonly storeName = this.storeConfig.storeName;

  private footerData = toSignal(this.footerService.getFooterData(), {
    initialValue: undefined as FooterData | undefined,
  });

  readonly viewData = computed(() => {
    const footerData = this.footerData();
    const config = this.storeConfig.storeConfig();
    const configuredStoreName = (config?.storeName ?? '').trim();

    return {
      contactPhone:
        footerData?.contactPhone ?? config?.contact?.phone ?? config?.contact?.whatsApp ?? '',
      contactEmail: footerData?.contactEmail ?? config?.contact?.email ?? '',
      socialInstagramUrl: footerData?.socialInstagramUrl ?? config?.contact?.instagram ?? '',
      socialFacebookUrl: footerData?.socialFacebookUrl ?? config?.contact?.facebook ?? '',
      socialWhatsAppUrl: footerData?.socialWhatsAppUrl ?? config?.contact?.whatsApp ?? '',
      copyrightText:
        footerData?.copyrightText ??
        (configuredStoreName
          ? `${configuredStoreName}. Todos los derechos reservados.`
          : 'Todos los derechos reservados.'),
    };
  });

  constructor() {}
}
