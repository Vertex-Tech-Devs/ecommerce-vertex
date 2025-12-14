import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of, switchMap, combineLatest } from 'rxjs';
import { Product, ProductVariant } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { AttributeService } from '@core/services/attribute.service';
import { Attribute } from '@core/models/attribute.model';

interface AttributeSelection {
  id: string;
  name: string;
  values: string[];
  allValues: string[];
  selectedValue: string | null;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private attributeService = inject(AttributeService);

  public product: Product | undefined;
  public variants: ProductVariant[] = [];
  public quantity = signal(1);

  public mainImage = signal('');
  public galleryImages = signal<string[]>([]);

  public attributes = signal<AttributeSelection[]>([]);
  public selectedVariant = signal<ProductVariant | null | undefined>(undefined);

  public allAttributes = signal<Attribute[]>([]);
  private allPossibleValues = new Map<string, string[]>();

  constructor() {
    this.loadProductData();
  }

  ngOnInit(): void { }

  private loadProductData(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const productId = params.get('id');
        if (productId) {
          return combineLatest({
            productData: this.productService.getProductWithVariants(productId),
            attributes: this.attributeService.getAttributes()
          });
        }
        return of(null);
      })
    ).subscribe(data => {
      if (data && data.productData) {
        this.product = data.productData.product;
        this.variants = data.productData.variants.filter(v => v.stock > 0);
        this.allAttributes.set(data.attributes);
        
        if (this.product) {
          this.mainImage.set(this.product.image);
          this.galleryImages.set([this.product.image, ...(this.product.images || [])]);
          this.initializeAttributes();
        }
      }
    });
  }

  private initializeAttributes(): void {
    if (!this.product || !this.product.variantAttributes) {
      this.selectedVariant.set(null);
      return;
    }

    this.allPossibleValues.clear();

    const attributeSelections: AttributeSelection[] = this.product.variantAttributes.map(attrId => {
      const attr = this.allAttributes().find(a => a.id === attrId);
      const attrName = attr?.name || attrId;
      
      const allValuesForAttr = [...new Set(this.variants.map(v => v.attributes[attrId]))].sort();
      this.allPossibleValues.set(attrId, allValuesForAttr);
      
      return {
        id: attrId,
        name: attrName,
        values: allValuesForAttr,
        allValues: allValuesForAttr,
        selectedValue: null
      };
    });

    this.attributes.set(attributeSelections);
    
    if (this.product.variantAttributes.length === 0 && this.variants.length === 1) {
      this.selectedVariant.set(this.variants[0]);
    } else {
      this.selectedVariant.set(undefined);
    }
  }

  selectAttribute(attributeId: string, value: string): void {
    this.attributes.update(currentAttributes => 
      currentAttributes.map(attr => {
        if (attr.id === attributeId) {
          return { ...attr, selectedValue: (attr.selectedValue === value) ? null : value };
        }
        return attr;
      })
    );
    
    this.updateAvailableOptions();
    this.findSelectedVariant();
  }

  private updateAvailableOptions(): void {
    const selectedAttributes = this.attributes()
      .filter(a => a.selectedValue)
      .reduce((acc, a) => {
        acc[a.id] = a.selectedValue;
        return acc;
      }, {} as { [key: string]: string | null });

    this.attributes.update(currentAttributes => 
      currentAttributes.map(attr => {
        
        const otherSelectedAttributes = { ...selectedAttributes };
        delete otherSelectedAttributes[attr.id];

        const possibleVariants = this.variants.filter(v => {
          return Object.entries(otherSelectedAttributes).every(([attrId, value]) => 
            v.attributes[attrId] === value
          );
        });

        const availableValues = [...new Set(possibleVariants.map(v => v.attributes[attr.id]))];
        
        let newSelectedValue = attr.selectedValue;
        if (attr.selectedValue && !availableValues.includes(attr.selectedValue)) {
          newSelectedValue = null;
        }

        return { ...attr, values: availableValues.sort(), selectedValue: newSelectedValue };
      })
    );
  }

  private findSelectedVariant(): void {
    const allSelected = this.attributes().every(a => a.selectedValue);
    if (!allSelected) {
      this.selectedVariant.set(undefined);
      return;
    }

    const selection = this.attributes().reduce((acc, a) => {
      acc[a.id] = a.selectedValue;
      return acc;
    }, {} as { [key: string]: string | null });

    const variant = this.variants.find(v => {
      return Object.entries(selection).every(([key, value]) => v.attributes[key] === value);
    });

    this.selectedVariant.set(variant || null);
    if (variant) {
      this.mainImage.set(variant.image || this.product?.image || '');
      this.quantity.set(1);
    }
  }

  public getValuesForAttribute(attr: AttributeSelection): string[] {
    return this.allPossibleValues.get(attr.id) || [];
  }

  public isOptionVisible(attributeId: string, value: string): boolean {
    const attr = this.attributes().find(a => a.id === attributeId);
    if (!attr) return false;
    return attr.values.includes(value);
  }

  changeMainImage(image: string): void {
    this.mainImage.set(image);
  }

  decreaseQuantity(): void {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  increaseQuantity(): void {
    const variant = this.selectedVariant();
    if (variant) {
      this.quantity.update(q => (q < variant.stock ? q + 1 : q));
    }
  }

  addToCart(): void {
    const variant = this.selectedVariant();
    if (this.product && variant) {
      this.cartService.addItem(this.product, variant, this.quantity());
    }
  }
}