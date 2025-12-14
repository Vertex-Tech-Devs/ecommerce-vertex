import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Order } from '@core/models/order.model';
import { OrderService } from '@core/services/order.service';
import { Observable, BehaviorSubject, combineLatest, from, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, startWith } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CurrencyPipe,
    DatePipe,
    TitleCasePipe
  ],
})
export class OrdersListComponent implements OnInit {
  private _orderService = inject(OrderService);
  private _router = inject(Router);

  public currentPageSubject = new BehaviorSubject<number>(1);
  public itemsPerPageSubject = new BehaviorSubject<number>(10);
  public searchTermSubject = new BehaviorSubject<string>('');
  public filterStatusSubject = new BehaviorSubject<string>('all');

  private refreshTrigger = new BehaviorSubject<void>(undefined);

  public itemsPerPageOptions = [5, 10, 20, 50];
  public statusOptions = ['all', 'pending', 'shipped', 'delivered', 'cancelled'];

  public totalOrders = 0;
  public totalPages = 0;

  public orders$!: Observable<Order[]>;

  ngOnInit(): void {
    this.orders$ = combineLatest([
      this.refreshTrigger.pipe(
        switchMap(() => this._orderService.getOrders().pipe(
          startWith([] as Order[]),
          catchError(err => {
            console.error('Error al cargar los pedidos:', err);
            return of([] as Order[]);
          })
        ))
      ),
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.filterStatusSubject,
      this.currentPageSubject,
      this.itemsPerPageSubject
    ]).pipe(
      map(([orders, searchTerm, filterStatus, currentPage, itemsPerPage]) => {

        let filteredOrders = orders;

        if (searchTerm) {
          const lowerSearch = searchTerm.toLowerCase();
          filteredOrders = orders.filter(order =>
            order.clientName.toLowerCase().includes(lowerSearch) ||
            order.id.toLowerCase().includes(lowerSearch) ||
            order.status.toLowerCase().includes(lowerSearch)
          );
        }

        if (filterStatus !== 'all') {
          filteredOrders = filteredOrders.filter(order => order.status === filterStatus);
        }

        this.totalOrders = filteredOrders.length;
        this.totalPages = Math.ceil(this.totalOrders / itemsPerPage);

        let correctedPage = currentPage;
        if (currentPage > this.totalPages && this.totalPages > 0) {
          correctedPage = this.totalPages;
        } else if (this.totalPages === 0) {
          correctedPage = 1;
        }

        const startIndex = (correctedPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredOrders.slice(startIndex, endIndex);
      })
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageSubject.next(page);
    }
  }

  onItemsPerPageChange(newValue: string | number): void {
    this.itemsPerPageSubject.next(Number(newValue));
    this.currentPageSubject.next(1);
  }

  onSearchTermChange(newValue: string): void {
    this.searchTermSubject.next(newValue);
    this.currentPageSubject.next(1);
  }

  onFilterStatusChange(newValue: string): void {
    this.filterStatusSubject.next(newValue);
    this.currentPageSubject.next(1);
  }

  editOrder(order: Order): void {
    this._router.navigate(['/admin/orders/edit', order.id]);
  }

  deleteOrder(order: Order): void {
    if (confirm(`¿Estás seguro de que quieres eliminar el pedido ${order.id}?`)) {
      from(this._orderService.deleteOrder(order.id)).subscribe({
        next: () => {
          console.log('Pedido eliminado con éxito:', order.id);
          this.refreshTrigger.next();
        },
        error: (error: any) => {
          console.error('Error al eliminar el pedido:', error);
        }
      });
    }
  }
}
