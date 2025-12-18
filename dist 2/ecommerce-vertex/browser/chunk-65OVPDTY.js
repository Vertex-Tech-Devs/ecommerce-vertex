import {
  CartService
} from "./chunk-FPIZ5ED2.js";
import "./chunk-H5HDOTK4.js";
import "./chunk-5OJQRZGI.js";
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
  CommonModule,
  Component,
  CurrencyPipe,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/shop/components/cart/cart.component.ts
function CartComponent_Conditional_1_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "img", 15);
    \u0275\u0275elementStart(2, "div", 16)(3, "span", 17);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 18);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 19)(9, "input", 20);
    \u0275\u0275listener("change", function CartComponent_Conditional_1_For_7_Template_input_change_9_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onUpdateQuantity(item_r3, $event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 21)(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 22)(15, "button", 23);
    \u0275\u0275listener("click", function CartComponent_Conditional_1_For_7_Template_button_click_15_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onRemoveItem(item_r3.id));
    });
    \u0275\u0275element(16, "i", 24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r3.image || "assets/placeholder.png", \u0275\u0275sanitizeUrl)("alt", item_r3.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(7, 8, item_r3.price, "ARS", "$"));
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "quantity-" + item_r3.id)("value", item_r3.quantity)("max", item_r3.stock);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(13, 12, item_r3.price * item_r3.quantity, "ARS", "$"));
  }
}
function CartComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 3)(2, "div", 4)(3, "h1", 5);
    \u0275\u0275text(4, "Tu Carrito");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 6);
    \u0275\u0275repeaterCreate(6, CartComponent_Conditional_1_For_7_Template, 17, 16, "div", 7, \u0275\u0275componentInstance().trackByItemId, true);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 8)(9, "div", 9)(10, "h2", 10);
    \u0275\u0275text(11, "Resumen de Compra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 11)(13, "div", 12)(14, "span");
    \u0275\u0275text(15, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 13)(20, "span");
    \u0275\u0275text(21, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "button", 14);
    \u0275\u0275listener("click", function CartComponent_Conditional_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToCheckout());
    });
    \u0275\u0275text(26, " Iniciar Compra ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r3.cart().items);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(18, 2, ctx_r3.cart().total, "ARS", "$"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(24, 6, ctx_r3.cart().total, "ARS", "$"));
  }
}
function CartComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "i", 25);
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3, "Tu carrito est\xE1 vac\xEDo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Parece que todav\xEDa no has a\xF1adido ning\xFAn producto.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "a", 26);
    \u0275\u0275text(7, " Explorar Productos ");
    \u0275\u0275elementEnd()();
  }
}
var CartComponent = class _CartComponent {
  cartService = inject(CartService);
  router = inject(Router);
  cart = this.cartService.cart;
  goToCheckout() {
    this.router.navigate(["/shop/checkout"]);
  }
  onUpdateQuantity(item, event) {
    const inputElement = event.target;
    let newQuantity = parseInt(inputElement.value, 10);
    if (isNaN(newQuantity)) {
      newQuantity = 1;
    }
    if (newQuantity > item.stock) {
      newQuantity = item.stock;
      inputElement.value = String(newQuantity);
    }
    if (newQuantity < 1) {
      newQuantity = 1;
      inputElement.value = "1";
    }
    this.cartService.updateQuantity(item.id, newQuantity);
  }
  onRemoveItem(itemId) {
    this.cartService.removeItem(itemId);
  }
  trackByItemId(index, item) {
    return item.id;
  }
  static \u0275fac = function CartComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CartComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CartComponent, selectors: [["app-cart"]], decls: 3, vars: 1, consts: [[1, "cart-container"], [1, "cart-content"], [1, "empty-cart-container"], [1, "cart-items-card"], [1, "cart-items-card-inner"], [1, "cart-title"], [1, "cart-items-list"], [1, "cart-item"], [1, "cart-summary-card"], [1, "cart-summary-card-inner"], [1, "summary-title"], [1, "summary-details"], [1, "summary-row"], [1, "summary-row", "total-row"], [1, "checkout-button", 3, "click"], [1, "item-image", 3, "src", "alt"], [1, "item-details"], [1, "item-name"], [1, "item-price"], [1, "item-quantity"], ["type", "number", "min", "1", 1, "quantity-input", 3, "change", "id", "value", "max"], [1, "item-subtotal"], [1, "item-actions"], ["title", "Eliminar producto", 1, "remove-button", 3, "click"], [1, "bi", "bi-trash-fill"], [1, "bi", "bi-cart-x", "empty-cart-icon"], ["routerLink", "/shop/catalog", 1, "continue-shopping-button"]], template: function CartComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, CartComponent_Conditional_1_Template, 27, 10, "div", 1)(2, CartComponent_Conditional_2_Template, 8, 0, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.cart().items.length > 0 ? 1 : 2);
    }
  }, dependencies: [
    CommonModule,
    RouterModule,
    RouterLink,
    CurrencyPipe
  ], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  background-color: #f4f5f7;\n  min-height: calc(100vh - 80px);\n}\n@keyframes _ngcontent-%COMP%_rotate-gradient {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.cart-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem 1.5rem;\n}\n.cart-content[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 2rem;\n  align-items: flex-start;\n}\n.cart-items-card[_ngcontent-%COMP%], \n.cart-summary-card[_ngcontent-%COMP%] {\n  text-decoration: none;\n  display: block;\n  position: relative;\n  z-index: 1;\n  border-radius: 8px;\n  overflow: hidden;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  padding: 2px;\n  background: #eee;\n}\n.cart-items-card[_ngcontent-%COMP%]::before, \n.cart-summary-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  z-index: -2;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722,\n      #fd7e14);\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.cart-items-card[_ngcontent-%COMP%]:hover, \n.cart-summary-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 12px 24px rgba(253, 126, 20, 0.2);\n}\n.cart-items-card[_ngcontent-%COMP%]:hover::before, \n.cart-summary-card[_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n}\n.cart-items-card-inner[_ngcontent-%COMP%], \n.cart-summary-card-inner[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-radius: 6px;\n  overflow: hidden;\n  padding: 1.5rem;\n}\n.cart-title[_ngcontent-%COMP%], \n.summary-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n  color: #272727;\n  text-align: center;\n}\n.cart-items-list[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n.cart-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr auto auto auto;\n  gap: 1rem;\n  align-items: center;\n  padding: 1.5rem 0;\n  border-bottom: 1px solid #e9ecef;\n}\n.cart-item[_ngcontent-%COMP%]:first-child {\n  padding-top: 0;\n}\n.cart-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.item-image[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 6px;\n}\n.item-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n.item-price[_ngcontent-%COMP%] {\n  color: #6c757d;\n  font-size: 0.9rem;\n}\n.quantity-input[_ngcontent-%COMP%] {\n  width: 60px;\n  padding: 0.5rem;\n  text-align: center;\n  border: 1px solid #ced4da;\n  border-radius: 4px;\n}\n.item-subtotal[_ngcontent-%COMP%] {\n  font-weight: 600;\n  text-align: right;\n  min-width: 100px;\n  color: #212529;\n}\n.remove-button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #dc3545;\n  font-size: 1.25rem;\n  cursor: pointer;\n  transition: color 0.2s ease, transform 0.2s ease;\n}\n.remove-button[_ngcontent-%COMP%]:hover {\n  color: #a71d2a;\n  transform: scale(1.1);\n}\n.cart-summary-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 2rem;\n}\n.summary-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  color: #495057;\n}\n.summary-row.total-row[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #212529;\n  padding-top: 1rem;\n  border-top: 1px solid #e9ecef;\n}\n.checkout-button[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.85rem;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  text-align: center;\n  text-decoration: none;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.checkout-button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 15px rgba(255, 87, 34, 0.3);\n}\n.empty-cart-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 2rem;\n  background-color: #ffffff;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.empty-cart-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  color: #ff5722;\n  margin-bottom: 1.5rem;\n}\n.empty-cart-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #333;\n}\n.empty-cart-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6c757d;\n  margin-bottom: 2rem;\n}\n.continue-shopping-button[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.75rem 2rem;\n  font-size: 1rem;\n  font-weight: 500;\n  color: #fff;\n  background-color: #070808;\n  border-radius: 6px;\n  text-decoration: none;\n  transition: background-color 0.2s ease;\n}\n.continue-shopping-button[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n}\n@media (max-width: 992px) {\n  .cart-content[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 576px) {\n  .cart-item[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    text-align: center;\n    gap: 0.75rem;\n  }\n  .item-image[_ngcontent-%COMP%] {\n    margin: 0 auto;\n  }\n  .item-subtotal[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n}\n/*# sourceMappingURL=cart.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CartComponent, [{
    type: Component,
    args: [{ selector: "app-cart", standalone: true, imports: [
      CommonModule,
      RouterModule,
      CurrencyPipe
    ], template: `<div class="cart-container">
  @if (cart().items.length > 0) {
    <div class="cart-content">
      <div class="cart-items-card">
        <div class="cart-items-card-inner">
          <h1 class="cart-title">Tu Carrito</h1>
          <div class="cart-items-list">
            @for (item of cart().items; track trackByItemId($index, item)) {
              <div class="cart-item">
                <img [src]="item.image || 'assets/placeholder.png'" [alt]="item.name" class="item-image">
                <div class="item-details">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-price">{{ item.price | currency:'ARS':'$' }}</span>
                </div>
                <div class="item-quantity">
                  <input
                    type="number"
                    [id]="'quantity-' + item.id"
                    [value]="item.quantity"
                    min="1"
                    [max]="item.stock"
                    class="quantity-input"
                    (change)="onUpdateQuantity(item, $event)">
                </div>
                <div class="item-subtotal">
                  <span>{{ (item.price * item.quantity) | currency:'ARS':'$' }}</span>
                </div>
                <div class="item-actions">
                  <button (click)="onRemoveItem(item.id)" class="remove-button" title="Eliminar producto">
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <div class="cart-summary-card">
        <div class="cart-summary-card-inner">
          <h2 class="summary-title">Resumen de Compra</h2>
          <div class="summary-details">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{{ cart().total | currency:'ARS':'$' }}</span>
            </div>
            <div class="summary-row total-row">
              <span>Total</span>
              <span>{{ cart().total | currency:'ARS':'$' }}</span>
            </div>
          </div>
          <button (click)="goToCheckout()" class="checkout-button">
            Iniciar Compra
          </button>
        </div>
      </div>
    </div>
  } @else {
    <div class="empty-cart-container">
      <i class="bi bi-cart-x empty-cart-icon"></i>
      <h2>Tu carrito est\xE1 vac\xEDo</h2>
      <p>Parece que todav\xEDa no has a\xF1adido ning\xFAn producto.</p>
      <a routerLink="/shop/catalog" class="continue-shopping-button">
        Explorar Productos
      </a>
    </div>
  }
</div>
`, styles: ['/* src/app/features/shop/components/cart/cart.component.scss */\n:host {\n  display: block;\n  background-color: #f4f5f7;\n  min-height: calc(100vh - 80px);\n}\n@keyframes rotate-gradient {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.cart-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem 1.5rem;\n}\n.cart-content {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 2rem;\n  align-items: flex-start;\n}\n.cart-items-card,\n.cart-summary-card {\n  text-decoration: none;\n  display: block;\n  position: relative;\n  z-index: 1;\n  border-radius: 8px;\n  overflow: hidden;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  padding: 2px;\n  background: #eee;\n}\n.cart-items-card::before,\n.cart-summary-card::before {\n  content: "";\n  position: absolute;\n  z-index: -2;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722,\n      #fd7e14);\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.cart-items-card:hover,\n.cart-summary-card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 12px 24px rgba(253, 126, 20, 0.2);\n}\n.cart-items-card:hover::before,\n.cart-summary-card:hover::before {\n  opacity: 1;\n}\n.cart-items-card-inner,\n.cart-summary-card-inner {\n  background-color: #ffffff;\n  border-radius: 6px;\n  overflow: hidden;\n  padding: 1.5rem;\n}\n.cart-title,\n.summary-title {\n  font-size: 1.75rem;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n  color: #272727;\n  text-align: center;\n}\n.cart-items-list {\n  overflow: hidden;\n}\n.cart-item {\n  display: grid;\n  grid-template-columns: auto 1fr auto auto auto;\n  gap: 1rem;\n  align-items: center;\n  padding: 1.5rem 0;\n  border-bottom: 1px solid #e9ecef;\n}\n.cart-item:first-child {\n  padding-top: 0;\n}\n.cart-item:last-child {\n  border-bottom: none;\n  padding-bottom: 0;\n}\n.item-image {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 6px;\n}\n.item-details {\n  display: flex;\n  flex-direction: column;\n}\n.item-name {\n  font-weight: 500;\n  color: #333;\n}\n.item-price {\n  color: #6c757d;\n  font-size: 0.9rem;\n}\n.quantity-input {\n  width: 60px;\n  padding: 0.5rem;\n  text-align: center;\n  border: 1px solid #ced4da;\n  border-radius: 4px;\n}\n.item-subtotal {\n  font-weight: 600;\n  text-align: right;\n  min-width: 100px;\n  color: #212529;\n}\n.remove-button {\n  background: none;\n  border: none;\n  color: #dc3545;\n  font-size: 1.25rem;\n  cursor: pointer;\n  transition: color 0.2s ease, transform 0.2s ease;\n}\n.remove-button:hover {\n  color: #a71d2a;\n  transform: scale(1.1);\n}\n.cart-summary-card {\n  position: sticky;\n  top: 2rem;\n}\n.summary-details {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.summary-row {\n  display: flex;\n  justify-content: space-between;\n  color: #495057;\n}\n.summary-row.total-row {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #212529;\n  padding-top: 1rem;\n  border-top: 1px solid #e9ecef;\n}\n.checkout-button {\n  width: 100%;\n  padding: 0.85rem;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  text-align: center;\n  text-decoration: none;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.checkout-button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 15px rgba(255, 87, 34, 0.3);\n}\n.empty-cart-container {\n  text-align: center;\n  padding: 4rem 2rem;\n  background-color: #ffffff;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.empty-cart-icon {\n  font-size: 4rem;\n  color: #ff5722;\n  margin-bottom: 1.5rem;\n}\n.empty-cart-container h2 {\n  font-size: 2rem;\n  color: #333;\n}\n.empty-cart-container p {\n  color: #6c757d;\n  margin-bottom: 2rem;\n}\n.continue-shopping-button {\n  display: inline-block;\n  padding: 0.75rem 2rem;\n  font-size: 1rem;\n  font-weight: 500;\n  color: #fff;\n  background-color: #070808;\n  border-radius: 6px;\n  text-decoration: none;\n  transition: background-color 0.2s ease;\n}\n.continue-shopping-button:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n}\n@media (max-width: 992px) {\n  .cart-content {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 576px) {\n  .cart-item {\n    grid-template-columns: 1fr;\n    text-align: center;\n    gap: 0.75rem;\n  }\n  .item-image {\n    margin: 0 auto;\n  }\n  .item-subtotal {\n    text-align: center;\n  }\n}\n/*# sourceMappingURL=cart.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CartComponent, { className: "CartComponent", filePath: "src/app/features/shop/components/cart/cart.component.ts", lineNumber: 18 });
})();
export {
  CartComponent
};
//# sourceMappingURL=chunk-65OVPDTY.js.map
