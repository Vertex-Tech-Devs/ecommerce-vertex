import {
  AppCheckInstances,
  AuthInstances,
  Component2 as Component,
  FirebaseApp,
  FirebaseApps,
  FirebaseError,
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  Optional,
  VERSION,
  _getProvider,
  _isFirebaseServerApp,
  _registerComponent,
  concatMap,
  distinct,
  from,
  getApp,
  getDefaultEmulatorHostnameAndPort,
  getModularInstance,
  isCloudWorkstation,
  makeEnvironmentProviders,
  map,
  pingServer,
  registerVersion,
  setClassMetadata,
  timer,
  updateEmulatorBanner,
  ɵAngularFireSchedulers,
  ɵgetAllInstancesOf,
  ɵgetDefaultInstanceOf,
  ɵzoneWrap,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-QBKDZG3W.js";
import {
  __async
} from "./chunk-KTESVR3Q.js";

// node_modules/@firebase/functions/dist/esm/index.esm2017.js
var LONG_TYPE = "type.googleapis.com/google.protobuf.Int64Value";
var UNSIGNED_LONG_TYPE = "type.googleapis.com/google.protobuf.UInt64Value";
function mapValues(o, f) {
  const result = {};
  for (const key in o) {
    if (o.hasOwnProperty(key)) {
      result[key] = f(o[key]);
    }
  }
  return result;
}
function encode(data) {
  if (data == null) {
    return null;
  }
  if (data instanceof Number) {
    data = data.valueOf();
  }
  if (typeof data === "number" && isFinite(data)) {
    return data;
  }
  if (data === true || data === false) {
    return data;
  }
  if (Object.prototype.toString.call(data) === "[object String]") {
    return data;
  }
  if (data instanceof Date) {
    return data.toISOString();
  }
  if (Array.isArray(data)) {
    return data.map((x) => encode(x));
  }
  if (typeof data === "function" || typeof data === "object") {
    return mapValues(data, (x) => encode(x));
  }
  throw new Error("Data cannot be encoded in JSON: " + data);
}
function decode(json) {
  if (json == null) {
    return json;
  }
  if (json["@type"]) {
    switch (json["@type"]) {
      case LONG_TYPE:
      // Fall through and handle this the same as unsigned.
      case UNSIGNED_LONG_TYPE: {
        const value = Number(json["value"]);
        if (isNaN(value)) {
          throw new Error("Data cannot be decoded from JSON: " + json);
        }
        return value;
      }
      default: {
        throw new Error("Data cannot be decoded from JSON: " + json);
      }
    }
  }
  if (Array.isArray(json)) {
    return json.map((x) => decode(x));
  }
  if (typeof json === "function" || typeof json === "object") {
    return mapValues(json, (x) => decode(x));
  }
  return json;
}
var FUNCTIONS_TYPE = "functions";
var errorCodeMap = {
  OK: "ok",
  CANCELLED: "cancelled",
  UNKNOWN: "unknown",
  INVALID_ARGUMENT: "invalid-argument",
  DEADLINE_EXCEEDED: "deadline-exceeded",
  NOT_FOUND: "not-found",
  ALREADY_EXISTS: "already-exists",
  PERMISSION_DENIED: "permission-denied",
  UNAUTHENTICATED: "unauthenticated",
  RESOURCE_EXHAUSTED: "resource-exhausted",
  FAILED_PRECONDITION: "failed-precondition",
  ABORTED: "aborted",
  OUT_OF_RANGE: "out-of-range",
  UNIMPLEMENTED: "unimplemented",
  INTERNAL: "internal",
  UNAVAILABLE: "unavailable",
  DATA_LOSS: "data-loss"
};
var FunctionsError = class _FunctionsError extends FirebaseError {
  /**
   * Constructs a new instance of the `FunctionsError` class.
   */
  constructor(code, message, details) {
    super(`${FUNCTIONS_TYPE}/${code}`, message || "");
    this.details = details;
    Object.setPrototypeOf(this, _FunctionsError.prototype);
  }
};
function codeForHTTPStatus(status) {
  if (status >= 200 && status < 300) {
    return "ok";
  }
  switch (status) {
    case 0:
      return "internal";
    case 400:
      return "invalid-argument";
    case 401:
      return "unauthenticated";
    case 403:
      return "permission-denied";
    case 404:
      return "not-found";
    case 409:
      return "aborted";
    case 429:
      return "resource-exhausted";
    case 499:
      return "cancelled";
    case 500:
      return "internal";
    case 501:
      return "unimplemented";
    case 503:
      return "unavailable";
    case 504:
      return "deadline-exceeded";
  }
  return "unknown";
}
function _errorForResponse(status, bodyJSON) {
  let code = codeForHTTPStatus(status);
  let description = code;
  let details = void 0;
  try {
    const errorJSON = bodyJSON && bodyJSON.error;
    if (errorJSON) {
      const status2 = errorJSON.status;
      if (typeof status2 === "string") {
        if (!errorCodeMap[status2]) {
          return new FunctionsError("internal", "internal");
        }
        code = errorCodeMap[status2];
        description = status2;
      }
      const message = errorJSON.message;
      if (typeof message === "string") {
        description = message;
      }
      details = errorJSON.details;
      if (details !== void 0) {
        details = decode(details);
      }
    }
  } catch (e) {
  }
  if (code === "ok") {
    return null;
  }
  return new FunctionsError(code, description, details);
}
var ContextProvider = class {
  constructor(app, authProvider, messagingProvider, appCheckProvider) {
    this.app = app;
    this.auth = null;
    this.messaging = null;
    this.appCheck = null;
    this.serverAppAppCheckToken = null;
    if (_isFirebaseServerApp(app) && app.settings.appCheckToken) {
      this.serverAppAppCheckToken = app.settings.appCheckToken;
    }
    this.auth = authProvider.getImmediate({ optional: true });
    this.messaging = messagingProvider.getImmediate({
      optional: true
    });
    if (!this.auth) {
      authProvider.get().then((auth) => this.auth = auth, () => {
      });
    }
    if (!this.messaging) {
      messagingProvider.get().then((messaging) => this.messaging = messaging, () => {
      });
    }
    if (!this.appCheck) {
      appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.get().then((appCheck) => this.appCheck = appCheck, () => {
      });
    }
  }
  getAuthToken() {
    return __async(this, null, function* () {
      if (!this.auth) {
        return void 0;
      }
      try {
        const token = yield this.auth.getToken();
        return token === null || token === void 0 ? void 0 : token.accessToken;
      } catch (e) {
        return void 0;
      }
    });
  }
  getMessagingToken() {
    return __async(this, null, function* () {
      if (!this.messaging || !("Notification" in self) || Notification.permission !== "granted") {
        return void 0;
      }
      try {
        return yield this.messaging.getToken();
      } catch (e) {
        return void 0;
      }
    });
  }
  getAppCheckToken(limitedUseAppCheckTokens) {
    return __async(this, null, function* () {
      if (this.serverAppAppCheckToken) {
        return this.serverAppAppCheckToken;
      }
      if (this.appCheck) {
        const result = limitedUseAppCheckTokens ? yield this.appCheck.getLimitedUseToken() : yield this.appCheck.getToken();
        if (result.error) {
          return null;
        }
        return result.token;
      }
      return null;
    });
  }
  getContext(limitedUseAppCheckTokens) {
    return __async(this, null, function* () {
      const authToken = yield this.getAuthToken();
      const messagingToken = yield this.getMessagingToken();
      const appCheckToken = yield this.getAppCheckToken(limitedUseAppCheckTokens);
      return { authToken, messagingToken, appCheckToken };
    });
  }
};
var DEFAULT_REGION = "us-central1";
var responseLineRE = /^data: (.*?)(?:\n|$)/;
function failAfter(millis) {
  let timer2 = null;
  return {
    promise: new Promise((_, reject) => {
      timer2 = setTimeout(() => {
        reject(new FunctionsError("deadline-exceeded", "deadline-exceeded"));
      }, millis);
    }),
    cancel: () => {
      if (timer2) {
        clearTimeout(timer2);
      }
    }
  };
}
var FunctionsService = class {
  /**
   * Creates a new Functions service for the given app.
   * @param app - The FirebaseApp to use.
   */
  constructor(app, authProvider, messagingProvider, appCheckProvider, regionOrCustomDomain = DEFAULT_REGION, fetchImpl = (...args) => fetch(...args)) {
    this.app = app;
    this.fetchImpl = fetchImpl;
    this.emulatorOrigin = null;
    this.contextProvider = new ContextProvider(app, authProvider, messagingProvider, appCheckProvider);
    this.cancelAllRequests = new Promise((resolve) => {
      this.deleteService = () => {
        return Promise.resolve(resolve());
      };
    });
    try {
      const url = new URL(regionOrCustomDomain);
      this.customDomain = url.origin + (url.pathname === "/" ? "" : url.pathname);
      this.region = DEFAULT_REGION;
    } catch (e) {
      this.customDomain = null;
      this.region = regionOrCustomDomain;
    }
  }
  _delete() {
    return this.deleteService();
  }
  /**
   * Returns the URL for a callable with the given name.
   * @param name - The name of the callable.
   * @internal
   */
  _url(name2) {
    const projectId = this.app.options.projectId;
    if (this.emulatorOrigin !== null) {
      const origin = this.emulatorOrigin;
      return `${origin}/${projectId}/${this.region}/${name2}`;
    }
    if (this.customDomain !== null) {
      return `${this.customDomain}/${name2}`;
    }
    return `https://${this.region}-${projectId}.cloudfunctions.net/${name2}`;
  }
};
function connectFunctionsEmulator$1(functionsInstance, host, port) {
  const useSsl = isCloudWorkstation(host);
  functionsInstance.emulatorOrigin = `http${useSsl ? "s" : ""}://${host}:${port}`;
  if (useSsl) {
    void pingServer(functionsInstance.emulatorOrigin);
    updateEmulatorBanner("Functions", true);
  }
}
function httpsCallable$1(functionsInstance, name2, options) {
  const callable = (data) => {
    return call(functionsInstance, name2, data, options || {});
  };
  callable.stream = (data, options2) => {
    return stream(functionsInstance, name2, data, options2);
  };
  return callable;
}
function httpsCallableFromURL$1(functionsInstance, url, options) {
  const callable = (data) => {
    return callAtURL(functionsInstance, url, data, options || {});
  };
  callable.stream = (data, options2) => {
    return streamAtURL(functionsInstance, url, data, options2 || {});
  };
  return callable;
}
function postJSON(url, body, headers, fetchImpl) {
  return __async(this, null, function* () {
    headers["Content-Type"] = "application/json";
    let response;
    try {
      response = yield fetchImpl(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers
      });
    } catch (e) {
      return {
        status: 0,
        json: null
      };
    }
    let json = null;
    try {
      json = yield response.json();
    } catch (e) {
    }
    return {
      status: response.status,
      json
    };
  });
}
function makeAuthHeaders(functionsInstance, options) {
  return __async(this, null, function* () {
    const headers = {};
    const context = yield functionsInstance.contextProvider.getContext(options.limitedUseAppCheckTokens);
    if (context.authToken) {
      headers["Authorization"] = "Bearer " + context.authToken;
    }
    if (context.messagingToken) {
      headers["Firebase-Instance-ID-Token"] = context.messagingToken;
    }
    if (context.appCheckToken !== null) {
      headers["X-Firebase-AppCheck"] = context.appCheckToken;
    }
    return headers;
  });
}
function call(functionsInstance, name2, data, options) {
  const url = functionsInstance._url(name2);
  return callAtURL(functionsInstance, url, data, options);
}
function callAtURL(functionsInstance, url, data, options) {
  return __async(this, null, function* () {
    data = encode(data);
    const body = { data };
    const headers = yield makeAuthHeaders(functionsInstance, options);
    const timeout = options.timeout || 7e4;
    const failAfterHandle = failAfter(timeout);
    const response = yield Promise.race([
      postJSON(url, body, headers, functionsInstance.fetchImpl),
      failAfterHandle.promise,
      functionsInstance.cancelAllRequests
    ]);
    failAfterHandle.cancel();
    if (!response) {
      throw new FunctionsError("cancelled", "Firebase Functions instance was deleted.");
    }
    const error = _errorForResponse(response.status, response.json);
    if (error) {
      throw error;
    }
    if (!response.json) {
      throw new FunctionsError("internal", "Response is not valid JSON object.");
    }
    let responseData = response.json.data;
    if (typeof responseData === "undefined") {
      responseData = response.json.result;
    }
    if (typeof responseData === "undefined") {
      throw new FunctionsError("internal", "Response is missing data field.");
    }
    const decodedData = decode(responseData);
    return { data: decodedData };
  });
}
function stream(functionsInstance, name2, data, options) {
  const url = functionsInstance._url(name2);
  return streamAtURL(functionsInstance, url, data, options || {});
}
function streamAtURL(functionsInstance, url, data, options) {
  return __async(this, null, function* () {
    var _a;
    data = encode(data);
    const body = { data };
    const headers = yield makeAuthHeaders(functionsInstance, options);
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "text/event-stream";
    let response;
    try {
      response = yield functionsInstance.fetchImpl(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers,
        signal: options === null || options === void 0 ? void 0 : options.signal
      });
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") {
        const error2 = new FunctionsError("cancelled", "Request was cancelled.");
        return {
          data: Promise.reject(error2),
          stream: {
            [Symbol.asyncIterator]() {
              return {
                next() {
                  return Promise.reject(error2);
                }
              };
            }
          }
        };
      }
      const error = _errorForResponse(0, null);
      return {
        data: Promise.reject(error),
        // Return an empty async iterator
        stream: {
          [Symbol.asyncIterator]() {
            return {
              next() {
                return Promise.reject(error);
              }
            };
          }
        }
      };
    }
    let resultResolver;
    let resultRejecter;
    const resultPromise = new Promise((resolve, reject) => {
      resultResolver = resolve;
      resultRejecter = reject;
    });
    (_a = options === null || options === void 0 ? void 0 : options.signal) === null || _a === void 0 ? void 0 : _a.addEventListener("abort", () => {
      const error = new FunctionsError("cancelled", "Request was cancelled.");
      resultRejecter(error);
    });
    const reader = response.body.getReader();
    const rstream = createResponseStream(reader, resultResolver, resultRejecter, options === null || options === void 0 ? void 0 : options.signal);
    return {
      stream: {
        [Symbol.asyncIterator]() {
          const rreader = rstream.getReader();
          return {
            next() {
              return __async(this, null, function* () {
                const { value, done } = yield rreader.read();
                return { value, done };
              });
            },
            return() {
              return __async(this, null, function* () {
                yield rreader.cancel();
                return { done: true, value: void 0 };
              });
            }
          };
        }
      },
      data: resultPromise
    };
  });
}
function createResponseStream(reader, resultResolver, resultRejecter, signal) {
  const processLine = (line, controller) => {
    const match = line.match(responseLineRE);
    if (!match) {
      return;
    }
    const data = match[1];
    try {
      const jsonData = JSON.parse(data);
      if ("result" in jsonData) {
        resultResolver(decode(jsonData.result));
        return;
      }
      if ("message" in jsonData) {
        controller.enqueue(decode(jsonData.message));
        return;
      }
      if ("error" in jsonData) {
        const error = _errorForResponse(0, jsonData);
        controller.error(error);
        resultRejecter(error);
        return;
      }
    } catch (error) {
      if (error instanceof FunctionsError) {
        controller.error(error);
        resultRejecter(error);
        return;
      }
    }
  };
  const decoder = new TextDecoder();
  return new ReadableStream({
    start(controller) {
      let currentText = "";
      return pump();
      function pump() {
        return __async(this, null, function* () {
          if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
            const error = new FunctionsError("cancelled", "Request was cancelled");
            controller.error(error);
            resultRejecter(error);
            return Promise.resolve();
          }
          try {
            const { value, done } = yield reader.read();
            if (done) {
              if (currentText.trim()) {
                processLine(currentText.trim(), controller);
              }
              controller.close();
              return;
            }
            if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
              const error = new FunctionsError("cancelled", "Request was cancelled");
              controller.error(error);
              resultRejecter(error);
              yield reader.cancel();
              return;
            }
            currentText += decoder.decode(value, { stream: true });
            const lines = currentText.split("\n");
            currentText = lines.pop() || "";
            for (const line of lines) {
              if (line.trim()) {
                processLine(line.trim(), controller);
              }
            }
            return pump();
          } catch (error) {
            const functionsError = error instanceof FunctionsError ? error : _errorForResponse(0, null);
            controller.error(functionsError);
            resultRejecter(functionsError);
          }
        });
      }
    },
    cancel() {
      return reader.cancel();
    }
  });
}
var name = "@firebase/functions";
var version = "0.12.9";
var AUTH_INTERNAL_NAME = "auth-internal";
var APP_CHECK_INTERNAL_NAME = "app-check-internal";
var MESSAGING_INTERNAL_NAME = "messaging-internal";
function registerFunctions(variant) {
  const factory = (container, { instanceIdentifier: regionOrCustomDomain }) => {
    const app = container.getProvider("app").getImmediate();
    const authProvider = container.getProvider(AUTH_INTERNAL_NAME);
    const messagingProvider = container.getProvider(MESSAGING_INTERNAL_NAME);
    const appCheckProvider = container.getProvider(APP_CHECK_INTERNAL_NAME);
    return new FunctionsService(app, authProvider, messagingProvider, appCheckProvider, regionOrCustomDomain);
  };
  _registerComponent(new Component(
    FUNCTIONS_TYPE,
    factory,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setMultipleInstances(true));
  registerVersion(name, version, variant);
  registerVersion(name, version, "esm2017");
}
function getFunctions(app = getApp(), regionOrCustomDomain = DEFAULT_REGION) {
  const functionsProvider = _getProvider(getModularInstance(app), FUNCTIONS_TYPE);
  const functionsInstance = functionsProvider.getImmediate({
    identifier: regionOrCustomDomain
  });
  const emulator = getDefaultEmulatorHostnameAndPort("functions");
  if (emulator) {
    connectFunctionsEmulator(functionsInstance, ...emulator);
  }
  return functionsInstance;
}
function connectFunctionsEmulator(functionsInstance, host, port) {
  connectFunctionsEmulator$1(getModularInstance(functionsInstance), host, port);
}
function httpsCallable(functionsInstance, name2, options) {
  return httpsCallable$1(getModularInstance(functionsInstance), name2, options);
}
function httpsCallableFromURL(functionsInstance, url, options) {
  return httpsCallableFromURL$1(getModularInstance(functionsInstance), url, options);
}
registerFunctions();

// node_modules/rxfire/functions/index.esm.js
function httpsCallable2(functions, name2, options) {
  var callable = httpsCallable(functions, name2, options);
  return function(data) {
    return from(callable(data)).pipe(map(function(r) {
      return r.data;
    }));
  };
}

// node_modules/@angular/fire/fesm2022/angular-fire-functions.mjs
var Functions = class {
  constructor(functions) {
    return functions;
  }
};
var FUNCTIONS_PROVIDER_NAME = "functions";
var FunctionsInstances = class {
  constructor() {
    return \u0275getAllInstancesOf(FUNCTIONS_PROVIDER_NAME);
  }
};
var functionInstance$ = timer(0, 300).pipe(concatMap(() => from(\u0275getAllInstancesOf(FUNCTIONS_PROVIDER_NAME))), distinct());
var PROVIDED_FUNCTIONS_INSTANCES = new InjectionToken("angularfire2.functions-instances");
function defaultFunctionsInstanceFactory(provided, defaultApp) {
  const defaultAuth = \u0275getDefaultInstanceOf(FUNCTIONS_PROVIDER_NAME, provided, defaultApp);
  return defaultAuth && new Functions(defaultAuth);
}
function functionsInstanceFactory(fn) {
  return (zone, injector) => {
    const functions = zone.runOutsideAngular(() => fn(injector));
    return new Functions(functions);
  };
}
var FUNCTIONS_INSTANCES_PROVIDER = {
  provide: FunctionsInstances,
  deps: [[new Optional(), PROVIDED_FUNCTIONS_INSTANCES]]
};
var DEFAULT_FUNCTIONS_INSTANCE_PROVIDER = {
  provide: Functions,
  useFactory: defaultFunctionsInstanceFactory,
  deps: [[new Optional(), PROVIDED_FUNCTIONS_INSTANCES], FirebaseApp]
};
var FunctionsModule = class _FunctionsModule {
  constructor() {
    registerVersion("angularfire", VERSION.full, "fn");
  }
  static \u0275fac = function FunctionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FunctionsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _FunctionsModule
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [DEFAULT_FUNCTIONS_INSTANCE_PROVIDER, FUNCTIONS_INSTANCES_PROVIDER]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FunctionsModule, [{
    type: NgModule,
    args: [{
      providers: [DEFAULT_FUNCTIONS_INSTANCE_PROVIDER, FUNCTIONS_INSTANCES_PROVIDER]
    }]
  }], () => [], null);
})();
function provideFunctions(fn, ...deps) {
  registerVersion("angularfire", VERSION.full, "fn");
  return makeEnvironmentProviders([DEFAULT_FUNCTIONS_INSTANCE_PROVIDER, FUNCTIONS_INSTANCES_PROVIDER, {
    provide: PROVIDED_FUNCTIONS_INSTANCES,
    useFactory: functionsInstanceFactory(fn),
    multi: true,
    deps: [
      NgZone,
      Injector,
      \u0275AngularFireSchedulers,
      FirebaseApps,
      // Defensively load Auth first, if provided
      [new Optional(), AuthInstances],
      [new Optional(), AppCheckInstances],
      ...deps
    ]
  }]);
}
var httpsCallableData = \u0275zoneWrap(httpsCallable2, true);
var connectFunctionsEmulator2 = \u0275zoneWrap(connectFunctionsEmulator, true);
var getFunctions2 = \u0275zoneWrap(getFunctions, true);
var httpsCallable3 = \u0275zoneWrap(httpsCallable, true);
var httpsCallableFromURL2 = \u0275zoneWrap(httpsCallableFromURL, true);

export {
  getFunctions,
  httpsCallable,
  Functions,
  provideFunctions,
  httpsCallable3 as httpsCallable2
};
/*! Bundled license information:

@firebase/functions/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

rxfire/functions/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=chunk-VAURE2XL.js.map
