import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { Order } from '../models/order.model';
import { FirestoreService } from './firestore.service';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { convertTimestampsToDates } from '@core/utils/date-converter';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private firestoreService = inject(FirestoreService<Client>);
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);
  private readonly clientsCollectionPath = 'clients';
  private readonly ordersCollectionPath = 'orders';

  getClients(): Observable<Client[]> {
    return this.firestoreService.getAll(this.clientsCollectionPath);
  }

  getClientByEmail(email: string): Observable<Client | undefined> {
    return this.firestoreService.get(this.clientsCollectionPath, email);
  }

  getOrdersByClientEmail(email: string): Observable<Order[]> {
    return runInInjectionContext(this.injector, () => {
      const q = query(
        collection(this.firestore, this.ordersCollectionPath),
        where('clientEmail', '==', email)
      );
      return (collectionData(q, { idField: 'id' }) as Observable<any[]>).pipe(
        map(items => items.map(item => convertTimestampsToDates(item) as Order))
      );
    });
  }

  getTotalClients(): Observable<number> {
    return this.getClients().pipe(map(clients => clients.length));
  }

  getNewClientsThisMonth(): Observable<number> {
    return runInInjectionContext(this.injector, () => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const q = query(
        collection(this.firestore, this.clientsCollectionPath),
        where('firstOrderDate', '>=', startOfMonth)
      );

      return (collectionData(q) as Observable<Client[]>).pipe(
        map(clients => clients.length)
      );
    });
  }

  getLatestClients(count: number = 10): Observable<Client[]> {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, this.clientsCollectionPath);
      const q = query(
        collectionRef,
        orderBy('lastOrderDate', 'desc'),
        limit(count)
      );
      return (collectionData(q, { idField: 'id' }) as Observable<any[]>).pipe(
        map(items => items.map(item => convertTimestampsToDates(item) as Client))
      );
    });
  }
}