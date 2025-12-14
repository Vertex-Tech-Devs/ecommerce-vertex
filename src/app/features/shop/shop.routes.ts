import { Routes } from '@angular/router';
import { ShopComponent } from './layout/shop/shop.component';
import { checkoutGuard } from '@core/guards/checkout.guard';

export const SHOP_ROUTES: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'catalog',
        loadComponent: () => import('./components/catalog/catalog.component').then(m => m.CatalogComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
      },
      {
        path: 'product',
        loadChildren: () => import('./components/product-detail/product.routes').then(m => m.PRODUCT_ROUTES)
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'checkout',
        canActivate: [checkoutGuard],
        loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent)
      },
      {
        path: 'order-confirmation/:id',
        loadComponent: () => import('./components/order-confirmation/order-confirmation.component').then(m => m.OrderConfirmationComponent)
      }
    ]
  }
];
