import type { Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';
import { firstRunGuard, setupCompleteGuard } from '@core/guards/first-run.guard';
import { featureFlagGuard } from '@core/guards/feature-flag.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shop',
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
        path: 'setup',
        canActivate: [AdminGuard, setupCompleteGuard],
        loadComponent: () =>
          import('./features/admin/components/setup-wizard/setup-wizard.component').then(
            (m) => m.SetupWizardComponent
          ),
      },
      {
        path: '_dev',
        canActivate: [AdminGuard, featureFlagGuard('seedDataEnabled')],
        loadChildren: () => import('./features/dev/dev.routes').then((m) => m.DEV_ROUTES),
      },
      {
        path: '',
        canActivate: [AdminGuard, firstRunGuard],
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'shop',
  },
];
