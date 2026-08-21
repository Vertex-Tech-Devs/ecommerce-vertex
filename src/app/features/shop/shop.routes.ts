import type { Routes } from '@angular/router';
import { Shop } from './layout/shop/shop';
import { checkoutGuard } from '@core/guards/checkout.guard';

export const SHOP_ROUTES: Routes = [
  {
    path: '',
    component: Shop,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./components/home/home').then((m) => m.Home),
      },
      {
        path: 'catalog',
        title: 'Catálogo',
        loadComponent: () => import('./components/catalog/catalog').then((m) => m.Catalog),
      },
      {
        path: 'about',
        title: 'Quiénes Somos',
        loadComponent: () => import('./components/about/about').then((m) => m.About),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./components/product-detail/product.routes').then((m) => m.PRODUCT_ROUTES),
      },
      {
        path: 'cart',
        title: 'Carrito',
        loadComponent: () => import('./components/cart/cart').then((m) => m.Cart),
      },
      {
        path: 'checkout',
        title: 'Checkout',
        canActivate: [checkoutGuard],
        loadComponent: () => import('./components/checkout/checkout').then((m) => m.Checkout),
      },
      {
        path: 'order-confirmation/:id',
        title: 'Confirmación de pedido',
        loadComponent: () =>
          import('./components/order-confirmation/order-confirmation').then(
            (m) => m.OrderConfirmation,
          ),
      },
    ],
  },
];
