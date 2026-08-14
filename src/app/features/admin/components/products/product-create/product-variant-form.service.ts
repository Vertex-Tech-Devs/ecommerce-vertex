import { Injectable, inject } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import type { WithFieldValue } from '@angular/fire/firestore';
import type { Attribute } from '@core/models/attribute.model';
import type { Product, ProductVariant } from '@core/models/product.model';

export interface ProductVariantFormValue {
  id: string | null;
  sku?: string;
  price?: number;
  attributes: Record<string, string>;
  stock: number;
}

export interface ProductFormValue {
  name: string;
  description: string;
  price: number;
  stock?: number;
  hasVariants?: boolean;
  categoryId: string;
  image: string;
  images: string[];
  variantAttributes: string[];
  variants: ProductVariantFormValue[];
}

export interface EditVariantChanges {
  toUpdate: (Partial<ProductVariant> & { id: string })[];
  toAdd: WithFieldValue<Omit<ProductVariant, 'id' | 'productId'>>[];
  toDelete: string[];
}

@Injectable({ providedIn: 'root' })
export class ProductVariantFormService {
  private fb = inject(FormBuilder);
  readonly variantSearchControl = new FormControl('', { nonNullable: true });

  createVariantGroup(
    selectedIds: string[],
    variant?: Partial<ProductVariant>,
    allAttributes?: Attribute[],
  ): FormGroup {
    const attributesGroup = this.fb.group({});
    const normalizedIds = Array.from(new Set(selectedIds.filter(Boolean)));

    normalizedIds.forEach((key) => {
      const attr = allAttributes?.find((a) => a.id === key || a.name === key);
      const targetId = attr?.id ?? key;
      const initialValue =
        variant?.attributes?.[targetId] ??
        (attr?.name ? variant?.attributes?.[attr.name] : null) ??
        null;

      if (!attributesGroup.contains(targetId)) {
        const isVisibleWithValues = allAttributes ? Boolean(attr?.values?.length) : true;
        attributesGroup.addControl(
          targetId,
          this.fb.control(initialValue, isVisibleWithValues ? Validators.required : []),
        );
      }
    });

    return this.fb.group({
      id: [variant?.id ?? null],
      sku: [variant?.sku ?? ''],
      price: [variant?.price ?? null, [Validators.min(0)]],
      attributes: attributesGroup,
      stock: [variant?.stock ?? 0, [Validators.required, Validators.min(0)]],
    });
  }

  createVariantGroupFromCombo(
    selectedIds: string[],
    combo: Record<string, string>,
    existingVariants: ProductVariantFormValue[] = [],
    allAttributes?: Attribute[],
  ): FormGroup {
    const match = existingVariants.find((v) =>
      selectedIds.every((id) => v.attributes?.[id] === combo[id]),
    );

    const comboAttributes: Record<string, string> = {};
    selectedIds.forEach((id) => {
      if (combo[id] !== undefined) {
        comboAttributes[id] = combo[id];
      }
    });

    return this.createVariantGroup(
      selectedIds,
      {
        id: match?.id ?? undefined,
        attributes: comboAttributes,
        stock: match?.stock ?? 0,
        sku: match?.sku,
        price: match?.price,
      },
      allAttributes,
    );
  }

  generateCombinations(attributes: Attribute[]): Record<string, string>[] {
    if (!attributes.length) {
      return [];
    }
    let result: Record<string, string>[] = [{}];
    attributes.forEach((attr) => {
      if (!attr.values || attr.values.length === 0) {
        return; // Skip attributes with no values instead of destroying all combinations
      }
      const next: Record<string, string>[] = [];
      result.forEach((existing) => {
        attr.values.forEach((value) => next.push({ ...existing, [attr.id!]: value }));
      });
      result = next;
    });
    return result;
  }

  buildEditChanges(
    formVariants: ProductVariantFormValue[],
    initialVariants: ProductVariant[],
  ): EditVariantChanges {
    const toUpdate: (Partial<ProductVariant> & { id: string })[] = [];
    const toAdd: WithFieldValue<Omit<ProductVariant, 'id' | 'productId'>>[] = [];
    const currentIds = new Set<string>();

    (formVariants || []).forEach((v) => {
      const variantStock = Number(v.stock) || 0;
      if (v.id) {
        toUpdate.push({
          id: v.id,
          attributes: v.attributes,
          stock: variantStock,
          sku: v.sku,
          price: v.price,
        });
        currentIds.add(v.id);
      } else {
        toAdd.push({
          attributes: v.attributes,
          stock: variantStock,
          sku: v.sku,
          price: v.price,
        });
      }
    });

    const toDelete = initialVariants.filter((iv) => !currentIds.has(iv.id)).map((iv) => iv.id);

    return { toUpdate, toAdd, toDelete };
  }

  buildProductData(formValue: ProductFormValue): WithFieldValue<Omit<Product, 'id'>> {
    const totalStock = formValue.hasVariants
      ? (formValue.variants || []).reduce(
          (acc: number, v: ProductVariantFormValue) => acc + (Number(v.stock) || 0),
          0,
        )
      : Number(formValue.stock) || 0;

    return {
      name: formValue.name,
      description: formValue.description,
      price: Number(formValue.price) || 0,
      stock: totalStock,
      categoryId: formValue.categoryId,
      image: formValue.image,
      images: formValue.images ?? [],
      variantAttributes: formValue.hasVariants ? (formValue.variantAttributes ?? []) : [],
      createdAt: new Date(),
      totalStock,
      inStockAttributes: {},
    };
  }
}
