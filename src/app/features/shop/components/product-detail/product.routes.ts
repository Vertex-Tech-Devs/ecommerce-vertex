import type { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./product/product').then((m) => m.Product),
  },
];
