import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-WR4QMUYF.js";
import {
  OrderService
} from "./chunk-H7SRYL5P.js";
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
  DatePipe,
  NgClass,
  TitleCasePipe,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  from,
  inject,
  map,
  of,
  setClassMetadata,
  startWith,
  switchMap,
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
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction5,
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

// src/app/features/admin/components/orders/orders-list/orders-list.component.ts
var _c0 = (a0, a1, a2, a3, a4) => ({ "bg-warning text-dark": a0, "bg-primary": a1, "bg-info text-dark": a2, "bg-success": a3, "bg-danger": a4 });
var _c1 = (a0) => ["/admin/orders/detail", a0];
var _c2 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
function OrdersListComponent_For_16_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Pendiente");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_For_16_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Procesando");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_For_16_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Enviado");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_For_16_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Entregado");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_For_16_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Cancelado");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_For_16_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, status_r1));
  }
}
function OrdersListComponent_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275conditionalCreate(1, OrdersListComponent_For_16_Case_1_Template, 2, 0, "span")(2, OrdersListComponent_For_16_Case_2_Template, 2, 0, "span")(3, OrdersListComponent_For_16_Case_3_Template, 2, 0, "span")(4, OrdersListComponent_For_16_Case_4_Template, 2, 0, "span")(5, OrdersListComponent_For_16_Case_5_Template, 2, 0, "span")(6, OrdersListComponent_For_16_Case_6_Template, 3, 3, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_11_0;
    const status_r1 = ctx.$implicit;
    \u0275\u0275property("value", status_r1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_11_0 = status_r1) === "pending" ? 1 : tmp_11_0 === "processing" ? 2 : tmp_11_0 === "shipped" ? 3 : tmp_11_0 === "delivered" ? 4 : tmp_11_0 === "cancelled" ? 5 : 6);
  }
}
function OrdersListComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
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
function OrdersListComponent_Conditional_39_For_1_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Pendiente");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_Conditional_39_For_1_Case_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Procesando");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_Conditional_39_For_1_Case_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Enviado");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_Conditional_39_For_1_Case_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Entregado");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_Conditional_39_For_1_Case_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Cancelado");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_Conditional_39_For_1_Case_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, order_r5.status));
  }
}
function OrdersListComponent_Conditional_39_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 18);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 19);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 20);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 21)(12, "span", 22);
    \u0275\u0275conditionalCreate(13, OrdersListComponent_Conditional_39_For_1_Case_13_Template, 2, 0, "span")(14, OrdersListComponent_Conditional_39_For_1_Case_14_Template, 2, 0, "span")(15, OrdersListComponent_Conditional_39_For_1_Case_15_Template, 2, 0, "span")(16, OrdersListComponent_Conditional_39_For_1_Case_16_Template, 2, 0, "span")(17, OrdersListComponent_Conditional_39_For_1_Case_17_Template, 2, 0, "span")(18, OrdersListComponent_Conditional_39_For_1_Case_18_Template, 3, 3, "span");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 23)(20, "button", 24);
    \u0275\u0275element(21, "i", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 26);
    \u0275\u0275listener("click", function OrdersListComponent_Conditional_39_For_1_Template_button_click_22_listener() {
      const order_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteOrder(order_r5));
    });
    \u0275\u0275element(23, "i", 27);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_17_0;
    const order_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r5.clientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 7, order_r5.orderDate, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(10, 10, order_r5.total, "ARS", "$"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(14, _c0, order_r5.status === "pending", order_r5.status === "processing", order_r5.status === "shipped", order_r5.status === "delivered", order_r5.status === "cancelled"));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = order_r5.status) === "pending" ? 13 : tmp_17_0 === "processing" ? 14 : tmp_17_0 === "shipped" ? 15 : tmp_17_0 === "delivered" ? 16 : tmp_17_0 === "cancelled" ? 17 : 18);
    \u0275\u0275advance(7);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(20, _c1, order_r5.id));
  }
}
function OrdersListComponent_Conditional_39_ForEmpty_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "i", 29);
    \u0275\u0275text(2, " No se encontraron pedidos que coincidan. ");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_Conditional_39_ForEmpty_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "i", 30);
    \u0275\u0275text(2, " A\xFAn no hay pedidos para mostrar. ");
    \u0275\u0275elementEnd();
  }
}
function OrdersListComponent_Conditional_39_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 28);
    \u0275\u0275conditionalCreate(2, OrdersListComponent_Conditional_39_ForEmpty_2_Conditional_2_Template, 3, 0, "div");
    \u0275\u0275pipe(3, "async");
    \u0275\u0275pipe(4, "async");
    \u0275\u0275conditionalBranchCreate(5, OrdersListComponent_Conditional_39_ForEmpty_2_Conditional_5_Template, 3, 0, "div");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(\u0275\u0275pipeBind1(3, 1, ctx_r2.searchTermSubject) || \u0275\u0275pipeBind1(4, 3, ctx_r2.filterStatusSubject) !== "all" ? 2 : 5);
  }
}
function OrdersListComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, OrdersListComponent_Conditional_39_For_1_Template, 24, 22, "tr", null, _forTrack0, false, OrdersListComponent_Conditional_39_ForEmpty_2_Template, 6, 5, "tr");
  }
  if (rf & 2) {
    \u0275\u0275repeater(ctx);
  }
}
function OrdersListComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 31)(2, "div", 32)(3, "span", 33);
    \u0275\u0275text(4, "Cargando pedidos...");
    \u0275\u0275elementEnd()()()();
  }
}
function OrdersListComponent_Conditional_42_Conditional_0_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 37)(1, "a", 43);
    \u0275\u0275listener("click", function OrdersListComponent_Conditional_42_Conditional_0_For_10_Template_a_click_1_listener() {
      const \u0275$index_198_r9 = \u0275\u0275restoreView(_r8).$index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.goToPage(\u0275$index_198_r9 + 1));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const \u0275$index_198_r9 = ctx.$index;
    const currentPage_r7 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", currentPage_r7 === \u0275$index_198_r9 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_198_r9 + 1);
  }
}
function OrdersListComponent_Conditional_42_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "nav", 35)(2, "ul", 36)(3, "li", 37)(4, "a", 38);
    \u0275\u0275listener("click", function OrdersListComponent_Conditional_42_Conditional_0_Template_a_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToPage(1));
    });
    \u0275\u0275text(5, "\xAB");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "li", 37)(7, "a", 39);
    \u0275\u0275listener("click", function OrdersListComponent_Conditional_42_Conditional_0_Template_a_click_7_listener() {
      const currentPage_r7 = \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToPage(currentPage_r7 - 1));
    });
    \u0275\u0275text(8, "\u2039");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(9, OrdersListComponent_Conditional_42_Conditional_0_For_10_Template, 3, 3, "li", 40, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementStart(11, "li", 37)(12, "a", 41);
    \u0275\u0275listener("click", function OrdersListComponent_Conditional_42_Conditional_0_Template_a_click_12_listener() {
      const currentPage_r7 = \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToPage(currentPage_r7 + 1));
    });
    \u0275\u0275text(13, "\u203A");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "li", 37)(15, "a", 42);
    \u0275\u0275listener("click", function OrdersListComponent_Conditional_42_Conditional_0_Template_a_click_15_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToPage(ctx_r2.totalPages));
    });
    \u0275\u0275text(16, "\xBB");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const currentPage_r7 = ctx;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", currentPage_r7 === 1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", currentPage_r7 === 1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(8, _c2).constructor(ctx_r2.totalPages));
    \u0275\u0275advance(2);
    \u0275\u0275classProp("disabled", currentPage_r7 === ctx_r2.totalPages);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("disabled", currentPage_r7 === ctx_r2.totalPages);
  }
}
function OrdersListComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, OrdersListComponent_Conditional_42_Conditional_0_Template, 17, 9, "div", 34);
    \u0275\u0275pipe(1, "async");
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(1, 1, ctx_r2.currentPageSubject)) ? 0 : -1, tmp_1_0);
  }
}
var OrdersListComponent = class _OrdersListComponent {
  _orderService = inject(OrderService);
  _router = inject(Router);
  currentPageSubject = new BehaviorSubject(1);
  itemsPerPageSubject = new BehaviorSubject(10);
  searchTermSubject = new BehaviorSubject("");
  filterStatusSubject = new BehaviorSubject("all");
  refreshTrigger = new BehaviorSubject(void 0);
  itemsPerPageOptions = [5, 10, 20, 50];
  statusOptions = ["all", "pending", "shipped", "delivered", "cancelled"];
  totalOrders = 0;
  totalPages = 0;
  orders$;
  ngOnInit() {
    this.orders$ = combineLatest([
      this.refreshTrigger.pipe(switchMap(() => this._orderService.getOrders().pipe(startWith([]), catchError((err) => {
        console.error("Error al cargar los pedidos:", err);
        return of([]);
      })))),
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.filterStatusSubject,
      this.currentPageSubject,
      this.itemsPerPageSubject
    ]).pipe(map(([orders, searchTerm, filterStatus, currentPage, itemsPerPage]) => {
      let filteredOrders = orders;
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        filteredOrders = orders.filter((order) => order.clientName.toLowerCase().includes(lowerSearch) || order.id.toLowerCase().includes(lowerSearch) || order.status.toLowerCase().includes(lowerSearch));
      }
      if (filterStatus !== "all") {
        filteredOrders = filteredOrders.filter((order) => order.status === filterStatus);
      }
      this.totalOrders = filteredOrders.length;
      this.totalPages = Math.ceil(this.totalOrders / itemsPerPage);
      let correctedPage = currentPage;
      if (currentPage > this.totalPages && this.totalPages > 0) {
        correctedPage = this.totalPages;
      } else if (this.totalPages === 0) {
        correctedPage = 1;
      }
      const startIndex = (correctedPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredOrders.slice(startIndex, endIndex);
    }));
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
  onSearchTermChange(newValue) {
    this.searchTermSubject.next(newValue);
    this.currentPageSubject.next(1);
  }
  onFilterStatusChange(newValue) {
    this.filterStatusSubject.next(newValue);
    this.currentPageSubject.next(1);
  }
  editOrder(order) {
    this._router.navigate(["/admin/orders/edit", order.id]);
  }
  deleteOrder(order) {
    if (confirm(`\xBFEst\xE1s seguro de que quieres eliminar el pedido ${order.id}?`)) {
      from(this._orderService.deleteOrder(order.id)).subscribe({
        next: () => {
          console.log("Pedido eliminado con \xE9xito:", order.id);
          this.refreshTrigger.next();
        },
        error: (error) => {
          console.error("Error al eliminar el pedido:", error);
        }
      });
    }
  }
  static \u0275fac = function OrdersListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrdersListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrdersListComponent, selectors: [["app-orders-list"]], decls: 43, vars: 13, consts: [[1, "container-fluid", "my-4"], [1, "card-gradient-wrapper"], [1, "card", "list-card", "shadow-sm"], [1, "card-body"], [1, "card-title", "text-center", "mb-4"], [1, "row", "g-3", "mb-4", "align-items-center"], [1, "col-lg-6", "col-md-12"], ["type", "text", "placeholder", "Buscar por ID, Cliente o Estado...", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "col-lg-3", "col-md-6"], [1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "all"], [3, "value"], [1, "table-responsive"], [1, "table", "table-hover", "align-middle", "order-table"], ["scope", "col"], ["scope", "col", 1, "text-end"], ["scope", "col", 1, "text-center"], ["data-label", "ID Pedido"], ["data-label", "Cliente"], ["data-label", "Fecha"], ["data-label", "Total", 1, "text-end"], ["data-label", "Estado", 1, "text-center"], [1, "badge", 3, "ngClass"], ["data-label", "Acciones", 1, "text-center"], ["title", "Ver Detalles", 1, "btn", "btn-outline-info", "btn-sm", "me-2", 3, "routerLink"], [1, "bi", "bi-eye"], ["title", "Eliminar", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "bi", "bi-trash"], ["colspan", "6", 1, "text-center", "text-muted-custom", "py-5"], [1, "bi", "bi-search", "fs-2", "d-block", "mb-2"], [1, "bi", "bi-cart-x", "fs-2", "d-block", "mb-2"], ["colspan", "6", 1, "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "d-flex", "justify-content-center", "mt-4"], ["aria-label", "Paginaci\xF3n de pedidos"], [1, "pagination"], [1, "page-item"], ["aria-label", "Primera", 1, "page-link", 3, "click"], ["aria-label", "Anterior", 1, "page-link", 3, "click"], [1, "page-item", 3, "active"], ["aria-label", "Siguiente", 1, "page-link", 3, "click"], ["aria-label", "\xDAltima", 1, "page-link", 3, "click"], [1, "page-link", 3, "click"]], template: function OrdersListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4);
      \u0275\u0275text(5, "Lista de Pedidos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "input", 7);
      \u0275\u0275pipe(9, "async");
      \u0275\u0275listener("ngModelChange", function OrdersListComponent_Template_input_ngModelChange_8_listener($event) {
        return ctx.onSearchTermChange($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 8)(11, "select", 9);
      \u0275\u0275pipe(12, "async");
      \u0275\u0275listener("ngModelChange", function OrdersListComponent_Template_select_ngModelChange_11_listener($event) {
        return ctx.onFilterStatusChange($event);
      });
      \u0275\u0275elementStart(13, "option", 10);
      \u0275\u0275text(14, "Todos los Estados");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(15, OrdersListComponent_For_16_Template, 7, 2, "option", 11, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 8)(18, "select", 9);
      \u0275\u0275pipe(19, "async");
      \u0275\u0275listener("ngModelChange", function OrdersListComponent_Template_select_ngModelChange_18_listener($event) {
        return ctx.onItemsPerPageChange($event);
      });
      \u0275\u0275repeaterCreate(20, OrdersListComponent_For_21_Template, 2, 2, "option", 11, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 12)(23, "table", 13)(24, "thead")(25, "tr")(26, "th", 14);
      \u0275\u0275text(27, "ID Pedido");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "th", 14);
      \u0275\u0275text(29, "Cliente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "th", 14);
      \u0275\u0275text(31, "Fecha");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "th", 15);
      \u0275\u0275text(33, "Total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "th", 16);
      \u0275\u0275text(35, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "th", 16);
      \u0275\u0275text(37, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "tbody");
      \u0275\u0275conditionalCreate(39, OrdersListComponent_Conditional_39_Template, 3, 1);
      \u0275\u0275pipe(40, "async");
      \u0275\u0275conditionalBranchCreate(41, OrdersListComponent_Conditional_41_Template, 5, 0, "tr");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(42, OrdersListComponent_Conditional_42_Template, 2, 3);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_5_0;
      \u0275\u0275advance(8);
      \u0275\u0275property("ngModel", \u0275\u0275pipeBind1(9, 5, ctx.searchTermSubject));
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", \u0275\u0275pipeBind1(12, 7, ctx.filterStatusSubject));
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.statusOptions.slice(1));
      \u0275\u0275advance(3);
      \u0275\u0275property("ngModel", \u0275\u0275pipeBind1(19, 9, ctx.itemsPerPageSubject));
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.itemsPerPageOptions);
      \u0275\u0275advance(19);
      \u0275\u0275conditional((tmp_5_0 = \u0275\u0275pipeBind1(40, 11, ctx.orders$)) ? 39 : 41, tmp_5_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.totalOrders > 0 && ctx.totalPages > 1 ? 42 : -1);
    }
  }, dependencies: [CommonModule, NgClass, RouterModule, RouterLink, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, AsyncPipe, TitleCasePipe, CurrencyPipe, DatePipe], styles: ['\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.list-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.list-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.5rem 1rem;\n}\n.form-control[_ngcontent-%COMP%]:hover, \n.form-select[_ngcontent-%COMP%]:hover {\n  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\n.order-table.table[_ngcontent-%COMP%] {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);\n}\n.order-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.order-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n  cursor: default;\n}\n.order-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.order-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.order-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  color: #000;\n  font-weight: 500;\n}\n.order-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {\n  opacity: 1;\n}\n.text-muted-custom[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  border-radius: 50% !important;\n  margin: 0 4px;\n  border: none;\n  font-weight: 600;\n  color: #6c757d;\n  transition: all 0.3s ease;\n  width: 38px;\n  height: 38px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n}\n.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:hover {\n  background-color: #e9ecef;\n  color: #7b68ee;\n  transform: translateY(-2px);\n}\n.pagination[_ngcontent-%COMP%]   .page-item[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:focus {\n  box-shadow: none;\n}\n.pagination[_ngcontent-%COMP%]   .page-item.active[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: #7b68ee;\n  color: #fff;\n  box-shadow: 0 4px 12px rgba(123, 104, 238, 0.4);\n  transform: translateY(-3px);\n}\n.pagination[_ngcontent-%COMP%]   .page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%] {\n  background-color: transparent;\n  color: #ced4da;\n  cursor: default;\n}\n.pagination[_ngcontent-%COMP%]   .page-item.disabled[_ngcontent-%COMP%]   .page-link[_ngcontent-%COMP%]:hover {\n  transform: none;\n  background-color: transparent;\n}\n@media (max-width: 768px) {\n  .order-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .order-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%], \n   .order-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], \n   .order-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n  }\n  .order-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n    position: relative;\n  }\n  .order-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n    transform: none;\n  }\n  .order-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {\n    opacity: 1;\n  }\n  .order-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0.75rem 1rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n    position: relative;\n    z-index: 1;\n  }\n  .order-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    border-top-left-radius: 0.75rem;\n    border-top-right-radius: 0.75rem;\n  }\n  .order-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n    border-bottom-left-radius: 0.75rem;\n    border-bottom-right-radius: 0.75rem;\n  }\n  .order-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n  }\n  .order-table[_ngcontent-%COMP%]   td[data-label=Acciones][_ngcontent-%COMP%] {\n    justify-content: flex-end;\n    gap: 0.5rem;\n  }\n  .order-table[_ngcontent-%COMP%]   td[data-label=Acciones][_ngcontent-%COMP%]::before {\n    margin-right: auto;\n  }\n}\n/*# sourceMappingURL=orders-list.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrdersListComponent, [{
    type: Component,
    args: [{ selector: "app-orders-list", standalone: true, imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      CurrencyPipe,
      DatePipe,
      TitleCasePipe
    ], template: `<div class="container-fluid my-4">
  <div class="card-gradient-wrapper">
    <div class="card list-card shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Lista de Pedidos</h2>

        <div class="row g-3 mb-4 align-items-center">
          <div class="col-lg-6 col-md-12">
            <input
              type="text"
              class="form-control"
              placeholder="Buscar por ID, Cliente o Estado..."
              [ngModel]="searchTermSubject | async"
              (ngModelChange)="onSearchTermChange($event)"
            />
          </div>
          <div class="col-lg-3 col-md-6">
            <select
              class="form-select"
              [ngModel]="filterStatusSubject | async"
              (ngModelChange)="onFilterStatusChange($event)"
            >
              <option value="all">Todos los Estados</option>
              @for (status of statusOptions.slice(1); track status) {
                <option [value]="status">
                  @switch (status) {
                    @case ('pending') { <span>Pendiente</span> }
                    @case ('processing') { <span>Procesando</span> }
                    @case ('shipped') { <span>Enviado</span> }
                    @case ('delivered') { <span>Entregado</span> }
                    @case ('cancelled') { <span>Cancelado</span> }
                    @default { <span>{{ status | titlecase }}</span> }
                  }
                </option>
              }
            </select>
          </div>
          <div class="col-lg-3 col-md-6">
            <select
              class="form-select"
              [ngModel]="itemsPerPageSubject | async"
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
          <table class="table table-hover align-middle order-table">
            <thead>
              <tr>
                <th scope="col">ID Pedido</th>
                <th scope="col">Cliente</th>
                <th scope="col">Fecha</th>
                <th scope="col" class="text-end">Total</th>
                <th scope="col" class="text-center">Estado</th>
                <th scope="col" class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              @if (orders$ | async; as orders) {
                @for (order of orders; track order.id) {
                  <tr>
                    <td data-label="ID Pedido">{{ order.id }}</td>
                    <td data-label="Cliente">{{ order.clientName }}</td>
                    <td data-label="Fecha">{{ order.orderDate | date:'short' }}</td>
                    <td data-label="Total" class="text-end">{{ order.total | currency:'ARS':'$' }}</td>
                    <td data-label="Estado" class="text-center">
                      <span class="badge" [ngClass]="{
                        'bg-warning text-dark': order.status === 'pending',
                        'bg-primary': order.status === 'processing',
                        'bg-info text-dark': order.status === 'shipped',
                        'bg-success': order.status === 'delivered',
                        'bg-danger': order.status === 'cancelled'
                      }">
                        @switch (order.status) {
                          @case ('pending') { <span>Pendiente</span> }
                          @case ('processing') { <span>Procesando</span> }
                          @case ('shipped') { <span>Enviado</span> }
                          @case ('delivered') { <span>Entregado</span> }
                          @case ('cancelled') { <span>Cancelado</span> }
                          @default { <span>{{ order.status | titlecase }}</span> }
                        }
                      </span>
                    </td>
                    <td data-label="Acciones" class="text-center">
                      <button class="btn btn-outline-info btn-sm me-2" [routerLink]="['/admin/orders/detail', order.id]" title="Ver Detalles">
                        <i class="bi bi-eye"></i>
                      </button>
                      <button class="btn btn-outline-danger btn-sm" (click)="deleteOrder(order)" title="Eliminar">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="text-center text-muted-custom py-5">
                      @if ((searchTermSubject | async) || (filterStatusSubject | async) !== 'all') {
                        <div>
                          <i class="bi bi-search fs-2 d-block mb-2"></i>
                          No se encontraron pedidos que coincidan.
                        </div>
                      } @else {
                        <div>
                          <i class="bi bi-cart-x fs-2 d-block mb-2"></i>
                          A\xFAn no hay pedidos para mostrar.
                        </div>
                      }
                    </td>
                  </tr>
                }
              } @else {
                <tr>
                  <td colspan="6" class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Cargando pedidos...</span>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        @if (totalOrders > 0 && totalPages > 1) {
          @if (currentPageSubject | async; as currentPage) {
            <div class="d-flex justify-content-center mt-4">
              <nav aria-label="Paginaci\xF3n de pedidos">
                <ul class="pagination">
                  <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link" (click)="goToPage(1)" aria-label="Primera">&laquo;</a>
                  </li>
                  <li class="page-item" [class.disabled]="currentPage === 1">
                    <a class="page-link" (click)="goToPage(currentPage - 1)" aria-label="Anterior">&lsaquo;</a>
                  </li>
                  @for (page of [].constructor(totalPages); track i; let i = $index) {
                    <li class="page-item" [class.active]="currentPage === i + 1">
                      <a class="page-link" (click)="goToPage(i + 1)">{{ i + 1 }}</a>
                    </li>
                  }
                  <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link" (click)="goToPage(currentPage + 1)" aria-label="Siguiente">&rsaquo;</a>
                  </li>
                  <li class="page-item" [class.disabled]="currentPage === totalPages">
                    <a class="page-link" (click)="goToPage(totalPages)" aria-label="\xDAltima">&raquo;</a>
                  </li>
                </ul>
              </nav>
            </div>
          }
        }
      </div>
    </div>
  </div>
</div>
`, styles: ['/* src/app/features/admin/components/orders/orders-list/orders-list.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.list-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card .card-body {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card .card-body {\n    padding: 2rem;\n  }\n}\n.list-card .card-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.form-control,\n.form-select {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.5rem 1rem;\n}\n.form-control:hover,\n.form-select:hover {\n  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);\n}\n.form-control:focus,\n.form-select:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\n.order-table.table {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);\n}\n.order-table thead th {\n  font-weight: 600;\n}\n.order-table tbody tr {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n  cursor: default;\n}\n.order-table tbody tr::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.order-table tbody tr:hover {\n  transform: translateY(-2px);\n}\n.order-table tbody tr:hover td {\n  color: #000;\n  font-weight: 500;\n}\n.order-table tbody tr:hover::after {\n  opacity: 1;\n}\n.text-muted-custom {\n  color: #6c757d;\n}\n.pagination .page-item .page-link {\n  border-radius: 50% !important;\n  margin: 0 4px;\n  border: none;\n  font-weight: 600;\n  color: #6c757d;\n  transition: all 0.3s ease;\n  width: 38px;\n  height: 38px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n}\n.pagination .page-item .page-link:hover {\n  background-color: #e9ecef;\n  color: #7b68ee;\n  transform: translateY(-2px);\n}\n.pagination .page-item .page-link:focus {\n  box-shadow: none;\n}\n.pagination .page-item.active .page-link {\n  background-color: #7b68ee;\n  color: #fff;\n  box-shadow: 0 4px 12px rgba(123, 104, 238, 0.4);\n  transform: translateY(-3px);\n}\n.pagination .page-item.disabled .page-link {\n  background-color: transparent;\n  color: #ced4da;\n  cursor: default;\n}\n.pagination .page-item.disabled .page-link:hover {\n  transform: none;\n  background-color: transparent;\n}\n@media (max-width: 768px) {\n  .order-table thead {\n    display: none;\n  }\n  .order-table tbody,\n  .order-table tr,\n  .order-table td {\n    display: block;\n    width: 100%;\n  }\n  .order-table tr {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n    position: relative;\n  }\n  .order-table tr:hover {\n    transform: none;\n  }\n  .order-table tr:hover::after {\n    opacity: 1;\n  }\n  .order-table td {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0.75rem 1rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n    position: relative;\n    z-index: 1;\n  }\n  .order-table td:first-child {\n    border-top-left-radius: 0.75rem;\n    border-top-right-radius: 0.75rem;\n  }\n  .order-table td:last-child {\n    border-bottom: none;\n    border-bottom-left-radius: 0.75rem;\n    border-bottom-right-radius: 0.75rem;\n  }\n  .order-table td::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n  }\n  .order-table td[data-label=Acciones] {\n    justify-content: flex-end;\n    gap: 0.5rem;\n  }\n  .order-table td[data-label=Acciones]::before {\n    margin-right: auto;\n  }\n}\n/*# sourceMappingURL=orders-list.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrdersListComponent, { className: "OrdersListComponent", filePath: "src/app/features/admin/components/orders/orders-list/orders-list.component.ts", lineNumber: 24 });
})();
export {
  OrdersListComponent
};
//# sourceMappingURL=chunk-LDH2UWK3.js.map
