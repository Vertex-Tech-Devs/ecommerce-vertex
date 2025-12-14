import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Order, OrderItem } from '@core/models/order.model';
import { SumItemsPipe } from '../../shared/pipes/sum-items/sum-items.pipe';

@Component({
  selector: 'app-receipt-modal',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, SumItemsPipe],
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.scss']
})
export class ReceiptModalComponent {
  public bsModalRef = inject(BsModalRef);
  public title = 'Recibo de Pedido';
  public order: Order | undefined;
  public today = new Date();

  getItemSubtotal(item: OrderItem): number {
    return item.quantity * item.price;
  }

  close(): void {
    this.bsModalRef.hide();
  }

  printReceipt(): void {
    window.print();
  }
}