import {
  convertTimestampsToDates
} from "./chunk-HMD6QQFJ.js";
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  limit,
  orderBy,
  query,
  where,
  writeBatch
} from "./chunk-SDXAAYIW.js";
import {
  Injectable,
  Injector,
  combineLatest,
  inject,
  map,
  runInInjectionContext,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-QBKDZG3W.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-KTESVR3Q.js";

// src/app/core/services/product.service.ts
var ProductService = class _ProductService {
  firestore = inject(Firestore);
  injector = inject(Injector);
  collectionPath = "products";
  getProducts() {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, this.collectionPath);
      return collectionData(collectionRef, { idField: "id" }).pipe(map((items) => items.map((item) => convertTimestampsToDates(item))));
    });
  }
  getProductsByQuery(categoryId) {
    return runInInjectionContext(this.injector, () => {
      const constraints = [];
      if (categoryId && categoryId !== "all") {
        constraints.push(where("categoryId", "==", categoryId));
      }
      const q = query(collection(this.firestore, this.collectionPath), ...constraints);
      return collectionData(q, { idField: "id" }).pipe(map((items) => items.map((item) => convertTimestampsToDates(item))));
    });
  }
  getProductById(id) {
    return runInInjectionContext(this.injector, () => {
      const docRef = doc(this.firestore, `${this.collectionPath}/${id}`);
      return docData(docRef, { idField: "id" }).pipe(map((item) => item ? convertTimestampsToDates(item) : void 0));
    });
  }
  getProductWithVariants(id) {
    return runInInjectionContext(this.injector, () => {
      const product$ = this.getProductById(id);
      const variantsCollectionRef = collection(this.firestore, `${this.collectionPath}/${id}/variants`);
      const variants$ = collectionData(variantsCollectionRef, { idField: "id" });
      return combineLatest([product$, variants$]).pipe(map(([product, variants]) => {
        if (!product) {
          return void 0;
        }
        return {
          product,
          variants: variants.map((v) => convertTimestampsToDates(v))
        };
      }));
    });
  }
  createProductWithVariants(product, variants) {
    return __async(this, null, function* () {
      const batch = writeBatch(this.firestore);
      const productCollectionRef = collection(this.firestore, this.collectionPath);
      const newProductRef = doc(productCollectionRef);
      batch.set(newProductRef, product);
      variants.forEach((variantData) => {
        const newVariantRef = doc(collection(newProductRef, "variants"));
        const variantWithId = __spreadProps(__spreadValues({}, variantData), {
          productId: newProductRef.id
        });
        batch.set(newVariantRef, variantWithId);
      });
      yield batch.commit();
      return newProductRef.id;
    });
  }
  updateProductWithVariants(productId, productData, variantsToUpdate, variantsToAdd, variantIdsToDelete) {
    return __async(this, null, function* () {
      const batch = writeBatch(this.firestore);
      const productRef = doc(this.firestore, this.collectionPath, productId);
      batch.update(productRef, productData);
      const variantsCollectionRef = collection(productRef, "variants");
      variantsToUpdate.forEach((variant) => {
        const variantRef = doc(variantsCollectionRef, variant.id);
        batch.update(variantRef, variant);
      });
      variantsToAdd.forEach((variantData) => {
        const newVariantRef = doc(variantsCollectionRef);
        const variantWithId = __spreadProps(__spreadValues({}, variantData), {
          productId
        });
        batch.set(newVariantRef, variantWithId);
      });
      variantIdsToDelete.forEach((variantId) => {
        const variantRef = doc(variantsCollectionRef, variantId);
        batch.delete(variantRef);
      });
      return batch.commit();
    });
  }
  deleteProduct(id) {
    const docRef = doc(this.firestore, `${this.collectionPath}/${id}`);
    return deleteDoc(docRef);
  }
  getProductsLowInStock(threshold = 5) {
    return runInInjectionContext(this.injector, () => {
      const q = query(collection(this.firestore, this.collectionPath), where("totalStock", ">", 0), where("totalStock", "<=", threshold), orderBy("totalStock", "asc"));
      return collectionData(q, { idField: "id" }).pipe(map((items) => items.map((item) => convertTimestampsToDates(item))));
    });
  }
  getLatestProducts(count = 10) {
    return runInInjectionContext(this.injector, () => {
      const q = query(collection(this.firestore, this.collectionPath), orderBy("createdAt", "desc"), limit(count));
      return collectionData(q, { idField: "id" }).pipe(map((items) => items.map((item) => convertTimestampsToDates(item))));
    });
  }
  static \u0275fac = function ProductService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductService, factory: _ProductService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ProductService
};
//# sourceMappingURL=chunk-2ZGQTQTR.js.map
