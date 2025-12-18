import {
  CategoryService
} from "./chunk-MXEO7R2O.js";
import {
  ProductService
} from "./chunk-2ZGQTQTR.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  RadioControlValueAccessor,
  ReactiveFormsModule,
  ɵNgSelectMultipleOption
} from "./chunk-WR4QMUYF.js";
import {
  AttributeService
} from "./chunk-H5HDOTK4.js";
import "./chunk-UYVF6V6H.js";
import {
  ActivatedRoute,
  RouterLink,
  RouterModule
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import "./chunk-HMD6QQFJ.js";
import "./chunk-SDXAAYIW.js";
import {
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectorRef,
  CommonModule,
  Component,
  CurrencyPipe,
  HostListener,
  NgIf,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  inject,
  map,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  take,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/shop/components/catalog/catalog.component.ts
var _c0 = (a0) => ["/shop/product", a0];
var _c1 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
function CatalogComponent_Conditional_14_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "input", 29);
    \u0275\u0275elementStart(2, "label", 30);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("id", "cat-" + cat_r1.id)("value", cat_r1.id);
    \u0275\u0275advance();
    \u0275\u0275property("for", "cat-" + cat_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r1.name);
  }
}
function CatalogComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "input", 27);
    \u0275\u0275elementStart(2, "label", 28);
    \u0275\u0275text(3, "Todas");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(4, CatalogComponent_Conditional_14_For_5_Template, 4, 4, "div", 26, _forTrack0);
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx);
  }
}
function CatalogComponent_Conditional_17_For_1_Conditional_0_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275element(1, "input", 32);
    \u0275\u0275elementStart(2, "label", 30);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const val_r2 = ctx.$implicit;
    const attr_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("id", "attr-" + attr_r3.id + "-" + val_r2)("formControlName", val_r2);
    \u0275\u0275advance();
    \u0275\u0275property("for", "attr-" + attr_r3.id + "-" + val_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(val_r2);
  }
}
function CatalogComponent_Conditional_17_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "h5", 10);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, CatalogComponent_Conditional_17_For_1_Conditional_0_For_4_Template, 4, 4, "div", 26, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const attr_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("formGroupName", attr_r3.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(attr_r3.name);
    \u0275\u0275advance();
    \u0275\u0275repeater(attr_r3.values);
  }
}
function CatalogComponent_Conditional_17_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CatalogComponent_Conditional_17_For_1_Conditional_0_Template, 5, 2, "div", 31);
  }
  if (rf & 2) {
    const attr_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(attr_r3.id && ctx_r3.filterForm.get("dynamicAttributes." + attr_r3.id) ? 0 : -1);
  }
}
function CatalogComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CatalogComponent_Conditional_17_For_1_Template, 1, 1, null, null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r3.activeAttributes());
  }
}
function CatalogComponent_Conditional_18_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p", 33);
    \u0275\u0275text(2, "Esta categor\xEDa no tiene filtros adicionales.");
    \u0275\u0275elementEnd()();
  }
}
function CatalogComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CatalogComponent_Conditional_18_Conditional_0_Template, 3, 0, "div", 9);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional(((tmp_1_0 = ctx_r3.filterForm.get("category")) == null ? null : tmp_1_0.value) !== "all" ? 0 : -1);
  }
}
function CatalogComponent_Conditional_42_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 36)(1, "div", 38)(2, "div", 39);
    \u0275\u0275element(3, "img", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 41)(5, "h3", 42);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 43);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const product_r5 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c0, product_r5.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("src", product_r5.image, \u0275\u0275sanitizeUrl)("alt", product_r5.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(9, 5, product_r5.price, "ARS", "$"));
  }
}
function CatalogComponent_Conditional_42_Conditional_0_nav_3_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 46)(1, "a", 51);
    \u0275\u0275listener("click", function CatalogComponent_Conditional_42_Conditional_0_nav_3_For_7_Template_a_click_1_listener($event) {
      const \u0275$index_143_r8 = \u0275\u0275restoreView(_r7).$index;
      const ctx_r3 = \u0275\u0275nextContext(4);
      ctx_r3.goToPage(\u0275$index_143_r8 + 1);
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const \u0275$index_143_r8 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("active", ctx_r3.currentPage === \u0275$index_143_r8 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_143_r8 + 1);
  }
}
function CatalogComponent_Conditional_42_Conditional_0_nav_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 44)(1, "ul", 45)(2, "li", 46)(3, "a", 47);
    \u0275\u0275listener("click", function CatalogComponent_Conditional_42_Conditional_0_nav_3_Template_a_click_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(3);
      ctx_r3.goToPage(ctx_r3.currentPage - 1);
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275elementStart(4, "span", 48);
    \u0275\u0275text(5, "\xAB");
    \u0275\u0275elementEnd()()();
    \u0275\u0275repeaterCreate(6, CatalogComponent_Conditional_42_Conditional_0_nav_3_For_7_Template, 3, 3, "li", 49, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(8, "li", 46)(9, "a", 50);
    \u0275\u0275listener("click", function CatalogComponent_Conditional_42_Conditional_0_nav_3_Template_a_click_9_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(3);
      ctx_r3.goToPage(ctx_r3.currentPage + 1);
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275elementStart(10, "span", 48);
    \u0275\u0275text(11, "\xBB");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", ctx_r3.currentPage === 1);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(4, _c1).constructor(ctx_r3.totalPages));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", ctx_r3.currentPage === ctx_r3.totalPages);
  }
}
function CatalogComponent_Conditional_42_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275repeaterCreate(1, CatalogComponent_Conditional_42_Conditional_0_For_2_Template, 10, 11, "a", 36, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CatalogComponent_Conditional_42_Conditional_0_nav_3_Template, 12, 5, "nav", 37);
  }
  if (rf & 2) {
    const products_r9 = \u0275\u0275nextContext();
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(products_r9);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.totalPages > 1);
  }
}
function CatalogComponent_Conditional_42_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "i", 52);
    \u0275\u0275elementStart(2, "p", 53);
    \u0275\u0275text(3, "No se encontraron productos con los filtros seleccionados.");
    \u0275\u0275elementEnd()();
  }
}
function CatalogComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CatalogComponent_Conditional_42_Conditional_0_Template, 4, 1)(1, CatalogComponent_Conditional_42_Conditional_1_Template, 4, 0, "div", 34);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.length > 0 ? 0 : 1);
  }
}
function CatalogComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 54)(2, "span", 55);
    \u0275\u0275text(3, "Cargando productos...");
    \u0275\u0275elementEnd()()();
  }
}
var CatalogComponent = class _CatalogComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  attributeService = inject(AttributeService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  cdr = inject(ChangeDetectorRef);
  paginatedProducts$;
  categories$;
  allAttributes = signal([], ...ngDevMode ? [{ debugName: "allAttributes" }] : []);
  activeAttributes = signal([], ...ngDevMode ? [{ debugName: "activeAttributes" }] : []);
  allCategories = signal(/* @__PURE__ */ new Map(), ...ngDevMode ? [{ debugName: "allCategories" }] : []);
  filterForm;
  sortSubject = new BehaviorSubject("newest");
  pageSubject = new BehaviorSubject(1);
  productsFromQuery$ = new BehaviorSubject([]);
  isSidebarOpen = false;
  totalPages = 0;
  currentPage = 1;
  itemsPerPage = new BehaviorSubject(this.isMobile() ? 12 : 12);
  constructor() {
    this.filterForm = this.fb.group({
      category: [null],
      minPrice: [null],
      maxPrice: [null],
      dynamicAttributes: this.fb.group({})
    });
  }
  onResize(event) {
    this.itemsPerPage.next(this.isMobile() ? 12 : 12);
  }
  ngOnInit() {
    this.loadInitialDataAndInitializeForm();
  }
  isMobile() {
    return window.innerWidth < 992;
  }
  loadInitialDataAndInitializeForm() {
    this.categories$ = this.categoryService.getCategories().pipe(map((categories) => {
      const categoryMap = /* @__PURE__ */ new Map();
      categories.forEach((cat) => categoryMap.set(cat.id, cat));
      this.allCategories.set(categoryMap);
      return categories;
    }));
    this.attributeService.getAttributes().pipe(take(1)).subscribe((attrs) => {
      this.allAttributes.set(attrs);
      this.activeAttributes.set([]);
      const dynamicGroup = this.filterForm.get("dynamicAttributes");
      attrs.forEach((attr) => {
        if (attr.id) {
          const controls = attr.values.reduce((acc, val) => {
            acc[val] = this.fb.control(false);
            return acc;
          }, {});
          dynamicGroup.addControl(attr.id, this.fb.group(controls));
        }
      });
      this.setupFormListeners();
      this.setupProductLoadingPipeline();
      this.applyInitialCategoryFilter();
    });
  }
  setupFormListeners() {
    const filters$ = this.filterForm.valueChanges.pipe(startWith(this.filterForm.value), debounceTime(200), distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)));
    filters$.pipe(map((filters) => filters.category), distinctUntilChanged(), switchMap((categoryId) => {
      this.pageSubject.next(1);
      this.updateActiveFilters(categoryId ?? null);
      const catId = categoryId === "all" ? null : categoryId;
      return this.productService.getProductsByQuery(catId);
    })).subscribe((products) => {
      this.productsFromQuery$.next(products);
    });
  }
  updateActiveFilters(selectedCategoryId) {
    if (!selectedCategoryId || selectedCategoryId === "all") {
      this.activeAttributes.set([]);
      return;
    }
    const category = this.allCategories().get(selectedCategoryId);
    if (category && category.filterableAttributes) {
      const active = this.allAttributes().filter((attr) => category.filterableAttributes.includes(attr.id));
      this.activeAttributes.set(active);
    } else {
      this.activeAttributes.set([]);
    }
  }
  setupProductLoadingPipeline() {
    const filteredProducts$ = combineLatest([
      this.productsFromQuery$,
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value), debounceTime(200))
    ]).pipe(map(([products, filters]) => {
      const { minPrice, maxPrice, dynamicAttributes } = filters;
      const dynamicFilters = {};
      for (const attrId in dynamicAttributes) {
        if (Object.prototype.hasOwnProperty.call(dynamicAttributes, attrId)) {
          const valuesGroup = dynamicAttributes[attrId];
          const selectedValues = Object.keys(valuesGroup).filter((key) => valuesGroup[key]);
          if (selectedValues.length > 0) {
            dynamicFilters[attrId] = selectedValues;
          }
        }
      }
      const hasPriceFilter = minPrice !== null && minPrice !== void 0 || maxPrice !== null && maxPrice !== void 0 && maxPrice > 0;
      const hasDynamicFilter = Object.keys(dynamicFilters).length > 0;
      return products.filter((product) => {
        if (product.totalStock <= 0) {
          return false;
        }
        if (hasPriceFilter) {
          if (minPrice !== null && product.price < minPrice) {
            return false;
          }
          if (maxPrice !== null && maxPrice > 0 && product.price > maxPrice) {
            return false;
          }
        }
        if (hasDynamicFilter) {
          const match = Object.entries(dynamicFilters).every(([attrId, values]) => {
            const productAttributeValues = product.inStockAttributes[attrId];
            if (!productAttributeValues) {
              return false;
            }
            return values.some((val) => productAttributeValues.includes(val));
          });
          if (!match) {
            return false;
          }
        }
        return true;
      });
    }));
    const sortedProducts$ = combineLatest([
      filteredProducts$,
      this.sortSubject
    ]).pipe(map(([products, sort]) => {
      const sorted = [...products];
      if (sort === "priceAsc") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sort === "priceDesc") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sort === "newest") {
        sorted.sort((a, b) => {
          const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
          const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
          return dateB - dateA;
        });
      }
      return sorted;
    }));
    this.paginatedProducts$ = combineLatest([
      sortedProducts$,
      this.pageSubject,
      this.itemsPerPage
    ]).pipe(map(([products, page, itemsPerPageValue]) => {
      this.totalPages = Math.ceil(products.length / itemsPerPageValue);
      this.currentPage = page;
      this.cdr.detectChanges();
      const startIndex = (page - 1) * itemsPerPageValue;
      const endIndex = startIndex + itemsPerPageValue;
      return products.slice(startIndex, endIndex);
    }));
  }
  applyInitialCategoryFilter() {
    this.route.queryParamMap.pipe(take(1)).subscribe((params) => {
      const categoryId = params.get("category");
      if (categoryId) {
        this.filterForm.patchValue({ category: categoryId });
      } else {
        this.filterForm.patchValue({ category: "all" });
      }
    });
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  onSortChange(event) {
    const selectElement = event.target;
    this.sortSubject.next(selectElement.value);
    this.pageSubject.next(1);
  }
  clearFilters() {
    const dynamicGroup = this.filterForm.get("dynamicAttributes");
    dynamicGroup.reset();
    this.filterForm.patchValue({
      category: this.filterForm.get("category")?.value,
      minPrice: null,
      maxPrice: null
    });
    this.pageSubject.next(1);
  }
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageSubject.next(page);
    }
  }
  static \u0275fac = function CatalogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CatalogComponent, selectors: [["app-catalog"]], hostBindings: function CatalogComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function CatalogComponent_resize_HostBindingHandler($event) {
        return ctx.onResize($event);
      }, \u0275\u0275resolveWindow);
    }
  }, decls: 45, vars: 12, consts: [[1, "sidebar-overlay", 3, "click"], [1, "container", "py-5"], [1, "catalog-title"], [1, "catalog-layout"], [1, "filter-sidebar", 3, "formGroup"], [1, "filter-sidebar-content"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3", "pb-3", "border-bottom"], [1, "filter-title", "mb-0"], [1, "btn-close", "d-lg-none", 3, "click"], [1, "filter-group"], [1, "filter-group-title"], ["formGroupName", "dynamicAttributes"], [1, "price-inputs", "d-flex", "align-items-center", "gap-2"], ["type", "number", "placeholder", "M\xEDn", "formControlName", "minPrice", 1, "form-control", "form-control-sm"], ["type", "number", "placeholder", "M\xE1x", "formControlName", "maxPrice", 1, "form-control", "form-control-sm"], [1, "btn", "btn-outline-secondary", "w-100", 3, "click"], [1, "product-list"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "btn", "btn-outline-secondary", "d-lg-none", 3, "click"], [1, "bi", "bi-funnel-fill", "me-2"], [1, "sorting-controls"], [1, "form-select", 3, "change"], ["value", "newest"], ["value", "priceAsc"], ["value", "priceDesc"], [1, "text-center", "mt-5"], [1, "form-check"], ["type", "radio", "name", "category", "id", "cat-all", "value", "all", "formControlName", "category", 1, "form-check-input"], ["for", "cat-all", 1, "form-check-label"], ["type", "radio", "name", "category", "formControlName", "category", 1, "form-check-input", 3, "id", "value"], [1, "form-check-label", 3, "for"], [1, "filter-group", 3, "formGroupName"], ["type", "checkbox", 1, "form-check-input", 3, "id", "formControlName"], [1, "filter-helper-text"], [1, "text-center", "text-muted", "py-5"], [1, "product-grid"], [1, "product-card", 3, "routerLink"], ["class", "pagination-container mt-5", "aria-label", "Paginaci\xF3n de productos", 4, "ngIf"], [1, "product-card-inner"], [1, "product-image"], [3, "src", "alt"], [1, "product-info"], [1, "product-name"], [1, "product-price"], ["aria-label", "Paginaci\xF3n de productos", 1, "pagination-container", "mt-5"], [1, "pagination"], [1, "page-item"], ["aria-label", "Anterior", 1, "page-link", 3, "click"], ["aria-hidden", "true"], [1, "page-item", 3, "active"], ["aria-label", "Siguiente", 1, "page-link", 3, "click"], [1, "page-link", 3, "click"], [1, "bi", "bi-search", "fs-1"], [1, "mt-3"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"]], template: function CatalogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("click", function CatalogComponent_Template_div_click_0_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Nuestro Cat\xE1logo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3)(5, "aside", 4)(6, "div", 5)(7, "div", 6)(8, "h3", 7);
      \u0275\u0275text(9, "Filtros");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 8);
      \u0275\u0275listener("click", function CatalogComponent_Template_button_click_10_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 9)(12, "h5", 10);
      \u0275\u0275text(13, "Categor\xEDas");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(14, CatalogComponent_Conditional_14_Template, 6, 0);
      \u0275\u0275pipe(15, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 11);
      \u0275\u0275conditionalCreate(17, CatalogComponent_Conditional_17_Template, 2, 0)(18, CatalogComponent_Conditional_18_Template, 1, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 9)(20, "h5", 10);
      \u0275\u0275text(21, "Precio");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 12);
      \u0275\u0275element(23, "input", 13);
      \u0275\u0275elementStart(24, "span");
      \u0275\u0275text(25, "-");
      \u0275\u0275elementEnd();
      \u0275\u0275element(26, "input", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "button", 15);
      \u0275\u0275listener("click", function CatalogComponent_Template_button_click_27_listener() {
        return ctx.clearFilters();
      });
      \u0275\u0275text(28, "Limpiar Filtros");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "main", 16)(30, "div", 17)(31, "button", 18);
      \u0275\u0275listener("click", function CatalogComponent_Template_button_click_31_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275element(32, "i", 19);
      \u0275\u0275text(33, "Filtros ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 20)(35, "select", 21);
      \u0275\u0275listener("change", function CatalogComponent_Template_select_change_35_listener($event) {
        return ctx.onSortChange($event);
      });
      \u0275\u0275elementStart(36, "option", 22);
      \u0275\u0275text(37, "Lo m\xE1s nuevo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "option", 23);
      \u0275\u0275text(39, "Precio: Menor a Mayor");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "option", 24);
      \u0275\u0275text(41, "Precio: Mayor a Menor");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(42, CatalogComponent_Conditional_42_Template, 2, 1);
      \u0275\u0275pipe(43, "async");
      \u0275\u0275conditionalBranchCreate(44, CatalogComponent_Conditional_44_Template, 4, 0, "div", 25);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_5_0;
      \u0275\u0275classProp("is-visible", ctx.isSidebarOpen);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("is-open", ctx.isSidebarOpen);
      \u0275\u0275property("formGroup", ctx.filterForm);
      \u0275\u0275advance(9);
      \u0275\u0275conditional((tmp_3_0 = \u0275\u0275pipeBind1(15, 8, ctx.categories$)) ? 14 : -1, tmp_3_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.activeAttributes().length > 0 ? 17 : 18);
      \u0275\u0275advance(25);
      \u0275\u0275conditional((tmp_5_0 = \u0275\u0275pipeBind1(43, 10, ctx.paginatedProducts$)) ? 42 : 44, tmp_5_0);
    }
  }, dependencies: [CommonModule, NgIf, RouterModule, RouterLink, ReactiveFormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormGroupName, AsyncPipe, CurrencyPipe], styles: ['\n\n@keyframes _ngcontent-%COMP%_rotate-gradient {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.catalog-title[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 2.5rem;\n  color: #333;\n}\n.catalog-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 260px 1fr;\n  gap: 2rem;\n  align-items: start;\n}\n.filter-sidebar[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-radius: 8px;\n  height: fit-content;\n  position: sticky;\n  top: 2rem;\n  overflow: hidden;\n  border: 1px solid #e9ecef;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  z-index: 1;\n}\n.filter-sidebar-content[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  padding: 1.5rem;\n  border-radius: 6px;\n  max-height: calc(100vh - 4rem);\n  overflow-y: auto;\n}\n.filter-sidebar-content[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 3px;\n}\n.filter-sidebar-content[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f8f9fa;\n  border-radius: 10px;\n}\n.filter-sidebar-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722);\n  border-radius: 10px;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .filter-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #333;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  padding-bottom: 1.5rem;\n  border-bottom: 1px solid #f0f0f0;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .filter-group[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n  padding-bottom: 0;\n  border-bottom: none;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .filter-group-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin-bottom: 1.25rem;\n  color: #ff5722;\n}\n.filter-helper-text[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #6c757d;\n  font-style: italic;\n  padding: 0 0.5rem;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check[_ngcontent-%COMP%] {\n  padding-left: 0;\n  margin-bottom: 0.75rem;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%] {\n  color: #495057;\n  cursor: pointer;\n  padding-left: 2rem;\n  position: relative;\n  -webkit-user-select: none;\n  user-select: none;\n  line-height: 1.5;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%]::before, \n.filter-sidebar[_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%);\n  transition: all 0.2s ease;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%]::before {\n  width: 20px;\n  height: 20px;\n  border: 2px solid #ced4da;\n  background-color: #fff;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {\n  display: none;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-input[type=radio][_ngcontent-%COMP%]    + .form-check-label[_ngcontent-%COMP%]::before {\n  border-radius: 50%;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-input[type=checkbox][_ngcontent-%COMP%]    + .form-check-label[_ngcontent-%COMP%]::before {\n  border-radius: 4px;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-input[type=radio][_ngcontent-%COMP%]    + .form-check-label[_ngcontent-%COMP%]::after {\n  width: 10px;\n  height: 10px;\n  background-color: #fff;\n  border-radius: 50%;\n  left: 5px;\n  opacity: 0;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-input[type=checkbox][_ngcontent-%COMP%]    + .form-check-label[_ngcontent-%COMP%]::after {\n  width: 5px;\n  height: 10px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  left: 7px;\n  top: 45%;\n  transform: translateY(-50%) rotate(45deg);\n  opacity: 0;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%]:checked    + .form-check-label[_ngcontent-%COMP%]::before {\n  background-color: #ff5722;\n  border-color: #ff5722;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%]:checked    + .form-check-label[_ngcontent-%COMP%]::after {\n  opacity: 1;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%]:checked    + .form-check-label[_ngcontent-%COMP%] {\n  color: #212529;\n  font-weight: 500;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .price-inputs[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  border-color: #ddd;\n  color: #333;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .price-inputs[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #aaa;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .price-inputs[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  background-color: #fff;\n  border-color: #fd7e14;\n  box-shadow: 0 0 0 0.25rem rgba(253, 126, 20, 0.25);\n  color: #333;\n}\n.filter-sidebar[_ngcontent-%COMP%]   .price-inputs[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.sorting-controls[_ngcontent-%COMP%] {\n  margin-left: 0;\n}\n.product-list[_ngcontent-%COMP%]   .sorting-controls[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%] {\n  max-width: 250px;\n  background-color: #fff;\n  color: #333;\n  border-color: #ddd;\n  border-radius: 6px;\n}\n.product-list[_ngcontent-%COMP%]   .sorting-controls[_ngcontent-%COMP%]   .form-select[_ngcontent-%COMP%]:focus {\n  border-color: #fd7e14;\n  box-shadow: 0 0 0 0.25rem rgba(253, 126, 20, 0.25);\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  transition:\n    background 0.3s ease,\n    color 0.3s ease,\n    border-color 0.3s ease;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  color: white;\n  border-color: #fd7e14;\n}\n.product-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 2rem;\n}\n.product-card[_ngcontent-%COMP%] {\n  text-decoration: none;\n  display: block;\n  position: relative;\n  z-index: 1;\n  border-radius: 8px;\n  overflow: hidden;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  padding: 2px;\n  background: #eee;\n}\n.product-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  z-index: -2;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722,\n      #fd7e14);\n  animation: _ngcontent-%COMP%_rotate-gradient 4s linear infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.product-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 12px 24px rgba(253, 126, 20, 0.2);\n}\n.product-card[_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n}\n.product-card-inner[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.product-card[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 300px;\n  padding: 1rem;\n  background-color: #fff;\n}\n.product-card[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  text-align: center;\n  border-top: 1px solid #f0f0f0;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 0.5rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: #495057;\n  margin: 0;\n}\n.sidebar-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 1040;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.3s ease, visibility 0.3s ease;\n}\n.sidebar-overlay.is-visible[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n}\n.pagination-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: #6c757d;\n  border: none;\n  background-color: #fff;\n  margin: 0 5px;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background:\n    linear-gradient(\n      45deg,\n      rgb(253.2151898734, 139.8797468354, 45.2848101266),\n      rgb(255, 106.3846153846, 59.5));\n  transform: translateY(-2px);\n}\n.pagination[_ngcontent-%COMP%]   .page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: #fff;\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722);\n  box-shadow: 0 4px 12px rgba(253, 126, 20, 0.4);\n}\n.pagination[_ngcontent-%COMP%]   .page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  color: #ced4da;\n  background-color: #f8f9fa;\n  box-shadow: none;\n  cursor: not-allowed;\n}\n@media (max-width: 992px) {\n  .catalog-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .filter-sidebar[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 300px;\n    height: 100%;\n    z-index: 1050;\n    transform: translateX(-100%);\n    transition: transform 0.3s ease-in-out;\n    border-radius: 0;\n    border-right: 1px solid #ddd;\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);\n    padding: 0;\n  }\n  .filter-sidebar.is-open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  .filter-sidebar-content[_ngcontent-%COMP%] {\n    height: 100%;\n    overflow-y: auto;\n    border-radius: 0;\n    max-height: none;\n  }\n  .product-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n  .product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n}\n@media (max-width: 576px) {\n  .product-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n/*# sourceMappingURL=catalog.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogComponent, [{
    type: Component,
    args: [{ selector: "app-catalog", standalone: true, imports: [CommonModule, RouterModule, CurrencyPipe, ReactiveFormsModule], template: `<div class="sidebar-overlay" [class.is-visible]="isSidebarOpen" (click)="toggleSidebar()"></div>

<div class="container py-5">
  <h1 class="catalog-title">Nuestro Cat\xE1logo</h1>
  <div class="catalog-layout">

    <aside class="filter-sidebar" [class.is-open]="isSidebarOpen" [formGroup]="filterForm">
      <div class="filter-sidebar-content">
        <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
          <h3 class="filter-title mb-0">Filtros</h3>
          <button class="btn-close d-lg-none" (click)="toggleSidebar()"></button>
        </div>
        
        <div class="filter-group">
          <h5 class="filter-group-title">Categor\xEDas</h5>
          @if (categories$ | async; as categories) {
            <div class="form-check">
              <input class="form-check-input" type="radio" name="category" id="cat-all" value="all" formControlName="category">
              <label class="form-check-label" for="cat-all">Todas</label>
            </div>
            @for (cat of categories; track cat.id) {
              <div class="form-check">
                <input class="form-check-input" type="radio" name="category" [id]="'cat-' + cat.id" [value]="cat.id" formControlName="category">
                <label class="form-check-label" [for]="'cat-' + cat.id">{{ cat.name }}</label>
              </div>
            }
          }
        </div>
        
        <div formGroupName="dynamicAttributes">
          @if(activeAttributes().length > 0) {
            @for (attr of activeAttributes(); track attr.id) {
              @if (attr.id && filterForm.get('dynamicAttributes.' + attr.id)) {
                <div class="filter-group" [formGroupName]="attr.id">
                  <h5 class="filter-group-title">{{ attr.name }}</h5>
                  @for (val of attr.values; track val) {
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" [id]="'attr-' + attr.id + '-' + val" [formControlName]="val">
                      <label class="form-check-label" [for]="'attr-' + attr.id + '-' + val">{{ val }}</label>
                    </div>
                  }
                </div>
              }
            }
          } @else {
            @if (filterForm.get('category')?.value !== 'all') {
              <div class="filter-group">
                <p class="filter-helper-text">Esta categor\xEDa no tiene filtros adicionales.</p>
              </div>
            }
          }
        </div>
        
        <div class="filter-group">
          <h5 class="filter-group-title">Precio</h5>
          <div class="price-inputs d-flex align-items-center gap-2">
            <input type="number" class="form-control form-control-sm" placeholder="M\xEDn" formControlName="minPrice">
            <span>-</span>
            <input type="number" class="form-control form-control-sm" placeholder="M\xE1x" formControlName="maxPrice">
          </div>
        </div>

        <button class="btn btn-outline-secondary w-100" (click)="clearFilters()">Limpiar Filtros</button>
      </div>
    </aside>

    <main class="product-list">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <button class="btn btn-outline-secondary d-lg-none" (click)="toggleSidebar()">
          <i class="bi bi-funnel-fill me-2"></i>Filtros
        </button>
        <div class="sorting-controls">
          <select class="form-select" (change)="onSortChange($event)">
            <option value="newest">Lo m\xE1s nuevo</option>
            <option value="priceAsc">Precio: Menor a Mayor</option>
            <option value="priceDesc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>
      @if (paginatedProducts$ | async; as products) {
        @if (products.length > 0) {
          <div class="product-grid">
            @for (product of products; track product.id) {
              <a [routerLink]="['/shop/product', product.id]" class="product-card">
                <div class="product-card-inner">
                  <div class="product-image">
                    <img [src]="product.image" [alt]="product.name">
                  </div>
                  <div class="product-info">
                    <h3 class="product-name">{{ product.name }}</h3>
                    <p class="product-price">{{ product.price | currency:'ARS':'$' }}</p>
                  </div>
                </div>
              </a>
            }
          </div>

          <nav *ngIf="totalPages > 1" class="pagination-container mt-5" aria-label="Paginaci\xF3n de productos">
            <ul class="pagination">
              <li class="page-item" [class.disabled]="currentPage === 1">
                <a class="page-link" (click)="goToPage(currentPage - 1); $event.preventDefault()" aria-label="Anterior">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              @for (page of [].constructor(totalPages); track i; let i = $index) {
                <li class="page-item" [class.active]="currentPage === i + 1">
                  <a class="page-link" (click)="goToPage(i + 1); $event.preventDefault()">{{ i + 1 }}</a>
                </li>
              }
              <li class="page-item" [class.disabled]="currentPage === totalPages">
                <a class="page-link" (click)="goToPage(currentPage + 1); $event.preventDefault()" aria-label="Siguiente">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>

        } @else {
          <div class="text-center text-muted py-5">
            <i class="bi bi-search fs-1"></i>
            <p class="mt-3">No se encontraron productos con los filtros seleccionados.</p>
          </div>
        }
      } @else {
        <div class="text-center mt-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Cargando productos...</span>
          </div>
        </div>
      }
    </main>
  </div>
</div>`, styles: ['/* src/app/features/shop/components/catalog/catalog.component.scss */\n@keyframes rotate-gradient {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.catalog-title {\n  text-align: center;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 2.5rem;\n  color: #333;\n}\n.catalog-layout {\n  display: grid;\n  grid-template-columns: 260px 1fr;\n  gap: 2rem;\n  align-items: start;\n}\n.filter-sidebar {\n  background-color: #ffffff;\n  border-radius: 8px;\n  height: fit-content;\n  position: sticky;\n  top: 2rem;\n  overflow: hidden;\n  border: 1px solid #e9ecef;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  z-index: 1;\n}\n.filter-sidebar-content {\n  background-color: #ffffff;\n  padding: 1.5rem;\n  border-radius: 6px;\n  max-height: calc(100vh - 4rem);\n  overflow-y: auto;\n}\n.filter-sidebar-content::-webkit-scrollbar {\n  width: 3px;\n}\n.filter-sidebar-content::-webkit-scrollbar-track {\n  background: #f8f9fa;\n  border-radius: 10px;\n}\n.filter-sidebar-content::-webkit-scrollbar-thumb {\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722);\n  border-radius: 10px;\n}\n.filter-sidebar .filter-title {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #333;\n}\n.filter-sidebar .filter-group {\n  margin-bottom: 1.5rem;\n  padding-bottom: 1.5rem;\n  border-bottom: 1px solid #f0f0f0;\n}\n.filter-sidebar .filter-group:last-child {\n  margin-bottom: 0;\n  padding-bottom: 0;\n  border-bottom: none;\n}\n.filter-sidebar .filter-group-title {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin-bottom: 1.25rem;\n  color: #ff5722;\n}\n.filter-helper-text {\n  font-size: 0.9rem;\n  color: #6c757d;\n  font-style: italic;\n  padding: 0 0.5rem;\n}\n.filter-sidebar .form-check {\n  padding-left: 0;\n  margin-bottom: 0.75rem;\n}\n.filter-sidebar .form-check-label {\n  color: #495057;\n  cursor: pointer;\n  padding-left: 2rem;\n  position: relative;\n  -webkit-user-select: none;\n  user-select: none;\n  line-height: 1.5;\n}\n.filter-sidebar .form-check-label::before,\n.filter-sidebar .form-check-label::after {\n  content: "";\n  position: absolute;\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%);\n  transition: all 0.2s ease;\n}\n.filter-sidebar .form-check-label::before {\n  width: 20px;\n  height: 20px;\n  border: 2px solid #ced4da;\n  background-color: #fff;\n}\n.filter-sidebar .form-check-input {\n  display: none;\n}\n.filter-sidebar .form-check-input[type=radio] + .form-check-label::before {\n  border-radius: 50%;\n}\n.filter-sidebar .form-check-input[type=checkbox] + .form-check-label::before {\n  border-radius: 4px;\n}\n.filter-sidebar .form-check-input[type=radio] + .form-check-label::after {\n  width: 10px;\n  height: 10px;\n  background-color: #fff;\n  border-radius: 50%;\n  left: 5px;\n  opacity: 0;\n}\n.filter-sidebar .form-check-input[type=checkbox] + .form-check-label::after {\n  width: 5px;\n  height: 10px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  left: 7px;\n  top: 45%;\n  transform: translateY(-50%) rotate(45deg);\n  opacity: 0;\n}\n.filter-sidebar .form-check-input:checked + .form-check-label::before {\n  background-color: #ff5722;\n  border-color: #ff5722;\n}\n.filter-sidebar .form-check-input:checked + .form-check-label::after {\n  opacity: 1;\n}\n.filter-sidebar .form-check-input:checked + .form-check-label {\n  color: #212529;\n  font-weight: 500;\n}\n.filter-sidebar .price-inputs input {\n  background-color: #f9f9f9;\n  border-color: #ddd;\n  color: #333;\n}\n.filter-sidebar .price-inputs input::placeholder {\n  color: #aaa;\n}\n.filter-sidebar .price-inputs input:focus {\n  background-color: #fff;\n  border-color: #fd7e14;\n  box-shadow: 0 0 0 0.25rem rgba(253, 126, 20, 0.25);\n  color: #333;\n}\n.filter-sidebar .price-inputs span {\n  color: #6c757d;\n}\n.sorting-controls {\n  margin-left: 0;\n}\n.product-list .sorting-controls .form-select {\n  max-width: 250px;\n  background-color: #fff;\n  color: #333;\n  border-color: #ddd;\n  border-radius: 6px;\n}\n.product-list .sorting-controls .form-select:focus {\n  border-color: #fd7e14;\n  box-shadow: 0 0 0 0.25rem rgba(253, 126, 20, 0.25);\n}\n.btn-outline-secondary {\n  transition:\n    background 0.3s ease,\n    color 0.3s ease,\n    border-color 0.3s ease;\n}\n.btn-outline-secondary:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  color: white;\n  border-color: #fd7e14;\n}\n.product-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 2rem;\n}\n.product-card {\n  text-decoration: none;\n  display: block;\n  position: relative;\n  z-index: 1;\n  border-radius: 8px;\n  overflow: hidden;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  padding: 2px;\n  background: #eee;\n}\n.product-card::before {\n  content: "";\n  position: absolute;\n  z-index: -2;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722,\n      #fd7e14);\n  animation: rotate-gradient 4s linear infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.product-card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 12px 24px rgba(253, 126, 20, 0.2);\n}\n.product-card:hover::before {\n  opacity: 1;\n}\n.product-card-inner {\n  background-color: #ffffff;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.product-card .product-image {\n  width: 100%;\n  height: 300px;\n  padding: 1rem;\n  background-color: #fff;\n}\n.product-card .product-image img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.product-card .product-info {\n  padding: 1rem 1.25rem;\n  text-align: center;\n  border-top: 1px solid #f0f0f0;\n}\n.product-card .product-info .product-name {\n  color: #333;\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 0.5rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.product-card .product-info .product-price {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: #495057;\n  margin: 0;\n}\n.sidebar-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 1040;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.3s ease, visibility 0.3s ease;\n}\n.sidebar-overlay.is-visible {\n  opacity: 1;\n  visibility: visible;\n}\n.pagination-container {\n  display: flex;\n  justify-content: center;\n}\n.pagination .page-item .page-link {\n  color: #6c757d;\n  border: none;\n  background-color: #fff;\n  margin: 0 5px;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.pagination .page-item .page-link:hover {\n  color: #fff;\n  background:\n    linear-gradient(\n      45deg,\n      rgb(253.2151898734, 139.8797468354, 45.2848101266),\n      rgb(255, 106.3846153846, 59.5));\n  transform: translateY(-2px);\n}\n.pagination .page-item.active .page-link {\n  color: #fff;\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722);\n  box-shadow: 0 4px 12px rgba(253, 126, 20, 0.4);\n}\n.pagination .page-item.disabled .page-link {\n  color: #ced4da;\n  background-color: #f8f9fa;\n  box-shadow: none;\n  cursor: not-allowed;\n}\n@media (max-width: 992px) {\n  .catalog-layout {\n    grid-template-columns: 1fr;\n  }\n  .filter-sidebar {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 300px;\n    height: 100%;\n    z-index: 1050;\n    transform: translateX(-100%);\n    transition: transform 0.3s ease-in-out;\n    border-radius: 0;\n    border-right: 1px solid #ddd;\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);\n    padding: 0;\n  }\n  .filter-sidebar.is-open {\n    transform: translateX(0);\n  }\n  .filter-sidebar-content {\n    height: 100%;\n    overflow-y: auto;\n    border-radius: 0;\n    max-height: none;\n  }\n  .product-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n  }\n  .product-card .product-info .product-name {\n    font-size: 0.9rem;\n  }\n  .product-card .product-info .product-price {\n    font-size: 1rem;\n  }\n}\n@media (max-width: 576px) {\n  .product-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n/*# sourceMappingURL=catalog.component.css.map */\n'] }]
  }], () => [], { onResize: [{
    type: HostListener,
    args: ["window:resize", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CatalogComponent, { className: "CatalogComponent", filePath: "src/app/features/shop/components/catalog/catalog.component.ts", lineNumber: 22 });
})();
export {
  CatalogComponent
};
//# sourceMappingURL=chunk-2AODT46E.js.map
