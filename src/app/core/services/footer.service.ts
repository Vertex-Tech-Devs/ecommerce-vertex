import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc, getDoc } from '@angular/fire/firestore';
import type { DocumentReference } from '@angular/fire/firestore';
import type { Observable } from 'rxjs';
import { from, of } from 'rxjs';
import { map, catchError, timeout } from 'rxjs';
import type { FooterData } from '@core/models/footer.model';
import { tenantPath, storeDocId, resolveTenantId } from '@core/utils/tenant';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);

  private get docRef(): DocumentReference {
    return doc(this.firestore, tenantPath('configuracion'), storeDocId('footer'));
  }

  getFooterData(): Observable<FooterData | undefined> {
    return runInInjectionContext(this.injector, () => {
      return from(getDoc(this.docRef)).pipe(
        map((snap) => (snap.exists() ? (snap.data() as FooterData) : undefined)),
        timeout(8000),
        catchError((err) => {
          console.warn('Unable to load footer data:', err);
          return of(undefined);
        }),
      );
    });
  }

  saveFooterData(data: FooterData): Promise<void> {
    const docRef = this.docRef;
    const cleanData = { ...JSON.parse(JSON.stringify(data)), storeId: resolveTenantId() };
    return setDoc(docRef, cleanData);
  }
}
