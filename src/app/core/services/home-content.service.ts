import {
  inject,
  Injectable,
  Injector,
  runInInjectionContext,
} from "@angular/core";
import { docData, Firestore } from "@angular/fire/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firstValueFrom, Observable } from "rxjs";
import { HeroBanner } from "../models/home-content.model";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class HomeContentService {
  private firestore: Firestore = inject(Firestore);
  private storageService = inject(StorageService);
  private injector = inject(Injector);

  private readonly docPath = "siteContent/homePage";

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
    newHeroFiles: File[] = [],
  ): Promise<void> {
    const docRef = doc(this.firestore, this.docPath);
    const dataToSave = { ...contentData };

    const currentDocSnap = await getDoc(docRef);
    const currentData = currentDocSnap.data() as HeroBanner | undefined;

    // PROCESAR IMÁGENES HERO (CARRUSEL)
    if (newHeroFiles && newHeroFiles.length > 0) {
      const uploadPromises = newHeroFiles.map(async (file, index) => {
        const heroImagePath = `site-images/hero-carousel-${index}-${
          new Date().getTime()
        }`;
        const upload = this.storageService.uploadFile(file, heroImagePath);
        return firstValueFrom(upload.downloadUrl$);
      });

      // Combinar imágenes nuevas con imágenes existentes que no fueron eliminadas
      const uploadedUrls = await Promise.all(uploadPromises);
      dataToSave.heroImages = uploadedUrls;
    }

    // LIMPIAR IMÁGENES HERO ANTIGUAS QUE YA NO ESTÁN
    if (currentData?.heroImages && dataToSave.heroImages) {
      const imagesToDelete = currentData.heroImages.filter(
        (img) => !dataToSave.heroImages?.includes(img),
      );
      for (const imageUrl of imagesToDelete) {
        try {
          await firstValueFrom(
            this.storageService.deleteFileByUrl(imageUrl),
          );
        } catch (error) {
          console.warn("Error deleting hero image:", error);
        }
      }
    }

    // PROCESAR BANNER LEGACY (compatibilidad hacia atrás)
    if (newBannerFile) {
      if (currentData?.imageUrl) {
        await firstValueFrom(
          this.storageService.deleteFileByUrl(currentData.imageUrl),
        );
      }
      const imagePath = `site-images/home-banner-${new Date().getTime()}`;
      const upload = this.storageService.uploadFile(newBannerFile, imagePath);
      dataToSave.imageUrl = await firstValueFrom(upload.downloadUrl$);
    }

    // PROCESAR CATEGORÍAS DESTACADAS
    if (dataToSave.featuredCategories && newCategoryFiles.length > 0) {
      const uploadPromises = dataToSave.featuredCategories.map(
        async (category, index) => {
          const categoryFile = newCategoryFiles[index];
          if (categoryFile) {
            const oldCategoryImageUrl = currentData?.featuredCategories?.[index]
              ?.imageUrl;
            if (oldCategoryImageUrl) {
              await firstValueFrom(
                this.storageService.deleteFileByUrl(oldCategoryImageUrl),
              );
            }
            const categoryImagePath = `site-images/featured-category-${index}-${
              new Date().getTime()
            }`;
            const upload = this.storageService.uploadFile(
              categoryFile,
              categoryImagePath,
            );
            category.imageUrl = await firstValueFrom(upload.downloadUrl$);
          }
          return category;
        },
      );
      dataToSave.featuredCategories = await Promise.all(uploadPromises);
    }

    dataToSave.lastUpdated = new Date();
    return setDoc(docRef, dataToSave, { merge: true });
  }

  async initializeTestData(): Promise<void> {
    const docRef = doc(this.firestore, this.docPath);
    const testData: HeroBanner = {
      heroImages: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1400&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&h=500&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=500&fit=crop&crop=center",
      ],
      carouselSettings: {
        interval: 6000,
        showIndicators: true,
      },
      title: "Bienvenido a Vertex",
      buttonText: "Comprar Ahora",
      buttonLink: "/shop/catalog",
      featuredCategories: [
        {
          categoryId: "electronics",
          name: "Electrónica",
          slug: "electronics",
          imageUrl:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        },
        {
          categoryId: "accessories",
          name: "Accesorios",
          slug: "accessories",
          imageUrl:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        },
      ],
      lastUpdated: new Date(),
    };
    return setDoc(docRef, testData, { merge: true });
  }
}
