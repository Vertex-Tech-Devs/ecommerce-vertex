import {
  AuthService
} from "./chunk-7ZKMVSWO.js";
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
import {
  Router
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import {
  CommonModule,
  Component,
  NgClass,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-QBKDZG3W.js";
import {
  __async
} from "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/account/account.component.ts
function AccountComponent_Conditional_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "La contrase\xF1a actual es obligatoria.");
    \u0275\u0275elementEnd();
  }
}
function AccountComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275conditionalCreate(1, AccountComponent_Conditional_19_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.formControls["currentPassword"].errors == null ? null : ctx_r0.formControls["currentPassword"].errors["required"]) ? 1 : -1);
  }
}
function AccountComponent_Conditional_27_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "La nueva contrase\xF1a es obligatoria.");
    \u0275\u0275elementEnd();
  }
}
function AccountComponent_Conditional_27_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Debe tener al menos 6 caracteres.");
    \u0275\u0275elementEnd();
  }
}
function AccountComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275conditionalCreate(1, AccountComponent_Conditional_27_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, AccountComponent_Conditional_27_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.formControls["newPassword"].errors == null ? null : ctx_r0.formControls["newPassword"].errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.formControls["newPassword"].errors == null ? null : ctx_r0.formControls["newPassword"].errors["minlength"]) ? 2 : -1);
  }
}
function AccountComponent_Conditional_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Confirma tu nueva contrase\xF1a.");
    \u0275\u0275elementEnd();
  }
}
function AccountComponent_Conditional_35_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Las contrase\xF1as no coinciden.");
    \u0275\u0275elementEnd();
  }
}
function AccountComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275conditionalCreate(1, AccountComponent_Conditional_35_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, AccountComponent_Conditional_35_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.formControls["confirmNewPassword"].errors == null ? null : ctx_r0.formControls["confirmNewPassword"].errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.passwordForm.errors == null ? null : ctx_r0.passwordForm.errors["passwordsMismatch"]) ? 2 : -1);
  }
}
function AccountComponent_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 23);
  }
}
function passwordsMatchValidator() {
  return (control) => {
    const password = control.get("newPassword");
    const confirmPassword = control.get("confirmNewPassword");
    if (!password || !confirmPassword) {
      return null;
    }
    if (password.value !== confirmPassword.value && confirmPassword.touched) {
      return { "passwordsMismatch": true };
    }
    return null;
  };
}
var AccountComponent = class _AccountComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  sweetAlertService = inject(SweetAlertService);
  router = inject(Router);
  passwordForm;
  isSubmitting = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmNewPassword = false;
  ngOnInit() {
    this.passwordForm = this.fb.group({
      currentPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ["", [Validators.required]]
    }, {
      validators: passwordsMatchValidator()
    });
  }
  get formControls() {
    return this.passwordForm.controls;
  }
  onSubmit() {
    return __async(this, null, function* () {
      this.passwordForm.markAllAsTouched();
      if (this.passwordForm.invalid) {
        this.sweetAlertService.error("Formulario inv\xE1lido", "Por favor, corrige los errores.");
        return;
      }
      this.isSubmitting = true;
      const { currentPassword, newPassword } = this.passwordForm.value;
      try {
        const success = yield this.authService.changePassword(currentPassword, newPassword);
        if (success) {
          yield this.authService.logout({
            title: "Contrase\xF1a Actualizada",
            text: "Por favor, inicia sesi\xF3n de nuevo con tus nuevas credenciales."
          });
        }
      } catch (error) {
        let errorMessage = "Ocurri\xF3 un error inesperado al cambiar la contrase\xF1a.";
        switch (error.code) {
          case "auth/invalid-credential":
          case "auth/wrong-password":
            errorMessage = "La contrase\xF1a actual es incorrecta. Por favor, verifica tus credenciales.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Demasiados intentos fallidos. Por favor, intenta de nuevo m\xE1s tarde.";
            break;
          case "auth/requires-recent-login":
            errorMessage = "Tu sesi\xF3n ha expirado. Por favor, cierra y vuelve a iniciar sesi\xF3n para cambiar tu contrase\xF1a.";
            break;
          case "auth/weak-password":
            errorMessage = "La nueva contrase\xF1a es demasiado d\xE9bil. Debe tener al menos 6 caracteres.";
            break;
          default:
            errorMessage = `Error: ${error.message || "Error desconocido"}`;
            break;
        }
        this.sweetAlertService.error("Error al cambiar contrase\xF1a", errorMessage);
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  logout() {
    this.authService.logout();
  }
  static \u0275fac = function AccountComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountComponent, selectors: [["app-account"]], decls: 45, vars: 21, consts: [[1, "container", "my-4"], [1, "row", "justify-content-center"], [1, "col-md-8", "col-lg-6"], [1, "card-gradient-wrapper"], [1, "card", "shadow-sm", "rounded-3"], [1, "card-header", "account-card-header", "text-center"], [1, "mb-0", "page-title"], [1, "card-body", "p-4"], [1, "form-title", "text-center", "mb-4"], [3, "ngSubmit", "formGroup"], [1, "mb-3"], ["for", "currentPassword", 1, "form-label"], [1, "password-input-wrapper"], ["id", "currentPassword", "formControlName", "currentPassword", 1, "form-control", 3, "type"], ["type", "button", 1, "password-toggle-icon", 3, "click"], [1, "bi", 3, "ngClass"], [1, "invalid-feedback", "d-block"], ["for", "newPassword", 1, "form-label"], ["id", "newPassword", "formControlName", "newPassword", 1, "form-control", 3, "type"], ["for", "confirmNewPassword", 1, "form-label"], ["id", "confirmNewPassword", "formControlName", "confirmNewPassword", 1, "form-control", 3, "type"], [1, "d-grid", "gap-2", "mt-4"], ["id", "save-changes-btn", "type", "submit", 1, "btn", 3, "disabled"], ["aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "form-divider"], [1, "text-center"], [1, "btn", "btn-outline-danger", 3, "click"], [1, "bi", "bi-box-arrow-right", "me-2"]], template: function AccountComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "h2", 6);
      \u0275\u0275text(7, "Mi Cuenta");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 7)(9, "h4", 8);
      \u0275\u0275text(10, "Cambiar Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "form", 9);
      \u0275\u0275listener("ngSubmit", function AccountComponent_Template_form_ngSubmit_11_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(12, "div", 10)(13, "label", 11);
      \u0275\u0275text(14, "Contrase\xF1a Actual");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 12);
      \u0275\u0275element(16, "input", 13);
      \u0275\u0275elementStart(17, "button", 14);
      \u0275\u0275listener("click", function AccountComponent_Template_button_click_17_listener() {
        return ctx.showCurrentPassword = !ctx.showCurrentPassword;
      });
      \u0275\u0275element(18, "i", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(19, AccountComponent_Conditional_19_Template, 2, 1, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 10)(21, "label", 17);
      \u0275\u0275text(22, "Nueva Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 12);
      \u0275\u0275element(24, "input", 18);
      \u0275\u0275elementStart(25, "button", 14);
      \u0275\u0275listener("click", function AccountComponent_Template_button_click_25_listener() {
        return ctx.showNewPassword = !ctx.showNewPassword;
      });
      \u0275\u0275element(26, "i", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(27, AccountComponent_Conditional_27_Template, 3, 2, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div", 10)(29, "label", 19);
      \u0275\u0275text(30, "Confirmar Nueva Contrase\xF1a");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div", 12);
      \u0275\u0275element(32, "input", 20);
      \u0275\u0275elementStart(33, "button", 14);
      \u0275\u0275listener("click", function AccountComponent_Template_button_click_33_listener() {
        return ctx.showConfirmNewPassword = !ctx.showConfirmNewPassword;
      });
      \u0275\u0275element(34, "i", 15);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(35, AccountComponent_Conditional_35_Template, 3, 2, "div", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 21)(37, "button", 22);
      \u0275\u0275conditionalCreate(38, AccountComponent_Conditional_38_Template, 1, 0, "span", 23);
      \u0275\u0275text(39, " Guardar Cambios ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(40, "hr", 24);
      \u0275\u0275elementStart(41, "div", 25)(42, "button", 26);
      \u0275\u0275listener("click", function AccountComponent_Template_button_click_42_listener() {
        return ctx.logout();
      });
      \u0275\u0275element(43, "i", 27);
      \u0275\u0275text(44, " Cerrar Sesi\xF3n ");
      \u0275\u0275elementEnd()()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275property("formGroup", ctx.passwordForm);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("is-invalid-wrapper", ctx.formControls["currentPassword"].invalid && ctx.formControls["currentPassword"].touched);
      \u0275\u0275advance();
      \u0275\u0275property("type", ctx.showCurrentPassword ? "text" : "password");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.showCurrentPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.showCurrentPassword ? "bi-eye-slash-fill" : "bi-eye-fill");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.formControls["currentPassword"].invalid && ctx.formControls["currentPassword"].touched ? 19 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("is-invalid-wrapper", ctx.formControls["newPassword"].invalid && ctx.formControls["newPassword"].touched);
      \u0275\u0275advance();
      \u0275\u0275property("type", ctx.showNewPassword ? "text" : "password");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.showNewPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.showNewPassword ? "bi-eye-slash-fill" : "bi-eye-fill");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.formControls["newPassword"].invalid && ctx.formControls["newPassword"].touched ? 27 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("is-invalid-wrapper", ctx.formControls["confirmNewPassword"].invalid && ctx.formControls["confirmNewPassword"].touched || (ctx.passwordForm.errors == null ? null : ctx.passwordForm.errors["passwordsMismatch"]) && ctx.formControls["confirmNewPassword"].touched);
      \u0275\u0275advance();
      \u0275\u0275property("type", ctx.showConfirmNewPassword ? "text" : "password");
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", ctx.showConfirmNewPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", ctx.showConfirmNewPassword ? "bi-eye-slash-fill" : "bi-eye-fill");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.formControls["confirmNewPassword"].invalid && ctx.formControls["confirmNewPassword"].touched || (ctx.passwordForm.errors == null ? null : ctx.passwordForm.errors["passwordsMismatch"]) && ctx.formControls["confirmNewPassword"].touched ? 35 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.passwordForm.invalid || ctx.isSubmitting);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSubmitting ? 38 : -1);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n  box-shadow: 0 8px 32px rgba(123, 104, 238, 0.3);\n}\n.card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  overflow: hidden;\n  background-color: #21213b;\n}\n.account-card-header[_ngcontent-%COMP%] {\n  background: transparent;\n  padding: 1.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n.page-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  font-size: 1.8rem;\n  letter-spacing: 1px;\n}\n.form-title[_ngcontent-%COMP%] {\n  color: #f0f0f0;\n  font-weight: 500;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #a0a0a0;\n  letter-spacing: 0.5px;\n}\n#save-changes-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgb(143.0357142857, 126.9196428571, 240.5803571429),\n      #7b68ee);\n  color: white;\n  font-weight: 600;\n  padding: 12px 20px;\n  border-radius: 8px;\n  border: none;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n#save-changes-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(123, 104, 238, 0.4);\n}\n#save-changes-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n#save-changes-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-divider[_ngcontent-%COMP%] {\n  border: 0;\n  height: 1px;\n  background-image:\n    linear-gradient(\n      to right,\n      transparent,\n      rgba(255, 255, 255, 0.2),\n      transparent);\n  margin: 2rem 0;\n}\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  border: 1px solid #444;\n  border-radius: 8px;\n  background-color: rgb(42.1467391304, 42.1467391304, 75.3532608696);\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: none;\n  background-color: transparent;\n  color: #fff;\n  flex-grow: 1;\n  padding-right: 2.75rem;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]::placeholder {\n  color: #888;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   .password-toggle-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  right: 0.75rem;\n  transform: translateY(-50%);\n  z-index: 10;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.25rem;\n  color: #888;\n  line-height: 1;\n  transition: color 0.2s ease-in-out;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   .password-toggle-icon[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.password-input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: #7b68ee;\n  box-shadow: 0 0 0 0.2rem rgba(123, 104, 238, 0.25);\n}\n.is-invalid-wrapper[_ngcontent-%COMP%] {\n  border-color: #e57373;\n  box-shadow: 0 0 0 0.2rem rgba(229, 115, 115, 0.25);\n}\n.is-invalid-wrapper[_ngcontent-%COMP%]   .password-toggle-icon[_ngcontent-%COMP%] {\n  color: #e57373;\n}\n/*# sourceMappingURL=account.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccountComponent, [{
    type: Component,
    args: [{ selector: "app-account", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="container my-4">
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="card-gradient-wrapper">
        <div class="card shadow-sm rounded-3">
          <div class="card-header account-card-header text-center">
            <h2 class="mb-0 page-title">Mi Cuenta</h2>
          </div>
          <div class="card-body p-4">
            <h4 class="form-title text-center mb-4">Cambiar Contrase\xF1a</h4>

            <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label for="currentPassword" class="form-label">Contrase\xF1a Actual</label>
                <div class="password-input-wrapper" [class.is-invalid-wrapper]="formControls['currentPassword'].invalid && formControls['currentPassword'].touched">
                  <input [type]="showCurrentPassword ? 'text' : 'password'" class="form-control" id="currentPassword" formControlName="currentPassword" />
                  <button type="button" class="password-toggle-icon" (click)="showCurrentPassword = !showCurrentPassword" [attr.aria-label]="showCurrentPassword ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'">
                    <i class="bi" [ngClass]="showCurrentPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
                  </button>
                </div>
                @if (formControls['currentPassword'].invalid && formControls['currentPassword'].touched) {
                  <div class="invalid-feedback d-block">
                    @if (formControls['currentPassword'].errors?.['required']) {
                      <div>La contrase\xF1a actual es obligatoria.</div>
                    }
                  </div>
                }
              </div>

              <div class="mb-3">
                <label for="newPassword" class="form-label">Nueva Contrase\xF1a</label>
                <div class="password-input-wrapper" [class.is-invalid-wrapper]="formControls['newPassword'].invalid && formControls['newPassword'].touched">
                  <input [type]="showNewPassword ? 'text' : 'password'" class="form-control" id="newPassword" formControlName="newPassword" />
                  <button type="button" class="password-toggle-icon" (click)="showNewPassword = !showNewPassword" [attr.aria-label]="showNewPassword ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'">
                    <i class="bi" [ngClass]="showNewPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
                  </button>
                </div>
                @if (formControls['newPassword'].invalid && formControls['newPassword'].touched) {
                  <div class="invalid-feedback d-block">
                    @if (formControls['newPassword'].errors?.['required']) {
                      <div>La nueva contrase\xF1a es obligatoria.</div>
                    }
                    @if (formControls['newPassword'].errors?.['minlength']) {
                      <div>Debe tener al menos 6 caracteres.</div>
                    }
                  </div>
                }
              </div>

              <div class="mb-3">
                <label for="confirmNewPassword" class="form-label">Confirmar Nueva Contrase\xF1a</label>
                <div class="password-input-wrapper" [class.is-invalid-wrapper]="(formControls['confirmNewPassword'].invalid && formControls['confirmNewPassword'].touched) || (passwordForm.errors?.['passwordsMismatch'] && formControls['confirmNewPassword'].touched)">
                  <input [type]="showConfirmNewPassword ? 'text' : 'password'" class="form-control" id="confirmNewPassword" formControlName="confirmNewPassword" />
                  <button type="button" class="password-toggle-icon" (click)="showConfirmNewPassword = !showConfirmNewPassword" [attr.aria-label]="showConfirmNewPassword ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'">
                    <i class="bi" [ngClass]="showConfirmNewPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
                  </button>
                </div>
                @if ((formControls['confirmNewPassword'].invalid && formControls['confirmNewPassword'].touched) || (passwordForm.errors?.['passwordsMismatch'] && formControls['confirmNewPassword'].touched)) {
                  <div class="invalid-feedback d-block">
                    @if (formControls['confirmNewPassword'].errors?.['required']) {
                      <div>Confirma tu nueva contrase\xF1a.</div>
                    }
                    @if (passwordForm.errors?.['passwordsMismatch']) {
                      <div>Las contrase\xF1as no coinciden.</div>
                    }
                  </div>
                }
              </div>

              <div class="d-grid gap-2 mt-4">
                <button id="save-changes-btn" type="submit" class="btn" [disabled]="passwordForm.invalid || isSubmitting">
                  @if (isSubmitting) {
                    <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                  }
                  Guardar Cambios
                </button>
              </div>
            </form>

            <hr class="form-divider" />

            <div class="text-center">
              <button class="btn btn-outline-danger" (click)="logout()">
                <i class="bi bi-box-arrow-right me-2"></i>
                Cerrar Sesi\xF3n
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`, styles: ["/* src/app/features/admin/components/account/account.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n  box-shadow: 0 8px 32px rgba(123, 104, 238, 0.3);\n}\n.card {\n  border: none;\n  border-radius: 12px;\n  overflow: hidden;\n  background-color: #21213b;\n}\n.account-card-header {\n  background: transparent;\n  padding: 1.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n.page-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  font-size: 1.8rem;\n  letter-spacing: 1px;\n}\n.form-title {\n  color: #f0f0f0;\n  font-weight: 500;\n}\n.form-label {\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #a0a0a0;\n  letter-spacing: 0.5px;\n}\n#save-changes-btn {\n  background:\n    linear-gradient(\n      135deg,\n      rgb(143.0357142857, 126.9196428571, 240.5803571429),\n      #7b68ee);\n  color: white;\n  font-weight: 600;\n  padding: 12px 20px;\n  border-radius: 8px;\n  border: none;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n#save-changes-btn:hover:not(:disabled) {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(123, 104, 238, 0.4);\n}\n#save-changes-btn:active:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n#save-changes-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-divider {\n  border: 0;\n  height: 1px;\n  background-image:\n    linear-gradient(\n      to right,\n      transparent,\n      rgba(255, 255, 255, 0.2),\n      transparent);\n  margin: 2rem 0;\n}\n.password-input-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  border: 1px solid #444;\n  border-radius: 8px;\n  background-color: rgb(42.1467391304, 42.1467391304, 75.3532608696);\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n.password-input-wrapper .form-control {\n  border: none;\n  box-shadow: none;\n  background-color: transparent;\n  color: #fff;\n  flex-grow: 1;\n  padding-right: 2.75rem;\n}\n.password-input-wrapper .form-control::placeholder {\n  color: #888;\n}\n.password-input-wrapper .form-control:focus {\n  outline: none;\n}\n.password-input-wrapper .password-toggle-icon {\n  position: absolute;\n  top: 50%;\n  right: 0.75rem;\n  transform: translateY(-50%);\n  z-index: 10;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.25rem;\n  color: #888;\n  line-height: 1;\n  transition: color 0.2s ease-in-out;\n}\n.password-input-wrapper .password-toggle-icon:hover {\n  color: #fff;\n}\n.password-input-wrapper:focus-within {\n  border-color: #7b68ee;\n  box-shadow: 0 0 0 0.2rem rgba(123, 104, 238, 0.25);\n}\n.is-invalid-wrapper {\n  border-color: #e57373;\n  box-shadow: 0 0 0 0.2rem rgba(229, 115, 115, 0.25);\n}\n.is-invalid-wrapper .password-toggle-icon {\n  color: #e57373;\n}\n/*# sourceMappingURL=account.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountComponent, { className: "AccountComponent", filePath: "src/app/features/admin/components/account/account.component.ts", lineNumber: 29 });
})();
export {
  AccountComponent,
  passwordsMatchValidator
};
//# sourceMappingURL=chunk-3VDEH7UC.js.map
