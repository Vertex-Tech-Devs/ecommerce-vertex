import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import type { CartItem } from '@core/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cartService = inject(CartService);
  private router = inject(Router);

  cart = this.cartService.cart;

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
