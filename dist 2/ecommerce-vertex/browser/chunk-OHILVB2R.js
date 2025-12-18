import {
  BsModalRef
} from "./chunk-2OBKN7QP.js";
import {
  BehaviorSubject,
  CommonModule,
  Component,
  Input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";

// src/app/features/admin/components/shared/components/confirm-delete-modal/confirm-delete-modal.component.ts
var ConfirmDeleteModalComponent = class _ConfirmDeleteModalComponent {
  bsModalRef;
  title = "Confirmaci\xF3n";
  message = "\xBFEst\xE1s seguro de que deseas realizar esta acci\xF3n?";
  confirmButtonText = "Confirmar";
  cancelButtonText = "Cancelar";
  onClose = new BehaviorSubject(false);
  constructor(bsModalRef) {
    this.bsModalRef = bsModalRef;
  }
  onConfirm() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }
  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
  static \u0275fac = function ConfirmDeleteModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmDeleteModalComponent)(\u0275\u0275directiveInject(BsModalRef));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmDeleteModalComponent, selectors: [["app-confirm-delete-modal"]], inputs: { title: "title", message: "message", confirmButtonText: "confirmButtonText", cancelButtonText: "cancelButtonText" }, decls: 13, vars: 4, consts: [[1, "modal-header", "bg-danger", "text-white"], [1, "modal-title", "pull-left"], ["type", "button", "aria-label", "Close", 1, "btn-close", "close", "pull-right", 3, "click"], ["aria-hidden", "true", 1, "visually-hidden"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-danger", 3, "click"]], template: function ConfirmDeleteModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "h4", 1);
      \u0275\u0275text(2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 2);
      \u0275\u0275domListener("click", function ConfirmDeleteModalComponent_Template_button_click_3_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275domElementStart(4, "span", 3);
      \u0275\u0275text(5, "\xD7");
      \u0275\u0275domElementEnd()()();
      \u0275\u0275domElementStart(6, "div", 4);
      \u0275\u0275text(7);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "div", 5)(9, "button", 6);
      \u0275\u0275domListener("click", function ConfirmDeleteModalComponent_Template_button_click_9_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(10);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(11, "button", 7);
      \u0275\u0275domListener("click", function ConfirmDeleteModalComponent_Template_button_click_11_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275text(12);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.title);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.message, "\n");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.cancelButtonText, " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.confirmButtonText, " ");
    }
  }, dependencies: [CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmDeleteModalComponent, [{
    type: Component,
    args: [{ selector: "app-confirm-delete-modal", standalone: true, imports: [CommonModule], template: '<div class="modal-header bg-danger text-white">\n  <h4 class="modal-title pull-left">{{ title }}</h4>\n  <button\n    type="button"\n    class="btn-close close pull-right"\n    aria-label="Close"\n    (click)="onCancel()"\n  >\n    <span aria-hidden="true" class="visually-hidden">&times;</span>\n  </button>\n</div>\n<div class="modal-body">\n  {{ message }}\n</div>\n<div class="modal-footer">\n  <button type="button" class="btn btn-secondary" (click)="onCancel()">\n    {{ cancelButtonText }}\n  </button>\n  <button type="button" class="btn btn-danger" (click)="onConfirm()">\n    {{ confirmButtonText }}\n  </button>\n</div>\n' }]
  }], () => [{ type: BsModalRef }], { title: [{
    type: Input
  }], message: [{
    type: Input
  }], confirmButtonText: [{
    type: Input
  }], cancelButtonText: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmDeleteModalComponent, { className: "ConfirmDeleteModalComponent", filePath: "src/app/features/admin/components/shared/components/confirm-delete-modal/confirm-delete-modal.component.ts", lineNumber: 13 });
})();

export {
  ConfirmDeleteModalComponent
};
//# sourceMappingURL=chunk-OHILVB2R.js.map
