import {
  BsModalRef,
  BsModalService
} from "./chunk-2OBKN7QP.js";
import {
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
  ActivatedRoute,
  Router,
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
  Pipe,
  TitleCasePipe,
  inject,
  of,
  setClassMetadata,
  switchMap,
  tap,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefinePipe,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinterpolate,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/shared/pipes/sum-items/sum-items.pipe.ts
var SumItemsPipe = class _SumItemsPipe {
  transform(items, priceKey, quantityKey) {
    if (!items || items.length === 0) {
      return 0;
    }
    return items.reduce((sum, item) => {
      const price = Number(item[priceKey]);
      const quantity = Number(item[quantityKey]);
      if (isNaN(price) || isNaN(quantity)) {
        console.warn(`SumItemsPipe: Valor no num\xE9rico encontrado para ${priceKey} o ${quantityKey} en un item.`, item);
        return sum;
      }
      return sum + price * quantity;
    }, 0);
  }
  static \u0275fac = function SumItemsPipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SumItemsPipe)();
  };
  static \u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "sumItems", type: _SumItemsPipe, pure: true });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SumItemsPipe, [{
    type: Pipe,
    args: [{
      name: "sumItems",
      standalone: true
    }]
  }], null, null);
})();

// src/app/features/admin/components/orders/receipt-modal/receipt-modal.component.ts
var _forTrack0 = ($index, $item) => $item.variantId;
function ReceiptModalComponent_Conditional_0_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "td", 14);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "td", 15);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "td", 15);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.productName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(7, 4, item_r3.price, "ARS", "$"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(10, 8, ctx_r1.getItemSubtotal(item_r3), "ARS", "$"));
  }
}
function ReceiptModalComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "h4", 1);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "button", 2);
    \u0275\u0275domListener("click", function ReceiptModalComponent_Conditional_0_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275domElementStart(4, "span", 3);
    \u0275\u0275text(5, "\xD7");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(6, "div", 4)(7, "div", 5)(8, "div", 6)(9, "h2", 7);
    \u0275\u0275text(10, "Kasa Kalle");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(11, "div", 8)(12, "p")(13, "strong");
    \u0275\u0275text(14, "Recibo #:");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(15);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(16, "p")(17, "strong");
    \u0275\u0275text(18, "Fecha de Emisi\xF3n:");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(21, "p")(22, "strong");
    \u0275\u0275text(23, "Fecha del Pedido:");
    \u0275\u0275domElementEnd();
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "date");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElement(26, "hr");
    \u0275\u0275domElementStart(27, "div", 9)(28, "div", 10)(29, "h5");
    \u0275\u0275text(30, "Facturado a:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(31, "p")(32, "strong");
    \u0275\u0275text(33);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(34, "p");
    \u0275\u0275text(35);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(36, "p");
    \u0275\u0275text(37);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(38, "div", 11)(39, "h5");
    \u0275\u0275text(40, "Enviado a:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(41, "address");
    \u0275\u0275text(42);
    \u0275\u0275domElement(43, "br");
    \u0275\u0275text(44);
    \u0275\u0275domElement(45, "br");
    \u0275\u0275text(46);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(47, "div", 12)(48, "table", 13)(49, "thead")(50, "tr")(51, "th");
    \u0275\u0275text(52, "Producto");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(53, "th", 14);
    \u0275\u0275text(54, "Cantidad");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(55, "th", 15);
    \u0275\u0275text(56, "Precio Unit.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(57, "th", 15);
    \u0275\u0275text(58, "Subtotal");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(59, "tbody");
    \u0275\u0275repeaterCreate(60, ReceiptModalComponent_Conditional_0_For_61_Template, 11, 12, "tr", null, _forTrack0);
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(62, "div", 16)(63, "table", 13)(64, "tbody")(65, "tr")(66, "td");
    \u0275\u0275text(67, "Subtotal:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(68, "td", 15);
    \u0275\u0275text(69);
    \u0275\u0275pipe(70, "sumItems");
    \u0275\u0275pipe(71, "currency");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(72, "tr")(73, "td");
    \u0275\u0275text(74, "Env\xEDo:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(75, "td", 15);
    \u0275\u0275text(76);
    \u0275\u0275pipe(77, "currency");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(78, "tr")(79, "td");
    \u0275\u0275text(80, "Impuestos:");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(81, "td", 15);
    \u0275\u0275text(82);
    \u0275\u0275pipe(83, "currency");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(84, "tr", 17)(85, "td")(86, "strong");
    \u0275\u0275text(87, "Total:");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(88, "td", 15)(89, "strong");
    \u0275\u0275text(90);
    \u0275\u0275pipe(91, "currency");
    \u0275\u0275domElementEnd()()()()()()();
    \u0275\u0275domElementStart(92, "div", 18)(93, "button", 19);
    \u0275\u0275domListener("click", function ReceiptModalComponent_Conditional_0_Template_button_click_93_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275text(94, "Cerrar");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(95, "button", 20);
    \u0275\u0275domListener("click", function ReceiptModalComponent_Conditional_0_Template_button_click_95_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.printReceipt());
    });
    \u0275\u0275domElement(96, "i", 21);
    \u0275\u0275text(97, "Imprimir");
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.title, " #", ctx_r1.order.id);
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate1(" ", ctx_r1.order.id);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(20, 17, ctx_r1.today, "dd/MM/yyyy"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(25, 20, ctx_r1.order.orderDate, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.order.clientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.order.clientEmail);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.order.clientPhone);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.order.shippingAddress.street);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", ctx_r1.order.shippingAddress.city, ", ", ctx_r1.order.shippingAddress.state, " ", ctx_r1.order.shippingAddress.zipCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.order.shippingAddress.country, " ");
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r1.order.items);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(71, 27, (ctx_r1.order.paymentDetails == null ? null : ctx_r1.order.paymentDetails.subtotal) || \u0275\u0275pipeBind3(70, 23, ctx_r1.order.items, "price", "quantity"), "ARS", "$"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(77, 31, (ctx_r1.order.paymentDetails == null ? null : ctx_r1.order.paymentDetails.shippingCost) || 0, "ARS", "$"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(83, 35, (ctx_r1.order.paymentDetails == null ? null : ctx_r1.order.paymentDetails.taxAmount) || 0, "ARS", "$"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(91, 39, ctx_r1.order.total, "ARS", "$"));
  }
}
function ReceiptModalComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "h4", 1);
    \u0275\u0275text(2, "Error");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "button", 2);
    \u0275\u0275domListener("click", function ReceiptModalComponent_Conditional_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275domElementStart(4, "span", 3);
    \u0275\u0275text(5, "\xD7");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(6, "div", 22)(7, "div", 23);
    \u0275\u0275text(8, "No se pudieron cargar los datos del recibo.");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(9, "div", 18)(10, "button", 19);
    \u0275\u0275domListener("click", function ReceiptModalComponent_Conditional_1_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275text(11, "Cerrar");
    \u0275\u0275domElementEnd()();
  }
}
var ReceiptModalComponent = class _ReceiptModalComponent {
  bsModalRef = inject(BsModalRef);
  title = "Recibo de Pedido";
  order;
  today = /* @__PURE__ */ new Date();
  getItemSubtotal(item) {
    return item.quantity * item.price;
  }
  close() {
    this.bsModalRef.hide();
  }
  printReceipt() {
    window.print();
  }
  static \u0275fac = function ReceiptModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReceiptModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReceiptModalComponent, selectors: [["app-receipt-modal"]], decls: 2, vars: 1, consts: [[1, "modal-header"], [1, "modal-title", "pull-left"], ["type", "button", "aria-label", "Close", 1, "btn-close", "btn-close-white", "close", "pull-right", 3, "click"], ["aria-hidden", "true", 1, "visually-hidden"], [1, "modal-body", "receipt-body"], [1, "receipt-header"], [1, "store-details"], [1, "store-name"], [1, "receipt-details"], [1, "customer-details"], [1, "billed-to"], [1, "shipped-to"], [1, "items-table"], [1, "table"], [1, "text-center"], [1, "text-end"], [1, "totals-summary"], [1, "total-row"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "bi", "bi-printer", "me-2"], [1, "modal-body"], [1, "alert", "alert-danger"]], template: function ReceiptModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ReceiptModalComponent_Conditional_0_Template, 98, 43)(1, ReceiptModalComponent_Conditional_1_Template, 12, 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.order ? 0 : 1);
    }
  }, dependencies: [CommonModule, CurrencyPipe, DatePipe, SumItemsPipe], styles: ['\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.modal-receipt-wrapper[_nghost-%COMP%]     .modal-content, .modal-receipt-wrapper   [_nghost-%COMP%]     .modal-content {\n  position: relative;\n  border: none;\n  border-radius: 1rem;\n  overflow: hidden;\n  background-color: transparent;\n}\n.modal-receipt-wrapper[_nghost-%COMP%]     .modal-content::before, .modal-receipt-wrapper   [_nghost-%COMP%]     .modal-content::before {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  padding: 2px;\n  border-radius: inherit;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n  -webkit-mask-composite: xor;\n  mask-composite: exclude;\n}\n.modal-header[_ngcontent-%COMP%] {\n  background-color: #21213b;\n  color: #f8f9fa;\n  border-bottom: 2px solid #7b68ee;\n}\n.modal-body[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  background-color: #21213b;\n  border-top: 1px solid rgba(248, 249, 250, 0.1);\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  border: none;\n}\n.receipt-body[_ngcontent-%COMP%] {\n  font-family: "Inter", sans-serif;\n  color: #333;\n  padding: 2rem;\n}\n.receipt-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 1.5rem;\n}\n.receipt-header[_ngcontent-%COMP%]   .store-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #007bff;\n}\n.receipt-header[_ngcontent-%COMP%]   .receipt-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  text-align: right;\n  font-size: 0.9rem;\n}\n.customer-details[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 2rem;\n  margin-bottom: 2rem;\n}\n.customer-details[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #555;\n  border-bottom: 1px solid #eee;\n  padding-bottom: 0.5rem;\n  margin-bottom: 1rem;\n}\n.customer-details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.customer-details[_ngcontent-%COMP%]   address[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.6;\n}\n.items-table[_ngcontent-%COMP%], \n.totals-summary[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.items-table[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.totals-summary[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  font-weight: 600;\n}\n.items-table[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.items-table[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.totals-summary[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.totals-summary[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  border-color: #dee2e6;\n  vertical-align: middle;\n}\n.totals-summary[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.totals-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%] {\n  width: 40%;\n  min-width: 280px;\n}\n.totals-summary[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border: none;\n}\n.totals-summary[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  background-color: #f8f9fa;\n}\n@media print {\n  body[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n    visibility: hidden;\n  }\n  .receipt-body[_ngcontent-%COMP%], \n   .receipt-body[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n    visibility: visible;\n  }\n  .receipt-body[_ngcontent-%COMP%] {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    padding: 1rem;\n    margin: 0;\n    box-shadow: none;\n    border: none;\n  }\n  .modal-header[_ngcontent-%COMP%], \n   .modal-footer[_ngcontent-%COMP%] {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=receipt-modal.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReceiptModalComponent, [{
    type: Component,
    args: [{ selector: "app-receipt-modal", standalone: true, imports: [CommonModule, CurrencyPipe, DatePipe, SumItemsPipe], template: `@if (order) {
  <div class="modal-header">
    <h4 class="modal-title pull-left">{{ title }} #{{ order.id }}</h4>
    <button type="button" class="btn-close btn-close-white close pull-right" aria-label="Close" (click)="close()">
      <span aria-hidden="true" class="visually-hidden">&times;</span>
    </button>
  </div>

  <div class="modal-body receipt-body">
    <div class="receipt-header">
      <div class="store-details">
        <h2 class="store-name">Kasa Kalle</h2>
      </div>
      <div class="receipt-details">
        <p><strong>Recibo #:</strong> {{ order.id }}</p>
        <p><strong>Fecha de Emisi\xF3n:</strong> {{ today | date:'dd/MM/yyyy' }}</p>
        <p><strong>Fecha del Pedido:</strong> {{ order.orderDate | date:'dd/MM/yyyy HH:mm' }}</p>
      </div>
    </div>

    <hr>

    <div class="customer-details">
      <div class="billed-to">
        <h5>Facturado a:</h5>
        <p><strong>{{ order.clientName }}</strong></p>
        <p>{{ order.clientEmail }}</p>
        <p>{{ order.clientPhone }}</p>
      </div>
      <div class="shipped-to">
        <h5>Enviado a:</h5>
        <address>
          {{ order.shippingAddress.street }}<br>
          {{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.zipCode }}<br>
          {{ order.shippingAddress.country }}
        </address>
      </div>
    </div>

    <div class="items-table">
      <table class="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th class="text-center">Cantidad</th>
            <th class="text-end">Precio Unit.</th>
            <th class="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          @for(item of order.items; track item.variantId) {
            <tr>
              <td>{{ item.productName }}</td>
              <td class="text-center">{{ item.quantity }}</td>
              <td class="text-end">{{ item.price | currency:'ARS':'$' }}</td>
              <td class="text-end">{{ getItemSubtotal(item) | currency:'ARS':'$' }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    <div class="totals-summary">
      <table class="table">
        <tbody>
          <tr>
            <td>Subtotal:</td>
            <td class="text-end">{{ order.paymentDetails?.subtotal || (order.items | sumItems:'price':'quantity') | currency:'ARS':'$' }}</td>
          </tr>
          <tr>
            <td>Env\xEDo:</td>
            <td class="text-end">{{ order.paymentDetails?.shippingCost || 0 | currency:'ARS':'$' }}</td>
          </tr>
          <tr>
            <td>Impuestos:</td>
            <td class="text-end">{{ order.paymentDetails?.taxAmount || 0 | currency:'ARS':'$' }}</td>
          </tr>
          <tr class="total-row">
            <td><strong>Total:</strong></td>
            <td class="text-end"><strong>{{ order.total | currency:'ARS':'$' }}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" (click)="close()">Cerrar</button>
    <button type="button" class="btn btn-primary" (click)="printReceipt()"><i class="bi bi-printer me-2"></i>Imprimir</button>
  </div>
} @else {
  <div class="modal-header">
    <h4 class="modal-title pull-left">Error</h4>
    <button type="button" class="btn-close btn-close-white close pull-right" aria-label="Close" (click)="close()">
      <span aria-hidden="true" class="visually-hidden">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div class="alert alert-danger">No se pudieron cargar los datos del recibo.</div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" (click)="close()">Cerrar</button>
  </div>
}`, styles: ['/* src/app/features/admin/components/orders/receipt-modal/receipt-modal.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n:host-context(.modal-receipt-wrapper) ::ng-deep .modal-content {\n  position: relative;\n  border: none;\n  border-radius: 1rem;\n  overflow: hidden;\n  background-color: transparent;\n}\n:host-context(.modal-receipt-wrapper) ::ng-deep .modal-content::before {\n  content: "";\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  padding: 2px;\n  border-radius: inherit;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n  -webkit-mask-composite: xor;\n  mask-composite: exclude;\n}\n.modal-header {\n  background-color: #21213b;\n  color: #f8f9fa;\n  border-bottom: 2px solid #7b68ee;\n}\n.modal-body {\n  background-color: #fff;\n}\n.modal-footer {\n  background-color: #21213b;\n  border-top: 1px solid rgba(248, 249, 250, 0.1);\n}\n.modal-footer .btn-primary {\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  border: none;\n}\n.receipt-body {\n  font-family: "Inter", sans-serif;\n  color: #333;\n  padding: 2rem;\n}\n.receipt-header {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 1.5rem;\n}\n.receipt-header .store-name {\n  font-weight: 700;\n  color: #007bff;\n}\n.receipt-header .receipt-details p {\n  margin: 0;\n  text-align: right;\n  font-size: 0.9rem;\n}\n.customer-details {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 2rem;\n  margin-bottom: 2rem;\n}\n.customer-details h5 {\n  font-weight: 600;\n  color: #555;\n  border-bottom: 1px solid #eee;\n  padding-bottom: 0.5rem;\n  margin-bottom: 1rem;\n}\n.customer-details p,\n.customer-details address {\n  margin: 0;\n  line-height: 1.6;\n}\n.items-table,\n.totals-summary {\n  margin-bottom: 1.5rem;\n}\n.items-table .table th,\n.totals-summary .table th {\n  background-color: #f8f9fa;\n  font-weight: 600;\n}\n.items-table .table td,\n.items-table .table th,\n.totals-summary .table td,\n.totals-summary .table th {\n  border-color: #dee2e6;\n  vertical-align: middle;\n}\n.totals-summary {\n  display: flex;\n  justify-content: flex-end;\n}\n.totals-summary table {\n  width: 40%;\n  min-width: 280px;\n}\n.totals-summary table td {\n  border: none;\n}\n.totals-summary .total-row {\n  font-size: 1.2rem;\n  background-color: #f8f9fa;\n}\n@media print {\n  body * {\n    visibility: hidden;\n  }\n  .receipt-body,\n  .receipt-body * {\n    visibility: visible;\n  }\n  .receipt-body {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    padding: 1rem;\n    margin: 0;\n    box-shadow: none;\n    border: none;\n  }\n  .modal-header,\n  .modal-footer {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=receipt-modal.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReceiptModalComponent, { className: "ReceiptModalComponent", filePath: "src/app/features/admin/components/orders/receipt-modal/receipt-modal.component.ts", lineNumber: 14 });
})();

// src/app/features/admin/components/orders/order-detail/order-detail.component.ts
var _forTrack02 = ($index, $item) => $item.variantId;
function OrderDetailComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("#", ctx.id);
  }
}
function OrderDetailComponent_Conditional_13_For_30_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Pendiente");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailComponent_Conditional_13_For_30_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Procesando");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailComponent_Conditional_13_For_30_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Enviado");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailComponent_Conditional_13_For_30_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Entregado");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailComponent_Conditional_13_For_30_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Cancelado");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailComponent_Conditional_13_For_30_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "titlecase");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, status_r3));
  }
}
function OrderDetailComponent_Conditional_13_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 23);
    \u0275\u0275conditionalCreate(1, OrderDetailComponent_Conditional_13_For_30_Case_1_Template, 2, 0, "span")(2, OrderDetailComponent_Conditional_13_For_30_Case_2_Template, 2, 0, "span")(3, OrderDetailComponent_Conditional_13_For_30_Case_3_Template, 2, 0, "span")(4, OrderDetailComponent_Conditional_13_For_30_Case_4_Template, 2, 0, "span")(5, OrderDetailComponent_Conditional_13_For_30_Case_5_Template, 2, 0, "span")(6, OrderDetailComponent_Conditional_13_For_30_Case_6_Template, 3, 3, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_13_0;
    const status_r3 = ctx.$implicit;
    \u0275\u0275property("value", status_r3);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_13_0 = status_r3) === "pending" ? 1 : tmp_13_0 === "processing" ? 2 : tmp_13_0 === "shipped" ? 3 : tmp_13_0 === "delivered" ? 4 : tmp_13_0 === "cancelled" ? 5 : 6);
  }
}
function OrderDetailComponent_Conditional_13_For_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275element(2, "img", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 43);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 44);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 45);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 46);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("alt", \u0275\u0275interpolate(item_r4.productName))("src", item_r4.productImage || "https://placehold.co/60x60/f0f0f0/6c757d?text=No+Img", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.productName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.quantity);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(9, 7, item_r4.price, "ARS", "$"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(12, 11, ctx_r1.getItemSubtotal(item_r4), "ARS", "$"));
  }
}
function OrderDetailComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 11)(2, "div", 12)(3, "div", 13)(4, "h5", 6);
    \u0275\u0275element(5, "i", 14);
    \u0275\u0275text(6, " Resumen del Pedido ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 3)(8, "div", 15)(9, "div", 16)(10, "p", 17)(11, "strong");
    \u0275\u0275text(12, "ID de Pedido:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 18);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "p", 19)(16, "strong");
    \u0275\u0275text(17, "Fecha:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 16)(21, "p", 17)(22, "strong");
    \u0275\u0275text(23, "M\xE9todo de Pago:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 20)(26, "strong", 21);
    \u0275\u0275text(27, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "select", 22);
    \u0275\u0275listener("change", function OrderDetailComponent_Conditional_13_Template_select_change_28_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onStatusChange($event));
    });
    \u0275\u0275repeaterCreate(29, OrderDetailComponent_Conditional_13_For_30_Template, 7, 2, "option", 23, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(31, "div", 11)(32, "div", 12)(33, "div", 13)(34, "h5", 6);
    \u0275\u0275element(35, "i", 24);
    \u0275\u0275text(36, " Informaci\xF3n del Cliente y Env\xEDo ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 3)(38, "div", 15)(39, "div", 16)(40, "h6");
    \u0275\u0275text(41, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "p", 25)(43, "strong");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "p", 25);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "p", 25);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 16)(50, "h6");
    \u0275\u0275text(51, "Direcci\xF3n de Env\xEDo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "address", 26);
    \u0275\u0275text(53);
    \u0275\u0275element(54, "br");
    \u0275\u0275text(55);
    \u0275\u0275element(56, "br");
    \u0275\u0275text(57);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(58, "div", 11)(59, "div", 12)(60, "div", 13)(61, "h5", 6);
    \u0275\u0275element(62, "i", 27);
    \u0275\u0275text(63, " Productos Comprados ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 3)(65, "div", 28)(66, "table", 29)(67, "thead")(68, "tr");
    \u0275\u0275element(69, "th", 30);
    \u0275\u0275elementStart(70, "th");
    \u0275\u0275text(71, "Producto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "th", 31);
    \u0275\u0275text(73, "Cantidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "th", 32);
    \u0275\u0275text(75, "Precio Unitario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "th", 32);
    \u0275\u0275text(77, "Subtotal");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(78, "tbody");
    \u0275\u0275repeaterCreate(79, OrderDetailComponent_Conditional_13_For_80_Template, 13, 15, "tr", null, _forTrack02);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(81, "div", 1)(82, "div", 12)(83, "div", 13)(84, "h5", 6);
    \u0275\u0275element(85, "i", 33);
    \u0275\u0275text(86, " Resumen de Costos ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(87, "div", 3)(88, "div", 34)(89, "div", 35)(90, "table", 36)(91, "tbody")(92, "tr")(93, "td");
    \u0275\u0275text(94, "Subtotal:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "td", 32);
    \u0275\u0275text(96);
    \u0275\u0275pipe(97, "sumItems");
    \u0275\u0275pipe(98, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(99, "tr")(100, "td");
    \u0275\u0275text(101, "Costo de Env\xEDo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "td", 32);
    \u0275\u0275text(103);
    \u0275\u0275pipe(104, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(105, "tr")(106, "td");
    \u0275\u0275text(107, "Impuestos:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(108, "td", 32);
    \u0275\u0275text(109);
    \u0275\u0275pipe(110, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(111, "tr", 37)(112, "td");
    \u0275\u0275text(113, "Total Pagado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(114, "td", 38);
    \u0275\u0275text(115);
    \u0275\u0275pipe(116, "currency");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(117, "div", 39)(118, "button", 40);
    \u0275\u0275listener("click", function OrderDetailComponent_Conditional_13_Template_button_click_118_listener() {
      const order_r5 = \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generateReceipt(order_r5));
    });
    \u0275\u0275element(119, "i", 41);
    \u0275\u0275text(120, " Ver Recibo ");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const order_r5 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate(order_r5.id);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(19, 16, order_r5.orderDate, "medium"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", (order_r5.paymentDetails == null ? null : order_r5.paymentDetails.paymentMethod) || "N/A");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r1.currentStatus);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.statusOptions);
    \u0275\u0275advance(15);
    \u0275\u0275textInterpolate(order_r5.clientName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r5.clientEmail || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(order_r5.clientPhone || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", order_r5.shippingAddress.street);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", order_r5.shippingAddress.city, ", ", order_r5.shippingAddress.state, " ", order_r5.shippingAddress.zipCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", order_r5.shippingAddress.country, " ");
    \u0275\u0275advance(22);
    \u0275\u0275repeater(order_r5.items);
    \u0275\u0275advance(17);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(98, 23, (order_r5.paymentDetails == null ? null : order_r5.paymentDetails.subtotal) || \u0275\u0275pipeBind3(97, 19, order_r5.items, "price", "quantity"), "ARS", "$"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(104, 27, (order_r5.paymentDetails == null ? null : order_r5.paymentDetails.shippingCost) || 0, "ARS", "$"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(110, 31, (order_r5.paymentDetails == null ? null : order_r5.paymentDetails.taxAmount) || 0, "ARS", "$"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(116, 35, order_r5.total, "ARS", "$"));
  }
}
function OrderDetailComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 47)(2, "span", 48);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
var OrderDetailComponent = class _OrderDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  orderService = inject(OrderService);
  modalService = inject(BsModalService);
  bsModalRef;
  order$;
  orderId = null;
  pageTitle = "Detalles del Pedido";
  currentStatus = "pending";
  statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];
  ngOnInit() {
    this.order$ = this.route.paramMap.pipe(switchMap((params) => {
      this.orderId = params.get("id");
      if (this.orderId) {
        return this.orderService.getOrderById(this.orderId).pipe(tap((order) => {
          if (order) {
            this.currentStatus = order.status;
          } else {
            this.pageTitle = "Pedido No Encontrado";
          }
        }));
      } else {
        this.pageTitle = "Error: ID de Pedido Faltante";
        this.router.navigate(["/admin/orders"]);
        return of(void 0);
      }
    }));
  }
  goBack() {
    this.router.navigate(["/admin/orders"]);
  }
  onStatusChange(event) {
    const newStatus = event.target.value;
    if (this.orderId && newStatus !== this.currentStatus) {
      this.orderService.updateOrder(this.orderId, { status: newStatus }).then(() => {
        this.currentStatus = newStatus;
      }).catch((error) => {
        console.error("Error al actualizar el estado del pedido:", error);
      });
    }
  }
  getItemSubtotal(item) {
    return item.quantity * item.price;
  }
  generateReceipt(order) {
    const initialState = {
      order,
      title: `Recibo del Pedido`
    };
    this.bsModalRef = this.modalService.show(ReceiptModalComponent, {
      initialState,
      class: "modal-lg modal-dialog-centered modal-receipt-wrapper",
      backdrop: "static"
    });
  }
  static \u0275fac = function OrderDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderDetailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderDetailComponent, selectors: [["app-order-details"]], decls: 16, vars: 7, consts: [[1, "container-fluid", "my-4"], [1, "card-gradient-wrapper"], [1, "card", "list-card", "shadow-sm"], [1, "card-body"], [1, "d-flex", "justify-content-between", "align-items-center", "gap-3", "mb-4"], [1, "page-title-container"], [1, "card-title", "mb-0"], [1, "text-muted", "truncate-text", "order-id-subtitle"], [1, "btn", "btn-outline-secondary", "btn-sm", 3, "click"], [1, "bi", "bi-arrow-left"], [1, "text-center", "text-muted-custom", "py-5"], [1, "card-gradient-wrapper", "mb-4"], [1, "card", "details-sub-card"], [1, "card-header"], [1, "bi", "bi-card-list", "me-2"], [1, "row"], [1, "col-md-6"], [1, "card-text"], [1, "truncate-text"], [1, "card-text", "mb-md-0"], [1, "d-flex", "align-items-center", "flex-wrap"], [1, "me-2"], [1, "form-select", "form-select-sm", "d-inline-block", "w-auto", 3, "change", "ngModel"], [3, "value"], [1, "bi", "bi-truck", "me-2"], [1, "mb-1"], [1, "mb-0"], [1, "bi", "bi-box-seam", "me-2"], [1, "table-responsive"], [1, "table", "table-hover", "align-middle", "details-table", "mb-0"], [2, "width", "80px"], [1, "text-center"], [1, "text-end"], [1, "bi", "bi-cash-coin", "me-2"], [1, "row", "justify-content-end"], [1, "col-lg-5"], [1, "table", "table-borderless", "table-sm", "mb-0", "summary-table"], [1, "fw-bold", "total-row"], ["classD", "text-end"], [1, "d-flex", "justify-content-end", "mt-3"], [1, "btn", "btn-secondary", 3, "click"], [1, "bi", "bi-receipt"], [1, "img-fluid", "rounded", 3, "src", "alt"], ["data-label", "Producto"], ["data-label", "Cantidad", 1, "text-center"], ["data-label", "Precio Unitario", 1, "text-end"], ["data-label", "Subtotal", 1, "text-end"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"]], template: function OrderDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "h2", 6);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, OrderDetailComponent_Conditional_8_Template, 2, 1, "small", 7);
      \u0275\u0275pipe(9, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "button", 8);
      \u0275\u0275listener("click", function OrderDetailComponent_Template_button_click_10_listener() {
        return ctx.goBack();
      });
      \u0275\u0275element(11, "i", 9);
      \u0275\u0275text(12, " Volver a la lista ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(13, OrderDetailComponent_Conditional_13_Template, 121, 39, "div");
      \u0275\u0275pipe(14, "async");
      \u0275\u0275conditionalBranchCreate(15, OrderDetailComponent_Conditional_15_Template, 4, 0, "div", 10);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.pageTitle);
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(9, 3, ctx.order$)) ? 8 : -1, tmp_1_0);
      \u0275\u0275advance(5);
      \u0275\u0275conditional((tmp_2_0 = \u0275\u0275pipeBind1(14, 5, ctx.order$)) ? 13 : 15, tmp_2_0);
    }
  }, dependencies: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    AsyncPipe,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
    SumItemsPipe
  ], styles: ['\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.list-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.page-title-container[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.page-title-container[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.page-title-container[_ngcontent-%COMP%]   .order-id-subtitle[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 0.9rem;\n  color: #6c757d;\n}\n.details-sub-card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: none;\n  border-radius: 0.75rem;\n  background-color: #ffffff;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border-bottom: 1px solid #f0f0f0;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: #007bff;\n  background: none;\n  font-weight: 600;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%] {\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1c2a42;\n  font-weight: 600;\n  margin-right: 0.5rem;\n}\n.details-sub-card[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1c2a42;\n  margin-bottom: 0.5rem;\n}\nh4[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #007bff;\n  margin-bottom: 1rem;\n}\n.details-table.table[_ngcontent-%COMP%] {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: transparent;\n}\n.details-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n  cursor: default;\n}\n.details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  color: #000;\n  font-weight: 500;\n}\n.details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {\n  opacity: 1;\n}\n.details-table[_ngcontent-%COMP%]   img.rounded[_ngcontent-%COMP%] {\n  border: 1px solid #e9ecef;\n}\n.summary-table[_ngcontent-%COMP%] {\n  color: #1c2a42;\n}\n.summary-table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  border-top: 1px solid #dfe3e8;\n}\n.summary-table[_ngcontent-%COMP%]   .total-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding-top: 0.75rem;\n}\n.text-muted-custom[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  padding: 0.375rem 0.85rem;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: #7b68ee;\n  border-color: #7b68ee;\n  color: white;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  padding: 0.5rem 1rem;\n  border-radius: 0.75rem;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: rgb(90.9428571429, 67.3285714286, 233.8714285714);\n  border-color: rgb(90.9428571429, 67.3285714286, 233.8714285714);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.form-select-sm[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n.form-select-sm[_ngcontent-%COMP%]:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\n.truncate-text[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  display: inline-block;\n  vertical-align: middle;\n}\n@media (max-width: 768px) {\n  .page-title-container[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .page-title-container[_ngcontent-%COMP%]   .order-id-subtitle[_ngcontent-%COMP%] {\n    display: block;\n    margin-top: 0.25rem;\n  }\n  .details-sub-card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   .truncate-text[_ngcontent-%COMP%] {\n    white-space: normal;\n    overflow-wrap: break-word;\n    word-break: break-word;\n    max-width: 100%;\n  }\n  .details-sub-card[_ngcontent-%COMP%]   .card-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    margin-right: 0.5rem;\n  }\n  .details-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .details-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%], \n   .details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], \n   .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n  }\n  .details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n    position: relative;\n    overflow: hidden;\n    transition: background-color 0.4s ease-in-out;\n  }\n  .details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]::after {\n    content: "";\n    position: absolute;\n    inset: -1px;\n    z-index: -1;\n    opacity: 0;\n    transition: opacity 0.4s ease-in-out;\n    background:\n      linear-gradient(\n        120deg,\n        #007bff,\n        #7b68ee,\n        #007bff);\n    background-size: 200% 200%;\n    animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;\n  }\n  .details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n    transform: none;\n    background-color: transparent;\n  }\n  .details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {\n    opacity: 1;\n  }\n  .details-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%]::before {\n    color: #000;\n    font-weight: 700;\n  }\n  .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: right !important;\n    padding: 0.75rem 1rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n    position: relative;\n    background: transparent;\n  }\n  .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n  }\n  .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n    transition: color 0.2s ease-in-out, font-weight 0.2s ease-in-out;\n  }\n  .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    display: block;\n    padding: 1rem;\n    border-bottom: 1px solid #f0f0f0;\n  }\n  .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child::before {\n    content: none;\n  }\n  .details-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child   img[_ngcontent-%COMP%] {\n    display: block;\n    margin: 0 auto;\n    max-height: 120px;\n    width: auto;\n    object-fit: contain;\n  }\n}\n/*# sourceMappingURL=order-detail.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderDetailComponent, [{
    type: Component,
    args: [{ selector: "app-order-details", standalone: true, imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      CurrencyPipe,
      DatePipe,
      TitleCasePipe,
      SumItemsPipe
    ], template: `<div class="container-fluid my-4">
  <div class="card-gradient-wrapper">
    <div class="card list-card shadow-sm">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center gap-3 mb-4">
          <div class="page-title-container">
            <h2 class="card-title mb-0">{{ pageTitle }}</h2>
            @if (order$ | async; as order) {
              <small class="text-muted truncate-text order-id-subtitle">#{{ order.id }}</small>
            }
          </div>
          <button (click)="goBack()" class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-arrow-left"></i> Volver a la lista
          </button>
        </div>

        @if (order$ | async; as order) {
          <div>
            <div class="card-gradient-wrapper mb-4">
              <div class="card details-sub-card">
                <div class="card-header">
                  <h5 class="card-title mb-0">
                    <i class="bi bi-card-list me-2"></i>
                    Resumen del Pedido
                  </h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <p class="card-text"><strong>ID de Pedido:</strong> <span class="truncate-text">{{ order.id }}</span></p>
                      <p class="card-text mb-md-0"><strong>Fecha:</strong> {{ order.orderDate | date:'medium' }}</p>
                    </div>
                    <div class="col-md-6">
                      <p class="card-text"><strong>M\xE9todo de Pago:</strong> {{ order.paymentDetails?.paymentMethod || 'N/A' }}</p>
                      <div class="d-flex align-items-center flex-wrap">
                        <strong class="me-2">Estado:</strong>
                        <select class="form-select form-select-sm d-inline-block w-auto" [ngModel]="currentStatus" (change)="onStatusChange($event)">
                          @for (status of statusOptions; track status) {
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-gradient-wrapper mb-4">
              <div class="card details-sub-card">
                <div class="card-header">
                  <h5 class="card-title mb-0">
                    <i class="bi bi-truck me-2"></i>
                    Informaci\xF3n del Cliente y Env\xEDo
                  </h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <h6>Cliente</h6>
                      <p class="mb-1"><strong>{{ order.clientName }}</strong></p>
                      <p class="mb-1">{{ order.clientEmail || 'N/A' }}</p>
                      <p class="mb-1">{{ order.clientPhone || 'N/A' }}</p>
                    </div>
                    <div class="col-md-6">
                      <h6>Direcci\xF3n de Env\xEDo</h6>
                      <address class="mb-0">
                        {{ order.shippingAddress.street }}<br />
                        {{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.zipCode }}<br />
                        {{ order.shippingAddress.country }}
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-gradient-wrapper mb-4">
              <div class="card details-sub-card">
                <div class="card-header">
                  <h5 class="card-title mb-0">
                    <i class="bi bi-box-seam me-2"></i>
                    Productos Comprados
                  </h5>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover align-middle details-table mb-0">
                      <thead>
                        <tr>
                          <th style="width: 80px;"></th>
                          <th>Producto</th>
                          <th class="text-center">Cantidad</th>
                          <th class="text-end">Precio Unitario</th>
                          <th class="text-end">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        @for (item of order.items; track item.variantId) {
                          <tr>
                            <td>
                              <img [src]="item.productImage || 'https://placehold.co/60x60/f0f0f0/6c757d?text=No+Img'" alt="{{ item.productName }}" class="img-fluid rounded">
                            </td>
                            <td data-label="Producto">{{ item.productName }}</td>
                            <td data-label="Cantidad" class="text-center">{{ item.quantity }}</td>
                            <td data-label="Precio Unitario" class="text-end">{{ item.price | currency:'ARS':'$' }}</td>
                            <td data-label="Subtotal" class="text-end">{{ getItemSubtotal(item) | currency:'ARS':'$' }}</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-gradient-wrapper">
              <div class="card details-sub-card">
                 <div class="card-header">
                  <h5 class="card-title mb-0">
                    <i class="bi bi-cash-coin me-2"></i>
                    Resumen de Costos
                  </h5>
                </div>
                <div class="card-body">
                  <div class="row justify-content-end">
                    <div class="col-lg-5">
                      <table class="table table-borderless table-sm mb-0 summary-table">
                        <tbody>
                          <tr>
                            <td>Subtotal:</td>
                            <td class="text-end">{{ order.paymentDetails?.subtotal || (order.items | sumItems:'price':'quantity') | currency:'ARS':'$' }}</td>
                          </tr>
                          <tr>
                            <td>Costo de Env\xEDo:</td>
                            <td class="text-end">{{ order.paymentDetails?.shippingCost || 0 | currency:'ARS':'$' }}</td>
                          </tr>
                          <tr>
                            <td>Impuestos:</td>
                            <td class="text-end">{{ order.paymentDetails?.taxAmount || 0 | currency:'ARS':'$' }}</td>
                          </tr>
                          <tr class="fw-bold total-row">
                            <td>Total Pagado:</td>
                            <td classD="text-end">{{ order.total | currency:'ARS':'$' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end mt-3">
                  <button (click)="generateReceipt(order)" class="btn btn-secondary">
                    <i class="bi bi-receipt"></i> Ver Recibo
                  </button>
              </div>
                </div>
              </div>
            </div>
          </div>
        } @else {
          <div class="text-center text-muted-custom py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
        }
      </div>
    </div>
  </div>
</div>`, styles: ['/* src/app/features/admin/components/orders/order-detail/order-detail.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.list-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card .card-body {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card .card-body {\n    padding: 2rem;\n  }\n}\n.page-title-container {\n  min-width: 0;\n}\n.page-title-container .card-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.page-title-container .order-id-subtitle {\n  font-weight: bold;\n  font-size: 0.9rem;\n  color: #6c757d;\n}\n.details-sub-card {\n  border: none;\n  box-shadow: none;\n  border-radius: 0.75rem;\n  background-color: #ffffff;\n}\n.details-sub-card .card-header {\n  background-color: transparent;\n  border-bottom: 1px solid #f0f0f0;\n}\n.details-sub-card .card-header .card-title {\n  font-size: 1.1rem;\n  color: #007bff;\n  background: none;\n  font-weight: 600;\n}\n.details-sub-card .card-text {\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.details-sub-card .card-text strong {\n  color: #1c2a42;\n  font-weight: 600;\n  margin-right: 0.5rem;\n}\n.details-sub-card h6 {\n  font-weight: 600;\n  color: #1c2a42;\n  margin-bottom: 0.5rem;\n}\nh4 {\n  font-weight: 600;\n  color: #007bff;\n  margin-bottom: 1rem;\n}\n.details-table.table {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: transparent;\n}\n.details-table thead th {\n  font-weight: 600;\n}\n.details-table tbody tr {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n  cursor: default;\n}\n.details-table tbody tr::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.details-table tbody tr:hover {\n  transform: translateY(-2px);\n}\n.details-table tbody tr:hover td {\n  color: #000;\n  font-weight: 500;\n}\n.details-table tbody tr:hover::after {\n  opacity: 1;\n}\n.details-table img.rounded {\n  border: 1px solid #e9ecef;\n}\n.summary-table {\n  color: #1c2a42;\n}\n.summary-table .total-row {\n  font-size: 1.1rem;\n  border-top: 1px solid #dfe3e8;\n}\n.summary-table .total-row td {\n  padding-top: 0.75rem;\n}\n.text-muted-custom {\n  color: #6c757d;\n}\n.btn-outline-secondary {\n  flex-shrink: 0;\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  padding: 0.375rem 0.85rem;\n}\n.btn-outline-secondary:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.btn-secondary {\n  background-color: #7b68ee;\n  border-color: #7b68ee;\n  color: white;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  padding: 0.5rem 1rem;\n  border-radius: 0.75rem;\n}\n.btn-secondary:hover {\n  background-color: rgb(90.9428571429, 67.3285714286, 233.8714285714);\n  border-color: rgb(90.9428571429, 67.3285714286, 233.8714285714);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.form-select-sm {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n.form-select-sm:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\n.truncate-text {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  display: inline-block;\n  vertical-align: middle;\n}\n@media (max-width: 768px) {\n  .page-title-container .card-title {\n    font-size: 1.5rem;\n  }\n  .page-title-container .order-id-subtitle {\n    display: block;\n    margin-top: 0.25rem;\n  }\n  .details-sub-card .card-text .truncate-text {\n    white-space: normal;\n    overflow-wrap: break-word;\n    word-break: break-word;\n    max-width: 100%;\n  }\n  .details-sub-card .card-text strong {\n    margin-right: 0.5rem;\n  }\n  .details-table thead {\n    display: none;\n  }\n  .details-table tbody,\n  .details-table tr,\n  .details-table td {\n    display: block;\n    width: 100%;\n  }\n  .details-table tr {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n    position: relative;\n    overflow: hidden;\n    transition: background-color 0.4s ease-in-out;\n  }\n  .details-table tr::after {\n    content: "";\n    position: absolute;\n    inset: -1px;\n    z-index: -1;\n    opacity: 0;\n    transition: opacity 0.4s ease-in-out;\n    background:\n      linear-gradient(\n        120deg,\n        #007bff,\n        #7b68ee,\n        #007bff);\n    background-size: 200% 200%;\n    animation: gradient-animation 6s ease infinite;\n  }\n  .details-table tr:hover {\n    transform: none;\n    background-color: transparent;\n  }\n  .details-table tr:hover::after {\n    opacity: 1;\n  }\n  .details-table tr:hover td::before {\n    color: #000;\n    font-weight: 700;\n  }\n  .details-table td {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: right !important;\n    padding: 0.75rem 1rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n    position: relative;\n    background: transparent;\n  }\n  .details-table td:last-child {\n    border-bottom: none;\n  }\n  .details-table td::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n    transition: color 0.2s ease-in-out, font-weight 0.2s ease-in-out;\n  }\n  .details-table td:first-child {\n    display: block;\n    padding: 1rem;\n    border-bottom: 1px solid #f0f0f0;\n  }\n  .details-table td:first-child::before {\n    content: none;\n  }\n  .details-table td:first-child img {\n    display: block;\n    margin: 0 auto;\n    max-height: 120px;\n    width: auto;\n    object-fit: contain;\n  }\n}\n/*# sourceMappingURL=order-detail.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderDetailComponent, { className: "OrderDetailComponent", filePath: "src/app/features/admin/components/orders/order-detail/order-detail.component.ts", lineNumber: 28 });
})();
export {
  OrderDetailComponent
};
//# sourceMappingURL=chunk-LHKYBVLD.js.map
