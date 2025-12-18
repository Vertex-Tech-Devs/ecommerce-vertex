import {
  FirestoreService
} from "./chunk-UYVF6V6H.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-QBKDZG3W.js";

// src/app/core/services/attribute.service.ts
var AttributeService = class _AttributeService {
  firestoreService = inject(FirestoreService);
  collectionPath = "attributes";
  getAttributes() {
    return this.firestoreService.getAll(this.collectionPath);
  }
  getAttributeById(id) {
    return this.firestoreService.get(this.collectionPath, id);
  }
  addAttribute(attribute) {
    return this.firestoreService.create(this.collectionPath, attribute);
  }
  updateAttribute(id, attribute) {
    return this.firestoreService.update(this.collectionPath, id, attribute);
  }
  deleteAttribute(id) {
    return this.firestoreService.delete(this.collectionPath, id);
  }
  static \u0275fac = function AttributeService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AttributeService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AttributeService, factory: _AttributeService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttributeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AttributeService
};
//# sourceMappingURL=chunk-H5HDOTK4.js.map
