import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import type { Observable } from 'rxjs';

import type { HeroBanner } from '@core/models/home-content.model';
import type { Product } from '@core/models/product.model';
import { HomeContentService } from '@core/services/home-content.service';
import { ProductService } from '@core/services/product.service';
import { CarouselComponent } from '@shared/components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private homeContentService = inject(HomeContentService);
  private productService = inject(ProductService);

  heroBanner$!: Observable<HeroBanner | null>;
  newArrivals$!: Observable<Product[]>;

  ngOnInit(): void {
    this.heroBanner$ = this.homeContentService.getHeroBanner();
    this.newArrivals$ = this.productService.getLatestProducts(10);
  }

  isCarousel(banner: HeroBanner | null): boolean {
    return banner?.heroImages ? banner.heroImages.length > 1 : false;
  }

  getStaticImage(banner: HeroBanner | null): string | undefined {
    return banner?.heroImages?.[0] ?? banner?.imageUrl;
  }
}
