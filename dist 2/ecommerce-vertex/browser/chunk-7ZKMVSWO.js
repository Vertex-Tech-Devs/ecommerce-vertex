import {
  SweetAlertService
} from "./chunk-5OJQRZGI.js";
import {
  Router
} from "./chunk-P63BSBQH.js";
import {
  Auth,
  EmailAuthProvider,
  Injectable,
  from,
  inject,
  map,
  of,
  reauthenticateWithCredential,
  setClassMetadata,
  signInWithEmailAndPassword,
  signOut,
  switchMap,
  updatePassword,
  user,
  ɵɵdefineInjectable
} from "./chunk-QBKDZG3W.js";
import {
  __async
} from "./chunk-KTESVR3Q.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  auth = inject(Auth);
  router = inject(Router);
  sweetAlertService = inject(SweetAlertService);
  currentUser$ = user(this.auth);
  isAdmin$ = this.currentUser$.pipe(switchMap((user2) => {
    if (!user2) {
      return of(false);
    }
    return from(user2.getIdTokenResult());
  }), map((tokenResult) => {
    if (tokenResult && typeof tokenResult === "object") {
      return tokenResult.claims["admin"] === true;
    }
    return false;
  }));
  constructor() {
  }
  login(email, password) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  logout(options) {
    return __async(this, null, function* () {
      try {
        yield signOut(this.auth);
        const title = options?.title || "Sesi\xF3n Cerrada";
        const text = options?.text || "Has sido redirigido a la p\xE1gina de inicio de sesi\xF3n.";
        this.sweetAlertService.success(title, text);
        this.router.navigate(["/admin/login"]);
      } catch (err) {
        console.error("Error al cerrar sesi\xF3n:", err);
        this.sweetAlertService.error("Error", "No se pudo cerrar la sesi\xF3n. Por favor, int\xE9ntalo de nuevo.");
        throw err;
      }
    });
  }
  isAuthenticated() {
    return this.currentUser$.pipe(map((user2) => !!user2));
  }
  changePassword(currentPassword, newPassword) {
    return __async(this, null, function* () {
      const user2 = this.auth.currentUser;
      if (!user2 || !user2.email) {
        throw new Error("No hay usuario autenticado o el email no est\xE1 disponible.");
      }
      try {
        const credential = EmailAuthProvider.credential(user2.email, currentPassword);
        yield reauthenticateWithCredential(user2, credential);
        yield updatePassword(user2, newPassword);
        console.log("Contrase\xF1a actualizada exitosamente en Firebase.");
        return true;
      } catch (error) {
        console.error("Error en el proceso de cambio de contrase\xF1a:", error);
        throw error;
      }
    });
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-7ZKMVSWO.js.map
