import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: ':id',
    component: ProductComponent
  }
];
