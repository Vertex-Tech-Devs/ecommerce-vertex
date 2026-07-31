import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import type { DocumentReference, UpdateData, WithFieldValue } from '@angular/fire/firestore';
import { collection, doc, addDoc, updateDoc, deleteDoc, query } from '@angular/fire/firestore';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { convertTimestampsToDates } from '@core/utils/date-converter';
import { storeIdFilter, resolveTenantId } from '@core/utils/tenant';
import { StoreConfigSchema } from '@vertex/contracts';

interface BaseEntity {
  id?: string;
}

/**
 * Generic CRUD over flat root-level collections.
 * Tenant isolation is enforced via the `storeId` field: reads apply
 * `where('storeId', '==', activeStoreId)` and creates stamp the field.
 */
@Injectable({
  providedIn: 'root',
})
export class FirestoreService<T extends BaseEntity> {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);

  getAll(collectionName: string): Observable<T[]> {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = query(collection(this.firestore, collectionName), storeIdFilter());
      const data$ = (collectionData(collectionRef, { idField: 'id' }) as Observable<T[]>).pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        map((items) =>
          items.map((item) => {
            const converted = convertTimestampsToDates(item);
            if (collectionName === 'configuracion') {
              StoreConfigSchema.parse(converted);
            }
            return converted as T;
          }),
        ),
        catchError((err) => {
          console.warn(`Unable to load collection ${collectionName}:`, err);
          return of([]);
        }),
      );
      return data$;
    });
  }

  get(collectionName: string, id: string): Observable<T | undefined> {
    return runInInjectionContext(this.injector, () => {
      const documentRef = doc(this.firestore, collectionName, id);
      return (docData(documentRef, { idField: 'id' }) as Observable<T | undefined>).pipe(
        map((item) => {
          if (!item) {
            return undefined;
          }
          const converted = convertTimestampsToDates(item);
          if (collectionName === 'configuracion') {
            StoreConfigSchema.parse(converted);
          }
          return converted as T;
        }),
        catchError((err) => {
          console.warn(`Unable to load document ${id} from ${collectionName}:`, err);
          return of(undefined);
        }),
      );
    });
  }

  create(
    collectionName: string,
    data: WithFieldValue<Omit<T, 'id'>>,
  ): Promise<DocumentReference<T>> {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, collectionName);
      const tagged = {
        ...(data as Record<string, unknown>),
        storeId: resolveTenantId(),
      };
      return addDoc(collectionRef, tagged as unknown as WithFieldValue<Omit<T, 'id'>>) as Promise<
        DocumentReference<T>
      >;
    });
  }

  update(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const documentRef = doc(this.firestore, collectionName, id);
      return updateDoc(documentRef, data as UpdateData<T>);
    });
  }

  delete(collectionName: string, id: string): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const documentRef = doc(this.firestore, collectionName, id);
      return deleteDoc(documentRef);
    });
  }
}
