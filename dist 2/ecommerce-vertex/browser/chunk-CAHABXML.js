import {
  Functions,
  httpsCallable
} from "./chunk-VAURE2XL.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
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
  DomSanitizer
} from "./chunk-YM4MUNL7.js";
import {
  Firestore,
  doc,
  docData,
  setDoc
} from "./chunk-SDXAAYIW.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Observable,
  Output,
  PLATFORM_ID,
  Renderer2,
  SecurityContext,
  Subscription,
  ViewChild,
  ViewEncapsulation,
  debounceTime,
  defer,
  forkJoin,
  forwardRef,
  fromEvent,
  inject,
  input,
  isObservable,
  isPlatformServer,
  map,
  mergeMap,
  of,
  runInInjectionContext,
  setClassMetadata,
  shareReplay,
  signal,
  take,
  takeUntilDestroyed,
  tap,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-QBKDZG3W.js";
import {
  __async
} from "./chunk-KTESVR3Q.js";

// node_modules/ngx-quill/fesm2022/ngx-quill-config.mjs
var defaultModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    // toggled buttons
    ["blockquote", "code-block"],
    [{
      header: 1
    }, {
      header: 2
    }],
    // custom button values
    [{
      list: "ordered"
    }, {
      list: "bullet"
    }],
    [{
      script: "sub"
    }, {
      script: "super"
    }],
    // superscript/subscript
    [{
      indent: "-1"
    }, {
      indent: "+1"
    }],
    // outdent/indent
    [{
      direction: "rtl"
    }],
    // text direction
    [{
      size: ["small", false, "large", "huge"]
    }],
    // custom dropdown
    [{
      header: [1, 2, 3, 4, 5, 6, false]
    }],
    [{
      color: []
    }, {
      background: []
    }],
    // dropdown with defaults from theme
    [{
      font: []
    }],
    [{
      align: []
    }],
    ["clean"],
    // remove formatting button
    ["link", "image", "video"],
    // link and image, video
    ["table"]
  ]
};
var QUILL_CONFIG_TOKEN = new InjectionToken("config", {
  providedIn: "root",
  factory: () => ({
    modules: defaultModules
  })
});
var _QuillConfigModule = class _QuillConfigModule {
  static forRoot(config) {
    return {
      ngModule: _QuillConfigModule,
      providers: [{
        provide: QUILL_CONFIG_TOKEN,
        useValue: config
      }]
    };
  }
};
_QuillConfigModule.\u0275fac = function QuillConfigModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuillConfigModule)();
};
_QuillConfigModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _QuillConfigModule
});
_QuillConfigModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
var QuillConfigModule = _QuillConfigModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillConfigModule, [{
    type: NgModule
  }], null, null);
})();

// node_modules/ngx-quill/fesm2022/ngx-quill.mjs
var _c0 = [[["", "above-quill-editor-toolbar", ""]], [["", "quill-editor-toolbar", ""]], [["", "below-quill-editor-toolbar", ""]]];
var _c1 = ["[above-quill-editor-toolbar]", "[quill-editor-toolbar]", "[below-quill-editor-toolbar]"];
function QuillEditorComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 0);
  }
}
function QuillEditorComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 0);
  }
}
var getFormat = (format, configFormat) => {
  const passedFormat = format || configFormat;
  return passedFormat || "html";
};
var raf$ = () => {
  return new Observable((subscriber) => {
    const rafId = requestAnimationFrame(() => {
      subscriber.next();
      subscriber.complete();
    });
    return () => cancelAnimationFrame(rafId);
  });
};
var _QuillService = class _QuillService {
  constructor() {
    this.config = inject(QUILL_CONFIG_TOKEN) || {
      modules: defaultModules
    };
    this.quill$ = defer(() => __async(this, null, function* () {
      if (!this.Quill) {
        const maybePatchedAddEventListener = document.addEventListener;
        document.addEventListener = document["__zone_symbol__addEventListener"] || document.addEventListener;
        const {
          Quill
        } = yield import("./chunk-EOSXJNFX.js");
        document.addEventListener = maybePatchedAddEventListener;
        this.Quill = Quill;
      }
      this.config.customOptions?.forEach((customOption) => {
        const newCustomOption = this.Quill.import(customOption.import);
        newCustomOption.whitelist = customOption.whitelist;
        this.Quill.register(newCustomOption, true, this.config.suppressGlobalRegisterWarning);
      });
      return new Promise((resolve) => {
        this.registerCustomModules(this.Quill, this.config.customModules, this.config.suppressGlobalRegisterWarning).subscribe(resolve);
      });
    })).pipe(shareReplay({
      bufferSize: 1,
      refCount: false
    }));
    this.registeredModules = /* @__PURE__ */ new Set();
  }
  getQuill() {
    return this.quill$;
  }
  /** @internal */
  beforeRender(Quill, customModules, beforeRender = this.config.beforeRender) {
    const sources = [this.registerCustomModules(Quill, customModules)];
    if (beforeRender) {
      sources.push(beforeRender());
    }
    return forkJoin(sources).pipe(map(() => Quill));
  }
  /** @internal */
  registerCustomModules(Quill, customModules, suppressGlobalRegisterWarning) {
    if (!Array.isArray(customModules)) {
      return of(Quill);
    }
    const sources = [];
    for (const customModule of customModules) {
      const {
        path,
        implementation: maybeImplementation
      } = customModule;
      if (this.registeredModules.has(path)) {
        continue;
      }
      this.registeredModules.add(path);
      if (isObservable(maybeImplementation)) {
        sources.push(maybeImplementation.pipe(tap((implementation) => {
          Quill.register(path, implementation, suppressGlobalRegisterWarning);
        })));
      } else {
        Quill.register(path, maybeImplementation, suppressGlobalRegisterWarning);
      }
    }
    return sources.length > 0 ? forkJoin(sources).pipe(map(() => Quill)) : of(Quill);
  }
};
_QuillService.\u0275fac = function QuillService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuillService)();
};
_QuillService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _QuillService,
  factory: _QuillService.\u0275fac,
  providedIn: "root"
});
var QuillService = _QuillService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _QuillEditorBase = class _QuillEditorBase {
  constructor() {
    this.format = input(void 0, ...ngDevMode ? [{
      debugName: "format"
    }] : []);
    this.theme = input(void 0, ...ngDevMode ? [{
      debugName: "theme"
    }] : []);
    this.modules = input(void 0, ...ngDevMode ? [{
      debugName: "modules"
    }] : []);
    this.debug = input(false, ...ngDevMode ? [{
      debugName: "debug"
    }] : []);
    this.readOnly = input(false, ...ngDevMode ? [{
      debugName: "readOnly"
    }] : []);
    this.placeholder = input(void 0, ...ngDevMode ? [{
      debugName: "placeholder"
    }] : []);
    this.maxLength = input(void 0, ...ngDevMode ? [{
      debugName: "maxLength"
    }] : []);
    this.minLength = input(void 0, ...ngDevMode ? [{
      debugName: "minLength"
    }] : []);
    this.required = input(false, ...ngDevMode ? [{
      debugName: "required"
    }] : []);
    this.formats = input(void 0, ...ngDevMode ? [{
      debugName: "formats"
    }] : []);
    this.customToolbarPosition = input("top", ...ngDevMode ? [{
      debugName: "customToolbarPosition"
    }] : []);
    this.sanitize = input(void 0, ...ngDevMode ? [{
      debugName: "sanitize"
    }] : []);
    this.beforeRender = input(void 0, ...ngDevMode ? [{
      debugName: "beforeRender"
    }] : []);
    this.styles = input(null, ...ngDevMode ? [{
      debugName: "styles"
    }] : []);
    this.registry = input(void 0, ...ngDevMode ? [{
      debugName: "registry"
    }] : []);
    this.bounds = input(void 0, ...ngDevMode ? [{
      debugName: "bounds"
    }] : []);
    this.customOptions = input([], ...ngDevMode ? [{
      debugName: "customOptions"
    }] : []);
    this.customModules = input([], ...ngDevMode ? [{
      debugName: "customModules"
    }] : []);
    this.trackChanges = input(void 0, ...ngDevMode ? [{
      debugName: "trackChanges"
    }] : []);
    this.classes = input(void 0, ...ngDevMode ? [{
      debugName: "classes"
    }] : []);
    this.trimOnValidation = input(false, ...ngDevMode ? [{
      debugName: "trimOnValidation"
    }] : []);
    this.linkPlaceholder = input(void 0, ...ngDevMode ? [{
      debugName: "linkPlaceholder"
    }] : []);
    this.compareValues = input(false, ...ngDevMode ? [{
      debugName: "compareValues"
    }] : []);
    this.filterNull = input(false, ...ngDevMode ? [{
      debugName: "filterNull"
    }] : []);
    this.debounceTime = input(void 0, ...ngDevMode ? [{
      debugName: "debounceTime"
    }] : []);
    this.defaultEmptyValue = input(null, ...ngDevMode ? [{
      debugName: "defaultEmptyValue"
    }] : []);
    this.onEditorCreated = new EventEmitter();
    this.onEditorChanged = new EventEmitter();
    this.onContentChanged = new EventEmitter();
    this.onSelectionChanged = new EventEmitter();
    this.onFocus = new EventEmitter();
    this.onBlur = new EventEmitter();
    this.onNativeFocus = new EventEmitter();
    this.onNativeBlur = new EventEmitter();
    this.disabled = false;
    this.toolbarPosition = signal("top", ...ngDevMode ? [{
      debugName: "toolbarPosition"
    }] : []);
    this.eventsSubscription = null;
    this.quillSubscription = null;
    this.elementRef = inject(ElementRef);
    this.cd = inject(ChangeDetectorRef);
    this.domSanitizer = inject(DomSanitizer);
    this.platformId = inject(PLATFORM_ID);
    this.renderer = inject(Renderer2);
    this.zone = inject(NgZone);
    this.service = inject(QuillService);
    this.destroyRef = inject(DestroyRef);
    this.valueGetter = input((quillEditor) => {
      let html = quillEditor.getSemanticHTML();
      if (this.isEmptyValue(html)) {
        html = this.defaultEmptyValue();
      }
      let modelValue = html;
      const format = getFormat(this.format(), this.service.config.format);
      if (format === "text") {
        modelValue = quillEditor.getText();
      } else if (format === "object") {
        modelValue = quillEditor.getContents();
      } else if (format === "json") {
        try {
          modelValue = JSON.stringify(quillEditor.getContents());
        } catch {
          modelValue = quillEditor.getText();
        }
      }
      return modelValue;
    }, ...ngDevMode ? [{
      debugName: "valueGetter"
    }] : []);
    this.valueSetter = input((quillEditor, value) => {
      const format = getFormat(this.format(), this.service.config.format);
      if (format === "html") {
        const sanitize = [true, false].includes(this.sanitize()) ? this.sanitize() : this.service.config.sanitize || false;
        if (sanitize) {
          value = this.domSanitizer.sanitize(SecurityContext.HTML, value);
        }
        return quillEditor.clipboard.convert({
          html: value
        });
      } else if (format === "json") {
        try {
          return JSON.parse(value);
        } catch {
          return [{
            insert: value
          }];
        }
      }
      return value;
    }, ...ngDevMode ? [{
      debugName: "valueSetter"
    }] : []);
    this.selectionChangeHandler = (range, oldRange, source) => {
      const trackChanges = this.trackChanges() || this.service.config.trackChanges;
      const shouldTriggerOnModelTouched = !range && !!this.onModelTouched && (source === "user" || trackChanges && trackChanges === "all");
      if (!this.onBlur.observed && !this.onFocus.observed && !this.onSelectionChanged.observed && !shouldTriggerOnModelTouched) {
        return;
      }
      this.zone.run(() => {
        if (range === null) {
          this.onBlur.emit({
            editor: this.quillEditor,
            source
          });
        } else if (oldRange === null) {
          this.onFocus.emit({
            editor: this.quillEditor,
            source
          });
        }
        this.onSelectionChanged.emit({
          editor: this.quillEditor,
          oldRange,
          range,
          source
        });
        if (shouldTriggerOnModelTouched) {
          this.onModelTouched();
        }
        this.cd.markForCheck();
      });
    };
    this.textChangeHandler = (delta, oldDelta, source) => {
      const text = this.quillEditor.getText();
      const content = this.quillEditor.getContents();
      let html = this.quillEditor.getSemanticHTML();
      if (this.isEmptyValue(html)) {
        html = this.defaultEmptyValue();
      }
      const trackChanges = this.trackChanges() || this.service.config.trackChanges;
      const shouldTriggerOnModelChange = (source === "user" || trackChanges && trackChanges === "all") && !!this.onModelChange;
      if (!this.onContentChanged.observed && !shouldTriggerOnModelChange) {
        return;
      }
      this.zone.run(() => {
        if (shouldTriggerOnModelChange) {
          const valueGetter = this.valueGetter();
          this.onModelChange(valueGetter(this.quillEditor));
        }
        this.onContentChanged.emit({
          content,
          delta,
          editor: this.quillEditor,
          html,
          oldDelta,
          source,
          text
        });
        this.cd.markForCheck();
      });
    };
    this.editorChangeHandler = (event, current, old, source) => {
      if (!this.onEditorChanged.observed) {
        return;
      }
      if (event === "text-change") {
        const text = this.quillEditor.getText();
        const content = this.quillEditor.getContents();
        let html = this.quillEditor.getSemanticHTML();
        if (this.isEmptyValue(html)) {
          html = this.defaultEmptyValue();
        }
        this.zone.run(() => {
          this.onEditorChanged.emit({
            content,
            delta: current,
            editor: this.quillEditor,
            event,
            html,
            oldDelta: old,
            source,
            text
          });
          this.cd.markForCheck();
        });
      } else {
        this.zone.run(() => {
          this.onEditorChanged.emit({
            editor: this.quillEditor,
            event,
            oldRange: old,
            range: current,
            source
          });
          this.cd.markForCheck();
        });
      }
    };
    this.destroyRef.onDestroy(() => {
      this.dispose();
      this.quillSubscription?.unsubscribe();
      this.quillSubscription = null;
    });
  }
  static normalizeClassNames(classes) {
    const classList = classes.trim().split(" ");
    return classList.reduce((prev, cur) => {
      const trimmed = cur.trim();
      if (trimmed) {
        prev.push(trimmed);
      }
      return prev;
    }, []);
  }
  ngOnInit() {
    this.toolbarPosition.set(this.customToolbarPosition());
  }
  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.quillSubscription = this.service.getQuill().pipe(mergeMap((Quill) => this.service.beforeRender(Quill, this.customModules(), this.beforeRender()))).subscribe((Quill) => {
      this.editorElem = this.elementRef.nativeElement.querySelector("[quill-editor-element]");
      const toolbarElem = this.elementRef.nativeElement.querySelector("[quill-editor-toolbar]");
      const modules = Object.assign({}, this.modules() || this.service.config.modules);
      if (toolbarElem) {
        modules.toolbar = toolbarElem;
      } else if (modules.toolbar === void 0) {
        modules.toolbar = defaultModules.toolbar;
      }
      let placeholder = this.placeholder() !== void 0 ? this.placeholder() : this.service.config.placeholder;
      if (placeholder === void 0) {
        placeholder = "Insert text here ...";
      }
      const styles = this.styles();
      if (styles) {
        Object.keys(styles).forEach((key) => {
          this.renderer.setStyle(this.editorElem, key, styles[key]);
        });
      }
      if (this.classes()) {
        this.addClasses(this.classes());
      }
      this.customOptions().forEach((customOption) => {
        const newCustomOption = Quill.import(customOption.import);
        newCustomOption.whitelist = customOption.whitelist;
        Quill.register(newCustomOption, true);
      });
      let bounds = this.bounds() && this.bounds() === "self" ? this.editorElem : this.bounds();
      if (!bounds) {
        bounds = this.service.config.bounds ? this.service.config.bounds : document.body;
      }
      let debug = this.debug();
      if (!debug && debug !== false && this.service.config.debug) {
        debug = this.service.config.debug;
      }
      let readOnly = this.readOnly();
      if (!readOnly && this.readOnly() !== false) {
        readOnly = this.service.config.readOnly !== void 0 ? this.service.config.readOnly : false;
      }
      let formats = this.formats();
      if (!formats && formats === void 0) {
        formats = this.service.config.formats ? [...this.service.config.formats] : this.service.config.formats === null ? null : void 0;
      }
      this.zone.runOutsideAngular(() => {
        this.quillEditor = new Quill(this.editorElem, {
          bounds,
          debug,
          formats,
          modules,
          placeholder,
          readOnly,
          registry: this.registry(),
          theme: this.theme() || (this.service.config.theme ? this.service.config.theme : "snow")
        });
        if (this.onNativeBlur.observed) {
          fromEvent(this.quillEditor.scroll.domNode, "blur").pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.onNativeBlur.next({
            editor: this.quillEditor,
            source: "dom"
          }));
          const toolbar = this.quillEditor.getModule("toolbar");
          if (toolbar.container) {
            fromEvent(toolbar.container, "mousedown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((e) => e.preventDefault());
          }
        }
        if (this.onNativeFocus.observed) {
          fromEvent(this.quillEditor.scroll.domNode, "focus").pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.onNativeFocus.next({
            editor: this.quillEditor,
            source: "dom"
          }));
        }
        if (this.linkPlaceholder()) {
          const tooltip = this.quillEditor?.theme?.tooltip;
          const input2 = tooltip?.root?.querySelector("input[data-link]");
          if (input2?.dataset) {
            input2.dataset.link = this.linkPlaceholder();
          }
        }
      });
      if (this.content) {
        const format = getFormat(this.format(), this.service.config.format);
        if (format === "text") {
          this.quillEditor.setText(this.content, "silent");
        } else {
          const valueSetter = this.valueSetter();
          const newValue = valueSetter(this.quillEditor, this.content);
          this.quillEditor.setContents(newValue, "silent");
        }
        const history = this.quillEditor.getModule("history");
        history.clear();
      }
      this.setDisabledState();
      this.addQuillEventListeners();
      if (!this.onEditorCreated.observed && !this.onValidatorChanged) {
        return;
      }
      raf$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        if (this.onValidatorChanged) {
          this.onValidatorChanged();
        }
        this.onEditorCreated.emit(this.quillEditor);
      });
    });
  }
  ngOnChanges(changes) {
    if (!this.quillEditor) {
      return;
    }
    if (changes.readOnly) {
      this.quillEditor.enable(!changes.readOnly.currentValue);
    }
    if (changes.placeholder) {
      this.quillEditor.root.dataset.placeholder = changes.placeholder.currentValue;
    }
    if (changes.styles) {
      const currentStyling = changes.styles.currentValue;
      const previousStyling = changes.styles.previousValue;
      if (previousStyling) {
        Object.keys(previousStyling).forEach((key) => {
          this.renderer.removeStyle(this.editorElem, key);
        });
      }
      if (currentStyling) {
        Object.keys(currentStyling).forEach((key) => {
          this.renderer.setStyle(this.editorElem, key, this.styles()[key]);
        });
      }
    }
    if (changes.classes) {
      const currentClasses = changes.classes.currentValue;
      const previousClasses = changes.classes.previousValue;
      if (previousClasses) {
        this.removeClasses(previousClasses);
      }
      if (currentClasses) {
        this.addClasses(currentClasses);
      }
    }
    if (changes.debounceTime) {
      this.addQuillEventListeners();
    }
  }
  addClasses(classList) {
    _QuillEditorBase.normalizeClassNames(classList).forEach((c) => {
      this.renderer.addClass(this.editorElem, c);
    });
  }
  removeClasses(classList) {
    _QuillEditorBase.normalizeClassNames(classList).forEach((c) => {
      this.renderer.removeClass(this.editorElem, c);
    });
  }
  writeValue(currentValue) {
    if (this.filterNull() && currentValue === null) {
      return;
    }
    this.content = currentValue;
    if (!this.quillEditor) {
      return;
    }
    const format = getFormat(this.format(), this.service.config.format);
    const valueSetter = this.valueSetter();
    const newValue = valueSetter(this.quillEditor, currentValue);
    if (this.compareValues()) {
      const currentEditorValue = this.quillEditor.getContents();
      if (JSON.stringify(currentEditorValue) === JSON.stringify(newValue)) {
        return;
      }
    }
    if (currentValue) {
      if (format === "text") {
        this.quillEditor.setText(currentValue);
      } else {
        this.quillEditor.setContents(newValue);
      }
      return;
    }
    this.quillEditor.setText("");
  }
  setDisabledState(isDisabled = this.disabled) {
    this.disabled = isDisabled;
    if (this.quillEditor) {
      if (isDisabled) {
        this.quillEditor.disable();
        this.renderer.setAttribute(this.elementRef.nativeElement, "disabled", "disabled");
      } else {
        if (!this.readOnly()) {
          this.quillEditor.enable();
        }
        this.renderer.removeAttribute(this.elementRef.nativeElement, "disabled");
      }
    }
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  registerOnValidatorChange(fn) {
    this.onValidatorChanged = fn;
  }
  validate() {
    if (!this.quillEditor) {
      return null;
    }
    const err = {};
    let valid = true;
    const text = this.quillEditor.getText();
    const textLength = this.trimOnValidation() ? text.trim().length : text.length === 1 && text.trim().length === 0 ? 0 : text.length - 1;
    const deltaOperations = this.quillEditor.getContents().ops;
    const onlyEmptyOperation = !!deltaOperations && deltaOperations.length === 1 && ["\n", ""].includes(deltaOperations[0].insert?.toString());
    if (this.minLength() && textLength && textLength < this.minLength()) {
      err.minLengthError = {
        given: textLength,
        minLength: this.minLength()
      };
      valid = false;
    }
    if (this.maxLength() && textLength > this.maxLength()) {
      err.maxLengthError = {
        given: textLength,
        maxLength: this.maxLength()
      };
      valid = false;
    }
    if (this.required() && !textLength && onlyEmptyOperation) {
      err.requiredError = {
        empty: true
      };
      valid = false;
    }
    return valid ? null : err;
  }
  addQuillEventListeners() {
    this.dispose();
    this.zone.runOutsideAngular(() => {
      this.eventsSubscription = new Subscription();
      this.eventsSubscription.add(
        // mark model as touched if editor lost focus
        fromEvent(this.quillEditor, "selection-change").subscribe(([range, oldRange, source]) => {
          this.selectionChangeHandler(range, oldRange, source);
        })
      );
      let textChange$ = fromEvent(this.quillEditor, "text-change");
      let editorChange$ = fromEvent(this.quillEditor, "editor-change");
      if (typeof this.debounceTime() === "number") {
        textChange$ = textChange$.pipe(debounceTime(this.debounceTime()));
        editorChange$ = editorChange$.pipe(debounceTime(this.debounceTime()));
      }
      this.eventsSubscription.add(
        // update model if text changes
        textChange$.subscribe(([delta, oldDelta, source]) => {
          this.textChangeHandler(delta, oldDelta, source);
        })
      );
      this.eventsSubscription.add(
        // triggered if selection or text changed
        editorChange$.subscribe(([event, current, old, source]) => {
          this.editorChangeHandler(event, current, old, source);
        })
      );
    });
  }
  dispose() {
    this.eventsSubscription?.unsubscribe();
    this.eventsSubscription = null;
  }
  isEmptyValue(html) {
    return html === "<p></p>" || html === "<div></div>" || html === "<p><br></p>" || html === "<div><br></div>";
  }
};
_QuillEditorBase.\u0275fac = function QuillEditorBase_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuillEditorBase)();
};
_QuillEditorBase.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _QuillEditorBase,
  inputs: {
    format: [1, "format"],
    theme: [1, "theme"],
    modules: [1, "modules"],
    debug: [1, "debug"],
    readOnly: [1, "readOnly"],
    placeholder: [1, "placeholder"],
    maxLength: [1, "maxLength"],
    minLength: [1, "minLength"],
    required: [1, "required"],
    formats: [1, "formats"],
    customToolbarPosition: [1, "customToolbarPosition"],
    sanitize: [1, "sanitize"],
    beforeRender: [1, "beforeRender"],
    styles: [1, "styles"],
    registry: [1, "registry"],
    bounds: [1, "bounds"],
    customOptions: [1, "customOptions"],
    customModules: [1, "customModules"],
    trackChanges: [1, "trackChanges"],
    classes: [1, "classes"],
    trimOnValidation: [1, "trimOnValidation"],
    linkPlaceholder: [1, "linkPlaceholder"],
    compareValues: [1, "compareValues"],
    filterNull: [1, "filterNull"],
    debounceTime: [1, "debounceTime"],
    defaultEmptyValue: [1, "defaultEmptyValue"],
    valueGetter: [1, "valueGetter"],
    valueSetter: [1, "valueSetter"]
  },
  outputs: {
    onEditorCreated: "onEditorCreated",
    onEditorChanged: "onEditorChanged",
    onContentChanged: "onContentChanged",
    onSelectionChanged: "onSelectionChanged",
    onFocus: "onFocus",
    onBlur: "onBlur",
    onNativeFocus: "onNativeFocus",
    onNativeBlur: "onNativeBlur"
  },
  features: [\u0275\u0275NgOnChangesFeature]
});
var QuillEditorBase = _QuillEditorBase;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillEditorBase, [{
    type: Directive
  }], () => [], {
    format: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "format",
        required: false
      }]
    }],
    theme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }],
    modules: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "modules",
        required: false
      }]
    }],
    debug: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "debug",
        required: false
      }]
    }],
    readOnly: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "readOnly",
        required: false
      }]
    }],
    placeholder: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "placeholder",
        required: false
      }]
    }],
    maxLength: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "maxLength",
        required: false
      }]
    }],
    minLength: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "minLength",
        required: false
      }]
    }],
    required: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "required",
        required: false
      }]
    }],
    formats: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "formats",
        required: false
      }]
    }],
    customToolbarPosition: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "customToolbarPosition",
        required: false
      }]
    }],
    sanitize: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "sanitize",
        required: false
      }]
    }],
    beforeRender: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "beforeRender",
        required: false
      }]
    }],
    styles: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "styles",
        required: false
      }]
    }],
    registry: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "registry",
        required: false
      }]
    }],
    bounds: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "bounds",
        required: false
      }]
    }],
    customOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "customOptions",
        required: false
      }]
    }],
    customModules: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "customModules",
        required: false
      }]
    }],
    trackChanges: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "trackChanges",
        required: false
      }]
    }],
    classes: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "classes",
        required: false
      }]
    }],
    trimOnValidation: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "trimOnValidation",
        required: false
      }]
    }],
    linkPlaceholder: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "linkPlaceholder",
        required: false
      }]
    }],
    compareValues: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "compareValues",
        required: false
      }]
    }],
    filterNull: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "filterNull",
        required: false
      }]
    }],
    debounceTime: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "debounceTime",
        required: false
      }]
    }],
    defaultEmptyValue: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "defaultEmptyValue",
        required: false
      }]
    }],
    onEditorCreated: [{
      type: Output
    }],
    onEditorChanged: [{
      type: Output
    }],
    onContentChanged: [{
      type: Output
    }],
    onSelectionChanged: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onNativeFocus: [{
      type: Output
    }],
    onNativeBlur: [{
      type: Output
    }],
    valueGetter: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "valueGetter",
        required: false
      }]
    }],
    valueSetter: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "valueSetter",
        required: false
      }]
    }]
  });
})();
var _QuillEditorComponent = class _QuillEditorComponent extends QuillEditorBase {
};
_QuillEditorComponent.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275QuillEditorComponent_BaseFactory;
  return function QuillEditorComponent_Factory(__ngFactoryType__) {
    return (\u0275QuillEditorComponent_BaseFactory || (\u0275QuillEditorComponent_BaseFactory = \u0275\u0275getInheritedFactory(_QuillEditorComponent)))(__ngFactoryType__ || _QuillEditorComponent);
  };
})();
_QuillEditorComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _QuillEditorComponent,
  selectors: [["quill-editor"]],
  features: [\u0275\u0275ProvidersFeature([{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _QuillEditorComponent)
  }, {
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => _QuillEditorComponent)
  }]), \u0275\u0275InheritDefinitionFeature],
  ngContentSelectors: _c1,
  decls: 5,
  vars: 2,
  consts: [["quill-editor-element", ""]],
  template: function QuillEditorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c0);
      \u0275\u0275conditionalCreate(0, QuillEditorComponent_Conditional_0_Template, 1, 0, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275projection(2, 1);
      \u0275\u0275projection(3, 2);
      \u0275\u0275conditionalCreate(4, QuillEditorComponent_Conditional_4_Template, 1, 0, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.toolbarPosition() !== "top" ? 0 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.toolbarPosition() === "top" ? 4 : -1);
    }
  },
  styles: ["[_nghost-%COMP%]{display:inline-block}"]
});
var QuillEditorComponent = _QuillEditorComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillEditorComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.Emulated,
      providers: [{
        multi: true,
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => QuillEditorComponent)
      }, {
        multi: true,
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => QuillEditorComponent)
      }],
      selector: "quill-editor",
      template: `
    @if (toolbarPosition() !== 'top') {
        <div quill-editor-element></div>
    }

    <ng-content select="[above-quill-editor-toolbar]"></ng-content>
    <ng-content select="[quill-editor-toolbar]"></ng-content>
    <ng-content select="[below-quill-editor-toolbar]"></ng-content>

    @if (toolbarPosition() === 'top') {
        <div quill-editor-element></div>
    }
  `,
      styles: [":host{display:inline-block}\n"]
    }]
  }], null, null);
})();
var _QuillViewHTMLComponent = class _QuillViewHTMLComponent {
  constructor() {
    this.content = input("", ...ngDevMode ? [{
      debugName: "content"
    }] : []);
    this.theme = input(void 0, ...ngDevMode ? [{
      debugName: "theme"
    }] : []);
    this.sanitize = input(void 0, ...ngDevMode ? [{
      debugName: "sanitize"
    }] : []);
    this.innerHTML = signal("", ...ngDevMode ? [{
      debugName: "innerHTML"
    }] : []);
    this.themeClass = signal("ql-snow", ...ngDevMode ? [{
      debugName: "themeClass"
    }] : []);
    this.sanitizer = inject(DomSanitizer);
    this.service = inject(QuillService);
  }
  ngOnChanges(changes) {
    if (changes.theme) {
      const theme = changes.theme.currentValue || (this.service.config.theme ? this.service.config.theme : "snow");
      this.themeClass.set(`ql-${theme} ngx-quill-view-html`);
    } else if (!this.theme()) {
      const theme = this.service.config.theme ? this.service.config.theme : "snow";
      this.themeClass.set(`ql-${theme} ngx-quill-view-html`);
    }
    if (changes.content) {
      const content = changes.content.currentValue;
      const sanitize = [true, false].includes(this.sanitize()) ? this.sanitize() : this.service.config.sanitize || false;
      const innerHTML = sanitize ? content : this.sanitizer.bypassSecurityTrustHtml(content);
      this.innerHTML.set(innerHTML);
    }
  }
};
_QuillViewHTMLComponent.\u0275fac = function QuillViewHTMLComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuillViewHTMLComponent)();
};
_QuillViewHTMLComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _QuillViewHTMLComponent,
  selectors: [["quill-view-html"]],
  inputs: {
    content: [1, "content"],
    theme: [1, "theme"],
    sanitize: [1, "sanitize"]
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 3,
  consts: [[1, "ql-container"], [1, "ql-editor", 3, "innerHTML"]],
  template: function QuillViewHTMLComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275domElement(1, "div", 1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.themeClass());
      \u0275\u0275advance();
      \u0275\u0275domProperty("innerHTML", ctx.innerHTML(), \u0275\u0275sanitizeHtml);
    }
  },
  styles: [".ql-container.ngx-quill-view-html{border:0}\n"],
  encapsulation: 2
});
var QuillViewHTMLComponent = _QuillViewHTMLComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillViewHTMLComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      selector: "quill-view-html",
      template: `
  <div class="ql-container" [class]="themeClass()">
    <div class="ql-editor" [innerHTML]="innerHTML()">
    </div>
  </div>
`,
      styles: [".ql-container.ngx-quill-view-html{border:0}\n"]
    }]
  }], null, {
    content: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "content",
        required: false
      }]
    }],
    theme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }],
    sanitize: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "sanitize",
        required: false
      }]
    }]
  });
})();
var _QuillViewComponent = class _QuillViewComponent {
  constructor() {
    this.format = input(void 0, ...ngDevMode ? [{
      debugName: "format"
    }] : []);
    this.theme = input(void 0, ...ngDevMode ? [{
      debugName: "theme"
    }] : []);
    this.modules = input(void 0, ...ngDevMode ? [{
      debugName: "modules"
    }] : []);
    this.debug = input(false, ...ngDevMode ? [{
      debugName: "debug"
    }] : []);
    this.formats = input(void 0, ...ngDevMode ? [{
      debugName: "formats"
    }] : []);
    this.sanitize = input(void 0, ...ngDevMode ? [{
      debugName: "sanitize"
    }] : []);
    this.beforeRender = input(...ngDevMode ? [void 0, {
      debugName: "beforeRender"
    }] : []);
    this.strict = input(true, ...ngDevMode ? [{
      debugName: "strict"
    }] : []);
    this.content = input(...ngDevMode ? [void 0, {
      debugName: "content"
    }] : []);
    this.customModules = input([], ...ngDevMode ? [{
      debugName: "customModules"
    }] : []);
    this.customOptions = input([], ...ngDevMode ? [{
      debugName: "customOptions"
    }] : []);
    this.onEditorCreated = new EventEmitter();
    this.elementRef = inject(ElementRef);
    this.renderer = inject(Renderer2);
    this.ngZone = inject(NgZone);
    this.service = inject(QuillService);
    this.sanitizer = inject(DomSanitizer);
    this.platformId = inject(PLATFORM_ID);
    this.destroyRef = inject(DestroyRef);
    this.valueSetter = (quillEditor, value) => {
      const format = getFormat(this.format(), this.service.config.format);
      let content = value;
      if (format === "text") {
        quillEditor.setText(content);
      } else {
        if (format === "html") {
          const sanitize = [true, false].includes(this.sanitize()) ? this.sanitize() : this.service.config.sanitize || false;
          if (sanitize) {
            value = this.sanitizer.sanitize(SecurityContext.HTML, value);
          }
          content = quillEditor.clipboard.convert({
            html: value
          });
        } else if (format === "json") {
          try {
            content = JSON.parse(value);
          } catch {
            content = [{
              insert: value
            }];
          }
        }
        quillEditor.setContents(content);
      }
    };
  }
  ngOnChanges(changes) {
    if (!this.quillEditor) {
      return;
    }
    if (changes.content) {
      this.valueSetter(this.quillEditor, changes.content.currentValue);
    }
  }
  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    const quillSubscription = this.service.getQuill().pipe(mergeMap((Quill) => this.service.beforeRender(Quill, this.customModules(), this.beforeRender()))).subscribe((Quill) => {
      const modules = Object.assign({}, this.modules() || this.service.config.modules);
      modules.toolbar = false;
      this.customOptions().forEach((customOption) => {
        const newCustomOption = Quill.import(customOption.import);
        newCustomOption.whitelist = customOption.whitelist;
        Quill.register(newCustomOption, true);
      });
      let debug = this.debug();
      if (!debug && debug !== false && this.service.config.debug) {
        debug = this.service.config.debug;
      }
      let formats = this.formats();
      if (formats === void 0) {
        formats = this.service.config.formats ? [...this.service.config.formats] : this.service.config.formats === null ? null : void 0;
      }
      const theme = this.theme() || (this.service.config.theme ? this.service.config.theme : "snow");
      this.editorElem = this.elementRef.nativeElement.querySelector("[quill-view-element]");
      this.ngZone.runOutsideAngular(() => {
        this.quillEditor = new Quill(this.editorElem, {
          debug,
          formats,
          modules,
          readOnly: true,
          strict: this.strict(),
          theme
        });
      });
      this.renderer.addClass(this.editorElem, "ngx-quill-view");
      if (this.content()) {
        this.valueSetter(this.quillEditor, this.content());
      }
      if (!this.onEditorCreated.observed) {
        return;
      }
      raf$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.onEditorCreated.emit(this.quillEditor);
      });
    });
    this.destroyRef.onDestroy(() => quillSubscription.unsubscribe());
  }
};
_QuillViewComponent.\u0275fac = function QuillViewComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuillViewComponent)();
};
_QuillViewComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _QuillViewComponent,
  selectors: [["quill-view"]],
  inputs: {
    format: [1, "format"],
    theme: [1, "theme"],
    modules: [1, "modules"],
    debug: [1, "debug"],
    formats: [1, "formats"],
    sanitize: [1, "sanitize"],
    beforeRender: [1, "beforeRender"],
    strict: [1, "strict"],
    content: [1, "content"],
    customModules: [1, "customModules"],
    customOptions: [1, "customOptions"]
  },
  outputs: {
    onEditorCreated: "onEditorCreated"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 1,
  vars: 0,
  consts: [["quill-view-element", ""]],
  template: function QuillViewComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "div", 0);
    }
  },
  styles: [".ql-container.ngx-quill-view{border:0}\n"],
  encapsulation: 2
});
var QuillViewComponent = _QuillViewComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillViewComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      selector: "quill-view",
      template: `
  <div quill-view-element></div>
`,
      styles: [".ql-container.ngx-quill-view{border:0}\n"]
    }]
  }], null, {
    format: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "format",
        required: false
      }]
    }],
    theme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }],
    modules: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "modules",
        required: false
      }]
    }],
    debug: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "debug",
        required: false
      }]
    }],
    formats: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "formats",
        required: false
      }]
    }],
    sanitize: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "sanitize",
        required: false
      }]
    }],
    beforeRender: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "beforeRender",
        required: false
      }]
    }],
    strict: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "strict",
        required: false
      }]
    }],
    content: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "content",
        required: false
      }]
    }],
    customModules: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "customModules",
        required: false
      }]
    }],
    customOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "customOptions",
        required: false
      }]
    }],
    onEditorCreated: [{
      type: Output
    }]
  });
})();
var _QuillModule = class _QuillModule {
  static forRoot(config) {
    return {
      ngModule: _QuillModule,
      providers: [{
        provide: QUILL_CONFIG_TOKEN,
        useValue: config
      }]
    };
  }
};
_QuillModule.\u0275fac = function QuillModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _QuillModule)();
};
_QuillModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _QuillModule,
  imports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent],
  exports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent]
});
_QuillModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
var QuillModule = _QuillModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuillModule, [{
    type: NgModule,
    args: [{
      imports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent],
      exports: [QuillEditorComponent, QuillViewComponent, QuillViewHTMLComponent]
    }]
  }], null, null);
})();

// src/app/core/services/email-settings.service.ts
var EmailSettingsService = class _EmailSettingsService {
  firestore = inject(Firestore);
  functions = inject(Functions);
  injector = inject(Injector);
  docPath = "settings/emailTemplates";
  getEmailSettings() {
    return runInInjectionContext(this.injector, () => {
      const docRef = doc(this.firestore, this.docPath);
      return docData(docRef);
    });
  }
  saveEmailSettings(settings) {
    const docRef = doc(this.firestore, this.docPath);
    return setDoc(docRef, settings, { merge: true });
  }
  sendAdvancedTestEmail(payload) {
    const sendTestEmailFn = httpsCallable(this.functions, "sendAdvancedTestEmail");
    return sendTestEmailFn(payload);
  }
  static \u0275fac = function EmailSettingsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmailSettingsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EmailSettingsService, factory: _EmailSettingsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailSettingsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/features/admin/components/email-management/email-management.component.ts
var _c02 = ["adminEditor"];
var _c12 = ["customerEditor"];
var _forTrack0 = ($index, $item) => $item.key;
function EmailManagementComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 10)(2, "span", 11);
    \u0275\u0275text(3, "Cargando configuraci\xF3n...");
    \u0275\u0275elementEnd()()();
  }
}
function EmailManagementComponent_Conditional_8_For_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 55);
    \u0275\u0275listener("click", function EmailManagementComponent_Conditional_8_For_43_Template_li_click_0_listener() {
      const p_r4 = \u0275\u0275restoreView(_r3).$implicit;
      \u0275\u0275nextContext();
      const adminEditor_r5 = \u0275\u0275reference(37);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.insertPlaceholder(p_r4.key, adminEditor_r5));
    });
    \u0275\u0275elementStart(1, "code");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    \u0275\u0275property("title", p_r4.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r4.label);
  }
}
function EmailManagementComponent_Conditional_8_For_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 55);
    \u0275\u0275listener("click", function EmailManagementComponent_Conditional_8_For_74_Template_li_click_0_listener() {
      const p_r7 = \u0275\u0275restoreView(_r6).$implicit;
      \u0275\u0275nextContext();
      const customerEditor_r8 = \u0275\u0275reference(68);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.insertPlaceholder(p_r7.key, customerEditor_r8));
    });
    \u0275\u0275elementStart(1, "code");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    \u0275\u0275property("title", p_r7.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r7.label);
  }
}
function EmailManagementComponent_Conditional_8_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 54);
  }
}
function EmailManagementComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 12);
    \u0275\u0275listener("ngSubmit", function EmailManagementComponent_Conditional_8_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 13)(2, "div", 14)(3, "div", 15)(4, "h5", 7);
    \u0275\u0275element(5, "i", 16);
    \u0275\u0275text(6, "Configuraci\xF3n General");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 5)(8, "div", 17)(9, "div", 18)(10, "label", 19);
    \u0275\u0275text(11, "Email del Administrador");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 20);
    \u0275\u0275elementStart(13, "div", 21);
    \u0275\u0275text(14, "Ingresa un email v\xE1lido.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 18)(16, "label", 22);
    \u0275\u0275text(17, "N\xBA WhatsApp de la Tienda");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 23);
    \u0275\u0275elementStart(19, "div", 21);
    \u0275\u0275text(20, "Ingresa un n\xFAmero de tel\xE9fono v\xE1lido.");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(21, "div", 13)(22, "div", 24)(23, "div", 15)(24, "h5", 7);
    \u0275\u0275element(25, "i", 25);
    \u0275\u0275text(26, "Notificaci\xF3n de Nuevo Pedido (para Admin)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 5)(28, "div", 26)(29, "label", 27);
    \u0275\u0275text(30, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 26)(33, "label", 29);
    \u0275\u0275text(34, "Plantilla");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 30);
    \u0275\u0275element(36, "quill-editor", 31, 0);
    \u0275\u0275elementStart(38, "div", 32)(39, "h6");
    \u0275\u0275text(40, "Variables Disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "ul");
    \u0275\u0275repeaterCreate(42, EmailManagementComponent_Conditional_8_For_43_Template, 3, 2, "li", 33, _forTrack0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(44, "div", 34);
    \u0275\u0275element(45, "input", 35);
    \u0275\u0275elementStart(46, "label", 36);
    \u0275\u0275text(47, 'Incluir bot\xF3n "Gestionar Pedido"');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 37);
    \u0275\u0275element(49, "input", 38);
    \u0275\u0275elementStart(50, "label", 39);
    \u0275\u0275text(51, 'Incluir bot\xF3n "Contactar por WhatsApp"');
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(52, "div", 13)(53, "div", 40)(54, "div", 15)(55, "h5", 7);
    \u0275\u0275element(56, "i", 41);
    \u0275\u0275text(57, "Email de Confirmaci\xF3n (para Cliente)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 5)(59, "div", 26)(60, "label", 42);
    \u0275\u0275text(61, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275element(62, "input", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 26)(64, "label", 29);
    \u0275\u0275text(65, "Plantilla");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 30);
    \u0275\u0275element(67, "quill-editor", 31, 1);
    \u0275\u0275elementStart(69, "div", 32)(70, "h6");
    \u0275\u0275text(71, "Variables Disponibles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "ul");
    \u0275\u0275repeaterCreate(73, EmailManagementComponent_Conditional_8_For_74_Template, 3, 2, "li", 33, _forTrack0);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(75, "div", 37);
    \u0275\u0275element(76, "input", 44);
    \u0275\u0275elementStart(77, "label", 45);
    \u0275\u0275text(78, 'Incluir bot\xF3n "Contactar por WhatsApp"');
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(79, "div", 46)(80, "div", 47)(81, "button", 48);
    \u0275\u0275listener("click", function EmailManagementComponent_Conditional_8_Template_button_click_81_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openTestModal());
    });
    \u0275\u0275element(82, "i", 49);
    \u0275\u0275text(83, " Enviar Prueba Avanzada ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "button", 50);
    \u0275\u0275listener("click", function EmailManagementComponent_Conditional_8_Template_button_click_84_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.restoreDefaults());
    });
    \u0275\u0275element(85, "i", 51);
    \u0275\u0275text(86, " Restaurar Plantillas ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(87, "div", 52)(88, "button", 53);
    \u0275\u0275conditionalCreate(89, EmailManagementComponent_Conditional_8_Conditional_89_Template, 1, 0, "span", 54);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.emailForm);
    \u0275\u0275advance(12);
    \u0275\u0275classProp("is-invalid", ((tmp_4_0 = ctx_r1.emailForm.get("storeOwnerEmail")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r1.emailForm.get("storeOwnerEmail")) == null ? null : tmp_4_0.touched));
    \u0275\u0275advance(6);
    \u0275\u0275classProp("is-invalid", ((tmp_5_0 = ctx_r1.emailForm.get("storeWhatsappNumber")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.emailForm.get("storeWhatsappNumber")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(18);
    \u0275\u0275property("modules", ctx_r1.editorModules);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.availablePlaceholders);
    \u0275\u0275advance(25);
    \u0275\u0275property("modules", ctx_r1.editorModules);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.availablePlaceholders);
    \u0275\u0275advance(15);
    \u0275\u0275property("disabled", ctx_r1.isSubmitting || ctx_r1.emailForm.invalid || !ctx_r1.emailForm.dirty);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSubmitting ? 89 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSubmitting ? "Guardando..." : "Guardar Cambios", " ");
  }
}
function EmailManagementComponent_Conditional_9_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 83);
  }
}
function EmailManagementComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "div", 56);
    \u0275\u0275elementStart(1, "div", 57)(2, "div", 58)(3, "div", 59)(4, "div", 60)(5, "form", 61);
    \u0275\u0275listener("ngSubmit", function EmailManagementComponent_Conditional_9_Template_form_ngSubmit_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSendAdvancedTest());
    });
    \u0275\u0275elementStart(6, "div", 62)(7, "h5", 63);
    \u0275\u0275element(8, "i", 49);
    \u0275\u0275text(9, " Prueba de Env\xEDo Avanzada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 64);
    \u0275\u0275listener("click", function EmailManagementComponent_Conditional_9_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTestModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 65)(12, "h6");
    \u0275\u0275text(13, "1. Destinatario");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 26)(15, "label", 66);
    \u0275\u0275text(16, "Enviar email de prueba a:");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "hr");
    \u0275\u0275elementStart(19, "h6");
    \u0275\u0275text(20, "2. Plantillas a Probar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 68)(22, "div", 69);
    \u0275\u0275element(23, "input", 70);
    \u0275\u0275elementStart(24, "label", 71);
    \u0275\u0275text(25, "Notificaci\xF3n al Administrador");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 69);
    \u0275\u0275element(27, "input", 72);
    \u0275\u0275elementStart(28, "label", 73);
    \u0275\u0275text(29, "Confirmaci\xF3n al Cliente");
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(30, "hr");
    \u0275\u0275elementStart(31, "h6");
    \u0275\u0275text(32, "3. Valores de Prueba (editables)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 74)(34, "div", 17)(35, "div", 18)(36, "label", 29);
    \u0275\u0275text(37, "ID del Pedido");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "input", 75);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 18)(40, "label", 29);
    \u0275\u0275text(41, "Nombre del Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275element(42, "input", 76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "div", 18)(44, "label", 29);
    \u0275\u0275text(45, "Email del Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275element(46, "input", 77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 18)(48, "label", 29);
    \u0275\u0275text(49, "Tel\xE9fono del Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275element(50, "input", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 18)(52, "label", 29);
    \u0275\u0275text(53, "Monto Total");
    \u0275\u0275elementEnd();
    \u0275\u0275element(54, "input", 79);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(55, "div", 80)(56, "button", 81);
    \u0275\u0275listener("click", function EmailManagementComponent_Conditional_9_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTestModal());
    });
    \u0275\u0275text(57, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 82);
    \u0275\u0275conditionalCreate(59, EmailManagementComponent_Conditional_9_Conditional_59_Template, 1, 0, "span", 83);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx_r1.testEmailModalForm);
    \u0275\u0275advance(53);
    \u0275\u0275property("disabled", ctx_r1.isSendingAdvancedTest || ctx_r1.testEmailModalForm.invalid);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSendingAdvancedTest ? 59 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSendingAdvancedTest ? "Enviando..." : "Enviar Prueba", " ");
  }
}
var DEFAULT_ADMIN_SUBJECT = "\xA1Nuevo Pedido Recibido! - #{orderId}";
var DEFAULT_ADMIN_TEMPLATE = `
  <p>\xA1Hola Administrador!</p>
  <p>Se ha recibido un nuevo pedido en la tienda con el ID: <strong>{orderId}</strong>.</p>
  <hr>
  <h4>Detalles del Cliente:</h4>
  <ul>
    <li><strong>Nombre:</strong> {clientName}</li>
    <li><strong>Email:</strong> {clientEmail}</li>
    <li><strong>Tel\xE9fono:</strong> {clientPhone}</li>
  </ul>
  <hr>
  <h4>Productos del Pedido:</h4>
  {itemsList}
  <hr>
  <h3><strong>Monto Total:</strong> ${"{totalAmount}"}</h3>
  <p>Puedes ver los detalles completos y gestionar el pedido en el panel de administraci\xF3n.</p>
`;
var DEFAULT_CUSTOMER_SUBJECT = "Confirmaci\xF3n de tu pedido #{orderId}";
var DEFAULT_CUSTOMER_TEMPLATE = `
  <p>\xA1Hola, {clientName}!</p>
  <p>Hemos recibido tu pedido y ya lo estamos preparando. \xA1Muchas gracias por tu compra!</p>
  <p>A continuaci\xF3n, te dejamos un resumen de tu orden <strong>#{orderId}</strong>.</p>
  <hr>
  <h4>Resumen de tu Compra:</h4>
  {itemsList}
  <hr>
  <h3><strong>Total Pagado:</strong> ${"{totalAmount}"}</h3>
  <p>Recibir\xE1s otra notificaci\xF3n cuando tu pedido sea enviado.</p>
  <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
`;
var EmailManagementComponent = class _EmailManagementComponent {
  fb = inject(FormBuilder);
  emailSettingsService = inject(EmailSettingsService);
  sweetAlertService = inject(SweetAlertService);
  cdr = inject(ChangeDetectorRef);
  adminEditor;
  customerEditor;
  emailForm;
  testEmailModalForm;
  isSubmitting = false;
  isLoading = true;
  isSendingAdvancedTest = false;
  isTestModalVisible = false;
  availablePlaceholders = [
    { key: "{orderId}", label: "ID del Pedido", description: "El ID \xFAnico del pedido (ej: 2f4bA9x...)" },
    { key: "{clientName}", label: "Nombre del Cliente", description: "El nombre completo del cliente" },
    { key: "{clientEmail}", label: "Email del Cliente", description: "El correo electr\xF3nico del cliente" },
    { key: "{clientPhone}", label: "Tel\xE9fono del Cliente", description: "El n\xFAmero de tel\xE9fono del cliente" },
    { key: "{itemsList}", label: "Lista de Productos", description: "Una lista (HTML) con los productos del pedido" },
    { key: "{totalAmount}", label: "Monto Total", description: "El monto total pagado en el pedido" }
  ];
  editorModules = {
    toolbar: [["bold", "italic", "underline", "strike"], ["blockquote", "code-block"], [{ "header": 1 }, { "header": 2 }], [{ "list": "ordered" }, { "list": "bullet" }], [{ "script": "sub" }, { "script": "super" }], [{ "indent": "-1" }, { "indent": "+1" }], [{ "direction": "rtl" }], [{ "size": ["small", false, "large", "huge"] }], [{ "header": [1, 2, 3, 4, 5, 6, false] }], [{ "color": [] }, { "background": [] }], [{ "font": [] }], [{ "align": [] }], ["clean"], ["link", "image", "video"]]
  };
  ngOnInit() {
    this.initializeForm();
    this.initializeTestModalForm();
    this.loadEmailSettings();
  }
  initializeForm() {
    this.emailForm = this.fb.group({
      storeOwnerEmail: ["", [Validators.required, Validators.email]],
      storeWhatsappNumber: ["", [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$")]],
      adminNotification: this.fb.group({
        subject: ["", Validators.required],
        template: ["", Validators.required],
        showManageButton: [false],
        showWhatsappButton: [false]
      }),
      customerConfirmation: this.fb.group({
        subject: ["", Validators.required],
        template: ["", Validators.required],
        showWhatsappButton: [false]
      })
    });
  }
  initializeTestModalForm() {
    this.testEmailModalForm = this.fb.group({
      recipientEmail: ["", [Validators.required, Validators.email]],
      templatesToTest: this.fb.group({
        adminNotification: [true],
        customerConfirmation: [true]
      }),
      testData: this.fb.group({
        orderId: ["TEST-1234", Validators.required],
        clientName: ["Juan P\xE9rez de Prueba", Validators.required],
        clientEmail: ["cliente.prueba@email.com", [Validators.required, Validators.email]],
        clientPhone: ["+5491122334455", Validators.required],
        totalAmount: ["125.50", Validators.required]
      })
    });
  }
  loadEmailSettings() {
    this.isLoading = true;
    this.emailSettingsService.getEmailSettings().pipe(take(1)).subscribe((settings) => {
      if (settings && settings.storeOwnerEmail) {
        this.emailForm.patchValue(settings);
      } else {
        this.restoreDefaults(false);
      }
      this.isLoading = false;
      this.emailForm.markAsPristine();
    });
  }
  openTestModal() {
    const currentAdminEmail = this.emailForm.get("storeOwnerEmail")?.value;
    this.testEmailModalForm.get("recipientEmail")?.setValue(currentAdminEmail);
    this.isTestModalVisible = true;
    this.cdr.detectChanges();
  }
  closeTestModal() {
    this.isTestModalVisible = false;
  }
  insertPlaceholder(placeholder, editorComponent) {
    const quill = editorComponent.quillEditor;
    const range = quill.getSelection(true);
    quill.insertText(range.index, placeholder, "user");
    quill.setSelection(range.index + placeholder.length, 0, "user");
    quill.focus();
  }
  restoreDefaults(showAlert = true) {
    return __async(this, null, function* () {
      const applyChanges = () => {
        this.emailForm.patchValue({
          adminNotification: {
            subject: DEFAULT_ADMIN_SUBJECT,
            template: DEFAULT_ADMIN_TEMPLATE
          },
          customerConfirmation: {
            subject: DEFAULT_CUSTOMER_SUBJECT,
            template: DEFAULT_CUSTOMER_TEMPLATE
          }
        });
        this.emailForm.markAsDirty();
        if (showAlert) {
          this.sweetAlertService.success("Plantillas Restauradas", "El contenido ha sido restaurado a los valores por defecto en el editor.");
        }
      };
      if (showAlert) {
        const isConfirmed = yield this.sweetAlertService.confirm("\xBFRestaurar Plantillas?", 'Esto reemplazar\xE1 el contenido actual de las plantillas con los valores por defecto. Los cambios no se guardar\xE1n hasta que hagas clic en "Guardar Cambios".');
        if (isConfirmed) {
          applyChanges();
        }
      } else {
        applyChanges();
      }
    });
  }
  onSendAdvancedTest() {
    return __async(this, null, function* () {
      if (this.testEmailModalForm.invalid) {
        this.testEmailModalForm.markAllAsTouched();
        this.sweetAlertService.error("Formulario Inv\xE1lido", "Revisa los campos del modal.");
        return;
      }
      const { recipientEmail, templatesToTest, testData } = this.testEmailModalForm.value;
      if (!templatesToTest.adminNotification && !templatesToTest.customerConfirmation) {
        this.sweetAlertService.error("Error", "Debes seleccionar al menos una plantilla para probar.");
        return;
      }
      this.isSendingAdvancedTest = true;
      this.sweetAlertService.loading("Enviando prueba...");
      testData.totalAmount = String(testData.totalAmount);
      const payload = {
        recipientEmail,
        testData,
        templates: {}
      };
      if (templatesToTest.adminNotification) {
        payload.templates.adminNotification = this.emailForm.get("adminNotification")?.value;
      }
      if (templatesToTest.customerConfirmation) {
        payload.templates.customerConfirmation = this.emailForm.get("customerConfirmation")?.value;
      }
      try {
        yield this.emailSettingsService.sendAdvancedTestEmail(payload);
        this.sweetAlertService.success("Prueba Enviada", `El email de prueba ha sido encolado para ser enviado a ${recipientEmail}.`);
        this.closeTestModal();
      } catch (error) {
        console.error("Error sending advanced test email:", error);
        this.sweetAlertService.error("Error", "No se pudo enviar el email de prueba.");
      } finally {
        this.isSendingAdvancedTest = false;
      }
    });
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.emailForm.invalid) {
        this.emailForm.markAllAsTouched();
        this.sweetAlertService.error("Formulario Inv\xE1lido", "Por favor revisa los campos marcados en rojo.");
        return;
      }
      this.isSubmitting = true;
      try {
        yield this.emailSettingsService.saveEmailSettings(this.emailForm.value);
        this.sweetAlertService.success("\xA1\xC9xito!", "La configuraci\xF3n de los emails ha sido guardada.");
        this.emailForm.markAsPristine();
      } catch (error) {
        console.error("Error saving email settings:", error);
        this.sweetAlertService.error("Error", "No se pudo guardar la configuraci\xF3n de los emails.");
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  static \u0275fac = function EmailManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmailManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmailManagementComponent, selectors: [["app-email-management"]], viewQuery: function EmailManagementComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c02, 5);
      \u0275\u0275viewQuery(_c12, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.adminEditor = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.customerEditor = _t.first);
    }
  }, decls: 10, vars: 2, consts: [["adminEditor", ""], ["customerEditor", ""], [1, "container-fluid", "my-4"], [1, "card-gradient-wrapper"], [1, "card", "list-card", "shadow-sm"], [1, "card-body"], [1, "page-title-container"], [1, "card-title", "mb-0"], [1, "text-center", "p-5"], ["novalidate", "", 3, "formGroup"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "card-gradient-wrapper", "mb-4"], [1, "card", "details-sub-card"], [1, "card-header"], [1, "bi", "bi-gear-fill", "me-2"], [1, "row"], [1, "col-md-6", "mb-3"], ["for", "storeOwnerEmail", 1, "form-label"], ["type", "email", "id", "storeOwnerEmail", "formControlName", "storeOwnerEmail", 1, "form-control"], [1, "invalid-feedback"], ["for", "storeWhatsappNumber", 1, "form-label"], ["type", "text", "id", "storeWhatsappNumber", "formControlName", "storeWhatsappNumber", "placeholder", "Ej: +549261...", 1, "form-control"], ["formGroupName", "adminNotification", 1, "card", "details-sub-card"], [1, "bi", "bi-bell-fill", "me-2"], [1, "mb-3"], ["for", "adminSubject", 1, "form-label"], ["type", "text", "id", "adminSubject", "formControlName", "subject", 1, "form-control"], [1, "form-label"], [1, "editor-wrapper"], ["formControlName", "template", "placeholder", "Escribe aqu\xED el contenido del email...", 3, "modules"], [1, "placeholder-assistant"], [3, "title"], [1, "form-check", "form-switch", "mb-2"], ["type", "checkbox", "id", "showManageButton", "formControlName", "showManageButton", 1, "form-check-input"], ["for", "showManageButton", 1, "form-check-label"], [1, "form-check", "form-switch"], ["type", "checkbox", "id", "showWhatsappButtonAdmin", "formControlName", "showWhatsappButton", 1, "form-check-input"], ["for", "showWhatsappButtonAdmin", 1, "form-check-label"], ["formGroupName", "customerConfirmation", 1, "card", "details-sub-card"], [1, "bi", "bi-envelope-check-fill", "me-2"], ["for", "customerSubject", 1, "form-label"], ["type", "text", "id", "customerSubject", "formControlName", "subject", 1, "form-control"], ["type", "checkbox", "id", "showWhatsappButtonCustomer", "formControlName", "showWhatsappButton", 1, "form-check-input"], ["for", "showWhatsappButtonCustomer", 1, "form-check-label"], [1, "actions-container"], [1, "d-grid", "gap-2", "d-sm-flex"], ["type", "button", 1, "btn", "btn-info", 3, "click"], [1, "bi", "bi-robot", "me-2"], ["type", "button", 1, "btn", "btn-outline-warning", 3, "click"], [1, "bi", "bi-arrow-counterclockwise", "me-2"], [1, "save-button-wrapper"], ["type", "submit", 1, "btn", "btn-primary", "btn-lg", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [3, "click", "title"], [1, "modal-backdrop", "fade", "show"], ["tabindex", "-1", 1, "modal", "fade", "show", 2, "display", "block"], [1, "modal-dialog", "modal-lg", "modal-dialog-centered", "modal-dialog-scrollable"], [1, "modal-content"], [1, "card-gradient-wrapper", "modal-gradient-wrapper"], [3, "ngSubmit", "formGroup"], [1, "modal-header"], [1, "modal-title"], ["type", "button", 1, "btn-close", 3, "click"], [1, "modal-body"], ["for", "recipientEmail", 1, "form-label"], ["type", "email", "id", "recipientEmail", "formControlName", "recipientEmail", 1, "form-control"], ["formGroupName", "templatesToTest", 1, "mb-3"], [1, "form-check"], ["type", "checkbox", "id", "testAdmin", "formControlName", "adminNotification", 1, "form-check-input"], ["for", "testAdmin", 1, "form-check-label"], ["type", "checkbox", "id", "testCustomer", "formControlName", "customerConfirmation", 1, "form-check-input"], ["for", "testCustomer", 1, "form-check-label"], ["formGroupName", "testData"], ["type", "text", "formControlName", "orderId", 1, "form-control"], ["type", "text", "formControlName", "clientName", 1, "form-control"], ["type", "email", "formControlName", "clientEmail", 1, "form-control"], ["type", "text", "formControlName", "clientPhone", 1, "form-control"], ["type", "text", "formControlName", "totalAmount", 1, "form-control"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "me-2"]], template: function EmailManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "div", 6)(5, "h2", 7);
      \u0275\u0275text(6, "Gesti\xF3n de Notificaciones por Email");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(7, EmailManagementComponent_Conditional_7_Template, 4, 0, "div", 8)(8, EmailManagementComponent_Conditional_8_Template, 91, 10, "form", 9);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(9, EmailManagementComponent_Conditional_9_Template, 61, 4);
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.isLoading ? 7 : 8);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isTestModalVisible ? 9 : -1);
    }
  }, dependencies: [
    CommonModule,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    CheckboxControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    FormGroupName,
    QuillModule,
    QuillEditorComponent
  ], styles: ["\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.list-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n  color: #212529;\n}\n.page-title-container[_ngcontent-%COMP%] {\n  padding-bottom: 0.5rem;\n  text-align: left;\n  margin-bottom: 1.5rem !important;\n}\n.page-title-container[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  display: inline-block;\n}\n.details-sub-card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: none;\n  border-radius: 0.75rem;\n  background-color: #ffffff;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border-bottom: 1px solid #dfe3e8;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: #343a40;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #007bff;\n  font-size: 1.2em;\n}\n.form-label[_ngcontent-%COMP%], \n.form-check-label[_ngcontent-%COMP%] {\n  color: #495057;\n  font-weight: 500;\n}\n.form-control[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.5rem 1rem;\n}\n.form-control[_ngcontent-%COMP%]:hover {\n  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\nquill-editor[_ngcontent-%COMP%] {\n  display: block;\n  border-radius: 0.75rem;\n  overflow: hidden;\n}\nquill-editor[_ngcontent-%COMP%]   .ql-toolbar[_ngcontent-%COMP%] {\n  background-color: #f8f9fa;\n  border: 1px solid #dfe3e8;\n  border-bottom: 0;\n}\nquill-editor[_ngcontent-%COMP%]   .ql-container[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  min-height: 250px;\n}\nquill-editor[_ngcontent-%COMP%]   .ql-editor.ql-blank[_ngcontent-%COMP%]::before {\n  color: #6c757d;\n  font-style: normal;\n  opacity: 0.9;\n}\n.editor-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n.editor-wrapper[_ngcontent-%COMP%]    > quill-editor[_ngcontent-%COMP%] {\n  flex: 1 1 450px;\n  min-width: 300px;\n}\n.editor-wrapper[_ngcontent-%COMP%]    > .placeholder-assistant[_ngcontent-%COMP%] {\n  flex: 1 1 240px;\n  max-width: 100%;\n  align-self: flex-start;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  padding: 1rem;\n  background-color: #f8f9fa;\n}\n@media (min-width: 1200px) {\n  .editor-wrapper[_ngcontent-%COMP%]    > .placeholder-assistant[_ngcontent-%COMP%] {\n    flex-basis: 280px;\n    flex-grow: 0;\n  }\n}\n.placeholder-assistant[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  margin-top: 0;\n  margin-bottom: 0.75rem;\n  border-bottom: 1px solid #dfe3e8;\n  padding-bottom: 0.5rem;\n}\n.placeholder-assistant[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.placeholder-assistant[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.5rem;\n  margin-bottom: 0.25rem;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n.placeholder-assistant[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #7b68ee;\n  font-weight: 500;\n}\n.placeholder-assistant[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover {\n  background-color: rgba(0, 123, 255, 0.1);\n}\n.placeholder-assistant[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   code[_ngcontent-%COMP%] {\n  color: #007bff;\n}\n.modal-backdrop.show[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n.modal.show[_ngcontent-%COMP%] {\n  display: block;\n}\n.modal-content[_ngcontent-%COMP%], \n.modal-gradient-wrapper[_ngcontent-%COMP%], \n.modal-gradient-wrapper[_ngcontent-%COMP%]    > form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  min-height: 0;\n  background-color: transparent;\n  border: none;\n}\n.modal-gradient-wrapper[_ngcontent-%COMP%]    > form[_ngcontent-%COMP%] {\n  background-color: #f4f6f9;\n  border-radius: calc(1rem - 2px);\n}\n.modal-header[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n  flex-shrink: 0;\n}\n.modal-header[_ngcontent-%COMP%]   .modal-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1.25rem;\n  color: #343a40;\n}\n.modal-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  overflow-y: auto;\n  flex-grow: 1;\n}\n.modal-body[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #007bff;\n  margin-top: 1rem;\n  margin-bottom: 0.75rem;\n}\n.modal-body[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]:first-child {\n  margin-top: 0;\n}\n.modal-body[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%] {\n  margin: 1.5rem 0;\n  border-top: 1px solid #dee2e6;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-top: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n  border-bottom-left-radius: calc(1rem - 2px);\n  border-bottom-right-radius: calc(1rem - 2px);\n  flex-shrink: 0;\n}\n.actions-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n  border-top: 1px solid #dfe3e8;\n  padding-top: 1.5rem;\n  margin-top: 2rem;\n}\n.save-button-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 2px;\n  border-radius: 0.75rem;\n  background: transparent;\n  transition: all 0.3s ease;\n  flex-grow: 1;\n  flex-basis: 200px;\n  min-width: fit-content;\n}\n.save-button-wrapper[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgb(143.0357142857, 126.9196428571, 240.5803571429),\n      #7b68ee);\n  color: white;\n  font-weight: 600;\n  border: none;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.2);\n  width: 100%;\n}\n.save-button-wrapper[_ngcontent-%COMP%]:hover:not(:has(:disabled)) {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n  box-shadow: 0 0 20px rgba(123, 104, 238, 0.5);\n}\n.save-button-wrapper[_ngcontent-%COMP%]:hover:not(:has(:disabled))   .btn-primary[_ngcontent-%COMP%] {\n  background-color: #21213b;\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(123, 104, 238, 0.3);\n}\n/*# sourceMappingURL=email-management.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EmailManagementComponent, [{
    type: Component,
    args: [{ selector: "app-email-management", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      QuillModule
    ], template: `<div class="container-fluid my-4">
  <div class="card-gradient-wrapper">
    <div class="card list-card shadow-sm">
      <div class="card-body">
        <div class="page-title-container">
          <h2 class="card-title mb-0">Gesti\xF3n de Notificaciones por Email</h2>
        </div>

        @if (isLoading) {
          <div class="text-center p-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando configuraci\xF3n...</span>
            </div>
          </div>
        } @else {
          <form [formGroup]="emailForm" (ngSubmit)="onSubmit()" novalidate>

            <div class="card-gradient-wrapper mb-4">
              <div class="card details-sub-card">
                <div class="card-header">
                  <h5 class="card-title mb-0"><i class="bi bi-gear-fill me-2"></i>Configuraci\xF3n General</h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="storeOwnerEmail" class="form-label">Email del Administrador</label>
                      <input type="email" id="storeOwnerEmail" class="form-control" formControlName="storeOwnerEmail"
                        [class.is-invalid]="emailForm.get('storeOwnerEmail')?.invalid && emailForm.get('storeOwnerEmail')?.touched">
                      <div class="invalid-feedback">Ingresa un email v\xE1lido.</div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="storeWhatsappNumber" class="form-label">N\xBA WhatsApp de la Tienda</label>
                      <input type="text" id="storeWhatsappNumber" class="form-control"
                        formControlName="storeWhatsappNumber" placeholder="Ej: +549261..."
                        [class.is-invalid]="emailForm.get('storeWhatsappNumber')?.invalid && emailForm.get('storeWhatsappNumber')?.touched">
                      <div class="invalid-feedback">Ingresa un n\xFAmero de tel\xE9fono v\xE1lido.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-gradient-wrapper mb-4">
              <div class="card details-sub-card" formGroupName="adminNotification">
                <div class="card-header">
                  <h5 class="card-title mb-0"><i class="bi bi-bell-fill me-2"></i>Notificaci\xF3n de Nuevo Pedido (para Admin)</h5>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label for="adminSubject" class="form-label">Asunto</label>
                    <input type="text" id="adminSubject" class="form-control" formControlName="subject">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Plantilla</label>
                    <div class="editor-wrapper">
                      <quill-editor
                        #adminEditor
                        formControlName="template"
                        [modules]="editorModules"
                        placeholder="Escribe aqu\xED el contenido del email..."
                      ></quill-editor>
                      <div class="placeholder-assistant">
                        <h6>Variables Disponibles</h6>
                        <ul>
                          @for (p of availablePlaceholders; track p.key) {
                            <li (click)="insertPlaceholder(p.key, adminEditor)" [title]="p.description">
                              <code>{{ p.label }}</code>
                            </li>
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="form-check form-switch mb-2">
                    <input class="form-check-input" type="checkbox" id="showManageButton" formControlName="showManageButton">
                    <label class="form-check-label" for="showManageButton">Incluir bot\xF3n "Gestionar Pedido"</label>
                  </div>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="showWhatsappButtonAdmin" formControlName="showWhatsappButton">
                    <label class="form-check-label" for="showWhatsappButtonAdmin">Incluir bot\xF3n "Contactar por WhatsApp"</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-gradient-wrapper mb-4">
              <div class="card details-sub-card" formGroupName="customerConfirmation">
                <div class="card-header">
                  <h5 class="card-title mb-0"><i class="bi bi-envelope-check-fill me-2"></i>Email de Confirmaci\xF3n (para Cliente)</h5>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label for="customerSubject" class="form-label">Asunto</label>
                    <input type="text" id="customerSubject" class="form-control" formControlName="subject">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Plantilla</label>
                    <div class="editor-wrapper">
                      <quill-editor
                        #customerEditor
                        formControlName="template"
                        [modules]="editorModules"
                        placeholder="Escribe aqu\xED el contenido del email..."
                      ></quill-editor>
                      <div class="placeholder-assistant">
                        <h6>Variables Disponibles</h6>
                        <ul>
                          @for (p of availablePlaceholders; track p.key) {
                            <li (click)="insertPlaceholder(p.key, customerEditor)" [title]="p.description">
                              <code>{{ p.label }}</code>
                            </li>
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="showWhatsappButtonCustomer" formControlName="showWhatsappButton">
                    <label class="form-check-label" for="showWhatsappButtonCustomer">Incluir bot\xF3n "Contactar por WhatsApp"</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="actions-container">
              <div class="d-grid gap-2 d-sm-flex">
                <button type="button" class="btn btn-info" (click)="openTestModal()">
                  <i class="bi bi-robot me-2"></i> Enviar Prueba Avanzada
                </button>
                <button type="button" class="btn btn-outline-warning" (click)="restoreDefaults()">
                  <i class="bi bi-arrow-counterclockwise me-2"></i> Restaurar Plantillas
                </button>
              </div>

              <div class="save-button-wrapper">
                <button type="submit" class="btn btn-primary btn-lg" [disabled]="isSubmitting || emailForm.invalid || !emailForm.dirty">
                  @if (isSubmitting) {
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  }
                  {{ isSubmitting ? 'Guardando...' : 'Guardar Cambios' }}
                </button>
              </div>
            </div>
          </form>
        }
      </div>
    </div>
  </div>
</div>

@if (isTestModalVisible) {
  <div class="modal-backdrop fade show"></div>
  <div class="modal fade show" style="display: block;" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="card-gradient-wrapper modal-gradient-wrapper">
          <form [formGroup]="testEmailModalForm" (ngSubmit)="onSendAdvancedTest()">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-robot me-2"></i> Prueba de Env\xEDo Avanzada</h5>
              <button type="button" class="btn-close" (click)="closeTestModal()"></button>
            </div>
            <div class="modal-body">
              <h6>1. Destinatario</h6>
              <div class="mb-3">
                <label for="recipientEmail" class="form-label">Enviar email de prueba a:</label>
                <input type="email" id="recipientEmail" class="form-control" formControlName="recipientEmail">
              </div>
              <hr>
              <h6>2. Plantillas a Probar</h6>
              <div class="mb-3" formGroupName="templatesToTest">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="testAdmin" formControlName="adminNotification">
                  <label class="form-check-label" for="testAdmin">Notificaci\xF3n al Administrador</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="testCustomer" formControlName="customerConfirmation">
                  <label class="form-check-label" for="testCustomer">Confirmaci\xF3n al Cliente</label>
                </div>
              </div>
              <hr>
              <h6>3. Valores de Prueba (editables)</h6>
              <div formGroupName="testData">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">ID del Pedido</label>
                    <input type="text" class="form-control" formControlName="orderId">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Nombre del Cliente</label>
                    <input type="text" class="form-control" formControlName="clientName">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Email del Cliente</label>
                    <input type="email" class="form-control" formControlName="clientEmail">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Tel\xE9fono del Cliente</label>
                    <input type="text" class="form-control" formControlName="clientPhone">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Monto Total</label>
                    <input type="text" class="form-control" formControlName="totalAmount">
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeTestModal()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="isSendingAdvancedTest || testEmailModalForm.invalid">
                @if (isSendingAdvancedTest) {
                  <span class="spinner-border spinner-border-sm me-2"></span>
                }
                {{ isSendingAdvancedTest ? 'Enviando...' : 'Enviar Prueba' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
}`, styles: ["/* src/app/features/admin/components/email-management/email-management.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.list-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n  color: #212529;\n}\n.page-title-container {\n  padding-bottom: 0.5rem;\n  text-align: left;\n  margin-bottom: 1.5rem !important;\n}\n.page-title-container .card-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  display: inline-block;\n}\n.details-sub-card {\n  border: none;\n  box-shadow: none;\n  border-radius: 0.75rem;\n  background-color: #ffffff;\n}\n.details-sub-card .card-header {\n  background-color: transparent;\n  border-bottom: 1px solid #dfe3e8;\n}\n.details-sub-card .card-header .card-title {\n  font-size: 1.1rem;\n  color: #343a40;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n.details-sub-card .card-header .card-title i {\n  color: #007bff;\n  font-size: 1.2em;\n}\n.form-label,\n.form-check-label {\n  color: #495057;\n  font-weight: 500;\n}\n.form-control {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.5rem 1rem;\n}\n.form-control:hover {\n  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);\n}\n.form-control:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\nquill-editor {\n  display: block;\n  border-radius: 0.75rem;\n  overflow: hidden;\n}\nquill-editor .ql-toolbar {\n  background-color: #f8f9fa;\n  border: 1px solid #dfe3e8;\n  border-bottom: 0;\n}\nquill-editor .ql-container {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  min-height: 250px;\n}\nquill-editor .ql-editor.ql-blank::before {\n  color: #6c757d;\n  font-style: normal;\n  opacity: 0.9;\n}\n.editor-wrapper {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}\n.editor-wrapper > quill-editor {\n  flex: 1 1 450px;\n  min-width: 300px;\n}\n.editor-wrapper > .placeholder-assistant {\n  flex: 1 1 240px;\n  max-width: 100%;\n  align-self: flex-start;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  padding: 1rem;\n  background-color: #f8f9fa;\n}\n@media (min-width: 1200px) {\n  .editor-wrapper > .placeholder-assistant {\n    flex-basis: 280px;\n    flex-grow: 0;\n  }\n}\n.placeholder-assistant h6 {\n  font-weight: 600;\n  color: #495057;\n  margin-top: 0;\n  margin-bottom: 0.75rem;\n  border-bottom: 1px solid #dfe3e8;\n  padding-bottom: 0.5rem;\n}\n.placeholder-assistant ul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.placeholder-assistant li {\n  padding: 0.35rem 0.5rem;\n  margin-bottom: 0.25rem;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  transition: background-color 0.2s ease, color 0.2s ease;\n}\n.placeholder-assistant li code {\n  font-size: 0.85rem;\n  color: #7b68ee;\n  font-weight: 500;\n}\n.placeholder-assistant li:hover {\n  background-color: rgba(0, 123, 255, 0.1);\n}\n.placeholder-assistant li:hover code {\n  color: #007bff;\n}\n.modal-backdrop.show {\n  opacity: 0.5;\n}\n.modal.show {\n  display: block;\n}\n.modal-content,\n.modal-gradient-wrapper,\n.modal-gradient-wrapper > form {\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  min-height: 0;\n  background-color: transparent;\n  border: none;\n}\n.modal-gradient-wrapper > form {\n  background-color: #f4f6f9;\n  border-radius: calc(1rem - 2px);\n}\n.modal-header {\n  border-bottom: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n  flex-shrink: 0;\n}\n.modal-header .modal-title {\n  font-weight: 700;\n  font-size: 1.25rem;\n  color: #343a40;\n}\n.modal-body {\n  padding: 1.5rem;\n  overflow-y: auto;\n  flex-grow: 1;\n}\n.modal-body h6 {\n  font-weight: 600;\n  color: #007bff;\n  margin-top: 1rem;\n  margin-bottom: 0.75rem;\n}\n.modal-body h6:first-child {\n  margin-top: 0;\n}\n.modal-body hr {\n  margin: 1.5rem 0;\n  border-top: 1px solid #dee2e6;\n}\n.modal-footer {\n  background-color: #ffffff;\n  border-top: 1px solid #dee2e6;\n  padding: 1rem 1.5rem;\n  border-bottom-left-radius: calc(1rem - 2px);\n  border-bottom-right-radius: calc(1rem - 2px);\n  flex-shrink: 0;\n}\n.actions-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n  border-top: 1px solid #dfe3e8;\n  padding-top: 1.5rem;\n  margin-top: 2rem;\n}\n.save-button-wrapper {\n  position: relative;\n  padding: 2px;\n  border-radius: 0.75rem;\n  background: transparent;\n  transition: all 0.3s ease;\n  flex-grow: 1;\n  flex-basis: 200px;\n  min-width: fit-content;\n}\n.save-button-wrapper .btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      rgb(143.0357142857, 126.9196428571, 240.5803571429),\n      #7b68ee);\n  color: white;\n  font-weight: 600;\n  border: none;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.2);\n  width: 100%;\n}\n.save-button-wrapper:hover:not(:has(:disabled)) {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n  box-shadow: 0 0 20px rgba(123, 104, 238, 0.5);\n}\n.save-button-wrapper:hover:not(:has(:disabled)) .btn-primary {\n  background-color: #21213b;\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(123, 104, 238, 0.3);\n}\n/*# sourceMappingURL=email-management.component.css.map */\n"] }]
  }], null, { adminEditor: [{
    type: ViewChild,
    args: ["adminEditor"]
  }], customerEditor: [{
    type: ViewChild,
    args: ["customerEditor"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmailManagementComponent, { className: "EmailManagementComponent", filePath: "src/app/features/admin/components/email-management/email-management.component.ts", lineNumber: 54 });
})();
export {
  EmailManagementComponent
};
//# sourceMappingURL=chunk-CAHABXML.js.map
