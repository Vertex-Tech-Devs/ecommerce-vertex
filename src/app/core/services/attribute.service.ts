import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import type { DocumentReference } from '@angular/fire/firestore';
import type { Attribute } from '@core/models/attribute.model';
import { FirestoreService } from './firestore.service';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
  private firestoreService = inject(FirestoreService<Attribute>);
  private readonly collectionPath = 'attributes';

  getAttributes(): Observable<Attribute[]> {
    return this.firestoreService.getAll(this.collectionPath).pipe(
      map((attrs) =>
        [...attrs].sort((a, b) => {
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

  getAttributeById(id: string): Observable<Attribute | undefined> {
    return this.firestoreService.get(this.collectionPath, id);
  }

  addAttribute(attribute: Attribute): Promise<DocumentReference> {
    return this.firestoreService.create(
      this.collectionPath,
      attribute,
    ) as Promise<DocumentReference>;
  }

  updateAttribute(id: string, attribute: Partial<Attribute>): Promise<void> {
    return this.firestoreService.update(this.collectionPath, id, attribute);
  }

  deleteAttribute(id: string): Promise<void> {
    return this.firestoreService.delete(this.collectionPath, id);
  }
}
