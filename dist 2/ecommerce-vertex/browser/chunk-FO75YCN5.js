import {
  Firestore,
  doc,
  docData,
  setDoc
} from "./chunk-SDXAAYIW.js";
import {
  Injectable,
  Injector,
  inject,
  runInInjectionContext,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-QBKDZG3W.js";

// src/app/core/services/footer.service.ts
var FooterService = class _FooterService {
  firestore = inject(Firestore);
  injector = inject(Injector);
  getFooterData() {
    return runInInjectionContext(this.injector, () => {
      const docRef = doc(this.firestore, "configuracion/footer");
      return docData(docRef);
    });
  }
  saveFooterData(data) {
    const docRef = doc(this.firestore, "configuracion/footer");
    const cleanData = JSON.parse(JSON.stringify(data));
    return setDoc(docRef, cleanData);
  }
  static \u0275fac = function FooterService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FooterService, factory: _FooterService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  FooterService
};
//# sourceMappingURL=chunk-FO75YCN5.js.map
