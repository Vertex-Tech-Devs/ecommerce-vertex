import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Observable, map, combineLatest } from 'rxjs';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import {
  doc,
  collection,
  deleteDoc,
  writeBatch,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  WithFieldValue,
  QueryConstraint,
  addDoc,
  updateDoc,
  DocumentReference,
} from 'firebase/firestore';
import { Product, ProductVariant } from '../models/product.model';
import { convertTimestampsToDates } from '@core/utils/date-converter';

export interface ProductFilters {
  categoryId?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  includeOutOfStock?: boolean;
  dynamicFilters: { [key: string]: string[] };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);
  private readonly collectionPath = 'products';

  getProducts(): Observable<Product[]> {
    return runInInjectionContext(this.injector, () => {
      const collectionRef = collection(this.firestore, this.collectionPath);
      return (collectionData(collectionRef, { idField: 'id' }) as Observable<any[]>).pipe(
        map(items => items.map(item => convertTimestampsToDates(item) as Product))
      );
    });
  }

  getProductsByQuery(categoryId: string | null): Observable<Product[]> {
    return runInInjectionContext(this.injector, () => {
      const constraints: QueryConstraint[] = [];
      if (categoryId && categoryId !== 'all') {
        constraints.push(where('categoryId', '==', categoryId));
      }
      
      const q = query(collection(this.firestore, this.collectionPath), ...constraints);
      return (collectionData(q, { idField: 'id' }) as Observable<any[]>).pipe(
        map(items => items.map(item => convertTimestampsToDates(item) as Product))
      );
    });
  }

  getProductById(id: string): Observable<Product | undefined> {
    return runInInjectionContext(this.injector, () => {
      const docRef = doc(this.firestore, `${this.collectionPath}/${id}`);
      return (docData(docRef, { idField: 'id' }) as Observable<any | undefined>).pipe(
        map(item => (item ? (convertTimestampsToDates(item) as Product) : undefined))
      );
    });
  }

  getProductWithVariants(id: string): Observable<{ product: Product; variants: ProductVariant[] } | undefined> {
    return runInInjectionContext(this.injector, () => {
      const product$ = this.getProductById(id);
      const variantsCollectionRef = collection(this.firestore, `${this.collectionPath}/${id}/variants`);
      const variants$ = (collectionData(variantsCollectionRef, { idField: 'id' }) as Observable<ProductVariant[]>);

      return combineLatest([product$, variants$]).pipe(
        map(([product, variants]) => {
          if (!product) {
            return undefined;
          }
          return {
            product,
            variants: variants.map(v => convertTimestampsToDates(v) as ProductVariant),
          };
        })
      );
    });
  }

  async createProductWithVariants(
    product: WithFieldValue<Omit<Product, 'id'>>,
    variants: WithFieldValue<Omit<ProductVariant, 'id' | 'productId'>>[]
  ): Promise<string> {
    const batch = writeBatch(this.firestore);
    const productCollectionRef = collection(this.firestore, this.collectionPath);
    const newProductRef = doc(productCollectionRef);

    batch.set(newProductRef, product);

    variants.forEach(variantData => {
      const newVariantRef = doc(collection(newProductRef, 'variants'));
      const variantWithId: WithFieldValue<Omit<ProductVariant, 'id'>> = {
        ...variantData,
        productId: newProductRef.id,
      };
      batch.set(newVariantRef, variantWithId);
    });

    await batch.commit();
    return newProductRef.id;
  }

  async updateProductWithVariants(
    productId: string,
    productData: Partial<Product>,
    variantsToUpdate: (Partial<ProductVariant> & { id: string })[],
    variantsToAdd: WithFieldValue<Omit<ProductVariant, 'id' | 'productId'>>[],
    variantIdsToDelete: string[]
  ): Promise<void> {
    const batch = writeBatch(this.firestore);
    const productRef = doc(this.firestore, this.collectionPath, productId);

    batch.update(productRef, productData);

    const variantsCollectionRef = collection(productRef, 'variants');

    variantsToUpdate.forEach(variant => {
      const variantRef = doc(variantsCollectionRef, variant.id);
      batch.update(variantRef, variant);
    });

    variantsToAdd.forEach(variantData => {
      const newVariantRef = doc(variantsCollectionRef);
      const variantWithId: WithFieldValue<Omit<ProductVariant, 'id'>> = {
        ...variantData,
        productId: productId,
      };
      batch.set(newVariantRef, variantWithId);
    });

    variantIdsToDelete.forEach(variantId => {
      const variantRef = doc(variantsCollectionRef, variantId);
      batch.delete(variantRef);
    });

    return batch.commit();
  }

  deleteProduct(id: string): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionPath}/${id}`);
    return deleteDoc(docRef);
  }

  getProductsLowInStock(threshold: number = 5): Observable<Product[]> {
    return runInInjectionContext(this.injector, () => {
      const q = query(
        collection(this.firestore, this.collectionPath),
        where('totalStock', '>', 0),
        where('totalStock', '<=', threshold),
        orderBy('totalStock', 'asc')
      );
      return (collectionData(q, { idField: 'id' }) as Observable<any[]>).pipe(
        map(items => items.map(item => convertTimestampsToDates(item) as Product))
      );
    });
  }

  getLatestProducts(count: number = 10): Observable<Product[]> {
    return runInInjectionContext(this.injector, () => {
      const q = query(
        collection(this.firestore, this.collectionPath),
        orderBy('createdAt', 'desc'),
        limit(count)
      );
      return (collectionData(q, { idField: 'id' }) as Observable<any[]>).pipe(
        map(items => items.map(item => convertTimestampsToDates(item) as Product))
      );
    });
  }
}