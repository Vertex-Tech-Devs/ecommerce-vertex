import { By } from '@angular/platform-browser';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { Sidebar } from './sidebar';

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

    expect(component.expandedSections()['online-store']).toBeFalse();
    expect(component.expandedSections()['config']).toBeFalse();

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

  it('should toggle expandedSections signal and aria-expanded when clicking collapsible section button', () => {
    const onlineStore = component.navSections.find((s) => s.id === 'online-store')!;
    const buttons = fixture.debugElement.queryAll(By.css('.sidebar__section-header--button'));
    const onlineStoreButton = buttons[0];

    expect(onlineStoreButton.nativeElement.textContent).toContain('TIENDA ONLINE');
    expect(component.expandedSections()['online-store']).toBeFalse();
    expect(onlineStoreButton.attributes['aria-expanded']).toBe('false');

    // Click to expand
    onlineStoreButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.expandedSections()['online-store']).toBeTrue();
    expect(component.isSectionExpanded(onlineStore)).toBeTrue();
    expect(onlineStoreButton.attributes['aria-expanded']).toBe('true');

    const expandedChevron = onlineStoreButton.query(By.css('.sidebar__chevron'));
    expect(expandedChevron.classes['sidebar__chevron--expanded']).toBeTrue();

    // Click to collapse
    onlineStoreButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.expandedSections()['online-store']).toBeFalse();
    expect(component.isSectionExpanded(onlineStore)).toBeFalse();
    expect(onlineStoreButton.attributes['aria-expanded']).toBe('false');

    const collapsedChevron = onlineStoreButton.query(By.css('.sidebar__chevron'));
    expect(collapsedChevron.classes['sidebar__chevron--expanded']).toBeFalsy();
  });

  it('should auto-expand CONFIGURACIÓN when simulated navigation occurs to /admin/store-config', async () => {
    const configSection = component.navSections.find((s) => s.id === 'config')!;
    expect(component.isSectionExpanded(configSection)).toBeFalse();

    await router.navigateByUrl('/admin/store-config');
    fixture.detectChanges();

    expect(component.expandedSections()['config']).toBeTrue();
    expect(component.isSectionExpanded(configSection)).toBeTrue();

    const configButton = fixture.debugElement.queryAll(
      By.css('.sidebar__section-header--button'),
    )[1];
    expect(configButton.attributes['aria-expanded']).toBe('true');
  });

  it('should auto-expand matching section upon initial creation if router url already matches', async () => {
    await router.navigateByUrl('/admin/home-management');
    const newFixture = TestBed.createComponent(Sidebar);
    const newComp = newFixture.componentInstance;
    newFixture.detectChanges();

    const onlineStoreSection = newComp.navSections.find((s) => s.id === 'online-store')!;
    expect(newComp.expandedSections()['online-store']).toBeTrue();
    expect(newComp.isSectionExpanded(onlineStoreSection)).toBeTrue();
  });

  it('should render 6 navigation links initially and all 13 when collapsible sections are expanded', () => {
    // Initially, only PRINCIPAL (3) and CATÁLOGO (3) are visible
    let linkElements = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(linkElements.length).toBe(6);

    // Expand online-store and config
    component.toggleSection('online-store');
    component.toggleSection('config');
    fixture.detectChanges();

    linkElements = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(linkElements.length).toBe(13);

    const allExpectedRoutes = component.navSections.flatMap((s) => s.items.map((i) => i.route));
    const renderedRoutes = linkElements.map((el) => {
      const routerLinkInstance = el.injector.get(RouterLink);
      return (
        routerLinkInstance.urlTree?.toString() ||
        el.attributes['routerLink'] ||
        el.attributes['ng-reflect-router-link']
      );
    });

    allExpectedRoutes.forEach((route) => {
      const found = renderedRoutes.some((rendered) => rendered?.includes(route));
      expect(found).toBeTrue();
    });
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
});
