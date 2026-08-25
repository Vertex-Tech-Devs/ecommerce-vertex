import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import type { Observable } from 'rxjs';
import { switchMap, of, combineLatest, map, tap } from 'rxjs';
import type { Order } from '@core/models/order.model';
import { OrderService } from '@core/services/order.service';
import { StoreConfigService } from '@core/services/store-config.service';
import { CartService } from '@core/services/cart.service';

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

  readonly storeConfig = this.storeConfigService.storeConfig;
  readonly currentDate = new Date();

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
      tap(({ orderId, paymentStatus }) => {
        if (orderId && (paymentStatus === 'approved' || !paymentStatus)) {
          void this.orderService.notifyOrderConfirmation(orderId);
        }
      }),
      map(({ order, orderId, paymentStatus }) => ({
        order,
        orderId,
        paymentStatus,
        isLoaded: true,
      })),
    );
  }

  printReceipt(): void {
    if (typeof window !== 'undefined') {
      window.print();
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
