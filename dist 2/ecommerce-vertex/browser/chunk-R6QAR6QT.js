import {
  ClientService
} from "./chunk-BUEGSFX4.js";
import {
  ProductService
} from "./chunk-2ZGQTQTR.js";
import {
  OrderService
} from "./chunk-H7SRYL5P.js";
import "./chunk-UYVF6V6H.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import "./chunk-HMD6QQFJ.js";
import "./chunk-SDXAAYIW.js";
import {
  AsyncPipe,
  CommonModule,
  Component,
  CurrencyPipe,
  DatePipe,
  NgClass,
  TitleCasePipe,
  catchError,
  combineLatest,
  inject,
  map,
  of,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction5,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/dashboard/dashboard.component.ts
var _c0 = (a0, a1) => ({ monthly: a0, global: a1 });
var _c1 = (a0, a1, a2, a3, a4) => ({ "bg-warning text-dark": a0, "bg-primary": a1, "bg-info text-dark": a2, "bg-success": a3, "bg-danger": a4 });
var _c2 = (a0) => ["/admin/orders/detail", a0];
var _c3 = (a0) => ["/admin/products/edit", a0];
var _c4 = (a0) => ["/admin/clients", a0, "details"];
var _c5 = (a0) => ["/admin/products/detail", a0];
var _forTrack0 = ($index, $item) => $item.id;
function DashboardComponent_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 22)(2, "div", 9)(3, "div", 23);
    \u0275\u0275text(4, "Ventas del Mes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 24)(6, "h3", 25);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 26);
    \u0275\u0275text(10, "Hasta la fecha actual");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(11, "div", 22)(12, "div", 9)(13, "div", 27);
    \u0275\u0275text(14, "Pedidos del Mes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 24)(16, "h3", 25);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p", 26);
    \u0275\u0275text(19, "Nuevas \xF3rdenes este mes");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(20, "div", 22)(21, "div", 9)(22, "div", 28);
    \u0275\u0275text(23, "Clientes Nuevos del Mes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 24)(25, "h3", 25);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "p", 26);
    \u0275\u0275text(28, "Primeras compras en el mes");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "div", 22)(30, "div", 9)(31, "div", 29);
    \u0275\u0275text(32, "Ventas Totales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 24)(34, "h3", 25);
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p", 26);
    \u0275\u0275text(38, "Ingresos acumulados");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(39, "div", 22)(40, "div", 9)(41, "div", 30);
    \u0275\u0275text(42, "Pedidos Totales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 24)(44, "h3", 25);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "p", 26);
    \u0275\u0275text(47, "\xD3rdenes procesadas en total");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(48, "div", 22)(49, "div", 9)(50, "div", 31);
    \u0275\u0275text(51, "Clientes Totales");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div", 24)(53, "h3", 25);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "p", 26);
    \u0275\u0275text(56, "Base de clientes \xFAnica");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const metrics_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(8, 6, metrics_r1.monthly.sales, "ARS", "$", "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(metrics_r1.monthly.orders);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(metrics_r1.monthly.newClients);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(36, 11, metrics_r1.global.totalSales, "ARS", "$", "1.0-0"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(metrics_r1.global.totalOrders);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(metrics_r1.global.totalClients);
  }
}
function DashboardComponent_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "div", 32)(2, "span", 33);
    \u0275\u0275text(3, "Cargando m\xE9tricas...");
    \u0275\u0275elementEnd()()();
  }
}
function DashboardComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DashboardComponent_Conditional_10_Conditional_0_Template, 57, 16, "div", 7)(1, DashboardComponent_Conditional_10_Conditional_1_Template, 4, 0, "div", 21);
  }
  if (rf & 2) {
    const metrics_r1 = ctx;
    \u0275\u0275conditional(metrics_r1.monthly && metrics_r1.global ? 0 : 1);
  }
}
function DashboardComponent_Conditional_23_For_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Pendiente");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_23_For_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Procesando");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_23_For_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Enviado");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_23_For_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Entregado");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_23_For_2_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Cancelado");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_23_For_2_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, order_r2.status));
  }
}
function DashboardComponent_Conditional_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 34)(1, "div", 35)(2, "span", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 37);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 38);
    \u0275\u0275conditionalCreate(8, DashboardComponent_Conditional_23_For_2_Case_8_Template, 2, 0, "span")(9, DashboardComponent_Conditional_23_For_2_Case_9_Template, 2, 0, "span")(10, DashboardComponent_Conditional_23_For_2_Case_10_Template, 2, 0, "span")(11, DashboardComponent_Conditional_23_For_2_Case_11_Template, 2, 0, "span")(12, DashboardComponent_Conditional_23_For_2_Case_12_Template, 2, 0, "span")(13, DashboardComponent_Conditional_23_For_2_Case_13_Template, 3, 3, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "a", 39);
    \u0275\u0275element(15, "i", 40);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const order_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(order_r2.clientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("#", order_r2.id, " - ", \u0275\u0275pipeBind2(6, 6, order_r2.orderDate, "short"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(9, _c1, order_r2.status === "pending", order_r2.status === "processing", order_r2.status === "shipped", order_r2.status === "delivered", order_r2.status === "cancelled"));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_15_0 = order_r2.status) === "pending" ? 8 : tmp_15_0 === "processing" ? 9 : tmp_15_0 === "shipped" ? 10 : tmp_15_0 === "delivered" ? 11 : tmp_15_0 === "cancelled" ? 12 : 13);
    \u0275\u0275advance(6);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(15, _c2, order_r2.id));
  }
}
function DashboardComponent_Conditional_23_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275element(1, "i", 41);
    \u0275\u0275text(2, "\xA1No hay pedidos pendientes!");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 13);
    \u0275\u0275repeaterCreate(1, DashboardComponent_Conditional_23_For_2_Template, 16, 17, "li", 34, _forTrack0, false, DashboardComponent_Conditional_23_ForEmpty_3_Template, 3, 0, "p", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx);
  }
}
function DashboardComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "div", 42);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_32_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 34)(1, "div", 35)(2, "span", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "a", 44);
    \u0275\u0275element(7, "i", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const product_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", product_r3.totalStock, " unidades");
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c3, product_r3.id));
  }
}
function DashboardComponent_Conditional_32_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275element(1, "i", 41);
    \u0275\u0275text(2, "\xA1Todos los productos tienen buen stock!");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 13);
    \u0275\u0275repeaterCreate(1, DashboardComponent_Conditional_32_For_2_Template, 8, 5, "li", 34, _forTrack0, false, DashboardComponent_Conditional_32_ForEmpty_3_Template, 3, 0, "p", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx);
  }
}
function DashboardComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "div", 42);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_44_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 34)(1, "div", 35)(2, "span", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 37);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "a", 46);
    \u0275\u0275element(9, "i", 40);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(order_r4.clientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind3(6, 4, order_r4.total, "ARS", "$"), " - ", \u0275\u0275pipeBind2(7, 8, order_r4.orderDate, "short"));
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(11, _c2, order_r4.id));
  }
}
function DashboardComponent_Conditional_44_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "No hay pedidos recientes.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 13);
    \u0275\u0275repeaterCreate(1, DashboardComponent_Conditional_44_For_2_Template, 10, 13, "li", 34, _forTrack0, false, DashboardComponent_Conditional_44_ForEmpty_3_Template, 2, 0, "p", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx);
  }
}
function DashboardComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "div", 42);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_52_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 34)(1, "div", 35)(2, "span", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 47);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "a", 48);
    \u0275\u0275element(7, "i", 49);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const client_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(client_r5.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(client_r5.email);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(3, _c4, client_r5.email));
  }
}
function DashboardComponent_Conditional_52_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "No hay clientes recientes.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 13);
    \u0275\u0275repeaterCreate(1, DashboardComponent_Conditional_52_For_2_Template, 8, 5, "li", 34, _forTrack0, false, DashboardComponent_Conditional_52_ForEmpty_3_Template, 2, 0, "p", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx);
  }
}
function DashboardComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "div", 42);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_60_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 34)(1, "div", 35)(2, "span", 36);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small", 37);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "a", 50);
    \u0275\u0275element(9, "i", 51);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const product_r6 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind3(6, 4, product_r6.price, "ARS", "$"), " - ", \u0275\u0275pipeBind2(7, 8, product_r6.createdAt, "shortDate"));
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(11, _c5, product_r6.id));
  }
}
function DashboardComponent_Conditional_60_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "No hay productos recientes.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 13);
    \u0275\u0275repeaterCreate(1, DashboardComponent_Conditional_60_For_2_Template, 10, 13, "li", 34, _forTrack0, false, DashboardComponent_Conditional_60_ForEmpty_3_Template, 2, 0, "p", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx);
  }
}
function DashboardComponent_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "div", 42);
    \u0275\u0275elementEnd();
  }
}
var DashboardComponent = class _DashboardComponent {
  productService = inject(ProductService);
  orderService = inject(OrderService);
  clientService = inject(ClientService);
  monthlyMetrics$;
  globalMetrics$;
  pendingOrders$;
  lowStockProducts$;
  latestOrders$;
  latestClients$;
  latestProducts$;
  ngOnInit() {
    this.monthlyMetrics$ = combineLatest([
      this.orderService.getMonthlySalesAndOrders(),
      this.clientService.getNewClientsThisMonth()
    ]).pipe(map(([orderStats, newClientsCount]) => ({
      sales: orderStats.monthlySales,
      orders: orderStats.monthlyOrders,
      newClients: newClientsCount
    })), catchError((err) => {
      console.error("Error al cargar m\xE9tricas mensuales:", err);
      return of({ sales: 0, orders: 0, newClients: 0 });
    }));
    this.globalMetrics$ = combineLatest([
      this.orderService.getGlobalSalesAndOrders(),
      this.clientService.getTotalClients()
    ]).pipe(map(([orderStats, totalClientsCount]) => ({
      totalSales: orderStats.totalSales,
      totalOrders: orderStats.totalOrders,
      totalClients: totalClientsCount
    })), catchError((err) => {
      console.error("Error al cargar m\xE9tricas globales:", err);
      return of({ totalSales: 0, totalOrders: 0, totalClients: 0 });
    }));
    this.pendingOrders$ = this.orderService.getPendingOrProcessingOrders().pipe(catchError((err) => {
      console.error("Error al cargar pedidos pendientes:", err);
      return of([]);
    }));
    this.lowStockProducts$ = this.productService.getProductsLowInStock(5).pipe(catchError((err) => {
      console.error("Error al cargar productos con bajo stock:", err);
      return of([]);
    }));
    this.latestOrders$ = this.orderService.getLatestOrders(10).pipe(catchError((err) => {
      console.error("Error al cargar \xFAltimos pedidos:", err);
      return of([]);
    }));
    this.latestClients$ = this.clientService.getLatestClients(10).pipe(catchError((err) => {
      console.error("Error al cargar \xFAltimos clientes:", err);
      return of([]);
    }));
    this.latestProducts$ = this.productService.getLatestProducts(10).pipe(catchError((err) => {
      console.error("Error al cargar \xFAltimos productos:", err);
      return of([]);
    }));
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 63, vars: 23, consts: [[1, "dashboard-wrapper"], ["id", "page-content-wrapper"], [1, "container-fluid", "my-4"], [1, "dashboard-header"], [1, "dashboard-title"], [1, "mb-5"], [1, "section-title"], [1, "row", "g-4"], [1, "col-12", "col-lg-6"], [1, "card", "h-100", "shadow-sm"], [1, "card-header", "fw-bold", "header-pending-orders"], [1, "bi", "bi-box-seam", "me-2"], [1, "card-body"], [1, "list-group", "list-group-flush"], [1, "text-center", "py-3"], [1, "card-header", "fw-bold", "header-low-stock"], [1, "bi", "bi-exclamation-triangle-fill", "me-2"], [1, "col-12", "col-lg-6", "col-xl-4"], [1, "card-header", "fw-bold", "header-latest-orders"], [1, "card-header", "fw-bold", "header-latest-clients"], [1, "card-header", "fw-bold", "header-latest-products"], [1, "text-center", "p-5"], [1, "col-12", "col-md-6", "col-lg-4"], [1, "card-header", "fw-bold", "header-sales"], [1, "card-body", "text-center", "d-flex", "flex-column", "justify-content-center"], [1, "display-5", "fw-bold"], [1, "card-text"], [1, "card-header", "fw-bold", "header-orders"], [1, "card-header", "fw-bold", "header-new-clients"], [1, "card-header", "fw-bold", "header-total-sales"], [1, "card-header", "fw-bold", "header-total-orders"], [1, "card-header", "fw-bold", "header-total-clients"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "list-group-item"], [1, "item-content", "text-truncate"], [1, "fw-bold"], [1, "d-block", "text-muted"], [1, "badge", "rounded-pill", "flex-shrink-0", "mx-2", 3, "ngClass"], ["title", "Ver Pedido", 1, "btn", "btn-sm", "btn-outline-primary", "ms-auto", "flex-shrink-0", 3, "routerLink"], [1, "bi", "bi-arrow-right-circle"], [1, "bi", "bi-check-circle", "me-1"], [1, "spinner-border", "spinner-border-sm"], [1, "badge", "bg-danger", "rounded-pill", "flex-shrink-0", "mx-2"], ["title", "Editar Producto", 1, "btn", "btn-sm", "btn-outline-danger", "ms-auto", "flex-shrink-0", 3, "routerLink"], [1, "bi", "bi-pencil"], ["title", "Ver Pedido", 1, "btn", "btn-sm", "btn-outline-info", "ms-auto", "flex-shrink-0", 3, "routerLink"], [1, "d-block", "text-truncate"], ["title", "Ver Cliente", 1, "btn", "btn-sm", "btn-outline-primary", "ms-auto", "flex-shrink-0", 3, "routerLink"], [1, "bi", "bi-person-fill"], ["title", "Ver Producto", 1, "btn", "btn-sm", "btn-outline-success", "ms-auto", "flex-shrink-0", 3, "routerLink"], [1, "bi", "bi-eye"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1", 4);
      \u0275\u0275text(5, "Dashboard del Administrador");
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "hr");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "section", 5)(8, "h2", 6);
      \u0275\u0275text(9, "Resumen R\xE1pido");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(10, DashboardComponent_Conditional_10_Template, 2, 1);
      \u0275\u0275pipe(11, "async");
      \u0275\u0275pipe(12, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "section", 5)(14, "h2", 6);
      \u0275\u0275text(15, "Tareas Pendientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 7)(17, "div", 8)(18, "div", 9)(19, "div", 10);
      \u0275\u0275element(20, "i", 11);
      \u0275\u0275text(21, "Pedidos por Enviar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 12);
      \u0275\u0275conditionalCreate(23, DashboardComponent_Conditional_23_Template, 4, 1, "ul", 13);
      \u0275\u0275pipe(24, "async");
      \u0275\u0275conditionalBranchCreate(25, DashboardComponent_Conditional_25_Template, 2, 0, "div", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 8)(27, "div", 9)(28, "div", 15);
      \u0275\u0275element(29, "i", 16);
      \u0275\u0275text(30, "Productos con Poco Stock");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 12);
      \u0275\u0275conditionalCreate(32, DashboardComponent_Conditional_32_Template, 4, 1, "ul", 13);
      \u0275\u0275pipe(33, "async");
      \u0275\u0275conditionalBranchCreate(34, DashboardComponent_Conditional_34_Template, 2, 0, "div", 14);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(35, "section")(36, "h2", 6);
      \u0275\u0275text(37, "Actividad Reciente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "div", 7)(39, "div", 17)(40, "div", 9)(41, "div", 18);
      \u0275\u0275text(42, "\xDAltimos 10 Pedidos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 12);
      \u0275\u0275conditionalCreate(44, DashboardComponent_Conditional_44_Template, 4, 1, "ul", 13);
      \u0275\u0275pipe(45, "async");
      \u0275\u0275conditionalBranchCreate(46, DashboardComponent_Conditional_46_Template, 2, 0, "div", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(47, "div", 17)(48, "div", 9)(49, "div", 19);
      \u0275\u0275text(50, "\xDAltimos 10 Clientes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "div", 12);
      \u0275\u0275conditionalCreate(52, DashboardComponent_Conditional_52_Template, 4, 1, "ul", 13);
      \u0275\u0275pipe(53, "async");
      \u0275\u0275conditionalBranchCreate(54, DashboardComponent_Conditional_54_Template, 2, 0, "div", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(55, "div", 17)(56, "div", 9)(57, "div", 20);
      \u0275\u0275text(58, "\xDAltimos 10 Productos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "div", 12);
      \u0275\u0275conditionalCreate(60, DashboardComponent_Conditional_60_Template, 4, 1, "ul", 13);
      \u0275\u0275pipe(61, "async");
      \u0275\u0275conditionalBranchCreate(62, DashboardComponent_Conditional_62_Template, 2, 0, "div", 14);
      \u0275\u0275elementEnd()()()()()()()();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      \u0275\u0275advance(10);
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pureFunction2(20, _c0, \u0275\u0275pipeBind1(11, 6, ctx.monthlyMetrics$), \u0275\u0275pipeBind1(12, 8, ctx.globalMetrics$))) ? 10 : -1, tmp_0_0);
      \u0275\u0275advance(13);
      \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(24, 10, ctx.pendingOrders$)) ? 23 : 25, tmp_1_0);
      \u0275\u0275advance(9);
      \u0275\u0275conditional((tmp_2_0 = \u0275\u0275pipeBind1(33, 12, ctx.lowStockProducts$)) ? 32 : 34, tmp_2_0);
      \u0275\u0275advance(12);
      \u0275\u0275conditional((tmp_3_0 = \u0275\u0275pipeBind1(45, 14, ctx.latestOrders$)) ? 44 : 46, tmp_3_0);
      \u0275\u0275advance(8);
      \u0275\u0275conditional((tmp_4_0 = \u0275\u0275pipeBind1(53, 16, ctx.latestClients$)) ? 52 : 54, tmp_4_0);
      \u0275\u0275advance(8);
      \u0275\u0275conditional((tmp_5_0 = \u0275\u0275pipeBind1(61, 18, ctx.latestProducts$)) ? 60 : 62, tmp_5_0);
    }
  }, dependencies: [CommonModule, NgClass, RouterModule, RouterLink, AsyncPipe, TitleCasePipe, CurrencyPipe, DatePipe], styles: ['\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n#page-content-wrapper[_ngcontent-%COMP%] {\n  transition: all 0.3s ease-in-out;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .container-fluid[_ngcontent-%COMP%] {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .dashboard-title[_ngcontent-%COMP%] {\n  padding-top: 0;\n  margin-bottom: 0.5rem;\n  font-size: 1.75rem;\n  font-weight: 700;\n  text-align: center;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%] {\n  border-color: rgba(248, 249, 250, 0.1);\n  margin: 0;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 600;\n  color: #7b68ee;\n  margin-bottom: 1.5rem;\n  letter-spacing: 0.03em;\n  text-align: center;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  background:\n    linear-gradient(\n      160deg,\n      #2a2a47,\n      #1a1a2e);\n  border: 1px solid rgba(123, 104, 238, 0.2);\n  border-radius: 0.75rem;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n  color: #f8f9fa;\n  transition: none;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: -2px;\n  border-radius: inherit;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   .card-body[_ngcontent-%COMP%]   .display-5[_ngcontent-%COMP%] {\n  color: #f8f9fa;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   .list-group-item[_ngcontent-%COMP%]   a.btn[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, 0.8);\n  background-color: rgba(255, 255, 255, 0.1);\n  color: white;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   .list-group-item[_ngcontent-%COMP%]   .bi-person-fill[_ngcontent-%COMP%] {\n  color: #f8f9fa;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   .list-group-item[_ngcontent-%COMP%]   a.btn-outline-success[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #28a745,\n      #1e7e34);\n  border-color: transparent;\n  color: #f8f9fa;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   .list-group-item[_ngcontent-%COMP%]   a.btn-outline-info[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #17a2b8,\n      #117a8b);\n  border-color: transparent;\n  color: #f8f9fa;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   .list-group-item[_ngcontent-%COMP%]   a.btn-outline-danger[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #dc3545,\n      #b02a37);\n  border-color: transparent;\n  color: #f8f9fa;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   .header-pending-orders[_ngcontent-%COMP%]    + .card-body[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   a.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #ffc107,\n      #d39e00);\n  border-color: transparent;\n  color: #f8f9fa;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   .header-latest-clients[_ngcontent-%COMP%]    + .card-body[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   a.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #007bff,\n      #0056b3);\n  border-color: transparent;\n  color: #f8f9fa;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid rgba(248, 249, 250, 0.1);\n  font-weight: 600;\n  font-size: 1rem;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-sales[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6c757d,\n      #495057);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-orders[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #007bff,\n      #0056b3);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-new-clients[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #28a745,\n      #1e7e34);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-total-sales[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #6c757d,\n      #495057);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-total-orders[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #343a40,\n      #212529);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-total-clients[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ffc107,\n      #d39e00);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-pending-orders[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ffc107,\n      #d39e00);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-low-stock[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #dc3545,\n      #b02a37);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-latest-orders[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #17a2b8,\n      #117a8b);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-latest-clients[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #007bff,\n      #0056b3);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header.header-latest-products[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #28a745,\n      #1e7e34);\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  color: #f8f9fa;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .display-5[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #7b68ee;\n  transition: color 0.3s ease-in-out;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%] {\n  color: #adb5bd;\n  font-size: 0.9rem;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  background-color: transparent;\n  border-color: rgba(248, 249, 250, 0.08);\n  color: #f8f9fa;\n  padding: 0.75rem 0;\n  flex-wrap: wrap;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   a.btn[_ngcontent-%COMP%] {\n  transition:\n    background 0.2s ease-in-out,\n    color 0.2s ease-in-out,\n    border-color 0.2s ease-in-out;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   .bi-person-fill[_ngcontent-%COMP%] {\n  transition: color 0.3s ease-in-out;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:first-child {\n  border-top: none;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n#page-content-wrapper[_ngcontent-%COMP%]   .list-group[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%]   .item-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n@media (min-width: 768px) {\n  #page-content-wrapper[_ngcontent-%COMP%]   .container-fluid[_ngcontent-%COMP%] {\n    padding-left: 2rem;\n    padding-right: 2rem;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .dashboard-title[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n    font-size: 1.6rem;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n    padding: 1.25rem 1.5rem;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .display-5[_ngcontent-%COMP%] {\n    font-size: 3rem;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .list-group-item[_ngcontent-%COMP%] {\n    padding: 1rem 0;\n    flex-wrap: nowrap;\n  }\n}\n@media (min-width: 992px) {\n  #page-content-wrapper[_ngcontent-%COMP%]   .dashboard-header[_ngcontent-%COMP%] {\n    margin-bottom: 3rem;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .dashboard-title[_ngcontent-%COMP%] {\n    font-size: 2.25rem;\n    padding-top: 1rem;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n    font-size: 1.8rem;\n    margin-bottom: 2rem;\n    text-align: center;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .display-5[_ngcontent-%COMP%] {\n    font-size: 3.25rem;\n  }\n}\n@media (min-width: 1200px) {\n  #page-content-wrapper[_ngcontent-%COMP%]   .dashboard-title[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n  }\n  #page-content-wrapper[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .display-5[_ngcontent-%COMP%] {\n    font-size: 3.5rem;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", imports: [
      CommonModule,
      CurrencyPipe,
      DatePipe,
      RouterModule,
      TitleCasePipe
    ], standalone: true, template: `<div class="dashboard-wrapper">
  <div id="page-content-wrapper">
    <div class="container-fluid my-4">
      <div class="dashboard-header">
        <h1 class="dashboard-title">Dashboard del Administrador</h1>
        <hr />
      </div>

      <section class="mb-5">
        <h2 class="section-title">Resumen R\xE1pido</h2>

        @if ({ monthly: monthlyMetrics$ | async, global: globalMetrics$ | async }; as metrics) {
          @if(metrics.monthly && metrics.global) {
            <div class="row g-4">
              <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-header fw-bold header-sales">Ventas del Mes</div>
                  <div class="card-body text-center d-flex flex-column justify-content-center">
                    <h3 class="display-5 fw-bold">{{ metrics.monthly.sales | currency : "ARS" : "$" : "1.0-0" }}</h3>
                    <p class="card-text">Hasta la fecha actual</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-header fw-bold header-orders">Pedidos del Mes</div>
                  <div class="card-body text-center d-flex flex-column justify-content-center">
                    <h3 class="display-5 fw-bold">{{ metrics.monthly.orders }}</h3>
                    <p class="card-text">Nuevas \xF3rdenes este mes</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-header fw-bold header-new-clients">Clientes Nuevos del Mes</div>
                  <div class="card-body text-center d-flex flex-column justify-content-center">
                    <h3 class="display-5 fw-bold">{{ metrics.monthly.newClients }}</h3>
                    <p class="card-text">Primeras compras en el mes</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-header fw-bold header-total-sales">Ventas Totales</div>
                  <div class="card-body text-center d-flex flex-column justify-content-center">
                    <h3 class="display-5 fw-bold">{{ metrics.global.totalSales | currency : "ARS" : "$" : "1.0-0" }}</h3>
                    <p class="card-text">Ingresos acumulados</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-header fw-bold header-total-orders">Pedidos Totales</div>
                  <div class="card-body text-center d-flex flex-column justify-content-center">
                    <h3 class="display-5 fw-bold">{{ metrics.global.totalOrders }}</h3>
                    <p class="card-text">\xD3rdenes procesadas en total</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                  <div class="card-header fw-bold header-total-clients">Clientes Totales</div>
                  <div class="card-body text-center d-flex flex-column justify-content-center">
                    <h3 class="display-5 fw-bold">{{ metrics.global.totalClients }}</h3>
                    <p class="card-text">Base de clientes \xFAnica</p>
                  </div>
                </div>
              </div>
            </div>
          } @else {
            <div class="text-center p-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando m\xE9tricas...</span>
              </div>
            </div>
          }
        }
      </section>

      <section class="mb-5">
        <h2 class="section-title">Tareas Pendientes</h2>
        <div class="row g-4">
          <div class="col-12 col-lg-6">
            <div class="card h-100 shadow-sm">
              <div class="card-header fw-bold header-pending-orders"><i class="bi bi-box-seam me-2"></i>Pedidos por Enviar</div>
              <div class="card-body">
                @if (pendingOrders$ | async; as pendingOrders) {
                  <ul class="list-group list-group-flush">
                    @for (order of pendingOrders; track order.id) {
                      <li class="list-group-item">
                        <div class="item-content text-truncate">
                          <span class="fw-bold">{{ order.clientName }}</span>
                          <small class="d-block text-muted">#{{ order.id }} - {{ order.orderDate | date : "short" }}</small>
                        </div>
                        <span class="badge rounded-pill flex-shrink-0 mx-2" [ngClass]="{
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
                        <a [routerLink]="['/admin/orders/detail', order.id]" class="btn btn-sm btn-outline-primary ms-auto flex-shrink-0" title="Ver Pedido">
                          <i class="bi bi-arrow-right-circle"></i>
                        </a>
                      </li>
                    } @empty {
                      <p class="text-center py-3"><i class="bi bi-check-circle me-1"></i>\xA1No hay pedidos pendientes!</p>
                    }
                  </ul>
                } @else {
                  <div class="text-center py-3"><div class="spinner-border spinner-border-sm"></div></div>
                }
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="card h-100 shadow-sm">
              <div class="card-header fw-bold header-low-stock"><i class="bi bi-exclamation-triangle-fill me-2"></i>Productos con Poco Stock</div>
              <div class="card-body">
                @if (lowStockProducts$ | async; as lowStockProducts) {
                  <ul class="list-group list-group-flush">
                    @for (product of lowStockProducts; track product.id) {
                      <li class="list-group-item">
                        <div class="item-content text-truncate">
                          <span class="fw-bold">{{ product.name }}</span>
                        </div>
                        <span class="badge bg-danger rounded-pill flex-shrink-0 mx-2">{{ product.totalStock }} unidades</span>
                        <a [routerLink]="['/admin/products/edit', product.id]" class="btn btn-sm btn-outline-danger ms-auto flex-shrink-0" title="Editar Producto">
                          <i class="bi bi-pencil"></i>
                        </a>
                      </li>
                    } @empty {
                      <p class="text-center py-3"><i class="bi bi-check-circle me-1"></i>\xA1Todos los productos tienen buen stock!</p>
                    }
                  </ul>
                } @else {
                  <div class="text-center py-3"><div class="spinner-border spinner-border-sm"></div></div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="section-title">Actividad Reciente</h2>
        <div class="row g-4">
          <div class="col-12 col-lg-6 col-xl-4">
            <div class="card h-100 shadow-sm">
              <div class="card-header fw-bold header-latest-orders">\xDAltimos 10 Pedidos</div>
              <div class="card-body">
                @if (latestOrders$ | async; as latestOrders) {
                  <ul class="list-group list-group-flush">
                    @for (order of latestOrders; track order.id) {
                      <li class="list-group-item">
                        <div class="item-content text-truncate">
                          <span class="fw-bold">{{ order.clientName }}</span>
                          <small class="d-block text-muted">{{ order.total | currency : "ARS" : "$" }} - {{ order.orderDate | date : "short" }}</small>
                        </div>
                        <a [routerLink]="['/admin/orders/detail', order.id]" class="btn btn-sm btn-outline-info ms-auto flex-shrink-0" title="Ver Pedido">
                          <i class="bi bi-arrow-right-circle"></i>
                        </a>
                      </li>
                    } @empty {
                      <p class="text-center py-3">No hay pedidos recientes.</p>
                    }
                  </ul>
                } @else {
                  <div class="text-center py-3"><div class="spinner-border spinner-border-sm"></div></div>
                }
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 col-xl-4">
            <div class="card h-100 shadow-sm">
              <div class="card-header fw-bold header-latest-clients">\xDAltimos 10 Clientes</div>
              <div class="card-body">
                @if (latestClients$ | async; as latestClients) {
                  <ul class="list-group list-group-flush">
                    @for (client of latestClients; track client.id) {
                      <li class="list-group-item">
                        <div class="item-content text-truncate">
                          <span class="fw-bold">{{ client.fullName }}</span>
                          <small class="d-block text-truncate">{{ client.email }}</small>
                        </div>
                        <a [routerLink]="['/admin/clients', client.email, 'details']" class="btn btn-sm btn-outline-primary ms-auto flex-shrink-0" title="Ver Cliente">
                          <i class="bi bi-person-fill"></i>
                        </a>
                      </li>
                    } @empty {
                      <p class="text-center py-3">No hay clientes recientes.</p>
                    }
                  </ul>
                } @else {
                  <div class="text-center py-3"><div class="spinner-border spinner-border-sm"></div></div>
                }
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 col-xl-4">
            <div class="card h-100 shadow-sm">
              <div class="card-header fw-bold header-latest-products">\xDAltimos 10 Productos</div>
              <div class="card-body">
                @if (latestProducts$ | async; as latestProducts) {
                  <ul class="list-group list-group-flush">
                    @for (product of latestProducts; track product.id) {
                      <li class="list-group-item">
                        <div class="item-content text-truncate">
                          <span class="fw-bold">{{ product.name }}</span>
                          <small class="d-block text-muted">{{ product.price | currency : "ARS" : "$" }} - {{ product.createdAt | date : "shortDate" }}</small>
                        </div>
                        <a [routerLink]="['/admin/products/detail', product.id]" class="btn btn-sm btn-outline-success ms-auto flex-shrink-0" title="Ver Producto">
                          <i class="bi bi-eye"></i>
                        </a>
                      </li>
                    } @empty {
                      <p class="text-center py-3">No hay productos recientes.</p>
                    }
                  </ul>
                } @else {
                  <div class="text-center py-3"><div class="spinner-border spinner-border-sm"></div></div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>`, styles: ['/* src/app/features/admin/components/dashboard/dashboard.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n#page-content-wrapper {\n  transition: all 0.3s ease-in-out;\n}\n#page-content-wrapper .container-fluid {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n#page-content-wrapper .dashboard-header {\n  margin-bottom: 2rem;\n}\n#page-content-wrapper .dashboard-title {\n  padding-top: 0;\n  margin-bottom: 0.5rem;\n  font-size: 1.75rem;\n  font-weight: 700;\n  text-align: center;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n#page-content-wrapper hr {\n  border-color: rgba(248, 249, 250, 0.1);\n  margin: 0;\n}\n#page-content-wrapper .section-title {\n  font-size: 1.4rem;\n  font-weight: 600;\n  color: #7b68ee;\n  margin-bottom: 1.5rem;\n  letter-spacing: 0.03em;\n  text-align: center;\n}\n#page-content-wrapper .card {\n  position: relative;\n  z-index: 1;\n  background:\n    linear-gradient(\n      160deg,\n      #2a2a47,\n      #1a1a2e);\n  border: 1px solid rgba(123, 104, 238, 0.2);\n  border-radius: 0.75rem;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n  color: #f8f9fa;\n  transition: none;\n}\n#page-content-wrapper .card::before {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: -2px;\n  border-radius: inherit;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n#page-content-wrapper .card:hover::before {\n  opacity: 1;\n}\n#page-content-wrapper .card:hover .card-body .display-5 {\n  color: #f8f9fa;\n}\n#page-content-wrapper .card:hover .list-group-item a.btn {\n  border-color: rgba(255, 255, 255, 0.8);\n  background-color: rgba(255, 255, 255, 0.1);\n  color: white;\n}\n#page-content-wrapper .card:hover .list-group-item .bi-person-fill {\n  color: #f8f9fa;\n}\n#page-content-wrapper .card:hover .list-group-item a.btn-outline-success:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #28a745,\n      #1e7e34);\n  border-color: transparent;\n  color: #f8f9fa;\n}\n#page-content-wrapper .card:hover .list-group-item a.btn-outline-info:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #17a2b8,\n      #117a8b);\n  border-color: transparent;\n  color: #f8f9fa;\n}\n#page-content-wrapper .card:hover .list-group-item a.btn-outline-danger:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #dc3545,\n      #b02a37);\n  border-color: transparent;\n  color: #f8f9fa;\n}\n#page-content-wrapper .card:hover .header-pending-orders + .card-body .list-group-item a.btn-outline-primary:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #ffc107,\n      #d39e00);\n  border-color: transparent;\n  color: #f8f9fa;\n}\n#page-content-wrapper .card:hover .header-latest-clients + .card-body .list-group-item a.btn-outline-primary:hover {\n  background:\n    linear-gradient(\n      135deg,\n      #007bff,\n      #0056b3);\n  border-color: transparent;\n  color: #f8f9fa;\n}\n#page-content-wrapper .card .card-header {\n  padding: 1rem 1.25rem;\n  border-bottom: 1px solid rgba(248, 249, 250, 0.1);\n  font-weight: 600;\n  font-size: 1rem;\n}\n#page-content-wrapper .card .card-header.header-sales {\n  background:\n    linear-gradient(\n      135deg,\n      #6c757d,\n      #495057);\n}\n#page-content-wrapper .card .card-header.header-orders {\n  background:\n    linear-gradient(\n      135deg,\n      #007bff,\n      #0056b3);\n}\n#page-content-wrapper .card .card-header.header-new-clients {\n  background:\n    linear-gradient(\n      135deg,\n      #28a745,\n      #1e7e34);\n}\n#page-content-wrapper .card .card-header.header-total-sales {\n  background:\n    linear-gradient(\n      135deg,\n      #6c757d,\n      #495057);\n}\n#page-content-wrapper .card .card-header.header-total-orders {\n  background:\n    linear-gradient(\n      135deg,\n      #343a40,\n      #212529);\n}\n#page-content-wrapper .card .card-header.header-total-clients {\n  background:\n    linear-gradient(\n      135deg,\n      #ffc107,\n      #d39e00);\n}\n#page-content-wrapper .card .card-header.header-pending-orders {\n  background:\n    linear-gradient(\n      135deg,\n      #ffc107,\n      #d39e00);\n}\n#page-content-wrapper .card .card-header.header-low-stock {\n  background:\n    linear-gradient(\n      135deg,\n      #dc3545,\n      #b02a37);\n}\n#page-content-wrapper .card .card-header.header-latest-orders {\n  background:\n    linear-gradient(\n      135deg,\n      #17a2b8,\n      #117a8b);\n}\n#page-content-wrapper .card .card-header.header-latest-clients {\n  background:\n    linear-gradient(\n      135deg,\n      #007bff,\n      #0056b3);\n}\n#page-content-wrapper .card .card-header.header-latest-products {\n  background:\n    linear-gradient(\n      135deg,\n      #28a745,\n      #1e7e34);\n}\n#page-content-wrapper .card .card-body {\n  padding: 1.25rem;\n  color: #f8f9fa;\n}\n#page-content-wrapper .card .card-body .display-5 {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #7b68ee;\n  transition: color 0.3s ease-in-out;\n}\n#page-content-wrapper .card .card-body .card-text {\n  color: #adb5bd;\n  font-size: 0.9rem;\n}\n#page-content-wrapper .list-group {\n  background-color: transparent;\n}\n#page-content-wrapper .list-group .list-group-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  background-color: transparent;\n  border-color: rgba(248, 249, 250, 0.08);\n  color: #f8f9fa;\n  padding: 0.75rem 0;\n  flex-wrap: wrap;\n}\n#page-content-wrapper .list-group .list-group-item a.btn {\n  transition:\n    background 0.2s ease-in-out,\n    color 0.2s ease-in-out,\n    border-color 0.2s ease-in-out;\n}\n#page-content-wrapper .list-group .list-group-item .bi-person-fill {\n  transition: color 0.3s ease-in-out;\n}\n#page-content-wrapper .list-group .list-group-item:first-child {\n  border-top: none;\n}\n#page-content-wrapper .list-group .list-group-item:last-child {\n  border-bottom: none;\n}\n#page-content-wrapper .list-group .list-group-item .item-content {\n  flex: 1;\n  min-width: 0;\n}\n@media (min-width: 768px) {\n  #page-content-wrapper .container-fluid {\n    padding-left: 2rem;\n    padding-right: 2rem;\n  }\n  #page-content-wrapper .dashboard-title {\n    font-size: 2rem;\n  }\n  #page-content-wrapper .section-title {\n    font-size: 1.6rem;\n  }\n  #page-content-wrapper .card .card-header {\n    font-size: 1.1rem;\n    padding: 1.25rem 1.5rem;\n  }\n  #page-content-wrapper .card .card-body {\n    padding: 1.5rem;\n  }\n  #page-content-wrapper .card .card-body .display-5 {\n    font-size: 3rem;\n  }\n  #page-content-wrapper .card .card-body .card-text {\n    font-size: 0.95rem;\n  }\n  #page-content-wrapper .list-group-item {\n    padding: 1rem 0;\n    flex-wrap: nowrap;\n  }\n}\n@media (min-width: 992px) {\n  #page-content-wrapper .dashboard-header {\n    margin-bottom: 3rem;\n  }\n  #page-content-wrapper .dashboard-title {\n    font-size: 2.25rem;\n    padding-top: 1rem;\n  }\n  #page-content-wrapper .section-title {\n    font-size: 1.8rem;\n    margin-bottom: 2rem;\n    text-align: center;\n  }\n  #page-content-wrapper .card .card-body .display-5 {\n    font-size: 3.25rem;\n  }\n}\n@media (min-width: 1200px) {\n  #page-content-wrapper .dashboard-title {\n    font-size: 2.5rem;\n  }\n  #page-content-wrapper .card .card-body .display-5 {\n    font-size: 3.5rem;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/features/admin/components/dashboard/dashboard.component.ts", lineNumber: 25 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-R6QAR6QT.js.map
