import { Routes } from '@angular/router';
import { SeedDataComponent } from './components/seed-data/seed-data.component';
import { MakeAdminComponent } from './components/make-admin/make-admin.component';

export const DEV_ROUTES: Routes = [
  {
    path: 'seed',
    component: SeedDataComponent,
  },
  {
    path: 'make-admin',
    component: MakeAdminComponent,
  },
];
