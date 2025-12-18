import {
  ClientService
} from "./chunk-BUEGSFX4.js";
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
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  inject,
  map,
  of,
  setClassMetadata,
  startWith,
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
  ɵɵproperty,
  ɵɵpureFunction0,
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

// src/app/features/admin/components/client/clients-list/clients-list.component.ts
var _c0 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
function ClientsListComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r1 = ctx.$implicit;
    \u0275\u0275property("value", option_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r1, " por p\xE1gina ");
  }
}
function ClientsListComponent_Conditional_30_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 17);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 18);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 19)(10, "button", 20);
    \u0275\u0275listener("click", function ClientsListComponent_Conditional_30_For_1_Template_button_click_10_listener() {
      const client_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewClientHistory(client_r4.email));
    });
    \u0275\u0275element(11, "i", 21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const client_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(client_r4.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(client_r4.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(client_r4.phone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(client_r4.numberOfOrders);
  }
}
function ClientsListComponent_Conditional_30_ForEmpty_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "i", 23);
    \u0275\u0275text(2, " No se encontraron clientes que coincidan. ");
    \u0275\u0275elementEnd();
  }
}
function ClientsListComponent_Conditional_30_ForEmpty_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "i", 24);
    \u0275\u0275text(2, " A\xFAn no hay clientes para mostrar. ");
    \u0275\u0275elementEnd();
  }
}
function ClientsListComponent_Conditional_30_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 22);
    \u0275\u0275conditionalCreate(2, ClientsListComponent_Conditional_30_ForEmpty_2_Conditional_2_Template, 3, 0, "div");
    \u0275\u0275pipe(3, "async");
    \u0275\u0275conditionalBranchCreate(4, ClientsListComponent_Conditional_30_ForEmpty_2_Conditional_4_Template, 3, 0, "div");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(\u0275\u0275pipeBind1(3, 1, ctx_r1.searchTermSubject) ? 2 : 4);
  }
}
function ClientsListComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ClientsListComponent_Conditional_30_For_1_Template, 12, 4, "tr", null, _forTrack0, false, ClientsListComponent_Conditional_30_ForEmpty_2_Template, 5, 3, "tr");
  }
  if (rf & 2) {
    \u0275\u0275repeater(ctx);
  }
}
function ClientsListComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 25)(2, "div", 26)(3, "span", 27);
    \u0275\u0275text(4, "Cargando clientes...");
    \u0275\u0275elementEnd()()()();
  }
}
function ClientsListComponent_Conditional_33_Conditional_0_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 31)(1, "a", 37);
    \u0275\u0275listener("click", function ClientsListComponent_Conditional_33_Conditional_0_For_10_Template_a_click_1_listener() {
      const \u0275$index_123_r8 = \u0275\u0275restoreView(_r7).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.goToPage(\u0275$index_123_r8 + 1));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const \u0275$index_123_r8 = ctx.$index;
    const currentPage_r6 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", currentPage_r6 === \u0275$index_123_r8 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_123_r8 + 1);
  }
}
function ClientsListComponent_Conditional_33_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "nav", 29)(2, "ul", 30)(3, "li", 31)(4, "a", 32);
    \u0275\u0275listener("click", function ClientsListComponent_Conditional_33_Conditional_0_Template_a_click_4_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(1));
    });
    \u0275\u0275text(5, "\xAB");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "li", 31)(7, "a", 33);
    \u0275\u0275listener("click", function ClientsListComponent_Conditional_33_Conditional_0_Template_a_click_7_listener() {
      const currentPage_r6 = \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(currentPage_r6 - 1));
    });
    \u0275\u0275text(8, "\u2039");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(9, ClientsListComponent_Conditional_33_Conditional_0_For_10_Template, 3, 3, "li", 34, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(11, "li", 31)(12, "a", 35);
    \u0275\u0275listener("click", function ClientsListComponent_Conditional_33_Conditional_0_Template_a_click_12_listener() {
      const currentPage_r6 = \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(currentPage_r6 + 1));
    });
    \u0275\u0275text(13, "\u203A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "li", 31)(15, "a", 36);
    \u0275\u0275listener("click", function ClientsListComponent_Conditional_33_Conditional_0_Template_a_click_15_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.totalPages));
    });
    \u0275\u0275text(16, "\xBB");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const currentPage_r6 = ctx;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", currentPage_r6 === 1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", currentPage_r6 === 1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(8, _c0).constructor(ctx_r1.totalPages));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", currentPage_r6 === ctx_r1.totalPages);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", currentPage_r6 === ctx_r1.totalPages);
  }
}
function ClientsListComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ClientsListComponent_Conditional_33_Conditional_0_Template, 17, 9, "div", 28);
    \u0275\u0275pipe(1, "async");
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(1, 1, ctx_r1.currentPageSubject)) ? 0 : -1, tmp_1_0);
  }
}
var ClientsListComponent = class _ClientsListComponent {
  searchTermSubject = new BehaviorSubject("");
  currentPageSubject = new BehaviorSubject(1);
  itemsPerPageSubject = new BehaviorSubject(10);
  itemsPerPageOptions = [5, 10, 20, 30];
  totalClients = 0;
  totalPages = 0;
  clients$;
  _clientService = inject(ClientService);
  _router = inject(Router);
  ngOnInit() {
    this.clients$ = combineLatest([
      this._clientService.getClients().pipe(startWith([]), catchError((err) => {
        console.error("Error al cargar la lista de clientes:", err);
        return of([]);
      })),
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.currentPageSubject,
      this.itemsPerPageSubject
    ]).pipe(map(([allClients, searchTerm, currentPage, itemsPerPage]) => {
      let filteredClients = allClients;
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filteredClients = filteredClients.filter((client) => client.fullName.toLowerCase().includes(lowerCaseSearchTerm) || client.email.toLowerCase().includes(lowerCaseSearchTerm));
      }
      this.totalClients = filteredClients.length;
      this.totalPages = Math.ceil(this.totalClients / itemsPerPage);
      let correctedPage = currentPage;
      if (currentPage > this.totalPages && this.totalPages > 0) {
        correctedPage = this.totalPages;
      } else if (this.totalPages === 0) {
        correctedPage = 1;
      }
      const startIndex = (correctedPage - 1) * itemsPerPage;
      return filteredClients.slice(startIndex, startIndex + itemsPerPage);
    }));
  }
  onSearchChange(newValue) {
    this.searchTermSubject.next(newValue);
    this.currentPageSubject.next(1);
  }
  onItemsPerPageChange(newValue) {
    this.itemsPerPageSubject.next(Number(newValue));
    this.currentPageSubject.next(1);
  }
  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageSubject.next(page);
    }
  }
  viewClientHistory(email) {
    this._router.navigate(["/admin/clients", email, "details"]);
  }
  static \u0275fac = function ClientsListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClientsListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientsListComponent, selectors: [["app-clients-list"]], decls: 34, vars: 10, consts: [[1, "container-fluid", "my-4"], [1, "card-gradient-wrapper"], [1, "card", "list-card", "shadow-sm"], [1, "card-body"], [1, "card-title", "text-center", "mb-4"], [1, "row", "g-3", "mb-4", "align-items-center"], [1, "col-lg-9", "col-md-6"], ["type", "text", "placeholder", "Buscar por nombre o email...", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-lg-3", "col-md-6"], [1, "form-select", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "table-responsive"], [1, "table", "table-hover", "align-middle", "client-table"], ["scope", "col"], ["scope", "col", 1, "text-center"], ["data-label", "Nombre"], ["data-label", "Email"], ["data-label", "Tel\xE9fono"], ["data-label", "N.\xBA Pedidos", 1, "text-center"], ["data-label", "Acciones", 1, "text-center"], ["title", "Ver Historial de Pedidos", 1, "btn", "btn-outline-primary", "btn-sm", 3, "click"], [1, "bi", "bi-eye"], ["colspan", "5", 1, "text-center", "text-muted-custom", "py-5"], [1, "bi", "bi-search", "fs-2", "d-block", "mb-2"], [1, "bi", "bi-person-slash", "fs-2", "d-block", "mb-2"], ["colspan", "5", 1, "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "d-flex", "justify-content-center", "mt-4"], ["aria-label", "Paginaci\xF3n de clientes"], [1, "pagination"], [1, "page-item"], ["aria-label", "Primera", 1, "page-link", 3, "click"], ["aria-label", "Anterior", 1, "page-link", 3, "click"], [1, "page-item", 3, "active"], ["aria-label", "Siguiente", 1, "page-link", 3, "click"], ["aria-label", "\xDAltima", 1, "page-link", 3, "click"], [1, "page-link", 3, "click"]], template: function ClientsListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4);
      \u0275\u0275text(5, "Directorio de Clientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "input", 7);
      \u0275\u0275pipe(9, "async");
      \u0275\u0275listener("ngModelChange", function ClientsListComponent_Template_input_ngModelChange_8_listener($event) {
        return ctx.onSearchChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 8)(11, "select", 9);
      \u0275\u0275pipe(12, "async");
      \u0275\u0275listener("ngModelChange", function ClientsListComponent_Template_select_ngModelChange_11_listener($event) {
        return ctx.onItemsPerPageChange($event);
      });
      \u0275\u0275repeaterCreate(13, ClientsListComponent_For_14_Template, 2, 2, "option", 10, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "div", 11)(16, "table", 12)(17, "thead")(18, "tr")(19, "th", 13);
      \u0275\u0275text(20, "Nombre Completo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "th", 13);
      \u0275\u0275text(22, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "th", 13);
      \u0275\u0275text(24, "Tel\xE9fono");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "th", 14);
      \u0275\u0275text(26, "N.\xBA Pedidos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "th", 14);
      \u0275\u0275text(28, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "tbody");
      \u0275\u0275conditionalCreate(30, ClientsListComponent_Conditional_30_Template, 3, 1);
      \u0275\u0275pipe(31, "async");
      \u0275\u0275conditionalBranchCreate(32, ClientsListComponent_Conditional_32_Template, 5, 0, "tr");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(33, ClientsListComponent_Conditional_33_Template, 2, 3);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("ngModel", \u0275\u0275pipeBind1(9, 4, ctx.searchTermSubject));
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", \u0275\u0275pipeBind1(12, 6, ctx.itemsPerPageSubject));
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.itemsPerPageOptions);
      \u0275\u0275advance(17);
      \u0275\u0275conditional((tmp_3_0 = \u0275\u0275pipeBind1(31, 8, ctx.clients$)) ? 30 : 32, tmp_3_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.totalClients > 0 && ctx.totalPages > 1 ? 33 : -1);
    }
  }, dependencies: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    AsyncPipe
  ], styles: ['\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.list-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.list-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.5rem 1rem;\n}\n.form-control[_ngcontent-%COMP%]:hover, \n.form-select[_ngcontent-%COMP%]:hover {\n  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\n.client-table.table[_ngcontent-%COMP%] {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);\n}\n.client-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.client-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n  cursor: pointer;\n}\n.client-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.client-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.client-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  color: #000;\n  font-weight: 500;\n}\n.client-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {\n  opacity: 1;\n}\n.text-muted-custom[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  border-radius: 50% !important;\n  margin: 0 4px;\n  border: none;\n  font-weight: 600;\n  color: #6c757d;\n  transition: all 0.3s ease;\n  width: 38px;\n  height: 38px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n}\n.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:hover {\n  background-color: #e9ecef;\n  color: #7b68ee;\n  transform: translateY(-2px);\n}\n.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:focus {\n  box-shadow: none;\n}\n.pagination[_ngcontent-%COMP%]   .page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: #7b68ee;\n  color: #fff;\n  box-shadow: 0 4px 12px rgba(123, 104, 238, 0.4);\n  transform: translateY(-3px);\n}\n.pagination[_ngcontent-%COMP%]   .page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: transparent;\n  color: #ced4da;\n  cursor: default;\n}\n.pagination[_ngcontent-%COMP%]   .page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:hover {\n  transform: none;\n  background-color: transparent;\n}\n@media (max-width: 768px) {\n  .client-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .client-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%], \n   .client-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], \n   .client-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n  }\n  .client-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n  }\n  .client-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n    transform: none;\n  }\n  .client-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {\n    opacity: 1;\n  }\n  .client-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: right !important;\n    padding: 0.75rem 1rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n    position: relative;\n    z-index: 1;\n  }\n  .client-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    border-top-left-radius: 0.75rem;\n    border-top-right-radius: 0.75rem;\n  }\n  .client-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n    border-bottom-left-radius: 0.75rem;\n    border-bottom-right-radius: 0.75rem;\n  }\n  .client-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n  }\n}\n/*# sourceMappingURL=clients-list.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClientsListComponent, [{
    type: Component,
    args: [{ selector: "app-clients-list", standalone: true, imports: [
      CommonModule,
      RouterModule,
      FormsModule
    ], template: '<div class="container-fluid my-4">\n  <div class="card-gradient-wrapper">\n    <div class="card list-card shadow-sm">\n      <div class="card-body">\n        <h2 class="card-title text-center mb-4">Directorio de Clientes</h2>\n\n        <div class="row g-3 mb-4 align-items-center">\n          <div class="col-lg-9 col-md-6">\n            <input\n              type="text"\n              class="form-control"\n              placeholder="Buscar por nombre o email..."\n              [ngModel]="searchTermSubject | async"\n              (ngModelChange)="onSearchChange($event)"\n            />\n          </div>\n          <div class="col-lg-3 col-md-6">\n            <select\n              class="form-select"\n              [ngModel]="itemsPerPageSubject | async"\n              (ngModelChange)="onItemsPerPageChange($event)"\n            >\n              @for (option of itemsPerPageOptions; track option) {\n                <option [value]="option">\n                  {{ option }} por p\xE1gina\n                </option>\n              }\n            </select>\n          </div>\n        </div>\n\n        <div class="table-responsive">\n          <table class="table table-hover align-middle client-table">\n            <thead>\n              <tr>\n                <th scope="col">Nombre Completo</th>\n                <th scope="col">Email</th>\n                <th scope="col">Tel\xE9fono</th>\n                <th scope="col" class="text-center">N.\xBA Pedidos</th>\n                <th scope="col" class="text-center">Acciones</th>\n              </tr>\n            </thead>\n            <tbody>\n              @if (clients$ | async; as clients) {\n                @for (client of clients; track client.id) {\n                  <tr>\n                    <td data-label="Nombre">{{ client.fullName }}</td>\n                    <td data-label="Email">{{ client.email }}</td>\n                    <td data-label="Tel\xE9fono">{{ client.phone }}</td>\n                    <td data-label="N.\xBA Pedidos" class="text-center">{{ client.numberOfOrders }}</td>\n                    <td data-label="Acciones" class="text-center">\n                      <button\n                        class="btn btn-outline-primary btn-sm"\n                        (click)="viewClientHistory(client.email)"\n                        title="Ver Historial de Pedidos"\n                      >\n                        <i class="bi bi-eye"></i>\n                      </button>\n                    </td>\n                  </tr>\n                } @empty {\n                  <tr>\n                    <td colspan="5" class="text-center text-muted-custom py-5">\n                      @if (searchTermSubject | async) {\n                        <div>\n                          <i class="bi bi-search fs-2 d-block mb-2"></i>\n                          No se encontraron clientes que coincidan.\n                        </div>\n                      } @else {\n                        <div>\n                          <i class="bi bi-person-slash fs-2 d-block mb-2"></i>\n                          A\xFAn no hay clientes para mostrar.\n                        </div>\n                      }\n                    </td>\n                  </tr>\n                }\n              } @else {\n                <tr>\n                  <td colspan="5" class="text-center py-5">\n                    <div class="spinner-border text-primary" role="status">\n                      <span class="visually-hidden">Cargando clientes...</span>\n                    </div>\n                  </td>\n                </tr>\n              }\n            </tbody>\n          </table>\n        </div>\n\n        @if (totalClients > 0 && totalPages > 1) {\n          @if (currentPageSubject | async; as currentPage) {\n            <div class="d-flex justify-content-center mt-4">\n              <nav aria-label="Paginaci\xF3n de clientes">\n                <ul class="pagination">\n                  <li class="page-item" [class.disabled]="currentPage === 1">\n                    <a class="page-link" (click)="goToPage(1)" aria-label="Primera">&laquo;</a>\n                  </li>\n                  <li class="page-item" [class.disabled]="currentPage === 1">\n                    <a class="page-link" (click)="goToPage(currentPage - 1)" aria-label="Anterior">&lsaquo;</a>\n                  </li>\n                  @for (page of [].constructor(totalPages); track i; let i = $index) {\n                    <li class="page-item" [class.active]="currentPage === i + 1">\n                      <a class="page-link" (click)="goToPage(i + 1)">{{ i + 1 }}</a>\n                    </li>\n                  }\n                  <li class="page-item" [class.disabled]="currentPage === totalPages">\n                    <a class="page-link" (click)="goToPage(currentPage + 1)" aria-label="Siguiente">&rsaquo;</a>\n                  </li>\n                  <li class="page-item" [class.disabled]="currentPage === totalPages">\n                    <a class="page-link" (click)="goToPage(totalPages)" aria-label="\xDAltima">&raquo;</a>\n                  </li>\n                </ul>\n              </nav>\n            </div>\n          }\n        }\n      </div>\n    </div>\n  </div>\n</div>\n', styles: ['/* src/app/features/admin/components/client/clients-list/clients-list.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.list-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card .card-body {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card .card-body {\n    padding: 2rem;\n  }\n}\n.list-card .card-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.form-control,\n.form-select {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.5rem 1rem;\n}\n.form-control:hover,\n.form-select:hover {\n  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\n.client-table.table {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);\n}\n.client-table thead th {\n  font-weight: 600;\n}\n.client-table tbody tr {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n  cursor: pointer;\n}\n.client-table tbody tr::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.client-table tbody tr:hover {\n  transform: translateY(-2px);\n}\n.client-table tbody tr:hover td {\n  color: #000;\n  font-weight: 500;\n}\n.client-table tbody tr:hover::after {\n  opacity: 1;\n}\n.text-muted-custom {\n  color: #6c757d;\n}\n.pagination .page-item .page-link {\n  border-radius: 50% !important;\n  margin: 0 4px;\n  border: none;\n  font-weight: 600;\n  color: #6c757d;\n  transition: all 0.3s ease;\n  width: 38px;\n  height: 38px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n}\n.pagination .page-item .page-link:hover {\n  background-color: #e9ecef;\n  color: #7b68ee;\n  transform: translateY(-2px);\n}\n.pagination .page-item .page-link:focus {\n  box-shadow: none;\n}\n.pagination .page-item.active .page-link {\n  background-color: #7b68ee;\n  color: #fff;\n  box-shadow: 0 4px 12px rgba(123, 104, 238, 0.4);\n  transform: translateY(-3px);\n}\n.pagination .page-item.disabled .page-link {\n  background-color: transparent;\n  color: #ced4da;\n  cursor: default;\n}\n.pagination .page-item.disabled .page-link:hover {\n  transform: none;\n  background-color: transparent;\n}\n@media (max-width: 768px) {\n  .client-table thead {\n    display: none;\n  }\n  .client-table tbody,\n  .client-table tr,\n  .client-table td {\n    display: block;\n    width: 100%;\n  }\n  .client-table tr {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n  }\n  .client-table tr:hover {\n    transform: none;\n  }\n  .client-table tr:hover::after {\n    opacity: 1;\n  }\n  .client-table td {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: right !important;\n    padding: 0.75rem 1rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n    position: relative;\n    z-index: 1;\n  }\n  .client-table td:first-child {\n    border-top-left-radius: 0.75rem;\n    border-top-right-radius: 0.75rem;\n  }\n  .client-table td:last-child {\n    border-bottom: none;\n    border-bottom-left-radius: 0.75rem;\n    border-bottom-right-radius: 0.75rem;\n  }\n  .client-table td::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n  }\n}\n/*# sourceMappingURL=clients-list.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientsListComponent, { className: "ClientsListComponent", filePath: "src/app/features/admin/components/client/clients-list/clients-list.component.ts", lineNumber: 31 });
})();
export {
  ClientsListComponent
};
//# sourceMappingURL=chunk-F3IPLBFP.js.map
