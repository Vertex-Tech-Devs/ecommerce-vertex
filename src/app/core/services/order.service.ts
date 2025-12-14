import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Firestore,
  collectionData,
} from '@angular/fire/firestore';
import {
  DocumentReference,
  WithFieldValue,
  collection,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { Order, OrderStatus } from '../models/order.model';
import { FirestoreService } from './firestore.service';
import { convertTimestampsToDates } from '@core/utils/date-converter';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private firestoreService = inject(FirestoreService<Order>);
  private firestore = inject(Firestore);
  private injector = inject(Injector);
  private readonly collectionPath = 'orders';

  getOrders(): Observable<Order[]> {
    return this.firestoreService.getAll(this.collectionPath);
  }

  getOrderById(id: string): Observable<Order | undefined> {
    return this.firestoreService.get(this.collectionPath, id) as Observable<Order | undefined>;
  }

  createOrder(order: WithFieldValue<Omit<Order, 'id'>>): Promise<DocumentReference<Order>> {
    return this.firestoreService.create(this.collectionPath, order) as Promise<DocumentReference<Order>>;
  }

  updateOrder(id: string, order: Partial<Order>): Promise<void> {
    return this.firestoreService.update(this.collectionPath, id, order);
  }

  deleteOrder(id: string): Promise<void> {
    return this.firestoreService.delete(this.collectionPath, id);
  }

  getGlobalSalesAndOrders(): Observable<{ totalSales: number; totalOrders: number }> {
    return this.getOrders().pipe(
      map(orders => {
        const totalSales = orders
          .filter(order => order.status === 'delivered')
          .reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        return { totalSales, totalOrders };
      })
    );
  }

  getMonthlySalesAndOrders(): Observable<{ monthlySales: number; monthlyOrders: number }> {
    const CONFIRMED_SALES_STATUSES: OrderStatus[] = ['processing', 'shipped', 'delivered'];
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, this.collectionPath);
      const q = query(
        collectionRef,
        where('orderDate', '>=', startOfMonth)
      );

      return (collectionData(q, { idField: 'id' }) as Observable<any[]>).pipe(
        map(items => items.map(item => convertTimestampsToDates(item) as Order)),
        map(ordersInCurrentMonth => {
          
          const monthlyOrdersCount = ordersInCurrentMonth.length;
          
          const monthlySales = ordersInCurrentMonth
            .filter(order => CONFIRMED_SALES_STATUSES.includes(order.status))
            .reduce((sum, order) => sum + order.total, 0);

          return { monthlySales, monthlyOrders: monthlyOrdersCount };
        })
      );
    });
  }

  getPendingOrProcessingOrders(): Observable<Order[]> {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, this.collectionPath);
      const q = query(
        collectionRef,
        where('status', 'in', ['pending', 'processing'])
      );
      return (collectionData(q, { idField: 'id' }) as Observable<any[]>).pipe(
        map(items => items.map(item => convertTimestampsToDates(item) as Order)),
        map(orders => orders.sort((a, b) => a.orderDate.getTime() - b.orderDate.getTime()))
      );
    });
  }

  getLatestOrders(count: number = 10): Observable<Order[]> {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, this.collectionPath);
      const q = query(
        collectionRef,
        orderBy('orderDate', 'desc'),
        limit(count)
      );
      return (collectionData(q, { idField: 'id' }) as Observable<any[]>).pipe(
        map(items => items.map(item => convertTimestampsToDates(item) as Order))
      );
    });
  }
}