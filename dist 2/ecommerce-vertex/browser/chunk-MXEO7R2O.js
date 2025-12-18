import {
  FirestoreService
} from "./chunk-UYVF6V6H.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-QBKDZG3W.js";

// src/app/core/services/category.service.ts
var CategoryService = class _CategoryService {
  firestoreService = inject(FirestoreService);
  collectionPath = "categories";
  getCategories() {
    return this.firestoreService.getAll(this.collectionPath);
  }
  addCategory(category) {
    return this.firestoreService.create(this.collectionPath, category);
  }
  updateCategory(id, category) {
    return this.firestoreService.update(this.collectionPath, id, category);
  }
  deleteCategory(id) {
    return this.firestoreService.delete(this.collectionPath, id);
  }
  static \u0275fac = function CategoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CategoryService, factory: _CategoryService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  CategoryService
};
//# sourceMappingURL=chunk-MXEO7R2O.js.map
