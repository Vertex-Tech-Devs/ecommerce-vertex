import type { OnInit } from '@angular/core';
import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import type { Product, ProductVariant } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';
import type { Observable } from 'rxjs';
import { EMPTY, combineLatest } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { CategoryService } from '@core/services/category.service';
import type { Category } from '@core/models/category.model';
import type { Attribute } from '@core/models/attribute.model';
import { AttributeService } from '@core/services/attribute.service';

interface ProductDetailData {
  product: Product;
  variants: ProductVariant[];
  category: Category | undefined;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  data$!: Observable<ProductDetailData>;
  variantAttributes = signal<{ id: string; name: string }[]>([]);

  private sweetAlertService = inject(SweetAlertService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private attributeService = inject(AttributeService);
  private allAttributes: Attribute[] = [];

  ngOnInit(): void {
    this.data$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const productId = params.get('id');
        if (productId) {
          return combineLatest({
            data: this.productService.getProductWithVariants(productId),
            categories: this.categoryService.getCategories(),
            attributes: this.attributeService
              .getAttributes()
              .pipe(tap((attrs) => (this.allAttributes = attrs))),
          }).pipe(
            map(({ data, categories, attributes: _attributes }) => {
              if (!data) {
                throw new Error('Producto no encontrado');
              }
              const { product, variants } = data;
              const category = categories.find((c) => c.id === product.categoryId);

              const attributeData = product.variantAttributes.map((attrId) => {
                const attr = this.allAttributes.find((a) => a.id === attrId);
                return {
                  id: attrId,
                  name: attr?.name ?? 'Atributo',
                };
              });
              this.variantAttributes.set(attributeData);

              return { product, variants, category };
            }),
            catchError((error) => {
              console.error('Error al cargar los detalles del producto:', error);
              void this.router.navigate(['/admin/products']);
              return EMPTY;
            }),
          );
        } else {
          console.error('ID de producto no proporcionado en la ruta.');
          void this.router.navigate(['/admin/products']);
          return EMPTY;
        }
      }),
    );
  }

  getVariantAttributeValue(variant: ProductVariant, attributeId: string): string {
    return variant.attributes[attributeId] ?? 'N/A';
  }

  goBack(): void {
    void this.router.navigate(['/admin/products']);
  }

  editProduct(productId: string | undefined): void {
    if (productId) {
      void this.router.navigate(['/admin/products/edit', productId]);
    }
  }

  async confirmDeleteProduct(product: Product): Promise<void> {
    if (!product?.id) {
      return;
    }

    const isConfirmed = await this.sweetAlertService.confirm(
      'Confirmar Eliminación',
      `¿Estás seguro de que deseas eliminar "${product.name}"?`,
    );
    if (isConfirmed) {
      try {
        await this.productService.deleteProduct(product.id);
        await this.router.navigate(['/admin/products']);
      } catch {
        this.sweetAlertService.error('Error', 'No se pudo eliminar el producto.');
      }
    }
  }
}
