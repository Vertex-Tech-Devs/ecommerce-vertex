import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc, getDoc } from '@angular/fire/firestore';
import type { DocumentReference, DocumentData } from '@angular/fire/firestore';
import type { Observable } from 'rxjs';
import { from, of } from 'rxjs';
import { firstValueFrom, catchError, timeout } from 'rxjs';
import { map } from 'rxjs/operators';
import type { AboutUsData } from '@core/models/about-us.model';
import { StorageService } from './storage.service';
import { convertTimestampsToDates } from '@core/utils/date-converter';
import { tenantPath, storeDocId, resolveTenantId } from '@core/utils/tenant';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  private firestore: Firestore = inject(Firestore);
  private storageService = inject(StorageService);
  private injector = inject(Injector);

  private get docRef(): DocumentReference<DocumentData> {
    return doc(this.firestore, tenantPath('pages'), storeDocId('aboutUs'));
  }

  getAboutUsData(): Observable<AboutUsData | undefined> {
    return runInInjectionContext(this.injector, () => {
      return from(getDoc(this.docRef)).pipe(
        timeout(8000),
        map((snap) =>
          snap.exists() ? (convertTimestampsToDates(snap.data()) as AboutUsData) : undefined,
        ),
        catchError((err) => {
          console.warn('Unable to load about us data:', err);
          return of(undefined);
        }),
      );
    });
  }

  async saveAboutUsData(
    data: AboutUsData,
    bannerFile: File | null,
    centralFile: File | null,
  ): Promise<void> {
    const dataToSave = { ...data, storeId: resolveTenantId() };

    if (bannerFile) {
      const path = `pages/about-us/banner_${Date.now()}_${bannerFile.name}`;
      if (dataToSave.bannerImageUrl) {
        await firstValueFrom(this.storageService.deleteFileByUrl(dataToSave.bannerImageUrl));
      }
      const upload = this.storageService.uploadFile(bannerFile, path);
      dataToSave.bannerImageUrl = await firstValueFrom(upload.downloadUrl$);
    }

    if (centralFile) {
      const path = `pages/about-us/central_${Date.now()}_${centralFile.name}`;
      if (dataToSave.centralImageUrl) {
        await firstValueFrom(this.storageService.deleteFileByUrl(dataToSave.centralImageUrl));
      }
      const upload = this.storageService.uploadFile(centralFile, path);
      dataToSave.centralImageUrl = await firstValueFrom(upload.downloadUrl$);
    }

    return setDoc(this.docRef, dataToSave, { merge: true });
  }
}
