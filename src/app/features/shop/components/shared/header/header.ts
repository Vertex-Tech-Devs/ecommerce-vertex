import { Component, inject, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { StoreConfigService } from '@core/services/store-config.service';

@Component({
  selector: 'app-shop-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly cartService = inject(CartService);
  private readonly storeConfigService = inject(StoreConfigService);

  readonly cartItemCount = this.cartService.itemCount;
  readonly storeConfig = this.storeConfigService.storeConfig;

  readonly storeName = computed(() => this.storeConfig()?.storeName ?? 'Mi Tienda');
  readonly logoUrl = computed(() => this.storeConfig()?.logoUrl ?? '');
  readonly brandDisplayMode = computed(() => this.storeConfig()?.brandDisplayMode ?? 'text');

  readonly showLogo = computed(() => {
    const mode = this.brandDisplayMode();
    const logo = this.logoUrl().trim();
    return (mode === 'logo' || mode === 'both') && logo.length > 0;
  });

  readonly showText = computed(() => {
    const mode = this.brandDisplayMode();
    const logo = this.logoUrl().trim();
    return mode === 'text' || mode === 'both' || logo.length === 0;
  });

  readonly announcementBar = computed(() => this.storeConfig()?.announcementBar);

  readonly isMenuOpen = signal(false);
  readonly isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || 0;
    this.isScrolled.set(scrollOffset > 20);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  isExternalLink(link?: string): boolean {
    if (!link) {
      return false;
    }
    return link.startsWith('http://') || link.startsWith('https://') || link.startsWith('//');
  }
}
