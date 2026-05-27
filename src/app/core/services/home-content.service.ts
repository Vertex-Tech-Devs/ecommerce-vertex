import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { docData, Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import type { HeroBanner } from '../models/home-content.model';
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
    newCategoryFiles: (File | null)[],
    newHeroFiles: File[] = []
  ): Promise<void> {
    const docRef = doc(this.firestore, this.docPath);
    const dataToSave = { ...contentData };

    const currentDocSnap = await getDoc(docRef);
    const currentData = currentDocSnap.data() as HeroBanner | undefined;

    if (newHeroFiles && newHeroFiles.length > 0 && dataToSave.heroImages) {
      let fileIndex = 0;
      const uploadPromises = dataToSave.heroImages.map(async (heroImg, i) => {
        if (heroImg.imageUrl.startsWith('file-') && fileIndex < newHeroFiles.length) {
          const file = newHeroFiles[fileIndex++];
          const heroImagePath = `site-images/hero-carousel-${i}-${new Date().getTime()}`;
          const upload = this.storageService.uploadFile(file, heroImagePath);
          const url = await firstValueFrom(upload.downloadUrl$);
          return { ...heroImg, imageUrl: url };
        }
        return heroImg;
      });
      dataToSave.heroImages = await Promise.all(uploadPromises);
    }

    if (currentData?.heroImages && dataToSave.heroImages) {
      const savedUrls = dataToSave.heroImages.map((img) => img.imageUrl);
      const imagesToDelete = currentData.heroImages.filter(
        (img) => !savedUrls.includes(img.imageUrl)
      );
      for (const img of imagesToDelete) {
        try {
          if (img.imageUrl && !img.imageUrl.startsWith('file-')) {
            await firstValueFrom(this.storageService.deleteFileByUrl(img.imageUrl));
          }
        } catch {}
      }
    }

    if (newBannerFile) {
      if (currentData?.imageUrl) {
        try {
          await firstValueFrom(this.storageService.deleteFileByUrl(currentData.imageUrl));
        } catch {}
      }
      const imagePath = `site-images/home-banner-${new Date().getTime()}`;
      const upload = this.storageService.uploadFile(newBannerFile, imagePath);
      dataToSave.imageUrl = await firstValueFrom(upload.downloadUrl$);
    }

    if (dataToSave.featuredCategories && newCategoryFiles.length > 0) {
      const uploadPromises = dataToSave.featuredCategories.map(async (category, index) => {
        const categoryFile = newCategoryFiles[index];
        if (categoryFile) {
          const oldCategoryImageUrl = currentData?.featuredCategories?.[index]?.imageUrl;
          if (oldCategoryImageUrl) {
            try {
              await firstValueFrom(this.storageService.deleteFileByUrl(oldCategoryImageUrl));
            } catch {}
          }
          const categoryImagePath = `site-images/featured-category-${index}-${new Date().getTime()}`;
          const upload = this.storageService.uploadFile(categoryFile, categoryImagePath);
          category.imageUrl = await firstValueFrom(upload.downloadUrl$);
        }
        return category;
      });
      dataToSave.featuredCategories = await Promise.all(uploadPromises);
    }

    dataToSave.lastUpdated = new Date();
    return setDoc(docRef, dataToSave, { merge: true });
  }
}
