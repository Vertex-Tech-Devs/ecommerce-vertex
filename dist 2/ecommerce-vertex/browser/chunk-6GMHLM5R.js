import {
  ProductService
} from "./chunk-2ZGQTQTR.js";
import {
  CartService
} from "./chunk-FPIZ5ED2.js";
import {
  AttributeService
} from "./chunk-H5HDOTK4.js";
import "./chunk-5OJQRZGI.js";
import "./chunk-UYVF6V6H.js";
import {
  ActivatedRoute,
  RouterModule
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import "./chunk-HMD6QQFJ.js";
import "./chunk-SDXAAYIW.js";
import {
  CommonModule,
  Component,
  CurrencyPipe,
  combineLatest,
  inject,
  of,
  setClassMetadata,
  signal,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
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
import {
  __spreadProps,
  __spreadValues
} from "./chunk-KTESVR3Q.js";

// src/app/features/shop/components/product-detail/product/product.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ProductComponent_Conditional_0_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "img", 20);
    \u0275\u0275domListener("click", function ProductComponent_Conditional_0_Conditional_6_For_2_Template_img_click_0_listener() {
      const img_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.changeMainImage(img_r3));
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const img_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", img_r3 === ctx_r3.mainImage());
    \u0275\u0275domProperty("src", img_r3, \u0275\u0275sanitizeUrl)("alt", ctx_r3.product.name + " thumbnail");
  }
}
function ProductComponent_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, ProductComponent_Conditional_0_Conditional_6_For_2_Template, 1, 4, "img", 19, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.galleryImages());
  }
}
function ProductComponent_Conditional_0_For_16_For_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 24);
    \u0275\u0275domListener("click", function ProductComponent_Conditional_0_For_16_For_5_Conditional_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const value_r6 = \u0275\u0275nextContext().$implicit;
      const attr_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectAttribute(attr_r7.id, value_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const value_r6 = \u0275\u0275nextContext().$implicit;
    const attr_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("selected", value_r6 === attr_r7.selectedValue);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", value_r6, " ");
  }
}
function ProductComponent_Conditional_0_For_16_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductComponent_Conditional_0_For_16_For_5_Conditional_0_Template, 2, 3, "button", 23);
  }
  if (rf & 2) {
    const value_r6 = ctx.$implicit;
    const attr_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r3.isOptionVisible(attr_r7.id, value_r6) ? 0 : -1);
  }
}
function ProductComponent_Conditional_0_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 12)(1, "label", 21);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 22);
    \u0275\u0275repeaterCreate(4, ProductComponent_Conditional_0_For_16_For_5_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const attr_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", attr_r7.name, ":");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.getValuesForAttribute(attr_r7));
  }
}
function ProductComponent_Conditional_0_Conditional_17_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const variant_r8 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \xA1Disponible! (Quedan ", variant_r8.stock, " unidades) ");
  }
}
function ProductComponent_Conditional_0_Conditional_17_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 25);
    \u0275\u0275text(1, "Agotado");
    \u0275\u0275domElementEnd();
  }
}
function ProductComponent_Conditional_0_Conditional_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductComponent_Conditional_0_Conditional_17_Conditional_1_Conditional_0_Template, 2, 1, "span", 26)(1, ProductComponent_Conditional_0_Conditional_17_Conditional_1_Conditional_1_Template, 2, 0, "span", 25);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.stock > 0 ? 0 : 1);
  }
}
function ProductComponent_Conditional_0_Conditional_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 25);
    \u0275\u0275text(1, "Variante no disponible");
    \u0275\u0275domElementEnd();
  }
}
function ProductComponent_Conditional_0_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 13);
    \u0275\u0275conditionalCreate(1, ProductComponent_Conditional_0_Conditional_17_Conditional_1_Template, 2, 1)(2, ProductComponent_Conditional_0_Conditional_17_Conditional_2_Template, 2, 0, "span", 25);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_2_0 = ctx_r3.selectedVariant()) ? 1 : ctx_r3.selectedVariant() === null && ctx_r3.attributes().length > 0 ? 2 : -1, tmp_2_0);
  }
}
function ProductComponent_Conditional_0_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1, "Selecciona una variante");
    \u0275\u0275domElementEnd();
  }
}
function ProductComponent_Conditional_0_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1, "No disponible");
    \u0275\u0275domElementEnd();
  }
}
function ProductComponent_Conditional_0_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1, "Agotado");
    \u0275\u0275domElementEnd();
  }
}
function ProductComponent_Conditional_0_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span");
    \u0275\u0275text(1, "A\xF1adir al Carrito");
    \u0275\u0275domElementEnd();
  }
}
function ProductComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5);
    \u0275\u0275domElement(5, "img", 6);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(6, ProductComponent_Conditional_0_Conditional_6_Template, 3, 0, "div", 7);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "div", 8)(8, "h1", 9);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "p", 10);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(13, "p", 11);
    \u0275\u0275text(14);
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(15, ProductComponent_Conditional_0_For_16_Template, 6, 1, "div", 12, _forTrack0);
    \u0275\u0275conditionalCreate(17, ProductComponent_Conditional_0_Conditional_17_Template, 3, 1, "div", 13);
    \u0275\u0275domElementStart(18, "div", 14)(19, "div", 15)(20, "button", 16);
    \u0275\u0275domListener("click", function ProductComponent_Conditional_0_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.decreaseQuantity());
    });
    \u0275\u0275text(21, "-");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(22, "span", 17);
    \u0275\u0275text(23);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(24, "button", 16);
    \u0275\u0275domListener("click", function ProductComponent_Conditional_0_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.increaseQuantity());
    });
    \u0275\u0275text(25, "+");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(26, "button", 18);
    \u0275\u0275domListener("click", function ProductComponent_Conditional_0_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.addToCart());
    });
    \u0275\u0275conditionalCreate(27, ProductComponent_Conditional_0_Conditional_27_Template, 2, 0, "span")(28, ProductComponent_Conditional_0_Conditional_28_Template, 2, 0, "span")(29, ProductComponent_Conditional_0_Conditional_29_Template, 2, 0, "span")(30, ProductComponent_Conditional_0_Conditional_30_Template, 2, 0, "span");
    \u0275\u0275domElementEnd()()()()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    let tmp_13_0;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275domProperty("src", ctx_r3.mainImage(), \u0275\u0275sanitizeUrl)("alt", ctx_r3.product.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.galleryImages().length > 1 ? 6 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(12, 12, ctx_r3.product.price, "ARS", "$"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.product.description);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.attributes());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.selectedVariant() !== void 0 ? 17 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275domProperty("disabled", ctx_r3.quantity() <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.quantity());
    \u0275\u0275advance();
    \u0275\u0275domProperty("disabled", !ctx_r3.selectedVariant() || ctx_r3.quantity() >= (((tmp_11_0 = ctx_r3.selectedVariant()) == null ? null : tmp_11_0.stock) || 1));
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", !ctx_r3.selectedVariant() || ((tmp_12_0 = ctx_r3.selectedVariant()) == null ? null : tmp_12_0.stock) === 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.selectedVariant() === void 0 ? 27 : !ctx_r3.selectedVariant() ? 28 : ((tmp_13_0 = ctx_r3.selectedVariant()) == null ? null : tmp_13_0.stock) === 0 ? 29 : 30);
  }
}
function ProductComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1)(1, "div", 27)(2, "span", 28);
    \u0275\u0275text(3, "Cargando producto...");
    \u0275\u0275domElementEnd()()();
  }
}
var ProductComponent = class _ProductComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);
  attributeService = inject(AttributeService);
  product;
  variants = [];
  quantity = signal(1, ...ngDevMode ? [{ debugName: "quantity" }] : []);
  mainImage = signal("", ...ngDevMode ? [{ debugName: "mainImage" }] : []);
  galleryImages = signal([], ...ngDevMode ? [{ debugName: "galleryImages" }] : []);
  attributes = signal([], ...ngDevMode ? [{ debugName: "attributes" }] : []);
  selectedVariant = signal(void 0, ...ngDevMode ? [{ debugName: "selectedVariant" }] : []);
  allAttributes = signal([], ...ngDevMode ? [{ debugName: "allAttributes" }] : []);
  allPossibleValues = /* @__PURE__ */ new Map();
  constructor() {
    this.loadProductData();
  }
  ngOnInit() {
  }
  loadProductData() {
    this.route.paramMap.pipe(switchMap((params) => {
      const productId = params.get("id");
      if (productId) {
        return combineLatest({
          productData: this.productService.getProductWithVariants(productId),
          attributes: this.attributeService.getAttributes()
        });
      }
      return of(null);
    })).subscribe((data) => {
      if (data && data.productData) {
        this.product = data.productData.product;
        this.variants = data.productData.variants.filter((v) => v.stock > 0);
        this.allAttributes.set(data.attributes);
        if (this.product) {
          this.mainImage.set(this.product.image);
          this.galleryImages.set([this.product.image, ...this.product.images || []]);
          this.initializeAttributes();
        }
      }
    });
  }
  initializeAttributes() {
    if (!this.product || !this.product.variantAttributes) {
      this.selectedVariant.set(null);
      return;
    }
    this.allPossibleValues.clear();
    const attributeSelections = this.product.variantAttributes.map((attrId) => {
      const attr = this.allAttributes().find((a) => a.id === attrId);
      const attrName = attr?.name || attrId;
      const allValuesForAttr = [...new Set(this.variants.map((v) => v.attributes[attrId]))].sort();
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
      this.selectedVariant.set(void 0);
    }
  }
  selectAttribute(attributeId, value) {
    this.attributes.update((currentAttributes) => currentAttributes.map((attr) => {
      if (attr.id === attributeId) {
        return __spreadProps(__spreadValues({}, attr), { selectedValue: attr.selectedValue === value ? null : value });
      }
      return attr;
    }));
    this.updateAvailableOptions();
    this.findSelectedVariant();
  }
  updateAvailableOptions() {
    const selectedAttributes = this.attributes().filter((a) => a.selectedValue).reduce((acc, a) => {
      acc[a.id] = a.selectedValue;
      return acc;
    }, {});
    this.attributes.update((currentAttributes) => currentAttributes.map((attr) => {
      const otherSelectedAttributes = __spreadValues({}, selectedAttributes);
      delete otherSelectedAttributes[attr.id];
      const possibleVariants = this.variants.filter((v) => {
        return Object.entries(otherSelectedAttributes).every(([attrId, value]) => v.attributes[attrId] === value);
      });
      const availableValues = [...new Set(possibleVariants.map((v) => v.attributes[attr.id]))];
      let newSelectedValue = attr.selectedValue;
      if (attr.selectedValue && !availableValues.includes(attr.selectedValue)) {
        newSelectedValue = null;
      }
      return __spreadProps(__spreadValues({}, attr), { values: availableValues.sort(), selectedValue: newSelectedValue });
    }));
  }
  findSelectedVariant() {
    const allSelected = this.attributes().every((a) => a.selectedValue);
    if (!allSelected) {
      this.selectedVariant.set(void 0);
      return;
    }
    const selection = this.attributes().reduce((acc, a) => {
      acc[a.id] = a.selectedValue;
      return acc;
    }, {});
    const variant = this.variants.find((v) => {
      return Object.entries(selection).every(([key, value]) => v.attributes[key] === value);
    });
    this.selectedVariant.set(variant || null);
    if (variant) {
      this.mainImage.set(variant.image || this.product?.image || "");
      this.quantity.set(1);
    }
  }
  getValuesForAttribute(attr) {
    return this.allPossibleValues.get(attr.id) || [];
  }
  isOptionVisible(attributeId, value) {
    const attr = this.attributes().find((a) => a.id === attributeId);
    if (!attr)
      return false;
    return attr.values.includes(value);
  }
  changeMainImage(image) {
    this.mainImage.set(image);
  }
  decreaseQuantity() {
    this.quantity.update((q) => q > 1 ? q - 1 : 1);
  }
  increaseQuantity() {
    const variant = this.selectedVariant();
    if (variant) {
      this.quantity.update((q) => q < variant.stock ? q + 1 : q);
    }
  }
  addToCart() {
    const variant = this.selectedVariant();
    if (this.product && variant) {
      this.cartService.addItem(this.product, variant, this.quantity());
    }
  }
  static \u0275fac = function ProductComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductComponent, selectors: [["app-product"]], decls: 2, vars: 1, consts: [[1, "product-detail-container"], [1, "product-detail-container", "product-card", 2, "text-align", "center", "padding-top", "5rem", "padding-bottom", "5rem"], [1, "product-card"], [1, "product-grid"], [1, "product-gallery"], [1, "main-image-container"], [1, "main-image", "fade-in", 3, "src", "alt"], [1, "thumbnail-container"], [1, "product-info"], [1, "product-title"], [1, "product-price"], [1, "product-description"], [1, "variant-selector"], [1, "stock-info"], [1, "purchase-actions"], [1, "quantity-selector"], [1, "quantity-btn", 3, "click", "disabled"], [1, "quantity-value"], [1, "add-to-cart-btn", 3, "click", "disabled"], [1, "thumbnail", 3, "src", "alt", "selected"], [1, "thumbnail", 3, "click", "src", "alt"], [1, "selector-label"], [1, "options-container"], [1, "option-btn", 3, "selected"], [1, "option-btn", 3, "click"], [1, "out-of-stock"], [1, "in-stock"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"]], template: function ProductComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ProductComponent_Conditional_0_Template, 31, 16, "div", 0)(1, ProductComponent_Conditional_1_Template, 4, 0, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.product ? 0 : 1);
    }
  }, dependencies: [CommonModule, RouterModule, CurrencyPipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  background-color: #f4f5f7;\n  padding: 2rem 1.5rem;\n}\n.product-detail-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.product-card[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-radius: 8px;\n  box-shadow: 0 4px_12px rgba(0, 0, 0, 0.05);\n  padding: 2rem;\n}\n.product-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 2rem;\n}\n@media (min-width: 768px) {\n  .product-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    gap: 3rem;\n  }\n}\n.product-gallery[_ngcontent-%COMP%]   .main-image-container[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.product-gallery[_ngcontent-%COMP%]   .main-image-container[_ngcontent-%COMP%]   .main-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n  box-shadow: 0 4px_15px rgba(0, 0, 0, 0.1);\n}\n.product-gallery[_ngcontent-%COMP%]   .thumbnail-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.product-gallery[_ngcontent-%COMP%]   .thumbnail-container[_ngcontent-%COMP%]   .thumbnail[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 6px;\n  cursor: pointer;\n  border: 2px solid transparent;\n  transition: border-color 0.2s ease, transform 0.2s ease;\n}\n.product-gallery[_ngcontent-%COMP%]   .thumbnail-container[_ngcontent-%COMP%]   .thumbnail[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n.product-gallery[_ngcontent-%COMP%]   .thumbnail-container[_ngcontent-%COMP%]   .thumbnail.selected[_ngcontent-%COMP%] {\n  border-color: #ff5722;\n}\n.product-info[_ngcontent-%COMP%]   .product-title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: #333;\n}\n.product-info[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 1.5rem;\n}\n.product-info[_ngcontent-%COMP%]   .product-description[_ngcontent-%COMP%] {\n  line-height: 1.6;\n  color: #6c757d;\n  font-size: 1rem;\n}\n.variant-selector[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n.variant-selector[_ngcontent-%COMP%]   .selector-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-bottom: 0.75rem;\n  display: block;\n  color: #555;\n  font-size: 0.9rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.variant-selector[_ngcontent-%COMP%]   .options-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.variant-selector[_ngcontent-%COMP%]   .option-btn[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  border: 1px solid #ddd;\n  background-color: #f9f9f9;\n  border-radius: 20px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-weight: 500;\n}\n.variant-selector[_ngcontent-%COMP%]   .option-btn[_ngcontent-%COMP%]:hover:not(.selected) {\n  background-color: #f0f0f0;\n  border-color: #ccc;\n}\n.variant-selector[_ngcontent-%COMP%]   .option-btn.selected[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  color: #fff;\n  border-color: transparent;\n  font-weight: 600;\n}\n.stock-info[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  font-weight: 500;\n}\n.stock-info[_ngcontent-%COMP%]   .in-stock[_ngcontent-%COMP%] {\n  color: #28a745;\n}\n.stock-info[_ngcontent-%COMP%]   .out-of-stock[_ngcontent-%COMP%] {\n  color: #dc3545;\n}\n.purchase-actions[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  display: flex;\n  gap: 1.5rem;\n  align-items: center;\n}\n.purchase-actions[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border: 1px solid #ddd;\n  border-radius: 25px;\n  overflow: hidden;\n  background-color: #f9f9f9;\n}\n.purchase-actions[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%]   .quantity-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border: none;\n  background: transparent;\n  font-size: 1.5rem;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n  color: #555;\n}\n.purchase-actions[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%]   .quantity-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: #f0f0f0;\n}\n.purchase-actions[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%]   .quantity-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.purchase-actions[_ngcontent-%COMP%]   .quantity-selector[_ngcontent-%COMP%]   .quantity-value[_ngcontent-%COMP%] {\n  width: 50px;\n  text-align: center;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #333;\n}\n.purchase-actions[_ngcontent-%COMP%]   .add-to-cart-btn[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  height: 42px;\n  padding: 0 1.5rem;\n  border: none;\n  font-weight: 600;\n  font-size: 1rem;\n  cursor: pointer;\n  border-radius: 25px;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.purchase-actions[_ngcontent-%COMP%]   .add-to-cart-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px_15px rgba(255, 87, 34, 0.3);\n}\n.purchase-actions[_ngcontent-%COMP%]   .add-to-cart-btn[_ngcontent-%COMP%]:disabled {\n  background: #aaa;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.fade-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.4s ease-in-out;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=product.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductComponent, [{
    type: Component,
    args: [{ selector: "app-product", standalone: true, imports: [CommonModule, RouterModule, CurrencyPipe], template: `@if (product) {
  <div class="product-detail-container">
    <div class="product-card">
      <div class="product-grid">
        <div class="product-gallery">
          <div class="main-image-container">
            <img [src]="mainImage()" [alt]="product.name" class="main-image fade-in">
          </div>
          @if (galleryImages().length > 1) {
            <div class="thumbnail-container">
              @for (img of galleryImages(); track img) {
                <img
                  [src]="img"
                  [alt]="product.name + ' thumbnail'"
                  class="thumbnail"
                  [class.selected]="img === mainImage()"
                  (click)="changeMainImage(img)">
              }
            </div>
          }
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-price">{{ product.price | currency:'ARS':'$' }}</p>
          <p class="product-description">{{ product.description }}</p>

          @for(attr of attributes(); track attr.id) {
            <div class="variant-selector">
              <label class="selector-label">{{ attr.name }}:</label>
              <div class="options-container">
                @for (value of getValuesForAttribute(attr); track value) {
                  @if (isOptionVisible(attr.id, value)) {
                    <button
                      class="option-btn"
                      [class.selected]="value === attr.selectedValue"
                      (click)="selectAttribute(attr.id, value)">
                      {{ value }}
                    </button>
                  }
                }
              </div>
            </div>
          }

          @if (selectedVariant() !== undefined) {
            <div class="stock-info">
              @if (selectedVariant(); as variant) {
                @if (variant.stock > 0) {
                  <span class="in-stock">
                    \xA1Disponible! (Quedan {{ variant.stock }} unidades)
                  </span>
                } @else {
                  <span class="out-of-stock">Agotado</span>
                }
              } @else if (selectedVariant() === null && attributes().length > 0) {
                <span class="out-of-stock">Variante no disponible</span>
              }
            </div>
          }

          <div class="purchase-actions">
            <div class="quantity-selector">
              <button class="quantity-btn" (click)="decreaseQuantity()" [disabled]="quantity() <= 1">-</button>
              <span class="quantity-value">{{ quantity() }}</span>
              <button class="quantity-btn" (click)="increaseQuantity()" [disabled]="!selectedVariant() || quantity() >= (selectedVariant()?.stock || 1)">+</button>
            </div>

            <button
              class="add-to-cart-btn"
              (click)="addToCart()"
              [disabled]="!selectedVariant() || selectedVariant()?.stock === 0">
              @if (selectedVariant() === undefined) {
                <span>Selecciona una variante</span>
              } @else if (!selectedVariant()) {
                <span>No disponible</span>
              } @else if (selectedVariant()?.stock === 0) {
                <span>Agotado</span>
              } @else {
                <span>A\xF1adir al Carrito</span>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
} @else {
  <div class="product-detail-container product-card" style="text-align: center; padding-top: 5rem; padding-bottom: 5rem;">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Cargando producto...</span>
    </div>
  </div>
}`, styles: ["/* src/app/features/shop/components/product-detail/product/product.component.scss */\n:host {\n  display: block;\n  background-color: #f4f5f7;\n  padding: 2rem 1.5rem;\n}\n.product-detail-container {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.product-card {\n  background-color: #ffffff;\n  border-radius: 8px;\n  box-shadow: 0 4px_12px rgba(0, 0, 0, 0.05);\n  padding: 2rem;\n}\n.product-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 2rem;\n}\n@media (min-width: 768px) {\n  .product-grid {\n    grid-template-columns: 1fr 1fr;\n    gap: 3rem;\n  }\n}\n.product-gallery .main-image-container {\n  margin-bottom: 1rem;\n}\n.product-gallery .main-image-container .main-image {\n  width: 100%;\n  height: auto;\n  border-radius: 8px;\n  box-shadow: 0 4px_15px rgba(0, 0, 0, 0.1);\n}\n.product-gallery .thumbnail-container {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.product-gallery .thumbnail-container .thumbnail {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 6px;\n  cursor: pointer;\n  border: 2px solid transparent;\n  transition: border-color 0.2s ease, transform 0.2s ease;\n}\n.product-gallery .thumbnail-container .thumbnail:hover {\n  transform: scale(1.05);\n}\n.product-gallery .thumbnail-container .thumbnail.selected {\n  border-color: #ff5722;\n}\n.product-info .product-title {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: #333;\n}\n.product-info .product-price {\n  font-size: 1.75rem;\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 1.5rem;\n}\n.product-info .product-description {\n  line-height: 1.6;\n  color: #6c757d;\n  font-size: 1rem;\n}\n.variant-selector {\n  margin-top: 2rem;\n}\n.variant-selector .selector-label {\n  font-weight: 600;\n  margin-bottom: 0.75rem;\n  display: block;\n  color: #555;\n  font-size: 0.9rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.variant-selector .options-container {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.variant-selector .option-btn {\n  padding: 0.5rem 1rem;\n  border: 1px solid #ddd;\n  background-color: #f9f9f9;\n  border-radius: 20px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-weight: 500;\n}\n.variant-selector .option-btn:hover:not(.selected) {\n  background-color: #f0f0f0;\n  border-color: #ccc;\n}\n.variant-selector .option-btn.selected {\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  color: #fff;\n  border-color: transparent;\n  font-weight: 600;\n}\n.stock-info {\n  margin-top: 1rem;\n  font-weight: 500;\n}\n.stock-info .in-stock {\n  color: #28a745;\n}\n.stock-info .out-of-stock {\n  color: #dc3545;\n}\n.purchase-actions {\n  margin-top: 2rem;\n  display: flex;\n  gap: 1.5rem;\n  align-items: center;\n}\n.purchase-actions .quantity-selector {\n  display: flex;\n  align-items: center;\n  border: 1px solid #ddd;\n  border-radius: 25px;\n  overflow: hidden;\n  background-color: #f9f9f9;\n}\n.purchase-actions .quantity-selector .quantity-btn {\n  width: 40px;\n  height: 40px;\n  border: none;\n  background: transparent;\n  font-size: 1.5rem;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n  color: #555;\n}\n.purchase-actions .quantity-selector .quantity-btn:hover:not(:disabled) {\n  background-color: #f0f0f0;\n}\n.purchase-actions .quantity-selector .quantity-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.purchase-actions .quantity-selector .quantity-value {\n  width: 50px;\n  text-align: center;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #333;\n}\n.purchase-actions .add-to-cart-btn {\n  flex-grow: 1;\n  height: 42px;\n  padding: 0 1.5rem;\n  border: none;\n  font-weight: 600;\n  font-size: 1rem;\n  cursor: pointer;\n  border-radius: 25px;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.purchase-actions .add-to-cart-btn:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px_15px rgba(255, 87, 34, 0.3);\n}\n.purchase-actions .add-to-cart-btn:disabled {\n  background: #aaa;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.fade-in {\n  animation: fadeIn 0.4s ease-in-out;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n/*# sourceMappingURL=product.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductComponent, { className: "ProductComponent", filePath: "src/app/features/shop/components/product-detail/product/product.component.ts", lineNumber: 26 });
})();

// src/app/features/shop/components/product-detail/product.routes.ts
var PRODUCT_ROUTES = [
  {
    path: ":id",
    component: ProductComponent
  }
];
export {
  PRODUCT_ROUTES
};
//# sourceMappingURL=chunk-6GMHLM5R.js.map
