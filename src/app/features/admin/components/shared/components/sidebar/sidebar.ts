import { CommonModule } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, Output, EventEmitter, Input, signal, inject, DestroyRef } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class Sidebar implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() linkClicked = new EventEmitter<void>();

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isDev = !environment.production;

  // Estado reactivo de secciones colapsables
  readonly expanded = signal<Record<string, boolean>>({
    catalog: true,
    sales: true,
    locations: false,
    onlineStore: false,
    settings: false,
  });

  ngOnInit(): void {
    this.autoExpandForUrl(this.router.url);

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.autoExpandForUrl(event.urlAfterRedirects || event.url);
      });
  }

  toggleSection(sectionKey: string): void {
    this.expanded.update((state) => ({
      ...state,
      [sectionKey]: !state[sectionKey],
    }));
  }

  isExpanded(sectionKey: string): boolean {
    return !!this.expanded()[sectionKey];
  }

  isSectionActive(routes: string[]): boolean {
    const currentUrl = this.router.url;
    return routes.some((r) => currentUrl.startsWith(r));
  }

  private autoExpandForUrl(url: string): void {
    if (
      url.includes('/admin/products') ||
      url.includes('/admin/categories') ||
      url.includes('/admin/attributes')
    ) {
      this.expand('catalog');
    } else if (url.includes('/admin/orders') || url.includes('/admin/customers')) {
      this.expand('sales');
    } else if (url.includes('/admin/branches')) {
      this.expand('locations');
    } else if (
      url.includes('/admin/header-management') ||
      url.includes('/admin/home-management') ||
      url.includes('/admin/footer-management') ||
      url.includes('/admin/about-management')
    ) {
      this.expand('onlineStore');
    } else if (
      url.includes('/admin/store-config') ||
      url.includes('/admin/email-management') ||
      url.includes('/admin/_dev')
    ) {
      this.expand('settings');
    }
  }

  private expand(sectionKey: string): void {
    if (!this.expanded()[sectionKey]) {
      this.expanded.update((state) => ({ ...state, [sectionKey]: true }));
    }
  }

  onLinkClick(): void {
    this.linkClicked.emit();
  }

  onBackdropClick(): void {
    this.linkClicked.emit();
  }
}
