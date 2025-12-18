import {
  ConfirmDeleteModalComponent
} from "./chunk-OHILVB2R.js";
import {
  BsModalService
} from "./chunk-2OBKN7QP.js";
import {
  CategoryService
} from "./chunk-MXEO7R2O.js";
import {
  ProductService
} from "./chunk-2ZGQTQTR.js";
import {
  AttributeService
} from "./chunk-H5HDOTK4.js";
import "./chunk-UYVF6V6H.js";
import {
  ActivatedRoute,
  Router,
  RouterModule
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import "./chunk-HMD6QQFJ.js";
import "./chunk-SDXAAYIW.js";
import {
  AsyncPipe,
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  CurrencyPipe,
  EMPTY,
  NgClass,
  catchError,
  combineLatest,
  inject,
  map,
  setClassMetadata,
  signal,
  switchMap,
  tap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/products/product-detail/product-detail.component.ts
var _c0 = (a0, a1, a2) => ({ "bg-success": a0, "bg-warning text-dark": a1, "bg-danger": a2 });
var _forTrack0 = ($index, $item) => $item.id;
function ProductDetailComponent_Conditional_1_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 14);
  }
  if (rf & 2) {
    const data_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("src", data_r3.product.image, \u0275\u0275sanitizeUrl);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275element(1, "i", 30);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Sin Imagen Principal");
    \u0275\u0275elementEnd()();
  }
}
function ProductDetailComponent_Conditional_1_Conditional_49_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31);
    \u0275\u0275element(1, "img", 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const imgUrl_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", imgUrl_r4, \u0275\u0275sanitizeUrl);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 9)(2, "div", 21)(3, "h5", 22);
    \u0275\u0275text(4, "Galer\xEDa de Im\xE1genes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 10)(6, "div", 1);
    \u0275\u0275repeaterCreate(7, ProductDetailComponent_Conditional_1_Conditional_49_For_8_Template, 2, 1, "div", 31, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const data_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275repeater(data_r3.product.images);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_56_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const attr_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(attr_r5.name);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_56_For_10_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const attr_r6 = ctx.$implicit;
    const variant_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.getVariantAttributeValue(variant_r7, attr_r6.id));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_56_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275repeaterCreate(1, ProductDetailComponent_Conditional_1_Conditional_56_For_10_For_2_Template, 2, 1, "td", null, _forTrack0);
    \u0275\u0275elementStart(3, "td", 34);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const variant_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.variantAttributes());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(variant_r7.stock);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "table", 33)(2, "thead")(3, "tr");
    \u0275\u0275repeaterCreate(4, ProductDetailComponent_Conditional_1_Conditional_56_For_5_Template, 2, 1, "th", null, _forTrack0);
    \u0275\u0275elementStart(6, "th", 34);
    \u0275\u0275text(7, "Stock");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "tbody");
    \u0275\u0275repeaterCreate(9, ProductDetailComponent_Conditional_1_Conditional_56_For_10_Template, 5, 1, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r3 = \u0275\u0275nextContext();
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.variantAttributes());
    \u0275\u0275advance(5);
    \u0275\u0275repeater(data_r3.variants);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, "Este producto no tiene variantes definidas.");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 3)(2, "div", 4)(3, "h2", 5);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275element(6, "i", 7);
    \u0275\u0275text(7, " Volver a la lista ");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(8, "hr");
    \u0275\u0275elementStart(9, "div")(10, "div", 8)(11, "div", 9)(12, "div", 10)(13, "div", 11)(14, "div", 12)(15, "div", 13);
    \u0275\u0275conditionalCreate(16, ProductDetailComponent_Conditional_1_Conditional_16_Template, 1, 1, "img", 14)(17, ProductDetailComponent_Conditional_1_Conditional_17_Template, 4, 0, "div", 15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 16)(19, "h3", 17);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "dl", 18)(22, "div")(23, "dt");
    \u0275\u0275text(24, "ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "dd");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div")(28, "dt");
    \u0275\u0275text(29, "Descripci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "dd");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div")(33, "dt");
    \u0275\u0275text(34, "Precio Base:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "dd", 19);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div")(39, "dt");
    \u0275\u0275text(40, "Categor\xEDa:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "dd");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div")(44, "dt");
    \u0275\u0275text(45, "Stock Total:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "dd")(47, "span", 20);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()()()()()()()()();
    \u0275\u0275conditionalCreate(49, ProductDetailComponent_Conditional_1_Conditional_49_Template, 9, 0, "div", 8);
    \u0275\u0275elementStart(50, "div", 8)(51, "div", 9)(52, "div", 21)(53, "h5", 22);
    \u0275\u0275text(54, "Variantes Disponibles");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 10);
    \u0275\u0275conditionalCreate(56, ProductDetailComponent_Conditional_1_Conditional_56_Template, 11, 0, "div", 23)(57, ProductDetailComponent_Conditional_1_Conditional_57_Template, 2, 0, "div", 24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(58, "div", 25)(59, "button", 26);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Template_button_click_59_listener() {
      const data_r3 = \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.editProduct(data_r3.product.id));
    });
    \u0275\u0275element(60, "i", 27);
    \u0275\u0275text(61, " Editar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "button", 28);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Template_button_click_62_listener() {
      const data_r3 = \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDeleteProduct(data_r3.product));
    });
    \u0275\u0275element(63, "i", 29);
    \u0275\u0275text(64, " Eliminar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const data_r3 = ctx;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Detalles de: ", data_r3.product.name, " ");
    \u0275\u0275advance(12);
    \u0275\u0275conditional(data_r3.product.image ? 16 : 17);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(data_r3.product.name);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(data_r3.product.id);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(data_r3.product.description);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(37, 11, data_r3.product.price, "ARS", "$"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((data_r3.category == null ? null : data_r3.category.name) || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(15, _c0, data_r3.product.totalStock > 10, data_r3.product.totalStock > 0 && data_r3.product.totalStock <= 10, data_r3.product.totalStock === 0));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", data_r3.product.totalStock, " unidades ");
    \u0275\u0275advance();
    \u0275\u0275conditional(data_r3.product.images && data_r3.product.images.length > 0 ? 49 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(data_r3.variants && data_r3.variants.length > 0 ? 56 : 57);
  }
}
function ProductDetailComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "span", 35);
    \u0275\u0275text(2, " Cargando detalles del producto... ");
    \u0275\u0275elementEnd();
  }
}
var ProductDetailComponent = class _ProductDetailComponent {
  data$;
  variantAttributes = signal([], ...ngDevMode ? [{ debugName: "variantAttributes" }] : []);
  modalService = inject(BsModalService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  attributeService = inject(AttributeService);
  bsModalRef;
  allAttributes = [];
  ngOnInit() {
    this.data$ = this.route.paramMap.pipe(switchMap((params) => {
      const productId = params.get("id");
      if (productId) {
        return combineLatest({
          data: this.productService.getProductWithVariants(productId),
          categories: this.categoryService.getCategories(),
          attributes: this.attributeService.getAttributes().pipe(tap((attrs) => this.allAttributes = attrs))
        }).pipe(map(({ data, categories, attributes }) => {
          if (!data) {
            throw new Error("Producto no encontrado");
          }
          const { product, variants } = data;
          const category = categories.find((c) => c.id === product.categoryId);
          const attributeData = product.variantAttributes.map((attrId) => {
            const attr = this.allAttributes.find((a) => a.id === attrId);
            return {
              id: attrId,
              name: attr?.name || "Atributo"
            };
          });
          this.variantAttributes.set(attributeData);
          return { product, variants, category };
        }), catchError((error) => {
          console.error("Error al cargar los detalles del producto:", error);
          this.router.navigate(["/admin/products"]);
          return EMPTY;
        }));
      } else {
        console.error("ID de producto no proporcionado en la ruta.");
        this.router.navigate(["/admin/products"]);
        return EMPTY;
      }
    }));
  }
  getVariantAttributeValue(variant, attributeId) {
    return variant.attributes[attributeId] || "N/A";
  }
  goBack() {
    this.router.navigate(["/admin/products"]);
  }
  editProduct(productId) {
    if (productId) {
      this.router.navigate(["/admin/products/edit", productId]);
    }
  }
  confirmDeleteProduct(product) {
    if (!product || !product.id)
      return;
    this.bsModalRef = this.modalService.show(ConfirmDeleteModalComponent, {
      initialState: {
        title: "Confirmar Eliminaci\xF3n",
        message: `\xBFEst\xE1s seguro de que deseas eliminar "${product.name}"?`
      },
      class: "modal-md modal-dialog-centered"
    });
    this.bsModalRef.content.onClose.subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(product.id).then(() => {
          this.router.navigate(["/admin/products"]);
        });
      }
    });
  }
  static \u0275fac = function ProductDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductDetailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailComponent, selectors: [["app-product-detail"]], decls: 4, vars: 3, consts: [[1, "container-fluid", "mt-4"], [1, "row"], ["role", "alert", 1, "alert", "alert-info", "text-center", "py-4"], [1, "col-12"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "mb-0", "page-title"], [1, "btn", "btn-outline-secondary", 3, "click"], [1, "bi", "bi-arrow-left"], [1, "card-gradient-wrapper", "mb-4"], [1, "card", "details-card"], [1, "card-body"], [1, "row", "align-items-center"], [1, "col-lg-5", "mb-4", "mb-lg-0"], [1, "image-container"], ["alt", "Imagen principal del producto", 1, "img-fluid", 3, "src"], [1, "no-image-placeholder"], [1, "col-lg-7"], [1, "product-name", "mb-4"], [1, "details-list"], [1, "price"], [1, "badge", "fs-6", 3, "ngClass"], [1, "card-header"], [1, "mb-0"], [1, "table-responsive"], [1, "alert", "alert-secondary", "text-center"], [1, "d-flex", "justify-content-end", "gap-2", "mt-4", "mb-4"], [1, "btn", "btn-primary", 3, "click"], [1, "bi", "bi-pencil-square"], [1, "btn", "btn-danger", 3, "click"], [1, "bi", "bi-trash"], [1, "bi", "bi-image"], [1, "col-6", "col-md-3", "mb-3"], ["alt", "Imagen adicional", 1, "img-fluid", "rounded", "shadow-sm", 3, "src"], [1, "table", "table-striped", "table-hover", "mb-0"], [1, "text-end"], ["aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: function ProductDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, ProductDetailComponent_Conditional_1_Template, 65, 19, "div", 1);
      \u0275\u0275pipe(2, "async");
      \u0275\u0275conditionalBranchCreate(3, ProductDetailComponent_Conditional_3_Template, 3, 0, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(2, 1, ctx.data$)) ? 1 : 3, tmp_0_0);
    }
  }, dependencies: [CommonModule, NgClass, RouterModule, AsyncPipe, CurrencyPipe], styles: ["\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.details-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.details-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border-bottom: 1px solid #dfe3e8;\n  font-weight: 500;\n}\n.details-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .details-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 2.5rem;\n  }\n}\n.page-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.image-container[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-radius: 0.75rem;\n  padding: 1rem;\n  border: 1px solid #dfe3e8;\n}\n.image-container[_ngcontent-%COMP%]   .img-fluid[_ngcontent-%COMP%] {\n  max-height: 350px;\n  object-fit: contain;\n  width: 100%;\n}\n.image-container[_ngcontent-%COMP%]   .no-image-placeholder[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 350px;\n  color: #adb5bd;\n  background-color: #e9ecef;\n  border-radius: 0.5rem;\n}\n.image-container[_ngcontent-%COMP%]   .no-image-placeholder[_ngcontent-%COMP%]   .bi[_ngcontent-%COMP%] {\n  font-size: 4rem;\n}\n.image-container[_ngcontent-%COMP%]   .no-image-placeholder[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  font-weight: 500;\n}\n.product-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #007bff;\n}\n.details-list[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%], \n.details-list[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  padding: 0.75rem 0;\n  margin: 0;\n}\n.details-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 150px 1fr;\n  align-items: start;\n  border-bottom: 1px solid #dfe3e8;\n}\n.details-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.details-list[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n}\n.details-list[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  color: #1c2a42;\n}\n.details-list[_ngcontent-%COMP%]   dd.price[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #28a745;\n  font-size: 1.25rem;\n}\n.btn-primary[_ngcontent-%COMP%], \n.btn-danger[_ngcontent-%COMP%] {\n  font-weight: 600;\n  padding: 0.6rem 1.25rem;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:hover, \n.btn-danger[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  border: none;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 2px solid #dc3545;\n  color: #dc3545;\n  padding: calc(0.6rem - 2px) calc(1.25rem - 2px);\n}\n.btn-danger[_ngcontent-%COMP%]:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n@media (max-width: 991.98px) {\n  .details-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    grid-template-columns: 120px 1fr;\n  }\n}\n@media (max-width: 767.98px) {\n  .details-list[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-row-gap: 0.25rem;\n  }\n  .details-list[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    padding-bottom: 0;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .product-name[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n}\n/*# sourceMappingURL=product-detail.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductDetailComponent, [{
    type: Component,
    args: [{ selector: "app-product-detail", standalone: true, imports: [CommonModule, RouterModule, CurrencyPipe], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="container-fluid mt-4">
  @if (data$ | async; as data) {
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="mb-0 page-title">
            Detalles de: {{ data.product.name }}
          </h2>
          <button (click)="goBack()" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left"></i> Volver a la lista
          </button>
        </div>

        <hr />

        <div>
          <div class="card-gradient-wrapper mb-4">
            <div class="card details-card">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-lg-5 mb-4 mb-lg-0">
                    <div class="image-container">
                      @if (data.product.image) {
                        <img [src]="data.product.image" class="img-fluid" alt="Imagen principal del producto" />
                      } @else {
                        <div class="no-image-placeholder">
                          <i class="bi bi-image"></i>
                          <span>Sin Imagen Principal</span>
                        </div>
                      }
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <h3 class="product-name mb-4">{{ data.product.name }}</h3>
                    <dl class="details-list">
                      <div>
                        <dt>ID:</dt>
                        <dd>{{ data.product.id }}</dd>
                      </div>
                      <div>
                        <dt>Descripci\xF3n:</dt>
                        <dd>{{ data.product.description }}</dd>
                      </div>
                      <div>
                        <dt>Precio Base:</dt>
                        <dd class="price">{{ data.product.price | currency : "ARS" : "$" }}</dd>
                      </div>
                      <div>
                        <dt>Categor\xEDa:</dt>
                        <dd>{{ data.category?.name || 'N/A' }}</dd>
                      </div>
                      <div>
                        <dt>Stock Total:</dt>
                        <dd>
                          <span class="badge fs-6" [ngClass]="{
                            'bg-success': data.product.totalStock > 10,
                            'bg-warning text-dark': data.product.totalStock > 0 && data.product.totalStock <= 10,
                            'bg-danger': data.product.totalStock === 0
                          }">
                            {{ data.product.totalStock }} unidades
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          @if (data.product.images && data.product.images.length > 0) {
            <div class="card-gradient-wrapper mb-4">
              <div class="card details-card">
                <div class="card-header"><h5 class="mb-0">Galer\xEDa de Im\xE1genes</h5></div>
                <div class="card-body">
                  <div class="row">
                    @for (imgUrl of data.product.images; track imgUrl) {
                      <div class="col-6 col-md-3 mb-3">
                        <img [src]="imgUrl" class="img-fluid rounded shadow-sm" alt="Imagen adicional">
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          }

          <div class="card-gradient-wrapper mb-4">
            <div class="card details-card">
              <div class="card-header"><h5 class="mb-0">Variantes Disponibles</h5></div>
              <div class="card-body">
                @if (data.variants && data.variants.length > 0) {
                  <div class="table-responsive">
                    <table class="table table-striped table-hover mb-0">
                      <thead>
                        <tr>
                          @for (attr of variantAttributes(); track attr.id) {
                            <th>{{ attr.name }}</th>
                          }
                          <th class="text-end">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        @for (variant of data.variants; track variant.id) {
                          <tr>
                            @for (attr of variantAttributes(); track attr.id) {
                              <td>{{ getVariantAttributeValue(variant, attr.id) }}</td>
                            }
                            <td class="text-end">{{ variant.stock }}</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                } @else {
                  <div class="alert alert-secondary text-center">Este producto no tiene variantes definidas.</div>
                }
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2 mt-4 mb-4">
            <button (click)="editProduct(data.product.id)" class="btn btn-primary"><i class="bi bi-pencil-square"></i> Editar</button>
            <button (click)="confirmDeleteProduct(data.product)" class="btn btn-danger"><i class="bi bi-trash"></i> Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  } @else {
    <div class="alert alert-info text-center py-4" role="alert">
      <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
      Cargando detalles del producto...
    </div>
  }
</div>`, styles: ["/* src/app/features/admin/components/products/product-detail/product-detail.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.details-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.details-card .card-header {\n  background-color: transparent;\n  border-bottom: 1px solid #dfe3e8;\n  font-weight: 500;\n}\n.details-card .card-body {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .details-card .card-body {\n    padding: 2.5rem;\n  }\n}\n.page-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.image-container {\n  background-color: #ffffff;\n  border-radius: 0.75rem;\n  padding: 1rem;\n  border: 1px solid #dfe3e8;\n}\n.image-container .img-fluid {\n  max-height: 350px;\n  object-fit: contain;\n  width: 100%;\n}\n.image-container .no-image-placeholder {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 350px;\n  color: #adb5bd;\n  background-color: #e9ecef;\n  border-radius: 0.5rem;\n}\n.image-container .no-image-placeholder .bi {\n  font-size: 4rem;\n}\n.image-container .no-image-placeholder span {\n  margin-top: 0.5rem;\n  font-weight: 500;\n}\n.product-name {\n  font-weight: 700;\n  color: #007bff;\n}\n.details-list dt,\n.details-list dd {\n  padding: 0.75rem 0;\n  margin: 0;\n}\n.details-list > div {\n  display: grid;\n  grid-template-columns: 150px 1fr;\n  align-items: start;\n  border-bottom: 1px solid #dfe3e8;\n}\n.details-list > div:last-child {\n  border-bottom: none;\n}\n.details-list dt {\n  font-weight: 600;\n  color: #495057;\n}\n.details-list dd {\n  color: #1c2a42;\n}\n.details-list dd.price {\n  font-weight: 700;\n  color: #28a745;\n  font-size: 1.25rem;\n}\n.btn-primary,\n.btn-danger {\n  font-weight: 600;\n  padding: 0.6rem 1.25rem;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-primary:hover,\n.btn-danger:hover {\n  transform: translateY(-2px);\n}\n.btn-primary {\n  background-color: #007bff;\n  border: none;\n}\n.btn-primary:hover {\n  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);\n}\n.btn-danger {\n  background-color: transparent;\n  border: 2px solid #dc3545;\n  color: #dc3545;\n  padding: calc(0.6rem - 2px) calc(1.25rem - 2px);\n}\n.btn-danger:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);\n}\n.btn-outline-secondary {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-outline-secondary:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n@media (max-width: 991.98px) {\n  .details-list > div {\n    grid-template-columns: 120px 1fr;\n  }\n}\n@media (max-width: 767.98px) {\n  .details-list > div {\n    grid-template-columns: 1fr;\n    grid-row-gap: 0.25rem;\n  }\n  .details-list dt {\n    padding-bottom: 0;\n  }\n  .page-title {\n    font-size: 1.5rem;\n  }\n  .product-name {\n    font-size: 1.25rem;\n  }\n}\n/*# sourceMappingURL=product-detail.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailComponent, { className: "ProductDetailComponent", filePath: "src/app/features/admin/components/products/product-detail/product-detail.component.ts", lineNumber: 29 });
})();
export {
  ProductDetailComponent
};
//# sourceMappingURL=chunk-TQI6KSUI.js.map
