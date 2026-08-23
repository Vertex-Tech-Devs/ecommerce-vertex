import { Injectable, inject } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import type { WithFieldValue } from '@angular/fire/firestore';
import type { Product, ProductVariant } from '@core/models/product.model';

export interface ProductVariantFormValue {
  id: string | null;
  attributes: Record<string, string>;
  stock: number;
}

export interface ProductFormValue {
  name: string;
  description: string;
  price: number;
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

  createProductForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      categoryId: [null, Validators.required],
      image: ['', [Validators.required]],
      images: this.fb.array([]),
      variantAttributes: this.fb.array([]),
      variants: this.fb.array([]),
    });
  }

  createVariantGroup(selectedIds: string[], variant?: ProductVariant): FormGroup {
    const attributesGroup = this.fb.group({});
    const ids = selectedIds ?? [];
    ids.forEach((id) => {
      attributesGroup.addControl(
        id,
        this.fb.control(variant?.attributes?.[id] ?? null, Validators.required),
      );
    });
    return this.fb.group({
      id: [variant?.id ?? null],
      attributes: attributesGroup,
      stock: [variant?.stock ?? 0, [Validators.required, Validators.min(0)]],
    });
  }

  buildEditChanges(
    formVariants: ProductVariantFormValue[],
    initialVariants: ProductVariant[],
  ): EditVariantChanges {
    const toUpdate: (Partial<ProductVariant> & { id: string })[] = [];
    const toAdd: WithFieldValue<Omit<ProductVariant, 'id' | 'productId'>>[] = [];
    const currentIds = new Set<string>();

    formVariants.forEach((v) => {
      if (v.id) {
        toUpdate.push({ id: v.id, attributes: v.attributes, stock: v.stock });
        currentIds.add(v.id);
      } else {
        toAdd.push({ attributes: v.attributes, stock: v.stock });
      }
    });

    const toDelete = initialVariants.filter((iv) => !currentIds.has(iv.id)).map((iv) => iv.id);

    return { toUpdate, toAdd, toDelete };
  }

  buildProductData(formValue: ProductFormValue): WithFieldValue<Omit<Product, 'id'>> {
    return {
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      categoryId: formValue.categoryId,
      image: formValue.image,
      images: formValue.images ?? [],
      variantAttributes: formValue.variantAttributes ?? [],
      createdAt: new Date(),
      totalStock: 0,
      inStockAttributes: {},
    };
  }

  syncVariantAttributes(variants: FormGroup[], selectedIds: string[]): void {
    const ids = selectedIds ?? [];
    variants.forEach((control) => {
      const ag = control.get('attributes') as FormGroup | null;
      if (!ag?.controls) {
        return;
      }
      const curIds = Object.keys(ag.controls);
      curIds.filter((id) => !ids.includes(id)).forEach((id) => ag.removeControl(id));
      ids
        .filter((id) => !curIds.includes(id))
        .forEach((id) => ag.addControl(id, this.fb.control(null, Validators.required)));
    });
  }

  populateEditForm(form: FormGroup, product: Product, variants: ProductVariant[]): void {
    form.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      image: product.image,
    });
    const imgControls = (product.images ?? []).map((img) =>
      this.fb.control(img, [Validators.required, Validators.pattern('https?://.+')]),
    );
    form.setControl('images', this.fb.array(imgControls));
    const attrControls = (product.variantAttributes ?? []).map((attrId) => this.fb.control(attrId));
    form.setControl('variantAttributes', this.fb.array(attrControls), { emitEvent: false });
    const vControls = variants.map((v) =>
      this.createVariantGroup(product.variantAttributes ?? [], v),
    );
    form.setControl('variants', this.fb.array(vControls), { emitEvent: false });
    form.updateValueAndValidity();
  }
}
