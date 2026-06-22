import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import type { DocumentReference, UpdateData, WithFieldValue } from 'firebase/firestore';
import { collection, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap, catchError, shareReplay, take } from 'rxjs/operators';
import { convertTimestampsToDates } from '@core/utils/date-converter';
import { tenantPath } from '@core/utils/tenant';
import { StoreConfigSchema } from '@vertex/contracts';

interface BaseEntity {
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService<T extends BaseEntity> {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);

  getAll(collectionName: string): Observable<T[]> {
    return runInInjectionContext(this.injector, () => {
      const tenantRef = collection(this.firestore, tenantPath(collectionName));
      const legacyRef = collection(this.firestore, collectionName);

      const tenantData$ = (collectionData(tenantRef, { idField: 'id' }) as Observable<T[]>).pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      );
      const legacyData$ = collectionData(legacyRef, { idField: 'id' }) as Observable<T[]>;

      return tenantData$.pipe(
        take(1),
        switchMap((items) => {
          if (items.length === 0) {
            return legacyData$;
          }
          return tenantData$;
        }),
        map((items) =>
          items.map((item) => {
            const converted = convertTimestampsToDates(item);
            if (collectionName === 'configuracion') {
              StoreConfigSchema.parse(converted);
            }
            return converted as T;
          })
        ),
        catchError((err) => {
          console.warn(`Unable to load collection ${collectionName}:`, err);
          return of([]);
        })
      );
    });
  }

  get(collectionName: string, id: string): Observable<T | undefined> {
    return runInInjectionContext(this.injector, () => {
      const tenantDocRef = doc(this.firestore, tenantPath(collectionName), id);
      const legacyDocRef = doc(this.firestore, collectionName, id);

      const tenantData$ = (
        docData(tenantDocRef, { idField: 'id' }) as Observable<T | undefined>
      ).pipe(shareReplay({ bufferSize: 1, refCount: true }));
      const legacyData$ = docData(legacyDocRef, { idField: 'id' }) as Observable<T | undefined>;

      return tenantData$.pipe(
        take(1),
        switchMap((item) => {
          if (!item) {
            return legacyData$;
          }
          return tenantData$;
        }),
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
        })
      );
    });
  }

  create(
    collectionName: string,
    data: WithFieldValue<Omit<T, 'id'>>
  ): Promise<DocumentReference<T>> {
    const collectionRef = collection(this.firestore, tenantPath(collectionName));
    return addDoc(collectionRef, data) as Promise<DocumentReference<T>>;
  }

  update(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const documentRef = doc(this.firestore, tenantPath(collectionName), id);
    return updateDoc(documentRef, data as UpdateData<T>);
  }

  delete(collectionName: string, id: string): Promise<void> {
    const documentRef = doc(this.firestore, tenantPath(collectionName), id);
    return deleteDoc(documentRef);
  }
}
