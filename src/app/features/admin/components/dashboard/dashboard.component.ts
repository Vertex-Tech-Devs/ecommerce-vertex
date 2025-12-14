import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Observable, combineLatest, map, catchError, of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { OrderService } from '@core/services/order.service';
import { ClientService } from '@core/services/client.service';
import { Order } from '@core/models/order.model';
import { Product } from '@core/models/product.model';
import { Client } from '@core/models/client.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    RouterModule,
    TitleCasePipe
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private clientService = inject(ClientService);

  public monthlyMetrics$!: Observable<{ sales: number; orders: number; newClients: number }>;
  public globalMetrics$!: Observable<{ totalSales: number; totalOrders: number; totalClients: number }>;
  public pendingOrders$!: Observable<Order[]>;
  public lowStockProducts$!: Observable<Product[]>;
  public latestOrders$!: Observable<Order[]>;
  public latestClients$!: Observable<Client[]>;
  public latestProducts$!: Observable<Product[]>;

  ngOnInit(): void {
    this.monthlyMetrics$ = combineLatest([
      this.orderService.getMonthlySalesAndOrders(),
      this.clientService.getNewClientsThisMonth()
    ]).pipe(
      map(([orderStats, newClientsCount]) => ({
        sales: orderStats.monthlySales,
        orders: orderStats.monthlyOrders,
        newClients: newClientsCount
      })),
      catchError(err => {
        console.error('Error al cargar métricas mensuales:', err);
        return of({ sales: 0, orders: 0, newClients: 0 });
      })
    );

    this.globalMetrics$ = combineLatest([
      this.orderService.getGlobalSalesAndOrders(),
      this.clientService.getTotalClients()
    ]).pipe(
      map(([orderStats, totalClientsCount]) => ({
        totalSales: orderStats.totalSales,
        totalOrders: orderStats.totalOrders,
        totalClients: totalClientsCount
      })),
      catchError(err => {
        console.error('Error al cargar métricas globales:', err);
        return of({ totalSales: 0, totalOrders: 0, totalClients: 0 });
      })
    );

    this.pendingOrders$ = this.orderService.getPendingOrProcessingOrders().pipe(
      catchError(err => {
        console.error('Error al cargar pedidos pendientes:', err);
        return of([]);
      })
    );
    
    this.lowStockProducts$ = this.productService.getProductsLowInStock(5).pipe(
      catchError(err => {
        console.error('Error al cargar productos con bajo stock:', err);
        return of([]);
      })
    );
    
    this.latestOrders$ = this.orderService.getLatestOrders(10).pipe(
      catchError(err => {
        console.error('Error al cargar últimos pedidos:', err);
        return of([]);
      })
    );
    
    this.latestClients$ = this.clientService.getLatestClients(10).pipe(
      catchError(err => {
        console.error('Error al cargar últimos clientes:', err);
        return of([]);
      })
    );
    
    this.latestProducts$ = this.productService.getLatestProducts(10).pipe(
      catchError(err => {
        console.error('Error al cargar últimos productos:', err);
        return of([]);
      })
    );
  }
}