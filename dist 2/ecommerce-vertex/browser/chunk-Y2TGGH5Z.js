import {
  Functions,
  httpsCallable2 as httpsCallable
} from "./chunk-VAURE2XL.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-WR4QMUYF.js";
import {
  CartService
} from "./chunk-FPIZ5ED2.js";
import "./chunk-H5HDOTK4.js";
import {
  SweetAlertService
} from "./chunk-5OJQRZGI.js";
import {
  OrderService
} from "./chunk-H7SRYL5P.js";
import "./chunk-UYVF6V6H.js";
import {
  Router,
  RouterModule
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import "./chunk-HMD6QQFJ.js";
import "./chunk-SDXAAYIW.js";
import {
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  CurrencyPipe,
  Injectable,
  Input,
  NgClass,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import {
  __async
} from "./chunk-KTESVR3Q.js";

// src/app/features/shop/components/checkout/components/order-summary/order-summary.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function OrderSummaryComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 3)(1, "p");
    \u0275\u0275text(2, "Tu carrito est\xE1 vac\xEDo.");
    \u0275\u0275domElementEnd()();
  }
}
function OrderSummaryComponent_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 4);
    \u0275\u0275domElement(1, "img", 8);
    \u0275\u0275domElementStart(2, "div", 9)(3, "div", 10);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "div", 11);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(7, "div", 12);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275domProperty("src", item_r1.image || "assets/images/placeholder.jpg", \u0275\u0275sanitizeUrl)("alt", item_r1.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r1.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Cantidad: ", item_r1.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(9, 5, item_r1.price * item_r1.quantity, "ARS", "$"));
  }
}
var OrderSummaryComponent = class _OrderSummaryComponent {
  items = [];
  total = 0;
  static \u0275fac = function OrderSummaryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderSummaryComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderSummaryComponent, selectors: [["app-order-summary"]], inputs: { items: "items", total: "total" }, decls: 13, vars: 6, consts: [[1, "summary-card"], [1, "summary-title"], [1, "summary-items"], [1, "empty-summary", "text-muted"], [1, "summary-item"], [1, "summary-total"], [1, "total-label"], [1, "total-amount"], [1, "item-image", 3, "src", "alt"], [1, "item-details"], [1, "item-name"], [1, "item-quantity", "text-muted"], [1, "item-price"]], template: function OrderSummaryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "h3", 1);
      \u0275\u0275text(2, "Resumen del Pedido");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "div", 2);
      \u0275\u0275conditionalCreate(4, OrderSummaryComponent_Conditional_4_Template, 3, 0, "div", 3);
      \u0275\u0275repeaterCreate(5, OrderSummaryComponent_For_6_Template, 10, 9, "div", 4, _forTrack0);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(7, "div", 5)(8, "div", 6);
      \u0275\u0275text(9, "Total");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "div", 7);
      \u0275\u0275text(11);
      \u0275\u0275pipe(12, "currency");
      \u0275\u0275domElementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.items.length === 0 ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.items);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(12, 2, ctx.total, "ARS", "$"));
    }
  }, dependencies: [CommonModule, CurrencyPipe], styles: ["\n\n.summary-card[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e9ecef;\n}\n.summary-title[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n  text-align: center;\n  color: #ff5722;\n}\n.summary-items[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 0;\n  border-bottom: 1px solid #f0f0f0;\n}\n.summary-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.item-image[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  object-fit: cover;\n  border-radius: 8px;\n}\n.item-details[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  line-height: 1.3;\n  color: #333;\n}\n.item-quantity[_ngcontent-%COMP%] {\n  font-size: 0.9em;\n  color: #6c757d;\n}\n.item-price[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #212529;\n}\n.summary-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding-top: 1rem;\n  border-top: 2px solid #fd7e14;\n  font-size: 1.2rem;\n}\n.total-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n.total-amount[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #252525;\n}\n/*# sourceMappingURL=order-summary.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderSummaryComponent, [{
    type: Component,
    args: [{ selector: "app-order-summary", standalone: true, imports: [CommonModule], template: `<div class="summary-card">
  <h3 class="summary-title">Resumen del Pedido</h3>
  <div class="summary-items">
    @if (items.length === 0) {
      <div class="empty-summary text-muted">
        <p>Tu carrito est\xE1 vac\xEDo.</p>
      </div>
    }
    @for (item of items; track item.id) {
      <div class="summary-item">
        <img [src]="item.image || 'assets/images/placeholder.jpg'" [alt]="item.name" class="item-image">
        <div class="item-details">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-quantity text-muted">Cantidad: {{ item.quantity }}</div>
        </div>
        <div class="item-price">{{ item.price * item.quantity | currency:'ARS':'$' }}</div>
      </div>
    }
  </div>
  <div class="summary-total">
    <div class="total-label">Total</div>
    <div class="total-amount">{{ total | currency:'ARS':'$' }}</div>
  </div>
</div>
`, styles: ["/* src/app/features/shop/components/checkout/components/order-summary/order-summary.component.scss */\n.summary-card {\n  background-color: #ffffff;\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e9ecef;\n}\n.summary-title {\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n  text-align: center;\n  color: #ff5722;\n}\n.summary-items {\n  margin-bottom: 1.5rem;\n}\n.summary-item {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 0;\n  border-bottom: 1px solid #f0f0f0;\n}\n.summary-item:last-child {\n  border-bottom: none;\n}\n.item-image {\n  width: 60px;\n  height: 60px;\n  object-fit: cover;\n  border-radius: 8px;\n}\n.item-details {\n  flex-grow: 1;\n}\n.item-name {\n  font-weight: 500;\n  line-height: 1.3;\n  color: #333;\n}\n.item-quantity {\n  font-size: 0.9em;\n  color: #6c757d;\n}\n.item-price {\n  font-weight: 600;\n  color: #212529;\n}\n.summary-total {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding-top: 1rem;\n  border-top: 2px solid #fd7e14;\n  font-size: 1.2rem;\n}\n.total-label {\n  font-weight: 500;\n  color: #333;\n}\n.total-amount {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #252525;\n}\n/*# sourceMappingURL=order-summary.component.css.map */\n"] }]
  }], null, { items: [{
    type: Input
  }], total: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderSummaryComponent, { className: "OrderSummaryComponent", filePath: "src/app/features/shop/components/checkout/components/order-summary/order-summary.component.ts", lineNumber: 12 });
})();

// src/app/core/services/payment.service.ts
var PaymentService = class _PaymentService {
  functions = inject(Functions);
  constructor() {
  }
  initiatePayment(items, orderId) {
    return __async(this, null, function* () {
      try {
        const preferenceItems = items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          title: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price)
        }));
        const createPaymentPreference = httpsCallable(this.functions, "createPaymentPreference");
        const result = yield createPaymentPreference({
          items: preferenceItems,
          external_reference: orderId
        });
        return {
          success: true,
          init_point: result.data.init_point
        };
      } catch (error) {
        console.error("Error al crear la preferencia de pago:", error);
        return {
          success: false,
          error: error.message || "Error al conectar con el servicio de pago."
        };
      }
    });
  }
  static \u0275fac = function PaymentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaymentService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PaymentService, factory: _PaymentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaymentService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// src/app/features/shop/components/checkout/checkout.component.ts
var _c0 = (a0) => ({ "is-invalid": a0 });
function CheckoutComponent_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El nombre es requerido.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Debe tener al menos 2 caracteres.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, CheckoutComponent_Conditional_15_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, CheckoutComponent_Conditional_15_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.contactControls["firstName"].errors == null ? null : ctx_r0.contactControls["firstName"].errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.contactControls["firstName"].errors == null ? null : ctx_r0.contactControls["firstName"].errors["minlength"]) ? 2 : -1);
  }
}
function CheckoutComponent_Conditional_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El apellido es requerido.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Debe tener al menos 2 caracteres.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, CheckoutComponent_Conditional_20_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, CheckoutComponent_Conditional_20_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.contactControls["lastName"].errors == null ? null : ctx_r0.contactControls["lastName"].errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.contactControls["lastName"].errors == null ? null : ctx_r0.contactControls["lastName"].errors["minlength"]) ? 2 : -1);
  }
}
function CheckoutComponent_Conditional_25_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El email es requerido.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El formato del email no es v\xE1lido.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, CheckoutComponent_Conditional_25_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, CheckoutComponent_Conditional_25_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.contactControls["email"].errors == null ? null : ctx_r0.contactControls["email"].errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.contactControls["email"].errors == null ? null : ctx_r0.contactControls["email"].errors["email"]) ? 2 : -1);
  }
}
function CheckoutComponent_Conditional_30_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El tel\xE9fono es requerido.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Ingresa un n\xFAmero de tel\xE9fono v\xE1lido.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, CheckoutComponent_Conditional_30_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, CheckoutComponent_Conditional_30_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.contactControls["phone"].errors == null ? null : ctx_r0.contactControls["phone"].errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.contactControls["phone"].errors == null ? null : ctx_r0.contactControls["phone"].errors["pattern"]) ? 2 : -1);
  }
}
function CheckoutComponent_Conditional_39_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "La direcci\xF3n es requerida.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, CheckoutComponent_Conditional_39_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.shippingControls["address"].errors == null ? null : ctx_r0.shippingControls["address"].errors["required"]) ? 1 : -1);
  }
}
function CheckoutComponent_Conditional_44_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "La ciudad es requerida.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, CheckoutComponent_Conditional_44_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.shippingControls["city"].errors == null ? null : ctx_r0.shippingControls["city"].errors["required"]) ? 1 : -1);
  }
}
function CheckoutComponent_Conditional_49_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El c\xF3digo postal es requerido.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, CheckoutComponent_Conditional_49_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.shippingControls["zipCode"].errors == null ? null : ctx_r0.shippingControls["zipCode"].errors["required"]) ? 1 : -1);
  }
}
function CheckoutComponent_Conditional_54_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "La provincia es requerida.");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, CheckoutComponent_Conditional_54_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.shippingControls["province"].errors == null ? null : ctx_r0.shippingControls["province"].errors["required"]) ? 1 : -1);
  }
}
function CheckoutComponent_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 30);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "Procesando pago...");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Pagar con Mercado Pago");
    \u0275\u0275elementEnd();
  }
}
var CheckoutComponent = class _CheckoutComponent {
  fb = inject(FormBuilder);
  cartService = inject(CartService);
  paymentService = inject(PaymentService);
  sweetAlertService = inject(SweetAlertService);
  orderService = inject(OrderService);
  router = inject(Router);
  checkoutForm;
  isProcessingPayment = signal(false, ...ngDevMode ? [{ debugName: "isProcessingPayment" }] : []);
  constructor() {
  }
  ngOnInit() {
    this.checkoutForm = this.fb.group({
      contactInfo: this.fb.group({
        firstName: ["", [Validators.required, Validators.minLength(2)]],
        lastName: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        phone: ["", [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$")]]
      }),
      shippingInfo: this.fb.group({
        address: ["", [Validators.required, Validators.minLength(5)]],
        city: ["", [Validators.required, Validators.minLength(3)]],
        zipCode: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9- ]{3,10}$")]],
        province: ["", [Validators.required, Validators.minLength(4)]]
      })
    });
  }
  get contactControls() {
    return this.checkoutForm.get("contactInfo").controls;
  }
  get shippingControls() {
    return this.checkoutForm.get("shippingInfo").controls;
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.checkoutForm.invalid) {
        this.checkoutForm.markAllAsTouched();
        this.sweetAlertService.error("Formulario Incompleto", "Por favor, completa todos los campos requeridos.");
        return;
      }
      this.isProcessingPayment.set(true);
      this.sweetAlertService.loading("Preparando tu pago...", "Por favor, espera.");
      const cart = this.cartService.cart();
      if (!cart || cart.items.length === 0) {
        this.sweetAlertService.error("Carrito Vac\xEDo", "No puedes proceder al pago sin productos.");
        this.isProcessingPayment.set(false);
        this.router.navigate(["/shop/cart"]);
        return;
      }
      try {
        const orderId = yield this.createOrder(cart.items, cart.total);
        const paymentResult = yield this.paymentService.initiatePayment(cart.items, orderId);
        if (paymentResult.success && paymentResult.init_point) {
          this.cartService.clearCart();
          window.location.href = paymentResult.init_point;
        } else {
          throw new Error(paymentResult.error || "No se pudo obtener la URL de pago.");
        }
      } catch (error) {
        console.error("Error en el proceso de checkout:", error);
        let errorMessage = "Ocurri\xF3 un error inesperado al procesar tu pago.";
        if (error.code === "resource-exhausted" || error.message.includes("insuficiente")) {
          errorMessage = `\xA1Stock insuficiente! ${error.message}. Por favor, revisa tu carrito.`;
        } else if (error.message.includes("precio inv\xE1lido")) {
          errorMessage = `Uno de los productos en tu carrito tiene un precio inv\xE1lido. Por favor, revisa tu carrito.`;
        }
        this.sweetAlertService.error("Pago Rechazado", errorMessage);
        this.isProcessingPayment.set(false);
      }
    });
  }
  createOrder(cartItems, total) {
    return __async(this, null, function* () {
      const { contactInfo, shippingInfo } = this.checkoutForm.value;
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        productImage: item.image || "",
        attributes: item.attributes
      }));
      const newOrder = {
        userId: "anonymous-user",
        clientName: `${contactInfo.firstName} ${contactInfo.lastName}`,
        clientEmail: contactInfo.email,
        clientPhone: contactInfo.phone,
        orderDate: /* @__PURE__ */ new Date(),
        total,
        status: "pending",
        items: orderItems,
        shippingAddress: {
          street: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.province,
          zipCode: shippingInfo.zipCode,
          country: "Argentina"
        },
        paymentDetails: {
          paymentMethod: "Mercado Pago",
          subtotal: total,
          shippingCost: 0,
          taxAmount: 0
        },
        stockDecremented: false
      };
      try {
        const orderRef = yield this.orderService.createOrder(newOrder);
        return orderRef.id;
      } catch (error) {
        console.error("Error al guardar el pedido:", error);
        throw new Error("No pudimos registrar tu pedido. Intenta de nuevo.");
      }
    });
  }
  static \u0275fac = function CheckoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CheckoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CheckoutComponent, selectors: [["app-checkout"]], decls: 62, vars: 37, consts: [[1, "checkout-container"], [1, "checkout-grid"], [1, "checkout-card"], [1, "checkout-card-inner"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "form-section"], ["formGroupName", "contactInfo", 1, "row"], [1, "col-md-6", "form-group"], ["for", "firstName", 1, "form-label"], ["type", "text", "id", "firstName", "formControlName", "firstName", 1, "form-control", 3, "ngClass"], [1, "invalid-feedback"], ["for", "lastName", 1, "form-label"], ["type", "text", "id", "lastName", "formControlName", "lastName", 1, "form-control", 3, "ngClass"], [1, "col-12", "form-group"], ["for", "email", 1, "form-label"], ["type", "email", "id", "email", "formControlName", "email", 1, "form-control", 3, "ngClass"], ["for", "phone", 1, "form-label"], ["type", "tel", "id", "phone", "formControlName", "phone", "placeholder", "Ej: 1122334455", 1, "form-control", 3, "ngClass"], ["formGroupName", "shippingInfo", 1, "row"], ["for", "address", 1, "form-label"], ["type", "text", "id", "address", "formControlName", "address", 1, "form-control", 3, "ngClass"], ["for", "city", 1, "form-label"], ["type", "text", "id", "city", "formControlName", "city", 1, "form-control", 3, "ngClass"], ["for", "zipCode", 1, "form-label"], ["type", "text", "id", "zipCode", "formControlName", "zipCode", 1, "form-control", 3, "ngClass"], ["for", "province", 1, "form-label"], ["type", "text", "id", "province", "formControlName", "province", 1, "form-control", 3, "ngClass"], [1, "summary-column"], [3, "items", "total"], ["type", "button", 1, "btn", "btn-primary", "w-100", "mt-3", "btn-lg", 3, "click", "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm"]], template: function CheckoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h1");
      \u0275\u0275text(2, "Finalizar Compra");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 1)(4, "div", 2)(5, "div", 3)(6, "form", 4);
      \u0275\u0275listener("ngSubmit", function CheckoutComponent_Template_form_ngSubmit_6_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(7, "section", 5)(8, "h2");
      \u0275\u0275text(9, "1. Informaci\xF3n de Contacto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "label", 8);
      \u0275\u0275text(13, "Nombre");
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "input", 9);
      \u0275\u0275conditionalCreate(15, CheckoutComponent_Conditional_15_Template, 3, 2, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 7)(17, "label", 11);
      \u0275\u0275text(18, "Apellido");
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "input", 12);
      \u0275\u0275conditionalCreate(20, CheckoutComponent_Conditional_20_Template, 3, 2, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 13)(22, "label", 14);
      \u0275\u0275text(23, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "input", 15);
      \u0275\u0275conditionalCreate(25, CheckoutComponent_Conditional_25_Template, 3, 2, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "div", 13)(27, "label", 16);
      \u0275\u0275text(28, "Tel\xE9fono");
      \u0275\u0275elementEnd();
      \u0275\u0275element(29, "input", 17);
      \u0275\u0275conditionalCreate(30, CheckoutComponent_Conditional_30_Template, 3, 2, "div", 10);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(31, "section", 5)(32, "h2");
      \u0275\u0275text(33, "2. Direcci\xF3n de Env\xEDo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 18)(35, "div", 13)(36, "label", 19);
      \u0275\u0275text(37, "Direcci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275element(38, "input", 20);
      \u0275\u0275conditionalCreate(39, CheckoutComponent_Conditional_39_Template, 2, 1, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div", 7)(41, "label", 21);
      \u0275\u0275text(42, "Ciudad");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "input", 22);
      \u0275\u0275conditionalCreate(44, CheckoutComponent_Conditional_44_Template, 2, 1, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 7)(46, "label", 23);
      \u0275\u0275text(47, "C\xF3digo Postal");
      \u0275\u0275elementEnd();
      \u0275\u0275element(48, "input", 24);
      \u0275\u0275conditionalCreate(49, CheckoutComponent_Conditional_49_Template, 2, 1, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 13)(51, "label", 25);
      \u0275\u0275text(52, "Provincia");
      \u0275\u0275elementEnd();
      \u0275\u0275element(53, "input", 26);
      \u0275\u0275conditionalCreate(54, CheckoutComponent_Conditional_54_Template, 2, 1, "div", 10);
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(55, "div", 27)(56, "div", 2)(57, "div", 3);
      \u0275\u0275element(58, "app-order-summary", 28);
      \u0275\u0275elementStart(59, "button", 29);
      \u0275\u0275listener("click", function CheckoutComponent_Template_button_click_59_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275conditionalCreate(60, CheckoutComponent_Conditional_60_Template, 3, 0)(61, CheckoutComponent_Conditional_61_Template, 2, 0, "span");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("formGroup", ctx.checkoutForm);
      \u0275\u0275advance(8);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(21, _c0, ctx.contactControls["firstName"].invalid && ctx.contactControls["firstName"].touched));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.contactControls["firstName"].invalid && ctx.contactControls["firstName"].touched ? 15 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(23, _c0, ctx.contactControls["lastName"].invalid && ctx.contactControls["lastName"].touched));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.contactControls["lastName"].invalid && ctx.contactControls["lastName"].touched ? 20 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(25, _c0, ctx.contactControls["email"].invalid && ctx.contactControls["email"].touched));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.contactControls["email"].invalid && ctx.contactControls["email"].touched ? 25 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(27, _c0, ctx.contactControls["phone"].invalid && ctx.contactControls["phone"].touched));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.contactControls["phone"].invalid && ctx.contactControls["phone"].touched ? 30 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(29, _c0, ctx.shippingControls["address"].invalid && ctx.shippingControls["address"].touched));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.shippingControls["address"].invalid && ctx.shippingControls["address"].touched ? 39 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(31, _c0, ctx.shippingControls["city"].invalid && ctx.shippingControls["city"].touched));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.shippingControls["city"].invalid && ctx.shippingControls["city"].touched ? 44 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(33, _c0, ctx.shippingControls["zipCode"].invalid && ctx.shippingControls["zipCode"].touched));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.shippingControls["zipCode"].invalid && ctx.shippingControls["zipCode"].touched ? 49 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(35, _c0, ctx.shippingControls["province"].invalid && ctx.shippingControls["province"].touched));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.shippingControls["province"].invalid && ctx.shippingControls["province"].touched ? 54 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("items", ctx.cartService.cart().items)("total", ctx.cartService.cart().total);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.checkoutForm.invalid || ctx.isProcessingPayment());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isProcessingPayment() ? 60 : 61);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    RouterModule,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    FormGroupName,
    OrderSummaryComponent
  ], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  background-color: #f4f5f7;\n  min-height: calc(100vh - 80px);\n}\n@keyframes _ngcontent-%COMP%_rotate-gradient {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.checkout-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem 1.5rem;\n}\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2.5rem;\n  font-size: 1.75rem;\n  font-weight: 600;\n  color: #0b0b0b;\n}\n.checkout-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 2rem;\n  align-items: flex-start;\n}\n@media (min-width: 992px) {\n  .checkout-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 2fr 1fr;\n  }\n}\n.checkout-card[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  border-radius: 8px;\n  overflow: hidden;\n  padding: 2px;\n  background: #eee;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.checkout-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  z-index: -2;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722,\n      #fd7e14);\n  opacity: 1;\n}\n.checkout-card-inner[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-radius: 6px;\n  overflow: hidden;\n  padding: 2.5rem;\n}\n.summary-column[_ngcontent-%COMP%]   .checkout-card[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 2rem;\n}\n.form-section[_ngcontent-%COMP%] {\n  margin-bottom: 2.5rem;\n}\n.form-section[_ngcontent-%COMP%]:last-of-type {\n  margin-bottom: 0;\n}\n.form-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n  border-bottom: 1px solid #e6e9ec;\n  padding-bottom: 0.75rem;\n  color: #333;\n}\n.form-label[_ngcontent-%COMP%] {\n  color: #333;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  color: #dc3545;\n  font-size: 0.875em;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.85rem;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  text-align: center;\n  text-decoration: none;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 15px rgba(255, 87, 34, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  background: #ced4da;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=checkout.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckoutComponent, [{
    type: Component,
    args: [{ selector: "app-checkout", standalone: true, imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      OrderSummaryComponent
    ], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="checkout-container">
  <h1>Finalizar Compra</h1>
  <div class="checkout-grid">

    <div class="checkout-card">
      <div class="checkout-card-inner">
        <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" novalidate>
          <section class="form-section">
            <h2>1. Informaci\xF3n de Contacto</h2>
            <div formGroupName="contactInfo" class="row">
              <div class="col-md-6 form-group">
                <label for="firstName" class="form-label">Nombre</label>
                <input type="text" id="firstName" formControlName="firstName" class="form-control" [ngClass]="{ 'is-invalid': contactControls['firstName'].invalid && contactControls['firstName'].touched }">
                @if (contactControls['firstName'].invalid && contactControls['firstName'].touched) {
                  <div class="invalid-feedback">
                    @if (contactControls['firstName'].errors?.['required']) {
                      <div>El nombre es requerido.</div>
                    }
                    @if (contactControls['firstName'].errors?.['minlength']) {
                      <div>Debe tener al menos 2 caracteres.</div>
                    }
                  </div>
                }
              </div>
              <div class="col-md-6 form-group">
                <label for="lastName" class="form-label">Apellido</label>
                <input type="text" id="lastName" formControlName="lastName" class="form-control" [ngClass]="{ 'is-invalid': contactControls['lastName'].invalid && contactControls['lastName'].touched }">
                @if (contactControls['lastName'].invalid && contactControls['lastName'].touched) {
                  <div class="invalid-feedback">
                    @if (contactControls['lastName'].errors?.['required']) {
                      <div>El apellido es requerido.</div>
                    }
                    @if (contactControls['lastName'].errors?.['minlength']) {
                      <div>Debe tener al menos 2 caracteres.</div>
                    }
                  </div>
                }
              </div>
              <div class="col-12 form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': contactControls['email'].invalid && contactControls['email'].touched }">
                @if (contactControls['email'].invalid && contactControls['email'].touched) {
                  <div class="invalid-feedback">
                    @if (contactControls['email'].errors?.['required']) {
                      <div>El email es requerido.</div>
                    }
                    @if (contactControls['email'].errors?.['email']) {
                      <div>El formato del email no es v\xE1lido.</div>
                    }
                  </div>
                }
              </div>
              <div class="col-12 form-group">
                <label for="phone" class="form-label">Tel\xE9fono</label>
                <input type="tel" id="phone" formControlName="phone" class="form-control" placeholder="Ej: 1122334455" [ngClass]="{ 'is-invalid': contactControls['phone'].invalid && contactControls['phone'].touched }">
                @if (contactControls['phone'].invalid && contactControls['phone'].touched) {
                  <div class="invalid-feedback">
                    @if (contactControls['phone'].errors?.['required']) {
                      <div>El tel\xE9fono es requerido.</div>
                    }
                    @if (contactControls['phone'].errors?.['pattern']) {
                      <div>Ingresa un n\xFAmero de tel\xE9fono v\xE1lido.</div>
                    }
                  </div>
                }
              </div>
            </div>
          </section>

          <section class="form-section">
            <h2>2. Direcci\xF3n de Env\xEDo</h2>
            <div formGroupName="shippingInfo" class="row">
              <div class="col-12 form-group">
                <label for="address" class="form-label">Direcci\xF3n</label>
                <input type="text" id="address" formControlName="address" class="form-control" [ngClass]="{ 'is-invalid': shippingControls['address'].invalid && shippingControls['address'].touched }">
                @if (shippingControls['address'].invalid && shippingControls['address'].touched) {
                  <div class="invalid-feedback">
                    @if (shippingControls['address'].errors?.['required']) {
                      <div>La direcci\xF3n es requerida.</div>
                    }
                  </div>
                }
              </div>
              <div class="col-md-6 form-group">
                <label for="city" class="form-label">Ciudad</label>
                <input type="text" id="city" formControlName="city" class="form-control" [ngClass]="{ 'is-invalid': shippingControls['city'].invalid && shippingControls['city'].touched }">
                @if (shippingControls['city'].invalid && shippingControls['city'].touched) {
                  <div class="invalid-feedback">
                    @if (shippingControls['city'].errors?.['required']) {
                      <div>La ciudad es requerida.</div>
                    }
                  </div>
                }
              </div>
              <div class="col-md-6 form-group">
                <label for="zipCode" class="form-label">C\xF3digo Postal</label>
                <input type="text" id="zipCode" formControlName="zipCode" class="form-control" [ngClass]="{ 'is-invalid': shippingControls['zipCode'].invalid && shippingControls['zipCode'].touched }">
                @if (shippingControls['zipCode'].invalid && shippingControls['zipCode'].touched) {
                  <div class="invalid-feedback">
                    @if (shippingControls['zipCode'].errors?.['required']) {
                      <div>El c\xF3digo postal es requerido.</div>
                    }
                  </div>
                }
              </div>
              <div class="col-12 form-group">
                <label for="province" class="form-label">Provincia</label>
                <input type="text" id="province" formControlName="province" class="form-control" [ngClass]="{ 'is-invalid': shippingControls['province'].invalid && shippingControls['province'].touched }">
                @if (shippingControls['province'].invalid && shippingControls['province'].touched) {
                  <div class="invalid-feedback">
                    @if (shippingControls['province'].errors?.['required']) {
                      <div>La provincia es requerida.</div>
                    }
                  </div>
                }
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>

    <div class="summary-column">
      <div class="checkout-card">
        <div class="checkout-card-inner">
          <app-order-summary [items]="cartService.cart().items" [total]="cartService.cart().total"></app-order-summary>
          <button
            type="button"
            class="btn btn-primary w-100 mt-3 btn-lg"
            (click)="onSubmit()"
            [disabled]="checkoutForm.invalid || isProcessingPayment()">
            @if (isProcessingPayment()) {
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span>Procesando pago...</span>
            } @else {
              <span>Pagar con Mercado Pago</span>
            }
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`, styles: ['/* src/app/features/shop/components/checkout/checkout.component.scss */\n:host {\n  display: block;\n  background-color: #f4f5f7;\n  min-height: calc(100vh - 80px);\n}\n@keyframes rotate-gradient {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.checkout-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem 1.5rem;\n}\nh1 {\n  text-align: center;\n  margin-bottom: 2.5rem;\n  font-size: 1.75rem;\n  font-weight: 600;\n  color: #0b0b0b;\n}\n.checkout-grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 2rem;\n  align-items: flex-start;\n}\n@media (min-width: 992px) {\n  .checkout-grid {\n    grid-template-columns: 2fr 1fr;\n  }\n}\n.checkout-card {\n  position: relative;\n  z-index: 1;\n  border-radius: 8px;\n  overflow: hidden;\n  padding: 2px;\n  background: #eee;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.checkout-card::before {\n  content: "";\n  position: absolute;\n  z-index: -2;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722,\n      #fd7e14);\n  opacity: 1;\n}\n.checkout-card-inner {\n  background-color: #ffffff;\n  border-radius: 6px;\n  overflow: hidden;\n  padding: 2.5rem;\n}\n.summary-column .checkout-card {\n  position: sticky;\n  top: 2rem;\n}\n.form-section {\n  margin-bottom: 2.5rem;\n}\n.form-section:last-of-type {\n  margin-bottom: 0;\n}\n.form-section h2 {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n  border-bottom: 1px solid #e6e9ec;\n  padding-bottom: 0.75rem;\n  color: #333;\n}\n.form-label {\n  color: #333;\n}\n.form-group {\n  margin-bottom: 1.25rem;\n}\n.invalid-feedback {\n  display: block;\n  color: #dc3545;\n  font-size: 0.875em;\n}\n.btn-primary {\n  width: 100%;\n  padding: 0.85rem;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  text-align: center;\n  text-decoration: none;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.btn-primary:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 15px rgba(255, 87, 34, 0.3);\n}\n.btn-primary:disabled {\n  background: #ced4da;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=checkout.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CheckoutComponent, { className: "CheckoutComponent", filePath: "src/app/features/shop/components/checkout/checkout.component.ts", lineNumber: 27 });
})();
export {
  CheckoutComponent
};
//# sourceMappingURL=chunk-Y2TGGH5Z.js.map
