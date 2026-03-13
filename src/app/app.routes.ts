import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shop'
  },
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.routes').then(m => m.SHOP_ROUTES)
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/admin/components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: '_dev',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/dev/dev.routes').then(m => m.DEV_ROUTES)
      },
      {
        path: '',
        canActivate: [AdminGuard],
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'shop'
  }
];
