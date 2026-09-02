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
import { collection, query, where, doc, setDoc } from '@angular/fire/firestore';
import type { Order, OrderStatus } from '../models/order.model';
import { FirestoreService } from './firestore.service';
import { convertTimestampsToDates } from '@core/utils/date-converter';
import { tenantPath, storeIdFilter, resolveTenantId } from '@core/utils/tenant';
import { environment } from '../../../environments/environment';

/** Alfabeto base32 sin caracteres ambiguos (0/O, 1/I/L). */
const ORDER_ID_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/** Genera un ID de pedido corto y legible (8 chars) — colisión improbable a esta escala. */
export function generateShortOrderId(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let id = '';
  for (let i = 0; i < bytes.length; i++) {
    id += ORDER_ID_ALPHABET[bytes[i] % ORDER_ID_ALPHABET.length];
  }
  return id;
}

function cleanFirestoreData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }
  if (data instanceof Date) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((item) => cleanFirestoreData(item)) as unknown as T;
  }
  if (typeof data === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
      if (value !== undefined) {
        cleaned[key] = cleanFirestoreData(value);
      }
    }
    return cleaned as T;
  }
  return data;
}

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
    return this.firestoreService.getAll(this.collectionName).pipe(
      map((orders) =>
        [...orders].sort((a, b) => {
          const dateA =
            a.orderDate instanceof Date
              ? a.orderDate.getTime()
              : new Date(a.orderDate).getTime() || 0;
          const dateB =
            b.orderDate instanceof Date
              ? b.orderDate.getTime()
              : new Date(b.orderDate).getTime() || 0;
          return dateB - dateA;
        }),
      ),
    );
  }

  getOrderById(id: string): Observable<Order | undefined> {
    return this.firestoreService.get(this.collectionName, id) as Observable<Order | undefined>;
  }

  createOrder(order: WithFieldValue<Omit<Order, 'id'>>): Promise<DocumentReference<Order>> {
    return runInInjectionContext(this.injector, () => {
      // ID corto y legible (8 chars, base32 sin caracteres ambiguos) para el pedido.
      const orderId = generateShortOrderId();
      const ref = doc(
        this.firestore,
        tenantPath(this.collectionName),
        orderId,
      ) as DocumentReference<Order>;
      const tagged = cleanFirestoreData({
        ...(order as Record<string, unknown>),
        storeId: resolveTenantId(),
      });
      return setDoc(ref, tagged as unknown as WithFieldValue<Omit<Order, 'id'>>, {
        merge: true,
      }).then(() => ref);
    });
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
        where('status', 'in', ['pending', 'processing', 'paid', 'ready_for_pickup']),
      );
      return (collectionData(q, { idField: 'id' }) as Observable<Order[]>).pipe(
        map((items) => items.map((item) => convertTimestampsToDates(item) as Order)),
        map((orders) =>
          orders.sort((a, b) => {
            const dateA =
              a.orderDate instanceof Date
                ? a.orderDate.getTime()
                : new Date(a.orderDate).getTime() || 0;
            const dateB =
              b.orderDate instanceof Date
                ? b.orderDate.getTime()
                : new Date(b.orderDate).getTime() || 0;
            return dateB - dateA;
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
    return this.getOrders().pipe(
      map((orders) => orders.slice(0, count)),
      catchError((err) => {
        console.warn('Unable to load latest orders:', err);
        return of([]);
      }),
    );
  }

  async notifyOrderConfirmation(
    orderId: string,
    tenantId?: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${environment.api.cloudFunctionsUrl}/notifyOrderConfirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          tenantId: tenantId ?? resolveTenantId(),
          tenantProjectId:
            (typeof globalThis !== 'undefined' &&
              ((globalThis as Record<string, unknown>)[
                '__VERTEX_FIREBASE_PROJECT_ID__'
              ] as string)) ||
            environment.firebaseConfig.projectId,
        }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        return { success: false, error: data.error ?? `HTTP ${response.status}` };
      }
      return (await response.json()) as { success: boolean; error?: string };
    } catch (err) {
      console.warn('[OrderService] Could not trigger notifyOrderConfirmation directly:', err);
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  }
}
