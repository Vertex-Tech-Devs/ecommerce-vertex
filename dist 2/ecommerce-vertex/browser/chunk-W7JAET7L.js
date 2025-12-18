import {
  AboutUsService
} from "./chunk-GQC77EE4.js";
import "./chunk-EBKKK7PL.js";
import "./chunk-CUH4JQND.js";
import "./chunk-5OJQRZGI.js";
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
  ɵɵdomProperty,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/shop/components/about/about.component.ts
function AboutComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const pageData_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(pageData_r1.bannerSubtitle);
  }
}
function AboutComponent_Conditional_0_For_22_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "i", 18);
  }
}
function AboutComponent_Conditional_0_For_22_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "i", 19);
  }
}
function AboutComponent_Conditional_0_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 16)(1, "div", 17);
    \u0275\u0275conditionalCreate(2, AboutComponent_Conditional_0_For_22_Conditional_2_Template, 1, 0, "i", 18)(3, AboutComponent_Conditional_0_For_22_Conditional_3_Template, 1, 0, "i", 19);
    \u0275\u0275domElementStart(4, "h3", 20);
    \u0275\u0275text(5);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "p", 21);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const card_r2 = ctx.$implicit;
    const \u0275$index_43_r3 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(\u0275$index_43_r3 === 0 ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(card_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(card_r2.content);
  }
}
function AboutComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 0)(1, "section", 2)(2, "div", 3)(3, "h1", 4);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275conditionalCreate(5, AboutComponent_Conditional_0_Conditional_5_Template, 2, 1, "p", 5);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(6, "div", 6)(7, "section", 7)(8, "h2", 8);
    \u0275\u0275text(9);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "div", 9)(11, "div", 10)(12, "div", 11);
    \u0275\u0275domElement(13, "img", 12);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(14, "div", 13)(15, "p", 14);
    \u0275\u0275text(16);
    \u0275\u0275domElementEnd()()()()();
    \u0275\u0275domElementStart(17, "section", 7)(18, "h2", 8);
    \u0275\u0275text(19);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(20, "div", 15);
    \u0275\u0275repeaterCreate(21, AboutComponent_Conditional_0_For_22_Template, 8, 3, "div", 16, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const pageData_r1 = ctx;
    \u0275\u0275advance();
    \u0275\u0275styleProp("background-image", "url(" + pageData_r1.bannerImageUrl + ")");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(pageData_r1.bannerTitle);
    \u0275\u0275advance();
    \u0275\u0275conditional(pageData_r1.bannerSubtitle ? 5 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(pageData_r1.centralTitle);
    \u0275\u0275advance(4);
    \u0275\u0275domProperty("src", pageData_r1.centralImageUrl, \u0275\u0275sanitizeUrl)("alt", pageData_r1.centralTitle);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(pageData_r1.centralDescription);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(pageData_r1.cardsSectionTitle);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(pageData_r1.featureCards);
  }
}
function AboutComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 1)(1, "div", 22)(2, "span", 23);
    \u0275\u0275text(3, "Cargando contenido...");
    \u0275\u0275domElementEnd()()();
  }
}
var AboutComponent = class _AboutComponent {
  aboutUsService = inject(AboutUsService);
  data$;
  constructor() {
    this.data$ = this.aboutUsService.getAboutUsData();
  }
  static \u0275fac = function AboutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AboutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AboutComponent, selectors: [["app-about"]], decls: 3, vars: 3, consts: [[1, "about-page"], [1, "loading-container"], [1, "hero-banner"], [1, "hero-content"], [1, "hero-title"], [1, "hero-subtitle"], [1, "about-container"], [1, "featured-content", "py-5"], [1, "section-title"], [1, "our-story"], [1, "row", "align-items-center"], [1, "col-lg-6"], [1, "img-fluid", "rounded", "shadow-lg", 3, "src", "alt"], [1, "col-lg-6", "mt-4", "mt-lg-0", "story-text"], [1, "dynamic-description"], [1, "mission-vision-grid"], [1, "info-card"], [1, "card-content"], [1, "bi", "bi-bullseye", "card-icon"], [1, "bi", "bi-stars", "card-icon"], [1, "card-title"], [1, "card-text"], ["role", "status", 1, "spinner-border", "text-primary"], [1, "visually-hidden"]], template: function AboutComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, AboutComponent_Conditional_0_Template, 23, 9, "div", 0);
      \u0275\u0275pipe(1, "async");
      \u0275\u0275conditionalBranchCreate(2, AboutComponent_Conditional_2_Template, 4, 0, "div", 1);
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(1, 1, ctx.data$)) ? 0 : 2, tmp_0_0);
    }
  }, dependencies: [CommonModule, AsyncPipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  background:\n    linear-gradient(\n      45deg,\n      rgba(253, 92, 43, 0.9294117647),\n      rgba(244, 193, 26, 0.9450980392),\n      rgba(255, 75, 30, 0.9647058824));\n  color: #f8f9fa;\n}\n.about-page[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.about-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n}\n.hero-banner[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 50vh;\n  min-height: 350px;\n  background-size: cover;\n  background-position: center 30%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  position: relative;\n  padding: 2rem 1.5rem;\n  border-bottom: 2px solid #7f0d81;\n}\n.hero-banner[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(10, 10, 20, 0.5);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.hero-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 800px;\n  color: #fff;\n}\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);\n  color: #f8f9fa;\n}\n.hero-subtitle[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 300;\n  color: rgba(255, 255, 255, 0.9);\n  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);\n  margin-top: 0.5rem;\n}\n.section-title[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 3rem;\n  color: #f8f9fa;\n}\n.our-story[_ngcontent-%COMP%]   .story-text[_ngcontent-%COMP%]   .dynamic-description[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  line-height: 1.8;\n  color: #f8f9fa;\n  white-space: pre-wrap;\n}\n.our-story[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ff5722;\n}\n.mission-vision-grid[_ngcontent-%COMP%], \n.contact-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 2rem;\n}\n.info-card[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #f44814,\n      0.25);\n  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.3);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  padding: 2.5rem 2rem;\n  text-align: center;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  height: 100%;\n}\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  color: #ff5722;\n  margin-bottom: 1.5rem;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  color: #f4f2f4;\n}\n.card-text[_ngcontent-%COMP%] {\n  color: #000000;\n  line-height: 1.6;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 80vh;\n}\n.loading-container[_ngcontent-%COMP%]   .spinner-border[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n}\n@media (max-width: 768px) {\n  .hero-banner[_ngcontent-%COMP%] {\n    height: 40vh;\n    min-height: 300px;\n  }\n  .hero-title[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 2.1rem;\n  }\n}\n/*# sourceMappingURL=about.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AboutComponent, [{
    type: Component,
    args: [{ selector: "app-about", standalone: true, imports: [CommonModule], template: `@if (data$ | async; as pageData) {
  <div class="about-page">
    <section class="hero-banner" [style.background-image]="'url(' + pageData.bannerImageUrl + ')'">
      <div class="hero-content">
        <h1 class="hero-title">{{ pageData.bannerTitle }}</h1>
        @if (pageData.bannerSubtitle) {
          <p class="hero-subtitle">{{ pageData.bannerSubtitle }}</p>
        }
      </div>
    </section>

    <div class="about-container">
      <section class="featured-content py-5">
        <h2 class="section-title">{{ pageData.centralTitle }}</h2>
        <div class="our-story">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <img [src]="pageData.centralImageUrl"
                   [alt]="pageData.centralTitle"
                   class="img-fluid rounded shadow-lg">
            </div>
            <div class="col-lg-6 mt-4 mt-lg-0 story-text">
              <p class="dynamic-description">{{ pageData.centralDescription }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="featured-content py-5">
        <h2 class="section-title">{{ pageData.cardsSectionTitle }}</h2>
        <div class="mission-vision-grid">

          @for (card of pageData.featureCards; track $index; let i = $index) {
            <div class="info-card">
              <div class="card-content">

                @if (i === 0) {
                  <i class="bi bi-bullseye card-icon"></i>
                } @else {
                  <i class="bi bi-stars card-icon"></i>
                }

                <h3 class="card-title">{{ card.title }}</h3>
                <p class="card-text">{{ card.content }}</p>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  </div>
} @else {
  <div class="loading-container">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Cargando contenido...</span>
    </div>
  </div>
}
`, styles: ['/* src/app/features/shop/components/about/about.component.scss */\n:host {\n  display: block;\n  background:\n    linear-gradient(\n      45deg,\n      rgba(253, 92, 43, 0.9294117647),\n      rgba(244, 193, 26, 0.9450980392),\n      rgba(255, 75, 30, 0.9647058824));\n  color: #f8f9fa;\n}\n.about-page {\n  width: 100%;\n}\n.about-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n}\n.hero-banner {\n  width: 100%;\n  height: 50vh;\n  min-height: 350px;\n  background-size: cover;\n  background-position: center 30%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  position: relative;\n  padding: 2rem 1.5rem;\n  border-bottom: 2px solid #7f0d81;\n}\n.hero-banner::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(10, 10, 20, 0.5);\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.hero-content {\n  position: relative;\n  z-index: 1;\n  max-width: 800px;\n  color: #fff;\n}\n.hero-title {\n  font-size: 3rem;\n  font-weight: 700;\n  margin-bottom: 1rem;\n  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);\n  color: #f8f9fa;\n}\n.hero-subtitle {\n  font-size: 1.5rem;\n  font-weight: 300;\n  color: rgba(255, 255, 255, 0.9);\n  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);\n  margin-top: 0.5rem;\n}\n.section-title {\n  text-align: center;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 3rem;\n  color: #f8f9fa;\n}\n.our-story .story-text .dynamic-description {\n  font-size: 1.1rem;\n  line-height: 1.8;\n  color: #f8f9fa;\n  white-space: pre-wrap;\n}\n.our-story strong {\n  color: #ff5722;\n}\n.mission-vision-grid,\n.contact-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 2rem;\n}\n.info-card {\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #f44814,\n      0.25);\n  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.3);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  padding: 2.5rem 2rem;\n  text-align: center;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  height: 100%;\n}\n.card-icon {\n  font-size: 3rem;\n  color: #ff5722;\n  margin-bottom: 1.5rem;\n}\n.card-title {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  color: #f4f2f4;\n}\n.card-text {\n  color: #000000;\n  line-height: 1.6;\n}\n.loading-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 80vh;\n}\n.loading-container .spinner-border {\n  width: 3rem;\n  height: 3rem;\n}\n@media (max-width: 768px) {\n  .hero-banner {\n    height: 40vh;\n    min-height: 300px;\n  }\n  .hero-title {\n    font-size: 2.5rem;\n  }\n  .section-title {\n    font-size: 2.1rem;\n  }\n}\n/*# sourceMappingURL=about.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AboutComponent, { className: "AboutComponent", filePath: "src/app/features/shop/components/about/about.component.ts", lineNumber: 14 });
})();
export {
  AboutComponent
};
//# sourceMappingURL=chunk-W7JAET7L.js.map
