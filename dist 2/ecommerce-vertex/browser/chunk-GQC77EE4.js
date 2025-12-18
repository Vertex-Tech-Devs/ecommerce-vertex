import {
  StorageService
} from "./chunk-EBKKK7PL.js";
import {
  convertTimestampsToDates
} from "./chunk-HMD6QQFJ.js";
import {
  Firestore,
  doc,
  docData,
  setDoc
} from "./chunk-SDXAAYIW.js";
import {
  Injectable,
  Injector,
  firstValueFrom,
  inject,
  map,
  runInInjectionContext,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-QBKDZG3W.js";
import {
  __async,
  __spreadValues
} from "./chunk-KTESVR3Q.js";

// src/app/core/services/about-us.service.ts
var AboutUsService = class _AboutUsService {
  firestore = inject(Firestore);
  storageService = inject(StorageService);
  injector = inject(Injector);
  docRef = doc(this.firestore, "pages/aboutUs");
  getAboutUsData() {
    return runInInjectionContext(this.injector, () => {
      return docData(this.docRef).pipe(map((data) => convertTimestampsToDates(data)));
    });
  }
  saveAboutUsData(data, bannerFile, centralFile) {
    return __async(this, null, function* () {
      const dataToSave = __spreadValues({}, data);
      if (bannerFile) {
        const path = `pages/about-us/banner_${Date.now()}_${bannerFile.name}`;
        if (dataToSave.bannerImageUrl) {
          yield firstValueFrom(this.storageService.deleteFileByUrl(dataToSave.bannerImageUrl));
        }
        const upload = this.storageService.uploadFile(bannerFile, path);
        dataToSave.bannerImageUrl = yield firstValueFrom(upload.downloadUrl$);
      }
      if (centralFile) {
        const path = `pages/about-us/central_${Date.now()}_${centralFile.name}`;
        if (dataToSave.centralImageUrl) {
          yield firstValueFrom(this.storageService.deleteFileByUrl(dataToSave.centralImageUrl));
        }
        const upload = this.storageService.uploadFile(centralFile, path);
        dataToSave.centralImageUrl = yield firstValueFrom(upload.downloadUrl$);
      }
      return setDoc(this.docRef, dataToSave, { merge: true });
    });
  }
  static \u0275fac = function AboutUsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AboutUsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AboutUsService, factory: _AboutUsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AboutUsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AboutUsService
};
//# sourceMappingURL=chunk-GQC77EE4.js.map
