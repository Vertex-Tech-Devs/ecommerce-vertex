import type { Routes } from '@angular/router';
import { Admin } from './admin';
import { DevGuard } from '@core/guards/dev.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'products',
        title: 'Productos',
        loadComponent: () =>
          import('./components/products/products-list/products-list').then((m) => m.ProductsList),
      },
      {
        path: 'products/create',
        title: 'Nuevo producto',
        loadComponent: () =>
          import('./components/products/product-create/product-create').then(
            (m) => m.ProductCreate,
          ),
      },
      {
        path: 'products/edit/:id',
        title: 'Editar producto',
        loadComponent: () =>
          import('./components/products/product-create/product-create').then(
            (m) => m.ProductCreate,
          ),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./components/products/product-detail/product-detail').then(
            (m) => m.ProductDetail,
          ),
      },
      {
        path: 'categories',
        title: 'Categorías',
        loadComponent: () =>
          import('./components/categories/categories-list/categories-list').then(
            (m) => m.CategoriesList,
          ),
      },
      {
        path: 'attributes',
        title: 'Atributos',
        loadComponent: () =>
          import('./components/attributes/attributes-list/attributes-list').then(
            (m) => m.AttributesList,
          ),
      },
      {
        path: 'orders',
        title: 'Pedidos',
        loadComponent: () =>
          import('./components/orders/orders-list/orders-list').then((m) => m.OrdersList),
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./components/orders/order-detail/order-detail').then((m) => m.OrderDetail),
      },
      {
        path: 'customers',
        title: 'Clientes',
        loadComponent: () =>
          import('./components/client/clients-list/clients-list').then((m) => m.ClientsList),
      },
      {
        path: 'customers/:email',
        loadComponent: () =>
          import('./components/client/client-details/client-details').then((m) => m.ClientDetails),
      },
      {
        path: 'home-management',
        title: 'Gestión Home',
        loadComponent: () =>
          import('./components/home-management/home-management').then((m) => m.HomeManagement),
      },
      {
        path: 'about-management',
        title: 'Gestión Nosotros',
        loadComponent: () =>
          import('./components/about-us-management/about-us-management').then(
            (m) => m.AboutUsManagement,
          ),
      },
      {
        path: 'footer-management',
        title: 'Gestión Footer',
        loadComponent: () =>
          import('./components/footer-management/footer-management').then(
            (m) => m.FooterManagement,
          ),
      },
      {
        path: 'email-management',
        title: 'Gestión de Emails',
        loadComponent: () =>
          import('./components/email-management/email-management').then((m) => m.EmailManagement),
      },
      {
        path: 'delivery',
        title: 'Sucursales & Entregas',
        loadComponent: () => import('./components/delivery/delivery').then((m) => m.Delivery),
      },
      {
        path: 'store-config',
        title: 'Configuración',
        loadComponent: () =>
          import('./components/store-config/store-config').then((m) => m.StoreConfig),
      },
      {
        path: '_dev',
        title: 'Desarrollo',
        canActivate: [DevGuard],
        loadComponent: () => import('./components/dev-panel/dev-panel').then((m) => m.DevPanel),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
