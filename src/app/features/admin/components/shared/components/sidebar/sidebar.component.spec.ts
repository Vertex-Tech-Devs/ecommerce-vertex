import { By } from '@angular/platform-browser';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationStart, provideRouter, Router, RouterLink } from '@angular/router';
import type { Subject } from 'rxjs';
import { Sidebar } from './sidebar';
import type { NavSection } from './sidebar';

interface SidebarInternal {
  handleFocusOnCollapse(sectionId: string): void;
  sectionContainsUrl(section: NavSection, url: string): boolean;
  checkAndExpandActiveSection(url: string): void;
}

interface RouterWithEvents {
  _events?: Subject<unknown>;
}

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideRouter([
          { path: 'admin/dashboard', component: Sidebar },
          { path: 'admin/orders', component: Sidebar },
          { path: 'admin/customers', component: Sidebar },
          { path: 'admin/products', component: Sidebar },
          { path: 'admin/categories', component: Sidebar },
          { path: 'admin/attributes', component: Sidebar },
          { path: 'admin/header-announcements', component: Sidebar },
          { path: 'admin/home-management', component: Sidebar },
          { path: 'admin/about-management', component: Sidebar },
          { path: 'admin/footer-management', component: Sidebar },
          { path: 'admin/delivery', component: Sidebar },
          { path: 'admin/store-config', component: Sidebar },
          { path: 'admin/email-management', component: Sidebar },
          { path: '**', component: Sidebar },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create sidebar component', () => {
    expect(component).toBeTruthy();
    expect(component.isOpen).toBeFalse();
  });

  it('should emit linkClicked on onLinkClick', () => {
    spyOn(component.linkClicked, 'emit');
    component.onLinkClick();
    expect(component.linkClicked.emit).toHaveBeenCalled();
  });

  it('should emit linkClicked on onBackdropClick', () => {
    spyOn(component.linkClicked, 'emit');
    component.onBackdropClick();
    expect(component.linkClicked.emit).toHaveBeenCalled();
  });

  it('should define exactly 4 semantic navigation sections in navSections with correct ids and collapsible flags', () => {
    expect(component.navSections.length).toBe(4);
    expect(component.navSections.map((s) => s.id)).toEqual([
      'principal',
      'catalog',
      'online-store',
      'config',
    ]);
    expect(component.navSections.map((s) => s.title)).toEqual([
      'PRINCIPAL',
      'CATÁLOGO',
      'TIENDA ONLINE',
      'CONFIGURACIÓN',
    ]);
    expect(component.navSections.map((s) => s.collapsible)).toEqual([false, false, true, true]);
  });

  it('should have the correct items and routes configured in each section', () => {
    const [principal, catalogo, tiendaOnline, configuracion] = component.navSections;

    expect(principal.items).toEqual([
      {
        label: 'Dashboard',
        route: '/admin/dashboard',
        icon: 'bi-speedometer2',
        exact: true,
      },
      {
        label: 'Pedidos',
        route: '/admin/orders',
        icon: 'bi-box-seam',
      },
      {
        label: 'Clientes',
        route: '/admin/customers',
        icon: 'bi-people',
      },
    ]);

    expect(catalogo.items).toEqual([
      {
        label: 'Productos',
        route: '/admin/products',
        icon: 'bi-tags',
      },
      {
        label: 'Categorías',
        route: '/admin/categories',
        icon: 'bi-grid',
      },
      {
        label: 'Atributos',
        route: '/admin/attributes',
        icon: 'bi-palette',
      },
    ]);

    expect(tiendaOnline.items).toEqual([
      {
        label: 'Encabezado y Anuncios',
        route: '/admin/header-announcements',
        icon: 'bi-window-stack',
      },
      {
        label: 'Inicio / Portada',
        route: '/admin/home-management',
        icon: 'bi-window',
      },
      {
        label: 'Quiénes Somos',
        route: '/admin/about-management',
        icon: 'bi-info-circle',
      },
      {
        label: 'Pie de Página',
        route: '/admin/footer-management',
        icon: 'bi-layout-text-window-reverse',
      },
    ]);

    expect(configuracion.items).toEqual([
      {
        label: 'Sucursales & Entregas',
        route: '/admin/delivery',
        icon: 'bi-geo-alt',
      },
      {
        label: 'Ajustes Generales',
        route: '/admin/store-config',
        icon: 'bi-gear',
      },
      {
        label: 'Plantillas de Email',
        route: '/admin/email-management',
        icon: 'bi-envelope',
      },
    ]);
  });

  it('should render all 4 section title headers in DOM', () => {
    const titleElements = fixture.debugElement.queryAll(By.css('.sidebar__section-title'));
    expect(titleElements.length).toBe(4);

    const renderedTitles = titleElements.map((el) =>
      (el.nativeElement.textContent as string).trim(),
    );
    expect(renderedTitles).toEqual(['PRINCIPAL', 'CATÁLOGO', 'TIENDA ONLINE', 'CONFIGURACIÓN']);
  });

  it('should keep PRINCIPAL and CATÁLOGO always expanded', () => {
    const principal = component.navSections.find((s) => s.id === 'principal')!;
    const catalogo = component.navSections.find((s) => s.id === 'catalog')!;

    expect(principal.collapsible).toBeFalse();
    expect(catalogo.collapsible).toBeFalse();
    expect(component.isSectionExpanded(principal)).toBeTrue();
    expect(component.isSectionExpanded(catalogo)).toBeTrue();

    const headerButtons = fixture.debugElement.queryAll(By.css('.sidebar__section-header--button'));
    const buttonTexts = headerButtons.map((btn) => btn.nativeElement.textContent.trim());
    expect(buttonTexts).not.toContain('PRINCIPAL');
    expect(buttonTexts).not.toContain('CATÁLOGO');

    const staticHeaders = fixture.debugElement.queryAll(
      By.css('div.sidebar__section-header .sidebar__section-title'),
    );
    const staticTitles = staticHeaders.map((el) => el.nativeElement.textContent.trim());
    expect(staticTitles).toEqual(['PRINCIPAL', 'CATÁLOGO']);
  });

  it('should initialize TIENDA ONLINE and CONFIGURACIÓN as collapsed when active route does not match', () => {
    const onlineStore = component.navSections.find((s) => s.id === 'online-store')!;
    const config = component.navSections.find((s) => s.id === 'config')!;

    expect(onlineStore.collapsible).toBeTrue();
    expect(config.collapsible).toBeTrue();

    expect(component.activeExpandedSectionId()).toBeNull();

    expect(component.isSectionExpanded(onlineStore)).toBeFalse();
    expect(component.isSectionExpanded(config)).toBeFalse();

    const buttons = fixture.debugElement.queryAll(By.css('.sidebar__section-header--button'));
    expect(buttons.length).toBe(2);

    buttons.forEach((btn) => {
      expect(btn.attributes['aria-expanded']).toBe('false');
      const chevron = btn.query(By.css('.sidebar__chevron'));
      expect(chevron.classes['sidebar__chevron--expanded']).toBeFalsy();
    });
  });

  it('should toggle activeExpandedSectionId signal and aria-expanded when clicking collapsible section button', () => {
    const onlineStore = component.navSections.find((s) => s.id === 'online-store')!;
    const buttons = fixture.debugElement.queryAll(By.css('.sidebar__section-header--button'));
    const onlineStoreButton = buttons[0];

    expect(onlineStoreButton.nativeElement.textContent).toContain('TIENDA ONLINE');
    expect(component.activeExpandedSectionId()).toBeNull();
    expect(onlineStoreButton.attributes['aria-expanded']).toBe('false');

    // Click to expand
    onlineStoreButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.activeExpandedSectionId()).toBe('online-store');
    expect(component.isSectionExpanded(onlineStore)).toBeTrue();
    expect(onlineStoreButton.attributes['aria-expanded']).toBe('true');

    const expandedChevron = onlineStoreButton.query(By.css('.sidebar__chevron'));
    expect(expandedChevron.classes['sidebar__chevron--expanded']).toBeTrue();

    // Click to collapse
    onlineStoreButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.activeExpandedSectionId()).toBeNull();
    expect(component.isSectionExpanded(onlineStore)).toBeFalse();
    expect(onlineStoreButton.attributes['aria-expanded']).toBe('false');

    const collapsedChevron = onlineStoreButton.query(By.css('.sidebar__chevron'));
    expect(collapsedChevron.classes['sidebar__chevron--expanded']).toBeFalsy();
  });

  it('should implement complete WAI-ARIA disclosure attributes and inert regions', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.sidebar__section-header--button'));
    const onlineStoreBtn = buttons[0];
    const configBtn = buttons[1];

    expect(onlineStoreBtn.attributes['id']).toBe('btn-section-online-store');
    expect(onlineStoreBtn.attributes['aria-controls']).toBe('region-online-store');
    expect(onlineStoreBtn.attributes['aria-expanded']).toBe('false');

    expect(configBtn.attributes['id']).toBe('btn-section-config');
    expect(configBtn.attributes['aria-controls']).toBe('region-config');
    expect(configBtn.attributes['aria-expanded']).toBe('false');

    const regions = fixture.debugElement.queryAll(By.css('.nav-section__collapse'));
    expect(regions.length).toBe(2);

    const onlineStoreRegion = regions[0];
    const configRegion = regions[1];

    expect(onlineStoreRegion.attributes['id']).toBe('region-online-store');
    expect(onlineStoreRegion.attributes['role']).toBe('region');
    expect(onlineStoreRegion.attributes['aria-labelledby']).toBe('btn-section-online-store');
    expect(onlineStoreRegion.nativeElement.hasAttribute('inert')).toBeTrue();

    expect(configRegion.attributes['id']).toBe('region-config');
    expect(configRegion.attributes['role']).toBe('region');
    expect(configRegion.attributes['aria-labelledby']).toBe('btn-section-config');
    expect(configRegion.nativeElement.hasAttribute('inert')).toBeTrue();

    const nestedLists = fixture.debugElement.queryAll(By.css('.nav-section__items--nested'));
    expect(nestedLists.length).toBe(2);
  });

  it('should preserve all 13 links in DOM with inert and update expansion classes without destroying nodes', () => {
    const allLinks = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(allLinks.length).toBe(13);

    const onlineRegion: HTMLElement = fixture.debugElement.query(
      By.css('#region-online-store'),
    ).nativeElement;
    expect(onlineRegion.hasAttribute('inert')).toBeTrue();
    expect(onlineRegion.classList.contains('nav-section__collapse--expanded')).toBeFalse();

    // Expand online-store
    component.toggleSection('online-store');
    fixture.detectChanges();

    expect(onlineRegion.hasAttribute('inert')).toBeFalse();
    expect(onlineRegion.classList.contains('nav-section__collapse--expanded')).toBeTrue();
  });

  it('should enforce Single-Expansion Accordion behavior when route does not belong to the other section', () => {
    const onlineStoreSection = component.navSections.find((s) => s.id === 'online-store')!;
    const configSection = component.navSections.find((s) => s.id === 'config')!;

    // Open online-store first
    component.toggleSection('online-store');
    fixture.detectChanges();

    expect(component.activeExpandedSectionId()).toBe('online-store');
    expect(component.isSectionExpanded(onlineStoreSection)).toBeTrue();
    expect(component.isSectionExpanded(configSection)).toBeFalse();

    // Open config (active route is /admin/dashboard or default, not online-store)
    component.toggleSection('config');
    fixture.detectChanges();

    // online-store should automatically collapse
    expect(component.activeExpandedSectionId()).toBe('config');
    expect(component.isSectionExpanded(onlineStoreSection)).toBeFalse();
    expect(component.isSectionExpanded(configSection)).toBeTrue();
  });

  it('should close previously active section when opening another section even if holding active route', async () => {
    // Navigate to a route inside online-store
    await router.navigateByUrl('/admin/header-announcements');
    fixture.detectChanges();

    const onlineStoreSection = component.navSections.find((s) => s.id === 'online-store')!;
    const configSection = component.navSections.find((s) => s.id === 'config')!;

    expect(component.activeExpandedSectionId()).toBe('online-store');
    expect(component.isSectionExpanded(onlineStoreSection)).toBeTrue();
    expect(component.isSectionExpanded(configSection)).toBeFalse();

    // Open config while user is currently inside online-store route
    component.toggleSection('config');
    fixture.detectChanges();

    // Strict exclusive accordion: only config is open, online-store is closed
    expect(component.activeExpandedSectionId()).toBe('config');
    expect(component.isSectionExpanded(onlineStoreSection)).toBeFalse();
    expect(component.isSectionExpanded(configSection)).toBeTrue();
  });

  it('should collapse active section to null when toggling an already active section', () => {
    component.toggleSection('online-store');
    expect(component.activeExpandedSectionId()).toBe('online-store');

    component.toggleSection('online-store');
    expect(component.activeExpandedSectionId()).toBeNull();
  });

  it('should return focus to header trigger button when child element inside collapsing section is active', () => {
    const onlineStoreBtn = fixture.debugElement.query(
      By.css('#btn-section-online-store'),
    ).nativeElement;
    spyOn(onlineStoreBtn, 'focus');

    // Expand online-store
    component.toggleSection('online-store');
    fixture.detectChanges();

    // Mock active element inside region-online-store
    const firstLink = fixture.debugElement.query(
      By.css('#region-online-store .sidebar__link'),
    ).nativeElement;
    spyOnProperty(document, 'activeElement', 'get').and.returnValue(firstLink);

    // Collapse section
    component.toggleSection('online-store');
    fixture.detectChanges();

    expect(onlineStoreBtn.focus).toHaveBeenCalled();
  });

  it('should auto-expand CONFIGURACIÓN when simulated navigation occurs to /admin/store-config', async () => {
    const configSection = component.navSections.find((s) => s.id === 'config')!;
    const onlineStoreSection = component.navSections.find((s) => s.id === 'online-store')!;
    expect(component.isSectionExpanded(configSection)).toBeFalse();

    await router.navigateByUrl('/admin/store-config');
    fixture.detectChanges();

    expect(component.activeExpandedSectionId()).toBe('config');
    expect(component.isSectionExpanded(configSection)).toBeTrue();
    expect(component.isSectionExpanded(onlineStoreSection)).toBeFalse();

    const configButton = fixture.debugElement.queryAll(
      By.css('.sidebar__section-header--button'),
    )[1];
    expect(configButton.attributes['aria-expanded']).toBe('true');
  });

  it('should activate only parent section when navigating between internal collapsible routes', async () => {
    await router.navigateByUrl('/admin/home-management');
    fixture.detectChanges();

    const onlineStoreSection = component.navSections.find((s) => s.id === 'online-store')!;
    const configSection = component.navSections.find((s) => s.id === 'config')!;

    expect(component.activeExpandedSectionId()).toBe('online-store');
    expect(component.isSectionExpanded(onlineStoreSection)).toBeTrue();
    expect(component.isSectionExpanded(configSection)).toBeFalse();

    await router.navigateByUrl('/admin/delivery');
    fixture.detectChanges();

    expect(component.activeExpandedSectionId()).toBe('config');
    expect(component.isSectionExpanded(onlineStoreSection)).toBeFalse();
    expect(component.isSectionExpanded(configSection)).toBeTrue();
  });

  it('should auto-expand matching section upon initial creation if router url already matches', async () => {
    await router.navigateByUrl('/admin/home-management');
    const newFixture = TestBed.createComponent(Sidebar);
    const newComp = newFixture.componentInstance;
    newFixture.detectChanges();

    const onlineStoreSection = newComp.navSections.find((s) => s.id === 'online-store')!;
    const configSection = newComp.navSections.find((s) => s.id === 'config')!;
    expect(newComp.activeExpandedSectionId()).toBe('online-store');
    expect(newComp.isSectionExpanded(onlineStoreSection)).toBeTrue();
    expect(newComp.isSectionExpanded(configSection)).toBeFalse();
  });

  it('should emit linkClicked when a navigation link is clicked in DOM', () => {
    spyOn(component.linkClicked, 'emit');

    const firstLink = fixture.debugElement.query(By.css('.sidebar__link'));
    expect(firstLink).toBeTruthy();

    firstLink.nativeElement.click();
    expect(component.linkClicked.emit).toHaveBeenCalled();
  });

  it('should toggle sidebar--open class based on isOpen input', () => {
    const navElement: HTMLElement = fixture.debugElement.query(By.css('nav#sidebar')).nativeElement;
    expect(navElement.classList.contains('sidebar--open')).toBeFalse();

    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    expect(navElement.classList.contains('sidebar--open')).toBeTrue();

    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();
    expect(navElement.classList.contains('sidebar--open')).toBeFalse();
  });

  describe('Branch coverage & Edge cases', () => {
    let internal: SidebarInternal;

    beforeEach(() => {
      internal = component as unknown as SidebarInternal;
    });

    describe('handleFocusOnCollapse', () => {
      it('should return immediately when document.activeElement is null', () => {
        spyOnProperty(document, 'activeElement', 'get').and.returnValue(null);
        spyOn(document, 'getElementById');

        internal.handleFocusOnCollapse('online-store');

        expect(document.getElementById).not.toHaveBeenCalled();
      });

      it('should not focus trigger button when active element is outside collapsing region', () => {
        const triggerBtn = fixture.debugElement.query(By.css('#btn-section-online-store'))
          .nativeElement as HTMLElement;
        spyOn(triggerBtn, 'focus');

        spyOnProperty(document, 'activeElement', 'get').and.returnValue(document.body);

        internal.handleFocusOnCollapse('online-store');

        expect(triggerBtn.focus).not.toHaveBeenCalled();
      });

      it('should handle safely when region element does not exist in DOM', () => {
        spyOnProperty(document, 'activeElement', 'get').and.returnValue(document.body);

        expect(() => {
          internal.handleFocusOnCollapse('non-existent-section');
        }).not.toThrow();
      });

      it('should handle safely when trigger button does not exist in DOM', () => {
        const firstLink = fixture.debugElement.query(
          By.css('#region-online-store .sidebar__link'),
        ).nativeElement;
        spyOnProperty(document, 'activeElement', 'get').and.returnValue(firstLink);
        spyOn(document, 'getElementById').and.callFake((id: string) => {
          if (id === 'region-online-store') {
            return fixture.debugElement.query(By.css('#region-online-store')).nativeElement;
          }
          return null;
        });

        expect(() => {
          internal.handleFocusOnCollapse('online-store');
        }).not.toThrow();
      });
    });

    describe('sectionContainsUrl', () => {
      it('should return false if url is empty string or null/undefined', () => {
        const configSection = component.navSections.find((s) => s.id === 'config')!;
        expect(internal.sectionContainsUrl(configSection, '')).toBeFalse();
        expect(internal.sectionContainsUrl(configSection, null as unknown as string)).toBeFalse();
      });

      it('should return false when section has no items', () => {
        const emptySection: NavSection = {
          id: 'empty',
          title: 'EMPTY',
          collapsible: true,
          items: [],
        };
        expect(internal.sectionContainsUrl(emptySection, '/admin/dashboard')).toBeFalse();
      });

      it('should correctly match URLs containing query parameters and hash fragments', () => {
        const configSection = component.navSections.find((s) => s.id === 'config')!;
        expect(
          internal.sectionContainsUrl(configSection, '/admin/delivery?tab=rates#top'),
        ).toBeTrue();
      });

      it('should correctly handle exact: true matching and non-matching routes', () => {
        const exactSection: NavSection = {
          id: 'exact-test',
          title: 'EXACT',
          items: [
            {
              label: 'Exact Dashboard',
              route: '/admin/dashboard',
              icon: 'bi-speedometer2',
              exact: true,
            },
          ],
        };
        expect(internal.sectionContainsUrl(exactSection, '/admin/dashboard')).toBeTrue();
        expect(internal.sectionContainsUrl(exactSection, '/admin/dashboard/subpath')).toBeFalse();
        expect(internal.sectionContainsUrl(exactSection, '/admin/other')).toBeFalse();
      });

      it('should correctly handle prefix matching for non-exact items', () => {
        const configSection = component.navSections.find((s) => s.id === 'config')!;
        expect(internal.sectionContainsUrl(configSection, '/admin/delivery')).toBeTrue();
        expect(internal.sectionContainsUrl(configSection, '/admin/delivery/subzone')).toBeTrue();
        expect(internal.sectionContainsUrl(configSection, '/admin/delivery-extra')).toBeFalse();
        expect(internal.sectionContainsUrl(configSection, '/admin/not-found')).toBeFalse();
      });
    });

    describe('toggleSection edge cases', () => {
      it('should safely ignore non-collapsible sections when expanding', () => {
        component.toggleSection('principal');
        expect(component.activeExpandedSectionId()).toBeNull();
      });

      it('should safely ignore non-existent section id when expanding', () => {
        component.toggleSection('non-existent');
        expect(component.activeExpandedSectionId()).toBeNull();
      });
    });

    describe('checkAndExpandActiveSection', () => {
      it('should return immediately when url is empty or falsy', () => {
        const setSpy = spyOn(component.activeExpandedSectionId, 'set');
        internal.checkAndExpandActiveSection('');
        internal.checkAndExpandActiveSection(null as unknown as string);
        expect(setSpy).not.toHaveBeenCalled();
      });

      it('should set activeExpandedSectionId when matching collapsible section is found', () => {
        expect(component.activeExpandedSectionId()).toBeNull();
        internal.checkAndExpandActiveSection('/admin/store-config');
        expect(component.activeExpandedSectionId()).toBe('config');
      });

      it('should keep current activeExpandedSectionId when route does not belong to any collapsible section', () => {
        component.toggleSection('config');
        expect(component.activeExpandedSectionId()).toBe('config');

        internal.checkAndExpandActiveSection('/admin/dashboard');
        expect(component.activeExpandedSectionId()).toBe('config');
      });
    });

    describe('router event stream and fallback', () => {
      it('should fallback to event.url when event.urlAfterRedirects is empty or falsy', () => {
        const routerEvents = (router as unknown as RouterWithEvents)._events;
        expect(component.activeExpandedSectionId()).toBeNull();

        if (routerEvents) {
          routerEvents.next(new NavigationEnd(42, '/admin/store-config', ''));
          expect(component.activeExpandedSectionId()).toBe('config');
        } else {
          internal.checkAndExpandActiveSection('/admin/store-config');
          expect(component.activeExpandedSectionId()).toBe('config');
        }
      });

      it('should ignore router events that are not NavigationEnd instances', () => {
        const routerEvents = (router as unknown as RouterWithEvents)._events;
        const setSpy = spyOn(component.activeExpandedSectionId, 'set');

        if (routerEvents) {
          routerEvents.next(new NavigationStart(43, '/admin/store-config'));
          expect(setSpy).not.toHaveBeenCalled();
        }
      });
    });
  });
});
