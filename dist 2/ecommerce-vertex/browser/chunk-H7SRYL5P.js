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

// src/app/core/services/order.service.ts
var OrderService = class _OrderService {
  firestoreService = inject(FirestoreService);
  firestore = inject(Firestore);
  injector = inject(Injector);
  collectionPath = "orders";
  getOrders() {
    return this.firestoreService.getAll(this.collectionPath);
  }
  getOrderById(id) {
    return this.firestoreService.get(this.collectionPath, id);
  }
  createOrder(order) {
    return this.firestoreService.create(this.collectionPath, order);
  }
  updateOrder(id, order) {
    return this.firestoreService.update(this.collectionPath, id, order);
  }
  deleteOrder(id) {
    return this.firestoreService.delete(this.collectionPath, id);
  }
  getGlobalSalesAndOrders() {
    return this.getOrders().pipe(map((orders) => {
      const totalSales = orders.filter((order) => order.status === "delivered").reduce((sum, order) => sum + order.total, 0);
      const totalOrders = orders.length;
      return { totalSales, totalOrders };
    }));
  }
  getMonthlySalesAndOrders() {
    const CONFIRMED_SALES_STATUSES = ["processing", "shipped", "delivered"];
    const now = /* @__PURE__ */ new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, this.collectionPath);
      const q = query(collectionRef, where("orderDate", ">=", startOfMonth));
      return collectionData(q, { idField: "id" }).pipe(map((items) => items.map((item) => convertTimestampsToDates(item))), map((ordersInCurrentMonth) => {
        const monthlyOrdersCount = ordersInCurrentMonth.length;
        const monthlySales = ordersInCurrentMonth.filter((order) => CONFIRMED_SALES_STATUSES.includes(order.status)).reduce((sum, order) => sum + order.total, 0);
        return { monthlySales, monthlyOrders: monthlyOrdersCount };
      }));
    });
  }
  getPendingOrProcessingOrders() {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, this.collectionPath);
      const q = query(collectionRef, where("status", "in", ["pending", "processing"]));
      return collectionData(q, { idField: "id" }).pipe(map((items) => items.map((item) => convertTimestampsToDates(item))), map((orders) => orders.sort((a, b) => a.orderDate.getTime() - b.orderDate.getTime())));
    });
  }
  getLatestOrders(count = 10) {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, this.collectionPath);
      const q = query(collectionRef, orderBy("orderDate", "desc"), limit(count));
      return collectionData(q, { idField: "id" }).pipe(map((items) => items.map((item) => convertTimestampsToDates(item))));
    });
  }
  static \u0275fac = function OrderService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OrderService, factory: _OrderService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  OrderService
};
//# sourceMappingURL=chunk-H7SRYL5P.js.map
