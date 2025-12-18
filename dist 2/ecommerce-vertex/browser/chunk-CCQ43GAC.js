import {
  HomeContentService
} from "./chunk-5KI2V4TS.js";
import {
  CategoryService
} from "./chunk-MXEO7R2O.js";
import "./chunk-EBKKK7PL.js";
import "./chunk-CUH4JQND.js";
import {
  DefaultValueAccessor,
  FormArrayName,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormGroupName,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-WR4QMUYF.js";
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
  inject,
  map,
  setClassMetadata,
  take,
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
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import {
  __async
} from "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/home-management/home-management.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function HomeManagementComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, "Vista Previa:");
    \u0275\u0275elementEnd();
  }
}
function HomeManagementComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 19);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.bannerPreviewUrl, \u0275\u0275sanitizeUrl);
  }
}
function HomeManagementComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 20);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.imageUrl == null ? null : ctx_r0.imageUrl.value, \u0275\u0275sanitizeUrl);
  }
}
function HomeManagementComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, "No hay imagen cargada.");
    \u0275\u0275elementEnd();
  }
}
function HomeManagementComponent_For_55_Conditional_8_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r4 = ctx.$implicit;
    \u0275\u0275property("value", cat_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r4.name);
  }
}
function HomeManagementComponent_For_55_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, HomeManagementComponent_For_55_Conditional_8_For_1_Template, 2, 2, "option", 54, _forTrack0);
  }
  if (rf & 2) {
    \u0275\u0275repeater(ctx);
  }
}
function HomeManagementComponent_For_55_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 49);
  }
  if (rf & 2) {
    const \u0275$index_105_r3 = \u0275\u0275nextContext().$index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.categoryPreviewUrls[\u0275$index_105_r3], \u0275\u0275sanitizeUrl);
  }
}
function HomeManagementComponent_For_55_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 49);
  }
  if (rf & 2) {
    let tmp_12_0;
    const categoryControl_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", (tmp_12_0 = categoryControl_r5.get("imageUrl")) == null ? null : tmp_12_0.value, \u0275\u0275sanitizeUrl);
  }
}
function HomeManagementComponent_For_55_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 21);
    \u0275\u0275text(1, "Sin imagen");
    \u0275\u0275elementEnd();
  }
}
function HomeManagementComponent_For_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 40)(2, "div", 41)(3, "label", 42);
    \u0275\u0275text(4, "Categor\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "select", 43);
    \u0275\u0275listener("change", function HomeManagementComponent_For_55_Template_select_change_5_listener($event) {
      const \u0275$index_105_r3 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCategorySelectionChange(\u0275$index_105_r3, $event));
    });
    \u0275\u0275elementStart(6, "option", 44);
    \u0275\u0275text(7, "Selecciona...");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, HomeManagementComponent_For_55_Conditional_8_Template, 2, 0);
    \u0275\u0275pipe(9, "async");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 41)(11, "label", 42);
    \u0275\u0275text(12, "Imagen");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "label", 45);
    \u0275\u0275element(15, "i", 14);
    \u0275\u0275text(16, " Cambiar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 46);
    \u0275\u0275listener("change", function HomeManagementComponent_For_55_Template_input_change_17_listener($event) {
      const \u0275$index_105_r3 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onFileSelected($event, \u0275$index_105_r3));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 47)(19, "div", 48);
    \u0275\u0275conditionalCreate(20, HomeManagementComponent_For_55_Conditional_20_Template, 1, 1, "img", 49)(21, HomeManagementComponent_For_55_Conditional_21_Template, 1, 1, "img", 49)(22, HomeManagementComponent_For_55_Conditional_22_Template, 2, 0, "small", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 50)(24, "label", 51);
    \u0275\u0275text(25, "\xA0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 52);
    \u0275\u0275listener("click", function HomeManagementComponent_For_55_Template_button_click_26_listener() {
      const \u0275$index_105_r3 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.removeFeaturedCategory(\u0275$index_105_r3));
    });
    \u0275\u0275element(27, "i", 53);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    let tmp_19_0;
    const categoryControl_r5 = ctx.$implicit;
    const \u0275$index_105_r3 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroupName", \u0275$index_105_r3);
    \u0275\u0275advance(3);
    \u0275\u0275property("for", "categoryName" + \u0275$index_105_r3);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "categoryName" + \u0275$index_105_r3);
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_15_0 = \u0275\u0275pipeBind1(9, 9, ctx_r0.categories$)) ? 8 : -1, tmp_15_0);
    \u0275\u0275advance(3);
    \u0275\u0275property("for", "categoryImageFile" + \u0275$index_105_r3);
    \u0275\u0275advance(3);
    \u0275\u0275property("for", "categoryImageFile" + \u0275$index_105_r3);
    \u0275\u0275advance(3);
    \u0275\u0275property("id", "categoryImageFile" + \u0275$index_105_r3);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r0.categoryPreviewUrls[\u0275$index_105_r3] ? 20 : ((tmp_19_0 = categoryControl_r5.get("imageUrl")) == null ? null : tmp_19_0.value) ? 21 : 22);
  }
}
function HomeManagementComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275text(1, ' No hay categor\xEDas destacadas. Haz clic en "A\xF1adir" para empezar. ');
    \u0275\u0275elementEnd();
  }
}
function HomeManagementComponent_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 39);
  }
}
var HomeManagementComponent = class _HomeManagementComponent {
  fb = inject(FormBuilder);
  homeContentService = inject(HomeContentService);
  sweetAlertService = inject(SweetAlertService);
  categoryService = inject(CategoryService);
  bannerForm;
  isSubmitting = false;
  categories$;
  selectedBannerFile = null;
  bannerPreviewUrl = null;
  selectedCategoryFiles = [];
  categoryPreviewUrls = [];
  categoryMap = /* @__PURE__ */ new Map();
  ngOnInit() {
    this.initializeForm();
    this.categories$ = this.categoryService.getCategories().pipe(take(1), map((categories) => {
      this.categoryMap.clear();
      categories.forEach((cat) => this.categoryMap.set(cat.id, { name: cat.name, slug: cat.slug }));
      return categories;
    }));
    this.loadContentData();
  }
  initializeForm() {
    this.bannerForm = this.fb.group({
      imageUrl: ["", [Validators.pattern("https?://.+")]],
      title: [""],
      buttonText: [""],
      buttonLink: [""],
      featuredCategories: this.fb.array([])
    });
  }
  loadContentData() {
    this.homeContentService.getHeroBanner().pipe(take(1)).subscribe((content) => {
      if (content) {
        this.bannerForm.patchValue({
          imageUrl: content.imageUrl,
          title: content.title,
          buttonText: content.buttonText,
          buttonLink: content.buttonLink
        });
        this.featuredCategories.clear();
        this.selectedCategoryFiles = [];
        this.categoryPreviewUrls = [];
        if (content.featuredCategories) {
          content.featuredCategories.forEach((cat) => this.addFeaturedCategory(cat));
        }
      }
    });
  }
  get imageUrl() {
    return this.bannerForm.get("imageUrl");
  }
  get featuredCategories() {
    return this.bannerForm.get("featuredCategories");
  }
  newFeaturedCategory(category) {
    return this.fb.group({
      categoryId: [category?.categoryId || null, Validators.required],
      name: [category?.name || ""],
      slug: [category?.slug || ""],
      imageUrl: [category?.imageUrl || "", [Validators.pattern("https?://.+")]]
    });
  }
  addFeaturedCategory(category) {
    if (this.featuredCategories.length < 3) {
      this.featuredCategories.push(this.newFeaturedCategory(category));
      this.selectedCategoryFiles.push(null);
      this.categoryPreviewUrls.push(null);
    }
  }
  removeFeaturedCategory(index) {
    this.featuredCategories.removeAt(index);
    this.selectedCategoryFiles.splice(index, 1);
    this.categoryPreviewUrls.splice(index, 1);
  }
  onCategorySelectionChange(index, event) {
    const selectedId = event.target.value;
    const categoryData = this.categoryMap.get(selectedId);
    if (categoryData) {
      this.featuredCategories.at(index).patchValue({
        name: categoryData.name,
        slug: categoryData.slug
      });
    }
  }
  onFileSelected(event, type) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.type.startsWith("image/")) {
        this.sweetAlertService.error("Archivo no v\xE1lido", "Por favor, selecciona un archivo de imagen.");
        input.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result;
        if (type === "main") {
          this.selectedBannerFile = file;
          this.bannerPreviewUrl = previewUrl;
          this.bannerForm.get("imageUrl")?.setValue("");
        } else {
          this.selectedCategoryFiles[type] = file;
          this.categoryPreviewUrls[type] = previewUrl;
          this.featuredCategories.at(type).get("imageUrl")?.setValue("");
        }
        this.bannerForm.markAsDirty();
      };
      reader.readAsDataURL(file);
      input.value = "";
    }
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.bannerForm.invalid) {
        this.bannerForm.markAllAsTouched();
        this.sweetAlertService.error("Formulario Inv\xE1lido", "Por favor revisa los campos marcados en rojo.");
        return;
      }
      this.isSubmitting = true;
      try {
        yield this.homeContentService.saveHomePageContent(this.bannerForm.value, this.selectedBannerFile, this.selectedCategoryFiles);
        this.sweetAlertService.success("\xA1\xC9xito!", "La configuraci\xF3n de la Home ha sido guardada.");
        this.bannerPreviewUrl = null;
        this.selectedBannerFile = null;
        this.selectedCategoryFiles.fill(null);
        this.categoryPreviewUrls.fill(null);
        this.bannerForm.markAsPristine();
      } catch (error) {
        console.error("Error saving home page content:", error);
        this.sweetAlertService.error("Error", "No se pudo guardar la configuraci\xF3n.");
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  static \u0275fac = function HomeManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeManagementComponent, selectors: [["app-home-management"]], decls: 61, vars: 8, consts: [[1, "container-fluid", "my-4"], [1, "card-gradient-wrapper"], [1, "card", "list-card", "shadow-sm"], [1, "card-body"], [1, "page-title-container", "text-center", "mb-4"], [1, "card-title", "mb-0"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "card-gradient-wrapper", "mb-4"], [1, "card", "details-sub-card"], [1, "card-header"], [1, "bi", "bi-image", "me-2"], [1, "mb-3", "text-center"], ["for", "bannerImage", 1, "form-label"], ["for", "bannerImage", 1, "file-input-label"], [1, "bi", "bi-upload"], ["type", "file", "id", "bannerImage", "accept", "image/png, image/jpeg, image/webp", 1, "file-input", 3, "change"], [1, "form-text", "mt-2", "text-muted-custom"], [1, "image-preview-container"], [1, "form-text", "text-muted", "text-center"], ["alt", "Previsualizaci\xF3n del nuevo banner", 1, "img-fluid", "rounded", 3, "src"], ["alt", "Banner actual", 1, "img-fluid", "rounded", 3, "src"], [1, "no-preview-text"], [1, "row"], [1, "col-md-6", "mb-3"], ["for", "title", 1, "form-label"], ["type", "text", "id", "title", "formControlName", "title", "placeholder", "Ej: \xA1Nueva Colecci\xF3n!", 1, "form-control"], ["for", "buttonText", 1, "form-label"], ["type", "text", "id", "buttonText", "formControlName", "buttonText", "placeholder", "Ej: Ver ahora", 1, "form-control"], ["for", "buttonLink", 1, "form-label"], ["type", "text", "id", "buttonLink", "formControlName", "buttonLink", "placeholder", "Ej: /shop/catalog", 1, "form-control"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "bi", "bi-tags", "me-2"], ["type", "button", 1, "btn", "btn-outline-secondary", "btn-sm", 3, "click", "disabled"], [1, "bi", "bi-plus-lg"], ["formArrayName", "featuredCategories", 1, "card-body"], [1, "featured-category-item", "mb-3", 3, "formGroupName"], [1, "text-center", "text-muted-custom", "p-3"], [1, "d-flex", "justify-content-end", "mt-4"], ["type", "submit", 1, "btn", "btn-primary", "btn-lg", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "row", "align-items-center"], [1, "col-md-4", "mb-2", "mb-md-0"], [1, "form-label", 3, "for"], ["formControlName", "categoryId", 1, "form-select", 3, "change", "id"], ["disabled", "", 3, "ngValue"], [1, "file-input-label", "w-100", "text-center", 3, "for"], ["type", "file", "accept", "image/png, image/jpeg, image/webp", 1, "file-input", 3, "change", "id"], [1, "col-md-3", "mb-2", "mb-md-0"], [1, "image-preview-container", "m-0", 2, "min-height", "50px", "padding", "0.25rem"], [1, "img-fluid", "rounded", 3, "src"], [1, "col-md-1"], [1, "form-label", "d-block"], ["type", "button", "title", "Eliminar", 1, "btn", "btn-outline-danger", "w-100", 3, "click"], [1, "bi", "bi-trash"], [3, "value"]], template: function HomeManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h2", 5);
      \u0275\u0275text(6, "Gesti\xF3n de la P\xE1gina de Inicio");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "form", 6);
      \u0275\u0275listener("ngSubmit", function HomeManagementComponent_Template_form_ngSubmit_7_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "div", 9)(11, "h5", 5);
      \u0275\u0275element(12, "i", 10);
      \u0275\u0275text(13, "Banner Principal (Hero)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 3)(15, "div", 11)(16, "label", 12);
      \u0275\u0275text(17, "Cambiar Imagen del Banner");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div")(19, "label", 13);
      \u0275\u0275element(20, "i", 14);
      \u0275\u0275text(21, " Seleccionar archivo ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "input", 15);
      \u0275\u0275listener("change", function HomeManagementComponent_Template_input_change_22_listener($event) {
        return ctx.onFileSelected($event, "main");
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 16);
      \u0275\u0275text(24, "Sube una nueva imagen para reemplazar la actual.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 17);
      \u0275\u0275conditionalCreate(26, HomeManagementComponent_Conditional_26_Template, 2, 0, "p", 18);
      \u0275\u0275conditionalCreate(27, HomeManagementComponent_Conditional_27_Template, 1, 1, "img", 19)(28, HomeManagementComponent_Conditional_28_Template, 1, 1, "img", 20)(29, HomeManagementComponent_Conditional_29_Template, 2, 0, "p", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "hr");
      \u0275\u0275elementStart(31, "div", 22)(32, "div", 23)(33, "label", 24);
      \u0275\u0275text(34, "T\xEDtulo General (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(35, "input", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 23)(37, "label", 26);
      \u0275\u0275text(38, "Texto del Bot\xF3n (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(39, "input", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "div")(41, "label", 28);
      \u0275\u0275text(42, "Enlace del Bot\xF3n (Opcional)");
      \u0275\u0275elementEnd();
      \u0275\u0275element(43, "input", 29);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(44, "div", 1)(45, "div", 8)(46, "div", 30)(47, "h5", 5);
      \u0275\u0275element(48, "i", 31);
      \u0275\u0275text(49, "Categor\xEDas Destacadas (M\xE1x. 3)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "button", 32);
      \u0275\u0275listener("click", function HomeManagementComponent_Template_button_click_50_listener() {
        return ctx.addFeaturedCategory();
      });
      \u0275\u0275element(51, "i", 33);
      \u0275\u0275text(52, " A\xF1adir ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 34);
      \u0275\u0275repeaterCreate(54, HomeManagementComponent_For_55_Template, 28, 11, "div", 35, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275conditionalCreate(56, HomeManagementComponent_Conditional_56_Template, 2, 0, "div", 36);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(57, "div", 37)(58, "button", 38);
      \u0275\u0275conditionalCreate(59, HomeManagementComponent_Conditional_59_Template, 1, 0, "span", 39);
      \u0275\u0275text(60);
      \u0275\u0275elementEnd()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("formGroup", ctx.bannerForm);
      \u0275\u0275advance(19);
      \u0275\u0275conditional(ctx.bannerPreviewUrl || (ctx.imageUrl == null ? null : ctx.imageUrl.value) ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.bannerPreviewUrl ? 27 : (ctx.imageUrl == null ? null : ctx.imageUrl.value) ? 28 : 29);
      \u0275\u0275advance(23);
      \u0275\u0275property("disabled", ctx.featuredCategories.length >= 3);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.featuredCategories.controls);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.featuredCategories.length === 0 ? 56 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isSubmitting || ctx.bannerForm.invalid || !ctx.bannerForm.dirty);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSubmitting ? 59 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isSubmitting ? "Guardando..." : "Guardar Cambios", " ");
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormGroupName, FormArrayName, AsyncPipe], styles: ["\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.list-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: rgb(38.4880434783, 38.4880434783, 68.8119565217);\n  color: #f8f9fa;\n}\n.list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.page-title-container[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.details-sub-card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: none;\n  border-radius: 0.75rem;\n  background-color: rgb(38.4880434783, 38.4880434783, 68.8119565217);\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border-bottom: 1px solid rgba(248, 249, 250, 0.1);\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: #007bff;\n  background: none;\n  font-weight: 600;\n}\n.details-sub-card[_ngcontent-%COMP%]   .form-label[_ngcontent-%COMP%] {\n  color: #f8f9fa;\n  font-weight: 500;\n  font-size: 0.9rem;\n}\n.featured-category-item[_ngcontent-%COMP%] {\n  border: 1px solid rgba(248, 249, 250, 0.1);\n  background-color: rgba(26, 26, 46, 0.3);\n  border-radius: 0.5rem;\n  padding: 1rem;\n}\n.text-muted-custom[_ngcontent-%COMP%] {\n  color: #adb5bd !important;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgb(143.0357142857, 126.9196428571, 240.5803571429),\n      #7b68ee);\n  color: white;\n  font-weight: 600;\n  border: none;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.2);\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(123, 104, 238, 0.3);\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.image-preview-container[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 450px;\n  margin: 1.5rem auto;\n  border: 2px dashed rgba(248, 249, 250, 0.2);\n  border-radius: 0.75rem;\n  padding: 1rem;\n  background-color: rgba(26, 26, 46, 0.2);\n  min-height: 150px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.image-preview-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: auto;\n  border-radius: 0.5rem;\n}\n.image-preview-container[_ngcontent-%COMP%]   .no-preview-text[_ngcontent-%COMP%] {\n  color: #adb5bd;\n}\n.file-input-label[_ngcontent-%COMP%] {\n  cursor: pointer;\n  background-color: #007bff;\n  color: white;\n  padding: 0.6rem 1.2rem;\n  border-radius: 0.5rem;\n  display: inline-flex;\n  align-items: center;\n  transition: all 0.3s ease;\n  font-weight: 500;\n  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);\n}\n.file-input-label[_ngcontent-%COMP%]:hover {\n  background-color: rgb(25.5, 136.2, 255);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);\n}\n.file-input-label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.file-input[_ngcontent-%COMP%] {\n  display: none;\n}\n/*# sourceMappingURL=home-management.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeManagementComponent, [{
    type: Component,
    args: [{ selector: "app-home-management", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="container-fluid my-4">
  <div class="card-gradient-wrapper">
    <div class="card list-card shadow-sm">
      <div class="card-body">
        <div class="page-title-container text-center mb-4">
          <h2 class="card-title mb-0">Gesti\xF3n de la P\xE1gina de Inicio</h2>
        </div>

        <form [formGroup]="bannerForm" (ngSubmit)="onSubmit()" novalidate>
          <div class="card-gradient-wrapper mb-4">
            <div class="card details-sub-card">
              <div class="card-header">
                <h5 class="card-title mb-0"><i class="bi bi-image me-2"></i>Banner Principal (Hero)</h5>
              </div>
              <div class="card-body">
                <div class="mb-3 text-center">
                  <label for="bannerImage" class="form-label">Cambiar Imagen del Banner</label>
                  <div>
                    <label for="bannerImage" class="file-input-label">
                      <i class="bi bi-upload"></i> Seleccionar archivo
                    </label>
                    <input type="file" id="bannerImage" class="file-input" (change)="onFileSelected($event, 'main')" accept="image/png, image/jpeg, image/webp">
                  </div>
                  <div class="form-text mt-2 text-muted-custom">Sube una nueva imagen para reemplazar la actual.</div>
                </div>

                <div class="image-preview-container">
                  @if (bannerPreviewUrl || imageUrl?.value) {
                    <p class="form-text text-muted text-center">Vista Previa:</p>
                  }
                  @if (bannerPreviewUrl) {
                    <img [src]="bannerPreviewUrl" alt="Previsualizaci\xF3n del nuevo banner" class="img-fluid rounded">
                  } @else if (imageUrl?.value) {
                    <img [src]="imageUrl?.value" alt="Banner actual" class="img-fluid rounded">
                  } @else {
                    <p class="no-preview-text">No hay imagen cargada.</p>
                  }
                </div>
                <hr>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="title" class="form-label">T\xEDtulo General (Opcional)</label>
                    <input type="text" id="title" class="form-control" formControlName="title" placeholder="Ej: \xA1Nueva Colecci\xF3n!">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="buttonText" class="form-label">Texto del Bot\xF3n (Opcional)</label>
                    <input type="text" id="buttonText" class="form-control" formControlName="buttonText" placeholder="Ej: Ver ahora">
                  </div>
                </div>
                <div>
                  <label for="buttonLink" class="form-label">Enlace del Bot\xF3n (Opcional)</label>
                  <input type="text" id="buttonLink" class="form-control" formControlName="buttonLink" placeholder="Ej: /shop/catalog">
                </div>
              </div>
            </div>
          </div>

          <div class="card-gradient-wrapper">
            <div class="card details-sub-card">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0"><i class="bi bi-tags me-2"></i>Categor\xEDas Destacadas (M\xE1x. 3)</h5>
                <button type="button" class="btn btn-outline-secondary btn-sm" (click)="addFeaturedCategory()" [disabled]="featuredCategories.length >= 3">
                  <i class="bi bi-plus-lg"></i> A\xF1adir
                </button>
              </div>
              <div class="card-body" formArrayName="featuredCategories">
                @for (categoryControl of featuredCategories.controls; track categoryControl; let i = $index) {
                  <div [formGroupName]="i" class="featured-category-item mb-3">
                    <div class="row align-items-center">
                      <div class="col-md-4 mb-2 mb-md-0">
                        <label [for]="'categoryName' + i" class="form-label">Categor\xEDa</label>
                        <select [id]="'categoryName' + i" class="form-select" formControlName="categoryId"
                          (change)="onCategorySelectionChange(i, $event)">
                          <option [ngValue]="null" disabled>Selecciona...</option>
                          @if (categories$ | async; as categories) {
                            @for (cat of categories; track cat.id) {
                              <option [value]="cat.id">{{ cat.name }}</option>
                            }
                          }
                        </select>
                      </div>
                      <div class="col-md-4 mb-2 mb-md-0">
                        <label [for]="'categoryImageFile' + i" class="form-label">Imagen</label>
                        <div>
                           <label [for]="'categoryImageFile' + i" class="file-input-label w-100 text-center">
                            <i class="bi bi-upload"></i> Cambiar
                           </label>
                          <input type="file" [id]="'categoryImageFile' + i" class="file-input" (change)="onFileSelected($event, i)" accept="image/png, image/jpeg, image/webp">
                        </div>
                      </div>
                      <div class="col-md-3 mb-2 mb-md-0">
                          <div class="image-preview-container m-0" style="min-height: 50px; padding: 0.25rem">
                            @if (categoryPreviewUrls[i]) {
                              <img [src]="categoryPreviewUrls[i]" class="img-fluid rounded">
                            } @else if (categoryControl.get('imageUrl')?.value) {
                              <img [src]="categoryControl.get('imageUrl')?.value" class="img-fluid rounded">
                            } @else {
                              <small class="no-preview-text">Sin imagen</small>
                            }
                          </div>
                      </div>
                      <div class="col-md-1">
                        <label class="form-label d-block">&nbsp;</label>
                        <button type="button" class="btn btn-outline-danger w-100" (click)="removeFeaturedCategory(i)" title="Eliminar">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                }
                @if (featuredCategories.length === 0) {
                  <div class="text-center text-muted-custom p-3">
                    No hay categor\xEDas destacadas. Haz clic en "A\xF1adir" para empezar.
                  </div>
                }
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end mt-4">
            <button type="submit" class="btn btn-primary btn-lg" [disabled]="isSubmitting || bannerForm.invalid || !bannerForm.dirty">
              @if (isSubmitting) {
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              }
              {{ isSubmitting ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>`, styles: ["/* src/app/features/admin/components/home-management/home-management.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.list-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: rgb(38.4880434783, 38.4880434783, 68.8119565217);\n  color: #f8f9fa;\n}\n.list-card .card-body {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card .card-body {\n    padding: 2rem;\n  }\n}\n.page-title-container .card-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.details-sub-card {\n  border: none;\n  box-shadow: none;\n  border-radius: 0.75rem;\n  background-color: rgb(38.4880434783, 38.4880434783, 68.8119565217);\n}\n.details-sub-card .card-header {\n  background-color: transparent;\n  border-bottom: 1px solid rgba(248, 249, 250, 0.1);\n}\n.details-sub-card .card-header .card-title {\n  font-size: 1.1rem;\n  color: #007bff;\n  background: none;\n  font-weight: 600;\n}\n.details-sub-card .form-label {\n  color: #f8f9fa;\n  font-weight: 500;\n  font-size: 0.9rem;\n}\n.featured-category-item {\n  border: 1px solid rgba(248, 249, 250, 0.1);\n  background-color: rgba(26, 26, 46, 0.3);\n  border-radius: 0.5rem;\n  padding: 1rem;\n}\n.text-muted-custom {\n  color: #adb5bd !important;\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      rgb(143.0357142857, 126.9196428571, 240.5803571429),\n      #7b68ee);\n  color: white;\n  font-weight: 600;\n  border: none;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.2);\n}\n.btn-primary:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(123, 104, 238, 0.3);\n}\n.btn-outline-secondary {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-outline-secondary:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.image-preview-container {\n  position: relative;\n  max-width: 450px;\n  margin: 1.5rem auto;\n  border: 2px dashed rgba(248, 249, 250, 0.2);\n  border-radius: 0.75rem;\n  padding: 1rem;\n  background-color: rgba(26, 26, 46, 0.2);\n  min-height: 150px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.image-preview-container img {\n  height: auto;\n  border-radius: 0.5rem;\n}\n.image-preview-container .no-preview-text {\n  color: #adb5bd;\n}\n.file-input-label {\n  cursor: pointer;\n  background-color: #007bff;\n  color: white;\n  padding: 0.6rem 1.2rem;\n  border-radius: 0.5rem;\n  display: inline-flex;\n  align-items: center;\n  transition: all 0.3s ease;\n  font-weight: 500;\n  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);\n}\n.file-input-label:hover {\n  background-color: rgb(25.5, 136.2, 255);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);\n}\n.file-input-label i {\n  margin-right: 0.5rem;\n}\n.file-input {\n  display: none;\n}\n/*# sourceMappingURL=home-management.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeManagementComponent, { className: "HomeManagementComponent", filePath: "src/app/features/admin/components/home-management/home-management.component.ts", lineNumber: 20 });
})();
export {
  HomeManagementComponent
};
//# sourceMappingURL=chunk-CCQ43GAC.js.map
