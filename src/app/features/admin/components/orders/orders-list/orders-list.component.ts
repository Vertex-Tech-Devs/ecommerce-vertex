import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import type { Order, OrderStatus, DeliveryType } from '@core/models/order.model';
import { OrderService } from '@core/services/order.service';
import type { Observable } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, from, of } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  startWith,
} from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { SweetAlertService } from '@core/services/sweet-alert.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyPipe, DatePipe, TitleCasePipe],
})
export class OrdersListComponent implements OnInit {
  private _orderService = inject(OrderService);
  private _router = inject(Router);
  private _sweetAlertService = inject(SweetAlertService);
  private destroyRef = inject(DestroyRef);

  currentPageSubject = new BehaviorSubject<number>(1);
  itemsPerPageSubject = new BehaviorSubject<number>(10);
  searchTermSubject = new BehaviorSubject<string>('');
  filterStatusSubject = new BehaviorSubject<string>('all');
  deliveryFilter = signal<'all' | DeliveryType>('all');

  private refreshTrigger = new BehaviorSubject<void>(undefined);

  itemsPerPageOptions = [5, 10, 20, 50];
  statusOptions: (OrderStatus | 'all')[] = [
    'all',
    'pending',
    'processing',
    'ready_for_pickup',
    'shipped',
    'delivered',
    'cancelled',
  ];

  totalOrders = 0;
  totalPages = 0;

  orders$!: Observable<Order[]>;

  ngOnInit(): void {
    this.orders$ = combineLatest([
      this.refreshTrigger.pipe(
        switchMap(() =>
          this._orderService.getOrders().pipe(
            startWith([] as Order[]),
            catchError((err) => {
              console.error('Error al cargar los pedidos:', err);
              return of([] as Order[]);
            }),
          ),
        ),
      ),
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.filterStatusSubject,
      toObservable(this.deliveryFilter),
      this.currentPageSubject,
      this.itemsPerPageSubject,
    ]).pipe(
      map(([orders, searchTerm, filterStatus, deliveryFilter, currentPage, itemsPerPage]) => {
        let filteredOrders = orders;

        if (searchTerm) {
          const lowerSearch = searchTerm.toLowerCase();
          filteredOrders = orders.filter(
            (order) =>
              order.clientName.toLowerCase().includes(lowerSearch) ||
              order.id.toLowerCase().includes(lowerSearch) ||
              order.status.toLowerCase().includes(lowerSearch),
          );
        }

        if (filterStatus !== 'all') {
          filteredOrders = filteredOrders.filter((order) => order.status === filterStatus);
        }

        if (deliveryFilter !== 'all') {
          filteredOrders = filteredOrders.filter((order) => {
            const type = order.deliverySelection?.type ?? 'home_delivery';
            return type === deliveryFilter;
          });
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
      }),
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

  onDeliveryFilterChange(newValue: string): void {
    this.deliveryFilter.set(newValue as 'all' | DeliveryType);
    this.currentPageSubject.next(1);
  }

  getDeliveryBadge(order: Order): {
    icon: string;
    cssClass: string;
    label: string;
    summary?: string;
  } {
    if (order.deliverySelection?.type === 'store_pickup') {
      return {
        icon: 'bi-shop',
        cssClass: 'badge bg-info-subtle text-info border border-info-subtle',
        label: 'Retiro en Local',
        summary: order.deliverySelection.pickupAddressFormatted ?? 'Sucursal',
      };
    }
    return {
      icon: 'bi-truck',
      cssClass: 'badge bg-secondary-subtle text-secondary border border-secondary-subtle',
      label: 'Envío a Domicilio',
      summary: order.shippingAddress
        ? `${order.shippingAddress.city}, ${order.shippingAddress.state}`
        : '',
    };
  }

  updateOrderStatus(order: Order, newStatus: OrderStatus): void {
    if (order.status === newStatus) {
      return;
    }
    this._orderService
      .updateOrder(order.id, { status: newStatus })
      .then(() => {
        this.refreshTrigger.next();
      })
      .catch((error: unknown) => {
        console.error('Error al actualizar el estado del pedido:', error);
      });
  }

  editOrder(order: Order): void {
    void this._router.navigate(['/admin/orders', order.id]);
  }

  deleteOrder(order: Order): void {
    void this._sweetAlertService
      .confirm('Eliminar Pedido', `¿Estás seguro de que quieres eliminar el pedido ${order.id}?`)
      .then((confirmed) => {
        if (confirmed) {
          from(this._orderService.deleteOrder(order.id))
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.refreshTrigger.next();
              },
              error: (error: unknown) => {
                console.error('Error al eliminar el pedido:', error);
              },
            });
        }
      });
  }
}
