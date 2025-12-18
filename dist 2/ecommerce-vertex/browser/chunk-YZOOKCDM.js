import {
  FooterService
} from "./chunk-FO75YCN5.js";
import {
  DefaultValueAccessor,
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
  SweetAlertService
} from "./chunk-5OJQRZGI.js";
import "./chunk-SDXAAYIW.js";
import {
  CommonModule,
  Component,
  inject,
  setClassMetadata,
  take,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/footer-management/footer-management.component.ts
function FooterManagementComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 6);
  }
}
function FooterManagementComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3, "Cargando datos del footer...");
    \u0275\u0275elementEnd()()();
  }
}
function FooterManagementComponent_Conditional_11_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Email es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function FooterManagementComponent_Conditional_11_Conditional_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Debe ser un email v\xE1lido.");
    \u0275\u0275elementEnd();
  }
}
function FooterManagementComponent_Conditional_11_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275conditionalCreate(1, FooterManagementComponent_Conditional_11_Conditional_15_Conditional_1_Template, 2, 0, "span");
    \u0275\u0275conditionalCreate(2, FooterManagementComponent_Conditional_11_Conditional_15_Conditional_2_Template, 2, 0, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.email == null ? null : ctx_r1.email.errors == null ? null : ctx_r1.email.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.email == null ? null : ctx_r1.email.errors == null ? null : ctx_r1.email.errors["email"]) ? 2 : -1);
  }
}
function FooterManagementComponent_Conditional_11_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, "La URL debe ser v\xE1lida (empezar con http:// o https://). Dejar vac\xEDo si no aplica.");
    \u0275\u0275elementEnd();
  }
}
function FooterManagementComponent_Conditional_11_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, "La URL debe ser v\xE1lida (empezar con http:// o https://). Dejar vac\xEDo si no aplica.");
    \u0275\u0275elementEnd();
  }
}
function FooterManagementComponent_Conditional_11_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, "La URL debe ser v\xE1lida (empezar con http:// o https://). Dejar vac\xEDo si no aplica.");
    \u0275\u0275elementEnd();
  }
}
function FooterManagementComponent_Conditional_11_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, "El texto de copyright es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function FooterManagementComponent_Conditional_11_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 6);
  }
}
function FooterManagementComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 12);
    \u0275\u0275listener("ngSubmit", function FooterManagementComponent_Conditional_11_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 13)(2, "div", 14)(3, "div", 15)(4, "h5", 16);
    \u0275\u0275text(5, "1. Informaci\xF3n de Contacto");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 2)(7, "div", 17)(8, "div", 18)(9, "label", 19);
    \u0275\u0275text(10, "Email de Contacto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 20)(12, "span", 21);
    \u0275\u0275element(13, "i", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(15, FooterManagementComponent_Conditional_11_Conditional_15_Template, 3, 2, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 18)(17, "label", 25);
    \u0275\u0275text(18, "Tel\xE9fono (Texto libre)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 20)(20, "span", 21);
    \u0275\u0275element(21, "i", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 27);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(23, "div", 13)(24, "div", 14)(25, "div", 15)(26, "h5", 16);
    \u0275\u0275text(27, "2. Redes Sociales (URLs Completas)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 2)(29, "div", 28)(30, "label", 29);
    \u0275\u0275text(31, "URL de Instagram");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 20)(33, "span", 21);
    \u0275\u0275element(34, "i", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "input", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(36, FooterManagementComponent_Conditional_11_Conditional_36_Template, 2, 0, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 28)(38, "label", 32);
    \u0275\u0275text(39, "URL de Facebook");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 20)(41, "span", 21);
    \u0275\u0275element(42, "i", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275element(43, "input", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(44, FooterManagementComponent_Conditional_11_Conditional_44_Template, 2, 0, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "div", 28)(46, "label", 35);
    \u0275\u0275text(47, "URL de WhatsApp (Link directo)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div", 20)(49, "span", 21);
    \u0275\u0275element(50, "i", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275element(51, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(52, FooterManagementComponent_Conditional_11_Conditional_52_Template, 2, 0, "div", 24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(53, "div", 13)(54, "div", 14)(55, "div", 15)(56, "h5", 16);
    \u0275\u0275text(57, "3. Contenido y Copyright");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 2)(59, "div", 28)(60, "label", 38);
    \u0275\u0275text(61, "Texto de Copyright");
    \u0275\u0275elementEnd();
    \u0275\u0275element(62, "input", 39);
    \u0275\u0275elementStart(63, "div", 40);
    \u0275\u0275text(64, "El a\xF1o (Ej: \xA9 2025) se a\xF1adir\xE1 autom\xE1ticamente en la tienda.");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(65, FooterManagementComponent_Conditional_11_Conditional_65_Template, 2, 0, "div", 24);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(66, "div", 41)(67, "button", 42);
    \u0275\u0275listener("click", function FooterManagementComponent_Conditional_11_Template_button_click_67_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetForm());
    });
    \u0275\u0275text(68, " Resetear Cambios ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "button", 43);
    \u0275\u0275conditionalCreate(70, FooterManagementComponent_Conditional_11_Conditional_70_Template, 1, 0, "span", 6);
    \u0275\u0275text(71);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.footerForm);
    \u0275\u0275advance(14);
    \u0275\u0275classProp("is-invalid", (ctx_r1.email == null ? null : ctx_r1.email.invalid) && (ctx_r1.email == null ? null : ctx_r1.email.touched));
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.email == null ? null : ctx_r1.email.invalid) && (ctx_r1.email == null ? null : ctx_r1.email.touched) ? 15 : -1);
    \u0275\u0275advance(21);
    \u0275\u0275conditional((ctx_r1.instagram == null ? null : ctx_r1.instagram.invalid) && (ctx_r1.instagram == null ? null : ctx_r1.instagram.touched) ? 36 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275conditional((ctx_r1.facebook == null ? null : ctx_r1.facebook.invalid) && (ctx_r1.facebook == null ? null : ctx_r1.facebook.touched) ? 44 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275conditional((ctx_r1.whatsapp == null ? null : ctx_r1.whatsapp.invalid) && (ctx_r1.whatsapp == null ? null : ctx_r1.whatsapp.touched) ? 52 : -1);
    \u0275\u0275advance(13);
    \u0275\u0275conditional((ctx_r1.copyright == null ? null : ctx_r1.copyright.invalid) && (ctx_r1.copyright == null ? null : ctx_r1.copyright.touched) ? 65 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.footerForm.dirty);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isSubmitting || ctx_r1.footerForm.invalid || !ctx_r1.footerForm.dirty);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSubmitting ? 70 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSubmitting ? "Guardando..." : "Guardar Todos los Cambios", " ");
  }
}
var FooterManagementComponent = class _FooterManagementComponent {
  fb = inject(FormBuilder);
  footerService = inject(FooterService);
  alertService = inject(SweetAlertService);
  footerForm;
  data$;
  isLoading = true;
  isSubmitting = false;
  urlPattern = /^(|https?:\/\/[^\s$.?#].[^\s]*)$/;
  constructor() {
    this.data$ = this.footerService.getFooterData();
    this.buildForm();
  }
  ngOnInit() {
    this.loadDataIntoForm();
  }
  buildForm(data = null) {
    this.footerForm = this.fb.group({
      contactPhone: [data?.contactPhone || ""],
      contactEmail: [data?.contactEmail || "", [Validators.required, Validators.email]],
      socialInstagramUrl: [data?.socialInstagramUrl || "", [Validators.pattern(this.urlPattern)]],
      socialFacebookUrl: [data?.socialFacebookUrl || "", [Validators.pattern(this.urlPattern)]],
      socialWhatsAppUrl: [data?.socialWhatsAppUrl || "", [Validators.pattern(this.urlPattern)]],
      copyrightText: [data?.copyrightText || "", Validators.required]
    });
  }
  loadDataIntoForm() {
    this.isLoading = true;
    this.data$.pipe(take(1)).subscribe((data) => {
      if (data) {
        this.buildForm(data);
      } else {
        console.log("No existing footer data. Displaying form with defaults.");
      }
      this.isLoading = false;
    });
  }
  get email() {
    return this.footerForm.get("contactEmail");
  }
  get instagram() {
    return this.footerForm.get("socialInstagramUrl");
  }
  get facebook() {
    return this.footerForm.get("socialFacebookUrl");
  }
  get whatsapp() {
    return this.footerForm.get("socialWhatsAppUrl");
  }
  get copyright() {
    return this.footerForm.get("copyrightText");
  }
  onSubmit() {
    if (this.footerForm.invalid) {
      this.footerForm.markAllAsTouched();
      this.alertService.error("Formulario Inv\xE1lido", "Revisa los campos, algunas URLs o el email no son v\xE1lidos.");
      return;
    }
    this.isSubmitting = true;
    this.alertService.loading("Actualizando Footer...");
    const formData = this.footerForm.value;
    this.footerService.saveFooterData(formData).then(() => {
      this.alertService.success("\xA1Actualizado!", "La informaci\xF3n del footer ha sido guardada.");
      this.footerForm.markAsPristine();
    }).catch((err) => {
      console.error("Error saving footer data:", err);
      this.alertService.error("Error", "No se pudieron guardar los cambios.");
    }).finally(() => {
      this.isSubmitting = false;
    });
  }
  resetForm() {
    this.alertService.confirm("Descartar Cambios", "\xBFQuieres descartar los cambios no guardados y recargar los datos actuales?").then((confirmed) => {
      if (confirmed) {
        this.loadDataIntoForm();
      }
    });
  }
  static \u0275fac = function FooterManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FooterManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FooterManagementComponent, selectors: [["app-footer-management"]], decls: 12, vars: 4, consts: [[1, "container-fluid", "my-4"], [1, "card", "product-list-card", "shadow-sm"], [1, "card-body"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "mb-0", "card-title"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "mb-4"], [1, "text-center", "p-5"], [3, "formGroup"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [3, "ngSubmit", "formGroup"], [1, "product-list-card", "mb-4"], [1, "card"], [1, "card-header"], [1, "mb-0"], [1, "row"], [1, "col-md-6", "mb-3"], ["for", "contactEmail", 1, "form-label"], [1, "input-group"], [1, "input-group-text"], [1, "bi", "bi-envelope"], ["type", "email", "id", "contactEmail", "formControlName", "contactEmail", 1, "form-control"], [1, "invalid-feedback", "d-block"], ["for", "contactPhone", 1, "form-label"], [1, "bi", "bi-telephone"], ["type", "text", "id", "contactPhone", "formControlName", "contactPhone", "placeholder", "(Ej: +54 9 261...", 1, "form-control"], [1, "mb-3"], ["for", "socialInstagramUrl", 1, "form-label"], [1, "bi", "bi-instagram"], ["type", "url", "id", "socialInstagramUrl", "formControlName", "socialInstagramUrl", "placeholder", "https://instagram.com/usuario", 1, "form-control"], ["for", "socialFacebookUrl", 1, "form-label"], [1, "bi", "bi-facebook"], ["type", "url", "id", "socialFacebookUrl", "formControlName", "socialFacebookUrl", "placeholder", "https://facebook.com/pagina", 1, "form-control"], ["for", "socialWhatsAppUrl", 1, "form-label"], [1, "bi", "bi-whatsapp"], ["type", "url", "id", "socialWhatsAppUrl", "formControlName", "socialWhatsAppUrl", "placeholder", "https://wa.me/549...", 1, "form-control"], ["for", "copyrightText", 1, "form-label"], ["type", "text", "id", "copyrightText", "formControlName", "copyrightText", "placeholder", "Vertex. Todos los derechos reservados.", 1, "form-control"], [1, "form-text"], [1, "mt-4", "d-flex", "justify-content-between"], ["type", "button", 1, "btn", "btn-outline-warning", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", "btn-lg", 3, "disabled"]], template: function FooterManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4);
      \u0275\u0275text(5, "Gesti\xF3n del Footer de la Tienda");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "button", 5);
      \u0275\u0275listener("click", function FooterManagementComponent_Template_button_click_6_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275conditionalCreate(7, FooterManagementComponent_Conditional_7_Template, 1, 0, "span", 6);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(9, "hr", 7);
      \u0275\u0275conditionalCreate(10, FooterManagementComponent_Conditional_10_Template, 4, 0, "div", 8)(11, FooterManagementComponent_Conditional_11_Template, 72, 12, "form", 9);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", ctx.isSubmitting || ctx.footerForm.invalid || !ctx.footerForm.dirty);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSubmitting ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isSubmitting ? "Guardando..." : "Guardar Cambios", " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isLoading ? 10 : 11);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: [`

@keyframes _ngcontent-%COMP%_gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.product-list-card[_ngcontent-%COMP%] {
  position: relative;
  border-radius: 1rem;
  padding: 2px;
  background: transparent;
}
.product-list-card[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  background:
    linear-gradient(
      90deg,
      #7b68ee,
      #007bff,
      #7b68ee);
  background-size: 200% 200%;
  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;
}
.product-list-card[_ngcontent-%COMP%]    > .card-body[_ngcontent-%COMP%] {
  position: relative;
  z-index: 2;
  background-color: #f4f6f9;
  border-radius: calc(1rem - 2px);
  padding: 1.5rem;
}
@media (min-width: 768px) {
  .product-list-card[_ngcontent-%COMP%]    > .card-body[_ngcontent-%COMP%] {
    padding: 2rem;
  }
}
.product-list-card[_ngcontent-%COMP%]    > .card[_ngcontent-%COMP%] {
  position: relative;
  z-index: 2;
  background-color: #ffffff;
  border-radius: calc(1rem - 2px);
  border: none;
}
.product-list-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {
  font-weight: 700;
  background:
    linear-gradient(
      45deg,
      #007bff,
      #7b68ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.form-control[_ngcontent-%COMP%], 
.form-select[_ngcontent-%COMP%] {
  background-color: #ffffff;
  color: #1c2a42;
  border: 1px solid #dfe3e8;
  border-radius: 0.75rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  padding: 0.5rem 1rem;
}
.form-control[_ngcontent-%COMP%]:hover, 
.form-select[_ngcontent-%COMP%]:hover {
  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);
}
.form-control[_ngcontent-%COMP%]:focus, 
.form-select[_ngcontent-%COMP%]:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
}
.form-select[_ngcontent-%COMP%] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
}
.img-thumbnail[_ngcontent-%COMP%] {
  max-height: 150px;
  object-fit: cover;
  background-color: #fff;
  border: 1px solid #dfe3e8;
}
.card.bg-light[_ngcontent-%COMP%] {
  background-color: #ffffff !important;
  border: 1px solid #dfe3e8;
}
/*# sourceMappingURL=footer-management.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FooterManagementComponent, [{
    type: Component,
    args: [{ selector: "app-footer-management", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="container-fluid my-4">

  <div class="card product-list-card shadow-sm">
    <div class="card-body">

      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0 card-title">Gesti\xF3n del Footer de la Tienda</h2>
        <button class="btn btn-primary" (click)="onSubmit()" [disabled]="isSubmitting || footerForm.invalid || !footerForm.dirty">
          @if (isSubmitting) {
            <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
          }
          {{ isSubmitting ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>

      <hr class="mb-4">

      @if (isLoading) {
        <div class="text-center p-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando datos del footer...</span>
          </div>
        </div>
      } @else {
        <form [formGroup]="footerForm" (ngSubmit)="onSubmit()">

          <div class="product-list-card mb-4">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">1. Informaci\xF3n de Contacto</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="contactEmail" class="form-label">Email de Contacto</label>
                    <div class="input-group">
                      <span class="input-group-text"><i class="bi bi-envelope"></i></span>
                      <input type="email" id="contactEmail" class="form-control" formControlName="contactEmail"
                             [class.is-invalid]="email?.invalid && email?.touched">
                    </div>
                    @if (email?.invalid && email?.touched) {
                      <div class="invalid-feedback d-block">
                        @if (email?.errors?.['required']) { <span>Email es obligatorio.</span> }
                        @if (email?.errors?.['email']) { <span>Debe ser un email v\xE1lido.</span> }
                      </div>
                    }
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="contactPhone" class="form-label">Tel\xE9fono (Texto libre)</label>
                    <div class="input-group">
                      <span class="input-group-text"><i class="bi bi-telephone"></i></span>
                      <input type="text" id="contactPhone" class="form-control" formControlName="contactPhone" placeholder="(Ej: +54 9 261...">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="product-list-card mb-4">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">2. Redes Sociales (URLs Completas)</h5>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <label for="socialInstagramUrl" class="form-label">URL de Instagram</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-instagram"></i></span>
                    <input type="url" id="socialInstagramUrl" class="form-control" formControlName="socialInstagramUrl" placeholder="https://instagram.com/usuario">
                  </div>
                  @if (instagram?.invalid && instagram?.touched) {
                    <div class="invalid-feedback d-block">La URL debe ser v\xE1lida (empezar con http:// o https://). Dejar vac\xEDo si no aplica.</div>
                  }
                </div>
                <div class="mb-3">
                  <label for="socialFacebookUrl" class="form-label">URL de Facebook</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-facebook"></i></span>
                    <input type="url" id="socialFacebookUrl" class="form-control" formControlName="socialFacebookUrl" placeholder="https://facebook.com/pagina">
                  </div>
                  @if (facebook?.invalid && facebook?.touched) {
                    <div class="invalid-feedback d-block">La URL debe ser v\xE1lida (empezar con http:// o https://). Dejar vac\xEDo si no aplica.</div>
                  }
                </div>
                <div class="mb-3">
                  <label for="socialWhatsAppUrl" class="form-label">URL de WhatsApp (Link directo)</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-whatsapp"></i></span>
                    <input type="url" id="socialWhatsAppUrl" class="form-control" formControlName="socialWhatsAppUrl" placeholder="https://wa.me/549...">
                  </div>
                  @if (whatsapp?.invalid && whatsapp?.touched) {
                    <div class="invalid-feedback d-block">La URL debe ser v\xE1lida (empezar con http:// o https://). Dejar vac\xEDo si no aplica.</div>
                  }
                </div>
              </div>
            </div>
          </div>

          <div class="product-list-card mb-4">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">3. Contenido y Copyright</h5>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <label for="copyrightText" class="form-label">Texto de Copyright</label>
                  <input type="text" id="copyrightText" class="form-control" formControlName="copyrightText" placeholder="Vertex. Todos los derechos reservados.">
                  <div class="form-text">El a\xF1o (Ej: \xA9 2025) se a\xF1adir\xE1 autom\xE1ticamente en la tienda.</div>
                  @if (copyright?.invalid && copyright?.touched) {
                    <div class="invalid-feedback d-block">El texto de copyright es obligatorio.</div>
                  }
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 d-flex justify-content-between">
            <button type="button" class="btn btn-outline-warning" (click)="resetForm()" [disabled]="!footerForm.dirty">
              Resetear Cambios
            </button>
            <button type="submit" class="btn btn-primary btn-lg" [disabled]="isSubmitting || footerForm.invalid || !footerForm.dirty">
              @if (isSubmitting) {
                <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
              }
              {{ isSubmitting ? 'Guardando...' : 'Guardar Todos los Cambios' }}
            </button>
          </div>

        </form>
      }
    </div>
  </div>
</div>
`, styles: [`/* src/app/features/admin/components/footer-management/footer-management.component.scss */
@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.product-list-card {
  position: relative;
  border-radius: 1rem;
  padding: 2px;
  background: transparent;
}
.product-list-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  background:
    linear-gradient(
      90deg,
      #7b68ee,
      #007bff,
      #7b68ee);
  background-size: 200% 200%;
  animation: gradient-animation 8s ease infinite;
}
.product-list-card > .card-body {
  position: relative;
  z-index: 2;
  background-color: #f4f6f9;
  border-radius: calc(1rem - 2px);
  padding: 1.5rem;
}
@media (min-width: 768px) {
  .product-list-card > .card-body {
    padding: 2rem;
  }
}
.product-list-card > .card {
  position: relative;
  z-index: 2;
  background-color: #ffffff;
  border-radius: calc(1rem - 2px);
  border: none;
}
.product-list-card .card-title {
  font-weight: 700;
  background:
    linear-gradient(
      45deg,
      #007bff,
      #7b68ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.form-control,
.form-select {
  background-color: #ffffff;
  color: #1c2a42;
  border: 1px solid #dfe3e8;
  border-radius: 0.75rem;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  padding: 0.5rem 1rem;
}
.form-control:hover,
.form-select:hover {
  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);
}
.form-control:focus,
.form-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
}
.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
}
.img-thumbnail {
  max-height: 150px;
  object-fit: cover;
  background-color: #fff;
  border: 1px solid #dfe3e8;
}
.card.bg-light {
  background-color: #ffffff !important;
  border: 1px solid #dfe3e8;
}
/*# sourceMappingURL=footer-management.component.css.map */
`] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FooterManagementComponent, { className: "FooterManagementComponent", filePath: "src/app/features/admin/components/footer-management/footer-management.component.ts", lineNumber: 16 });
})();
export {
  FooterManagementComponent
};
//# sourceMappingURL=chunk-YZOOKCDM.js.map
