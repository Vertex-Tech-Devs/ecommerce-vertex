import {
  ClientService
} from "./chunk-BUEGSFX4.js";
import "./chunk-UYVF6V6H.js";
import {
  ActivatedRoute,
  Router,
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
  Observable,
  TitleCasePipe,
  inject,
  setClassMetadata,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction5,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/client/client-details/client-details.component.ts
var _c0 = (a0, a1, a2, a3, a4) => ({ "bg-warning text-dark": a0, "bg-primary": a1, "bg-info": a2, "bg-success": a3, "bg-danger": a4 });
var _c1 = (a0) => ["/admin/orders/detail", a0];
var _forTrack0 = ($index, $item) => $item.id;
function ClientDetailsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 16)(2, "div", 17)(3, "h3", 5);
    \u0275\u0275element(4, "i", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 3)(7, "div", 19)(8, "div", 20)(9, "p", 21)(10, "strong");
    \u0275\u0275text(11, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 22)(14, "strong");
    \u0275\u0275text(15, "Tel\xE9fono:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 20)(18, "p", 21)(19, "strong");
    \u0275\u0275text(20, "Cliente desde:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 23)(24, "strong");
    \u0275\u0275text(25, "N.\xBA de Pedidos:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.clientDetails.fullName, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r0.clientDetails.email);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.clientDetails.phone);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(22, 5, ctx_r0.clientDetails.firstOrderDate, "dd/MM/yyyy"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r0.clientDetails.numberOfOrders);
  }
}
function ClientDetailsComponent_Conditional_29_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 25);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 26);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 27)(10, "span", 28);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "titlecase");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 29)(14, "button", 30);
    \u0275\u0275element(15, "i", 31);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 6, order_r2.orderDate, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(8, 9, order_r2.total, "ARS", "$"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(15, _c0, order_r2.status === "pending", order_r2.status === "processing", order_r2.status === "shipped", order_r2.status === "delivered", order_r2.status === "cancelled"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(12, 13, order_r2.status), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(21, _c1, order_r2.id));
  }
}
function ClientDetailsComponent_Conditional_29_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 32);
    \u0275\u0275text(2, " Este cliente a\xFAn no tiene pedidos registrados. ");
    \u0275\u0275elementEnd()();
  }
}
function ClientDetailsComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ClientDetailsComponent_Conditional_29_For_1_Template, 16, 23, "tr", null, _forTrack0, false, ClientDetailsComponent_Conditional_29_ForEmpty_2_Template, 3, 0, "tr");
  }
  if (rf & 2) {
    \u0275\u0275repeater(ctx);
  }
}
function ClientDetailsComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 33)(2, "div", 34)(3, "span", 35);
    \u0275\u0275text(4, "Cargando historial...");
    \u0275\u0275elementEnd()()()();
  }
}
function ClientDetailsComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" No se encontraron detalles para el cliente con el email: ", ctx_r0.clientEmail, " ");
  }
}
var ClientDetailsComponent = class _ClientDetailsComponent {
  clientEmail = null;
  clientDetails;
  clientOrders$;
  routeSubscription;
  clientSubscription;
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _clientService = inject(ClientService);
  constructor() {
  }
  ngOnInit() {
    this.routeSubscription = this._route.paramMap.pipe(switchMap((params) => {
      this.clientEmail = params.get("email");
      if (this.clientEmail) {
        console.log("Cargando detalles para el cliente con email:", this.clientEmail);
        this.loadClientDetails(this.clientEmail);
        return this._clientService.getOrdersByClientEmail(this.clientEmail);
      } else {
        console.warn("No se encontr\xF3 el email del cliente en la URL.");
        this._router.navigate(["/admin/customers"]);
        return new Observable();
      }
    })).subscribe((orders) => {
      this.clientOrders$ = new Observable((observer) => {
        observer.next(orders);
        observer.complete();
      });
    }, (error) => console.error("Error al cargar los pedidos del cliente:", error));
  }
  loadClientDetails(email) {
    this.clientSubscription = this._clientService.getClients().subscribe({
      next: (clients) => {
        this.clientDetails = clients.find((client) => client.email === email);
        if (!this.clientDetails) {
          console.warn(`Cliente con email ${email} no encontrado.`);
          this._router.navigate(["/admin/customers"]);
        }
      },
      error: (err) => {
        console.error("Error al cargar detalles del cliente:", err);
      }
    });
  }
  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
    this.clientSubscription?.unsubscribe();
  }
  goBackToList() {
    this._router.navigate(["/admin/customers"]);
  }
  static \u0275fac = function ClientDetailsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ClientDetailsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClientDetailsComponent, selectors: [["app-client-details"]], decls: 33, vars: 5, consts: [[1, "container-fluid", "my-4"], [1, "card-gradient-wrapper"], [1, "card", "list-card", "shadow-sm"], [1, "card-body"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "card-title", "mb-0"], [1, "btn", "btn-outline-secondary", "btn-sm", 3, "click"], [1, "bi", "bi-arrow-left"], [1, "card-gradient-wrapper", "mb-4"], [1, "bi", "bi-receipt-cutoff", "me-2"], [1, "table-responsive"], [1, "table", "table-hover", "align-middle", "details-table"], ["scope", "col"], ["scope", "col", 1, "text-end"], ["scope", "col", 1, "text-center"], [1, "alert", "alert-warning", "text-center", "mt-4"], [1, "card", "details-sub-card"], [1, "card-header"], [1, "bi", "bi-person-circle", "me-2"], [1, "row"], [1, "col-md-6"], [1, "card-text"], [1, "card-text", "mb-md-0"], [1, "card-text", "mb-0"], ["data-label", "ID Pedido"], ["data-label", "Fecha"], ["data-label", "Total", 1, "text-end"], ["data-label", "Estado", 1, "text-center"], [1, "badge", 3, "ngClass"], ["data-label", "Acciones", 1, "text-center"], ["title", "Ver Detalles del Pedido", 1, "btn", "btn-outline-primary", "btn-sm", 3, "routerLink"], [1, "bi", "bi-eye"], ["colspan", "5", 1, "text-center", "text-muted-custom", "py-4"], ["colspan", "5", 1, "text-center", "py-5"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"]], template: function ClientDetailsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h2", 5);
      \u0275\u0275text(6, " Detalles del Cliente ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 6);
      \u0275\u0275listener("click", function ClientDetailsComponent_Template_button_click_7_listener() {
        return ctx.goBackToList();
      });
      \u0275\u0275element(8, "i", 7);
      \u0275\u0275text(9, " Volver a Clientes ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(10, ClientDetailsComponent_Conditional_10_Template, 27, 8, "div", 8);
      \u0275\u0275elementStart(11, "h4");
      \u0275\u0275element(12, "i", 9);
      \u0275\u0275text(13, "Historial de Pedidos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 10)(15, "table", 11)(16, "thead")(17, "tr")(18, "th", 12);
      \u0275\u0275text(19, "ID Pedido");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "th", 12);
      \u0275\u0275text(21, "Fecha");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "th", 13);
      \u0275\u0275text(23, "Total");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "th", 14);
      \u0275\u0275text(25, "Estado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "th", 14);
      \u0275\u0275text(27, "Acciones");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "tbody");
      \u0275\u0275conditionalCreate(29, ClientDetailsComponent_Conditional_29_Template, 3, 1);
      \u0275\u0275pipe(30, "async");
      \u0275\u0275conditionalBranchCreate(31, ClientDetailsComponent_Conditional_31_Template, 5, 0, "tr");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275conditionalCreate(32, ClientDetailsComponent_Conditional_32_Template, 2, 1, "div", 15);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275advance(10);
      \u0275\u0275conditional(ctx.clientDetails ? 10 : -1);
      \u0275\u0275advance(19);
      \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(30, 3, ctx.clientOrders$)) ? 29 : 31, tmp_1_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.clientDetails && ctx.clientEmail ? 32 : -1);
    }
  }, dependencies: [CommonModule, NgClass, RouterModule, RouterLink, AsyncPipe, TitleCasePipe, CurrencyPipe, DatePipe], styles: ['\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.list-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.list-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.details-sub-card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: none;\n  border-radius: 0.75rem;\n  background-color: #ffffff;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border-bottom: 1px solid #f0f0f0;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #1c2a42;\n  background: none;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%] {\n  color: #495057;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1c2a42;\n  font-weight: 600;\n}\nh4[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #007bff;\n  margin-top: 2rem;\n  margin-bottom: 1rem;\n}\n.details-table.table[_ngcontent-%COMP%] {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);\n}\n.details-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n  cursor: default;\n}\n.details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  color: #000;\n  font-weight: 500;\n}\n.details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {\n  opacity: 1;\n}\n.text-muted-custom[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  padding: 0.375rem 0.85rem;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.badge[_ngcontent-%COMP%] {\n  padding: 0.4em 0.8em;\n  font-size: 0.8em;\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .details-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%], \n   .details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], \n   .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n  }\n  .details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n    position: relative;\n  }\n  .details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n    transform: none;\n  }\n  .details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {\n    opacity: 1;\n  }\n  .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: right !important;\n    padding: 0.75rem 1rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n  }\n  .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n  }\n  .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n  }\n}\n/*# sourceMappingURL=client-details.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClientDetailsComponent, [{
    type: Component,
    args: [{ selector: "app-client-details", standalone: true, imports: [
      CommonModule,
      RouterModule,
      DatePipe
    ], template: `<div class="container-fluid my-4">
  <div class="card-gradient-wrapper">
    <div class="card list-card shadow-sm">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="card-title mb-0">
            Detalles del Cliente
          </h2>
          <button class="btn btn-outline-secondary btn-sm" (click)="goBackToList()">
            <i class="bi bi-arrow-left"></i> Volver a Clientes
          </button>
        </div>

        @if (clientDetails) {
          <div class="card-gradient-wrapper mb-4">
            <div class="card details-sub-card">
              <div class="card-header">
                <h3 class="card-title mb-0">
                  <i class="bi bi-person-circle me-2"></i>
                  {{ clientDetails.fullName }}
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <p class="card-text"><strong>Email:</strong> {{ clientDetails.email }}</p>
                    <p class="card-text mb-md-0"><strong>Tel\xE9fono:</strong> {{ clientDetails.phone }}</p>
                  </div>
                  <div class="col-md-6">
                    <p class="card-text"><strong>Cliente desde:</strong> {{ clientDetails.firstOrderDate | date:"dd/MM/yyyy" }}</p>
                    <p class="card-text mb-0"><strong>N.\xBA de Pedidos:</strong> {{ clientDetails.numberOfOrders }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        <h4><i class="bi bi-receipt-cutoff me-2"></i>Historial de Pedidos</h4>
        <div class="table-responsive">
          <table class="table table-hover align-middle details-table">
            <thead>
              <tr>
                <th scope="col">ID Pedido</th>
                <th scope="col">Fecha</th>
                <th scope="col" class="text-end">Total</th>
                <th scope="col" class="text-center">Estado</th>
                <th scope="col" class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              @if (clientOrders$ | async; as orders) {
                @for (order of orders; track order.id) {
                  <tr>
                    <td data-label="ID Pedido">{{ order.id }}</td>
                    <td data-label="Fecha">{{ order.orderDate | date:"dd/MM/yyyy HH:mm" }}</td>
                    <td data-label="Total" class="text-end">{{ order.total | currency:"ARS":"$" }}</td>
                    <td data-label="Estado" class="text-center">
                      <span class="badge" [ngClass]="{
                        'bg-warning text-dark': order.status === 'pending',
                        'bg-primary': order.status === 'processing',
                        'bg-info': order.status === 'shipped',
                        'bg-success': order.status === 'delivered',
                        'bg-danger': order.status === 'cancelled'
                      }">
                        {{ order.status | titlecase }}
                      </span>
                    </td>
                    <td data-label="Acciones" class="text-center">
                      <button class="btn btn-outline-primary btn-sm" [routerLink]="['/admin/orders/detail', order.id]" title="Ver Detalles del Pedido">
                        <i class="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="text-center text-muted-custom py-4">
                      Este cliente a\xFAn no tiene pedidos registrados.
                    </td>
                  </tr>
                }
              } @else {
                <tr>
                  <td colspan="5" class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Cargando historial...</span>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  @if (!clientDetails && clientEmail) {
    <div class="alert alert-warning text-center mt-4">
      No se encontraron detalles para el cliente con el email: {{ clientEmail }}
    </div>
  }
</div>
`, styles: ['/* src/app/features/admin/components/client/client-details/client-details.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.list-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card .card-body {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card .card-body {\n    padding: 2rem;\n  }\n}\n.list-card .card-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.details-sub-card {\n  border: none;\n  box-shadow: none;\n  border-radius: 0.75rem;\n  background-color: #ffffff;\n}\n.details-sub-card .card-header {\n  background-color: transparent;\n  border-bottom: 1px solid #f0f0f0;\n}\n.details-sub-card .card-header .card-title {\n  font-size: 1.25rem;\n  color: #1c2a42;\n  background: none;\n}\n.details-sub-card .card-text {\n  color: #495057;\n}\n.details-sub-card .card-text strong {\n  color: #1c2a42;\n  font-weight: 600;\n}\nh4 {\n  font-weight: 600;\n  color: #007bff;\n  margin-top: 2rem;\n  margin-bottom: 1rem;\n}\n.details-table.table {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);\n}\n.details-table thead th {\n  font-weight: 600;\n}\n.details-table tbody tr {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n  cursor: default;\n}\n.details-table tbody tr::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.details-table tbody tr:hover {\n  transform: translateY(-2px);\n}\n.details-table tbody tr:hover td {\n  color: #000;\n  font-weight: 500;\n}\n.details-table tbody tr:hover::after {\n  opacity: 1;\n}\n.text-muted-custom {\n  color: #6c757d;\n}\n.btn-outline-secondary {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  padding: 0.375rem 0.85rem;\n}\n.btn-outline-secondary:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.badge {\n  padding: 0.4em 0.8em;\n  font-size: 0.8em;\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .details-table thead {\n    display: none;\n  }\n  .details-table tbody,\n  .details-table tr,\n  .details-table td {\n    display: block;\n    width: 100%;\n  }\n  .details-table tr {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n    position: relative;\n  }\n  .details-table tr:hover {\n    transform: none;\n  }\n  .details-table tr:hover::after {\n    opacity: 1;\n  }\n  .details-table td {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: right !important;\n    padding: 0.75rem 1rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n  }\n  .details-table td:last-child {\n    border-bottom: none;\n  }\n  .details-table td::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n  }\n}\n/*# sourceMappingURL=client-details.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClientDetailsComponent, { className: "ClientDetailsComponent", filePath: "src/app/features/admin/components/client/client-details/client-details.component.ts", lineNumber: 22 });
})();
export {
  ClientDetailsComponent
};
//# sourceMappingURL=chunk-T54B5WQ5.js.map
