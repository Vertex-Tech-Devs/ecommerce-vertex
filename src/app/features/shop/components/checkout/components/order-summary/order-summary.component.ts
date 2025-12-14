import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICartItem } from '@core/models/cart.model';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  @Input() items: ICartItem[] = [];
  @Input() total: number = 0;
}
