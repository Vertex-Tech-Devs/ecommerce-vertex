import {
  HomeContentService
} from "./chunk-5KI2V4TS.js";
import "./chunk-EBKKK7PL.js";
import "./chunk-CUH4JQND.js";
import {
  ProductService
} from "./chunk-2ZGQTQTR.js";
import "./chunk-5OJQRZGI.js";
import {
  RouterLink,
  RouterModule
} from "./chunk-P63BSBQH.js";
import "./chunk-YM4MUNL7.js";
import "./chunk-HMD6QQFJ.js";
import "./chunk-SDXAAYIW.js";
import {
  AsyncPipe,
  CommonModule,
  Component,
  CurrencyPipe,
  NgClass,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-QBKDZG3W.js";
import "./chunk-KTESVR3Q.js";

// src/app/features/shop/components/home/home.component.ts
var _c0 = (a0) => ({ "has-scroll": a0 });
var _c1 = () => ["/shop/catalog"];
var _c2 = (a0) => ({ category: a0 });
var _c3 = (a0) => ["/shop/product", a0];
var _forTrack0 = ($index, $item) => $item.id;
function HomeComponent_Conditional_1_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h1", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const banner_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(banner_r1.title);
  }
}
function HomeComponent_Conditional_1_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const banner_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", banner_r1.buttonLink);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", banner_r1.buttonText, " ");
  }
}
function HomeComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 7)(1, "div", 8);
    \u0275\u0275conditionalCreate(2, HomeComponent_Conditional_1_Conditional_0_Conditional_2_Template, 2, 1, "h1", 9);
    \u0275\u0275conditionalCreate(3, HomeComponent_Conditional_1_Conditional_0_Conditional_3_Template, 2, 2, "a", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const banner_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background-image", "url(" + banner_r1.imageUrl + ")");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(banner_r1.title ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(banner_r1.buttonText && banner_r1.buttonLink ? 3 : -1);
  }
}
function HomeComponent_Conditional_1_Conditional_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12);
    \u0275\u0275element(1, "div", 13);
    \u0275\u0275elementStart(2, "span", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const category_r2 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(5, _c1))("queryParams", \u0275\u0275pureFunction1(6, _c2, category_r2.categoryId));
    \u0275\u0275advance();
    \u0275\u0275styleProp("background-image", "url(" + category_r2.imageUrl + ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(category_r2.name);
  }
}
function HomeComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 2)(1, "h2", 3);
    \u0275\u0275text(2, "Categor\xEDas Destacadas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11);
    \u0275\u0275repeaterCreate(4, HomeComponent_Conditional_1_Conditional_2_For_5_Template, 4, 8, "a", 12, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const banner_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(1, _c0, banner_r1.featuredCategories.length > 2));
    \u0275\u0275advance();
    \u0275\u0275repeater(banner_r1.featuredCategories);
  }
}
function HomeComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, HomeComponent_Conditional_1_Conditional_0_Template, 4, 4, "section", 6);
    \u0275\u0275elementStart(1, "div", 1);
    \u0275\u0275conditionalCreate(2, HomeComponent_Conditional_1_Conditional_2_Template, 6, 3, "section", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const banner_r1 = ctx;
    \u0275\u0275conditional(banner_r1.imageUrl ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(banner_r1.featuredCategories && banner_r1.featuredCategories.length > 0 ? 2 : -1);
  }
}
function HomeComponent_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 15)(1, "div", 17)(2, "div", 18);
    \u0275\u0275element(3, "img", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 20)(5, "h3", 21);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 22);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const product_r3 = ctx.$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c3, product_r3.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("src", product_r3.image, \u0275\u0275sanitizeUrl)("alt", product_r3.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(product_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind3(9, 5, product_r3.price, "ARS", "$"));
  }
}
function HomeComponent_Conditional_7_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "No hay productos nuevos para mostrar en este momento.");
    \u0275\u0275elementEnd();
  }
}
function HomeComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275repeaterCreate(1, HomeComponent_Conditional_7_For_2_Template, 10, 11, "a", 15, _forTrack0, false, HomeComponent_Conditional_7_ForEmpty_3_Template, 2, 0, "p", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx);
  }
}
function HomeComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 23)(2, "span", 24);
    \u0275\u0275text(3, "Cargando...");
    \u0275\u0275elementEnd()()();
  }
}
var HomeComponent = class _HomeComponent {
  homeContentService = inject(HomeContentService);
  productService = inject(ProductService);
  heroBanner$;
  newArrivals$;
  ngOnInit() {
    this.heroBanner$ = this.homeContentService.getHeroBanner();
    this.newArrivals$ = this.productService.getLatestProducts(8);
  }
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 10, vars: 6, consts: [[1, "home-page"], [1, "home-container"], [1, "featured-content", "py-5"], [1, "section-title"], [1, "product-grid"], [1, "text-center"], [1, "hero-banner", 3, "backgroundImage"], [1, "hero-banner"], [1, "hero-content"], [1, "hero-title"], [1, "btn", "hero-btn", 3, "routerLink"], [1, "category-grid", 3, "ngClass"], [1, "category-card", 3, "routerLink", "queryParams"], [1, "category-image"], [1, "category-name"], [1, "product-card-link", 3, "routerLink"], [1, "text-center", "text-muted", "empty-state"], [1, "product-card"], [1, "product-image-wrapper"], [1, "product-image", 3, "src", "alt"], [1, "product-info"], [1, "product-name"], [1, "product-price"], ["role", "status", 1, "spinner-border"], [1, "visually-hidden"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, HomeComponent_Conditional_1_Template, 3, 2);
      \u0275\u0275pipe(2, "async");
      \u0275\u0275elementStart(3, "div", 1)(4, "section", 2)(5, "h2", 3);
      \u0275\u0275text(6, "Nuevos Ingresos");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(7, HomeComponent_Conditional_7_Template, 4, 1, "div", 4);
      \u0275\u0275pipe(8, "async");
      \u0275\u0275conditionalBranchCreate(9, HomeComponent_Conditional_9_Template, 4, 0, "div", 5);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(2, 2, ctx.heroBanner$)) ? 1 : -1, tmp_0_0);
      \u0275\u0275advance(6);
      \u0275\u0275conditional((tmp_1_0 = \u0275\u0275pipeBind1(8, 4, ctx.newArrivals$)) ? 7 : 9, tmp_1_0);
    }
  }, dependencies: [CommonModule, NgClass, RouterModule, RouterLink, AsyncPipe, CurrencyPipe], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n  background-color: #f4f5f7;\n  color: #333;\n}\n@keyframes _ngcontent-%COMP%_rotate-gradient {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.home-page[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.home-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n}\n.hero-banner[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 60vh;\n  min-height: 400px;\n  background-size: cover;\n  background-position: center center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  position: relative;\n  padding: 2rem 1.5rem;\n}\n.hero-banner[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.25);\n}\n.hero-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 800px;\n  color: #fff;\n}\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  font-weight: 700;\n  margin-bottom: 1.5rem;\n  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);\n}\n.hero-btn[_ngcontent-%COMP%] {\n  padding: 0.75rem 2rem;\n  border: none;\n  border-radius: 50px;\n  font-size: 1rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  cursor: pointer;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.hero-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 15px rgba(255, 87, 34, 0.3);\n}\n.section-title[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 3rem;\n  color: #333;\n}\n.category-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 2rem;\n}\n.category-card[_ngcontent-%COMP%] {\n  display: block;\n  position: relative;\n  height: 380px;\n  border-radius: 8px;\n  overflow: hidden;\n  text-decoration: none;\n  color: white;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.category-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);\n}\n.category-card[_ngcontent-%COMP%]   .category-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background-size: cover;\n  background-position: center;\n  transition: transform 0.3s ease;\n}\n.category-card[_ngcontent-%COMP%]:hover   .category-image[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n.category-card[_ngcontent-%COMP%]   .category-name[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 1.5rem;\n  font-size: 1.5rem;\n  font-weight: bold;\n  text-align: center;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  text-transform: uppercase;\n}\n.product-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 2rem;\n}\n.product-card-link[_ngcontent-%COMP%] {\n  text-decoration: none;\n  display: block;\n  position: relative;\n  z-index: 1;\n  border-radius: 8px;\n  overflow: hidden;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  padding: 2px;\n  background: #eee;\n}\n.product-card-link[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  z-index: -2;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722,\n      #fd7e14);\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.product-card-link[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 12px 24px rgba(253, 126, 20, 0.2);\n}\n.product-card-link[_ngcontent-%COMP%]:hover::before {\n  opacity: 1;\n}\n.product-card[_ngcontent-%COMP%] {\n  background-color: #ffffff;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.product-image-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 280px;\n  padding: 1rem;\n  background-color: #fff;\n}\n.product-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.product-info[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem;\n  text-align: center;\n  border-top: 1px solid #f0f0f0;\n}\n.product-name[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 0.5rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.product-price[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: #495057;\n  margin: 0;\n}\n@media (max-width: 992px) {\n  .hero-banner[_ngcontent-%COMP%] {\n    height: 50vh;\n    min-height: 350px;\n  }\n  .hero-title[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n  }\n  .category-grid[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 0.75rem;\n  }\n  .category-card[_ngcontent-%COMP%] {\n    flex: 1;\n    height: 220px;\n  }\n  .category-name[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n    padding: 1.25rem;\n  }\n}\n@media (max-width: 768px) {\n  .hero-banner[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 2.1rem;\n    margin-bottom: 1.5rem;\n  }\n  .home-container[_ngcontent-%COMP%]   .featured-content[_ngcontent-%COMP%] {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n  }\n  .home-container[_ngcontent-%COMP%]   .featured-content[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n    text-align: center;\n  }\n  .product-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n    padding: 0 1.5rem;\n  }\n  .product-name[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .product-price[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .category-grid[_ngcontent-%COMP%] {\n    display: flex;\n    gap: 0.75rem;\n  }\n  .category-grid.has-scroll[_ngcontent-%COMP%] {\n    display: grid;\n    grid-auto-flow: column;\n    grid-auto-columns: 80vw;\n    gap: 1rem;\n    overflow-x: auto;\n    scroll-snap-type: x mandatory;\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }\n  .category-grid.has-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .category-card[_ngcontent-%COMP%] {\n    height: auto;\n    width: 100%;\n    flex-shrink: 0;\n  }\n  .category-grid.has-scroll[_ngcontent-%COMP%]   .category-card[_ngcontent-%COMP%] {\n    scroll-snap-align: start;\n    height: auto;\n  }\n  .category-card[_ngcontent-%COMP%]   .category-image[_ngcontent-%COMP%] {\n    aspect-ratio: 4/3;\n  }\n  .category-name[_ngcontent-%COMP%] {\n    position: static;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-height: 50px;\n    font-size: 1.1rem;\n    padding: 0.5rem;\n    line-height: 1.2;\n    height: auto;\n  }\n}\n/*# sourceMappingURL=home.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{ selector: "app-home", standalone: true, imports: [CommonModule, RouterModule, CurrencyPipe], template: `<div class="home-page">
  @if (heroBanner$ | async; as banner) {
    @if (banner.imageUrl) {
      <section class="hero-banner" [style.backgroundImage]="'url(' + banner.imageUrl + ')'">
        <div class="hero-content">
          @if (banner.title) {
            <h1 class="hero-title">{{ banner.title }}</h1>
          }
          @if (banner.buttonText && banner.buttonLink) {
            <a [routerLink]="banner.buttonLink" class="btn hero-btn">
              {{ banner.buttonText }}
            </a>
          }
        </div>
      </section>
    }

    <div class="home-container">
      @if (banner.featuredCategories && banner.featuredCategories.length > 0) {
        <section class="featured-content py-5">
          <h2 class="section-title">Categor\xEDas Destacadas</h2>
          <div
            class="category-grid"
            [ngClass]="{'has-scroll': banner.featuredCategories.length > 2}">
            @for (category of banner.featuredCategories; track $index) {
              <a [routerLink]="['/shop/catalog']" [queryParams]="{ category: category.categoryId }" class="category-card">
                <div class="category-image" [style.backgroundImage]="'url(' + category.imageUrl + ')'"></div>
                <span class="category-name">{{ category.name }}</span>
              </a>
            }
          </div>
        </section>
      }
    </div>
  }

  <div class="home-container">
    <section class="featured-content py-5">
      <h2 class="section-title">Nuevos Ingresos</h2>
      @if (newArrivals$ | async; as products) {
        <div class="product-grid">
          @for (product of products; track product.id) {
            <a [routerLink]="['/shop/product', product.id]" class="product-card-link">
              <div class="product-card">
                <div class="product-image-wrapper">
                  <img [src]="product.image" [alt]="product.name" class="product-image">
                </div>
                <div class="product-info">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-price">{{ product.price | currency:'ARS':'$' }}</p>
                </div>
              </div>
            </a>
          } @empty {
            <p class="text-center text-muted empty-state">No hay productos nuevos para mostrar en este momento.</p>
          }
        </div>
      } @else {
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
      }
    </section>
  </div>
</div>
`, styles: ['/* src/app/features/shop/components/home/home.component.scss */\n:host {\n  display: block;\n  background-color: #f4f5f7;\n  color: #333;\n}\n@keyframes rotate-gradient {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.home-page {\n  width: 100%;\n}\n.home-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1.5rem;\n}\n.hero-banner {\n  width: 100%;\n  height: 60vh;\n  min-height: 400px;\n  background-size: cover;\n  background-position: center center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  position: relative;\n  padding: 2rem 1.5rem;\n}\n.hero-banner::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.25);\n}\n.hero-content {\n  position: relative;\n  z-index: 1;\n  max-width: 800px;\n  color: #fff;\n}\n.hero-title {\n  font-size: 3rem;\n  font-weight: 700;\n  margin-bottom: 1.5rem;\n  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);\n}\n.hero-btn {\n  padding: 0.75rem 2rem;\n  border: none;\n  border-radius: 50px;\n  font-size: 1rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  cursor: pointer;\n  color: #fff;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.hero-btn:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 6px 15px rgba(255, 87, 34, 0.3);\n}\n.section-title {\n  text-align: center;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 3rem;\n  color: #333;\n}\n.category-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 2rem;\n}\n.category-card {\n  display: block;\n  position: relative;\n  height: 380px;\n  border-radius: 8px;\n  overflow: hidden;\n  text-decoration: none;\n  color: white;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.category-card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);\n}\n.category-card .category-image {\n  width: 100%;\n  height: 100%;\n  background-size: cover;\n  background-position: center;\n  transition: transform 0.3s ease;\n}\n.category-card:hover .category-image {\n  transform: scale(1.05);\n}\n.category-card .category-name {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 1.5rem;\n  font-size: 1.5rem;\n  font-weight: bold;\n  text-align: center;\n  background:\n    linear-gradient(\n      90deg,\n      #fd7e14,\n      #ff5722);\n  text-transform: uppercase;\n}\n.product-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 2rem;\n}\n.product-card-link {\n  text-decoration: none;\n  display: block;\n  position: relative;\n  z-index: 1;\n  border-radius: 8px;\n  overflow: hidden;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  padding: 2px;\n  background: #eee;\n}\n.product-card-link::before {\n  content: "";\n  position: absolute;\n  z-index: -2;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background:\n    linear-gradient(\n      45deg,\n      #fd7e14,\n      #ff5722,\n      #fd7e14);\n  opacity: 0;\n  transition: opacity 0.4s ease-in-out;\n}\n.product-card-link:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 12px 24px rgba(253, 126, 20, 0.2);\n}\n.product-card-link:hover::before {\n  opacity: 1;\n}\n.product-card {\n  background-color: #ffffff;\n  border-radius: 6px;\n  overflow: hidden;\n}\n.product-image-wrapper {\n  width: 100%;\n  height: 280px;\n  padding: 1rem;\n  background-color: #fff;\n}\n.product-image {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.product-info {\n  padding: 1rem 1.25rem;\n  text-align: center;\n  border-top: 1px solid #f0f0f0;\n}\n.product-name {\n  color: #333;\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 0.5rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.product-price {\n  font-size: 1.1rem;\n  font-weight: 500;\n  color: #495057;\n  margin: 0;\n}\n@media (max-width: 992px) {\n  .hero-banner {\n    height: 50vh;\n    min-height: 350px;\n  }\n  .hero-title {\n    font-size: 2.5rem;\n  }\n  .category-grid {\n    display: flex;\n    gap: 0.75rem;\n  }\n  .category-card {\n    flex: 1;\n    height: 220px;\n  }\n  .category-name {\n    font-size: 1.2rem;\n    padding: 1.25rem;\n  }\n}\n@media (max-width: 768px) {\n  .hero-banner {\n    display: none;\n  }\n  .section-title {\n    font-size: 2.1rem;\n    margin-bottom: 1.5rem;\n  }\n  .home-container .featured-content {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n  }\n  .home-container .featured-content .section-title {\n    text-align: center;\n  }\n  .product-grid {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 1rem;\n    padding: 0 1.5rem;\n  }\n  .product-name {\n    font-size: 0.9rem;\n  }\n  .product-price {\n    font-size: 1rem;\n  }\n  .category-grid {\n    display: flex;\n    gap: 0.75rem;\n  }\n  .category-grid.has-scroll {\n    display: grid;\n    grid-auto-flow: column;\n    grid-auto-columns: 80vw;\n    gap: 1rem;\n    overflow-x: auto;\n    scroll-snap-type: x mandatory;\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }\n  .category-grid.has-scroll::-webkit-scrollbar {\n    display: none;\n  }\n  .category-card {\n    height: auto;\n    width: 100%;\n    flex-shrink: 0;\n  }\n  .category-grid.has-scroll .category-card {\n    scroll-snap-align: start;\n    height: auto;\n  }\n  .category-card .category-image {\n    aspect-ratio: 4/3;\n  }\n  .category-name {\n    position: static;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-height: 50px;\n    font-size: 1.1rem;\n    padding: 0.5rem;\n    line-height: 1.2;\n    height: auto;\n  }\n}\n/*# sourceMappingURL=home.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/features/shop/components/home/home.component.ts", lineNumber: 18 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-QZABQZV4.js.map
