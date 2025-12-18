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
import "./chunk-5OJQRZGI.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import {
  CommonModule,
  Component,
  NgClass,
  inject,
  setClassMetadata,
  take,
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import {
  __async
} from "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/login/login.component.ts
function LoginComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.authErrorMessage, " ");
  }
}
function LoginComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275text(1, " Ya has iniciado sesi\xF3n. ");
    \u0275\u0275elementStart(2, "a", 10);
    \u0275\u0275listener("click", function LoginComponent_Conditional_10_Template_a_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.logout());
    });
    \u0275\u0275text(3, "Cerrar sesi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " para usar otra cuenta. ");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_11_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El email es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_11_Conditional_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El formato del email no es v\xE1lido.");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_11_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275conditionalCreate(1, LoginComponent_Conditional_11_Conditional_5_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, LoginComponent_Conditional_11_Conditional_5_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.formControls["email"].errors == null ? null : ctx_r0.formControls["email"].errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.formControls["email"].errors == null ? null : ctx_r0.formControls["email"].errors["email"]) ? 2 : -1);
  }
}
function LoginComponent_Conditional_11_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "La contrase\xF1a es obligatoria.");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_11_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275conditionalCreate(1, LoginComponent_Conditional_11_Conditional_13_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.formControls["password"].errors == null ? null : ctx_r0.formControls["password"].errors["required"]) ? 1 : -1);
  }
}
function LoginComponent_Conditional_11_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 23);
  }
}
function LoginComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 11);
    \u0275\u0275listener("ngSubmit", function LoginComponent_Conditional_11_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 12)(2, "label", 13);
    \u0275\u0275text(3, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 14);
    \u0275\u0275conditionalCreate(5, LoginComponent_Conditional_11_Conditional_5_Template, 3, 2, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 12)(7, "label", 16);
    \u0275\u0275text(8, "Contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 17);
    \u0275\u0275element(10, "input", 18);
    \u0275\u0275elementStart(11, "button", 19);
    \u0275\u0275listener("click", function LoginComponent_Conditional_11_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.showPassword = !ctx_r0.showPassword);
    });
    \u0275\u0275element(12, "i", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, LoginComponent_Conditional_11_Conditional_13_Template, 2, 1, "div", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 21)(15, "button", 22);
    \u0275\u0275conditionalCreate(16, LoginComponent_Conditional_11_Conditional_16_Template, 1, 0, "span", 23);
    \u0275\u0275text(17, " Ingresar ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r0.loginForm);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid", ctx_r0.formControls["email"].invalid && ctx_r0.formControls["email"].touched);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.formControls["email"].invalid && ctx_r0.formControls["email"].touched ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("is-invalid-wrapper", ctx_r0.formControls["password"].invalid && ctx_r0.formControls["password"].touched);
    \u0275\u0275advance();
    \u0275\u0275property("type", ctx_r0.showPassword ? "text" : "password");
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r0.showPassword ? "Ocultar contrase\xF1a" : "Mostrar contrase\xF1a");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r0.showPassword ? "bi-eye-slash-fill" : "bi-eye-fill");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.formControls["password"].invalid && ctx_r0.formControls["password"].touched ? 13 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r0.loginForm.invalid || ctx_r0.isSubmitting);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSubmitting ? 16 : -1);
  }
}
var LoginComponent = class _LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  loginForm;
  authErrorMessage = "";
  isAlreadyLogged = false;
  isSubmitting = false;
  showPassword = false;
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
    this.authService.isAuthenticated().pipe(take(1)).subscribe((isAuth) => {
      this.isAlreadyLogged = isAuth;
    });
    this.route.queryParams.subscribe((params) => {
      if (params["authError"]) {
        this.authErrorMessage = "Debes iniciar sesi\xF3n para acceder al panel de administraci\xF3n.";
      }
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).pipe(take(1)).subscribe({
      next: () => {
        this.router.navigate(["/admin"]);
      },
      error: (err) => {
        this.authErrorMessage = "Error al iniciar sesi\xF3n. Verifica tus credenciales.";
        this.isSubmitting = false;
      }
    });
  }
  logout() {
    return __async(this, null, function* () {
      yield this.authService.logout();
      this.isAlreadyLogged = false;
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 12, vars: 3, consts: [[1, "login-container"], [1, "card-gradient-wrapper"], [1, "card", "shadow-sm", "rounded-3"], [1, "card-header", "login-card-header", "text-center"], [1, "mb-0"], [1, "card-body", "p-4"], [1, "form-title", "text-center", "mb-4"], [1, "alert", "alert-custom", "alert-warning"], [1, "alert", "alert-custom", "alert-info"], [3, "formGroup"], ["href", "#", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "mb-3"], ["for", "email", 1, "form-label"], ["id", "email", "type", "email", "formControlName", "email", 1, "form-control"], [1, "invalid-feedback", "d-block"], ["for", "password", 1, "form-label"], [1, "password-input-wrapper"], ["id", "password", "formControlName", "password", 1, "form-control", 3, "type"], ["type", "button", 1, "password-toggle-icon", 3, "click"], [1, "bi", 3, "ngClass"], [1, "d-grid", "gap-2", "mt-4"], ["id", "login-btn", 1, "btn", 3, "disabled"], ["aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4);
      \u0275\u0275text(5, "Panel Administrador");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5)(7, "h4", 6);
      \u0275\u0275text(8, "Iniciar Sesi\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, LoginComponent_Conditional_9_Template, 2, 1, "div", 7);
      \u0275\u0275conditionalCreate(10, LoginComponent_Conditional_10_Template, 5, 0, "div", 8);
      \u0275\u0275conditionalCreate(11, LoginComponent_Conditional_11_Template, 18, 12, "form", 9);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.authErrorMessage ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isAlreadyLogged ? 10 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isAlreadyLogged ? 11 : -1);
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], styles: ["\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.login-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  padding: 1rem;\n  background-color: #1a1a2e;\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n  box-shadow: 0 8px 32px rgba(123, 104, 238, 0.3);\n  width: 100%;\n  max-width: 450px;\n}\n.card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  overflow: hidden;\n  background-color: #21213b;\n}\n.login-card-header[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #fff;\n  padding: 1.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n.login-card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-weight: 400;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  font-size: 1.4rem;\n}\n.form-title[_ngcontent-%COMP%] {\n  color: #f0f0f0;\n  font-weight: 500;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #a0a0a0;\n  letter-spacing: 0.5px;\n}\n#login-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgb(143.0357142857, 126.9196428571, 240.5803571429),\n      #7b68ee);\n  color: white;\n  font-weight: 600;\n  padding: 12px 20px;\n  border-radius: 8px;\n  border: none;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n#login-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(123, 104, 238, 0.4);\n}\n#login-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-control[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  background-color: rgb(42.1467391304, 42.1467391304, 75.3532608696);\n  border: 1px solid #444;\n  border-radius: 8px;\n  color: #fff;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.75rem 1rem;\n}\n.form-control[_ngcontent-%COMP%]::placeholder {\n  color: #888;\n}\n.password-input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  background-color: rgb(42.1467391304, 42.1467391304, 75.3532608696);\n  border: 1px solid #444;\n  border-radius: 8px;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: none;\n  box-shadow: none;\n  flex-grow: 1;\n  padding-right: 2.75rem;\n}\n.password-input-wrapper[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.password-toggle-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  right: 0.75rem;\n  transform: translateY(-50%);\n  z-index: 10;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.25rem;\n  color: #888;\n  line-height: 1;\n  transition: color 0.2s ease-in-out;\n}\n.password-toggle-icon[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.password-input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: #7b68ee;\n  box-shadow: 0 0 0 0.2rem rgba(123, 104, 238, 0.25);\n}\n.form-control.is-invalid[_ngcontent-%COMP%], \n.is-invalid-wrapper[_ngcontent-%COMP%] {\n  border-color: #e57373;\n  box-shadow: 0 0 0 0.2rem rgba(229, 115, 115, 0.25);\n}\n.form-control.is-invalid[_ngcontent-%COMP%]   .password-toggle-icon[_ngcontent-%COMP%], \n.is-invalid-wrapper[_ngcontent-%COMP%]   .password-toggle-icon[_ngcontent-%COMP%] {\n  color: #e57373;\n}\n.alert-custom[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  color: #f0f0f0;\n  border-radius: 8px;\n}\n.alert-custom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #007bff;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule
    ], template: `<div class="login-container">
  <div class="card-gradient-wrapper">
    <div class="card shadow-sm rounded-3">

      <div class="card-header login-card-header text-center">
        <h2 class="mb-0">Panel Administrador</h2>
      </div>

      <div class="card-body p-4">
        <h4 class="form-title text-center mb-4">Iniciar Sesi\xF3n</h4>

        @if (authErrorMessage) {
          <div class="alert alert-custom alert-warning">
            {{ authErrorMessage }}
          </div>
        }

        @if (isAlreadyLogged) {
          <div class="alert alert-custom alert-info">
            Ya has iniciado sesi\xF3n. <a href="#" (click)="logout()">Cerrar sesi\xF3n</a> para usar otra cuenta.
          </div>
        }

        @if (!isAlreadyLogged) {
          <form (ngSubmit)="onSubmit()" [formGroup]="loginForm">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input id="email" class="form-control" type="email" formControlName="email" [class.is-invalid]="formControls['email'].invalid && formControls['email'].touched" />
              @if (formControls['email'].invalid && formControls['email'].touched) {
                <div class="invalid-feedback d-block">
                  @if (formControls['email'].errors?.['required']) {
                    <div>El email es obligatorio.</div>
                  }
                  @if (formControls['email'].errors?.['email']) {
                    <div>El formato del email no es v\xE1lido.</div>
                  }
                </div>
              }
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Contrase\xF1a</label>
              <div class="password-input-wrapper" [class.is-invalid-wrapper]="formControls['password'].invalid && formControls['password'].touched">
                <input id="password" [type]="showPassword ? 'text' : 'password'" class="form-control" formControlName="password" />
                <button type="button" class="password-toggle-icon" (click)="showPassword = !showPassword" [attr.aria-label]="showPassword ? 'Ocultar contrase\xF1a' : 'Mostrar contrase\xF1a'">
                  <i class="bi" [ngClass]="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
                </button>
              </div>
              @if (formControls['password'].invalid && formControls['password'].touched) {
                <div class="invalid-feedback d-block">
                  @if (formControls['password'].errors?.['required']) {
                    <div>La contrase\xF1a es obligatoria.</div>
                  }
                </div>
              }
            </div>

            <div class="d-grid gap-2 mt-4">
              <button id="login-btn" class="btn" [disabled]="loginForm.invalid || isSubmitting">
                @if (isSubmitting) {
                  <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                }
                Ingresar
              </button>
            </div>
          </form>
        }
      </div>

    </div>
  </div>
</div>`, styles: ["/* src/app/features/admin/components/login/login.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.login-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  padding: 1rem;\n  background-color: #1a1a2e;\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 14px;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n  box-shadow: 0 8px 32px rgba(123, 104, 238, 0.3);\n  width: 100%;\n  max-width: 450px;\n}\n.card {\n  border: none;\n  border-radius: 12px;\n  overflow: hidden;\n  background-color: #21213b;\n}\n.login-card-header {\n  background: transparent;\n  color: #fff;\n  padding: 1.5rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n.login-card-header h2 {\n  font-weight: 400;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  font-size: 1.4rem;\n}\n.form-title {\n  color: #f0f0f0;\n  font-weight: 500;\n}\n.form-label {\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #a0a0a0;\n  letter-spacing: 0.5px;\n}\n#login-btn {\n  background:\n    linear-gradient(\n      135deg,\n      rgb(143.0357142857, 126.9196428571, 240.5803571429),\n      #7b68ee);\n  color: white;\n  font-weight: 600;\n  padding: 12px 20px;\n  border-radius: 8px;\n  border: none;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n#login-btn:hover:not(:disabled) {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 20px rgba(123, 104, 238, 0.4);\n}\n#login-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.form-control {\n  display: block;\n  width: 100%;\n  background-color: rgb(42.1467391304, 42.1467391304, 75.3532608696);\n  border: 1px solid #444;\n  border-radius: 8px;\n  color: #fff;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.75rem 1rem;\n}\n.form-control::placeholder {\n  color: #888;\n}\n.password-input-wrapper {\n  position: relative;\n  display: flex;\n  align-items: center;\n  background-color: rgb(42.1467391304, 42.1467391304, 75.3532608696);\n  border: 1px solid #444;\n  border-radius: 8px;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\n.password-input-wrapper .form-control {\n  background-color: transparent;\n  border: none;\n  box-shadow: none;\n  flex-grow: 1;\n  padding-right: 2.75rem;\n}\n.password-input-wrapper .form-control:focus {\n  outline: none;\n}\n.password-toggle-icon {\n  position: absolute;\n  top: 50%;\n  right: 0.75rem;\n  transform: translateY(-50%);\n  z-index: 10;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.25rem;\n  color: #888;\n  line-height: 1;\n  transition: color 0.2s ease-in-out;\n}\n.password-toggle-icon:hover {\n  color: #fff;\n}\n.form-control:focus,\n.password-input-wrapper:focus-within {\n  border-color: #7b68ee;\n  box-shadow: 0 0 0 0.2rem rgba(123, 104, 238, 0.25);\n}\n.form-control.is-invalid,\n.is-invalid-wrapper {\n  border-color: #e57373;\n  box-shadow: 0 0 0 0.2rem rgba(229, 115, 115, 0.25);\n}\n.form-control.is-invalid .password-toggle-icon,\n.is-invalid-wrapper .password-toggle-icon {\n  color: #e57373;\n}\n.alert-custom {\n  background-color: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  color: #f0f0f0;\n  border-radius: 8px;\n}\n.alert-custom a {\n  color: #007bff;\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/admin/components/login/login.component.ts", lineNumber: 19 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-CT54EPHT.js.map
