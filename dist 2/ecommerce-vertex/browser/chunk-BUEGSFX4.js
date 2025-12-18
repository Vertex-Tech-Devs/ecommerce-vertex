import {
  FirestoreService
} from "./chunk-UYVF6V6H.js";
import {
  convertTimestampsToDates
} from "./chunk-HMD6QQFJ.js";
import {
  Firestore,
  collection,
  collectionData,
  limit,
  orderBy,
  query,
  where
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

// src/app/core/services/client.service.ts
var ClientService = class _ClientService {
  firestoreService = inject(FirestoreService);
  firestore = inject(Firestore);
  injector = inject(Injector);
  clientsCollectionPath = "clients";
  ordersCollectionPath = "orders";
  getClients() {
    return this.firestoreService.getAll(this.clientsCollectionPath);
  }
  getClientByEmail(email) {
    return this.firestoreService.get(this.clientsCollectionPath, email);
  }
  getOrdersByClientEmail(email) {
    return runInInjectionContext(this.injector, () => {
      const q = query(collection(this.firestore, this.ordersCollectionPath), where("clientEmail", "==", email));
      return collectionData(q, { idField: "id" }).pipe(map((items) => items.map((item) => convertTimestampsToDates(item))));
    });
  }
  getTotalClients() {
    return this.getClients().pipe(map((clients) => clients.length));
  }
  getNewClientsThisMonth() {
    return runInInjectionContext(this.injector, () => {
      const now = /* @__PURE__ */ new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const q = query(collection(this.firestore, this.clientsCollectionPath), where("firstOrderDate", ">=", startOfMonth));
      return collectionData(q).pipe(map((clients) => clients.length));
    });
  }
  getLatestClients(count = 10) {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, this.clientsCollectionPath);
      const q = query(collectionRef, orderBy("lastOrderDate", "desc"), limit(count));
      return collectionData(q, { idField: "id" }).pipe(map((items) => items.map((item) => convertTimestampsToDates(item))));
    });
  }
  static \u0275fac = function ClientService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClientService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ClientService, factory: _ClientService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClientService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ClientService
};
//# sourceMappingURL=chunk-BUEGSFX4.js.map
