import {
  AuthService
} from "./chunk-7ZKMVSWO.js";
import "./chunk-5OJQRZGI.js";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import {
  AsyncPipe,
  CommonModule,
  Component,
  EventEmitter,
  HostListener,
  Input,
  NgClass,
  Output,
  inject,
  map,
  setClassMetadata,
  take,
  tap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵresolveWindow,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/shared/components/header/header.component.ts
var HeaderComponent = class _HeaderComponent {
  toggleSidebarEvent = new EventEmitter();
  authService = inject(AuthService);
  userName$;
  constructor() {
    this.userName$ = this.authService.currentUser$.pipe(map((user) => user?.email ?? "Usuario"));
  }
  onToggleSidebar(event) {
    event.stopPropagation();
    this.toggleSidebarEvent.emit();
  }
  logout() {
    this.authService.logout();
  }
  static \u0275fac = function HeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HeaderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], outputs: { toggleSidebarEvent: "toggleSidebarEvent" }, decls: 29, vars: 3, consts: [[1, "admin-header"], [1, "header-content"], [1, "header-left"], [1, "menu-toggle-wrapper"], [1, "menu-toggle", 3, "click"], [1, "bi", "bi-list"], [1, "welcome-message"], [1, "header-right"], [1, "user-menu-wrapper"], ["type", "button", "id", "userDropdown", "data-bs-toggle", "dropdown", "aria-expanded", "false", 1, "user-dropdown-toggle"], [1, "user-name"], [1, "bi", "bi-person-circle", "user-icon"], [1, "bi", "bi-chevron-down", "dropdown-caret"], ["aria-labelledby", "userDropdown", 1, "dropdown-menu", "dropdown-menu-end"], [1, "dropdown-gradient-wrapper"], [1, "dropdown-content"], ["routerLink", "/admin/account", 1, "dropdown-item"], [1, "bi", "bi-person-gear", "me-2"], [1, "dropdown-divider"], ["type", "button", 1, "dropdown-item", 3, "click"], [1, "bi", "bi-box-arrow-right", "me-2"]], template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      \u0275\u0275listener("click", function HeaderComponent_Template_button_click_4_listener($event) {
        return ctx.onToggleSidebar($event);
      });
      \u0275\u0275element(5, "i", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "span", 6);
      \u0275\u0275text(7, "Bienvenido");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "button", 9)(11, "span", 10);
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "i", 11)(15, "i", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "ul", 13)(17, "div", 14)(18, "div", 15)(19, "li")(20, "a", 16);
      \u0275\u0275element(21, "i", 17);
      \u0275\u0275text(22, "Mi Perfil ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "li");
      \u0275\u0275element(24, "hr", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "li")(26, "button", 19);
      \u0275\u0275listener("click", function HeaderComponent_Template_button_click_26_listener() {
        return ctx.logout();
      });
      \u0275\u0275element(27, "i", 20);
      \u0275\u0275text(28, "Cerrar Sesi\xF3n ");
      \u0275\u0275elementEnd()()()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 1, ctx.userName$));
    }
  }, dependencies: [
    CommonModule,
    RouterModule,
    RouterLink,
    AsyncPipe
  ], styles: ["\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.admin-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  height: 80px;\n  padding: 1rem 1.5rem;\n  display: flex;\n  align-items: center;\n  background-color: #1a1a2e;\n  background-image:\n    radial-gradient(\n      ellipse 50% 100px at 0% 100%,\n      rgba(123, 104, 238, 0.1),\n      transparent),\n    radial-gradient(\n      ellipse 50% 100px at 100% 100%,\n      rgba(0, 123, 255, 0.1),\n      transparent);\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  box-shadow: 0 1px 0 rgba(123, 104, 238, 0.2);\n}\n.header-content[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.header-left[_ngcontent-%COMP%], \n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.welcome-message[_ngcontent-%COMP%] {\n  display: none;\n  font-size: 1.25rem;\n  font-weight: 300;\n  color: #adb5bd;\n}\n.user-menu-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 2px;\n  border-radius: 0.75rem;\n  background: transparent;\n  transition: all 0.3s ease;\n}\n.user-menu-wrapper[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n  box-shadow: 0 0 20px rgba(123, 104, 238, 0.5);\n}\n.user-menu-wrapper[_ngcontent-%COMP%]:hover   .user-dropdown-toggle[_ngcontent-%COMP%] {\n  background-color: #21213b;\n}\n.user-menu-wrapper[_ngcontent-%COMP%]:hover   .user-icon[_ngcontent-%COMP%], \n.user-menu-wrapper[_ngcontent-%COMP%]:hover   .user-name[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.user-dropdown-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  background-color: transparent;\n  border: none;\n  color: #f8f9fa;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  border-radius: calc(0.75rem - 2px);\n  transition: background-color 0.2s ease-in-out;\n}\n.user-dropdown-toggle[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%], \n.user-dropdown-toggle[_ngcontent-%COMP%]   .user-icon[_ngcontent-%COMP%] {\n  transition: color 0.3s ease;\n}\n.user-dropdown-toggle[_ngcontent-%COMP%]   .user-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.user-dropdown-toggle[_ngcontent-%COMP%]   .user-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n}\n.user-dropdown-toggle[_ngcontent-%COMP%]   .dropdown-caret[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #adb5bd;\n  transition: transform 0.3s ease;\n}\n.user-dropdown-toggle[aria-expanded=true][_ngcontent-%COMP%]   .dropdown-caret[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n.dropdown-menu[_ngcontent-%COMP%] {\n  padding: 0;\n  border: none;\n  background: none;\n  border-radius: 0.75rem;\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);\n  margin-top: 0.75rem !important;\n  overflow: hidden;\n}\n.dropdown-menu[_ngcontent-%COMP%]   .dropdown-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 1px;\n  background:\n    linear-gradient(\n      160deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;\n  border-radius: inherit;\n}\n.dropdown-menu[_ngcontent-%COMP%]   .dropdown-content[_ngcontent-%COMP%] {\n  background-color: rgb(36.6586956522, 36.6586956522, 65.5413043478);\n  border-radius: calc(0.75rem - 1px);\n  padding: 0.5rem;\n}\n.dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%] {\n  color: #adb5bd;\n  padding: 0.75rem 1rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  transition: all 0.3s ease;\n}\n.dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:hover, \n.dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]:focus {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(123, 104, 238, 0.2),\n      rgba(0, 123, 255, 0.2));\n  color: #f8f9fa;\n  transform: translateX(5px);\n}\n.dropdown-menu[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]   .bi[_ngcontent-%COMP%] {\n  width: 20px;\n}\n.dropdown-menu[_ngcontent-%COMP%]   .dropdown-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  margin: 0.5rem;\n  border: none;\n  background-image:\n    linear-gradient(\n      to right,\n      transparent,\n      rgba(123, 104, 238, 0.4),\n      transparent);\n}\n.menu-toggle-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 2px;\n  border-radius: 0.5rem;\n  background: transparent;\n  transition: all 0.3s ease;\n}\n.menu-toggle-wrapper[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.menu-toggle[_ngcontent-%COMP%] {\n  background: #21213b;\n  border: 1px solid rgba(248, 249, 250, 0.15);\n  border-radius: calc(0.5rem - 2px);\n  color: #f8f9fa;\n  font-size: 1.5rem;\n  padding: 0.5rem 0.75rem;\n  cursor: pointer;\n  transition: color 0.2s ease, border-color 0.2s ease;\n  display: flex;\n}\n.menu-toggle[_ngcontent-%COMP%]:hover {\n  color: #f8f9fa;\n  border-color: transparent;\n}\n@media (min-width: 768px) {\n  .admin-header[_ngcontent-%COMP%] {\n    padding: 1rem 2rem;\n  }\n  .welcome-message[_ngcontent-%COMP%] {\n    display: inline;\n  }\n  .menu-toggle-wrapper[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=header.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HeaderComponent, [{
    type: Component,
    args: [{ selector: "app-header", standalone: true, imports: [
      CommonModule,
      RouterModule
    ], template: '<header class="admin-header">\n  <div class="header-content">\n    <div class="header-left">\n      <div class="menu-toggle-wrapper">\n        <button class="menu-toggle" (click)="onToggleSidebar($event)">\n          <i class="bi bi-list"></i>\n        </button>\n      </div>\n      <span class="welcome-message">Bienvenido</span>\n    </div>\n\n    <div class="header-right">\n      <div class="user-menu-wrapper">\n        <button class="user-dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">\n          <span class="user-name">{{ userName$ | async }}</span>\n          <i class="bi bi-person-circle user-icon"></i>\n          <i class="bi bi-chevron-down dropdown-caret"></i>\n        </button>\n\n        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">\n          <div class="dropdown-gradient-wrapper">\n            <div class="dropdown-content">\n              <li>\n                <a class="dropdown-item" routerLink="/admin/account">\n                  <i class="bi bi-person-gear me-2"></i>Mi Perfil\n                </a>\n              </li>\n              <li><hr class="dropdown-divider"></li>\n              <li>\n                <button class="dropdown-item" type="button" (click)="logout()">\n                  <i class="bi bi-box-arrow-right me-2"></i>Cerrar Sesi\xF3n\n                </button>\n              </li>\n            </div>\n          </div>\n        </ul>\n      </div>\n    </div>\n  </div>\n</header>\n', styles: ["/* src/app/features/admin/components/shared/components/header/header.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.admin-header {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  height: 80px;\n  padding: 1rem 1.5rem;\n  display: flex;\n  align-items: center;\n  background-color: #1a1a2e;\n  background-image:\n    radial-gradient(\n      ellipse 50% 100px at 0% 100%,\n      rgba(123, 104, 238, 0.1),\n      transparent),\n    radial-gradient(\n      ellipse 50% 100px at 100% 100%,\n      rgba(0, 123, 255, 0.1),\n      transparent);\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  box-shadow: 0 1px 0 rgba(123, 104, 238, 0.2);\n}\n.header-content {\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.header-left,\n.header-right {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.welcome-message {\n  display: none;\n  font-size: 1.25rem;\n  font-weight: 300;\n  color: #adb5bd;\n}\n.user-menu-wrapper {\n  position: relative;\n  padding: 2px;\n  border-radius: 0.75rem;\n  background: transparent;\n  transition: all 0.3s ease;\n}\n.user-menu-wrapper:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n  box-shadow: 0 0 20px rgba(123, 104, 238, 0.5);\n}\n.user-menu-wrapper:hover .user-dropdown-toggle {\n  background-color: #21213b;\n}\n.user-menu-wrapper:hover .user-icon,\n.user-menu-wrapper:hover .user-name {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.user-dropdown-toggle {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  background-color: transparent;\n  border: none;\n  color: #f8f9fa;\n  padding: 0.5rem 1rem;\n  cursor: pointer;\n  border-radius: calc(0.75rem - 2px);\n  transition: background-color 0.2s ease-in-out;\n}\n.user-dropdown-toggle .user-name,\n.user-dropdown-toggle .user-icon {\n  transition: color 0.3s ease;\n}\n.user-dropdown-toggle .user-name {\n  font-weight: 500;\n}\n.user-dropdown-toggle .user-icon {\n  font-size: 1.5rem;\n}\n.user-dropdown-toggle .dropdown-caret {\n  font-size: 0.8rem;\n  color: #adb5bd;\n  transition: transform 0.3s ease;\n}\n.user-dropdown-toggle[aria-expanded=true] .dropdown-caret {\n  transform: rotate(180deg);\n}\n.dropdown-menu {\n  padding: 0;\n  border: none;\n  background: none;\n  border-radius: 0.75rem;\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);\n  margin-top: 0.75rem !important;\n  overflow: hidden;\n}\n.dropdown-menu .dropdown-gradient-wrapper {\n  padding: 1px;\n  background:\n    linear-gradient(\n      160deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: gradient-animation 6s ease infinite;\n  border-radius: inherit;\n}\n.dropdown-menu .dropdown-content {\n  background-color: rgb(36.6586956522, 36.6586956522, 65.5413043478);\n  border-radius: calc(0.75rem - 1px);\n  padding: 0.5rem;\n}\n.dropdown-menu .dropdown-item {\n  color: #adb5bd;\n  padding: 0.75rem 1rem;\n  border-radius: 0.5rem;\n  display: flex;\n  align-items: center;\n  transition: all 0.3s ease;\n}\n.dropdown-menu .dropdown-item:hover,\n.dropdown-menu .dropdown-item:focus {\n  background:\n    linear-gradient(\n      90deg,\n      rgba(123, 104, 238, 0.2),\n      rgba(0, 123, 255, 0.2));\n  color: #f8f9fa;\n  transform: translateX(5px);\n}\n.dropdown-menu .dropdown-item .bi {\n  width: 20px;\n}\n.dropdown-menu .dropdown-divider {\n  height: 1px;\n  margin: 0.5rem;\n  border: none;\n  background-image:\n    linear-gradient(\n      to right,\n      transparent,\n      rgba(123, 104, 238, 0.4),\n      transparent);\n}\n.menu-toggle-wrapper {\n  position: relative;\n  padding: 2px;\n  border-radius: 0.5rem;\n  background: transparent;\n  transition: all 0.3s ease;\n}\n.menu-toggle-wrapper:hover {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.menu-toggle {\n  background: #21213b;\n  border: 1px solid rgba(248, 249, 250, 0.15);\n  border-radius: calc(0.5rem - 2px);\n  color: #f8f9fa;\n  font-size: 1.5rem;\n  padding: 0.5rem 0.75rem;\n  cursor: pointer;\n  transition: color 0.2s ease, border-color 0.2s ease;\n  display: flex;\n}\n.menu-toggle:hover {\n  color: #f8f9fa;\n  border-color: transparent;\n}\n@media (min-width: 768px) {\n  .admin-header {\n    padding: 1rem 2rem;\n  }\n  .welcome-message {\n    display: inline;\n  }\n  .menu-toggle-wrapper {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=header.component.css.map */\n"] }]
  }], () => [], { toggleSidebarEvent: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/features/admin/components/shared/components/header/header.component.ts", lineNumber: 17 });
})();

// src/app/features/admin/components/shared/components/sidebar/sidebar.component.ts
var SidebarComponent = class _SidebarComponent {
  isOpen = false;
  linkClicked = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
  }
  onLinkClick() {
    this.linkClicked.emit();
  }
  static \u0275fac = function SidebarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SidebarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], inputs: { isOpen: "isOpen" }, outputs: { linkClicked: "linkClicked" }, decls: 52, vars: 0, consts: [["id", "sidebar", 1, "sidebar"], [1, "nav-links"], ["routerLink", "/admin/dashboard", "routerLinkActive", "active", 1, "sidebar-link", 3, "click"], [1, "bi", "bi-speedometer2"], ["routerLink", "/admin/products", "routerLinkActive", "active", 1, "sidebar-link", 3, "click"], [1, "bi", "bi-box-seam"], ["routerLink", "/admin/categories", "routerLinkActive", "active", 1, "sidebar-link", 3, "click"], [1, "bi", "bi-tags"], ["routerLink", "/admin/attributes", "routerLinkActive", "active", 1, "sidebar-link", 3, "click"], [1, "bi", "bi-rulers"], ["routerLink", "/admin/orders", "routerLinkActive", "active", 1, "sidebar-link", 3, "click"], [1, "bi", "bi-receipt"], ["routerLink", "/admin/customers", "routerLinkActive", "active", 1, "sidebar-link", 3, "click"], [1, "bi", "bi-people"], ["routerLink", "/admin/home-management", "routerLinkActive", "active", 1, "sidebar-link", 3, "click"], [1, "bi", "bi-house-gear"], ["routerLink", "/admin/gestion-nosotros", "routerLinkActive", "active", 1, "sidebar-link", 3, "click"], [1, "bi", "bi-info-circle"], ["routerLink", "/admin/gestion-footer", "routerLinkActive", "active", 1, "sidebar-link", 3, "click"], [1, "bi", "bi-window-dock"], ["routerLink", "/admin/email-management", "routerLinkActive", "active", 1, "sidebar-link", 3, "click"], [1, "bi", "bi-envelope-paper-fill"]], template: function SidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "nav", 0)(1, "ul", 1)(2, "li")(3, "a", 2);
      \u0275\u0275listener("click", function SidebarComponent_Template_a_click_3_listener() {
        return ctx.onLinkClick();
      });
      \u0275\u0275element(4, "i", 3);
      \u0275\u0275elementStart(5, "span");
      \u0275\u0275text(6, "Dashboard");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(7, "li")(8, "a", 4);
      \u0275\u0275listener("click", function SidebarComponent_Template_a_click_8_listener() {
        return ctx.onLinkClick();
      });
      \u0275\u0275element(9, "i", 5);
      \u0275\u0275elementStart(10, "span");
      \u0275\u0275text(11, "Productos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "li")(13, "a", 6);
      \u0275\u0275listener("click", function SidebarComponent_Template_a_click_13_listener() {
        return ctx.onLinkClick();
      });
      \u0275\u0275element(14, "i", 7);
      \u0275\u0275elementStart(15, "span");
      \u0275\u0275text(16, "Categor\xEDas");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "li")(18, "a", 8);
      \u0275\u0275listener("click", function SidebarComponent_Template_a_click_18_listener() {
        return ctx.onLinkClick();
      });
      \u0275\u0275element(19, "i", 9);
      \u0275\u0275elementStart(20, "span");
      \u0275\u0275text(21, "Atributos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "li")(23, "a", 10);
      \u0275\u0275listener("click", function SidebarComponent_Template_a_click_23_listener() {
        return ctx.onLinkClick();
      });
      \u0275\u0275element(24, "i", 11);
      \u0275\u0275elementStart(25, "span");
      \u0275\u0275text(26, "Pedidos");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "li")(28, "a", 12);
      \u0275\u0275listener("click", function SidebarComponent_Template_a_click_28_listener() {
        return ctx.onLinkClick();
      });
      \u0275\u0275element(29, "i", 13);
      \u0275\u0275elementStart(30, "span");
      \u0275\u0275text(31, "Clientes");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "li")(33, "a", 14);
      \u0275\u0275listener("click", function SidebarComponent_Template_a_click_33_listener() {
        return ctx.onLinkClick();
      });
      \u0275\u0275element(34, "i", 15);
      \u0275\u0275elementStart(35, "span");
      \u0275\u0275text(36, "Gesti\xF3n Home");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "li")(38, "a", 16);
      \u0275\u0275listener("click", function SidebarComponent_Template_a_click_38_listener() {
        return ctx.onLinkClick();
      });
      \u0275\u0275element(39, "i", 17);
      \u0275\u0275elementStart(40, "span");
      \u0275\u0275text(41, "Gesti\xF3n Nosotros");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "li")(43, "a", 18);
      \u0275\u0275listener("click", function SidebarComponent_Template_a_click_43_listener() {
        return ctx.onLinkClick();
      });
      \u0275\u0275element(44, "i", 19);
      \u0275\u0275elementStart(45, "span");
      \u0275\u0275text(46, "Gesti\xF3n Footer");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(47, "li")(48, "a", 20);
      \u0275\u0275listener("click", function SidebarComponent_Template_a_click_48_listener() {
        return ctx.onLinkClick();
      });
      \u0275\u0275element(49, "i", 21);
      \u0275\u0275elementStart(50, "span");
      \u0275\u0275text(51, "Gesti\xF3n de Emails");
      \u0275\u0275elementEnd()()()()();
    }
  }, dependencies: [CommonModule, RouterModule, RouterLink, RouterLinkActive], styles: ["\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.sidebar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background-color: #21213b;\n  border-right: 1px solid rgba(248, 249, 250, 0.1);\n  box-shadow: 5px 0 25px rgba(0, 0, 0, 0.3);\n}\n.nav-links[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 1rem 0;\n  margin: 0;\n  flex-grow: 1;\n}\n.sidebar-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 0.85rem 2rem;\n  margin-bottom: 0.5rem;\n  text-decoration: none;\n  border-radius: 0;\n  position: relative;\n  cursor: pointer;\n}\n.sidebar-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.sidebar-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 500;\n  color: #adb5bd;\n  transition: color 0.3s ease;\n}\n.sidebar-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  margin-right: 1rem;\n  width: 24px;\n}\n.sidebar-link[_ngcontent-%COMP%]:hover:not(.active)   span[_ngcontent-%COMP%], \n.sidebar-link[_ngcontent-%COMP%]:hover:not(.active)   i[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.sidebar-link.active[_ngcontent-%COMP%] {\n  color: #f8f9fa;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;\n}\n.sidebar-link.active[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.sidebar-link.active[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #f8f9fa;\n  background: none;\n  -webkit-background-clip: initial;\n  background-clip: initial;\n}\n/*# sourceMappingURL=sidebar.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{ selector: "app-sidebar", standalone: true, imports: [CommonModule, RouterModule], template: '<nav id="sidebar" class="sidebar">\n  <ul class="nav-links">\n    <li>\n      <a routerLink="/admin/dashboard" routerLinkActive="active" class="sidebar-link" (click)="onLinkClick()">\n        <i class="bi bi-speedometer2"></i>\n        <span>Dashboard</span>\n      </a>\n    </li>\n    <li>\n      <a routerLink="/admin/products" routerLinkActive="active" class="sidebar-link" (click)="onLinkClick()">\n        <i class="bi bi-box-seam"></i>\n        <span>Productos</span>\n      </a>\n    </li>\n    <li>\n      <a routerLink="/admin/categories" routerLinkActive="active" class="sidebar-link" (click)="onLinkClick()">\n        <i class="bi bi-tags"></i>\n        <span>Categor\xEDas</span>\n      </a>\n    </li>\n    <li>\n      <a routerLink="/admin/attributes" routerLinkActive="active" class="sidebar-link" (click)="onLinkClick()">\n        <i class="bi bi-rulers"></i>\n        <span>Atributos</span>\n      </a>\n    </li>\n    <li>\n      <a routerLink="/admin/orders" routerLinkActive="active" class="sidebar-link" (click)="onLinkClick()">\n        <i class="bi bi-receipt"></i>\n        <span>Pedidos</span>\n      </a>\n    </li>\n    <li>\n      <a routerLink="/admin/customers" routerLinkActive="active" class="sidebar-link" (click)="onLinkClick()">\n        <i class="bi bi-people"></i>\n        <span>Clientes</span>\n      </a>\n    </li>\n    <li>\n      <a routerLink="/admin/home-management" routerLinkActive="active" class="sidebar-link" (click)="onLinkClick()">\n        <i class="bi bi-house-gear"></i>\n        <span>Gesti\xF3n Home</span>\n      </a>\n    </li>\n    <li>\n      <a routerLink="/admin/gestion-nosotros" routerLinkActive="active" class="sidebar-link" (click)="onLinkClick()">\n        <i class="bi bi-info-circle"></i>\n        <span>Gesti\xF3n Nosotros</span>\n      </a>\n    </li>\n    <li>\n      <a routerLink="/admin/gestion-footer" routerLinkActive="active" class="sidebar-link" (click)="onLinkClick()">\n        <i class="bi bi-window-dock"></i>\n        <span>Gesti\xF3n Footer</span>\n      </a>\n    </li>\n    <li>\n      <a routerLink="/admin/email-management" routerLinkActive="active" class="sidebar-link" (click)="onLinkClick()">\n        <i class="bi bi-envelope-paper-fill"></i>\n        <span>Gesti\xF3n de Emails</span>\n      </a>\n    </li>\n  </ul>\n</nav>', styles: ["/* src/app/features/admin/components/shared/components/sidebar/sidebar.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.sidebar {\n  display: flex;\n  flex-direction: column;\n  background-color: #21213b;\n  border-right: 1px solid rgba(248, 249, 250, 0.1);\n  box-shadow: 5px 0 25px rgba(0, 0, 0, 0.3);\n}\n.nav-links {\n  list-style: none;\n  padding: 1rem 0;\n  margin: 0;\n  flex-grow: 1;\n}\n.sidebar-link {\n  display: flex;\n  align-items: center;\n  padding: 0.85rem 2rem;\n  margin-bottom: 0.5rem;\n  text-decoration: none;\n  border-radius: 0;\n  position: relative;\n  cursor: pointer;\n}\n.sidebar-link span,\n.sidebar-link i {\n  font-size: 1rem;\n  font-weight: 500;\n  color: #adb5bd;\n  transition: color 0.3s ease;\n}\n.sidebar-link i {\n  font-size: 1.25rem;\n  margin-right: 1rem;\n  width: 24px;\n}\n.sidebar-link:hover:not(.active) span,\n.sidebar-link:hover:not(.active) i {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 6s ease infinite;\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.sidebar-link.active {\n  color: #f8f9fa;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: gradient-animation 6s ease infinite;\n}\n.sidebar-link.active span,\n.sidebar-link.active i {\n  color: #f8f9fa;\n  background: none;\n  -webkit-background-clip: initial;\n  background-clip: initial;\n}\n/*# sourceMappingURL=sidebar.component.css.map */\n"] }]
  }], () => [], { isOpen: [{
    type: Input
  }], linkClicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/features/admin/components/shared/components/sidebar/sidebar.component.ts", lineNumber: 12 });
})();

// src/app/features/admin/admin.component.ts
var _c0 = (a0) => ({ "sidebar-open": a0 });
var _c1 = (a0) => ({ "sidebar-active": a0 });
var AdminComponent = class _AdminComponent {
  isSidebarOpen = false;
  breakpointMd = 768;
  constructor() {
  }
  ngOnInit() {
    this.checkScreenSizeForInitialState();
  }
  toggleSidebar() {
    if (window.innerWidth < this.breakpointMd) {
      this.isSidebarOpen = !this.isSidebarOpen;
      console.log("Sidebar toggled. isSidebarOpen:", this.isSidebarOpen);
    } else {
      this.isSidebarOpen = false;
      console.log("Attempted to toggle sidebar in desktop view. isSidebarOpen kept as:", this.isSidebarOpen);
    }
  }
  closeSidebarOnOverlayClick() {
    if (this.isSidebarOpen && window.innerWidth < this.breakpointMd) {
      this.isSidebarOpen = false;
      console.log("Sidebar closed by overlay click or link click. isSidebarOpen:", this.isSidebarOpen);
    }
  }
  onResize(event) {
    this.checkScreenSizeForInitialState();
    console.log("Window resized. New width:", window.innerWidth, "isSidebarOpen:", this.isSidebarOpen);
  }
  checkScreenSizeForInitialState() {
    if (window.innerWidth >= this.breakpointMd) {
      this.isSidebarOpen = false;
    }
  }
  static \u0275fac = function AdminComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminComponent, selectors: [["app-admin"]], hostBindings: function AdminComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("resize", function AdminComponent_resize_HostBindingHandler($event) {
        return ctx.onResize($event);
      }, \u0275\u0275resolveWindow);
    }
  }, decls: 6, vars: 7, consts: [[1, "dashboard-container"], [3, "linkClicked", "ngClass", "isOpen"], [1, "main-content-wrapper", 3, "click", "ngClass"], [3, "toggleSidebarEvent"], [1, "main-content-area"]], template: function AdminComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "app-sidebar", 1);
      \u0275\u0275listener("linkClicked", function AdminComponent_Template_app_sidebar_linkClicked_1_listener() {
        return ctx.closeSidebarOnOverlayClick();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "div", 2);
      \u0275\u0275listener("click", function AdminComponent_Template_div_click_2_listener() {
        return ctx.closeSidebarOnOverlayClick();
      });
      \u0275\u0275elementStart(3, "app-header", 3);
      \u0275\u0275listener("toggleSidebarEvent", function AdminComponent_Template_app_header_toggleSidebarEvent_3_listener() {
        return ctx.toggleSidebar();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4);
      \u0275\u0275element(5, "router-outlet");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(3, _c0, ctx.isSidebarOpen))("isOpen", ctx.isSidebarOpen);
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(5, _c1, ctx.isSidebarOpen));
    }
  }, dependencies: [CommonModule, NgClass, RouterOutlet, RouterModule, HeaderComponent, SidebarComponent], styles: ['\n\n.dashboard-container[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      180deg,\n      #1a1a2e,\n      #21213b);\n  color: #f8f9fa;\n  font-family: "Inter", sans-serif;\n  overflow-x: hidden;\n}\napp-sidebar[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 280px;\n  height: 100vh;\n  background-color: #21213b;\n  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.6);\n  z-index: 1050;\n  transform: translateX(-100%);\n  transition: transform 0.3s ease-in-out;\n  padding-top: 80px;\n}\napp-sidebar.sidebar-open[_ngcontent-%COMP%] {\n  transform: translateX(0);\n}\napp-sidebar[_ngcontent-%COMP%]::before {\n  content: "";\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: -1;\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n  pointer-events: none;\n}\napp-sidebar.sidebar-open[_ngcontent-%COMP%]::before {\n  opacity: 1;\n  pointer-events: auto;\n}\n.main-content-wrapper[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  margin-left: 0;\n  min-height: 100vh;\n  transition: margin-left 0.3s ease-in-out, filter 0.3s ease-in-out;\n}\n.main-content-wrapper.sidebar-active[_ngcontent-%COMP%] {\n  filter: brightness(0.6);\n  position: relative;\n  z-index: 1040;\n}\napp-header[_ngcontent-%COMP%] {\n  height: 80px;\n  min-height: 80px;\n  width: 100%;\n  z-index: 10;\n  box-sizing: border-box;\n  display: block !important;\n  visibility: visible !important;\n  opacity: 1 !important;\n}\n.main-content-area[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  padding: 1rem;\n  overflow-y: auto;\n  padding-top: 1rem;\n}\n@media (min-width: 768px) {\n  app-sidebar[_ngcontent-%COMP%] {\n    position: static;\n    width: 250px;\n    min-width: 250px;\n    transform: translateX(0);\n    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);\n    padding-top: 0;\n  }\n  app-sidebar[_ngcontent-%COMP%]::before {\n    content: none;\n  }\n  .main-content-wrapper[_ngcontent-%COMP%] {\n    margin-left: 0;\n    width: calc(100% - 250px);\n    filter: none;\n    pointer-events: auto;\n    z-index: auto;\n    position: static;\n  }\n  .main-content-area[_ngcontent-%COMP%] {\n    padding: 1rem 2rem;\n  }\n}\n/*# sourceMappingURL=admin.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminComponent, [{
    type: Component,
    args: [{ selector: "app-admin", standalone: true, imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, SidebarComponent], template: `<div class="dashboard-container">
  <app-sidebar [ngClass]="{'sidebar-open': isSidebarOpen}"
               [isOpen]="isSidebarOpen"
               (linkClicked)="closeSidebarOnOverlayClick()">
  </app-sidebar>

  <div class="main-content-wrapper" [ngClass]="{'sidebar-active': isSidebarOpen}" (click)="closeSidebarOnOverlayClick()">
    <app-header (toggleSidebarEvent)="toggleSidebar()"></app-header>

    <div class="main-content-area">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
`, styles: ['/* src/app/features/admin/admin.component.scss */\n.dashboard-container {\n  display: flex;\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      180deg,\n      #1a1a2e,\n      #21213b);\n  color: #f8f9fa;\n  font-family: "Inter", sans-serif;\n  overflow-x: hidden;\n}\napp-sidebar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 280px;\n  height: 100vh;\n  background-color: #21213b;\n  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.6);\n  z-index: 1050;\n  transform: translateX(-100%);\n  transition: transform 0.3s ease-in-out;\n  padding-top: 80px;\n}\napp-sidebar.sidebar-open {\n  transform: translateX(0);\n}\napp-sidebar::before {\n  content: "";\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: -1;\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n  pointer-events: none;\n}\napp-sidebar.sidebar-open::before {\n  opacity: 1;\n  pointer-events: auto;\n}\n.main-content-wrapper {\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  margin-left: 0;\n  min-height: 100vh;\n  transition: margin-left 0.3s ease-in-out, filter 0.3s ease-in-out;\n}\n.main-content-wrapper.sidebar-active {\n  filter: brightness(0.6);\n  position: relative;\n  z-index: 1040;\n}\napp-header {\n  height: 80px;\n  min-height: 80px;\n  width: 100%;\n  z-index: 10;\n  box-sizing: border-box;\n  display: block !important;\n  visibility: visible !important;\n  opacity: 1 !important;\n}\n.main-content-area {\n  flex-grow: 1;\n  padding: 1rem;\n  overflow-y: auto;\n  padding-top: 1rem;\n}\n@media (min-width: 768px) {\n  app-sidebar {\n    position: static;\n    width: 250px;\n    min-width: 250px;\n    transform: translateX(0);\n    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);\n    padding-top: 0;\n  }\n  app-sidebar::before {\n    content: none;\n  }\n  .main-content-wrapper {\n    margin-left: 0;\n    width: calc(100% - 250px);\n    filter: none;\n    pointer-events: auto;\n    z-index: auto;\n    position: static;\n  }\n  .main-content-area {\n    padding: 1rem 2rem;\n  }\n}\n/*# sourceMappingURL=admin.component.css.map */\n'] }]
  }], () => [], { onResize: [{
    type: HostListener,
    args: ["window:resize", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminComponent, { className: "AdminComponent", filePath: "src/app/features/admin/admin.component.ts", lineNumber: 15 });
})();

// src/app/core/guards/auth.guard.ts
var authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAdmin$.pipe(take(1), tap((isAdmin) => {
    if (!isAdmin) {
      router.navigate(["/admin/login"], {
        queryParams: { authError: "1" }
      });
    }
  }), map((isAdmin) => {
    return isAdmin;
  }));
};

// src/app/features/admin/admin.routes.ts
var adminRoutes = [
  {
    path: "login",
    loadComponent: () => import("./chunk-CT54EPHT.js").then((m) => m.LoginComponent)
  },
  {
    path: "",
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-R6QAR6QT.js").then((m) => m.DashboardComponent)
      },
      {
        path: "products",
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-KOPMPRG4.js").then((m) => m.ProductsListComponent)
          },
          {
            path: "create",
            loadComponent: () => import("./chunk-6CUPM62R.js").then((m) => m.ProductCreateComponent)
          },
          {
            path: "detail/:id",
            loadComponent: () => import("./chunk-TQI6KSUI.js").then((m) => m.ProductDetailComponent)
          },
          {
            path: "edit/:id",
            loadComponent: () => import("./chunk-6CUPM62R.js").then((m) => m.ProductCreateComponent)
          }
        ]
      },
      {
        path: "categories",
        loadComponent: () => import("./chunk-VLKCWBUA.js").then((m) => m.CategoriesListComponent)
      },
      {
        path: "attributes",
        loadComponent: () => import("./chunk-IDNTF425.js").then((m) => m.AttributesListComponent)
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-LDH2UWK3.js").then((m) => m.OrdersListComponent)
          },
          {
            path: "detail/:id",
            loadComponent: () => import("./chunk-LHKYBVLD.js").then((m) => m.OrderDetailComponent)
          }
        ]
      },
      {
        path: "customers",
        loadComponent: () => import("./chunk-F3IPLBFP.js").then((m) => m.ClientsListComponent)
      },
      {
        path: "clients/:email/details",
        loadComponent: () => import("./chunk-T54B5WQ5.js").then((m) => m.ClientDetailsComponent)
      },
      {
        path: "gestion-nosotros",
        loadComponent: () => import("./chunk-7J6GW7NJ.js").then((m) => m.AboutUsManagementComponent)
      },
      {
        path: "account",
        loadComponent: () => import("./chunk-3VDEH7UC.js").then((m) => m.AccountComponent)
      },
      {
        path: "home-management",
        loadComponent: () => import("./chunk-CCQ43GAC.js").then((m) => m.HomeManagementComponent)
      },
      {
        path: "gestion-footer",
        loadComponent: () => import("./chunk-YZOOKCDM.js").then((m) => m.FooterManagementComponent)
      },
      {
        path: "email-management",
        loadComponent: () => import("./chunk-CAHABXML.js").then((m) => m.EmailManagementComponent)
      }
    ]
  }
];
export {
  adminRoutes
};
//# sourceMappingURL=chunk-V4SUXLFD.js.map
