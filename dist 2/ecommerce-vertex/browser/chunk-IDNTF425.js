import {
  AttributeModalComponent
} from "./chunk-JOWRWNPB.js";
import {
  BsModalService
} from "./chunk-2OBKN7QP.js";
import "./chunk-WR4QMUYF.js";
import {
  AttributeService
} from "./chunk-H5HDOTK4.js";
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
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import {
  __async,
  __spreadValues
} from "./chunk-KTESVR3Q.js";

// src/app/features/admin/components/attributes/attributes-list/attributes-list.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function AttributesListComponent_Conditional_6_For_12_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const val_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(val_r2);
  }
}
function AttributesListComponent_Conditional_6_For_12_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const attr_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", attr_r3.values.length - 5, " m\xE1s");
  }
}
function AttributesListComponent_Conditional_6_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "tr")(1, "td", 12);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "td", 13)(4, "div", 14);
    \u0275\u0275repeaterCreate(5, AttributesListComponent_Conditional_6_For_12_For_6_Template, 2, 1, "span", 15, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275conditionalCreate(7, AttributesListComponent_Conditional_6_For_12_Conditional_7_Template, 2, 1, "span", 16);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "td", 17)(9, "button", 18);
    \u0275\u0275domListener("click", function AttributesListComponent_Conditional_6_For_12_Template_button_click_9_listener() {
      const attr_r3 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.openAttributeModal(attr_r3));
    });
    \u0275\u0275domElement(10, "i", 19);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(11, "button", 20);
    \u0275\u0275domListener("click", function AttributesListComponent_Conditional_6_For_12_Template_button_click_11_listener() {
      const attr_r3 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onDelete(attr_r3));
    });
    \u0275\u0275domElement(12, "i", 21);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const attr_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(attr_r3.name);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(attr_r3.values.slice(0, 5));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(attr_r3.values.length > 5 ? 7 : -1);
  }
}
function AttributesListComponent_Conditional_6_ForEmpty_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "tr")(1, "td", 22)(2, "div", 23);
    \u0275\u0275domElement(3, "i", 24);
    \u0275\u0275domElementStart(4, "p", 25);
    \u0275\u0275text(5, "A\xFAn no hay atributos creados.");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p");
    \u0275\u0275text(7, 'Crea el primero (ej: "Color" o "Talle") para empezar a definir variantes.');
    \u0275\u0275domElementEnd()()()();
  }
}
function AttributesListComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 5)(1, "table", 9)(2, "thead")(3, "tr")(4, "th", 10);
    \u0275\u0275text(5, "Nombre del Atributo");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "th", 10);
    \u0275\u0275text(7, "Valores");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(8, "th", 11);
    \u0275\u0275text(9, "Acciones");
    \u0275\u0275domElementEnd()()();
    \u0275\u0275domElementStart(10, "tbody");
    \u0275\u0275repeaterCreate(11, AttributesListComponent_Conditional_6_For_12_Template, 13, 2, "tr", null, _forTrack0, false, AttributesListComponent_Conditional_6_ForEmpty_13_Template, 8, 0, "tr");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx);
  }
}
function AttributesListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 6)(1, "div", 26)(2, "span", 27);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275domElementEnd()()();
  }
}
var AttributesListComponent = class _AttributesListComponent {
  attributeService = inject(AttributeService);
  modalService = inject(BsModalService);
  sweetAlertService = inject(SweetAlertService);
  attributes$;
  bsModalRef;
  modalSubscription;
  ngOnInit() {
    this.attributes$ = this.attributeService.getAttributes();
  }
  ngOnDestroy() {
    this.modalSubscription?.unsubscribe();
  }
  openAttributeModal(attribute) {
    const initialState = attribute ? { attribute: __spreadValues({}, attribute) } : {};
    this.bsModalRef = this.modalService.show(AttributeModalComponent, {
      initialState,
      class: "modal-lg modal-dialog-centered"
    });
    this.modalSubscription = this.bsModalRef.content.onClose.subscribe((result) => {
      if (result) {
        if (attribute && attribute.id) {
          this.updateAttribute(attribute.id, result);
        } else {
          this.addAttribute(result);
        }
      }
    });
  }
  addAttribute(attributeData) {
    this.attributeService.addAttribute(attributeData).then(() => this.sweetAlertService.success("\xA1\xC9xito!", "Atributo creado correctamente.")).catch((err) => this.sweetAlertService.error("Error", "Hubo un problema al crear el atributo."));
  }
  updateAttribute(id, attributeData) {
    this.attributeService.updateAttribute(id, attributeData).then(() => this.sweetAlertService.success("\xA1\xC9xito!", "Atributo actualizado correctamente.")).catch((err) => this.sweetAlertService.error("Error", "Hubo un problema al actualizar el atributo."));
  }
  onDelete(attribute) {
    return __async(this, null, function* () {
      const isConfirmed = yield this.sweetAlertService.confirm("\xBFEst\xE1s seguro?", `Esta acci\xF3n eliminar\xE1 el atributo "${attribute.name}". Los productos que lo usen ya no podr\xE1n filtrarse por \xE9l.`);
      if (isConfirmed && attribute.id) {
        try {
          yield this.attributeService.deleteAttribute(attribute.id);
          this.sweetAlertService.success("Eliminado", "El atributo ha sido eliminado.");
        } catch (err) {
          this.sweetAlertService.error("Error", "Hubo un problema al eliminar el atributo.");
        }
      }
    });
  }
  static \u0275fac = function AttributesListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AttributesListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AttributesListComponent, selectors: [["app-attributes-list"]], decls: 11, vars: 3, consts: [[1, "container-fluid", "my-4"], [1, "card-gradient-wrapper"], [1, "card", "list-card", "shadow-sm"], [1, "card-body"], [1, "card-title", "text-center", "mb-4"], [1, "table-responsive"], [1, "d-flex", "justify-content-center", "py-5"], ["title", "Nuevo Atributo", 1, "btn", "btn-primary", "btn-lg", "rounded-circle", "fab-button", "shadow-lg", 3, "click"], [1, "bi", "bi-plus-lg"], [1, "table", "table-hover", "align-middle", "mb-0", "attribute-table"], ["scope", "col"], ["scope", "col", 1, "text-end"], ["data-label", "Nombre del Atributo"], ["data-label", "Valores"], [1, "values-pills"], [1, "badge", "bg-light", "text-dark"], [1, "badge", "bg-secondary"], ["data-label", "Acciones", 1, "text-end"], ["title", "Editar", 1, "btn", "btn-outline-primary", "btn-sm", "me-2", 3, "click"], [1, "bi", "bi-pencil-square"], ["title", "Eliminar", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "bi", "bi-trash"], ["colspan", "3"], [1, "text-center", "text-muted-custom", "py-5"], [1, "bi", "bi-rulers", "fs-2", "d-block", "mb-2"], [1, "lead"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"]], template: function AttributesListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4);
      \u0275\u0275text(5, "Gesti\xF3n de Atributos de Producto");
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(6, AttributesListComponent_Conditional_6_Template, 14, 1, "div", 5);
      \u0275\u0275pipe(7, "async");
      \u0275\u0275conditionalBranchCreate(8, AttributesListComponent_Conditional_8_Template, 4, 0, "div", 6);
      \u0275\u0275domElementEnd()()()();
      \u0275\u0275domElementStart(9, "button", 7);
      \u0275\u0275domListener("click", function AttributesListComponent_Template_button_click_9_listener() {
        return ctx.openAttributeModal();
      });
      \u0275\u0275domElement(10, "i", 8);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(6);
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(7, 1, ctx.attributes$)) ? 6 : 8, tmp_0_0);
    }
  }, dependencies: [CommonModule, AsyncPipe], styles: ['\n\n@keyframes _ngcontent-%COMP%_gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper[_ngcontent-%COMP%] {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 8s ease infinite;\n}\n.list-card[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n    padding: 2rem;\n  }\n}\n.card-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.attribute-table.table[_ngcontent-%COMP%] {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);\n}\n.attribute-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.attribute-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n}\n.attribute-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.attribute-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n}\n.attribute-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover::after {\n  opacity: 1;\n}\n.attribute-table[_ngcontent-%COMP%]   .values-pills[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  justify-content: flex-start;\n}\n.attribute-table[_ngcontent-%COMP%]   .badge.bg-light[_ngcontent-%COMP%] {\n  font-weight: 500;\n  border: 1px solid #e0e0e0;\n}\n.text-muted-custom[_ngcontent-%COMP%] {\n  color: #6c757d;\n}\n@media (max-width: 768px) {\n  .attribute-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .attribute-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%], \n   .attribute-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%], \n   .attribute-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n  }\n  .attribute-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 1rem;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n  }\n  .attribute-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n    transform: none;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  }\n  .attribute-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: right !important;\n    padding: 0.75rem 0.5rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n  }\n  .attribute-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    border-bottom: none;\n  }\n  .attribute-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n  }\n  .attribute-table[_ngcontent-%COMP%]   td[data-label=Acciones][_ngcontent-%COMP%] {\n    justify-content: flex-end;\n    gap: 0.5rem;\n  }\n  .attribute-table[_ngcontent-%COMP%]   td[data-label=Acciones][_ngcontent-%COMP%]::before {\n    margin-right: auto;\n  }\n  .attribute-table[_ngcontent-%COMP%]   td[data-label=Valores][_ngcontent-%COMP%] {\n    justify-content: flex-end;\n  }\n  .attribute-table[_ngcontent-%COMP%]   td[data-label=Valores][_ngcontent-%COMP%]   .values-pills[_ngcontent-%COMP%] {\n    justify-content: flex-end;\n    max-width: 60%;\n  }\n}\n.fab-button[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 2rem;\n  right: 2rem;\n  z-index: 1050;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  font-size: 1.6rem;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  border: none;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transition: all 0.3s ease;\n}\n.fab-button[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px) scale(1.05);\n  box-shadow: 0 8px 20px rgba(123, 104, 238, 0.3);\n}\n/*# sourceMappingURL=attributes-list.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AttributesListComponent, [{
    type: Component,
    args: [{ selector: "app-attributes-list", standalone: true, imports: [CommonModule], template: '<div class="container-fluid my-4">\n  <div class="card-gradient-wrapper">\n    <div class="card list-card shadow-sm">\n      <div class="card-body">\n        <h2 class="card-title text-center mb-4">Gesti\xF3n de Atributos de Producto</h2>\n\n        @if (attributes$ | async; as attributes) {\n          <div class="table-responsive">\n            <table class="table table-hover align-middle mb-0 attribute-table">\n              <thead>\n                <tr>\n                  <th scope="col">Nombre del Atributo</th>\n                  <th scope="col">Valores</th>\n                  <th scope="col" class="text-end">Acciones</th>\n                </tr>\n              </thead>\n              <tbody>\n                @for (attr of attributes; track attr.id) {\n                  <tr>\n                    <td data-label="Nombre del Atributo">{{ attr.name }}</td>\n                    <td data-label="Valores">\n                      <div class="values-pills">\n                        @for (val of attr.values.slice(0, 5); track val) {\n                          <span class="badge bg-light text-dark">{{ val }}</span>\n                        }\n                        @if (attr.values.length > 5) {\n                          <span class="badge bg-secondary">+{{ attr.values.length - 5 }} m\xE1s</span>\n                        }\n                      </div>\n                    </td>\n                    <td data-label="Acciones" class="text-end">\n                      <button\n                        class="btn btn-outline-primary btn-sm me-2"\n                        (click)="openAttributeModal(attr)"\n                        title="Editar">\n                        <i class="bi bi-pencil-square"></i>\n                      </button>\n                      <button\n                        class="btn btn-outline-danger btn-sm"\n                        (click)="onDelete(attr)"\n                        title="Eliminar">\n                        <i class="bi bi-trash"></i>\n                      </button>\n                    </td>\n                  </tr>\n                } @empty {\n                  <tr>\n                    <td colspan="3">\n                      <div class="text-center text-muted-custom py-5">\n                        <i class="bi bi-rulers fs-2 d-block mb-2"></i>\n                        <p class="lead">A\xFAn no hay atributos creados.</p>\n                        <p>Crea el primero (ej: "Color" o "Talle") para empezar a definir variantes.</p>\n                      </div>\n                    </td>\n                  </tr>\n                }\n              </tbody>\n            </table>\n          </div>\n        } @else {\n          <div class="d-flex justify-content-center py-5">\n            <div class="spinner-border text-primary" role="status">\n              <span class="visually-hidden">Cargando...</span>\n            </div>\n          </div>\n        }\n      </div>\n    </div>\n  </div>\n</div>\n\n<button\n  class="btn btn-primary btn-lg rounded-circle fab-button shadow-lg"\n  (click)="openAttributeModal()"\n  title="Nuevo Atributo">\n  <i class="bi bi-plus-lg"></i>\n</button>', styles: ['/* src/app/features/admin/components/attributes/attributes-list/attributes-list.component.scss */\n@keyframes gradient-animation {\n  0% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.card-gradient-wrapper {\n  padding: 2px;\n  border-radius: 1rem;\n  background:\n    linear-gradient(\n      90deg,\n      #7b68ee,\n      #007bff,\n      #7b68ee);\n  background-size: 200% 200%;\n  animation: gradient-animation 8s ease infinite;\n}\n.list-card {\n  border: none;\n  border-radius: calc(1rem - 2px);\n  background-color: #f4f6f9;\n}\n.list-card .card-body {\n  padding: 1.5rem;\n}\n@media (min-width: 768px) {\n  .list-card .card-body {\n    padding: 2rem;\n  }\n}\n.card-title {\n  font-weight: 700;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n}\n.attribute-table.table {\n  --bs-table-bg: transparent;\n  --bs-table-border-color: #dfe3e8;\n  --bs-table-color: #1c2a42;\n  --bs-table-hover-color: #1c2a42;\n  --bs-table-hover-bg: rgba(233, 236, 239, 0.7);\n}\n.attribute-table thead th {\n  font-weight: 600;\n}\n.attribute-table tbody tr {\n  position: relative;\n  border-radius: 0.75rem;\n  transition: transform 0.2s ease-in-out;\n}\n.attribute-table tbody tr::after {\n  content: "";\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  border-radius: inherit;\n  padding: 1px;\n  background:\n    linear-gradient(\n      120deg,\n      #007bff,\n      #7b68ee,\n      #007bff);\n  background-size: 200% 200%;\n  animation: gradient-animation 6s ease infinite;\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.attribute-table tbody tr:hover {\n  transform: translateY(-2px);\n}\n.attribute-table tbody tr:hover::after {\n  opacity: 1;\n}\n.attribute-table .values-pills {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  justify-content: flex-start;\n}\n.attribute-table .badge.bg-light {\n  font-weight: 500;\n  border: 1px solid #e0e0e0;\n}\n.text-muted-custom {\n  color: #6c757d;\n}\n@media (max-width: 768px) {\n  .attribute-table thead {\n    display: none;\n  }\n  .attribute-table tbody,\n  .attribute-table tr,\n  .attribute-table td {\n    display: block;\n    width: 100%;\n  }\n  .attribute-table tr {\n    background-color: #ffffff;\n    border-radius: 0.75rem;\n    margin-bottom: 1rem;\n    padding: 1rem;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n    border: 1px solid #f0f0f0;\n  }\n  .attribute-table tr:hover {\n    transform: none;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  }\n  .attribute-table td {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    text-align: right !important;\n    padding: 0.75rem 0.5rem;\n    border: none;\n    border-bottom: 1px solid #f0f0f0;\n  }\n  .attribute-table td:last-child {\n    border-bottom: none;\n  }\n  .attribute-table td::before {\n    content: attr(data-label);\n    font-weight: 600;\n    text-align: left;\n    color: #495057;\n    margin-right: 1rem;\n  }\n  .attribute-table td[data-label=Acciones] {\n    justify-content: flex-end;\n    gap: 0.5rem;\n  }\n  .attribute-table td[data-label=Acciones]::before {\n    margin-right: auto;\n  }\n  .attribute-table td[data-label=Valores] {\n    justify-content: flex-end;\n  }\n  .attribute-table td[data-label=Valores] .values-pills {\n    justify-content: flex-end;\n    max-width: 60%;\n  }\n}\n.fab-button {\n  position: fixed;\n  bottom: 2rem;\n  right: 2rem;\n  z-index: 1050;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  font-size: 1.6rem;\n  background:\n    linear-gradient(\n      45deg,\n      #007bff,\n      #7b68ee);\n  border: none;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transition: all 0.3s ease;\n}\n.fab-button:hover {\n  transform: translateY(-4px) scale(1.05);\n  box-shadow: 0 8px 20px rgba(123, 104, 238, 0.3);\n}\n/*# sourceMappingURL=attributes-list.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AttributesListComponent, { className: "AttributesListComponent", filePath: "src/app/features/admin/components/attributes/attributes-list/attributes-list.component.ts", lineNumber: 17 });
})();
export {
  AttributesListComponent
};
//# sourceMappingURL=chunk-IDNTF425.js.map
