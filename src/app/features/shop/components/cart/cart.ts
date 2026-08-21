import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { CartItem } from '@core/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart implements OnInit {
  cartService = inject(CartService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private sweetAlertService = inject(SweetAlertService);

  cart = this.cartService.cart;

  ngOnInit(): void {
    const params = this.route.snapshot.queryParamMap;
    const hasPaymentRef = params.has('preference_id') || params.has('external_reference');
    const status = params.get('status') ?? params.get('collection_status');

    if (hasPaymentRef) {
      if (status === 'null' || !status || status === 'rejected' || status === 'cancelled') {
        this.sweetAlertService.warning(
          'Pago no completado',
          'El proceso de pago fue cancelado o no se completó. Tus productos continúan guardados en el carrito.',
        );
      }
      // Clean query parameters from URL for clean navigation
      void this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        replaceUrl: true,
      });
    }
  }

  goToCheckout(): void {
    void this.router.navigate(['/shop/checkout']);
  }

  onUpdateQuantity(item: CartItem, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let newQuantity = parseInt(inputElement.value, 10);

    if (isNaN(newQuantity)) {
      newQuantity = 1;
    }

    if (newQuantity > item.stock) {
      newQuantity = item.stock;
      inputElement.value = String(newQuantity);
    }

    if (newQuantity < 1) {
      newQuantity = 1;
      inputElement.value = '1';
    }

    this.cartService.updateQuantity(item.id, newQuantity);
  }

  onRemoveItem(itemId: string): void {
    this.cartService.removeItem(itemId);
  }

  onButtonMouseMove(event: MouseEvent): void {
    const button = event.currentTarget as HTMLElement;
    if (!button) {
      return;
    }
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  }
}
