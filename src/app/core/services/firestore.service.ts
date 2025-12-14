import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentReference,
  UpdateData,
  WithFieldValue,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertTimestampsToDates } from '@core/utils/date-converter';

interface BaseEntity {
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService<T extends BaseEntity> {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);

  getAll(path: string): Observable<T[]> {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, path);
      return (collectionData(collectionRef, { idField: 'id' }) as Observable<any[]>).pipe(
        map(items => items.map(item => convertTimestampsToDates(item) as T))
      );
    });
  }

  get(path: string, id: string): Observable<T | undefined> {
    return runInInjectionContext(this.injector, () => {
      const documentRef = doc(this.firestore, `${path}/${id}`);
      return (docData(documentRef, { idField: 'id' }) as Observable<any | undefined>).pipe(
        map(item => (item ? (convertTimestampsToDates(item) as T) : undefined))
      );
    });
  }

  create(path: string, data: WithFieldValue<Omit<T, 'id'>>): Promise<DocumentReference<T>> {
    const collectionRef = collection(this.firestore, path);
    return addDoc(collectionRef, data) as Promise<DocumentReference<T>>;
  }

  update(path: string, id: string, data: Partial<T>): Promise<void> {
    const documentRef = doc(this.firestore, `${path}/${id}`);
    return updateDoc(documentRef, data as UpdateData<T>);
  }

  delete(path: string, id: string): Promise<void> {
    const documentRef = doc(this.firestore, `${path}/${id}`);
    return deleteDoc(documentRef);
  }
}