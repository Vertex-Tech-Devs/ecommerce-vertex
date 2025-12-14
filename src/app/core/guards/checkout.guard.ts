import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '@core/services/cart.service';

export const checkoutGuard: CanActivateFn = () => {
  const cartService = inject(CartService);
  const router = inject(Router);

  if (cartService.itemCount() === 0) {
    console.warn('Acceso a /checkout denegado: El carrito está vacío. Redirigiendo...');
    router.navigate(['/shop/cart']);
    return false;
  }
  return true;
};