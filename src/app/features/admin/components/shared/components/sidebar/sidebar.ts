import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface NavItem {
  readonly label: string;
  readonly route: string;
  readonly icon: string;
  readonly exact?: boolean;
}

export interface NavSection {
  readonly title: string;
  readonly items: readonly NavItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class Sidebar {
  @Input() isOpen: boolean = false;
  @Output() linkClicked = new EventEmitter<void>();

  readonly navSections: readonly NavSection[] = [
    {
      title: 'PRINCIPAL',
      items: [
        {
          label: 'Dashboard',
          route: '/admin/dashboard',
          icon: 'bi-speedometer2',
          exact: true,
        },
        {
          label: 'Pedidos',
          route: '/admin/orders',
          icon: 'bi-box-seam',
        },
        {
          label: 'Clientes',
          route: '/admin/customers',
          icon: 'bi-people',
        },
      ],
    },
    {
      title: 'CATÁLOGO',
      items: [
        {
          label: 'Productos',
          route: '/admin/products',
          icon: 'bi-tags',
        },
        {
          label: 'Categorías',
          route: '/admin/categories',
          icon: 'bi-grid',
        },
        {
          label: 'Atributos',
          route: '/admin/attributes',
          icon: 'bi-palette',
        },
      ],
    },
    {
      title: 'TIENDA ONLINE',
      items: [
        {
          label: 'Inicio / Portada',
          route: '/admin/home-management',
          icon: 'bi-window',
        },
        {
          label: 'Quiénes Somos',
          route: '/admin/about-management',
          icon: 'bi-info-circle',
        },
        {
          label: 'Pie de Página',
          route: '/admin/footer-management',
          icon: 'bi-layout-text-window-reverse',
        },
      ],
    },
    {
      title: 'CONFIGURACIÓN',
      items: [
        {
          label: 'Ajustes Generales',
          route: '/admin/store-config',
          icon: 'bi-gear',
        },
        {
          label: 'Plantillas de Email',
          route: '/admin/email-management',
          icon: 'bi-envelope',
        },
        // TODO: Acoplar "Sucursales & Entregas" (/admin/branches) en el siguiente commit
      ],
    },
  ];

  onLinkClick(): void {
    this.linkClicked.emit();
  }

  onBackdropClick(): void {
    this.linkClicked.emit();
  }
}
