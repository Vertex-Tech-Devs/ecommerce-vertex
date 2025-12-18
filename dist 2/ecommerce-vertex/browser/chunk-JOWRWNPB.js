import {
  BsModalRef
} from "./chunk-2OBKN7QP.js";
import {
  DefaultValueAccessor,
  FormArrayName,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-WR4QMUYF.js";
import {
  CommonModule,
  Component,
  NgClass,
  Subject,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QBKDZG3W.js";

// src/app/features/admin/components/attributes/attribute-modal/attribute-modal.component.ts
var _c0 = (a0) => ({ "is-invalid": a0 });
function AttributeModalComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div");
    \u0275\u0275text(2, "El nombre es obligatorio (m\xEDn. 3 caracteres).");
    \u0275\u0275elementEnd()();
  }
}
function AttributeModalComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "input", 20);
    \u0275\u0275listener("keydown.enter", function AttributeModalComponent_For_20_Template_input_keydown_enter_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.addValue());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 21);
    \u0275\u0275listener("click", function AttributeModalComponent_For_20_Template_button_click_2_listener() {
      const \u0275$index_39_r3 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.removeValue(\u0275$index_39_r3));
    });
    \u0275\u0275element(3, "i", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const valueControl_r4 = ctx.$implicit;
    const \u0275$index_39_r3 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275property("formControlName", \u0275$index_39_r3)("ngClass", \u0275\u0275pureFunction1(2, _c0, valueControl_r4.invalid && valueControl_r4.touched));
  }
}
function AttributeModalComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275text(1, " A\xF1ade al menos un valor para este atributo. ");
    \u0275\u0275elementEnd();
  }
}
var AttributeModalComponent = class _AttributeModalComponent {
  title = "Nuevo Atributo";
  attribute;
  onClose = new Subject();
  bsModalRef = inject(BsModalRef);
  fb = inject(FormBuilder);
  attributeForm;
  ngOnInit() {
    if (this.attribute) {
      this.title = "Editar Atributo";
    }
    this.attributeForm = this.fb.group({
      name: [
        this.attribute?.name || "",
        [Validators.required, Validators.minLength(3)]
      ],
      values: this.fb.array(this.attribute?.values ? this.attribute.values.map((val) => this.fb.control(val, Validators.required)) : [])
    });
  }
  get name() {
    return this.attributeForm.get("name");
  }
  get values() {
    return this.attributeForm.get("values");
  }
  addValue() {
    if (this.values.length >= 50)
      return;
    this.values.push(this.fb.control("", Validators.required));
  }
  removeValue(index) {
    this.values.removeAt(index);
  }
  save() {
    if (this.attributeForm.invalid) {
      this.attributeForm.markAllAsTouched();
      return;
    }
    const formData = this.attributeForm.value;
    const rawValues = this.values.getRawValue();
    const cleanedValues = rawValues.map((val) => String(val ?? "").trim()).filter((val) => val.length > 0);
    const uniqueValues = [...new Set(cleanedValues)];
    this.onClose.next({
      name: formData.name,
      values: uniqueValues
    });
    this.bsModalRef.hide();
  }
  cancel() {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
  static \u0275fac = function AttributeModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AttributeModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AttributeModalComponent, selectors: [["app-attribute-modal"]], decls: 27, vars: 8, consts: [[1, "modal-header", "modal-header-custom"], [1, "modal-title", "w-100", "text-center"], ["type", "button", "aria-label", "Close", 1, "btn-close", "btn-close-white", 3, "click"], [1, "modal-body"], [3, "ngSubmit", "formGroup"], [1, "mb-3"], ["for", "attribute-name", 1, "form-label"], ["type", "text", "id", "attribute-name", "formControlName", "name", "placeholder", "Ej: Talle", 1, "form-control", 3, "ngClass"], [1, "invalid-feedback"], [1, "my-4"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "form-label", "mb-0"], ["type", "button", 1, "btn", "btn-outline-success", "btn-sm", 3, "click"], [1, "bi", "bi-plus-lg"], ["formArrayName", "values"], [1, "input-group", "mb-2"], [1, "alert", "alert-light", "text-center", "border"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-save-gradient", 3, "click", "disabled"], ["type", "text", "placeholder", "Ej: M", 1, "form-control", 3, "keydown.enter", "formControlName", "ngClass"], ["type", "button", "title", "Eliminar valor", 1, "btn", "btn-outline-danger", 3, "click"], [1, "bi", "bi-trash"]], template: function AttributeModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h4", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "button", 2);
      \u0275\u0275listener("click", function AttributeModalComponent_Template_button_click_3_listener() {
        return ctx.cancel();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 3)(5, "form", 4);
      \u0275\u0275listener("ngSubmit", function AttributeModalComponent_Template_form_ngSubmit_5_listener() {
        return ctx.save();
      });
      \u0275\u0275elementStart(6, "div", 5)(7, "label", 6);
      \u0275\u0275text(8, "Nombre del Atributo");
      \u0275\u0275elementEnd();
      \u0275\u0275element(9, "input", 7);
      \u0275\u0275conditionalCreate(10, AttributeModalComponent_Conditional_10_Template, 3, 0, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275element(11, "hr", 9);
      \u0275\u0275elementStart(12, "div", 10)(13, "label", 11);
      \u0275\u0275text(14, "Valores del Atributo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "button", 12);
      \u0275\u0275listener("click", function AttributeModalComponent_Template_button_click_15_listener() {
        return ctx.addValue();
      });
      \u0275\u0275element(16, "i", 13);
      \u0275\u0275text(17, " A\xF1adir Valor ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 14);
      \u0275\u0275repeaterCreate(19, AttributeModalComponent_For_20_Template, 4, 4, "div", 15, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275conditionalCreate(21, AttributeModalComponent_Conditional_21_Template, 2, 0, "div", 16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 17)(23, "button", 18);
      \u0275\u0275listener("click", function AttributeModalComponent_Template_button_click_23_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(24, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "button", 19);
      \u0275\u0275listener("click", function AttributeModalComponent_Template_button_click_25_listener() {
        return ctx.save();
      });
      \u0275\u0275text(26, " Guardar ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.title);
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.attributeForm);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(6, _c0, (ctx.name == null ? null : ctx.name.invalid) && ((ctx.name == null ? null : ctx.name.dirty) || (ctx.name == null ? null : ctx.name.touched))));
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.name == null ? null : ctx.name.invalid) && ((ctx.name == null ? null : ctx.name.dirty) || (ctx.name == null ? null : ctx.name.touched)) ? 10 : -1);
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.values.controls);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.values.controls.length === 0 ? 21 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.attributeForm.invalid);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormArrayName], styles: ["\n\n.modal-header-custom[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  color: white;\n  border-bottom: none;\n  padding: 1.25rem 1.5rem;\n}\n.modal-header-custom[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.modal-header-custom[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%] {\n  filter: brightness(0) invert(1);\n  opacity: 0.8;\n  transition: opacity 0.2s ease, transform 0.2s ease;\n}\n.modal-header-custom[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n.modal-body[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.75rem;\n}\n.modal-body[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  border: 1px solid #dfe3e8;\n  border-radius: 0.5rem;\n  padding: 0.75rem 1rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n.modal-body[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {\n  border-color: #7b68ee;\n  box-shadow: 0 0 0 0.25rem rgba(123, 104, 238, 0.15);\n}\n.modal-body[_ngcontent-%COMP%]   .form-control.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545;\n}\n.modal-body[_ngcontent-%COMP%]   .form-control.is-invalid[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.15);\n}\n.modal-body[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  border-right: 0;\n}\n.modal-body[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {\n  z-index: 1;\n}\n.modal-body[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  border-color: #dfe3e8;\n}\n.modal-body[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover {\n  background-color: rgba(220, 53, 69, 0.1);\n}\n.modal-footer[_ngcontent-%COMP%] {\n  background-color: #f4f6f9;\n  border-top: 1px solid #e9ecef;\n  padding: 1rem 1.5rem;\n}\n.modal-footer[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  font-weight: 600;\n  padding: 0.6rem 1.25rem;\n  border-radius: 0.5rem;\n  transition: all 0.3s ease;\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 2px solid #dc3545;\n  color: #dc3545;\n  padding: calc(0.6rem - 2px) calc(1.25rem - 2px);\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-save-gradient[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  color: white;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border: none;\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-save-gradient[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(123, 104, 238, 0.25);\n}\n.modal-footer[_ngcontent-%COMP%]   .btn-save-gradient[_ngcontent-%COMP%]:disabled {\n  background: #ccc;\n  box-shadow: none;\n  transform: none;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=attribute-modal.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttributeModalComponent, [{
    type: Component,
    args: [{ selector: "app-attribute-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="modal-header modal-header-custom">
  <h4 class="modal-title w-100 text-center">{{ title }}</h4>
  <button type="button" class="btn-close btn-close-white" aria-label="Close" (click)="cancel()"></button>
</div>

<div class="modal-body">
  <form [formGroup]="attributeForm" (ngSubmit)="save()">
    
    <div class="mb-3">
      <label for="attribute-name" class="form-label">Nombre del Atributo</label>
      <input
        type="text"
        id="attribute-name"
        class="form-control"
        formControlName="name"
        [ngClass]="{ 'is-invalid': name?.invalid && (name?.dirty || name?.touched) }"
        placeholder="Ej: Talle"
      />
      @if (name?.invalid && (name?.dirty || name?.touched)) {
        <div class="invalid-feedback">
          <div>El nombre es obligatorio (m\xEDn. 3 caracteres).</div>
        </div>
      }
    </div>

    <hr class="my-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
      <label class="form-label mb-0">Valores del Atributo</label>
      <button type="button" class="btn btn-outline-success btn-sm" (click)="addValue()">
        <i class="bi bi-plus-lg"></i> A\xF1adir Valor
      </button>
    </div>

    <div formArrayName="values">
      @for (valueControl of values.controls; track i; let i = $index) {
        <div class="input-group mb-2">
          <input
            type="text"
            [formControlName]="i"
            class="form-control"
            placeholder="Ej: M"
            [ngClass]="{ 'is-invalid': valueControl.invalid && valueControl.touched }"
            (keydown.enter)="$event.preventDefault(); addValue()"
          />
          <button class="btn btn-outline-danger" type="button" (click)="removeValue(i)" title="Eliminar valor">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      }
      @if (values.controls.length === 0) {
        <div class="alert alert-light text-center border">
          A\xF1ade al menos un valor para este atributo.
        </div>
      }
    </div>

  </form>
</div>

<div class="modal-footer">
  <button type="button" class="btn btn-secondary" (click)="cancel()">Cancelar</button>
  <button type="button" class="btn btn-save-gradient" (click)="save()" [disabled]="attributeForm.invalid">
    Guardar
  </button>
</div>`, styles: ["/* src/app/features/admin/components/attributes/attribute-modal/attribute-modal.component.scss */\n.modal-header-custom {\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  color: white;\n  border-bottom: none;\n  padding: 1.25rem 1.5rem;\n}\n.modal-header-custom .modal-title {\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.modal-header-custom .btn-close {\n  filter: brightness(0) invert(1);\n  opacity: 0.8;\n  transition: opacity 0.2s ease, transform 0.2s ease;\n}\n.modal-header-custom .btn-close:hover {\n  opacity: 1;\n  transform: scale(1.1);\n}\n.modal-body {\n  padding: 2rem;\n}\n.modal-body .form-label {\n  font-weight: 500;\n  color: #495057;\n  margin-bottom: 0.75rem;\n}\n.modal-body .form-control {\n  border: 1px solid #dfe3e8;\n  border-radius: 0.5rem;\n  padding: 0.75rem 1rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n.modal-body .form-control:focus {\n  border-color: #7b68ee;\n  box-shadow: 0 0 0 0.25rem rgba(123, 104, 238, 0.15);\n}\n.modal-body .form-control.is-invalid {\n  border-color: #dc3545;\n}\n.modal-body .form-control.is-invalid:focus {\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.15);\n}\n.modal-body .input-group .form-control {\n  border-right: 0;\n}\n.modal-body .input-group .form-control:focus {\n  z-index: 1;\n}\n.modal-body .input-group .btn {\n  border-color: #dfe3e8;\n}\n.modal-body .input-group .btn:hover {\n  background-color: rgba(220, 53, 69, 0.1);\n}\n.modal-footer {\n  background-color: #f4f6f9;\n  border-top: 1px solid #e9ecef;\n  padding: 1rem 1.5rem;\n}\n.modal-footer .btn {\n  font-weight: 600;\n  padding: 0.6rem 1.25rem;\n  border-radius: 0.5rem;\n  transition: all 0.3s ease;\n}\n.modal-footer .btn-secondary {\n  background-color: transparent;\n  border: 2px solid #dc3545;\n  color: #dc3545;\n  padding: calc(0.6rem - 2px) calc(1.25rem - 2px);\n}\n.modal-footer .btn-secondary:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);\n}\n.modal-footer .btn-save-gradient {\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  color: white;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border: none;\n}\n.modal-footer .btn-save-gradient:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(123, 104, 238, 0.25);\n}\n.modal-footer .btn-save-gradient:disabled {\n  background: #ccc;\n  box-shadow: none;\n  transform: none;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=attribute-modal.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AttributeModalComponent, { className: "AttributeModalComponent", filePath: "src/app/features/admin/components/attributes/attribute-modal/attribute-modal.component.ts", lineNumber: 15 });
})();

export {
  AttributeModalComponent
};
//# sourceMappingURL=chunk-JOWRWNPB.js.map
