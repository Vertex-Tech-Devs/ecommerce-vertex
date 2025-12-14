import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { FooterData } from '@core/models/footer.model';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);

  getFooterData(): Observable<FooterData | undefined> {
    return runInInjectionContext(this.injector, () => {
      const docRef = doc(this.firestore, 'configuracion/footer');
      return docData(docRef) as Observable<FooterData | undefined>;
    });
  }

  saveFooterData(data: FooterData): Promise<void> {
    const docRef = doc(this.firestore, 'configuracion/footer');
    const cleanData = JSON.parse(JSON.stringify(data));
    return setDoc(docRef, cleanData);
  }
}
