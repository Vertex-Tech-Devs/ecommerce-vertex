import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import type { Client } from '../models/client.model';
import type { Order } from '../models/order.model';
import { FirestoreService } from './firestore.service';
import { collection, query, where, orderBy, limit } from '@angular/fire/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { convertTimestampsToDates } from '@core/utils/date-converter';
import { tenantPath, storeIdFilter, resolveTenantId } from '@core/utils/tenant';

import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private firestoreService = inject(FirestoreService<Client>);
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);
  private readonly clientsCollectionName = 'clients';
  private readonly ordersCollectionName = 'orders';

  getClients(): Observable<Client[]> {
    return this.firestoreService.getAll(this.clientsCollectionName).pipe(
      map((clients) =>
        [...clients].sort((a, b) => {
          const dateA = a.lastOrderDate ?? a.firstOrderDate ?? 0;
          const dateB = b.lastOrderDate ?? b.firstOrderDate ?? 0;
          const timeA = dateA instanceof Date ? dateA.getTime() : (new Date(dateA).getTime() || 0);
          const timeB = dateB instanceof Date ? dateB.getTime() : (new Date(dateB).getTime() || 0);
          return timeB - timeA;
        }),
      ),
    );
  }

  getClientByEmail(email: string): Observable<Client | undefined> {
    const cleanEmail = email.trim();
    const compositeId = `${resolveTenantId()}_${cleanEmail}`;
    return this.firestoreService.get(this.clientsCollectionName, compositeId).pipe(
      switchMap((client) => {
        if (client) {
return of(client);
}
        return this.firestoreService.get(this.clientsCollectionName, cleanEmail).pipe(
          switchMap((directClient) => {
            if (directClient) {
return of(directClient);
}
            return this.getClients().pipe(
              map((all) => all.find((c) => c.email.toLowerCase() === cleanEmail.toLowerCase())),
            );
          }),
        );
      }),
    );
  }

  getOrdersByClientEmail(email: string): Observable<Order[]> {
    return runInInjectionContext(this.injector, () => {
      const q = query(
        collection(this.firestore, tenantPath(this.ordersCollectionName)),
        storeIdFilter(),
        where('clientEmail', '==', email),
      );
      return (collectionData(q, { idField: 'id' }) as Observable<Order[]>).pipe(
        map((items) => items.map((item) => convertTimestampsToDates(item) as Order)),
        catchError((err) => {
          console.warn(`Unable to load orders for client ${email}:`, err);
          return of([]);
        }),
      );
    });
  }

  getTotalClients(): Observable<number> {
    return this.getClients().pipe(map((clients) => clients.length));
  }

  getNewClientsThisMonth(): Observable<number> {
    return runInInjectionContext(this.injector, () => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const q = query(
        collection(this.firestore, tenantPath(this.clientsCollectionName)),
        storeIdFilter(),
        where('firstOrderDate', '>=', startOfMonth),
      );

      return (collectionData(q) as Observable<Client[]>).pipe(
        map((clients) => clients.length),
        catchError((err) => {
          console.warn('Unable to load new clients count this month:', err);
          return of(0);
        }),
      );
    });
  }

  getLatestClients(count: number = 10): Observable<Client[]> {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, tenantPath(this.clientsCollectionName));
      const q = query(
        collectionRef,
        storeIdFilter(),
        orderBy('lastOrderDate', 'desc'),
        limit(count),
      );
      return (collectionData(q, { idField: 'id' }) as Observable<Client[]>).pipe(
        map((items) => items.map((item) => convertTimestampsToDates(item) as Client)),
        catchError((err) => {
          console.warn('Unable to load latest clients:', err);
          return of([]);
        }),
      );
    });
  }
}
