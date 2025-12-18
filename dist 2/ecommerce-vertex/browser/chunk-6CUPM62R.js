import {
  AttributeModalComponent
} from "./chunk-JOWRWNPB.js";
import {
  BsModalService
} from "./chunk-2OBKN7QP.js";
import {
  CategoryService
} from "./chunk-MXEO7R2O.js";
import {
  StorageService
} from "./chunk-EBKKK7PL.js";
import "./chunk-CUH4JQND.js";
import {
  ProductService
} from "./chunk-2ZGQTQTR.js";
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
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-WR4QMUYF.js";
import {
  AttributeService
} from "./chunk-H5HDOTK4.js";
import {
  SweetAlertService
} from "./chunk-5OJQRZGI.js";
import "./chunk-UYVF6V6H.js";
import {
  ActivatedRoute,
  Router,
  RouterModule
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import "./chunk-HMD6QQFJ.js";
import "./chunk-SDXAAYIW.js";
import {
  AsyncPipe,
  BehaviorSubject,
  CommonModule,
  Component,
  NgClass,
  finalize,
  inject,
  setClassMetadata,
  startWith,
  take,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
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
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import {
  __async,
  __objRest
} from "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/products/product-create/product-create.component.ts
var _c0 = (a0) => ({ "is-invalid": a0 });
var _forTrack0 = ($index, $item) => $item.id;
function ProductCreateComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div");
    \u0275\u0275text(2, "El nombre es obligatorio (m\xEDn. 3 caracteres).");
    \u0275\u0275elementEnd()();
  }
}
function ProductCreateComponent_Conditional_24_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El precio es obligatorio.");
    \u0275\u0275elementEnd();
  }
}
function ProductCreateComponent_Conditional_24_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "El precio debe ser mayor a 0.");
    \u0275\u0275elementEnd();
  }
}
function ProductCreateComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275conditionalCreate(1, ProductCreateComponent_Conditional_24_Conditional_1_Template, 2, 0, "div");
    \u0275\u0275conditionalCreate(2, ProductCreateComponent_Conditional_24_Conditional_2_Template, 2, 0, "div");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.price == null ? null : ctx_r0.price.errors == null ? null : ctx_r0.price.errors["required"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.price == null ? null : ctx_r0.price.errors == null ? null : ctx_r0.price.errors["min"]) ? 2 : -1);
  }
}
function ProductCreateComponent_Conditional_31_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    \u0275\u0275property("value", cat_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r2.name);
  }
}
function ProductCreateComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ProductCreateComponent_Conditional_31_For_1_Template, 2, 2, "option", 52, _forTrack0);
  }
  if (rf & 2) {
    \u0275\u0275repeater(ctx);
  }
}
function ProductCreateComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div");
    \u0275\u0275text(2, "Debes seleccionar una categor\xEDa.");
    \u0275\u0275elementEnd()();
  }
}
function ProductCreateComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "div", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r0.uploadProgress, "%");
  }
}
function ProductCreateComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275element(1, "img", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.image == null ? null : ctx_r0.image.value, \u0275\u0275sanitizeUrl);
  }
}
function ProductCreateComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div");
    \u0275\u0275text(2, "La imagen principal es obligatoria.");
    \u0275\u0275elementEnd()();
  }
}
function ProductCreateComponent_For_56_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 56);
  }
  if (rf & 2) {
    const imageControl_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", imageControl_r4.value, \u0275\u0275sanitizeUrl);
  }
}
function ProductCreateComponent_For_56_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275element(1, "i", 63);
    \u0275\u0275elementEnd();
  }
}
function ProductCreateComponent_For_56_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "div", 53);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_128_r5 = \u0275\u0275nextContext().$index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("width", ctx_r0.galleryUploadProgress[\u0275$index_128_r5], "%");
  }
}
function ProductCreateComponent_For_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "div", 55);
    \u0275\u0275conditionalCreate(2, ProductCreateComponent_For_56_Conditional_2_Template, 1, 1, "img", 56)(3, ProductCreateComponent_For_56_Conditional_3_Template, 2, 0, "div", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 58)(5, "input", 59);
    \u0275\u0275listener("change", function ProductCreateComponent_For_56_Template_input_change_5_listener($event) {
      const \u0275$index_128_r5 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onGalleryFileSelected($event, \u0275$index_128_r5));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(6, ProductCreateComponent_For_56_Conditional_6_Template, 2, 2, "div", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 60)(8, "button", 61);
    \u0275\u0275listener("click", function ProductCreateComponent_For_56_Template_button_click_8_listener() {
      const \u0275$index_128_r5 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.removeImage(\u0275$index_128_r5));
    });
    \u0275\u0275element(9, "i", 62);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const imageControl_r4 = ctx.$implicit;
    const \u0275$index_128_r5 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(imageControl_r4.value ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r0.galleryUploadProgress[\u0275$index_128_r5] !== null && ctx_r0.galleryUploadProgress[\u0275$index_128_r5] !== void 0);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.galleryUploadProgress[\u0275$index_128_r5] !== null && ctx_r0.galleryUploadProgress[\u0275$index_128_r5] !== void 0 ? 6 : -1);
  }
}
function ProductCreateComponent_Conditional_67_Conditional_0_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 65)(1, "input", 66);
    \u0275\u0275listener("change", function ProductCreateComponent_Conditional_67_Conditional_0_For_1_Conditional_0_Template_input_change_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const attr_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r0.onAttributeCheckboxChange($event, attr_r7.id));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "label", 67);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const attr_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("id", "attr-" + attr_r7.id)("value", attr_r7.id)("checked", ctx_r0.variantAttributes.value.includes(attr_r7.id));
    \u0275\u0275advance();
    \u0275\u0275property("for", "attr-" + attr_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(attr_r7.name);
  }
}
function ProductCreateComponent_Conditional_67_Conditional_0_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductCreateComponent_Conditional_67_Conditional_0_For_1_Conditional_0_Template, 4, 5, "div", 65);
  }
  if (rf & 2) {
    const attr_r7 = ctx.$implicit;
    \u0275\u0275conditional(attr_r7.id ? 0 : -1);
  }
}
function ProductCreateComponent_Conditional_67_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ProductCreateComponent_Conditional_67_Conditional_0_For_1_Template, 1, 1, null, null, _forTrack0);
  }
  if (rf & 2) {
    const attributes_r8 = \u0275\u0275nextContext();
    \u0275\u0275repeater(attributes_r8);
  }
}
function ProductCreateComponent_Conditional_67_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 64);
    \u0275\u0275text(1, 'No hay atributos creados. Haz clic en "Crear Atributo" para empezar.');
    \u0275\u0275elementEnd();
  }
}
function ProductCreateComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductCreateComponent_Conditional_67_Conditional_0_Template, 2, 0)(1, ProductCreateComponent_Conditional_67_Conditional_1_Template, 2, 0, "p", 64);
  }
  if (rf & 2) {
    \u0275\u0275conditional(ctx.length > 0 ? 0 : 1);
  }
}
function ProductCreateComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 42);
    \u0275\u0275text(1, "Cargando atributos...");
    \u0275\u0275elementEnd();
  }
}
function ProductCreateComponent_Conditional_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45);
    \u0275\u0275text(1, " Debes a\xF1adir al menos una variante y completar todos sus campos. ");
    \u0275\u0275elementEnd();
  }
}
function ProductCreateComponent_For_79_Conditional_2_For_1_Conditional_0_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const val_r10 = ctx.$implicit;
    \u0275\u0275property("value", val_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(val_r10);
  }
}
function ProductCreateComponent_For_79_Conditional_2_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 74)(1, "label", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "select", 75)(4, "option", 22);
    \u0275\u0275text(5, "Seleccionar...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(6, ProductCreateComponent_For_79_Conditional_2_For_1_Conditional_0_For_7_Template, 2, 2, "option", 52, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_26_0;
    const attr_r11 = \u0275\u0275nextContext().$implicit;
    const variantGroup_r12 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(attr_r11.name);
    \u0275\u0275advance();
    \u0275\u0275property("formControlName", attr_r11.id)("ngClass", \u0275\u0275pureFunction1(4, _c0, ((tmp_26_0 = variantGroup_r12.get("attributes." + attr_r11.id)) == null ? null : tmp_26_0.invalid) && ((tmp_26_0 = variantGroup_r12.get("attributes." + attr_r11.id)) == null ? null : tmp_26_0.touched)));
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(attr_r11.values);
  }
}
function ProductCreateComponent_For_79_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductCreateComponent_For_79_Conditional_2_For_1_Conditional_0_Template, 8, 6, "div", 74);
  }
  if (rf & 2) {
    const attr_r11 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(attr_r11.id && ctx_r0.variantAttributes.value.includes(attr_r11.id) ? 0 : -1);
  }
}
function ProductCreateComponent_For_79_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ProductCreateComponent_For_79_Conditional_2_For_1_Template, 1, 1, null, null, _forTrack0);
  }
  if (rf & 2) {
    \u0275\u0275repeater(ctx);
  }
}
function ProductCreateComponent_For_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "div", 68);
    \u0275\u0275conditionalCreate(2, ProductCreateComponent_For_79_Conditional_2_Template, 2, 0);
    \u0275\u0275pipe(3, "async");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 69)(5, "label", 70);
    \u0275\u0275text(6, "Stock");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 72)(9, "button", 73);
    \u0275\u0275listener("click", function ProductCreateComponent_For_79_Template_button_click_9_listener() {
      const \u0275$index_209_r13 = \u0275\u0275restoreView(_r9).$index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.removeVariant(\u0275$index_209_r13));
    });
    \u0275\u0275element(10, "i", 62);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_13_0;
    const variantGroup_r12 = ctx.$implicit;
    const \u0275$index_209_r13 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroupName", \u0275$index_209_r13);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_12_0 = \u0275\u0275pipeBind1(3, 3, ctx_r0.attributes$)) ? 2 : -1, tmp_12_0);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(5, _c0, ((tmp_13_0 = variantGroup_r12.get("stock")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = variantGroup_r12.get("stock")) == null ? null : tmp_13_0.touched)));
  }
}
function ProductCreateComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 51);
  }
}
var ProductCreateComponent = class _ProductCreateComponent {
  fb = inject(FormBuilder);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  attributeService = inject(AttributeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  sweetAlertService = inject(SweetAlertService);
  storageService = inject(StorageService);
  modalService = inject(BsModalService);
  productForm;
  categories$;
  attributesSubject = new BehaviorSubject([]);
  attributes$ = this.attributesSubject.asObservable();
  bsModalRef;
  isSubmitting = false;
  isEditMode = false;
  productId = null;
  pageTitle = "Crear Nuevo Producto";
  uploadProgress = null;
  galleryUploadProgress = {};
  initialVariants = [];
  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    this.loadAttributes();
    this.initializeForm();
    this.checkEditMode();
  }
  loadAttributes() {
    this.attributeService.getAttributes().pipe(take(1)).subscribe((attrs) => {
      this.attributesSubject.next(attrs);
    });
  }
  initializeForm() {
    this.productForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      categoryId: [null, Validators.required],
      image: ["", [Validators.required]],
      images: this.fb.array([]),
      variantAttributes: this.fb.array([], Validators.required),
      variants: this.fb.array([], Validators.required)
    });
    this.onAttributeSelectionChange();
  }
  checkEditMode() {
    this.productId = this.route.snapshot.paramMap.get("id");
    if (this.productId) {
      this.isEditMode = true;
      this.loadProductForEdit(this.productId);
    }
  }
  loadProductForEdit(id) {
    this.productService.getProductWithVariants(id).pipe(take(1)).subscribe({
      next: (data) => {
        if (data) {
          const { product, variants } = data;
          this.initialVariants = variants;
          this.pageTitle = `Editar: ${product.name}`;
          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            categoryId: product.categoryId,
            image: product.image
          });
          product.images?.forEach((img) => this.images.push(this.fb.control(img)));
          product.variantAttributes?.forEach((attrId) => this.variantAttributes.push(this.fb.control(attrId)));
          variants.forEach((variant) => this.addVariant(variant));
        } else {
          this.sweetAlertService.error("Error", "Producto no encontrado.");
          this.router.navigate(["/admin/products"]);
        }
      },
      error: () => {
        this.sweetAlertService.error("Error", "No se pudo cargar el producto.");
        this.router.navigate(["/admin/products"]);
      }
    });
  }
  get name() {
    return this.productForm.get("name");
  }
  get price() {
    return this.productForm.get("price");
  }
  get categoryId() {
    return this.productForm.get("categoryId");
  }
  get image() {
    return this.productForm.get("image");
  }
  get variants() {
    return this.productForm.get("variants");
  }
  get images() {
    return this.productForm.get("images");
  }
  get variantAttributes() {
    return this.productForm.get("variantAttributes");
  }
  onAttributeSelectionChange() {
    this.attributes$.pipe(take(1)).subscribe((allAttributes) => {
      this.variantAttributes.valueChanges.pipe(startWith(this.variantAttributes.value)).subscribe((selectedIds) => {
        this.variants.controls.forEach((control) => {
          const attributesGroup = control.get("attributes");
          const currentAttributeIds = Object.keys(attributesGroup.controls);
          const idsToRemove = currentAttributeIds.filter((id) => !selectedIds.includes(id));
          idsToRemove.forEach((id) => attributesGroup.removeControl(id));
          const idsToAdd = selectedIds.filter((id) => !currentAttributeIds.includes(id));
          idsToAdd.forEach((id) => {
            attributesGroup.addControl(id, this.fb.control(null, Validators.required));
          });
        });
      });
    });
  }
  onAttributeCheckboxChange(event, attrId) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.variantAttributes.push(this.fb.control(attrId));
    } else {
      const index = this.variantAttributes.value.indexOf(attrId);
      if (index > -1) {
        this.variantAttributes.removeAt(index);
      }
    }
  }
  openAttributeModal() {
    this.bsModalRef = this.modalService.show(AttributeModalComponent, {
      class: "modal-lg modal-dialog-centered"
    });
    this.bsModalRef.content.onClose.subscribe((result) => {
      if (result) {
        this.attributeService.addAttribute(result).then(() => {
          this.sweetAlertService.success("\xA1\xC9xito!", "Atributo creado.");
          this.loadAttributes();
        }).catch((err) => this.sweetAlertService.error("Error", "No se pudo crear el atributo."));
      }
    });
  }
  createVariantGroup(variant) {
    const group = this.fb.group({
      id: [variant?.id || null],
      attributes: this.fb.group({}),
      stock: [variant?.stock || 0, [Validators.required, Validators.min(0)]]
    });
    const attributesGroup = group.get("attributes");
    const selectedIds = this.variantAttributes.value;
    selectedIds.forEach((id) => {
      attributesGroup.addControl(id, this.fb.control(variant?.attributes[id] || null, Validators.required));
    });
    return group;
  }
  addVariant(variant) {
    this.variants.push(this.createVariantGroup(variant));
  }
  removeVariant(index) {
    this.variants.removeAt(index);
  }
  addImage(imageUrl = "") {
    this.images.push(this.fb.control(imageUrl, [Validators.pattern("https?://.+")]));
  }
  removeImage(index) {
    this.images.removeAt(index);
  }
  onFileSelected(event) {
    const file = event.target.files?.[0];
    if (!file)
      return;
    this.uploadProgress = 0;
    const { progress$, downloadUrl$ } = this.storageService.uploadFile(file, "products/images");
    progress$.subscribe((progress) => this.uploadProgress = progress);
    downloadUrl$.pipe(finalize(() => this.uploadProgress = null)).subscribe((url) => {
      this.productForm.get("image")?.setValue(url);
    });
  }
  onGalleryFileSelected(event, index) {
    const file = event.target.files?.[0];
    const control = this.images.at(index);
    if (!file || !control)
      return;
    this.galleryUploadProgress[index] = 0;
    const { progress$, downloadUrl$ } = this.storageService.uploadFile(file, "products/gallery");
    progress$.subscribe((progress) => this.galleryUploadProgress[index] = progress);
    downloadUrl$.pipe(finalize(() => this.galleryUploadProgress[index] = null)).subscribe((url) => {
      control.setValue(url);
    });
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.productForm.invalid) {
        this.productForm.markAllAsTouched();
        this.sweetAlertService.error("Formulario Inv\xE1lido", "Revisa todos los campos.");
        return;
      }
      this.isSubmitting = true;
      const formValue = this.productForm.value;
      const productData = {
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        categoryId: formValue.categoryId,
        image: formValue.image,
        images: formValue.images || [],
        variantAttributes: formValue.variantAttributes || [],
        createdAt: /* @__PURE__ */ new Date(),
        totalStock: 0,
        inStockAttributes: {}
      };
      try {
        if (this.isEditMode && this.productId) {
          const productUpdateData = {
            name: formValue.name,
            description: formValue.description,
            price: formValue.price,
            categoryId: formValue.categoryId,
            image: formValue.image,
            images: formValue.images,
            variantAttributes: formValue.variantAttributes
          };
          const variantsToUpdate = [];
          const variantsToAdd = [];
          const variantIdsToDelete = [];
          const currentVariantIds = /* @__PURE__ */ new Set();
          formValue.variants.forEach((variant) => {
            if (variant.id) {
              const _a = variant, { price } = _a, rest = __objRest(_a, ["price"]);
              variantsToUpdate.push(rest);
              currentVariantIds.add(variant.id);
            } else {
              const _b = variant, { id, price } = _b, newVariantData = __objRest(_b, ["id", "price"]);
              variantsToAdd.push(newVariantData);
            }
          });
          this.initialVariants.forEach((initialVariant) => {
            if (!currentVariantIds.has(initialVariant.id)) {
              variantIdsToDelete.push(initialVariant.id);
            }
          });
          yield this.productService.updateProductWithVariants(this.productId, productUpdateData, variantsToUpdate, variantsToAdd, variantIdsToDelete);
          this.sweetAlertService.success("\xA1\xC9xito!", "Producto actualizado.");
          this.router.navigate(["/admin/products/detail", this.productId]);
        } else {
          const variantsData = formValue.variants.map((v) => ({
            attributes: v.attributes,
            stock: v.stock
          }));
          const newProductId = yield this.productService.createProductWithVariants(productData, variantsData);
          this.sweetAlertService.success("\xA1\xC9xito!", "Producto creado.");
          this.router.navigate(["/admin/products/detail", newProductId]);
        }
      } catch (error) {
        console.error("Error submitting product:", error);
        this.sweetAlertService.error("Error", "No se pudo guardar el producto.");
      } finally {
        this.isSubmitting = false;
      }
    });
  }
  onCancel() {
    if (this.isEditMode && this.productId) {
      this.router.navigate(["/admin/products/detail", this.productId]);
    } else {
      this.router.navigate(["/admin/products"]);
    }
  }
  static \u0275fac = function ProductCreateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductCreateComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductCreateComponent, selectors: [["app-product-create"]], decls: 86, vars: 33, consts: [[1, "container", "my-5"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-4"], [1, "mb-0", "page-title"], [1, "btn", "btn-outline-secondary", 3, "click"], [1, "bi", "bi-arrow-left"], [1, "card-gradient-wrapper"], [1, "card", "form-card"], [1, "card-body"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "row", "mb-3"], [1, "col-md-6"], ["for", "name", 1, "form-label"], ["type", "text", "id", "name", "formControlName", "name", 1, "form-control", 3, "ngClass"], [1, "invalid-feedback"], ["for", "price", 1, "form-label"], [1, "input-group"], [1, "input-group-text"], ["type", "number", "id", "price", "formControlName", "price", 1, "form-control", 3, "ngClass"], [1, "invalid-feedback", "d-block"], [1, "mb-3"], ["for", "categoryId", 1, "form-label"], ["id", "categoryId", "formControlName", "categoryId", 1, "form-select", 3, "ngClass"], ["disabled", "", 3, "ngValue"], ["for", "description", 1, "form-label"], ["id", "description", "formControlName", "description", "rows", "4", 1, "form-control"], [1, "my-4"], [1, "section-title"], ["for", "image", 1, "form-label"], ["type", "file", "id", "image", "accept", "image/*", 1, "form-control", 3, "change", "ngClass"], [1, "progress", "mt-2", 2, "height", "10px"], [1, "image-preview-main", "mt-2"], ["formArrayName", "images"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-2"], [1, "form-label", "mb-0"], ["type", "button", 1, "btn", "btn-outline-success", "btn-sm", 3, "click"], [1, "bi", "bi-plus-lg"], [1, "gallery-item-row"], [1, "d-flex", "justify-content-between", "align-items-center", "mb-3"], [1, "section-title", "mb-0"], ["type", "button", 1, "btn", "btn-outline-primary", "btn-sm", 3, "click"], ["formArrayName", "variantAttributes", 1, "mb-3", "p-3", "bg-light", "border", "rounded"], [1, "form-label", "d-block"], [1, "text-muted", "small"], ["type", "button", 1, "btn", "btn-success", 3, "click", "disabled"], [1, "bi", "bi-plus-lg", "me-2"], [1, "alert", "alert-danger", "text-center"], ["formArrayName", "variants"], [1, "variant-row", 3, "formGroupName"], [1, "d-flex", "justify-content-end", "mt-4"], ["type", "button", 1, "btn", "btn-secondary", "me-2", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm", "me-2"], [3, "value"], ["role", "progressbar", 1, "progress-bar"], ["alt", "Vista previa", 3, "src"], [1, "gallery-preview"], ["alt", "Vista previa de galer\xEDa", 3, "src"], [1, "gallery-placeholder"], [1, "gallery-input"], ["type", "file", "accept", "image/*", 1, "form-control", 3, "change", "disabled"], [1, "gallery-action"], ["type", "button", "title", "Eliminar imagen", 1, "btn", "btn-outline-danger", 3, "click"], [1, "bi", "bi-trash"], [1, "bi", "bi-image"], [1, "text-muted", "small", "mb-0"], [1, "form-check", "form-check-inline"], ["type", "checkbox", 1, "form-check-input", 3, "change", "id", "value", "checked"], [1, "form-check-label", 3, "for"], ["formGroupName", "attributes", 1, "variant-attributes-container"], [1, "variant-stock-item"], [1, "form-label", "small"], ["type", "number", "formControlName", "stock", "placeholder", "Stock", 1, "form-control", "form-control-sm", 3, "ngClass"], [1, "variant-action-item"], ["type", "button", "title", "Eliminar Variante", 1, "btn", "btn-danger", "btn-sm", 3, "click"], [1, "variant-attribute-item"], [1, "form-select", "form-select-sm", 3, "formControlName", "ngClass"]], template: function ProductCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "button", 3);
      \u0275\u0275listener("click", function ProductCreateComponent_Template_button_click_4_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275element(5, "i", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5)(8, "div", 6)(9, "div", 7)(10, "form", 8);
      \u0275\u0275listener("ngSubmit", function ProductCreateComponent_Template_form_ngSubmit_10_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(11, "div", 9)(12, "div", 10)(13, "label", 11);
      \u0275\u0275text(14, "Nombre del Producto");
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "input", 12);
      \u0275\u0275conditionalCreate(16, ProductCreateComponent_Conditional_16_Template, 3, 0, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 10)(18, "label", 14);
      \u0275\u0275text(19, "Precio Base (Requerido)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 15)(21, "span", 16);
      \u0275\u0275text(22, "$");
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "input", 17);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(24, ProductCreateComponent_Conditional_24_Template, 3, 2, "div", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 19)(26, "label", 20);
      \u0275\u0275text(27, "Categor\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "select", 21)(29, "option", 22);
      \u0275\u0275text(30, "Selecciona una categor\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(31, ProductCreateComponent_Conditional_31_Template, 2, 0);
      \u0275\u0275pipe(32, "async");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(33, ProductCreateComponent_Conditional_33_Template, 3, 0, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div", 19)(35, "label", 23);
      \u0275\u0275text(36, "Descripci\xF3n");
      \u0275\u0275elementEnd();
      \u0275\u0275element(37, "textarea", 24);
      \u0275\u0275elementEnd();
      \u0275\u0275element(38, "hr", 25);
      \u0275\u0275elementStart(39, "h5", 26);
      \u0275\u0275text(40, "Im\xE1genes del Producto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "div", 19)(42, "label", 27);
      \u0275\u0275text(43, "Imagen Principal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "input", 28);
      \u0275\u0275listener("change", function ProductCreateComponent_Template_input_change_44_listener($event) {
        return ctx.onFileSelected($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(45, ProductCreateComponent_Conditional_45_Template, 2, 2, "div", 29);
      \u0275\u0275conditionalCreate(46, ProductCreateComponent_Conditional_46_Template, 2, 1, "div", 30);
      \u0275\u0275conditionalCreate(47, ProductCreateComponent_Conditional_47_Template, 3, 0, "div", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 31)(49, "div", 32)(50, "label", 33);
      \u0275\u0275text(51, "Galer\xEDa de Im\xE1genes Adicionales");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "button", 34);
      \u0275\u0275listener("click", function ProductCreateComponent_Template_button_click_52_listener() {
        return ctx.addImage();
      });
      \u0275\u0275element(53, "i", 35);
      \u0275\u0275text(54, " A\xF1adir otra imagen ");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(55, ProductCreateComponent_For_56_Template, 10, 3, "div", 36, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275element(57, "hr", 25);
      \u0275\u0275elementStart(58, "div", 37)(59, "h5", 38);
      \u0275\u0275text(60, "Atributos de Variantes");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "button", 39);
      \u0275\u0275listener("click", function ProductCreateComponent_Template_button_click_61_listener() {
        return ctx.openAttributeModal();
      });
      \u0275\u0275element(62, "i", 35);
      \u0275\u0275text(63, " Crear Atributo ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div", 40)(65, "label", 41);
      \u0275\u0275text(66, "Selecciona los atributos que definen este producto:");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(67, ProductCreateComponent_Conditional_67_Template, 2, 1);
      \u0275\u0275pipe(68, "async");
      \u0275\u0275conditionalBranchCreate(69, ProductCreateComponent_Conditional_69_Template, 2, 0, "p", 42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "div", 37)(71, "h5", 38);
      \u0275\u0275text(72, "Variantes y Stock");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "button", 43);
      \u0275\u0275listener("click", function ProductCreateComponent_Template_button_click_73_listener() {
        return ctx.addVariant();
      });
      \u0275\u0275element(74, "i", 44);
      \u0275\u0275text(75, "A\xF1adir Variante ");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(76, ProductCreateComponent_Conditional_76_Template, 2, 0, "div", 45);
      \u0275\u0275elementStart(77, "div", 46);
      \u0275\u0275repeaterCreate(78, ProductCreateComponent_For_79_Template, 11, 7, "div", 47, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "div", 48)(81, "button", 49);
      \u0275\u0275listener("click", function ProductCreateComponent_Template_button_click_81_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(82, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "button", 50);
      \u0275\u0275conditionalCreate(84, ProductCreateComponent_Conditional_84_Template, 1, 0, "span", 51);
      \u0275\u0275text(85);
      \u0275\u0275elementEnd()()()()()()();
    }
    if (rf & 2) {
      let tmp_9_0;
      let tmp_16_0;
      let tmp_18_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.pageTitle);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.isEditMode ? "Volver al Detalle" : "Volver a la Lista", " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("formGroup", ctx.productForm);
      \u0275\u0275advance(5);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(25, _c0, (ctx.name == null ? null : ctx.name.invalid) && ((ctx.name == null ? null : ctx.name.dirty) || (ctx.name == null ? null : ctx.name.touched))));
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.name == null ? null : ctx.name.invalid) && ((ctx.name == null ? null : ctx.name.dirty) || (ctx.name == null ? null : ctx.name.touched)) ? 16 : -1);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(27, _c0, (ctx.price == null ? null : ctx.price.invalid) && ((ctx.price == null ? null : ctx.price.dirty) || (ctx.price == null ? null : ctx.price.touched))));
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.price == null ? null : ctx.price.invalid) && ((ctx.price == null ? null : ctx.price.dirty) || (ctx.price == null ? null : ctx.price.touched)) ? 24 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(29, _c0, (ctx.categoryId == null ? null : ctx.categoryId.invalid) && ((ctx.categoryId == null ? null : ctx.categoryId.dirty) || (ctx.categoryId == null ? null : ctx.categoryId.touched))));
      \u0275\u0275advance();
      \u0275\u0275property("ngValue", null);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_9_0 = \u0275\u0275pipeBind1(32, 21, ctx.categories$)) ? 31 : -1, tmp_9_0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((ctx.categoryId == null ? null : ctx.categoryId.invalid) && ((ctx.categoryId == null ? null : ctx.categoryId.dirty) || (ctx.categoryId == null ? null : ctx.categoryId.touched)) ? 33 : -1);
      \u0275\u0275advance(11);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(31, _c0, (ctx.image == null ? null : ctx.image.invalid) && ((ctx.image == null ? null : ctx.image.dirty) || (ctx.image == null ? null : ctx.image.touched))));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.uploadProgress !== null ? 45 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.image == null ? null : ctx.image.value) ? 46 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional((ctx.image == null ? null : ctx.image.invalid) && ((ctx.image == null ? null : ctx.image.dirty) || (ctx.image == null ? null : ctx.image.touched)) ? 47 : -1);
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.images.controls);
      \u0275\u0275advance(12);
      \u0275\u0275conditional((tmp_16_0 = \u0275\u0275pipeBind1(68, 23, ctx.attributes$)) ? 67 : 69, tmp_16_0);
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", ctx.variantAttributes.length === 0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(((tmp_18_0 = ctx.productForm.get("variants")) == null ? null : tmp_18_0.touched) && ((tmp_18_0 = ctx.productForm.get("variants")) == null ? null : tmp_18_0.invalid) ? 76 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.variants.controls);
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.productForm.invalid || ctx.isSubmitting);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isSubmitting ? 84 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.isSubmitting ? "Guardando..." : ctx.isEditMode ? "Actualizar Producto" : "Crear Producto", " ");
    }
  }, dependencies: [CommonModule, NgClass, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, FormGroupName, FormArrayName, RouterModule, AsyncPipe], styles: ['\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.form-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.form-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .form-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 2.5rem;\n  }\n}\n.page-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.section-title[_ngcontent-%COMP%] {\n  color: #007bff;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%], \n.input-group-text[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.65rem 1rem;\n}\n.form-control[_ngcontent-%COMP%]:hover:not(:disabled), \n.form-select[_ngcontent-%COMP%]:hover:not(:disabled), \n.input-group-text[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);\n}\n.form-control[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus, \n.input-group-text[_ngcontent-%COMP%]:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\n.input-group[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\n  border-left: 0;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.input-group[_ngcontent-%COMP%]   .input-group-text[_ngcontent-%COMP%] {\n  border-right: 0;\n  background-color: #e9ecef;\n}\n.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545 !important;\n}\n.is-invalid[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n.form-select.is-invalid[_ngcontent-%COMP%] {\n  border-color: #dc3545 !important;\n}\n.form-select.is-invalid[_ngcontent-%COMP%]:focus {\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n.invalid-feedback[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 500;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  border: none;\n  color: white;\n  font-weight: 600;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 15px rgba(123, 104, 238, 0.3);\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: 2px solid #dc3545;\n  color: #dc3545;\n  font-weight: 600;\n  padding: calc(0.75rem - 2px) calc(1.5rem - 2px);\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);\n}\n.btn-outline-secondary[_ngcontent-%COMP%] {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-outline-secondary[_ngcontent-%COMP%]:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.btn-outline-primary[_ngcontent-%COMP%] {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-outline-primary[_ngcontent-%COMP%]:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.image-preview-main[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 250px;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  background-color: #e9ecef;\n}\n.image-preview-main[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: auto;\n  display: block;\n  object-fit: cover;\n}\n.gallery-item-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.75rem;\n  margin-bottom: 0.75rem;\n  background-color: #ffffff;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: box-shadow 0.2s ease-in-out;\n}\n.gallery-item-row[_ngcontent-%COMP%]:focus-within, \n.gallery-item-row[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.2);\n}\n.gallery-preview[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 70px;\n  height: 70px;\n  border-radius: 0.5rem;\n  overflow: hidden;\n  background-color: #e9ecef;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.gallery-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.gallery-preview[_ngcontent-%COMP%]   .gallery-placeholder[_ngcontent-%COMP%] {\n  color: #adb5bd;\n  font-size: 1.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n.gallery-input[_ngcontent-%COMP%] {\n  flex-grow: 1;\n}\n.gallery-input[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%] {\n  height: 8px;\n  margin-top: 0.5rem;\n  border-radius: 4px;\n}\n.gallery-input[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n}\n.gallery-action[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.btn-danger[_ngcontent-%COMP%] {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n  font-weight: 600;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: rgb(210.9493670886, 36.5506329114, 53.2594936709);\n  border-color: rgb(210.9493670886, 36.5506329114, 53.2594936709);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);\n}\n.btn-outline-danger[_ngcontent-%COMP%] {\n  border: 2px solid #dc3545;\n  color: #dc3545;\n  background-color: transparent;\n  font-weight: 600;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-outline-danger[_ngcontent-%COMP%]:hover {\n  background-color: #dc3545;\n  color: white;\n  transform: translateY(-2px);\n}\n.btn-success[_ngcontent-%COMP%] {\n  background-color: #28a745;\n  border-color: #28a745;\n  color: white;\n  font-weight: 600;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-success[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background-color: rgb(35.0724637681, 146.4275362319, 60.5);\n  border-color: rgb(35.0724637681, 146.4275362319, 60.5);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.2);\n}\n.btn-outline-success[_ngcontent-%COMP%] {\n  border: 2px solid #28a745;\n  color: #28a745;\n  background-color: transparent;\n  font-weight: 600;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-outline-success[_ngcontent-%COMP%]:hover {\n  background-color: #28a745;\n  color: white;\n  transform: translateY(-2px);\n}\n.btn-outline-success.btn-sm[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n.variant-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  grid-template-areas: "attributes stock action";\n  gap: 1rem;\n  align-items: start;\n  padding: 1rem;\n  margin-bottom: 0.75rem;\n  border-radius: 0.75rem;\n  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;\n  border: 1px solid #dfe3e8;\n  background-color: #ffffff;\n}\n.variant-row[_ngcontent-%COMP%]:hover {\n  background-color: #f8f9fa;\n}\n.variant-row.ng-invalid.ng-touched[_ngcontent-%COMP%] {\n  background-color: rgba(220, 53, 69, 0.05);\n  border-color: rgba(220, 53, 69, 0.2);\n}\n.variant-attributes-container[_ngcontent-%COMP%] {\n  grid-area: attributes;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n.variant-attribute-item[_ngcontent-%COMP%] {\n  min-width: 120px;\n}\n.variant-stock-item[_ngcontent-%COMP%] {\n  grid-area: stock;\n  width: 100px;\n}\n.variant-action-item[_ngcontent-%COMP%] {\n  grid-area: action;\n  padding-top: 1.75rem;\n}\n.variant-action-item[_ngcontent-%COMP%]   .btn-danger[_ngcontent-%COMP%] {\n  padding: 0.65rem 1rem;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  background-color: #7b68ee;\n}\n@media (max-width: 768px) {\n  .form-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .gallery-item-row[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 0.5rem;\n  }\n  .gallery-item-row[_ngcontent-%COMP%]   .gallery-preview[_ngcontent-%COMP%] {\n    width: 60px;\n    height: 60px;\n    order: 1;\n  }\n  .gallery-item-row[_ngcontent-%COMP%]   .gallery-action[_ngcontent-%COMP%] {\n    order: 1;\n    margin-left: auto;\n  }\n  .gallery-item-row[_ngcontent-%COMP%]   .gallery-input[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n    order: 2;\n  }\n  .variant-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    grid-template-areas: "attributes attributes" "stock      action";\n    align-items: end;\n  }\n  .variant-row[_ngcontent-%COMP%]   .variant-attributes-container[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .variant-row[_ngcontent-%COMP%]   .variant-stock-item[_ngcontent-%COMP%] {\n    width: auto;\n  }\n  .variant-row[_ngcontent-%COMP%]   .variant-action-item[_ngcontent-%COMP%] {\n    padding-top: 0;\n  }\n}\n@media (max-width: 576px) {\n  .container[_ngcontent-%COMP%]    > .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start !important;\n    gap: 1rem;\n  }\n  div[formArrayName=images][_ngcontent-%COMP%]    > .d-flex.justify-content-between[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n    gap: 0.75rem;\n  }\n  form[_ngcontent-%COMP%]    > .d-flex.justify-content-end[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n    gap: 0.75rem;\n  }\n  form[_ngcontent-%COMP%]    > .d-flex.justify-content-end[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .d-flex.justify-content-between[_ngcontent-%COMP%]   .btn-success[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .variant-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    grid-template-areas: "attributes" "stock" "action";\n    align-items: stretch;\n  }\n  .variant-row[_ngcontent-%COMP%]   .variant-attributes-container[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .variant-row[_ngcontent-%COMP%]   .variant-action-item[_ngcontent-%COMP%] {\n    padding-top: 0;\n  }\n  .variant-row[_ngcontent-%COMP%]   .variant-action-item[_ngcontent-%COMP%]   .btn-danger[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=product-create.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductCreateComponent, [{
    type: Component,
    args: [{ selector: "app-product-create", standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterModule], template: `<div class="container my-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="mb-0 page-title">{{ pageTitle }}</h2>
    <button class="btn btn-outline-secondary" (click)="onCancel()">
      <i class="bi bi-arrow-left"></i>
      {{ isEditMode ? 'Volver al Detalle' : 'Volver a la Lista' }}
    </button>
  </div>

  <div class="card-gradient-wrapper">
    <div class="card form-card">
      <div class="card-body">
        <form [formGroup]="productForm" (ngSubmit)="onSubmit()" novalidate>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="name" class="form-label">Nombre del Producto</label>
              <input type="text" id="name" class="form-control" formControlName="name"
                [ngClass]="{ 'is-invalid': name?.invalid && (name?.dirty || name?.touched) }">
              @if (name?.invalid && (name?.dirty || name?.touched)) {
                <div class="invalid-feedback">
                  <div>El nombre es obligatorio (m\xEDn. 3 caracteres).</div>
                </div>
              }
            </div>
            <div class="col-md-6">
              <label for="price" class="form-label">Precio Base (Requerido)</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input type="number" id="price" class="form-control" formControlName="price"
                  [ngClass]="{ 'is-invalid': price?.invalid && (price?.dirty || price?.touched) }">
              </div>
              @if (price?.invalid && (price?.dirty || price?.touched)) {
                <div class="invalid-feedback d-block">
                  @if (price?.errors?.['required']) {
                    <div>El precio es obligatorio.</div>
                  }
                  @if (price?.errors?.['min']) {
                    <div>El precio debe ser mayor a 0.</div>
                  }
                </div>
              }
            </div>
          </div>

          <div class="mb-3">
            <label for="categoryId" class="form-label">Categor\xEDa</label>
            <select id="categoryId" class="form-select" formControlName="categoryId"
              [ngClass]="{ 'is-invalid': categoryId?.invalid && (categoryId?.dirty || categoryId?.touched) }">
              <option [ngValue]="null" disabled>Selecciona una categor\xEDa</option>
              @if (categories$ | async; as categories) {
                @for (cat of categories; track cat.id) {
                  <option [value]="cat.id">{{ cat.name }}</option>
                }
              }
            </select>
            @if (categoryId?.invalid && (categoryId?.dirty || categoryId?.touched)) {
              <div class="invalid-feedback">
                <div>Debes seleccionar una categor\xEDa.</div>
              </div>
            }
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Descripci\xF3n</label>
            <textarea id="description" class="form-control" formControlName="description" rows="4"></textarea>
          </div>

          <hr class="my-4">
          <h5 class="section-title">Im\xE1genes del Producto</h5>

          <div class="mb-3">
            <label for="image" class="form-label">Imagen Principal</label>
            <input type="file" id="image" class="form-control" (change)="onFileSelected($event)" accept="image/*"
              [ngClass]="{ 'is-invalid': image?.invalid && (image?.dirty || image?.touched) }">
            @if (uploadProgress !== null) {
              <div class="progress mt-2" style="height: 10px;">
                <div class="progress-bar" role="progressbar" [style.width.%]="uploadProgress"></div>
              </div>
            }
            @if (image?.value) {
              <div class="image-preview-main mt-2">
                <img [src]="image?.value" alt="Vista previa">
              </div>
            }
            @if (image?.invalid && (image?.dirty || image?.touched)) {
              <div class="invalid-feedback">
                <div>La imagen principal es obligatoria.</div>
              </div>
            }
          </div>

          <div formArrayName="images">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <label class="form-label mb-0">Galer\xEDa de Im\xE1genes Adicionales</label>
              <button (click)="addImage()" type="button" class="btn btn-outline-success btn-sm">
                <i class="bi bi-plus-lg"></i> A\xF1adir otra imagen
              </button>
            </div>
            @for (imageControl of images.controls; track i; let i = $index) {
              <div class="gallery-item-row">
                <div class="gallery-preview">
                  @if (imageControl.value) {
                    <img [src]="imageControl.value" alt="Vista previa de galer\xEDa">
                  } @else {
                    <div class="gallery-placeholder">
                      <i class="bi bi-image"></i>
                    </div>
                  }
                </div>
                <div class="gallery-input">
                  <input type="file" class="form-control" (change)="onGalleryFileSelected($event, i)" accept="image/*"
                    [disabled]="galleryUploadProgress[i] !== null && galleryUploadProgress[i] !== undefined">
                  @if (galleryUploadProgress[i] !== null && galleryUploadProgress[i] !== undefined) {
                    <div class="progress mt-2" style="height: 10px;">
                      <div class="progress-bar" role="progressbar" [style.width.%]="galleryUploadProgress[i]"></div>
                    </div>
                  }
                </div>
                <div class="gallery-action">
                  <button (click)="removeImage(i)" type="button" class="btn btn-outline-danger" title="Eliminar imagen">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            }
          </div>

          <hr class="my-4">

          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="section-title mb-0">Atributos de Variantes</h5>
            <button (click)="openAttributeModal()" type="button" class="btn btn-outline-primary btn-sm">
              <i class="bi bi-plus-lg"></i> Crear Atributo
            </button>
          </div>
          
          <div class="mb-3 p-3 bg-light border rounded" formArrayName="variantAttributes">
            <label class="form-label d-block">Selecciona los atributos que definen este producto:</label>
            @if(attributes$ | async; as attributes) {
              @if (attributes.length > 0) {
                @for (attr of attributes; track attr.id) {
                  @if (attr.id) {
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" [id]="'attr-' + attr.id" [value]="attr.id"
                        (change)="onAttributeCheckboxChange($event, attr.id!)"
                        [checked]="variantAttributes.value.includes(attr.id)">
                      <label class="form-check-label" [for]="'attr-' + attr.id">{{ attr.name }}</label>
                    </div>
                  }
                }
              } @else {
                <p class="text-muted small mb-0">No hay atributos creados. Haz clic en "Crear Atributo" para empezar.</p>
              }
            } @else {
              <p class="text-muted small">Cargando atributos...</p>
            }
          </div>

          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="section-title mb-0">Variantes y Stock</h5>
            <button (click)="addVariant()" type="button" class="btn btn-success" [disabled]="variantAttributes.length === 0">
              <i class="bi bi-plus-lg me-2"></i>A\xF1adir Variante
            </button>
          </div>

          @if (productForm.get('variants')?.touched && productForm.get('variants')?.invalid) {
            <div class="alert alert-danger text-center">
              Debes a\xF1adir al menos una variante y completar todos sus campos.
            </div>
          }
          
          <div formArrayName="variants">
            @for (variantGroup of variants.controls; track i; let i = $index) {
              <div [formGroupName]="i" class="variant-row">
                
                <div class="variant-attributes-container" formGroupName="attributes">
                  @if(attributes$ | async; as attributes) {
                    @for (attr of attributes; track attr.id) {
                      @if (attr.id && variantAttributes.value.includes(attr.id)) {
                        <div class="variant-attribute-item">
                          <label class="form-label small">{{ attr.name }}</label>
                          <select class="form-select form-select-sm" [formControlName]="attr.id"
                            [ngClass]="{ 'is-invalid': variantGroup.get('attributes.' + attr.id)?.invalid && variantGroup.get('attributes.' + attr.id)?.touched }">
                            <option [ngValue]="null" disabled>Seleccionar...</option>
                            @for (val of attr.values; track val) {
                              <option [value]="val">{{ val }}</option>
                            }
                          </select>
                        </div>
                      }
                    }
                  }
                </div>

                <div class="variant-stock-item">
                  <label class="form-label small">Stock</label>
                  <input type="number" class="form-control form-control-sm" formControlName="stock" placeholder="Stock"
                    [ngClass]="{ 'is-invalid': variantGroup.get('stock')?.invalid && variantGroup.get('stock')?.touched }">
                </div>
                
                <div class="variant-action-item">
                  <button (click)="removeVariant(i)" type="button" class="btn btn-danger btn-sm" title="Eliminar Variante">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            }
          </div>

          <div class="d-flex justify-content-end mt-4">
            <button type="button" class="btn btn-secondary me-2" (click)="onCancel()">Cancelar</button>
            <button type="submit" class="btn btn-primary" [disabled]="productForm.invalid || isSubmitting">
              @if (isSubmitting) {
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              }
              {{ isSubmitting ? 'Guardando...' : (isEditMode ? 'Actualizar Producto' : 'Crear Producto') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>`, styles: ['/* src/app/features/admin/components/products/product-create/product-create.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.form-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.form-card .card-body {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .form-card .card-body {\n    padding: 2.5rem;\n  }\n}\n.page-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.section-title {\n  color: #007bff;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n}\n.form-label {\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.form-control,\n.form-select,\n.input-group-text {\n  background-color: #ffffff;\n  color: #1c2a42;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n  padding: 0.65rem 1rem;\n}\n.form-control:hover:not(:disabled),\n.form-select:hover:not(:disabled),\n.input-group-text:hover:not(:disabled) {\n  border-color: rgb(186.3847547974, 177.3339285714, 241.1660714286);\n}\n.form-control:focus,\n.form-select:focus,\n.input-group-text:focus {\n  border-color: #007bff;\n  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);\n}\n.input-group .form-control {\n  border-left: 0;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.input-group .input-group-text {\n  border-right: 0;\n  background-color: #e9ecef;\n}\n.is-invalid {\n  border-color: #dc3545 !important;\n}\n.is-invalid:focus {\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n.form-select.is-invalid {\n  border-color: #dc3545 !important;\n}\n.form-select.is-invalid:focus {\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n.invalid-feedback {\n  display: block;\n  font-weight: 500;\n}\n.btn-primary {\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  border: none;\n  color: white;\n  font-weight: 600;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-primary:hover:not(:disabled) {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 15px rgba(123, 104, 238, 0.3);\n}\n.btn-primary:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-secondary {\n  background-color: transparent;\n  border: 2px solid #dc3545;\n  color: #dc3545;\n  font-weight: 600;\n  padding: calc(0.75rem - 2px) calc(1.5rem - 2px);\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-secondary:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);\n}\n.btn-outline-secondary {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-outline-secondary:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.btn-outline-primary {\n  border: 2px solid #007bff;\n  color: #007bff;\n  background-color: transparent;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.btn-outline-primary:hover {\n  color: white;\n  border-color: transparent;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 4s ease infinite;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(123, 104, 238, 0.3);\n}\n.image-preview-main {\n  width: 100%;\n  max-width: 250px;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  overflow: hidden;\n  background-color: #e9ecef;\n}\n.image-preview-main img {\n  width: 100%;\n  height: auto;\n  display: block;\n  object-fit: cover;\n}\n.gallery-item-row {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.75rem;\n  margin-bottom: 0.75rem;\n  background-color: #ffffff;\n  border: 1px solid #dfe3e8;\n  border-radius: 0.75rem;\n  transition: box-shadow 0.2s ease-in-out;\n}\n.gallery-item-row:focus-within,\n.gallery-item-row:hover {\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.2);\n}\n.gallery-preview {\n  flex-shrink: 0;\n  width: 70px;\n  height: 70px;\n  border-radius: 0.5rem;\n  overflow: hidden;\n  background-color: #e9ecef;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.gallery-preview img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.gallery-preview .gallery-placeholder {\n  color: #adb5bd;\n  font-size: 1.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n}\n.gallery-input {\n  flex-grow: 1;\n}\n.gallery-input .progress {\n  height: 8px;\n  margin-top: 0.5rem;\n  border-radius: 4px;\n}\n.gallery-input .progress .progress-bar {\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n}\n.gallery-action {\n  flex-shrink: 0;\n}\n.btn-danger {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n  font-weight: 600;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-danger:hover:not(:disabled) {\n  background-color: rgb(210.9493670886, 36.5506329114, 53.2594936709);\n  border-color: rgb(210.9493670886, 36.5506329114, 53.2594936709);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);\n}\n.btn-outline-danger {\n  border: 2px solid #dc3545;\n  color: #dc3545;\n  background-color: transparent;\n  font-weight: 600;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-outline-danger:hover {\n  background-color: #dc3545;\n  color: white;\n  transform: translateY(-2px);\n}\n.btn-success {\n  background-color: #28a745;\n  border-color: #28a745;\n  color: white;\n  font-weight: 600;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-success:hover:not(:disabled) {\n  background-color: rgb(35.0724637681, 146.4275362319, 60.5);\n  border-color: rgb(35.0724637681, 146.4275362319, 60.5);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.2);\n}\n.btn-outline-success {\n  border: 2px solid #28a745;\n  color: #28a745;\n  background-color: transparent;\n  font-weight: 600;\n  border-radius: 0.75rem;\n  transition: all 0.3s ease;\n}\n.btn-outline-success:hover {\n  background-color: #28a745;\n  color: white;\n  transform: translateY(-2px);\n}\n.btn-outline-success.btn-sm {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n.variant-row {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  grid-template-areas: "attributes stock action";\n  gap: 1rem;\n  align-items: start;\n  padding: 1rem;\n  margin-bottom: 0.75rem;\n  border-radius: 0.75rem;\n  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;\n  border: 1px solid #dfe3e8;\n  background-color: #ffffff;\n}\n.variant-row:hover {\n  background-color: #f8f9fa;\n}\n.variant-row.ng-invalid.ng-touched {\n  background-color: rgba(220, 53, 69, 0.05);\n  border-color: rgba(220, 53, 69, 0.2);\n}\n.variant-attributes-container {\n  grid-area: attributes;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n.variant-attribute-item {\n  min-width: 120px;\n}\n.variant-stock-item {\n  grid-area: stock;\n  width: 100px;\n}\n.variant-action-item {\n  grid-area: action;\n  padding-top: 1.75rem;\n}\n.variant-action-item .btn-danger {\n  padding: 0.65rem 1rem;\n}\n.progress-bar {\n  background-color: #7b68ee;\n}\n@media (max-width: 768px) {\n  .form-card .card-body {\n    padding: 1.5rem;\n  }\n  .gallery-item-row {\n    flex-wrap: wrap;\n    gap: 0.5rem;\n  }\n  .gallery-item-row .gallery-preview {\n    width: 60px;\n    height: 60px;\n    order: 1;\n  }\n  .gallery-item-row .gallery-action {\n    order: 1;\n    margin-left: auto;\n  }\n  .gallery-item-row .gallery-input {\n    flex-basis: 100%;\n    order: 2;\n  }\n  .variant-row {\n    grid-template-columns: 1fr 1fr;\n    grid-template-areas: "attributes attributes" "stock      action";\n    align-items: end;\n  }\n  .variant-row .variant-attributes-container {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .variant-row .variant-stock-item {\n    width: auto;\n  }\n  .variant-row .variant-action-item {\n    padding-top: 0;\n  }\n}\n@media (max-width: 576px) {\n  .container > .d-flex.justify-content-between {\n    flex-direction: column;\n    align-items: flex-start !important;\n    gap: 1rem;\n  }\n  div[formArrayName=images] > .d-flex.justify-content-between {\n    flex-wrap: wrap;\n    gap: 0.75rem;\n  }\n  form > .d-flex.justify-content-end {\n    flex-direction: column-reverse;\n    gap: 0.75rem;\n  }\n  form > .d-flex.justify-content-end .btn {\n    width: 100%;\n  }\n  .d-flex.justify-content-between .btn-success {\n    width: 100%;\n  }\n  .variant-row {\n    grid-template-columns: 1fr;\n    grid-template-areas: "attributes" "stock" "action";\n    align-items: stretch;\n  }\n  .variant-row .variant-attributes-container {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .variant-row .variant-action-item {\n    padding-top: 0;\n  }\n  .variant-row .variant-action-item .btn-danger {\n    width: 100%;\n  }\n}\n/*# sourceMappingURL=product-create.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductCreateComponent, { className: "ProductCreateComponent", filePath: "src/app/features/admin/components/products/product-create/product-create.component.ts", lineNumber: 26 });
})();
export {
  ProductCreateComponent
};
//# sourceMappingURL=chunk-6CUPM62R.js.map
