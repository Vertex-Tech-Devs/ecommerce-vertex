import type { Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';
import { SeedDataGuard } from '@core/guards/seed-data.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shop',
  },
  {
    path: 'dev/seed',
    canActivate: [SeedDataGuard],
    loadComponent: () =>
      import('./features/shared/dev-seed/dev-seed.component').then((m) => m.DevSeedComponent),
  },
  {
    path: 'shop',
    loadChildren: () => import('./features/shop/shop.routes').then((m) => m.SHOP_ROUTES),
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/admin/components/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: '',
        canActivate: [AdminGuard],
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/shared/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];

