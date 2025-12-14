import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { authGuard } from '@core/guards/auth.guard';

export const adminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './components/products/products-list/products-list.component'
              ).then((m) => m.ProductsListComponent),
          },
          {
            path: 'create',
            loadComponent: () =>
              import(
                './components/products/product-create/product-create.component'
              ).then((m) => m.ProductCreateComponent),
          },
          {
            path: 'detail/:id',
            loadComponent: () =>
              import(
                './components/products/product-detail/product-detail.component'
              ).then((m) => m.ProductDetailComponent),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import(
                './components/products/product-create/product-create.component'
              ).then((m) => m.ProductCreateComponent),
          },
        ],
      },
      {
        path: 'categories',
        loadComponent: () =>
          import(
            './components/categories/categories-list/categories-list.component'
          ).then((m) => m.CategoriesListComponent),
      },
      {
        path: 'attributes',
        loadComponent: () =>
          import(
            './components/attributes/attributes-list/attributes-list.component'
          ).then((m) => m.AttributesListComponent),
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/orders/orders-list/orders-list.component').then(
                (m) => m.OrdersListComponent
              ),
          },
          {
            path: 'detail/:id',
            loadComponent: () =>
              import(
                './components/orders/order-detail/order-detail.component'
              ).then((m) => m.OrderDetailComponent),
          },
        ],
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./components/client/clients-list/clients-list.component').then(
            (m) => m.ClientsListComponent
          ),
      },
      {
        path: 'clients/:email/details',
        loadComponent: () =>
          import(
            './components/client/client-details/client-details.component'
          ).then((m) => m.ClientDetailsComponent),
      },
      {
        path: 'gestion-nosotros',
        loadComponent: () =>
          import(
            './components/about-us-management/about-us-management.component'
          ).then((m) => m.AboutUsManagementComponent),
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./components/account/account.component').then(
            (m) => m.AccountComponent
          ),
      },
      {
        path: 'home-management',
        loadComponent: () =>
          import('./components/home-management/home-management.component').then(
            (m) => m.HomeManagementComponent
          ),
      },
      {
        path: 'gestion-footer',
        loadComponent: () =>
          import(
            './components/footer-management/footer-management.component'
          ).then((m) => m.FooterManagementComponent),
      },
      {
        path: 'email-management',
        loadComponent: () =>
          import(
            './components/email-management/email-management.component'
          ).then((m) => m.EmailManagementComponent),
      },
    ],
  },
];