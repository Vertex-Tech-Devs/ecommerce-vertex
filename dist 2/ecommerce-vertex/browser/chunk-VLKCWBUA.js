import {
  BsModalRef,
  BsModalService
} from "./chunk-2OBKN7QP.js";
import {
  CategoryService
} from "./chunk-MXEO7R2O.js";
import {
  CheckboxControlValueAccessor,
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
  AttributeService
} from "./chunk-H5HDOTK4.js";
import {
  SweetAlertService
} from "./chunk-5OJQRZGI.js";
import "./chunk-UYVF6V6H.js";
import "./chunk-HMD6QQFJ.js";
import "./chunk-SDXAAYIW.js";
import {
  AsyncPipe,
  CommonModule,
  Component,
  NgClass,
  Subject,
  inject,
  map,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QBKDZG3W.js";
import {
  __async,
  __spreadValues
} from "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/categories/category-modal/category-modal.component.ts
var _c0 = (a0) => ({ "is-invalid": a0 });
var _forTrack0 = ($index, $item) => $item.id;
function CategoryModalComponent_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El nombre es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function CategoryModalComponent_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Debe tener al menos 3 caracteres.");
    \u0275\u0275elementEnd();
  }
}
function CategoryModalComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275conditionalCreate(1, CategoryModalComponent_Conditional_13_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, CategoryModalComponent_Conditional_13_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.name == null ? null : ctx_r0.name.errors == null ? null : ctx_r0.name.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.name == null ? null : ctx_r0.name.errors == null ? null : ctx_r0.name.errors["minlength"]) ? 2 : -1);
  }
}
function CategoryModalComponent_Conditional_21_Conditional_0_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275element(1, "input", 20);
    \u0275\u0275elementStart(2, "label", 21);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const attr_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("id", "attr-" + attr_r2.id)("formControlName", attr_r2.id);
    \u0275\u0275advance();
    \u0275\u0275property("for", "attr-" + attr_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(attr_r2.name);
  }
}
function CategoryModalComponent_Conditional_21_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CategoryModalComponent_Conditional_21_Conditional_0_For_1_Template, 4, 4, "div", 19, _forTrack0);
  }
  if (rf & 2) {
    const attributes_r3 = \u0275\u0275nextContext();
    \u0275\u0275repeater(attributes_r3);
  }
}
function CategoryModalComponent_Conditional_21_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275text(1, " No hay atributos creados. ");
    \u0275\u0275elementStart(2, "a", 22);
    \u0275\u0275listener("click", function CategoryModalComponent_Conditional_21_Conditional_1_Template_a_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.cancel());
    });
    \u0275\u0275text(3, "Crea uno");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " primero. ");
    \u0275\u0275elementEnd();
  }
}
function CategoryModalComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, CategoryModalComponent_Conditional_21_Conditional_0_Template, 2, 0)(1, CategoryModalComponent_Conditional_21_Conditional_1_Template, 5, 0, "div", 15);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.length > 0 ? 0 : 1);
  }
}
function CategoryModalComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "div", 23)(2, "span", 24);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
var CategoryModalComponent = class _CategoryModalComponent {
  title = "Nueva Categor\xEDa";
  category;
  onClose = new Subject();
  bsModalRef = inject(BsModalRef);
  fb = inject(FormBuilder);
  attributeService = inject(AttributeService);
  categoryForm;
  attributes$;
  ngOnInit() {
    this.attributes$ = this.attributeService.getAttributes();
    this.title = this.category ? "Editar Categor\xEDa" : "Nueva Categor\xEDa";
    this.categoryForm = this.fb.group({
      name: [
        this.category?.name || "",
        [Validators.required, Validators.minLength(3)]
      ],
      parentId: [this.category?.parentId || null],
      attributesForm: this.fb.group({})
    });
    this.attributes$.subscribe((attributes) => {
      const attributesGroup = this.categoryForm.get("attributesForm");
      attributes.forEach((attr) => {
        const isChecked = this.category?.filterableAttributes?.includes(attr.id) || false;
        attributesGroup.addControl(attr.id, this.fb.control(isChecked));
      });
    });
  }
  get name() {
    return this.categoryForm.get("name");
  }
  get attributesForm() {
    return this.categoryForm.get("attributesForm");
  }
  generateSlug(name) {
    return name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  }
  save() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    const formData = this.categoryForm.value;
    const slug = this.generateSlug(formData.name);
    const selectedAttributeIds = Object.keys(formData.attributesForm).filter((id) => formData.attributesForm[id]);
    this.onClose.next({
      name: formData.name,
      slug,
      parentId: formData.parentId || null,
      filterableAttributes: selectedAttributeIds
    });
    this.bsModalRef.hide();
  }
  cancel() {
    this.onClose.next(null);
    this.bsModalRef.hide();
  }
  static \u0275fac = function CategoryModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoryModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryModalComponent, selectors: [["app-category-modal"]], decls: 29, vars: 10, consts: [[1, "modal-header", "modal-header-custom"], [1, "modal-title", "w-100", "text-center"], ["type", "button", "aria-label", "Close", 1, "btn-close", "btn-close-white", 3, "click"], [1, "modal-body"], [3, "ngSubmit", "formGroup"], [1, "form-content-card"], [1, "modal-subtitle"], [1, "mb-3"], ["for", "category-name", 1, "form-label"], ["type", "text", "id", "category-name", "formControlName", "name", "placeholder", "Ej: Indumentaria", 1, "form-control", 3, "keydown.enter", "ngClass"], [1, "invalid-feedback"], [1, "my-4"], [1, "modal-description"], [1, "attributes-grid-container"], ["formGroupName", "attributesForm", 1, "attributes-grid"], [1, "text-center", "text-muted", "small", "p-3"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-save-gradient", 3, "click", "disabled"], [1, "form-check", "form-switch"], ["type", "checkbox", "role", "switch", 1, "form-check-input", 3, "id", "formControlName"], [1, "form-check-label", 3, "for"], ["routerLink", "/admin/attributes", 3, "click"], ["role", "status", 1, "spinner-border", "spinner-border-sm"], [1, "visually-hidden"]], template: function CategoryModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h4", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "button", 2);
      \u0275\u0275listener("click", function CategoryModalComponent_Template_button_click_3_listener() {
        return ctx.cancel();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 3)(5, "form", 4);
      \u0275\u0275listener("ngSubmit", function CategoryModalComponent_Template_form_ngSubmit_5_listener() {
        return ctx.save();
      });
      \u0275\u0275elementStart(6, "div", 5)(7, "h5", 6);
      \u0275\u0275text(8, "Informaci\xF3n B\xE1sica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 7)(10, "label", 8);
      \u0275\u0275text(11, "Nombre de la Categor\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "input", 9);
      \u0275\u0275listener("keydown.enter", function CategoryModalComponent_Template_input_keydown_enter_12_listener() {
        return ctx.save();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(13, CategoryModalComponent_Conditional_13_Template, 3, 2, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "hr", 11);
      \u0275\u0275elementStart(15, "h5", 6);
      \u0275\u0275text(16, "Atributos para Filtros");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p", 12);
      \u0275\u0275text(18, "Selecciona los atributos que se mostrar\xE1n en los filtros de la tienda cuando esta categor\xEDa est\xE9 activa.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 13)(20, "div", 14);
      \u0275\u0275conditionalCreate(21, CategoryModalComponent_Conditional_21_Template, 2, 1);
      \u0275\u0275pipe(22, "async");
      \u0275\u0275conditionalBranchCreate(23, CategoryModalComponent_Conditional_23_Template, 4, 0, "div", 15);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(24, "div", 16)(25, "button", 17);
      \u0275\u0275listener("click", function CategoryModalComponent_Template_button_click_25_listener() {
        return ctx.cancel();
      });
      \u0275\u0275text(26, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "button", 18);
      \u0275\u0275listener("click", function CategoryModalComponent_Template_button_click_27_listener() {
        return ctx.save();
      });
      \u0275\u0275text(28, " Guardar ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_4_0;
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.title);
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.categoryForm);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(8, _c0, (ctx.name == null ? null : ctx.name.invalid) && ((ctx.name == null ? null : ctx.name.dirty) || (ctx.name == null ? null : ctx.name.touched))));
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.name == null ? null : ctx.name.invalid) && ((ctx.name == null ? null : ctx.name.dirty) || (ctx.name == null ? null : ctx.name.touched)) ? 13 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275conditional((tmp_4_0 = \u0275\u0275pipeBind1(22, 6, ctx.attributes$)) ? 21 : 23, tmp_4_0);
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", ctx.categoryForm.invalid);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormGroupName, AsyncPipe], styles: [`

.modal-header-custom[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      45deg,
      #007bff,
      #7b68ee);
  color: white;
  border-bottom: none;
  padding: 1.25rem 1.5rem;
}
.modal-header-custom[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%] {
  font-weight: 600;
  letter-spacing: 0.5px;
}
.modal-header-custom[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%] {
  filter: brightness(0) invert(1);
  opacity: 0.8;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-header-custom[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%]:hover {
  opacity: 1;
  transform: scale(1.1);
}
.modal-body[_ngcontent-%COMP%] {
  padding: 2rem;
  background-color: #f4f6f9;
}
.modal-body[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.75rem;
}
.modal-body[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {
  border: 1px solid #dfe3e8;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: #fff;
}
.modal-body[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {
  border-color: #7b68ee;
  box-shadow: 0 0 0 0.25rem rgba(123, 104, 238, 0.15);
}
.modal-body[_ngcontent-%COMP%]   .form-control.is-invalid[_ngcontent-%COMP%] {
  border-color: #dc3545;
}
.modal-body[_ngcontent-%COMP%]   .form-control.is-invalid[_ngcontent-%COMP%]:focus {
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.15);
}
.modal-subtitle[_ngcontent-%COMP%] {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
}
.modal-subtitle[_ngcontent-%COMP%]:first-of-type {
  margin-top: 0;
}
.modal-description[_ngcontent-%COMP%] {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 1rem;
}
.form-content-card[_ngcontent-%COMP%] {
  background-color: #ffffff;
  padding: 1.5rem;
  border: 1px solid #dfe3e8;
  border-radius: 0.75rem;
}
@media (min-width: 768px) {
  .form-content-card[_ngcontent-%COMP%] {
    padding: 2rem;
  }
}
.attributes-grid-container[_ngcontent-%COMP%] {
  background-color: #f8f9fa;
  border: 1px solid #dfe3e8;
  border-radius: 0.5rem;
  padding: 1.5rem;
}
.attributes-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem 1rem;
}
@media (max-width: 576px) {
  .attributes-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
}
.form-check.form-switch[_ngcontent-%COMP%] {
  padding-left: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 2.25rem;
}
.form-check.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%] {
  width: 3rem;
  height: 1.6rem;
  margin-top: 0;
  margin-left: 0;
  flex-shrink: 0;
  cursor: pointer;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.form-check.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%]:focus {
  border-color: rgba(0, 123, 255, 0.5);
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.form-check.form-switch[_ngcontent-%COMP%]   .form-check-input[_ngcontent-%COMP%]:checked {
  background-color: #007bff;
  border-color: #007bff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.form-check.form-switch[_ngcontent-%COMP%]   .form-check-label[_ngcontent-%COMP%] {
  cursor: pointer;
  color: #343a40;
  font-weight: 500;
}
.modal-footer[_ngcontent-%COMP%] {
  background-color: #f4f6f9;
  border-top: 1px solid #e9ecef;
  padding: 1rem 1.5rem;
}
.modal-footer[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}
.modal-footer[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%] {
  background-color: transparent;
  border: 2px solid #dc3545;
  color: #dc3545;
  padding: calc(0.6rem - 2px) calc(1.25rem - 2px);
}
.modal-footer[_ngcontent-%COMP%]   .btn-secondary[_ngcontent-%COMP%]:hover {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);
}
.modal-footer[_ngcontent-%COMP%]   .btn-save-gradient[_ngcontent-%COMP%] {
  background:
    linear-gradient(
      45deg,
      #007bff,
      #7b68ee);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
}
.modal-footer[_ngcontent-%COMP%]   .btn-save-gradient[_ngcontent-%COMP%]:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(123, 104, 238, 0.25);
}
.modal-footer[_ngcontent-%COMP%]   .btn-save-gradient[_ngcontent-%COMP%]:disabled {
  background: #ccc;
  box-shadow: none;
  transform: none;
  cursor: not-allowed;
}
/*# sourceMappingURL=category-modal.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoryModalComponent, [{
    type: Component,
    args: [{ selector: "app-category-modal", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="modal-header modal-header-custom">
  <h4 class="modal-title w-100 text-center">{{ title }}</h4>
  <button type="button" class="btn-close btn-close-white" aria-label="Close" (click)="cancel()"></button>
</div>

<div class="modal-body">
  <form [formGroup]="categoryForm" (ngSubmit)="save()">
    
    <div class="form-content-card">
      <h5 class="modal-subtitle">Informaci\xF3n B\xE1sica</h5>
      <div class="mb-3">
        <label for="category-name" class="form-label">Nombre de la Categor\xEDa</label>
        <input
          type="text"
          id="category-name"
          class="form-control"
          formControlName="name"
          [ngClass]="{ 'is-invalid': name?.invalid && (name?.dirty || name?.touched) }"
          (keydown.enter)="save()"
          placeholder="Ej: Indumentaria"
        />
        @if (name?.invalid && (name?.dirty || name?.touched)) {
          <div class="invalid-feedback">
            @if (name?.errors?.['required']) {
              <div>El nombre es obligatorio.</div>
            }
            @if (name?.errors?.['minlength']) {
              <div>Debe tener al menos 3 caracteres.</div>
            }
          </div>
        }
      </div>

      <hr class="my-4">

      <h5 class="modal-subtitle">Atributos para Filtros</h5>
      <p class="modal-description">Selecciona los atributos que se mostrar\xE1n en los filtros de la tienda cuando esta categor\xEDa est\xE9 activa.</p>
      
      <div class="attributes-grid-container">
        <div class="attributes-grid" formGroupName="attributesForm">
          @if (attributes$ | async; as attributes) {
            @if(attributes.length > 0) {
              @for (attr of attributes; track attr.id) {
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" [id]="'attr-' + attr.id" [formControlName]="attr.id!">
                  <label class="form-check-label" [for]="'attr-' + attr.id">{{ attr.name }}</label>
                </div>
              }
            } @else {
              <div class="text-center text-muted small p-3">
                No hay atributos creados. <a routerLink="/admin/attributes" (click)="cancel()">Crea uno</a> primero.
              </div>
            }
          } @else {
            <div class="text-center text-muted small p-3">
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Cargando...</span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>

  </form>
</div>

<div class="modal-footer">
  <button type="button" class="btn btn-secondary" (click)="cancel()">Cancelar</button>
  <button type="button" class="btn btn-save-gradient" (click)="save()" [disabled]="categoryForm.invalid">
    Guardar
  </button>
</div>`, styles: [`/* src/app/features/admin/components/categories/category-modal/category-modal.component.scss */
.modal-header-custom {
  background:
    linear-gradient(
      45deg,
      #007bff,
      #7b68ee);
  color: white;
  border-bottom: none;
  padding: 1.25rem 1.5rem;
}
.modal-header-custom .modal-title {
  font-weight: 600;
  letter-spacing: 0.5px;
}
.modal-header-custom .btn-close {
  filter: brightness(0) invert(1);
  opacity: 0.8;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-header-custom .btn-close:hover {
  opacity: 1;
  transform: scale(1.1);
}
.modal-body {
  padding: 2rem;
  background-color: #f4f6f9;
}
.modal-body .form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.75rem;
}
.modal-body .form-control {
  border: 1px solid #dfe3e8;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: #fff;
}
.modal-body .form-control:focus {
  border-color: #7b68ee;
  box-shadow: 0 0 0 0.25rem rgba(123, 104, 238, 0.15);
}
.modal-body .form-control.is-invalid {
  border-color: #dc3545;
}
.modal-body .form-control.is-invalid:focus {
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.15);
}
.modal-subtitle {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
}
.modal-subtitle:first-of-type {
  margin-top: 0;
}
.modal-description {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 1rem;
}
.form-content-card {
  background-color: #ffffff;
  padding: 1.5rem;
  border: 1px solid #dfe3e8;
  border-radius: 0.75rem;
}
@media (min-width: 768px) {
  .form-content-card {
    padding: 2rem;
  }
}
.attributes-grid-container {
  background-color: #f8f9fa;
  border: 1px solid #dfe3e8;
  border-radius: 0.5rem;
  padding: 1.5rem;
}
.attributes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem 1rem;
}
@media (max-width: 576px) {
  .attributes-grid {
    grid-template-columns: 1fr;
  }
}
.form-check.form-switch {
  padding-left: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 2.25rem;
}
.form-check.form-switch .form-check-input {
  width: 3rem;
  height: 1.6rem;
  margin-top: 0;
  margin-left: 0;
  flex-shrink: 0;
  cursor: pointer;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.form-check.form-switch .form-check-input:focus {
  border-color: rgba(0, 123, 255, 0.5);
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.form-check.form-switch .form-check-input:checked {
  background-color: #007bff;
  border-color: #007bff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.form-check.form-switch .form-check-label {
  cursor: pointer;
  color: #343a40;
  font-weight: 500;
}
.modal-footer {
  background-color: #f4f6f9;
  border-top: 1px solid #e9ecef;
  padding: 1rem 1.5rem;
}
.modal-footer .btn {
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}
.modal-footer .btn-secondary {
  background-color: transparent;
  border: 2px solid #dc3545;
  color: #dc3545;
  padding: calc(0.6rem - 2px) calc(1.25rem - 2px);
}
.modal-footer .btn-secondary:hover {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);
}
.modal-footer .btn-save-gradient {
  background:
    linear-gradient(
      45deg,
      #007bff,
      #7b68ee);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
}
.modal-footer .btn-save-gradient:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(123, 104, 238, 0.25);
}
.modal-footer .btn-save-gradient:disabled {
  background: #ccc;
  box-shadow: none;
  transform: none;
  cursor: not-allowed;
}
/*# sourceMappingURL=category-modal.component.css.map */
`] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryModalComponent, { className: "CategoryModalComponent", filePath: "src/app/features/admin/components/categories/category-modal/category-modal.component.ts", lineNumber: 17 });
})();

// src/app/features/admin/components/categories/categories-list/categories-list.component.ts
var _forTrack02 = ($index, $item) => $item.id;
function CategoriesListComponent_Conditional_6_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "tr")(1, "td", 12);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "td", 13)(4, "span", 14);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "td", 15)(7, "button", 16);
    \u0275\u0275domListener("click", function CategoriesListComponent_Conditional_6_For_12_Template_button_click_7_listener() {
      const category_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openCategoryModal(category_r2));
    });
    \u0275\u0275domElement(8, "i", 17);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(9, "button", 18);
    \u0275\u0275domListener("click", function CategoriesListComponent_Conditional_6_For_12_Template_button_click_9_listener() {
      const category_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDelete(category_r2));
    });
    \u0275\u0275domElement(10, "i", 19);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const category_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.getAttributeNames(category_r2.filterableAttributes));
  }
}
function CategoriesListComponent_Conditional_6_ForEmpty_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr")(1, "td", 20)(2, "div", 21);
    \u0275\u0275domElement(3, "i", 22);
    \u0275\u0275domElementStart(4, "p", 23);
    \u0275\u0275text(5, "A\xFAn no hay categor\xEDas creadas.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, "\xA1Crea la primera para empezar a organizar tus productos!");
    \u0275\u0275domElementEnd()()()();
  }
}
function CategoriesListComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "table", 9)(2, "thead")(3, "tr")(4, "th", 10);
    \u0275\u0275text(5, "Nombre");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "th", 10);
    \u0275\u0275text(7, "Atributos Asignados");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "th", 11);
    \u0275\u0275text(9, "Acciones");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(10, "tbody");
    \u0275\u0275repeaterCreate(11, CategoriesListComponent_Conditional_6_For_12_Template, 11, 2, "tr", null, _forTrack02, false, CategoriesListComponent_Conditional_6_ForEmpty_13_Template, 8, 0, "tr");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx);
  }
}
function CategoriesListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 6)(1, "div", 24)(2, "span", 25);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275domElementEnd()()();
  }
}
var CategoriesListComponent = class _CategoriesListComponent {
  categoryService = inject(CategoryService);
  attributeService = inject(AttributeService);
  modalService = inject(BsModalService);
  sweetAlertService = inject(SweetAlertService);
  categories$;
  bsModalRef;
  modalSubscription;
  attributesMap = /* @__PURE__ */ new Map();
  ngOnInit() {
    this.attributeService.getAttributes().pipe(map((attributes) => attributes.forEach((attr) => this.attributesMap.set(attr.id, attr.name)))).subscribe();
    this.categories$ = this.categoryService.getCategories();
  }
  ngOnDestroy() {
    this.modalSubscription?.unsubscribe();
  }
  getAttributeNames(attributeIds) {
    if (!attributeIds || attributeIds.length === 0) {
      return "Ninguno";
    }
    return attributeIds.map((id) => this.attributesMap.get(id) || "ID Desconocido").join(", ");
  }
  openCategoryModal(category) {
    const initialState = category ? { category: __spreadValues({}, category) } : {};
    this.bsModalRef = this.modalService.show(CategoryModalComponent, {
      initialState,
      class: "modal-lg modal-dialog-centered"
    });
    this.modalSubscription = this.bsModalRef.content.onClose.subscribe((result) => {
      if (result) {
        if (category && category.id) {
          this.updateCategory(category.id, result);
        } else {
          this.addCategory(result);
        }
      }
    });
  }
  addCategory(categoryData) {
    const data = __spreadValues({}, categoryData);
    this.categoryService.addCategory(data).then(() => this.sweetAlertService.success("\xA1\xC9xito!", "Categor\xEDa creada correctamente.")).catch((err) => this.sweetAlertService.error("Error", "Hubo un problema al crear la categor\xEDa."));
  }
  updateCategory(id, categoryData) {
    this.categoryService.updateCategory(id, categoryData).then(() => this.sweetAlertService.success("\xA1\xC9xito!", "Categor\xEDa actualizada correctamente.")).catch((err) => this.sweetAlertService.error("Error", "Hubo un problema al actualizar la categor\xEDa."));
  }
  onDelete(category) {
    return __async(this, null, function* () {
      const isConfirmed = yield this.sweetAlertService.confirm("\xBFEst\xE1s seguro?", `Esta acci\xF3n eliminar\xE1 la categor\xEDa "${category.name}". No podr\xE1s revertir esto.`);
      if (isConfirmed && category.id) {
        try {
          yield this.categoryService.deleteCategory(category.id);
          this.sweetAlertService.success("Eliminada", "La categor\xEDa ha sido eliminada.");
        } catch (err) {
          this.sweetAlertService.error("Error", "Hubo un problema al eliminar la categor\xEDa.");
        }
      }
    });
  }
  static \u0275fac = function CategoriesListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CategoriesListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoriesListComponent, selectors: [["app-categories-list"]], decls: 11, vars: 3, consts: [[1, "container-fluid", "my-4"], [1, "card-gradient-wrapper"], [1, "card", "list-card", "shadow-sm"], [1, "card-body"], [1, "card-title", "text-center", "mb-4"], [1, "table-responsive"], [1, "d-flex", "justify-content-center", "py-5"], ["title", "Nueva Categor\xEDa", 1, "btn", "btn-primary", "btn-lg", "rounded-circle", "fab-button", "shadow-lg", 3, "click"], [1, "bi", "bi-plus-lg"], [1, "table", "table-hover", "align-middle", "mb-0", "category-table"], ["scope", "col"], ["scope", "col", 1, "text-end"], ["data-label", "Nombre"], ["data-label", "Atributos Asignados"], [1, "attributes-text"], ["data-label", "Acciones", 1, "text-end"], ["title", "Editar", 1, "btn", "btn-outline-primary", "btn-sm", "me-2", 3, "click"], [1, "bi", "bi-pencil-square"], ["title", "Eliminar", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "bi", "bi-trash"], ["colspan", "3"], [1, "text-center", "text-muted-custom", "py-5"], [1, "bi", "bi-tags", "fs-2", "d-block", "mb-2"], [1, "lead"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"]], template: function CategoriesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4);
      \u0275\u0275text(5, "Gesti\xF3n de Categor\xEDas");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(6, CategoriesListComponent_Conditional_6_Template, 14, 1, "div", 5);
      \u0275\u0275pipe(7, "async");
      \u0275\u0275conditionalBranchCreate(8, CategoriesListComponent_Conditional_8_Template, 4, 0, "div", 6);
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(9, "button", 7);
      \u0275\u0275domListener("click", function CategoriesListComponent_Template_button_click_9_listener() {
        return ctx.openCategoryModal();
      });
      \u0275\u0275domElement(10, "i", 8);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(6);
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(7, 1, ctx.categories$)) ? 6 : 8, tmp_0_0);
    }
  }, dependencies: [CommonModule, AsyncPipe], styles: ['\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.list-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.card-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.category-table.table[_ngcontent-%COMP%] {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);\n}\n.category-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.category-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n}\n.category-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.category-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.category-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {\n  opacity: 1;\n}\n.attributes-text[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #6c757d;\n  font-style: italic;\n}\n.text-muted-custom[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n@media (max-width: 768px) {\n  .category-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .category-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%], \n   .category-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], \n   .category-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n  }\n  .category-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 1rem;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n  }\n  .category-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n    transform: none;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  }\n  .category-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: right !important;\n    padding: 0.75rem 0.5rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n  }\n  .category-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n  }\n  .category-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n  }\n  .category-table[_ngcontent-%COMP%]   td[data-label=Acciones][_ngcontent-%COMP%] {\n    justify-content: flex-end;\n    gap: 0.5rem;\n  }\n  .category-table[_ngcontent-%COMP%]   td[data-label=Acciones][_ngcontent-%COMP%]::before {\n    margin-right: auto;\n  }\n}\n.fab-button[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 2rem;\n  right: 2rem;\n  z-index: 1050;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  font-size: 1.6rem;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  border: none;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transition: all 0.3s ease;\n}\n.fab-button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px) scale(1.05);\n  box-shadow: 0 8px 20px rgba(123, 104, 238, 0.3);\n}\n/*# sourceMappingURL=categories-list.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CategoriesListComponent, [{
    type: Component,
    args: [{ selector: "app-categories-list", standalone: true, imports: [CommonModule], template: '<div class="container-fluid my-4">\n  <div class="card-gradient-wrapper">\n    <div class="card list-card shadow-sm">\n      <div class="card-body">\n        <h2 class="card-title text-center mb-4">Gesti\xF3n de Categor\xEDas</h2>\n\n        @if (categories$ | async; as categories) {\n          <div class="table-responsive">\n            <table class="table table-hover align-middle mb-0 category-table">\n              <thead>\n                <tr>\n                  <th scope="col">Nombre</th>\n                  <th scope="col">Atributos Asignados</th>\n                  <th scope="col" class="text-end">Acciones</th>\n                </tr>\n              </thead>\n              <tbody>\n                @for (category of categories; track category.id) {\n                  <tr>\n                    <td data-label="Nombre">{{ category.name }}</td>\n                    <td data-label="Atributos Asignados">\n                      <span class="attributes-text">{{ getAttributeNames(category.filterableAttributes) }}</span>\n                    </td>\n                    <td data-label="Acciones" class="text-end">\n                      <button\n                        class="btn btn-outline-primary btn-sm me-2"\n                        (click)="openCategoryModal(category)"\n                        title="Editar">\n                        <i class="bi bi-pencil-square"></i>\n                      </button>\n                      <button\n                        class="btn btn-outline-danger btn-sm"\n                        (click)="onDelete(category)"\n                        title="Eliminar">\n                        <i class="bi bi-trash"></i>\n                      </button>\n                    </td>\n                  </tr>\n                } @empty {\n                  <tr>\n                    <td colspan="3">\n                      <div class="text-center text-muted-custom py-5">\n                        <i class="bi bi-tags fs-2 d-block mb-2"></i>\n                        <p class="lead">A\xFAn no hay categor\xEDas creadas.</p>\n                        <p>\xA1Crea la primera para empezar a organizar tus productos!</p>\n                      </div>\n                    </td>\n                  </tr>\n                }\n              </tbody>\n            </table>\n          </div>\n        } @else {\n          <div class="d-flex justify-content-center py-5">\n            <div class="spinner-border text-primary" role="status">\n              <span class="visually-hidden">Cargando...</span>\n            </div>\n          </div>\n        }\n      </div>\n    </div>\n  </div>\n</div>\n\n<button\n  class="btn btn-primary btn-lg rounded-circle fab-button shadow-lg"\n  (click)="openCategoryModal()"\n  title="Nueva Categor\xEDa">\n  <i class="bi bi-plus-lg"></i>\n</button>', styles: ['/* src/app/features/admin/components/categories/categories-list/categories-list.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.list-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card .card-body {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card .card-body {\n    padding: 2rem;\n  }\n}\n.card-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.category-table.table {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);\n}\n.category-table thead th {\n  font-weight: 600;\n}\n.category-table tbody tr {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n}\n.category-table tbody tr::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.category-table tbody tr:hover {\n  transform: translateY(-2px);\n}\n.category-table tbody tr:hover::after {\n  opacity: 1;\n}\n.attributes-text {\n  font-size: 0.9rem;\n  color: #6c757d;\n  font-style: italic;\n}\n.text-muted-custom {\n  color: #6c757d;\n}\n@media (max-width: 768px) {\n  .category-table thead {\n    display: none;\n  }\n  .category-table tbody,\n  .category-table tr,\n  .category-table td {\n    display: block;\n    width: 100%;\n  }\n  .category-table tr {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 1rem;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n  }\n  .category-table tr:hover {\n    transform: none;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  }\n  .category-table td {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: right !important;\n    padding: 0.75rem 0.5rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n  }\n  .category-table td:last-child {\n    border-bottom: none;\n  }\n  .category-table td::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n  }\n  .category-table td[data-label=Acciones] {\n    justify-content: flex-end;\n    gap: 0.5rem;\n  }\n  .category-table td[data-label=Acciones]::before {\n    margin-right: auto;\n  }\n}\n.fab-button {\n  position: fixed;\n  bottom: 2rem;\n  right: 2rem;\n  z-index: 1050;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  font-size: 1.6rem;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  border: none;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transition: all 0.3s ease;\n}\n.fab-button:hover {\n  transform: translateY(-4px) scale(1.05);\n  box-shadow: 0 8px 20px rgba(123, 104, 238, 0.3);\n}\n/*# sourceMappingURL=categories-list.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoriesListComponent, { className: "CategoriesListComponent", filePath: "src/app/features/admin/components/categories/categories-list/categories-list.component.ts", lineNumber: 20 });
})();
export {
  CategoriesListComponent
};
//# sourceMappingURL=chunk-VLKCWBUA.js.map
