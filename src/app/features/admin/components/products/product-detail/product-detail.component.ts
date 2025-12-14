import { Component, OnInit, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product, ProductVariant } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { Observable, EMPTY, combineLatest, of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmDeleteModalComponent } from '@features/admin/components/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { CategoryService } from '@core/services/category.service';
import { Category } from '@core/models/category.model';
import { Attribute } from '@core/models/attribute.model';
import { AttributeService } from '@core/services/attribute.service';

interface ProductDetailData {
  product: Product;
  variants: ProductVariant[];
  category: Category | undefined;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  public data$!: Observable<ProductDetailData>;
  public variantAttributes = signal<{ id: string, name: string }[]>([]);
  
  private modalService = inject(BsModalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private attributeService = inject(AttributeService);
  private bsModalRef?: BsModalRef;
  private allAttributes: Attribute[] = [];

  ngOnInit(): void {
    this.data$ = this.route.paramMap.pipe(
      switchMap(params => {
        const productId = params.get('id');
        if (productId) {
          return combineLatest({
            data: this.productService.getProductWithVariants(productId),
            categories: this.categoryService.getCategories(),
            attributes: this.attributeService.getAttributes().pipe(
              tap(attrs => this.allAttributes = attrs)
            )
          }).pipe(
            map(({ data, categories, attributes }) => {
              if (!data) {
                throw new Error('Producto no encontrado');
              }
              const { product, variants } = data;
              const category = categories.find(c => c.id === product.categoryId);
              
              const attributeData = product.variantAttributes.map(attrId => {
                const attr = this.allAttributes.find(a => a.id === attrId);
                return {
                  id: attrId,
                  name: attr?.name || 'Atributo'
                };
              });
              this.variantAttributes.set(attributeData);

              return { product, variants, category };
            }),
            catchError(error => {
              console.error('Error al cargar los detalles del producto:', error);
              this.router.navigate(['/admin/products']);
              return EMPTY;
            })
          );
        } else {
          console.error('ID de producto no proporcionado en la ruta.');
          this.router.navigate(['/admin/products']);
          return EMPTY;
        }
      })
    );
  }

  getVariantAttributeValue(variant: ProductVariant, attributeId: string): string {
    return variant.attributes[attributeId] || 'N/A';
  }

  goBack(): void {
    this.router.navigate(['/admin/products']);
  }

  editProduct(productId: string | undefined): void {
    if (productId) {
      this.router.navigate(['/admin/products/edit', productId]);
    }
  }

  confirmDeleteProduct(product: Product): void {
    if (!product || !product.id) return;

    this.bsModalRef = this.modalService.show(ConfirmDeleteModalComponent, {
      initialState: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar "${product.name}"?`,
      },
      class: 'modal-md modal-dialog-centered',
    });

    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.productService.deleteProduct(product.id).then(() => {
          this.router.navigate(['/admin/products']);
        });
      }
    });
  }
}