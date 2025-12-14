import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { HeroBanner } from '@core/models/home-content.model';
import { Product } from '@core/models/product.model';
import { HomeContentService } from '@core/services/home-content.service';
import { ProductService } from '@core/services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private homeContentService = inject(HomeContentService);
  private productService = inject(ProductService);

  public heroBanner$!: Observable<HeroBanner | null>;
  public newArrivals$!: Observable<Product[]>;

  ngOnInit(): void {
    this.heroBanner$ = this.homeContentService.getHeroBanner();
    this.newArrivals$ = this.productService.getLatestProducts(8);
  }
}
