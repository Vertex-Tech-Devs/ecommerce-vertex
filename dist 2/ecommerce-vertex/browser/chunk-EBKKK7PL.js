import {
  Storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "./chunk-CUH4JQND.js";
import {
  SweetAlertService
} from "./chunk-5OJQRZGI.js";
import {
  Injectable,
  Observable,
  catchError,
  from,
  inject,
  setClassMetadata,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-QBKDZG3W.js";

// src/app/core/services/storage.service.ts
var StorageService = class _StorageService {
  storage = inject(Storage);
  sweetAlertService = inject(SweetAlertService);
  uploadFile(file, path) {
    const filePath = `${path}/${Date.now()}_${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const progress$ = new Observable((observer) => {
      const unsubscribe = uploadTask.on("state_changed", (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        observer.next(progress);
      }, (error) => observer.error(error), () => observer.complete());
      return () => unsubscribe();
    });
    const downloadUrl$ = new Observable((observer) => {
      uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          observer.next(url);
          observer.complete();
        }).catch((error) => observer.error(error));
      }).catch((error) => observer.error(error));
    });
    return { progress$, downloadUrl$ };
  }
  deleteFileByUrl(imageUrl) {
    if (!imageUrl || !imageUrl.includes("firebasestorage.googleapis.com")) {
      return from(Promise.resolve());
    }
    const imageRef = ref(this.storage, imageUrl);
    return from(deleteObject(imageRef)).pipe(catchError((error) => {
      if (error.code === "storage/object-not-found") {
        console.warn(`El archivo en la URL ${imageUrl} no se encontr\xF3. Pudo haber sido eliminado previamente.`);
        return from(Promise.resolve());
      }
      console.error("Error al eliminar la imagen:", error);
      this.sweetAlertService.error("Error de Borrado", "No se pudo eliminar la imagen anterior.");
      return throwError(() => error);
    }));
  }
  static \u0275fac = function StorageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StorageService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StorageService, factory: _StorageService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StorageService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  StorageService
};
//# sourceMappingURL=chunk-EBKKK7PL.js.map
