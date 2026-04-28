import type { Routes } from '@angular/router';

export const DEV_ROUTES: Routes = [
  {
    path: 'seed',
    loadComponent: () =>
      import('./components/seed-data/seed-data.component').then((m) => m.SeedDataComponent),
  },
  {
    path: 'make-admin',
    loadComponent: () =>
      import('./components/make-admin/make-admin.component').then((m) => m.MakeAdminComponent),
  },
];
