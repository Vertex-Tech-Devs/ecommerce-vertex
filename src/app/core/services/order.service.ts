import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Firestore, collectionData } from '@angular/fire/firestore';
import type {
  DocumentReference,
  WithFieldValue,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';
import { collection, query, where, orderBy, limit } from '@angular/fire/firestore';
import type { Order, OrderStatus } from '../models/order.model';
import { FirestoreService } from './firestore.service';
import { convertTimestampsToDates } from '@core/utils/date-converter';
import { tenantPath, storeIdFilter } from '@core/utils/tenant';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private firestoreService = inject(FirestoreService<Order>);
  private firestore = inject(Firestore);
  private injector = inject(Injector);
  private readonly collectionName = 'orders';

  private get collectionRef(): CollectionReference<DocumentData> {
    return collection(this.firestore, tenantPath(this.collectionName));
  }

  getOrders(): Observable<Order[]> {
    return this.firestoreService.getAll(this.collectionName);
  }

  getOrderById(id: string): Observable<Order | undefined> {
    return this.firestoreService.get(this.collectionName, id) as Observable<Order | undefined>;
  }

  createOrder(order: WithFieldValue<Omit<Order, 'id'>>): Promise<DocumentReference<Order>> {
    return this.firestoreService.create(this.collectionName, order) as Promise<
      DocumentReference<Order>
    >;
  }

  updateOrder(id: string, order: Partial<Order>): Promise<void> {
    return this.firestoreService.update(this.collectionName, id, order);
  }

  deleteOrder(id: string): Promise<void> {
    return this.firestoreService.delete(this.collectionName, id);
  }

  getGlobalSalesAndOrders(): Observable<{ totalSales: number; totalOrders: number }> {
    return runInInjectionContext(this.injector, () => {
      const q = query(this.collectionRef, storeIdFilter(), where('status', '==', 'delivered'));
      return (collectionData(q, { idField: 'id' }) as Observable<Order[]>).pipe(
        map((orders) => {
          const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
          return { totalSales, totalOrders: orders.length };
        }),
        catchError((err) => {
          console.warn('Unable to load global sales and orders metrics:', err);
          return of({ totalSales: 0, totalOrders: 0 });
        }),
      );
    });
  }

  getMonthlySalesAndOrders(): Observable<{ monthlySales: number; monthlyOrders: number }> {
    const CONFIRMED_SALES_STATUSES: OrderStatus[] = ['processing', 'shipped', 'delivered'];

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return runInInjectionContext(this.injector, () => {
      const q = query(this.collectionRef, storeIdFilter(), where('orderDate', '>=', startOfMonth));
      return (collectionData(q, { idField: 'id' }) as Observable<Order[]>).pipe(
        map((items) => items.map((item) => convertTimestampsToDates(item) as Order)),
        map((ordersInCurrentMonth) => {
          const monthlyOrdersCount = ordersInCurrentMonth.length;

          const monthlySales = ordersInCurrentMonth
            .filter((order) => CONFIRMED_SALES_STATUSES.includes(order.status))
            .reduce((sum, order) => sum + order.total, 0);

          return { monthlySales, monthlyOrders: monthlyOrdersCount };
        }),
        catchError((err) => {
          console.warn('Unable to load monthly sales and orders metrics:', err);
          return of({ monthlySales: 0, monthlyOrders: 0 });
        }),
      );
    });
  }

  getPendingOrProcessingOrders(): Observable<Order[]> {
    return runInInjectionContext(this.injector, () => {
      const q = query(
        this.collectionRef,
        storeIdFilter(),
        where('status', 'in', ['pending', 'processing']),
      );
      return (collectionData(q, { idField: 'id' }) as Observable<Order[]>).pipe(
        map((items) => items.map((item) => convertTimestampsToDates(item) as Order)),
        map((orders) =>
          orders.sort((a, b) => {
            const dateA = a.orderDate instanceof Date ? a.orderDate.getTime() : 0;
            const dateB = b.orderDate instanceof Date ? b.orderDate.getTime() : 0;
            return dateA - dateB;
          }),
        ),
        catchError((err) => {
          console.warn('Unable to load pending/processing orders:', err);
          return of([]);
        }),
      );
    });
  }

  getLatestOrders(count: number = 10): Observable<Order[]> {
    return runInInjectionContext(this.injector, () => {
      const q = query(
        this.collectionRef,
        storeIdFilter(),
        orderBy('orderDate', 'desc'),
        limit(count),
      );
      return (collectionData(q, { idField: 'id' }) as Observable<Order[]>).pipe(
        map((items) => items.map((item) => convertTimestampsToDates(item) as Order)),
        catchError((err) => {
          console.warn('Unable to load latest orders:', err);
          return of([]);
        }),
      );
    });
  }
}
