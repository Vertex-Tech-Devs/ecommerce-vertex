import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

export interface NavItem {
  readonly label: string;
  readonly route: string;
  readonly icon: string;
  readonly exact?: boolean;
}

export interface NavSection {
  readonly id: string;
  readonly title: string;
  readonly collapsible?: boolean;
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

  private readonly router = inject(Router);

  readonly expandedSections = signal<Record<string, boolean>>({
    'online-store': false,
    config: false,
  });

  readonly navSections: readonly NavSection[] = [
    {
      id: 'principal',
      title: 'PRINCIPAL',
      collapsible: false,
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
      id: 'catalog',
      title: 'CATÁLOGO',
      collapsible: false,
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
      id: 'online-store',
      title: 'TIENDA ONLINE',
      collapsible: true,
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
      id: 'config',
      title: 'CONFIGURACIÓN',
      collapsible: true,
      items: [
        {
          label: 'Sucursales & Entregas',
          route: '/admin/delivery',
          icon: 'bi-geo-alt',
        },
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
      ],
    },
  ];

  constructor() {
    this.checkAndExpandActiveSection(this.router.url);

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.checkAndExpandActiveSection(event.urlAfterRedirects || event.url);
      });
  }

  toggleSection(sectionId: string): void {
    this.expandedSections.update((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }

  isSectionExpanded(section: NavSection): boolean {
    if (!section.collapsible) {
      return true;
    }
    return !!this.expandedSections()[section.id];
  }

  onLinkClick(): void {
    this.linkClicked.emit();
  }

  onBackdropClick(): void {
    this.linkClicked.emit();
  }

  private checkAndExpandActiveSection(url: string): void {
    if (!url) {
      return;
    }
    const cleanUrl = url.split('?')[0].split('#')[0];

    for (const section of this.navSections) {
      if (!section.collapsible) {
        continue;
      }

      const hasActiveItem = section.items.some((item) => {
        if (item.exact) {
          return cleanUrl === item.route;
        }
        return cleanUrl === item.route || cleanUrl.startsWith(`${item.route}/`);
      });

      if (hasActiveItem && !this.expandedSections()[section.id]) {
        this.expandedSections.update((prev) => ({
          ...prev,
          [section.id]: true,
        }));
      }
    }
  }
}
