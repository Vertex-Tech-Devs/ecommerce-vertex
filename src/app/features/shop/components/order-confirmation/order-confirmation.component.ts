import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import type { Observable } from 'rxjs';
import { switchMap, of, combineLatest, map } from 'rxjs';
import type { Order } from '@core/models/order.model';
import { OrderService } from '@core/services/order.service';
import { StoreConfigService } from '@core/services/store-config.service';

interface ConfirmationData {
  order: Order | undefined;
  paymentStatus: string | null;
}

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private storeConfigService = inject(StoreConfigService);

  data$!: Observable<ConfirmationData>;

  ngOnInit(): void {
    const order$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const orderId = params.get('id');
        if (orderId) {
          return this.orderService.getOrderById(orderId);
        }
        return of(undefined);
      }),
    );

    const paymentStatus$ = this.route.queryParamMap.pipe(map((params) => params.get('status')));

    this.data$ = combineLatest({
      order: order$,
      paymentStatus: paymentStatus$,
    });
  }

  getWhatsappUrl(order: Order): string {
    const config = this.storeConfigService.storeConfig();
    const storeWhatsapp = (
      config?.contact?.whatsApp ??
      config?.socialWhatsAppUrl ??
      config?.contact?.phone ??
      ''
    ).trim();
    const cleanPhone = storeWhatsapp.replace(/[^0-9]/g, '');

    const isPickup = order.deliverySelection?.type === 'store_pickup';
    let messageText = '';

    if (isPickup) {
      const pickupAddress =
        order.deliverySelection?.pickupAddressFormatted ?? 'Sucursal seleccionada';
      messageText = `Hola! Hice el pedido #${order.id} para retirar por el local (${pickupAddress}). ¿Cuándo puedo pasar a buscarlo?`;
    } else {
      messageText = `Hola! Hice el pedido #${order.id} y quisiera coordinar el envío a domicilio.`;
    }

    const encodedMessage = encodeURIComponent(messageText);
    return cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodedMessage}`
      : `https://wa.me/?text=${encodedMessage}`;
  }
}
