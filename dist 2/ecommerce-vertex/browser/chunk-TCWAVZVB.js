import {
  FooterService
} from "./chunk-FO75YCN5.js";
import {
  CartService
} from "./chunk-FPIZ5ED2.js";
import "./chunk-H5HDOTK4.js";
import "./chunk-5OJQRZGI.js";
import "./chunk-UYVF6V6H.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import "./chunk-HMD6QQFJ.js";
import "./chunk-SDXAAYIW.js";
import {
  AsyncPipe,
  CommonModule,
  Component,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/shop/components/shared/header/header.component.ts
var _c0 = () => ({ exact: true });
function HeaderComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.cartItemCount());
  }
}
var HeaderComponent = class _HeaderComponent {
  cartService = inject(CartService);
  cartItemCount = this.cartService.itemCount;
  isMenuOpen = signal(false, ...ngDevMode ? [{ debugName: "isMenuOpen" }] : []);
  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }
  closeMenu() {
    this.isMenuOpen.set(false);
  }
  static \u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-shop-header"]], decls: 18, vars: 9, consts: [[1, "shop-header"], [1, "sidebar-backdrop", 3, "click"], [1, "container"], ["routerLink", "/shop", 1, "brand-logo"], [1, "menu-toggle", 3, "click"], [1, "bi", "bi-list"], [1, "main-nav"], ["routerLink", "/shop", "routerLinkActive", "active", 3, "click", "routerLinkActiveOptions"], ["routerLink", "/shop/catalog", "routerLinkActive", "active", 3, "click"], ["routerLink", "/shop/about", "routerLinkActive", "active", 3, "click"], [1, "header-actions"], ["routerLink", "/shop/cart", 1, "cart-icon"], [1, "bi", "bi-cart"], [1, "cart-count"]], template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "div", 1);
      \u0275\u0275listener("click", function HeaderComponent_Template_div_click_1_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 2)(3, "a", 3);
      \u0275\u0275text(4, "Vertex");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 4);
      \u0275\u0275listener("click", function HeaderComponent_Template_button_click_5_listener() {
        return ctx.toggleMenu();
      });
      \u0275\u0275element(6, "i", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "nav", 6)(8, "a", 7);
      \u0275\u0275listener("click", function HeaderComponent_Template_a_click_8_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(9, "Inicio");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "a", 8);
      \u0275\u0275listener("click", function HeaderComponent_Template_a_click_10_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(11, "Productos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "a", 9);
      \u0275\u0275listener("click", function HeaderComponent_Template_a_click_12_listener() {
        return ctx.closeMenu();
      });
      \u0275\u0275text(13, "Nosotros");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 10)(15, "a", 11);
      \u0275\u0275element(16, "i", 12);
      \u0275\u0275conditionalCreate(17, HeaderComponent_Conditional_17_Template, 2, 1, "span", 13);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("sidebar-is-open", ctx.isMenuOpen());
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.isMenuOpen());
      \u0275\u0275advance(6);
      \u0275\u0275classProp("menu-open", ctx.isMenuOpen());
      \u0275\u0275advance();
      \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(8, _c0));
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.cartItemCount() > 0 ? 17 : -1);
    }
  }, dependencies: [CommonModule, RouterModule, RouterLink, RouterLinkActive], styles: ['\n\n.sidebar-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 998;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.3s ease, visibility 0.3s ease;\n}\n.sidebar-backdrop.active[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n}\n.shop-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  padding: 1rem 0;\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n  transition: background-color 0.3s ease;\n}\n.shop-header[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n}\n.shop-header[_ngcontent-%COMP%]   .brand-logo[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #ffffff;\n  text-decoration: none;\n  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), text-shadow 0.3s ease;\n  z-index: 1001;\n}\n.shop-header[_ngcontent-%COMP%]   .brand-logo[_ngcontent-%COMP%]:hover {\n  transform: scale(1.1);\n  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);\n}\n.shop-header[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.shop-header[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  margin: 0 1.2rem;\n  text-decoration: none;\n  color: rgba(255, 255, 255, 0.85);\n  font-weight: 500;\n  transition: color 0.3s ease, transform 0.3s ease;\n  position: relative;\n  padding-bottom: 0.5rem;\n}\n.shop-header[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  width: 0;\n  height: 3px;\n  bottom: 0;\n  left: 50%;\n  background-color: #ffffff;\n  transition: width 0.3s ease, left 0.3s ease;\n  transform: translateX(-50%);\n  border-radius: 2px;\n}\n.shop-header[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #ffffff;\n  transform: translateY(-4px);\n}\n.shop-header[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-weight: 700;\n}\n.shop-header[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%]::after {\n  width: 100%;\n  left: 0;\n  transform: translateX(0);\n}\n.shop-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.shop-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .cart-icon[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n  color: #ffffff;\n  position: relative;\n  text-decoration: none;\n  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), text-shadow 0.3s ease;\n}\n.shop-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .cart-icon[_ngcontent-%COMP%]:hover {\n  transform: scale(1.2) rotate(-5deg);\n  text-shadow: 0px 2px 15px rgba(0, 0, 0, 0.3);\n}\n.shop-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   .cart-icon[_ngcontent-%COMP%]   .cart-count[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -8px;\n  right: -12px;\n  background-color: #0d6efd;\n  color: white;\n  border-radius: 50%;\n  width: 22px;\n  height: 22px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 0.75rem;\n  font-weight: bold;\n  border: 2px solid #ffffff;\n}\n.shop-header[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%] {\n  display: none;\n  background: none;\n  border: none;\n  color: white;\n  font-size: 2rem;\n  cursor: pointer;\n  z-index: 1001;\n}\n@media (max-width: 768px) {\n  .shop-header[_ngcontent-%COMP%]   .brand-logo[_ngcontent-%COMP%] {\n    position: absolute;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n  .shop-header[_ngcontent-%COMP%]   .brand-logo[_ngcontent-%COMP%]:hover {\n    transform: translateX(-50%) scale(1);\n    text-shadow: none;\n  }\n  .shop-header[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%] {\n    display: block;\n    transition: opacity 0.2s ease, visibility 0.2s ease;\n  }\n  .shop-header[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 250px;\n    height: 100vh;\n    background:\n      linear-gradient(\n        180deg,\n        #ff5722,\n        #fd7e14);\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    display: flex;\n    gap: 2rem;\n    transform: translateX(-100%);\n    transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);\n    z-index: 999;\n    box-shadow: 3px 0 15px rgba(0, 0, 0, 0.2);\n  }\n  .shop-header[_ngcontent-%COMP%]   .main-nav.menu-open[_ngcontent-%COMP%] {\n    transform: translateX(0);\n  }\n  .shop-header[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    margin: 0;\n    transform: none;\n  }\n  .shop-header[_ngcontent-%COMP%]   .main-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n    transform: none;\n  }\n  .shop-header.sidebar-is-open[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%] {\n    visibility: hidden;\n    opacity: 0;\n  }\n}\n/*# sourceMappingURL=header.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{ selector: "app-shop-header", standalone: true, imports: [CommonModule, RouterModule], template: '<header class="shop-header" [class.sidebar-is-open]="isMenuOpen()">\n  <div class="sidebar-backdrop" [class.active]="isMenuOpen()" (click)="closeMenu()"></div>\n\n  <div class="container">\n    <a routerLink="/shop" class="brand-logo">Vertex</a>\n\n    <button class="menu-toggle" (click)="toggleMenu()">\n      <i class="bi bi-list"></i>\n    </button>\n\n    <nav class="main-nav" [class.menu-open]="isMenuOpen()">\n      <a routerLink="/shop" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Inicio</a>\n      <a routerLink="/shop/catalog" routerLinkActive="active" (click)="closeMenu()">Productos</a>\n      <a routerLink="/shop/about" routerLinkActive="active" (click)="closeMenu()">Nosotros</a>\n    </nav>\n\n    <div class="header-actions">\n      <a routerLink="/shop/cart" class="cart-icon">\n        <i class="bi bi-cart"></i>\n        @if (cartItemCount() > 0) {\n          <span class="cart-count">{{ cartItemCount() }}</span>\n        }\n      </a>\n    </div>\n  </div>\n</header>', styles: ['/* src/app/features/shop/components/shared/header/header.component.scss */\n.sidebar-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 998;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.3s ease, visibility 0.3s ease;\n}\n.sidebar-backdrop.active {\n  opacity: 1;\n  visibility: visible;\n}\n.shop-header {\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  padding: 1rem 0;\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n  transition: background-color 0.3s ease;\n}\n.shop-header .container {\n  position: relative;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n}\n.shop-header .brand-logo {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #ffffff;\n  text-decoration: none;\n  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), text-shadow 0.3s ease;\n  z-index: 1001;\n}\n.shop-header .brand-logo:hover {\n  transform: scale(1.1);\n  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);\n}\n.shop-header .main-nav {\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.shop-header .main-nav a {\n  margin: 0 1.2rem;\n  text-decoration: none;\n  color: rgba(255, 255, 255, 0.85);\n  font-weight: 500;\n  transition: color 0.3s ease, transform 0.3s ease;\n  position: relative;\n  padding-bottom: 0.5rem;\n}\n.shop-header .main-nav a::after {\n  content: "";\n  position: absolute;\n  width: 0;\n  height: 3px;\n  bottom: 0;\n  left: 50%;\n  background-color: #ffffff;\n  transition: width 0.3s ease, left 0.3s ease;\n  transform: translateX(-50%);\n  border-radius: 2px;\n}\n.shop-header .main-nav a:hover {\n  color: #ffffff;\n  transform: translateY(-4px);\n}\n.shop-header .main-nav a.active {\n  color: #ffffff;\n  font-weight: 700;\n}\n.shop-header .main-nav a.active::after {\n  width: 100%;\n  left: 0;\n  transform: translateX(0);\n}\n.shop-header .header-actions {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.shop-header .header-actions .cart-icon {\n  font-size: 1.6rem;\n  color: #ffffff;\n  position: relative;\n  text-decoration: none;\n  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), text-shadow 0.3s ease;\n}\n.shop-header .header-actions .cart-icon:hover {\n  transform: scale(1.2) rotate(-5deg);\n  text-shadow: 0px 2px 15px rgba(0, 0, 0, 0.3);\n}\n.shop-header .header-actions .cart-icon .cart-count {\n  position: absolute;\n  top: -8px;\n  right: -12px;\n  background-color: #0d6efd;\n  color: white;\n  border-radius: 50%;\n  width: 22px;\n  height: 22px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 0.75rem;\n  font-weight: bold;\n  border: 2px solid #ffffff;\n}\n.shop-header .menu-toggle {\n  display: none;\n  background: none;\n  border: none;\n  color: white;\n  font-size: 2rem;\n  cursor: pointer;\n  z-index: 1001;\n}\n@media (max-width: 768px) {\n  .shop-header .brand-logo {\n    position: absolute;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n  .shop-header .brand-logo:hover {\n    transform: translateX(-50%) scale(1);\n    text-shadow: none;\n  }\n  .shop-header .menu-toggle {\n    display: block;\n    transition: opacity 0.2s ease, visibility 0.2s ease;\n  }\n  .shop-header .main-nav {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 250px;\n    height: 100vh;\n    background:\n      linear-gradient(\n        180deg,\n        #ff5722,\n        #fd7e14);\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    display: flex;\n    gap: 2rem;\n    transform: translateX(-100%);\n    transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);\n    z-index: 999;\n    box-shadow: 3px 0 15px rgba(0, 0, 0, 0.2);\n  }\n  .shop-header .main-nav.menu-open {\n    transform: translateX(0);\n  }\n  .shop-header .main-nav a {\n    font-size: 1.5rem;\n    margin: 0;\n    transform: none;\n  }\n  .shop-header .main-nav a:hover {\n    transform: none;\n  }\n  .shop-header.sidebar-is-open .menu-toggle {\n    visibility: hidden;\n    opacity: 0;\n  }\n}\n/*# sourceMappingURL=header.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/features/shop/components/shared/header/header.component.ts", lineNumber: 13 });
})();

// src/app/features/shop/components/shared/footer/footer.component.ts
function FooterComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275domElement(1, "i", 10);
    \u0275\u0275domElementStart(2, "a", 11);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const footerData_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("href", "tel:" + footerData_r1.contactPhone, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(footerData_r1.contactPhone);
  }
}
function FooterComponent_Conditional_0_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275domElement(1, "i", 12);
    \u0275\u0275domElementStart(2, "a", 11);
    \u0275\u0275text(3);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const footerData_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("href", "mailto:" + footerData_r1.contactEmail, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(footerData_r1.contactEmail);
  }
}
function FooterComponent_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 7);
    \u0275\u0275domElement(1, "i", 13);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const footerData_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("href", footerData_r1.socialInstagramUrl, \u0275\u0275sanitizeUrl);
  }
}
function FooterComponent_Conditional_0_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 8);
    \u0275\u0275domElement(1, "i", 14);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const footerData_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("href", footerData_r1.socialFacebookUrl, \u0275\u0275sanitizeUrl);
  }
}
function FooterComponent_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "a", 9);
    \u0275\u0275domElement(1, "i", 15);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const footerData_r1 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("href", footerData_r1.socialWhatsAppUrl, \u0275\u0275sanitizeUrl);
  }
}
function FooterComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "p", 3);
    \u0275\u0275text(4, "Contacto:");
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, FooterComponent_Conditional_0_Conditional_5_Template, 4, 2, "div", 4);
    \u0275\u0275conditionalCreate(6, FooterComponent_Conditional_0_Conditional_6_Template, 4, 2, "div", 4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "div", 5)(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "div", 6);
    \u0275\u0275conditionalCreate(11, FooterComponent_Conditional_0_Conditional_11_Template, 2, 1, "a", 7);
    \u0275\u0275conditionalCreate(12, FooterComponent_Conditional_0_Conditional_12_Template, 2, 1, "a", 8);
    \u0275\u0275conditionalCreate(13, FooterComponent_Conditional_0_Conditional_13_Template, 2, 1, "a", 9);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const footerData_r1 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275conditional(footerData_r1.contactPhone ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(footerData_r1.contactEmail ? 6 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("\xA9 ", ctx_r1.currentYear, " ", footerData_r1.copyrightText);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(footerData_r1.socialInstagramUrl ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(footerData_r1.socialFacebookUrl ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(footerData_r1.socialWhatsAppUrl ? 13 : -1);
  }
}
function FooterComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "footer", 0)(1, "div", 1)(2, "div", 5)(3, "p");
    \u0275\u0275text(4, "Cargando configuraci\xF3n...");
    \u0275\u0275domElementEnd()()()();
  }
}
var FooterComponent = class _FooterComponent {
  currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  footerService = inject(FooterService);
  footerData$;
  constructor() {
    this.footerData$ = this.footerService.getFooterData();
  }
  static \u0275fac = function FooterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FooterComponent, selectors: [["app-shop-footer"]], decls: 3, vars: 3, consts: [[1, "shop-footer"], [1, "container", "footer-container"], [1, "footer-contact"], [1, "contact-title"], [1, "contact-item"], [1, "footer-copyright"], [1, "social-links"], ["target", "_blank", "rel", "noopener noreferrer", "aria-label", "Instagram", "title", "Instagram", 3, "href"], ["target", "_blank", "rel", "noopener noreferrer", "aria-label", "Facebook", "title", "Facebook", 3, "href"], ["target", "_blank", "rel", "noopener noreferrer", "aria-label", "WhatsApp", "title", "WhatsApp", 3, "href"], [1, "bi", "bi-telephone-fill"], [3, "href"], [1, "bi", "bi-envelope-fill"], [1, "bi", "bi-instagram"], [1, "bi", "bi-facebook"], [1, "bi", "bi-whatsapp"]], template: function FooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, FooterComponent_Conditional_0_Template, 14, 7, "footer", 0);
      \u0275\u0275pipe(1, "async");
      \u0275\u0275conditionalBranchCreate(2, FooterComponent_Conditional_2_Template, 5, 0, "footer", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(1, 1, ctx.footerData$)) ? 0 : 2, tmp_0_0);
    }
  }, dependencies: [CommonModule, AsyncPipe], styles: ['\n\n.shop-footer[_ngcontent-%COMP%] {\n  background-color: #343a40;\n  color: #f8f9fa;\n  padding: 2rem 0;\n  margin-top: auto;\n}\n.shop-footer[_ngcontent-%COMP%]   .footer-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n.shop-footer[_ngcontent-%COMP%]   .footer-contact[_ngcontent-%COMP%], \n.shop-footer[_ngcontent-%COMP%]   .footer-copyright[_ngcontent-%COMP%], \n.shop-footer[_ngcontent-%COMP%]   .social-links[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.shop-footer[_ngcontent-%COMP%]   .footer-contact[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.5rem;\n}\n.shop-footer[_ngcontent-%COMP%]   .footer-contact[_ngcontent-%COMP%]   .contact-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-bottom: 0.25rem;\n}\n.shop-footer[_ngcontent-%COMP%]   .footer-contact[_ngcontent-%COMP%]   .contact-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.shop-footer[_ngcontent-%COMP%]   .footer-contact[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #f8f9fa;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.shop-footer[_ngcontent-%COMP%]   .footer-contact[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #ed4b0a;\n}\n.shop-footer[_ngcontent-%COMP%]   .footer-copyright[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.shop-footer[_ngcontent-%COMP%]   .footer-copyright[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.shop-footer[_ngcontent-%COMP%]   .social-links[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n}\n.shop-footer[_ngcontent-%COMP%]   .social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #f8f9fa;\n  font-size: 1.5rem;\n  transition: color 0.3s ease, transform 0.3s ease;\n}\n.shop-footer[_ngcontent-%COMP%]   .social-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #ed4b0a;\n  transform: scale(1.1);\n}\n@media (max-width: 768px) {\n  .shop-footer[_ngcontent-%COMP%]   .footer-container[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr auto;\n    grid-template-areas: "contact social" "copyright copyright";\n    align-items: center;\n    gap: 1.5rem;\n    padding: 0 1rem;\n  }\n  .footer-contact[_ngcontent-%COMP%] {\n    grid-area: contact;\n    justify-self: start;\n  }\n  .social-links[_ngcontent-%COMP%] {\n    grid-area: social;\n    justify-self: end;\n  }\n  .footer-copyright[_ngcontent-%COMP%] {\n    grid-area: copyright;\n    text-align: center;\n  }\n}\n/*# sourceMappingURL=footer.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterComponent, [{
    type: Component,
    args: [{ selector: "app-shop-footer", standalone: true, imports: [CommonModule], template: `@if (footerData$ | async; as footerData) {
  <footer class="shop-footer">
    <div class="container footer-container">

      <div class="footer-contact">
        <p class="contact-title">Contacto:</p>

        @if (footerData.contactPhone) {
          <div class="contact-item">
            <i class="bi bi-telephone-fill"></i>
            <a [href]="'tel:' + footerData.contactPhone">{{ footerData.contactPhone }}</a>
          </div>
        }

        @if (footerData.contactEmail) {
          <div class="contact-item">
            <i class="bi bi-envelope-fill"></i>
            <a [href]="'mailto:' + footerData.contactEmail">{{ footerData.contactEmail }}</a>
          </div>
        }
      </div>

      <div class="footer-copyright">
        <p>&copy; {{ currentYear }} {{ footerData.copyrightText }}</p>
      </div>

      <div class="social-links">

        @if (footerData.socialInstagramUrl) {
          <a [href]="footerData.socialInstagramUrl" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
            <i class="bi bi-instagram"></i>
          </a>
        }

        @if (footerData.socialFacebookUrl) {
          <a [href]="footerData.socialFacebookUrl" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
            <i class="bi bi-facebook"></i>
          </a>
        }

        @if (footerData.socialWhatsAppUrl) {
          <a [href]="footerData.socialWhatsAppUrl" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
            <i class="bi bi-whatsapp"></i>
          </a>
        }
      </div>

    </div>
  </footer>
} @else {
  <footer class="shop-footer">
    <div class="container footer-container">
       <div class="footer-copyright">
          <p>Cargando configuraci\xF3n...</p>
       </div>
    </div>
  </footer>
}
`, styles: ['/* src/app/features/shop/components/shared/footer/footer.component.scss */\n.shop-footer {\n  background-color: #343a40;\n  color: #f8f9fa;\n  padding: 2rem 0;\n  margin-top: auto;\n}\n.shop-footer .footer-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 2rem;\n}\n.shop-footer .footer-contact,\n.shop-footer .footer-copyright,\n.shop-footer .social-links {\n  flex: 1;\n}\n.shop-footer .footer-contact {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.5rem;\n}\n.shop-footer .footer-contact .contact-title {\n  font-weight: 600;\n  margin-bottom: 0.25rem;\n}\n.shop-footer .footer-contact .contact-item {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.shop-footer .footer-contact a {\n  color: #f8f9fa;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.shop-footer .footer-contact a:hover {\n  color: #ed4b0a;\n}\n.shop-footer .footer-copyright {\n  text-align: center;\n}\n.shop-footer .footer-copyright p {\n  margin: 0;\n}\n.shop-footer .social-links {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n}\n.shop-footer .social-links a {\n  color: #f8f9fa;\n  font-size: 1.5rem;\n  transition: color 0.3s ease, transform 0.3s ease;\n}\n.shop-footer .social-links a:hover {\n  color: #ed4b0a;\n  transform: scale(1.1);\n}\n@media (max-width: 768px) {\n  .shop-footer .footer-container {\n    display: grid;\n    grid-template-columns: 1fr auto;\n    grid-template-areas: "contact social" "copyright copyright";\n    align-items: center;\n    gap: 1.5rem;\n    padding: 0 1rem;\n  }\n  .footer-contact {\n    grid-area: contact;\n    justify-self: start;\n  }\n  .social-links {\n    grid-area: social;\n    justify-self: end;\n  }\n  .footer-copyright {\n    grid-area: copyright;\n    text-align: center;\n  }\n}\n/*# sourceMappingURL=footer.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FooterComponent, { className: "FooterComponent", filePath: "src/app/features/shop/components/shared/footer/footer.component.ts", lineNumber: 14 });
})();

// src/app/features/shop/layout/shop/shop.component.ts
var ShopComponent = class _ShopComponent {
  static \u0275fac = function ShopComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShopComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShopComponent, selectors: [["app-shop"]], decls: 4, vars: 0, consts: [[1, "main-content"]], template: function ShopComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "app-shop-header");
      \u0275\u0275elementStart(1, "main", 0);
      \u0275\u0275element(2, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "app-shop-footer");
    }
  }, dependencies: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background-color: #f4f5f7;\n  color: #333;\n}\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 100%;\n}\n/*# sourceMappingURL=shop.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShopComponent, [{
    type: Component,
    args: [{ selector: "app-shop", standalone: true, imports: [
      CommonModule,
      RouterModule,
      HeaderComponent,
      FooterComponent
    ], template: '<app-shop-header></app-shop-header>\n\n<main class="main-content">\n  <router-outlet></router-outlet>\n</main>\n\n<app-shop-footer></app-shop-footer>\n', styles: ["/* src/app/features/shop/layout/shop/shop.component.scss */\n:host {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background-color: #f4f5f7;\n  color: #333;\n}\n.main-content {\n  flex: 1;\n  width: 100%;\n}\n/*# sourceMappingURL=shop.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShopComponent, { className: "ShopComponent", filePath: "src/app/features/shop/layout/shop/shop.component.ts", lineNumber: 19 });
})();

// src/app/core/guards/checkout.guard.ts
var checkoutGuard = () => {
  const cartService = inject(CartService);
  const router = inject(Router);
  if (cartService.itemCount() === 0) {
    console.warn("Acceso a /checkout denegado: El carrito est\xE1 vac\xEDo. Redirigiendo...");
    router.navigate(["/shop/cart"]);
    return false;
  }
  return true;
};

// src/app/features/shop/shop.routes.ts
var SHOP_ROUTES = [
  {
    path: "",
    component: ShopComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        loadComponent: () => import("./chunk-QZABQZV4.js").then((m) => m.HomeComponent)
      },
      {
        path: "catalog",
        loadComponent: () => import("./chunk-2AODT46E.js").then((m) => m.CatalogComponent)
      },
      {
        path: "about",
        loadComponent: () => import("./chunk-W7JAET7L.js").then((m) => m.AboutComponent)
      },
      {
        path: "product",
        loadChildren: () => import("./chunk-6GMHLM5R.js").then((m) => m.PRODUCT_ROUTES)
      },
      {
        path: "cart",
        loadComponent: () => import("./chunk-65OVPDTY.js").then((m) => m.CartComponent)
      },
      {
        path: "checkout",
        canActivate: [checkoutGuard],
        loadComponent: () => import("./chunk-Y2TGGH5Z.js").then((m) => m.CheckoutComponent)
      },
      {
        path: "order-confirmation/:id",
        loadComponent: () => import("./chunk-LL3YVVNU.js").then((m) => m.OrderConfirmationComponent)
      }
    ]
  }
];
export {
  SHOP_ROUTES
};
//# sourceMappingURL=chunk-TCWAVZVB.js.map
