import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import type { Order, OrderItem } from '@core/models/order.model';
import { StoreConfigService } from '@core/services/store-config.service';
import { SumItemsPipe } from '../../shared/pipes/sum-items/sum-items.pipe';

@Component({
  selector: 'app-receipt-modal',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, SumItemsPipe],
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.scss'],
})
export class ReceiptModalComponent {
  private readonly storeConfig = inject(StoreConfigService);

  @Input() order: Order | undefined;
  @Output() closeModal = new EventEmitter<void>();

  title = 'Recibo de Pedido';
  today = new Date();
  readonly storeName = this.storeConfig.storeName;
  readonly logoUrl = this.storeConfig.logoUrl;

  currencyCode(): string {
    return 'ARS';
  }

  currencySymbol(): string {
    return '$';
  }

  getItemSubtotal(item: OrderItem): number {
    return item.quantity * item.price;
  }

  close(): void {
    this.closeModal.emit();
  }

  printReceipt(): void {
    window.print();
  }
}
