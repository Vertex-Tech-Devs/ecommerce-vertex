import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { DocumentReference, WithFieldValue } from '@angular/fire/firestore';
import type { Category } from '@core/models/category.model';
import { FirestoreService } from './firestore.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private firestoreService = inject(FirestoreService<Category>);
  private readonly collectionPath = 'categories';

  getCategories(): Observable<Category[]> {
    return this.firestoreService.getAll(this.collectionPath).pipe(
      map((cats) =>
        [...cats].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (dateA && dateB) {
            return dateB - dateA;
          }
          return (a.name ?? '').localeCompare(b.name ?? '');
        }),
      ),
    );
  }

  addCategory(category: WithFieldValue<Omit<Category, 'id'>>): Promise<DocumentReference> {
    return this.firestoreService.create(
      this.collectionPath,
      category,
    ) as Promise<DocumentReference>;
  }

  updateCategory(id: string, category: Partial<Category>): Promise<void> {
    return this.firestoreService.update(this.collectionPath, id, category);
  }

  deleteCategory(id: string): Promise<void> {
    return this.firestoreService.delete(this.collectionPath, id);
  }
}
