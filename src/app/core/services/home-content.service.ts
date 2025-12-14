import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, docData } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { HeroBanner } from '../models/home-content.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class HomeContentService {
  private firestore: Firestore = inject(Firestore);
  private storageService = inject(StorageService);
  private injector = inject(Injector);

  private readonly docPath = 'siteContent/homePage';

  getHeroBanner(): Observable<HeroBanner | null> {
    return runInInjectionContext(this.injector, () => {
      const docRef = doc(this.firestore, this.docPath);
      return docData(docRef) as Observable<HeroBanner | null>;
    });
  }

  async saveHomePageContent(
    contentData: HeroBanner,
    newBannerFile: File | null,
    newCategoryFiles: (File | null)[]
  ): Promise<void> {
    const docRef = doc(this.firestore, this.docPath);
    const dataToSave = { ...contentData };

    const currentDocSnap = await getDoc(docRef);
    const currentData = currentDocSnap.data() as HeroBanner | undefined;

    if (newBannerFile) {
      if (currentData?.imageUrl) {
        await firstValueFrom(
          this.storageService.deleteFileByUrl(currentData.imageUrl)
        );
      }
      const imagePath = `site-images/home-banner-${new Date().getTime()}`;
      const upload = this.storageService.uploadFile(newBannerFile, imagePath);
      dataToSave.imageUrl = await firstValueFrom(upload.downloadUrl$);
    }

    if (dataToSave.featuredCategories && newCategoryFiles.length > 0) {
      const uploadPromises = dataToSave.featuredCategories.map(
        async (category, index) => {
          const categoryFile = newCategoryFiles[index];
          if (categoryFile) {
            const oldCategoryImageUrl =
              currentData?.featuredCategories?.[index]?.imageUrl;
            if (oldCategoryImageUrl) {
              await firstValueFrom(
                this.storageService.deleteFileByUrl(oldCategoryImageUrl)
              );
            }
            const categoryImagePath = `site-images/featured-category-${index}-${new Date().getTime()}`;
            const upload = this.storageService.uploadFile(
              categoryFile,
              categoryImagePath
            );
            category.imageUrl = await firstValueFrom(upload.downloadUrl$);
          }
          return category;
        }
      );
      dataToSave.featuredCategories = await Promise.all(uploadPromises);
    }

    dataToSave.lastUpdated = new Date();
    return setDoc(docRef, dataToSave, { merge: true });
  }
}
