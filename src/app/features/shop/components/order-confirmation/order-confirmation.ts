import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import type { Observable } from 'rxjs';
import { switchMap, of, combineLatest, map } from 'rxjs';
import { Functions } from '@angular/fire/functions';
import { httpsCallable } from 'firebase/functions';
import type { Order } from '@core/models/order.model';
import { OrderService } from '@core/services/order.service';
import { StoreConfigService } from '@core/services/store-config.service';
import { CartService } from '@core/services/cart.service';
import { resolveTenantId } from '@core/utils/tenant';

interface ConfirmationData {
  order: Order | undefined;
  orderId: string | null;
  paymentStatus: string | null;
  isLoaded: boolean;
}

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.scss',
})
export class OrderConfirmation implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private storeConfigService = inject(StoreConfigService);
  private cartService = inject(CartService);
  private functions = inject(Functions, { optional: true });

  data$!: Observable<ConfirmationData>;

  ngOnInit(): void {
    // Clear cart upon arriving at order confirmation page
    this.cartService.clearCart();

    const orderId$ = this.route.paramMap.pipe(map((params) => params.get('id')));
    const paymentStatus$ = this.route.queryParamMap.pipe(
      map((params) => params.get('status') ?? params.get('collection_status') ?? 'approved'),
    );

    const order$ = orderId$.pipe(
      switchMap((orderId) => {
        if (orderId) {
          void this.triggerConfirmationEmail(orderId);
          return this.orderService.getOrderById(orderId);
        }
        return of(undefined);
      }),
    );

    this.data$ = combineLatest({
      order: order$,
      orderId: orderId$,
      paymentStatus: paymentStatus$,
    }).pipe(
      map(({ order, orderId, paymentStatus }) => ({
        order,
        orderId,
        paymentStatus,
        isLoaded: true,
      })),
    );
  }

  private async triggerConfirmationEmail(orderId: string): Promise<void> {
    if (!this.functions) {
      return;
    }
    try {
      const fn = httpsCallable(this.functions, 'notifyOrderConfirmation');
      await fn({ orderId, tenantId: resolveTenantId() });
    } catch {
      // Ignorar fallas secundarias, webhook de Mercado Pago es el canal principal
    }
  }

  getWhatsappUrl(order?: Order, fallbackOrderId?: string | null): string {
    const config = this.storeConfigService.storeConfig();
    const storeWhatsapp = (
      config?.contact?.whatsApp ??
      config?.socialWhatsAppUrl ??
      config?.contact?.phone ??
      ''
    ).trim();
    const cleanPhone = storeWhatsapp.replace(/[^0-9]/g, '');

    const id = order?.id ?? fallbackOrderId ?? 'Pendiente';
    const isPickup = order?.deliverySelection?.type === 'store_pickup';
    let messageText = '';

    if (isPickup) {
      const pickupAddress =
        order?.deliverySelection?.pickupAddressFormatted ?? 'Sucursal seleccionada';
      messageText = `Hola! Hice el pedido #${id} para retirar por el local (${pickupAddress}). ¿Cuándo puedo pasar a buscarlo?`;
    } else {
      messageText = `Hola! Hice el pedido #${id} y quisiera coordinar el envío a domicilio.`;
    }

    const encodedMessage = encodeURIComponent(messageText);
    return cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`;
  }
}
