import { By } from '@angular/platform-browser';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [provideRouter([])],
    }).compileComponents();

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

  it('should define exactly 4 semantic navigation sections in navSections', () => {
    expect(component.navSections.length).toBe(4);
    expect(component.navSections.map((s) => s.title)).toEqual([
      'PRINCIPAL',
      'CATÁLOGO',
      'TIENDA ONLINE',
      'CONFIGURACIÓN',
    ]);
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
    const titleElements = fixture.debugElement.queryAll(By.css('.nav-section-title'));
    expect(titleElements.length).toBe(4);

    const renderedTitles = titleElements.map((el) =>
      (el.nativeElement.textContent as string).trim(),
    );
    expect(renderedTitles).toEqual(['PRINCIPAL', 'CATÁLOGO', 'TIENDA ONLINE', 'CONFIGURACIÓN']);
  });

  it('should render 11 navigation links with correct routerLink directives', () => {
    const linkElements = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(linkElements.length).toBe(11);

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
