import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { AboutUsData } from '@core/models/about-us.model';
import { StorageService } from './storage.service';
import { convertTimestampsToDates } from '@core/utils/date-converter';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  private firestore: Firestore = inject(Firestore);
  private storageService = inject(StorageService);
  private injector = inject(Injector);

  private readonly docRef = doc(this.firestore, 'pages/aboutUs');

  getAboutUsData(): Observable<AboutUsData | undefined> {
    return runInInjectionContext(this.injector, () => {
      return (docData(this.docRef) as Observable<any>).pipe(
        map(data => convertTimestampsToDates(data) as AboutUsData | undefined)
      );
    });
  }

  async saveAboutUsData(
    data: AboutUsData,
    bannerFile: File | null,
    centralFile: File | null
  ): Promise<void> {
    const dataToSave = { ...data };

    if (bannerFile) {
      const path = `pages/about-us/banner_${Date.now()}_${bannerFile.name}`;
      if (dataToSave.bannerImageUrl) {
        await firstValueFrom(
          this.storageService.deleteFileByUrl(dataToSave.bannerImageUrl)
        );
      }
      const upload = this.storageService.uploadFile(bannerFile, path);
      dataToSave.bannerImageUrl = await firstValueFrom(upload.downloadUrl$);
    }

    if (centralFile) {
      const path = `pages/about-us/central_${Date.now()}_${centralFile.name}`;
      if (dataToSave.centralImageUrl) {
        await firstValueFrom(
          this.storageService.deleteFileByUrl(dataToSave.centralImageUrl)
        );
      }
      const upload = this.storageService.uploadFile(centralFile, path);
      dataToSave.centralImageUrl = await firstValueFrom(upload.downloadUrl$);
    }

    return setDoc(this.docRef, dataToSave, { merge: true });
  }
}