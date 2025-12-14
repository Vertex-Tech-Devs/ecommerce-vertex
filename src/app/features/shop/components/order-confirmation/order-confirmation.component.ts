import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap, of, combineLatest, map } from 'rxjs';
import { Order } from '@core/models/order.model';
import { OrderService } from '@core/services/order.service';

interface ConfirmationData {
  order: Order | undefined;
  paymentStatus: string | null;
}

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  public data$!: Observable<ConfirmationData>;

  ngOnInit(): void {
    const order$ = this.route.paramMap.pipe(
      switchMap(params => {
        const orderId = params.get('id');
        if (orderId) {
          return this.orderService.getOrderById(orderId);
        }
        return of(undefined);
      })
    );

    const paymentStatus$ = this.route.queryParamMap.pipe(
      map(params => params.get('status'))
    );

    this.data$ = combineLatest({
      order: order$,
      paymentStatus: paymentStatus$
    });
  }
}