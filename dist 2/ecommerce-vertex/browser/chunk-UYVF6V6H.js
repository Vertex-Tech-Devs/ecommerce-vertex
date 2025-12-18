import {
  convertTimestampsToDates
} from "./chunk-HMD6QQFJ.js";
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  updateDoc
} from "./chunk-SDXAAYIW.js";
import {
  Injectable,
  Injector,
  inject,
  map,
  runInInjectionContext,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-QBKDZG3W.js";

// src/app/core/services/firestore.service.ts
var FirestoreService = class _FirestoreService {
  firestore = inject(Firestore);
  injector = inject(Injector);
  getAll(path) {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, path);
      return collectionData(collectionRef, { idField: "id" }).pipe(map((items) => items.map((item) => convertTimestampsToDates(item))));
    });
  }
  get(path, id) {
    return runInInjectionContext(this.injector, () => {
      const documentRef = doc(this.firestore, `${path}/${id}`);
      return docData(documentRef, { idField: "id" }).pipe(map((item) => item ? convertTimestampsToDates(item) : void 0));
    });
  }
  create(path, data) {
    const collectionRef = collection(this.firestore, path);
    return addDoc(collectionRef, data);
  }
  update(path, id, data) {
    const documentRef = doc(this.firestore, `${path}/${id}`);
    return updateDoc(documentRef, data);
  }
  delete(path, id) {
    const documentRef = doc(this.firestore, `${path}/${id}`);
    return deleteDoc(documentRef);
  }
  static \u0275fac = function FirestoreService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FirestoreService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FirestoreService, factory: _FirestoreService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FirestoreService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  FirestoreService
};
//# sourceMappingURL=chunk-UYVF6V6H.js.map
