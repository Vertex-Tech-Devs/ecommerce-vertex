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
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-WR4QMUYF.js";
import "./chunk-UYVF6V6H.js";
import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import "./chunk-HMD6QQFJ.js";
import "./chunk-SDXAAYIW.js";
import {
  AsyncPipe,
  BehaviorSubject,
  CommonModule,
  Component,
  CurrencyPipe,
  NgClass,
  Pipe,
  TitleCasePipe,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefinePipe,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction3,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/shared/pipes/truncate.pipe.ts
var TruncatePipe = class _TruncatePipe {
  transform(value, limit = 50, ellipsis = "...") {
    if (!value) {
      return "";
    }
    if (value.length <= limit) {
      return value;
    }
    return value.substring(0, limit) + ellipsis;
  }
  static \u0275fac = function TruncatePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TruncatePipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "truncate", type: _TruncatePipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TruncatePipe, [{
    type: Pipe,
    args: [{
      name: "truncate",
      standalone: true
    }]
  }], null, null);
})();

// src/app/features/admin/components/products/products-list/products-list.component.ts
var _c0 = (a0, a1, a2) => ({ "bg-success": a0, "bg-warning text-dark": a1, "bg-danger": a2 });
var _c1 = (a0) => ["/admin/products/detail", a0];
var _c2 = (a0) => ["/admin/products/edit", a0];
var _c3 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
function ProductsListComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r1 = ctx.$implicit;
    \u0275\u0275property("value", category_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, category_r1.name), " ");
  }
}
function ProductsListComponent_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r2 = ctx.$implicit;
    \u0275\u0275property("value", option_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r2, " por p\xE1gina ");
  }
}
function ProductsListComponent_Conditional_36_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "i", 23);
    \u0275\u0275text(2, " No se encontraron productos que coincidan. ");
    \u0275\u0275elementEnd();
  }
}
function ProductsListComponent_Conditional_36_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "i", 24);
    \u0275\u0275text(2, " A\xFAn no hay productos para mostrar. ");
    \u0275\u0275elementEnd();
  }
}
function ProductsListComponent_Conditional_36_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 22);
    \u0275\u0275conditionalCreate(2, ProductsListComponent_Conditional_36_Conditional_0_Conditional_2_Template, 3, 0, "div")(3, ProductsListComponent_Conditional_36_Conditional_0_Conditional_3_Template, 3, 0, "div");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.searchTermSubject.value || ctx_r2.filterCategorySubject.value !== "all" ? 2 : 3);
  }
}
function ProductsListComponent_Conditional_36_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 26);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "truncate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 27);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 28);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 29)(13, "span", 30);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 31)(16, "a", 32);
    \u0275\u0275element(17, "i", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "a", 34);
    \u0275\u0275element(19, "i", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 36);
    \u0275\u0275listener("click", function ProductsListComponent_Conditional_36_Conditional_1_For_1_Template_button_click_20_listener() {
      const product_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.confirmDelete(product_r5));
    });
    \u0275\u0275element(21, "i", 37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(5, 8, product_r5.description, 30), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind3(8, 11, product_r5.price, "ARS", "$"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 15, ctx_r2.getCategoryName(product_r5.categoryId)));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(17, _c0, product_r5.totalStock > 10, product_r5.totalStock > 0 && product_r5.totalStock <= 10, product_r5.totalStock === 0));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", product_r5.totalStock, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(21, _c1, product_r5.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(23, _c2, product_r5.id));
  }
}
function ProductsListComponent_Conditional_36_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ProductsListComponent_Conditional_36_Conditional_1_For_1_Template, 22, 25, "tr", null, _forTrack0);
  }
  if (rf & 2) {
    const products_r6 = \u0275\u0275nextContext();
    \u0275\u0275repeater(products_r6);
  }
}
function ProductsListComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductsListComponent_Conditional_36_Conditional_0_Template, 4, 1, "tr")(1, ProductsListComponent_Conditional_36_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.length === 0 ? 0 : 1);
  }
}
function ProductsListComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 38)(2, "div", 39)(3, "span", 40);
    \u0275\u0275text(4, "Cargando productos...");
    \u0275\u0275elementEnd()()()();
  }
}
function ProductsListComponent_Conditional_39_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 43)(1, "a", 49);
    \u0275\u0275listener("click", function ProductsListComponent_Conditional_39_For_10_Template_a_click_1_listener() {
      const \u0275$index_150_r9 = \u0275\u0275restoreView(_r8).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToPage(\u0275$index_150_r9 + 1));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const \u0275$index_150_r9 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.currentPageSubject.value === \u0275$index_150_r9 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_150_r9 + 1);
  }
}
function ProductsListComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "nav", 41)(2, "ul", 42)(3, "li", 43)(4, "a", 44);
    \u0275\u0275listener("click", function ProductsListComponent_Conditional_39_Template_a_click_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage(1));
    });
    \u0275\u0275text(5, "\xAB");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "li", 43)(7, "a", 45);
    \u0275\u0275listener("click", function ProductsListComponent_Conditional_39_Template_a_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage(ctx_r2.currentPageSubject.value - 1));
    });
    \u0275\u0275text(8, "\u2039");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(9, ProductsListComponent_Conditional_39_For_10_Template, 3, 3, "li", 46, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(11, "li", 43)(12, "a", 47);
    \u0275\u0275listener("click", function ProductsListComponent_Conditional_39_Template_a_click_12_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage(ctx_r2.currentPageSubject.value + 1));
    });
    \u0275\u0275text(13, "\u203A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "li", 43)(15, "a", 48);
    \u0275\u0275listener("click", function ProductsListComponent_Conditional_39_Template_a_click_15_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage(ctx_r2.totalPages));
    });
    \u0275\u0275text(16, "\xBB");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", ctx_r2.currentPageSubject.value === 1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", ctx_r2.currentPageSubject.value === 1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(8, _c3).constructor(ctx_r2.totalPages));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", ctx_r2.currentPageSubject.value === ctx_r2.totalPages);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", ctx_r2.currentPageSubject.value === ctx_r2.totalPages);
  }
}
var ProductsListComponent = class _ProductsListComponent {
  products$;
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  modalService = inject(BsModalService);
  bsModalRef;
  modalSubscription;
  searchTermSubject = new BehaviorSubject("");
  filterCategorySubject = new BehaviorSubject("all");
  categories$;
  categoriesMap = /* @__PURE__ */ new Map();
  currentPageSubject = new BehaviorSubject(1);
  itemsPerPageSubject = new BehaviorSubject(10);
  itemsPerPageOptions = [5, 10, 20, 30];
  totalProducts = 0;
  totalPages = 0;
  ngOnInit() {
    this.categories$ = this.categoryService.getCategories().pipe(map((categories) => {
      this.categoriesMap.clear();
      categories.forEach((cat) => this.categoriesMap.set(cat.id, cat.name));
      return categories;
    }));
    this.products$ = combineLatest([
      this.productService.getProducts(),
      this.categories$,
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.filterCategorySubject,
      this.currentPageSubject,
      this.itemsPerPageSubject
    ]).pipe(map(([allProducts, categories, searchTerm, filterCategoryId, currentPage, itemsPerPage]) => {
      let filteredProducts = allProducts;
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().includes(lowerCaseSearchTerm) || product.description.toLowerCase().includes(lowerCaseSearchTerm));
      }
      if (filterCategoryId !== "all") {
        filteredProducts = filteredProducts.filter((product) => product.categoryId === filterCategoryId);
      }
      this.totalProducts = filteredProducts.length;
      this.totalPages = Math.ceil(this.totalProducts / itemsPerPage);
      if (currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPageSubject.next(this.totalPages);
        currentPage = this.totalPages;
      } else if (this.totalPages === 0 && currentPage !== 1) {
        this.currentPageSubject.next(1);
        currentPage = 1;
      }
      const startIndex = (currentPage - 1) * itemsPerPage;
      return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }));
  }
  getCategoryName(categoryId) {
    return this.categoriesMap.get(categoryId) || "Sin Categor\xEDa";
  }
  onSearchChange(newValue) {
    this.searchTermSubject.next(newValue);
    this.currentPageSubject.next(1);
  }
  onFilterCategoryChange(newValue) {
    this.filterCategorySubject.next(newValue);
    this.currentPageSubject.next(1);
  }
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageSubject.next(page);
    }
  }
  onItemsPerPageChange(newValue) {
    this.itemsPerPageSubject.next(Number(newValue));
    this.currentPageSubject.next(1);
  }
  ngOnDestroy() {
    this.bsModalRef?.hide();
    this.modalSubscription?.unsubscribe();
  }
  confirmDelete(product) {
    this.bsModalRef = this.modalService.show(ConfirmDeleteModalComponent, {
      initialState: {
        title: "Confirmar Eliminaci\xF3n de Producto",
        message: `\xBFEst\xE1s seguro de que deseas eliminar el producto "${product.name}"? Esta acci\xF3n no se puede deshacer.`
      },
      class: "modal-md modal-dialog-centered"
    });
    this.modalSubscription = this.bsModalRef.content.onClose.subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(product.id);
      }
    });
  }
  newProduct() {
    this.router.navigate(["/admin/products/create"]);
  }
  static \u0275fac = function ProductsListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductsListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductsListComponent, selectors: [["app-products-list"]], decls: 43, vars: 11, consts: [[1, "container-fluid", "my-4"], [1, "card", "product-list-card", "shadow-sm"], [1, "card-body"], [1, "card-title", "text-center", "mb-4"], [1, "row", "g-3", "mb-4", "align-items-center"], [1, "col-lg-6", "col-md-12"], ["type", "text", "placeholder", "Buscar por nombre o descripci\xF3n...", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-lg-3", "col-md-6"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "all"], [3, "value"], [1, "table-responsive"], [1, "table", "table-hover", "align-middle", "product-table"], ["scope", "col", 1, "col-nombre"], ["scope", "col", 1, "col-descripcion"], ["scope", "col", 1, "text-end", "col-precio"], ["scope", "col", 1, "col-categoria"], ["scope", "col", 1, "text-center", "col-stock"], ["scope", "col", 1, "text-center", "col-acciones"], [1, "d-flex", "justify-content-center", "mt-4"], ["routerLink", "/admin/products/create", "title", "Nuevo Producto", 1, "btn", "btn-primary", "btn-lg", "rounded-circle", "fab-button", "shadow-lg"], [1, "bi", "bi-plus-lg"], ["colspan", "6", 1, "text-center", "text-muted-custom", "py-5"], [1, "bi", "bi-search", "fs-2", "d-block", "mb-2"], [1, "bi", "bi-box2-heart", "fs-2", "d-block", "mb-2"], ["data-label", "Nombre", 1, "col-nombre"], ["data-label", "Descripci\xF3n", 1, "col-descripcion"], ["data-label", "Precio", 1, "text-end", "col-precio"], ["data-label", "Categor\xEDa", 1, "col-categoria"], ["data-label", "Stock", 1, "text-center", "col-stock"], [1, "badge", 3, "ngClass"], ["data-label", "Acciones", 1, "text-center", "col-acciones"], ["title", "Ver Detalles", 1, "btn", "btn-outline-info", "btn-sm", "me-2", 3, "routerLink"], [1, "bi", "bi-eye"], ["title", "Editar", 1, "btn", "btn-outline-primary", "btn-sm", "me-2", 3, "routerLink"], [1, "bi", "bi-pencil-square"], ["title", "Eliminar", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "bi", "bi-trash"], ["colspan", "6", 1, "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], ["aria-label", "Paginaci\xF3n de productos"], [1, "pagination"], [1, "page-item"], ["aria-label", "Primera", 1, "page-link", 3, "click"], ["aria-label", "Anterior", 1, "page-link", 3, "click"], [1, "page-item", 3, "active"], ["aria-label", "Siguiente", 1, "page-link", 3, "click"], ["aria-label", "\xDAltima", 1, "page-link", 3, "click"], [1, "page-link", 3, "click"]], template: function ProductsListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2", 3);
      \u0275\u0275text(4, "Lista de Productos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "input", 6);
      \u0275\u0275listener("ngModelChange", function ProductsListComponent_Template_input_ngModelChange_7_listener($event) {
        return ctx.onSearchChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 7)(9, "select", 8);
      \u0275\u0275listener("ngModelChange", function ProductsListComponent_Template_select_ngModelChange_9_listener($event) {
        return ctx.onFilterCategoryChange($event);
      });
      \u0275\u0275elementStart(10, "option", 9);
      \u0275\u0275text(11, "Todas las Categor\xEDas");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(12, ProductsListComponent_For_13_Template, 3, 4, "option", 10, _forTrack0);
      \u0275\u0275pipe(14, "async");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 7)(16, "select", 8);
      \u0275\u0275listener("ngModelChange", function ProductsListComponent_Template_select_ngModelChange_16_listener($event) {
        return ctx.onItemsPerPageChange($event);
      });
      \u0275\u0275repeaterCreate(17, ProductsListComponent_For_18_Template, 2, 2, "option", 10, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "div", 11)(20, "table", 12)(21, "thead")(22, "tr")(23, "th", 13);
      \u0275\u0275text(24, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th", 14);
      \u0275\u0275text(26, "Descripci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th", 15);
      \u0275\u0275text(28, "Precio");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "th", 16);
      \u0275\u0275text(30, "Categor\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "th", 17);
      \u0275\u0275text(32, "Stock Total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "th", 18);
      \u0275\u0275text(34, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "tbody");
      \u0275\u0275conditionalCreate(36, ProductsListComponent_Conditional_36_Template, 2, 1);
      \u0275\u0275pipe(37, "async");
      \u0275\u0275conditionalBranchCreate(38, ProductsListComponent_Conditional_38_Template, 5, 0, "tr");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(39, ProductsListComponent_Conditional_39_Template, 17, 9, "div", 19);
      \u0275\u0275pipe(40, "async");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "a", 20);
      \u0275\u0275element(42, "i", 21);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_5_0;
      let tmp_6_0;
      \u0275\u0275advance(7);
      \u0275\u0275property("ngModel", ctx.searchTermSubject.value);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngModel", ctx.filterCategorySubject.value);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(\u0275\u0275pipeBind1(14, 5, ctx.categories$));
      \u0275\u0275advance(4);
      \u0275\u0275property("ngModel", ctx.itemsPerPageSubject.value);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.itemsPerPageOptions);
      \u0275\u0275advance(19);
      \u0275\u0275conditional((tmp_5_0 = \u0275\u0275pipeBind1(37, 7, ctx.products$)) ? 36 : 38, tmp_5_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(((tmp_6_0 = \u0275\u0275pipeBind1(40, 9, ctx.products$)) == null ? null : tmp_6_0.length) && ctx.totalProducts > 0 && ctx.totalPages > 1 ? 39 : -1);
    }
  }, dependencies: [CommonModule, NgClass, RouterModule, RouterLink, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, AsyncPipe, TitleCasePipe, CurrencyPipe, TruncatePipe], styles: [`

@keyframes _ngcontent-%COMP%_gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.product-list-card[_ngcontent-%COMP%] {
  position: relative;
  border-radius: 1rem;
  padding: 2px;
  background: transparent;
}
.product-list-card[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  background:
    linear-gradient(
      90deg,
      #7b68ee,
      #007bff,
      #7b68ee);
  background-size: 200% 200%;
  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;
}
.product-list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
  position: relative;
  z-index: 2;
  background-color: #f4f6f9;
  border-radius: calc(1rem - 2px);
  padding: 1.5rem;
}
@media (min-width: 768px) {
  .product-list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
    padding: 2rem;
  }
}
.product-list-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {
  font-weight: 700;
  background:
    linear-gradient(
      45deg,
      #007bff,
      #7b68ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.form-control[_ngcontent-%COMP%], 
.form-select[_ngcontent-%COMP%] {
  background-color: #ffffff;
  color: #1c2a42;
  border: 1px solid #dfe3e8;
  border-radius: 0.75rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  padding: 0.5rem 1rem;
}
.form-control[_ngcontent-%COMP%]:hover, 
.form-select[_ngcontent-%COMP%]:hover {
  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);
}
.form-control[_ngcontent-%COMP%]:focus, 
.form-select[_ngcontent-%COMP%]:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
}
.form-select[_ngcontent-%COMP%] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
}
.product-table.table[_ngcontent-%COMP%] {
  --bs-table-bg: transparent;
  --bs-table-border-color: #dfe3e8;
  --bs-table-color: #1c2a42;
  --bs-table-hover-color: #1c2a42;
  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);
}
.product-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], 
.product-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
  vertical-align: middle;
}
.product-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
  position: relative;
  border-radius: 0.75rem;
  transition: transform 0.2s ease-in-out;
}
.product-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  padding: 1px;
  background:
    linear-gradient(
      120deg,
      #007bff,
      #7b68ee,
      #007bff);
  background-size: 200% 200%;
  animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}
.product-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {
  transform: translateY(-2px);
}
.product-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {
  color: #000;
  font-weight: 500;
}
.product-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {
  opacity: 1;
}
.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {
  border-radius: 50% !important;
  margin: 0 4px;
  border: none;
  font-weight: 600;
  color: #6c757d;
  transition: all 0.3s ease;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:hover {
  background-color: #e9ecef;
  color: #7b68ee;
  transform: translateY(-2px);
}
.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:focus {
  box-shadow: none;
}
.pagination[_ngcontent-%COMP%]   .page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {
  background-color: #7b68ee;
  color: #fff;
  box-shadow: 0 4px 12px rgba(123, 104, 238, 0.4);
  transform: translateY(-3px);
}
.pagination[_ngcontent-%COMP%]   .page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {
  background-color: transparent;
  color: #ced4da;
}
.pagination[_ngcontent-%COMP%]   .page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:hover {
  transform: none;
}
.fab-button[_ngcontent-%COMP%] {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  font-size: 1.6rem;
  background:
    linear-gradient(
      45deg,
      #007bff,
      #7b68ee);
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}
.fab-button[_ngcontent-%COMP%]:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 20px rgba(123, 104, 238, 0.3);
}
@media (min-width: 769px) {
  .product-table[_ngcontent-%COMP%]   .col-acciones[_ngcontent-%COMP%] {
    white-space: nowrap;
    width: 1%;
  }
}
@media (max-width: 768px) {
  .product-list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {
    padding: 1rem;
  }
  .product-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {
    display: none;
  }
  .product-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%], 
   .product-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], 
   .product-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
    display: block;
    width: 100%;
  }
  .product-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
    background-color: #ffffff;
    border-radius: 0.75rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: relative;
    border: 1px solid #f0f0f0;
    transition: box-shadow 0.3s ease;
    padding: 0;
  }
  .product-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[data-label=Acciones][_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
    background-color: transparent;
  }
  .product-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {
    opacity: 1;
  }
  .product-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right !important;
    padding: 0.75rem 1rem;
    border: none;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    z-index: 1;
  }
  .product-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }
  .product-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {
    border-bottom: none;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
  }
  .product-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {
    content: attr(data-label);
    font-weight: 600;
    text-align: left;
    color: #495057;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  .product-table[_ngcontent-%COMP%]   td[data-label=Acciones][_ngcontent-%COMP%] {
    justify-content: flex-end;
    gap: 0.5rem;
  }
  .product-table[_ngcontent-%COMP%]   td[data-label=Acciones][_ngcontent-%COMP%]::before {
    margin-right: auto;
  }
  .product-table[_ngcontent-%COMP%]   td[data-label=Acciones][_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
    flex-shrink: 0;
    margin-right: 0 !important;
  }
}
@media (min-width: 992px) and (max-width: 1300px) {
  .form-select[_ngcontent-%COMP%] {
    padding-right: 2.75rem;
  }
}
/*# sourceMappingURL=products-list.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductsListComponent, [{
    type: Component,
    args: [{ selector: "app-products-list", imports: [
      CommonModule,
      RouterModule,
      CurrencyPipe,
      FormsModule,
      TitleCasePipe,
      TruncatePipe
    ], standalone: true, template: `<div class="container-fluid my-4">
  <div class="card product-list-card shadow-sm">
    <div class="card-body">
      <h2 class="card-title text-center mb-4">Lista de Productos</h2>

      <div class="row g-3 mb-4 align-items-center">
        <div class="col-lg-6 col-md-12">
          <input
            type="text"
            class="form-control"
            placeholder="Buscar por nombre o descripci\xF3n..."
            [ngModel]="searchTermSubject.value"
            (ngModelChange)="onSearchChange($event)"
          />
        </div>
        <div class="col-lg-3 col-md-6">
          <select
            class="form-select"
            [ngModel]="filterCategorySubject.value"
            (ngModelChange)="onFilterCategoryChange($event)"
          >
            <option value="all">Todas las Categor\xEDas</option>
            @for (category of categories$ | async; track category.id) {
              <option [value]="category.id">
                {{ category.name | titlecase }}
              </option>
            }
          </select>
        </div>
        <div class="col-lg-3 col-md-6">
          <select
            class="form-select"
            [ngModel]="itemsPerPageSubject.value"
            (ngModelChange)="onItemsPerPageChange($event)"
          >
            @for (option of itemsPerPageOptions; track option) {
              <option [value]="option">
                {{ option }} por p\xE1gina
              </option>
            }
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-hover align-middle product-table">
          <thead>
            <tr>
              <th scope="col" class="col-nombre">Nombre</th>
              <th scope="col" class="col-descripcion">Descripci\xF3n</th>
              <th scope="col" class="text-end col-precio">Precio</th>
              <th scope="col" class="col-categoria">Categor\xEDa</th>
              <th scope="col" class="text-center col-stock">Stock Total</th>
              <th scope="col" class="text-center col-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            @if (products$ | async; as products) {
              @if (products.length === 0) {
                <tr>
                  <td colspan="6" class="text-center text-muted-custom py-5">
                    @if (searchTermSubject.value || filterCategorySubject.value !== 'all') {
                      <div>
                        <i class="bi bi-search fs-2 d-block mb-2"></i>
                        No se encontraron productos que coincidan.
                      </div>
                    } @else {
                      <div>
                        <i class="bi bi-box2-heart fs-2 d-block mb-2"></i>
                        A\xFAn no hay productos para mostrar.
                      </div>
                    }
                  </td>
                </tr>
              } @else {
                @for (product of products; track product.id) {
                  <tr>
                    <td data-label="Nombre" class="col-nombre">{{ product.name }}</td>
                    <td data-label="Descripci\xF3n" class="col-descripcion">
                      {{ product.description | truncate:30 }}
                    </td>
                    <td data-label="Precio" class="text-end col-precio">
                      {{ product.price | currency : "ARS" : "$" }}
                    </td>
                    <td data-label="Categor\xEDa" class="col-categoria">{{ getCategoryName(product.categoryId) | titlecase }}</td>
                    <td data-label="Stock" class="text-center col-stock">
                      <span class="badge" [ngClass]="{
                        'bg-success': product.totalStock > 10,
                        'bg-warning text-dark': product.totalStock > 0 && product.totalStock <= 10,
                        'bg-danger': product.totalStock === 0
                      }">
                        {{ product.totalStock }}
                      </span>
                    </td>
                    <td data-label="Acciones" class="text-center col-acciones">
                      <a [routerLink]="['/admin/products/detail', product.id]" class="btn btn-outline-info btn-sm me-2" title="Ver Detalles">
                          <i class="bi bi-eye"></i>
                      </a>
                      <a [routerLink]="['/admin/products/edit', product.id]" class="btn btn-outline-primary btn-sm me-2" title="Editar">
                          <i class="bi bi-pencil-square"></i>
                      </a>
                      <button
                        class="btn btn-outline-danger btn-sm"
                        (click)="confirmDelete(product)"
                        title="Eliminar"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                }
              }
            } @else {
              <tr>
                <td colspan="6" class="text-center py-5">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando productos...</span>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if ((products$ | async)?.length && totalProducts > 0 && totalPages > 1) {
        <div class="d-flex justify-content-center mt-4">
          <nav aria-label="Paginaci\xF3n de productos">
            <ul class="pagination">
              <li class="page-item" [class.disabled]="currentPageSubject.value === 1">
                <a class="page-link" (click)="goToPage(1)" aria-label="Primera">&laquo;</a>
              </li>
              <li class="page-item" [class.disabled]="currentPageSubject.value === 1">
                <a class="page-link" (click)="goToPage(currentPageSubject.value - 1)" aria-label="Anterior">&lsaquo;</a>
              </li>
              @for (page of [].constructor(totalPages); track i; let i = $index) {
                <li class="page-item" [class.active]="currentPageSubject.value === i + 1">
                  <a class="page-link" (click)="goToPage(i + 1)">{{ i + 1 }}</a>
                </li>
              }
              <li class="page-item" [class.disabled]="currentPageSubject.value === totalPages">
                <a class="page-link" (click)="goToPage(currentPageSubject.value + 1)" aria-label="Siguiente">&rsaquo;</a>
              </li>
              <li class="page-item" [class.disabled]="currentPageSubject.value === totalPages">
                <a class="page-link" (click)="goToPage(totalPages)" aria-label="\xDAltima">&raquo;</a>
              </li>
            </ul>
          </nav>
        </div>
      }
    </div>
  </div>
</div>

<a routerLink="/admin/products/create" class="btn btn-primary btn-lg rounded-circle fab-button shadow-lg" title="Nuevo Producto">
  <i class="bi bi-plus-lg"></i>
</a>`, styles: [`/* src/app/features/admin/components/products/products-list/products-list.component.scss */
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.product-list-card {
  position: relative;
  border-radius: 1rem;
  padding: 2px;
  background: transparent;
}
.product-list-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  background:
    linear-gradient(
      90deg,
      #7b68ee,
      #007bff,
      #7b68ee);
  background-size: 200% 200%;
  animation: gradient-animation 8s ease infinite;
}
.product-list-card .card-body {
  position: relative;
  z-index: 2;
  background-color: #f4f6f9;
  border-radius: calc(1rem - 2px);
  padding: 1.5rem;
}
@media (min-width: 768px) {
  .product-list-card .card-body {
    padding: 2rem;
  }
}
.product-list-card .card-title {
  font-weight: 700;
  background:
    linear-gradient(
      45deg,
      #007bff,
      #7b68ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.form-control,
.form-select {
  background-color: #ffffff;
  color: #1c2a42;
  border: 1px solid #dfe3e8;
  border-radius: 0.75rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  padding: 0.5rem 1rem;
}
.form-control:hover,
.form-select:hover {
  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);
}
.form-control:focus,
.form-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
}
.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
}
.product-table.table {
  --bs-table-bg: transparent;
  --bs-table-border-color: #dfe3e8;
  --bs-table-color: #1c2a42;
  --bs-table-hover-color: #1c2a42;
  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);
}
.product-table thead th,
.product-table tbody td {
  vertical-align: middle;
}
.product-table tbody tr {
  position: relative;
  border-radius: 0.75rem;
  transition: transform 0.2s ease-in-out;
}
.product-table tbody tr::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  padding: 1px;
  background:
    linear-gradient(
      120deg,
      #007bff,
      #7b68ee,
      #007bff);
  background-size: 200% 200%;
  animation: gradient-animation 6s ease infinite;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}
.product-table tbody tr:hover {
  transform: translateY(-2px);
}
.product-table tbody tr:hover td {
  color: #000;
  font-weight: 500;
}
.product-table tbody tr:hover::after {
  opacity: 1;
}
.pagination .page-item .page-link {
  border-radius: 50% !important;
  margin: 0 4px;
  border: none;
  font-weight: 600;
  color: #6c757d;
  transition: all 0.3s ease;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination .page-item .page-link:hover {
  background-color: #e9ecef;
  color: #7b68ee;
  transform: translateY(-2px);
}
.pagination .page-item .page-link:focus {
  box-shadow: none;
}
.pagination .page-item.active .page-link {
  background-color: #7b68ee;
  color: #fff;
  box-shadow: 0 4px 12px rgba(123, 104, 238, 0.4);
  transform: translateY(-3px);
}
.pagination .page-item.disabled .page-link {
  background-color: transparent;
  color: #ced4da;
}
.pagination .page-item.disabled .page-link:hover {
  transform: none;
}
.fab-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  font-size: 1.6rem;
  background:
    linear-gradient(
      45deg,
      #007bff,
      #7b68ee);
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}
.fab-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 8px 20px rgba(123, 104, 238, 0.3);
}
@media (min-width: 769px) {
  .product-table .col-acciones {
    white-space: nowrap;
    width: 1%;
  }
}
@media (max-width: 768px) {
  .product-list-card .card-body {
    padding: 1rem;
  }
  .product-table thead {
    display: none;
  }
  .product-table tbody,
  .product-table tr,
  .product-table td {
    display: block;
    width: 100%;
  }
  .product-table tr {
    background-color: #ffffff;
    border-radius: 0.75rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: relative;
    border: 1px solid #f0f0f0;
    transition: box-shadow 0.3s ease;
    padding: 0;
  }
  .product-table tr:hover td[data-label=Acciones] .btn {
    background-color: transparent;
  }
  .product-table tr:hover::after {
    opacity: 1;
  }
  .product-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right !important;
    padding: 0.75rem 1rem;
    border: none;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    z-index: 1;
  }
  .product-table td:first-child {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }
  .product-table td:last-child {
    border-bottom: none;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
  }
  .product-table td::before {
    content: attr(data-label);
    font-weight: 600;
    text-align: left;
    color: #495057;
    margin-right: 1rem;
    flex-shrink: 0;
  }
  .product-table td[data-label=Acciones] {
    justify-content: flex-end;
    gap: 0.5rem;
  }
  .product-table td[data-label=Acciones]::before {
    margin-right: auto;
  }
  .product-table td[data-label=Acciones] .btn {
    flex-shrink: 0;
    margin-right: 0 !important;
  }
}
@media (min-width: 992px) and (max-width: 1300px) {
  .form-select {
    padding-right: 2.75rem;
  }
}
/*# sourceMappingURL=products-list.component.css.map */
`] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductsListComponent, { className: "ProductsListComponent", filePath: "src/app/features/admin/components/products/products-list/products-list.component.ts", lineNumber: 29 });
})();
export {
  ProductsListComponent
};
//# sourceMappingURL=chunk-KOPMPRG4.js.map
