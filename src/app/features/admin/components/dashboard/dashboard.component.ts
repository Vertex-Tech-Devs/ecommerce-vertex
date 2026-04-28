import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
  HostListener,
  computed,
} from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, combineLatest, map, catchError, of } from 'rxjs';
import { ProductService } from '@core/services/product.service';
import { OrderService } from '@core/services/order.service';
import { ClientService } from '@core/services/client.service';
import { Order } from '@core/models/order.model';
import { Product } from '@core/models/product.model';
import { Client } from '@core/models/client.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterModule, SlicePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private clientService = inject(ClientService);

  public activeTab = signal<'orders' | 'clients' | 'products'>('orders');
  public screenWidth = signal<number>(window.innerWidth);
  public isMobile = computed(() => this.screenWidth() < 768);

  public monthlyMetrics$!: Observable<{ sales: number; orders: number; newClients: number }>;
  public globalMetrics$!: Observable<{
    totalSales: number;
    totalOrders: number;
    totalClients: number;
  }>;
  public pendingOrders$!: Observable<Order[]>;
  public lowStockProducts$!: Observable<Product[]>;
  public latestOrders$!: Observable<Order[]>;
  public latestClients$!: Observable<Client[]>;
  public latestProducts$!: Observable<Product[]>;

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }

  ngOnInit(): void {
    this.monthlyMetrics$ = combineLatest([
      this.orderService.getMonthlySalesAndOrders(),
      this.clientService.getNewClientsThisMonth(),
    ]).pipe(
      map(([orderStats, newClientsCount]) => ({
        sales: orderStats.monthlySales,
        orders: orderStats.monthlyOrders,
        newClients: newClientsCount,
      })),
      catchError(() => of({ sales: 0, orders: 0, newClients: 0 }))
    );

    this.globalMetrics$ = combineLatest([
      this.orderService.getGlobalSalesAndOrders(),
      this.clientService.getTotalClients(),
    ]).pipe(
      map(([orderStats, totalClientsCount]) => ({
        totalSales: orderStats.totalSales,
        totalOrders: orderStats.totalOrders,
        totalClients: totalClientsCount,
      })),
      catchError(() => of({ totalSales: 0, totalOrders: 0, totalClients: 0 }))
    );

    this.pendingOrders$ = this.orderService.getPendingOrProcessingOrders();
    this.lowStockProducts$ = this.productService.getProductsLowInStock(10);
    this.latestOrders$ = this.orderService.getLatestOrders(10);
    this.latestClients$ = this.clientService.getLatestClients(10);
    this.latestProducts$ = this.productService.getLatestProducts(10);
  }

  setTab(tab: 'orders' | 'clients' | 'products') {
    this.activeTab.set(tab);
  }
}
