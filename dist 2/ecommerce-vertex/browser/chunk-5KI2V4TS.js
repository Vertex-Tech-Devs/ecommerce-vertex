import {
  StorageService
} from "./chunk-EBKKK7PL.js";
import {
  Firestore,
  doc,
  docData,
  getDoc,
  setDoc
} from "./chunk-SDXAAYIW.js";
import {
  Injectable,
  Injector,
  firstValueFrom,
  inject,
  runInInjectionContext,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-QBKDZG3W.js";
import {
  __async,
  __spreadValues
} from "./chunk-KTESVR3Q.js";

// src/app/core/services/home-content.service.ts
var HomeContentService = class _HomeContentService {
  firestore = inject(Firestore);
  storageService = inject(StorageService);
  injector = inject(Injector);
  docPath = "siteContent/homePage";
  getHeroBanner() {
    return runInInjectionContext(this.injector, () => {
      const docRef = doc(this.firestore, this.docPath);
      return docData(docRef);
    });
  }
  saveHomePageContent(contentData, newBannerFile, newCategoryFiles) {
    return __async(this, null, function* () {
      const docRef = doc(this.firestore, this.docPath);
      const dataToSave = __spreadValues({}, contentData);
      const currentDocSnap = yield getDoc(docRef);
      const currentData = currentDocSnap.data();
      if (newBannerFile) {
        if (currentData?.imageUrl) {
          yield firstValueFrom(this.storageService.deleteFileByUrl(currentData.imageUrl));
        }
        const imagePath = `site-images/home-banner-${(/* @__PURE__ */ new Date()).getTime()}`;
        const upload = this.storageService.uploadFile(newBannerFile, imagePath);
        dataToSave.imageUrl = yield firstValueFrom(upload.downloadUrl$);
      }
      if (dataToSave.featuredCategories && newCategoryFiles.length > 0) {
        const uploadPromises = dataToSave.featuredCategories.map((category, index) => __async(this, null, function* () {
          const categoryFile = newCategoryFiles[index];
          if (categoryFile) {
            const oldCategoryImageUrl = currentData?.featuredCategories?.[index]?.imageUrl;
            if (oldCategoryImageUrl) {
              yield firstValueFrom(this.storageService.deleteFileByUrl(oldCategoryImageUrl));
            }
            const categoryImagePath = `site-images/featured-category-${index}-${(/* @__PURE__ */ new Date()).getTime()}`;
            const upload = this.storageService.uploadFile(categoryFile, categoryImagePath);
            category.imageUrl = yield firstValueFrom(upload.downloadUrl$);
          }
          return category;
        }));
        dataToSave.featuredCategories = yield Promise.all(uploadPromises);
      }
      dataToSave.lastUpdated = /* @__PURE__ */ new Date();
      return setDoc(docRef, dataToSave, { merge: true });
    });
  }
  static \u0275fac = function HomeContentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeContentService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HomeContentService, factory: _HomeContentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeContentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  HomeContentService
};
//# sourceMappingURL=chunk-5KI2V4TS.js.map
