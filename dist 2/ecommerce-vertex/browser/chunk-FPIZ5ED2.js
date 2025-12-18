import {
  AttributeService
} from "./chunk-H5HDOTK4.js";
import {
  SweetAlertService
} from "./chunk-5OJQRZGI.js";
import {
  Injectable,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  take,
  ɵɵdefineInjectable
} from "./chunk-QBKDZG3W.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-KTESVR3Q.js";

// src/app/core/services/cart.service.ts
var CartService = class _CartService {
  sweetAlertService = inject(SweetAlertService);
  attributeService = inject(AttributeService);
  CART_STORAGE_KEY = "my_cart";
  attributeMap = /* @__PURE__ */ new Map();
  cart = signal(this.getCartFromStorage(), ...ngDevMode ? [{ debugName: "cart" }] : []);
  itemCount = computed(() => this.cart().items.reduce((acc, item) => acc + item.quantity, 0), ...ngDevMode ? [{ debugName: "itemCount" }] : []);
  constructor() {
    this.loadAttributes();
    effect(() => {
      this.saveCartToStorage(this.cart());
    });
  }
  loadAttributes() {
    this.attributeService.getAttributes().pipe(take(1)).subscribe((attrs) => {
      attrs.forEach((attr) => {
        if (attr.id) {
          this.attributeMap.set(attr.id, attr.name);
        }
      });
    });
  }
  getCartFromStorage() {
    try {
      const cartJson = localStorage.getItem(this.CART_STORAGE_KEY);
      if (cartJson) {
        const cart = JSON.parse(cartJson);
        if (!cart.items) {
          return { items: [], total: 0 };
        }
        return cart;
      }
    } catch (error) {
      console.error("Error reading cart from localStorage", error);
      localStorage.removeItem(this.CART_STORAGE_KEY);
    }
    return { items: [], total: 0 };
  }
  saveCartToStorage(cart) {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage", error);
    }
  }
  calculateTotal(items) {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
  getVariantDescription(attributes) {
    if (this.attributeMap.size === 0) {
      this.loadAttributes();
    }
    return Object.entries(attributes).map(([id, value]) => {
      const name = this.attributeMap.get(id) || id;
      return `${name}: ${value}`;
    }).join(" / ");
  }
  addItem(product, variant, quantity) {
    if (quantity > variant.stock) {
      this.sweetAlertService.error("Stock insuficiente", `No puedes a\xF1adir ${quantity}. Stock disponible: ${variant.stock}.`);
      return;
    }
    const cartItemId = variant.id;
    this.cart.update((currentCart) => {
      const existingItem = currentCart.items.find((item) => item.id === cartItemId);
      let newItems;
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > variant.stock) {
          this.sweetAlertService.error("Stock insuficiente", `No puedes a\xF1adir m\xE1s. Stock disponible: ${variant.stock}.`);
          return currentCart;
        }
        newItems = currentCart.items.map((item) => item.id === cartItemId ? __spreadProps(__spreadValues({}, item), { quantity: newQuantity }) : item);
      } else {
        const variantDescription = this.getVariantDescription(variant.attributes);
        const newItem = {
          id: cartItemId,
          productId: product.id,
          variantId: variant.id,
          name: `${product.name} (${variantDescription})`,
          price: product.price,
          quantity,
          image: variant.image || product.image,
          attributes: variant.attributes,
          stock: variant.stock
        };
        newItems = [...currentCart.items, newItem];
      }
      this.sweetAlertService.success("\xA1A\xF1adido!", "Producto a\xF1adido al carrito.");
      return { items: newItems, total: this.calculateTotal(newItems) };
    });
  }
  updateQuantity(itemId, quantity) {
    this.cart.update((currentCart) => {
      let itemToUpdate = currentCart.items.find((item) => item.id === itemId);
      let newQuantity = quantity;
      if (!itemToUpdate)
        return currentCart;
      if (newQuantity > itemToUpdate.stock) {
        newQuantity = itemToUpdate.stock;
        this.sweetAlertService.error("Stock insuficiente", `Solo quedan ${itemToUpdate.stock} unidades de este producto.`);
      }
      if (newQuantity < 1) {
        newQuantity = 1;
      }
      const newItems = currentCart.items.map((item) => item.id === itemId ? __spreadProps(__spreadValues({}, item), { quantity: newQuantity }) : item);
      return { items: newItems, total: this.calculateTotal(newItems) };
    });
  }
  removeItem(itemId) {
    this.cart.update((currentCart) => {
      const newItems = currentCart.items.filter((item) => item.id !== itemId);
      this.sweetAlertService.success("Eliminado", "El producto ha sido eliminado del carrito.");
      return { items: newItems, total: this.calculateTotal(newItems) };
    });
  }
  clearCart() {
    this.cart.set({ items: [], total: 0 });
  }
  static \u0275fac = function CartService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CartService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CartService, factory: _CartService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CartService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  CartService
};
//# sourceMappingURL=chunk-FPIZ5ED2.js.map
