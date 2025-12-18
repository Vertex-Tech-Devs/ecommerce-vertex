import {
  AboutUsService
} from "./chunk-GQC77EE4.js";
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
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-WR4QMUYF.js";
import {
  SweetAlertService
} from "./chunk-5OJQRZGI.js";
import "./chunk-HMD6QQFJ.js";
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/about-us-management/about-us-management.component.ts
function AboutUsManagementComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 8)(2, "span", 9);
    \u0275\u0275text(3, "Cargando datos...");
    \u0275\u0275elementEnd()()();
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "Vista Previa:");
    \u0275\u0275elementEnd();
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 29);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.bannerPreviewUrl, \u0275\u0275sanitizeUrl);
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 30);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", (tmp_2_0 = ctx_r1.aboutUsForm.get("bannerImageUrl")) == null ? null : tmp_2_0.value, \u0275\u0275sanitizeUrl);
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1, "No hay imagen cargada.");
    \u0275\u0275elementEnd();
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "Vista Previa:");
    \u0275\u0275elementEnd();
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 38);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.centralPreviewUrl, \u0275\u0275sanitizeUrl);
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 39);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", (tmp_2_0 = ctx_r1.aboutUsForm.get("centralImageUrl")) == null ? null : tmp_2_0.value, \u0275\u0275sanitizeUrl);
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 31);
    \u0275\u0275text(1, "No hay imagen cargada.");
    \u0275\u0275elementEnd();
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "La descripci\xF3n es obligatoria.");
    \u0275\u0275elementEnd();
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "Debe tener al menos 50 caracteres.");
    \u0275\u0275elementEnd();
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "No debe exceder los 1000 caracteres.");
    \u0275\u0275elementEnd();
  }
}
function AboutUsManagementComponent_Conditional_8_For_89_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 55)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 56);
    \u0275\u0275listener("click", function AboutUsManagementComponent_Conditional_8_For_89_Template_button_click_4_listener() {
      const \u0275$index_199_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeFeatureCard(\u0275$index_199_r4));
    });
    \u0275\u0275element(5, "i", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 58)(7, "label", 59);
    \u0275\u0275text(8, "T\xEDtulo de la Card");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 60);
    \u0275\u0275elementStart(10, "div", 18);
    \u0275\u0275text(11, "Requerido.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div")(13, "label", 59);
    \u0275\u0275text(14, "Contenido de la Card");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "textarea", 61);
    \u0275\u0275elementStart(16, "div", 18);
    \u0275\u0275text(17, "Requerido.");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_16_0;
    let tmp_19_0;
    const card_r5 = ctx.$implicit;
    const \u0275$index_199_r4 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroupName", \u0275$index_199_r4);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Card ", \u0275$index_199_r4 + 1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.featureCards.length <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("for", "cardTitle" + \u0275$index_199_r4);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-invalid", ((tmp_16_0 = card_r5.get("title")) == null ? null : tmp_16_0.invalid) && ((tmp_16_0 = card_r5.get("title")) == null ? null : tmp_16_0.touched));
    \u0275\u0275property("id", "cardTitle" + \u0275$index_199_r4);
    \u0275\u0275advance(4);
    \u0275\u0275property("for", "cardContent" + \u0275$index_199_r4);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("is-invalid", ((tmp_19_0 = card_r5.get("content")) == null ? null : tmp_19_0.invalid) && ((tmp_19_0 = card_r5.get("content")) == null ? null : tmp_19_0.touched));
    \u0275\u0275property("id", "cardContent" + \u0275$index_199_r4);
  }
}
function AboutUsManagementComponent_Conditional_8_ForEmpty_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275text(1, ' No hay cards. Haz clic en "A\xF1adir" para empezar. ');
    \u0275\u0275elementEnd();
  }
}
function AboutUsManagementComponent_Conditional_8_Conditional_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 54);
  }
}
function AboutUsManagementComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 10);
    \u0275\u0275listener("ngSubmit", function AboutUsManagementComponent_Conditional_8_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12)(3, "div", 13)(4, "h5", 5);
    \u0275\u0275element(5, "i", 14);
    \u0275\u0275text(6, "Secci\xF3n 1: Banner Principal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 3)(8, "div", 15)(9, "label", 16);
    \u0275\u0275text(10, "T\xEDtulo Principal");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 17);
    \u0275\u0275elementStart(12, "div", 18);
    \u0275\u0275text(13, "El t\xEDtulo del banner es obligatorio.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 15)(15, "label", 19);
    \u0275\u0275text(16, "Subt\xEDtulo (Eslogan)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 21)(19, "label", 22);
    \u0275\u0275text(20, "Cambiar Imagen del Banner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div")(22, "label", 23);
    \u0275\u0275element(23, "i", 24);
    \u0275\u0275text(24, " Seleccionar archivo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 25);
    \u0275\u0275listener("change", function AboutUsManagementComponent_Conditional_8_Template_input_change_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event, "banner"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 26);
    \u0275\u0275text(27, "Sube una nueva imagen para reemplazar la actual.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 27);
    \u0275\u0275conditionalCreate(29, AboutUsManagementComponent_Conditional_8_Conditional_29_Template, 2, 0, "p", 28);
    \u0275\u0275conditionalCreate(30, AboutUsManagementComponent_Conditional_8_Conditional_30_Template, 1, 1, "img", 29)(31, AboutUsManagementComponent_Conditional_8_Conditional_31_Template, 1, 1, "img", 30)(32, AboutUsManagementComponent_Conditional_8_Conditional_32_Template, 2, 0, "p", 31);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "div", 11)(34, "div", 12)(35, "div", 13)(36, "h5", 5);
    \u0275\u0275element(37, "i", 32);
    \u0275\u0275text(38, "Secci\xF3n 2: Contenido Central");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 3)(40, "div", 15)(41, "label", 33);
    \u0275\u0275text(42, "T\xEDtulo de la Secci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(43, "input", 34);
    \u0275\u0275elementStart(44, "div", 18);
    \u0275\u0275text(45, "El t\xEDtulo central es obligatorio.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 21)(47, "label", 35);
    \u0275\u0275text(48, "Cambiar Imagen Lateral");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div")(50, "label", 36);
    \u0275\u0275element(51, "i", 24);
    \u0275\u0275text(52, " Seleccionar archivo ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "input", 37);
    \u0275\u0275listener("change", function AboutUsManagementComponent_Conditional_8_Template_input_change_53_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event, "central"));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 26);
    \u0275\u0275text(55, "Sube una nueva imagen para reemplazar la actual.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 27);
    \u0275\u0275conditionalCreate(57, AboutUsManagementComponent_Conditional_8_Conditional_57_Template, 2, 0, "p", 28);
    \u0275\u0275conditionalCreate(58, AboutUsManagementComponent_Conditional_8_Conditional_58_Template, 1, 1, "img", 38)(59, AboutUsManagementComponent_Conditional_8_Conditional_59_Template, 1, 1, "img", 39)(60, AboutUsManagementComponent_Conditional_8_Conditional_60_Template, 2, 0, "p", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275element(61, "hr");
    \u0275\u0275elementStart(62, "div", 15)(63, "label", 40);
    \u0275\u0275text(64, "P\xE1rrafo de Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(65, "textarea", 41);
    \u0275\u0275elementStart(66, "div", 18);
    \u0275\u0275conditionalCreate(67, AboutUsManagementComponent_Conditional_8_Conditional_67_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(68, AboutUsManagementComponent_Conditional_8_Conditional_68_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(69, AboutUsManagementComponent_Conditional_8_Conditional_69_Template, 2, 0, "div");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(70, "div", 11)(71, "div", 12)(72, "div", 42)(73, "h5", 5);
    \u0275\u0275element(74, "i", 43);
    \u0275\u0275text(75, "Secci\xF3n 3: Caracter\xEDsticas (1 M\xEDn / 2 M\xE1x)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(76, "button", 44);
    \u0275\u0275listener("click", function AboutUsManagementComponent_Conditional_8_Template_button_click_76_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addFeatureCard());
    });
    \u0275\u0275element(77, "i", 45);
    \u0275\u0275text(78, " A\xF1adir ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "div", 3)(80, "div", 15)(81, "label", 46);
    \u0275\u0275text(82, "T\xEDtulo General de la Secci\xF3n de Cards");
    \u0275\u0275elementEnd();
    \u0275\u0275element(83, "input", 47);
    \u0275\u0275elementStart(84, "div", 18);
    \u0275\u0275text(85, "Este t\xEDtulo es obligatorio.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(86, "hr");
    \u0275\u0275elementStart(87, "div", 48);
    \u0275\u0275repeaterCreate(88, AboutUsManagementComponent_Conditional_8_For_89_Template, 18, 11, "div", 49, \u0275\u0275repeaterTrackByIndex, false, AboutUsManagementComponent_Conditional_8_ForEmpty_90_Template, 2, 0, "div", 50);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(91, "div", 51)(92, "div", 52)(93, "button", 53);
    \u0275\u0275conditionalCreate(94, AboutUsManagementComponent_Conditional_8_Conditional_94_Template, 1, 0, "span", 54);
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    let tmp_13_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.aboutUsForm);
    \u0275\u0275advance(11);
    \u0275\u0275classProp("is-invalid", ((tmp_2_0 = ctx_r1.aboutUsForm.get("bannerTitle")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r1.aboutUsForm.get("bannerTitle")) == null ? null : tmp_2_0.touched));
    \u0275\u0275advance(18);
    \u0275\u0275conditional(ctx_r1.bannerPreviewUrl || ((tmp_3_0 = ctx_r1.aboutUsForm.get("bannerImageUrl")) == null ? null : tmp_3_0.value) ? 29 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.bannerPreviewUrl ? 30 : ((tmp_4_0 = ctx_r1.aboutUsForm.get("bannerImageUrl")) == null ? null : tmp_4_0.value) ? 31 : 32);
    \u0275\u0275advance(13);
    \u0275\u0275classProp("is-invalid", ((tmp_5_0 = ctx_r1.aboutUsForm.get("centralTitle")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.aboutUsForm.get("centralTitle")) == null ? null : tmp_5_0.touched));
    \u0275\u0275advance(14);
    \u0275\u0275conditional(ctx_r1.centralPreviewUrl || ((tmp_6_0 = ctx_r1.aboutUsForm.get("centralImageUrl")) == null ? null : tmp_6_0.value) ? 57 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.centralPreviewUrl ? 58 : ((tmp_7_0 = ctx_r1.aboutUsForm.get("centralImageUrl")) == null ? null : tmp_7_0.value) ? 59 : 60);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("is-invalid", ((tmp_8_0 = ctx_r1.aboutUsForm.get("centralDescription")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r1.aboutUsForm.get("centralDescription")) == null ? null : tmp_8_0.touched));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_9_0 = ctx_r1.aboutUsForm.get("centralDescription")) == null ? null : tmp_9_0.errors == null ? null : tmp_9_0.errors["required"]) ? 67 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_10_0 = ctx_r1.aboutUsForm.get("centralDescription")) == null ? null : tmp_10_0.errors == null ? null : tmp_10_0.errors["minlength"]) ? 68 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_11_0 = ctx_r1.aboutUsForm.get("centralDescription")) == null ? null : tmp_11_0.errors == null ? null : tmp_11_0.errors["maxlength"]) ? 69 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.featureCards.length >= 2);
    \u0275\u0275advance(7);
    \u0275\u0275classProp("is-invalid", ((tmp_13_0 = ctx_r1.aboutUsForm.get("cardsSectionTitle")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx_r1.aboutUsForm.get("cardsSectionTitle")) == null ? null : tmp_13_0.touched));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.featureCards.controls);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.isSubmitting || ctx_r1.aboutUsForm.invalid || !ctx_r1.aboutUsForm.dirty);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.isSubmitting ? 94 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSubmitting ? "Guardando..." : "Guardar Todos los Cambios", " ");
  }
}
var AboutUsManagementComponent = class _AboutUsManagementComponent {
  fb = inject(FormBuilder);
  aboutUsService = inject(AboutUsService);
  alertService = inject(SweetAlertService);
  aboutUsForm;
  data$;
  isLoading = true;
  isSubmitting = false;
  selectedBannerFile = null;
  bannerPreviewUrl = null;
  selectedCentralFile = null;
  centralPreviewUrl = null;
  constructor() {
    this.data$ = this.aboutUsService.getAboutUsData();
    this.buildForm();
  }
  ngOnInit() {
    this.loadDataIntoForm();
  }
  buildForm(data = null) {
    this.aboutUsForm = this.fb.group({
      bannerTitle: [data?.bannerTitle || "", Validators.required],
      bannerSubtitle: [data?.bannerSubtitle || ""],
      bannerImageUrl: [data?.bannerImageUrl || "", [Validators.pattern("https?://.+")]],
      centralTitle: [data?.centralTitle || "", Validators.required],
      centralImageUrl: [data?.centralImageUrl || "", [Validators.pattern("https?://.+")]],
      centralDescription: [data?.centralDescription || "", [Validators.required, Validators.minLength(50), Validators.maxLength(1e3)]],
      cardsSectionTitle: [data?.cardsSectionTitle || "", Validators.required],
      featureCards: this.fb.array([], [Validators.required, Validators.minLength(1), Validators.maxLength(2)])
    });
    if (data?.featureCards && data.featureCards.length > 0) {
      data.featureCards.forEach((card) => this.addFeatureCard(card));
    } else {
      this.addFeatureCard();
    }
  }
  loadDataIntoForm() {
    this.isLoading = true;
    this.data$.pipe(take(1)).subscribe((data) => {
      if (data) {
        this.buildForm(data);
      } else {
        this.buildForm();
      }
      this.bannerPreviewUrl = null;
      this.centralPreviewUrl = null;
      this.selectedBannerFile = null;
      this.selectedCentralFile = null;
      this.isLoading = false;
    });
  }
  get featureCards() {
    return this.aboutUsForm.get("featureCards");
  }
  createFeatureCardGroup(card = null) {
    return this.fb.group({
      title: [card?.title || "", Validators.required],
      content: [card?.content || "", Validators.required]
    });
  }
  addFeatureCard(cardData) {
    if (this.featureCards.length >= 2)
      return;
    const cardGroup = this.createFeatureCardGroup(cardData || null);
    this.featureCards.push(cardGroup);
  }
  removeFeatureCard(index) {
    if (this.featureCards.length <= 1)
      return;
    this.featureCards.removeAt(index);
    this.aboutUsForm.markAsDirty();
  }
  onFileSelected(event, type) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.type.startsWith("image/")) {
        this.alertService.error("Archivo no v\xE1lido", "Por favor, selecciona un archivo de imagen.");
        input.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result;
        if (type === "banner") {
          this.selectedBannerFile = file;
          this.bannerPreviewUrl = previewUrl;
          this.aboutUsForm.get("bannerImageUrl")?.setValue("");
        } else if (type === "central") {
          this.selectedCentralFile = file;
          this.centralPreviewUrl = previewUrl;
          this.aboutUsForm.get("centralImageUrl")?.setValue("");
        }
        this.aboutUsForm.markAsDirty();
      };
      reader.readAsDataURL(file);
      input.value = "";
    }
  }
  onSubmit() {
    if (this.aboutUsForm.invalid) {
      this.aboutUsForm.markAllAsTouched();
      this.alertService.error("Formulario Inv\xE1lido", "Por favor, revisa todos los campos marcados en rojo.");
      return;
    }
    this.isSubmitting = true;
    this.alertService.loading("Guardando Cambios...");
    const formData = this.aboutUsForm.value;
    this.aboutUsService.saveAboutUsData(formData, this.selectedBannerFile, this.selectedCentralFile).then(() => {
      this.alertService.success("\xA1Guardado!", 'El contenido de la p\xE1gina "Nosotros" ha sido actualizado.');
      this.aboutUsForm.markAsPristine();
      this.bannerPreviewUrl = null;
      this.centralPreviewUrl = null;
      this.selectedBannerFile = null;
      this.selectedCentralFile = null;
    }).catch((err) => {
      console.error("Error saving data:", err);
      this.alertService.error("Error", "No se pudieron guardar los cambios.");
    }).finally(() => {
      this.isSubmitting = false;
      this.alertService.close();
    });
  }
  resetForm() {
    this.loadDataIntoForm();
  }
  static \u0275fac = function AboutUsManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AboutUsManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AboutUsManagementComponent, selectors: [["app-about-us-management"]], decls: 9, vars: 1, consts: [[1, "container-fluid", "my-4"], [1, "card-gradient-wrapper"], [1, "card", "list-card", "shadow-sm"], [1, "card-body"], [1, "page-title-container"], [1, "card-title", "mb-0"], [1, "text-center", "p-5"], [3, "formGroup"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"], [3, "ngSubmit", "formGroup"], [1, "card-gradient-wrapper", "mb-4"], [1, "card", "details-sub-card"], [1, "card-header"], [1, "bi", "bi-image", "me-2"], [1, "mb-3"], ["for", "bannerTitle", 1, "form-label"], ["type", "text", "id", "bannerTitle", "formControlName", "bannerTitle", 1, "form-control"], [1, "invalid-feedback"], ["for", "bannerSubtitle", 1, "form-label"], ["type", "text", "id", "bannerSubtitle", "formControlName", "bannerSubtitle", 1, "form-control"], [1, "mb-3", "text-center"], ["for", "bannerImageUpload", 1, "form-label"], ["for", "bannerImageUpload", 1, "file-input-label"], [1, "bi", "bi-upload"], ["type", "file", "id", "bannerImageUpload", "accept", "image/png, image/jpeg, image/webp", 1, "file-input", 3, "change"], [1, "form-text", "mt-2", "text-muted-custom"], [1, "image-preview-container"], [1, "form-text", "text-muted", "text-center"], ["alt", "Previsualizaci\xF3n del nuevo banner", 1, "img-fluid", "rounded", 3, "src"], ["alt", "Banner actual", 1, "img-fluid", "rounded", 3, "src"], [1, "no-preview-text"], [1, "bi", "bi-file-text", "me-2"], ["for", "centralTitle", 1, "form-label"], ["type", "text", "id", "centralTitle", "formControlName", "centralTitle", 1, "form-control"], ["for", "centralImageUpload", 1, "form-label"], ["for", "centralImageUpload", 1, "file-input-label"], ["type", "file", "id", "centralImageUpload", "accept", "image/png, image/jpeg, image/webp", 1, "file-input", 3, "change"], ["alt", "Previsualizaci\xF3n de imagen lateral", 1, "img-fluid", "rounded", 3, "src"], ["alt", "Imagen lateral actual", 1, "img-fluid", "rounded", 3, "src"], ["for", "centralDescription", 1, "form-label"], ["id", "centralDescription", "formControlName", "centralDescription", "rows", "6", 1, "form-control"], [1, "card-header", "d-flex", "justify-content-between", "align-items-center"], [1, "bi", "bi-check2-circle", "me-2"], ["type", "button", 1, "btn", "btn-outline-secondary", "btn-sm", 3, "click", "disabled"], [1, "bi", "bi-plus-lg"], ["for", "cardsSectionTitle", 1, "form-label"], ["type", "text", "id", "cardsSectionTitle", "formControlName", "cardsSectionTitle", 1, "form-control"], ["formArrayName", "featureCards"], [1, "featured-category-item", "mb-3", 3, "formGroupName"], [1, "text-center", "text-muted-custom", "p-3"], [1, "actions-container"], [1, "save-button-wrapper"], ["type", "submit", 1, "btn", "btn-primary", "btn-lg", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-2"], ["type", "button", "title", "Eliminar Card", 1, "btn", "btn-sm", "btn-outline-danger", 3, "click", "disabled"], [1, "bi", "bi-trash"], [1, "mb-2"], [1, "form-label", "small", 3, "for"], ["type", "text", "formControlName", "title", 1, "form-control", "form-control-sm", 3, "id"], ["formControlName", "content", "rows", "3", 1, "form-control", "form-control-sm", 3, "id"]], template: function AboutUsManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h2", 5);
      \u0275\u0275text(6, 'Gesti\xF3n de P\xE1gina "Nosotros"');
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(7, AboutUsManagementComponent_Conditional_7_Template, 4, 0, "div", 6)(8, AboutUsManagementComponent_Conditional_8_Template, 96, 21, "form", 7);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.isLoading ? 7 : 8);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormGroupName, FormArrayName], styles: ["\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.list-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n  color: #212529;\n}\n.page-title-container[_ngcontent-%COMP%] {\n  padding-bottom: 0.5rem;\n  text-align: left;\n  margin-bottom: 1.5rem !important;\n}\n.page-title-container[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  display: inline-block;\n}\n.details-sub-card[_ngcontent-%COMP%] {\n  border: none;\n  box-shadow: none;\n  border-radius: 0.75rem;\n  background-color: #ffffff;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border-bottom: 1px solid #dfe3e8;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: #343a40;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n.details-sub-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #007bff;\n  font-size: 1.2em;\n}\n.form-label[_ngcontent-%COMP%], \n.form-check-label[_ngcontent-%COMP%] {\n  color: #495057;\n  font-weight: 500;\n}\n.form-control[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.5rem 1rem;\n}\n.form-control[_ngcontent-%COMP%]:hover {\n  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);\n}\n.form-control[_ngcontent-%COMP%]:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\n.featured-category-item[_ngcontent-%COMP%] {\n  border: 1px solid #dfe3e8;\n  background-color: #f8f9fa;\n  border-radius: 0.5rem;\n  padding: 1rem;\n}\n.text-muted-custom[_ngcontent-%COMP%] {\n  color: #6c757d !important;\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.image-preview-container[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 450px;\n  margin: 1.5rem auto;\n  border: 2px dashed #dfe3e8;\n  border-radius: 0.75rem;\n  padding: 1rem;\n  background-color: #f8f9fa;\n  min-height: 150px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.image-preview-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: auto;\n  border-radius: 0.5rem;\n}\n.image-preview-container[_ngcontent-%COMP%]   .no-preview-text[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n.file-input-label[_ngcontent-%COMP%] {\n  cursor: pointer;\n  background-color: #007bff;\n  color: white;\n  padding: 0.6rem 1.2rem;\n  border-radius: 0.5rem;\n  display: inline-flex;\n  align-items: center;\n  transition: all 0.3s ease;\n  font-weight: 500;\n  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);\n}\n.file-input-label[_ngcontent-%COMP%]:hover {\n  background-color: rgb(25.5, 136.2, 255);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);\n}\n.file-input-label[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: 0.5rem;\n}\n.file-input[_ngcontent-%COMP%] {\n  display: none;\n}\n.actions-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n  border-top: 1px solid #dfe3e8;\n  padding-top: 1.5rem;\n  margin-top: 2rem;\n}\n.save-button-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 2px;\n  border-radius: 0.75rem;\n  background: transparent;\n  transition: all 0.3s ease;\n  width: 100%;\n}\n@media (min-width: 576px) {\n  .save-button-wrapper[_ngcontent-%COMP%] {\n    width: auto;\n  }\n}\n.save-button-wrapper[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      rgb(143.0357142857, 126.9196428571, 240.5803571429),\n      #7b68ee);\n  color: white;\n  font-weight: 600;\n  border: none;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.2);\n  width: 100%;\n}\n.save-button-wrapper[_ngcontent-%COMP%]:hover:not(:has(:disabled)) {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n  box-shadow: 0 0 20px rgba(123, 104, 238, 0.5);\n}\n.save-button-wrapper[_ngcontent-%COMP%]:hover:not(:has(:disabled))   .btn-primary[_ngcontent-%COMP%] {\n  background-color: #21213b;\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(123, 104, 238, 0.3);\n}\n/*# sourceMappingURL=about-us-management.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AboutUsManagementComponent, [{
    type: Component,
    args: [{ selector: "app-about-us-management", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="container-fluid my-4">
  <div class="card-gradient-wrapper">
    <div class="card list-card shadow-sm">
      <div class="card-body">

        <div class="page-title-container">
          <h2 class="card-title mb-0">Gesti\xF3n de P\xE1gina "Nosotros"</h2>
        </div>

        @if (isLoading) {
          <div class="text-center p-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando datos...</span>
            </div>
          </div>
        } @else {
          <form [formGroup]="aboutUsForm" (ngSubmit)="onSubmit()">

            <div class="card-gradient-wrapper mb-4">
              <div class="card details-sub-card">
                <div class="card-header">
                  <h5 class="card-title mb-0"><i class="bi bi-image me-2"></i>Secci\xF3n 1: Banner Principal</h5>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label for="bannerTitle" class="form-label">T\xEDtulo Principal</label>
                    <input type="text" id="bannerTitle" class="form-control" formControlName="bannerTitle"
                           [class.is-invalid]="aboutUsForm.get('bannerTitle')?.invalid && aboutUsForm.get('bannerTitle')?.touched">
                    <div class="invalid-feedback">El t\xEDtulo del banner es obligatorio.</div>
                  </div>
                  <div class="mb-3">
                    <label for="bannerSubtitle" class="form-label">Subt\xEDtulo (Eslogan)</label>
                    <input type="text" id="bannerSubtitle" class="form-control" formControlName="bannerSubtitle">
                  </div>

                  <div class="mb-3 text-center">
                    <label for="bannerImageUpload" class="form-label">Cambiar Imagen del Banner</label>
                    <div>
                      <label for="bannerImageUpload" class="file-input-label">
                        <i class="bi bi-upload"></i> Seleccionar archivo
                      </label>
                      <input type="file" id="bannerImageUpload" class="file-input" (change)="onFileSelected($event, 'banner')" accept="image/png, image/jpeg, image/webp">
                    </div>
                    <div class="form-text mt-2 text-muted-custom">Sube una nueva imagen para reemplazar la actual.</div>
                  </div>

                  <div class="image-preview-container">
                    @if (bannerPreviewUrl || aboutUsForm.get('bannerImageUrl')?.value) {
                      <p class="form-text text-muted text-center">Vista Previa:</p>
                    }
                    @if (bannerPreviewUrl) {
                      <img [src]="bannerPreviewUrl" alt="Previsualizaci\xF3n del nuevo banner" class="img-fluid rounded">
                    } @else if (aboutUsForm.get('bannerImageUrl')?.value) {
                      <img [src]="aboutUsForm.get('bannerImageUrl')?.value" alt="Banner actual" class="img-fluid rounded">
                    } @else {
                      <p class="no-preview-text">No hay imagen cargada.</p>
                    }
                  </div>

                </div>
              </div>
            </div>

            <div class="card-gradient-wrapper mb-4">
              <div class="card details-sub-card">
                <div class="card-header">
                  <h5 class="card-title mb-0"><i class="bi bi-file-text me-2"></i>Secci\xF3n 2: Contenido Central</h5>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label for="centralTitle" class="form-label">T\xEDtulo de la Secci\xF3n</label>
                    <input type="text" id="centralTitle" class="form-control" formControlName="centralTitle"
                           [class.is-invalid]="aboutUsForm.get('centralTitle')?.invalid && aboutUsForm.get('centralTitle')?.touched">
                    <div class="invalid-feedback">El t\xEDtulo central es obligatorio.</div>
                  </div>

                  <div class="mb-3 text-center">
                    <label for="centralImageUpload" class="form-label">Cambiar Imagen Lateral</label>
                    <div>
                      <label for="centralImageUpload" class="file-input-label">
                        <i class="bi bi-upload"></i> Seleccionar archivo
                      </label>
                      <input type="file" id="centralImageUpload" class="file-input" (change)="onFileSelected($event, 'central')" accept="image/png, image/jpeg, image/webp">
                    </div>
                    <div class="form-text mt-2 text-muted-custom">Sube una nueva imagen para reemplazar la actual.</div>
                  </div>

                  <div class="image-preview-container">
                    @if (centralPreviewUrl || aboutUsForm.get('centralImageUrl')?.value) {
                      <p class="form-text text-muted text-center">Vista Previa:</p>
                    }
                    @if (centralPreviewUrl) {
                      <img [src]="centralPreviewUrl" alt="Previsualizaci\xF3n de imagen lateral" class="img-fluid rounded">
                    } @else if (aboutUsForm.get('centralImageUrl')?.value) {
                      <img [src]="aboutUsForm.get('centralImageUrl')?.value" alt="Imagen lateral actual" class="img-fluid rounded">
                    } @else {
                      <p class="no-preview-text">No hay imagen cargada.</p>
                    }
                  </div>

                  <hr>

                  <div class="mb-3">
                    <label for="centralDescription" class="form-label">P\xE1rrafo de Descripci\xF3n</label>
                    <textarea id="centralDescription" class="form-control" formControlName="centralDescription" rows="6"
                              [class.is-invalid]="aboutUsForm.get('centralDescription')?.invalid && aboutUsForm.get('centralDescription')?.touched"></textarea>
                    <div class="invalid-feedback">
                      @if (aboutUsForm.get('centralDescription')?.errors?.['required']) { <div>La descripci\xF3n es obligatoria.</div> }
                      @if (aboutUsForm.get('centralDescription')?.errors?.['minlength']) { <div>Debe tener al menos 50 caracteres.</div> }
                      @if (aboutUsForm.get('centralDescription')?.errors?.['maxlength']) { <div>No debe exceder los 1000 caracteres.</div> }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-gradient-wrapper mb-4">
              <div class="card details-sub-card">
                <div class="card-header d-flex justify-content-between align-items-center">
                   <h5 class="card-title mb-0"><i class="bi bi-check2-circle me-2"></i>Secci\xF3n 3: Caracter\xEDsticas (1 M\xEDn / 2 M\xE1x)</h5>
                   <button type="button" class="btn btn-outline-secondary btn-sm" (click)="addFeatureCard()" [disabled]="featureCards.length >= 2">
                     <i class="bi bi-plus-lg"></i> A\xF1adir
                   </button>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label for="cardsSectionTitle" class="form-label">T\xEDtulo General de la Secci\xF3n de Cards</label>
                    <input type="text" id="cardsSectionTitle" class="form-control" formControlName="cardsSectionTitle"
                           [class.is-invalid]="aboutUsForm.get('cardsSectionTitle')?.invalid && aboutUsForm.get('cardsSectionTitle')?.touched">
                    <div class="invalid-feedback">Este t\xEDtulo es obligatorio.</div>
                  </div>
                  <hr>
                  <div formArrayName="featureCards">
                    @for (card of featureCards.controls; track $index; let i = $index) {
                      <div [formGroupName]="i" class="featured-category-item mb-3">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <strong>Card {{ i + 1 }}</strong>
                          <button type="button" class="btn btn-sm btn-outline-danger" (click)="removeFeatureCard(i)" title="Eliminar Card" [disabled]="featureCards.length <= 1">
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                        <div class="mb-2">
                          <label [for]="'cardTitle' + i" class="form-label small">T\xEDtulo de la Card</label>
                          <input [id]="'cardTitle' + i" type="text" class="form-control form-control-sm" formControlName="title"
                                 [class.is-invalid]="card.get('title')?.invalid && card.get('title')?.touched">
                          <div class="invalid-feedback">Requerido.</div>
                        </div>
                        <div>
                          <label [for]="'cardContent' + i" class="form-label small">Contenido de la Card</label>
                          <textarea [id]="'cardContent' + i" class="form-control form-control-sm" formControlName="content" rows="3"
                                    [class.is-invalid]="card.get('content')?.invalid && card.get('content')?.touched"></textarea>
                          <div class="invalid-feedback">Requerido.</div>
                        </div>
                      </div>
                    } @empty {
                      <div class="text-center text-muted-custom p-3">
                        No hay cards. Haz clic en "A\xF1adir" para empezar.
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div class="actions-container">
               <div class="save-button-wrapper">
                <button type="submit" class="btn btn-primary btn-lg" [disabled]="isSubmitting || aboutUsForm.invalid || !aboutUsForm.dirty">
                  @if (isSubmitting) {
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  }
                  {{ isSubmitting ? 'Guardando...' : 'Guardar Todos los Cambios' }}
                </button>
              </div>
            </div>

          </form>
        }
      </div>
    </div>
  </div>
</div>
`, styles: ["/* src/app/features/admin/components/about-us-management/about-us-management.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.list-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n  color: #212529;\n}\n.page-title-container {\n  padding-bottom: 0.5rem;\n  text-align: left;\n  margin-bottom: 1.5rem !important;\n}\n.page-title-container .card-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  display: inline-block;\n}\n.details-sub-card {\n  border: none;\n  box-shadow: none;\n  border-radius: 0.75rem;\n  background-color: #ffffff;\n}\n.details-sub-card .card-header {\n  background-color: transparent;\n  border-bottom: 1px solid #dfe3e8;\n}\n.details-sub-card .card-header .card-title {\n  font-size: 1.1rem;\n  color: #343a40;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n.details-sub-card .card-header .card-title i {\n  color: #007bff;\n  font-size: 1.2em;\n}\n.form-label,\n.form-check-label {\n  color: #495057;\n  font-weight: 500;\n}\n.form-control {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.5rem 1rem;\n}\n.form-control:hover {\n  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);\n}\n.form-control:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\n.featured-category-item {\n  border: 1px solid #dfe3e8;\n  background-color: #f8f9fa;\n  border-radius: 0.5rem;\n  padding: 1rem;\n}\n.text-muted-custom {\n  color: #6c757d !important;\n}\n.btn-outline-secondary {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-outline-secondary:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.image-preview-container {\n  position: relative;\n  max-width: 450px;\n  margin: 1.5rem auto;\n  border: 2px dashed #dfe3e8;\n  border-radius: 0.75rem;\n  padding: 1rem;\n  background-color: #f8f9fa;\n  min-height: 150px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.image-preview-container img {\n  height: auto;\n  border-radius: 0.5rem;\n}\n.image-preview-container .no-preview-text {\n  color: #6c757d;\n}\n.file-input-label {\n  cursor: pointer;\n  background-color: #007bff;\n  color: white;\n  padding: 0.6rem 1.2rem;\n  border-radius: 0.5rem;\n  display: inline-flex;\n  align-items: center;\n  transition: all 0.3s ease;\n  font-weight: 500;\n  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);\n}\n.file-input-label:hover {\n  background-color: rgb(25.5, 136.2, 255);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);\n}\n.file-input-label i {\n  margin-right: 0.5rem;\n}\n.file-input {\n  display: none;\n}\n.actions-container {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n  border-top: 1px solid #dfe3e8;\n  padding-top: 1.5rem;\n  margin-top: 2rem;\n}\n.save-button-wrapper {\n  position: relative;\n  padding: 2px;\n  border-radius: 0.75rem;\n  background: transparent;\n  transition: all 0.3s ease;\n  width: 100%;\n}\n@media (min-width: 576px) {\n  .save-button-wrapper {\n    width: auto;\n  }\n}\n.save-button-wrapper .btn-primary {\n  background:\n    linear-gradient(\n      135deg,\n      rgb(143.0357142857, 126.9196428571, 240.5803571429),\n      #7b68ee);\n  color: white;\n  font-weight: 600;\n  border: none;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.2);\n  width: 100%;\n}\n.save-button-wrapper:hover:not(:has(:disabled)) {\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n  box-shadow: 0 0 20px rgba(123, 104, 238, 0.5);\n}\n.save-button-wrapper:hover:not(:has(:disabled)) .btn-primary {\n  background-color: #21213b;\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(123, 104, 238, 0.3);\n}\n/*# sourceMappingURL=about-us-management.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AboutUsManagementComponent, { className: "AboutUsManagementComponent", filePath: "src/app/features/admin/components/about-us-management/about-us-management.component.ts", lineNumber: 16 });
})();
export {
  AboutUsManagementComponent
};
//# sourceMappingURL=chunk-7J6GW7NJ.js.map
