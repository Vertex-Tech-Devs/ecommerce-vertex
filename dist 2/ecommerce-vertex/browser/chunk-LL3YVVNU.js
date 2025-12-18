import {
  OrderService
} from "./chunk-H7SRYL5P.js";
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
  CommonModule,
  Component,
  CurrencyPipe,
  combineLatest,
  inject,
  map,
  of,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind3,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/shop/components/order-confirmation/order-confirmation.component.ts
var _forTrack0 = ($index, $item) => $item.variantId;
function OrderConfirmationComponent_Conditional_1_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275element(1, "i", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h1", 10);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 11);
    \u0275\u0275text(5, "Hemos recibido tu pedido y ya lo estamos preparando.");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\xA1Gracias por tu compra, ", data_r1.order.clientName.split(" ")[0], "!");
  }
}
function OrderConfirmationComponent_Conditional_1_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "i", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h1", 10);
    \u0275\u0275text(3, "Tu pago est\xE1 pendiente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 11);
    \u0275\u0275text(5, "Estamos esperando la confirmaci\xF3n de Mercado Pago. Te avisaremos por email cuando se apruebe.");
    \u0275\u0275elementEnd();
  }
}
function OrderConfirmationComponent_Conditional_1_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "i", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h1", 10);
    \u0275\u0275text(3, "El pago fue rechazado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 11);
    \u0275\u0275text(5, "No se pudo procesar tu pago. Por favor, int\xE9ntalo de nuevo desde el carrito.");
    \u0275\u0275elementEnd();
  }
}
function OrderConfirmationComponent_Conditional_1_Conditional_0_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "span", 16);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 17);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r2.productName, " (x", item_r2.quantity, ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(5, 3, item_r2.price * item_r2.quantity, "ARS", "$"));
  }
}
function OrderConfirmationComponent_Conditional_1_Conditional_0_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, "Te hemos enviado un correo de confirmaci\xF3n a ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ".");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 19);
    \u0275\u0275text(6, "Seguir Comprando");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(data_r1.order.clientEmail);
  }
}
function OrderConfirmationComponent_Conditional_1_Conditional_0_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, "Si tienes problemas, no dudes en contactarnos.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "a", 20);
    \u0275\u0275text(3, "Volver al Carrito");
    \u0275\u0275elementEnd();
  }
}
function OrderConfirmationComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275conditionalCreate(1, OrderConfirmationComponent_Conditional_1_Conditional_0_Conditional_1_Template, 6, 1)(2, OrderConfirmationComponent_Conditional_1_Conditional_0_Conditional_2_Template, 6, 0)(3, OrderConfirmationComponent_Conditional_1_Conditional_0_Conditional_3_Template, 6, 0);
    \u0275\u0275elementStart(4, "div", 3)(5, "h2", 4);
    \u0275\u0275text(6, "Resumen de tu Pedido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 5)(8, "strong");
    \u0275\u0275text(9, "N\xFAmero de Pedido:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(11, OrderConfirmationComponent_Conditional_1_Conditional_0_For_12_Template, 6, 7, "div", 6, _forTrack0);
    \u0275\u0275elementStart(13, "div", 7)(14, "strong");
    \u0275\u0275text(15, "Total:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(19, OrderConfirmationComponent_Conditional_1_Conditional_0_Conditional_19_Template, 7, 1)(20, OrderConfirmationComponent_Conditional_1_Conditional_0_Conditional_20_Template, 4, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(data_r1.paymentStatus === "approved" ? 1 : data_r1.paymentStatus === "pending" || data_r1.paymentStatus === "in_process" ? 2 : 3);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", data_r1.order.id, " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(data_r1.order.items);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(18, 4, data_r1.order.total, "ARS", "$"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(data_r1.paymentStatus === "approved" ? 19 : 20);
  }
}
function OrderConfirmationComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 21)(2, "span", 22);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 23);
    \u0275\u0275text(5, "Cargando los detalles de tu pedido...");
    \u0275\u0275elementEnd()();
  }
}
function OrderConfirmationComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, OrderConfirmationComponent_Conditional_1_Conditional_0_Template, 21, 8, "div", 2)(1, OrderConfirmationComponent_Conditional_1_Conditional_1_Template, 6, 0, "div", 1);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.order ? 0 : 1);
  }
}
function OrderConfirmationComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 21)(2, "span", 22);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 23);
    \u0275\u0275text(5, "Cargando los detalles de tu pedido...");
    \u0275\u0275elementEnd()();
  }
}
var OrderConfirmationComponent = class _OrderConfirmationComponent {
  route = inject(ActivatedRoute);
  orderService = inject(OrderService);
  data$;
  ngOnInit() {
    const order$ = this.route.paramMap.pipe(switchMap((params) => {
      const orderId = params.get("id");
      if (orderId) {
        return this.orderService.getOrderById(orderId);
      }
      return of(void 0);
    }));
    const paymentStatus$ = this.route.queryParamMap.pipe(map((params) => params.get("status")));
    this.data$ = combineLatest({
      order: order$,
      paymentStatus: paymentStatus$
    });
  }
  static \u0275fac = function OrderConfirmationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderConfirmationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderConfirmationComponent, selectors: [["app-order-confirmation"]], decls: 4, vars: 3, consts: [[1, "confirmation-container"], [1, "loading-card"], [1, "confirmation-card"], [1, "order-summary"], [1, "summary-title"], [1, "order-id"], [1, "summary-item"], [1, "summary-total"], [1, "icon-success"], [1, "bi", "bi-check-circle-fill"], [1, "thank-you-title"], [1, "subtitle"], [1, "icon-pending"], [1, "bi", "bi-clock-history"], [1, "icon-error"], [1, "bi", "bi-x-circle-fill"], [1, "item-name"], [1, "item-price"], [1, "email-info"], ["routerLink", "/shop/catalog", 1, "action-button"], ["routerLink", "/shop/cart", 1, "action-button"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [1, "mt-3"]], template: function OrderConfirmationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, OrderConfirmationComponent_Conditional_1_Template, 2, 1);
      \u0275\u0275pipe(2, "async");
      \u0275\u0275conditionalBranchCreate(3, OrderConfirmationComponent_Conditional_3_Template, 6, 0, "div", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(2, 1, ctx.data$)) ? 1 : 3, tmp_0_0);
    }
  }, dependencies: [CommonModule, RouterModule, RouterLink, AsyncPipe, CurrencyPipe], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  background-color: #f4f5f7;\n  min-height: calc(100vh - 80px);\n}\n.confirmation-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 2rem;\n}\n.confirmation-card[_ngcontent-%COMP%], \n.loading-card[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n  padding: 3rem;\n  max-width: 600px;\n  width: 100%;\n  text-align: center;\n  color: #333;\n}\n.loading-card[_ngcontent-%COMP%] {\n  padding: 4rem;\n}\n.icon-success[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  color: #28a745;\n  margin-bottom: 1rem;\n}\n.icon-pending[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  color: #ffc107;\n  margin-bottom: 1rem;\n}\n.icon-error[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  color: #dc3545;\n  margin-bottom: 1rem;\n}\n.thank-you-title[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: #333;\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: #6c757d;\n  margin-bottom: 2.5rem;\n}\n.order-summary[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  padding: 1.5rem;\n  margin-bottom: 2rem;\n  text-align: left;\n}\n.summary-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n  text-align: center;\n  color: #333;\n}\n.order-id[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 1rem;\n  font-size: 1.1rem;\n  color: #495057;\n}\n.summary-item[_ngcontent-%COMP%], \n.summary-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #f0f0f0;\n  color: #495057;\n}\n.summary-item[_ngcontent-%COMP%]   .item-name[_ngcontent-%COMP%] {\n  color: #333;\n}\n.summary-item[_ngcontent-%COMP%]   .item-price[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #212529;\n}\n.summary-total[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  border-top: 2px solid #dee2e6;\n  border-bottom: none;\n  margin-top: 0.5rem;\n  font-weight: 600;\n  color: #212529;\n}\n.email-info[_ngcontent-%COMP%] {\n  margin-bottom: 2rem;\n  color: #6c757d;\n}\n.action-button[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.85rem 2rem;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  text-align: center;\n  text-decoration: none;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.action-button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 15px rgba(255, 87, 34, 0.3);\n}\n/*# sourceMappingURL=order-confirmation.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderConfirmationComponent, [{
    type: Component,
    args: [{ selector: "app-order-confirmation", standalone: true, imports: [CommonModule, RouterModule, CurrencyPipe], template: `<div class="confirmation-container">
  @if (data$ | async; as data) {
    @if (data.order) {
      <div class="confirmation-card">

        @if (data.paymentStatus === 'approved') {
          <div class="icon-success">
            <i class="bi bi-check-circle-fill"></i>
          </div>
          <h1 class="thank-you-title">\xA1Gracias por tu compra, {{ data.order.clientName.split(' ')[0] }}!</h1>
          <p class="subtitle">Hemos recibido tu pedido y ya lo estamos preparando.</p>
        } @else if (data.paymentStatus === 'pending' || data.paymentStatus === 'in_process') {
          <div class="icon-pending">
            <i class="bi bi-clock-history"></i>
          </div>
          <h1 class="thank-you-title">Tu pago est\xE1 pendiente</h1>
          <p class="subtitle">Estamos esperando la confirmaci\xF3n de Mercado Pago. Te avisaremos por email cuando se apruebe.</p>
        } @else {
          <div class="icon-error">
            <i class="bi bi-x-circle-fill"></i>
          </div>
          <h1 class="thank-you-title">El pago fue rechazado</h1>
          <p class="subtitle">No se pudo procesar tu pago. Por favor, int\xE9ntalo de nuevo desde el carrito.</p>
        }

        <div class="order-summary">
          <h2 class="summary-title">Resumen de tu Pedido</h2>
          <p class="order-id">
            <strong>N\xFAmero de Pedido:</strong> {{ data.order.id }}
          </p>
          @for (item of data.order.items; track item.variantId) {
            <div class="summary-item">
              <span class="item-name">{{ item.productName }} (x{{ item.quantity }})</span>
              <span class="item-price">{{ item.price * item.quantity | currency:'ARS':'$' }}</span>
            </div>
          }
          <div class="summary-total">
            <strong>Total:</strong>
            <strong>{{ data.order.total | currency:'ARS':'$' }}</strong>
          </div>
        </div>

        @if (data.paymentStatus === 'approved') {
          <p class="email-info">Te hemos enviado un correo de confirmaci\xF3n a <strong>{{ data.order.clientEmail }}</strong>.</p>
          <a routerLink="/shop/catalog" class="action-button">Seguir Comprando</a>
        } @else {
          <p class="email-info">Si tienes problemas, no dudes en contactarnos.</p>
          <a routerLink="/shop/cart" class="action-button">Volver al Carrito</a>
        }
      </div>
    } @else {
      <div class="loading-card">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-3">Cargando los detalles de tu pedido...</p>
      </div>
    }
  } @else {
    <div class="loading-card">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3">Cargando los detalles de tu pedido...</p>
    </div>
  }
</div>`, styles: ["/* src/app/features/shop/components/order-confirmation/order-confirmation.component.scss */\n:host {\n  display: block;\n  background-color: #f4f5f7;\n  min-height: calc(100vh - 80px);\n}\n.confirmation-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 2rem;\n}\n.confirmation-card,\n.loading-card {\n  background-color: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n  padding: 3rem;\n  max-width: 600px;\n  width: 100%;\n  text-align: center;\n  color: #333;\n}\n.loading-card {\n  padding: 4rem;\n}\n.icon-success {\n  font-size: 4rem;\n  color: #28a745;\n  margin-bottom: 1rem;\n}\n.icon-pending {\n  font-size: 4rem;\n  color: #ffc107;\n  margin-bottom: 1rem;\n}\n.icon-error {\n  font-size: 4rem;\n  color: #dc3545;\n  margin-bottom: 1rem;\n}\n.thank-you-title {\n  font-size: 2rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  color: #333;\n}\n.subtitle {\n  font-size: 1.1rem;\n  color: #6c757d;\n  margin-bottom: 2.5rem;\n}\n.order-summary {\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  padding: 1.5rem;\n  margin-bottom: 2rem;\n  text-align: left;\n}\n.summary-title {\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n  text-align: center;\n  color: #333;\n}\n.order-id {\n  text-align: center;\n  margin-bottom: 1rem;\n  font-size: 1.1rem;\n  color: #495057;\n}\n.summary-item,\n.summary-total {\n  display: flex;\n  justify-content: space-between;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #f0f0f0;\n  color: #495057;\n}\n.summary-item .item-name {\n  color: #333;\n}\n.summary-item .item-price {\n  font-weight: 500;\n  color: #212529;\n}\n.summary-total {\n  font-size: 1.1rem;\n  border-top: 2px solid #dee2e6;\n  border-bottom: none;\n  margin-top: 0.5rem;\n  font-weight: 600;\n  color: #212529;\n}\n.email-info {\n  margin-bottom: 2rem;\n  color: #6c757d;\n}\n.action-button {\n  display: inline-block;\n  padding: 0.85rem 2rem;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  text-align: center;\n  text-decoration: none;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.action-button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 15px rgba(255, 87, 34, 0.3);\n}\n/*# sourceMappingURL=order-confirmation.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderConfirmationComponent, { className: "OrderConfirmationComponent", filePath: "src/app/features/shop/components/order-confirmation/order-confirmation.component.ts", lineNumber: 20 });
})();
export {
  OrderConfirmationComponent
};
//# sourceMappingURL=chunk-LL3YVVNU.js.map
