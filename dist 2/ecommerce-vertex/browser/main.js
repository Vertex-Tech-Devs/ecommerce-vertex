import {
  ModalModule
} from "./chunk-2OBKN7QP.js";
import {
  getStorage,
  provideStorage
} from "./chunk-CUH4JQND.js";
import {
  getFunctions,
  provideFunctions
} from "./chunk-VAURE2XL.js";
import {
  RouterOutlet,
  provideRouter
} from "./chunk-P63BSBQH.js";
import {
  bootstrapApplication,
  provideHttpClient,
  withInterceptors
} from "./chunk-YM4MUNL7.js";
import {
  getFirestore,
  provideFirestore
} from "./chunk-SDXAAYIW.js";
import {
  CommonModule,
  Component,
  Injectable,
  finalize,
  getAuth,
  importProvidersFrom,
  initializeApp,
  inject,
  provideAuth,
  provideFirebaseApp,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    redirectTo: "shop",
    pathMatch: "full"
  },
  {
    path: "shop",
    loadChildren: () => import("./chunk-TCWAVZVB.js").then((m) => m.SHOP_ROUTES)
  },
  {
    path: "admin",
    loadChildren: () => import("./chunk-V4SUXLFD.js").then((m) => m.adminRoutes)
  }
];

// src/environments/environment.ts
var environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDYa0Q5VKHgfBLDB8kRfXshAhTEi7VG9fw",
    authDomain: "ecommerce-vertex.firebaseapp.com",
    projectId: "ecommerce-vertex",
    storageBucket: "ecommerce-vertex.firebasestorage.app",
    messagingSenderId: "590584440534",
    appId: "1:590584440534:web:d081d2b5f54c6f3baccb77",
    measurementId: "G-6S5S8PVRJ5"
  }
};

// src/app/core/services/loading.service.ts
var LoadingService = class _LoadingService {
  _isLoading = signal(false, ...ngDevMode ? [{ debugName: "_isLoading" }] : []);
  isLoading = this._isLoading.asReadonly();
  show() {
    this._isLoading.set(true);
  }
  hide() {
    this._isLoading.set(false);
  }
  static \u0275fac = function LoadingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LoadingService, factory: _LoadingService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/core/interceptors/loading.interceptor.ts
var _activeRequests = 0;
var loadingInterceptor = (req, next) => {
  const loadingService = inject(LoadingService);
  _activeRequests++;
  if (_activeRequests === 1) {
    loadingService.show();
  }
  return next(req).pipe(finalize(() => {
    _activeRequests--;
    if (_activeRequests === 0) {
      loadingService.hide();
    }
  }));
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    importProvidersFrom(ModalModule.forRoot())
  ]
};

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  title = "ecommerce-vertex";
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [
    RouterOutlet,
    CommonModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [
      RouterOutlet,
      CommonModule
    ], template: "<router-outlet></router-outlet>\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 15 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
