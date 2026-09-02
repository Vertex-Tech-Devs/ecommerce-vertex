import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
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

  it('should toggle collapsible sections', () => {
    expect(component.isExpanded('catalog')).toBeTrue();
    component.toggleSection('catalog');
    expect(component.isExpanded('catalog')).toBeFalse();
    component.toggleSection('catalog');
    expect(component.isExpanded('catalog')).toBeTrue();
  });

  it('should emit linkClicked on onLinkClick', () => {
    spyOn(component.linkClicked, 'emit');
    component.onLinkClick();
    expect(component.linkClicked.emit).toHaveBeenCalled();
  });

  it('should auto-expand for various URLs and check section active', () => {
    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/products',
    );
    expect(component.isExpanded('catalog')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/categories',
    );
    expect(component.isExpanded('catalog')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/attributes',
    );
    expect(component.isExpanded('catalog')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/orders',
    );
    expect(component.isExpanded('sales')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/customers',
    );
    expect(component.isExpanded('sales')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/branches',
    );
    expect(component.isExpanded('locations')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/header-management',
    );
    expect(component.isExpanded('onlineStore')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/home-management',
    );
    expect(component.isExpanded('onlineStore')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/footer-management',
    );
    expect(component.isExpanded('onlineStore')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/about-management',
    );
    expect(component.isExpanded('onlineStore')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/store-config',
    );
    expect(component.isExpanded('settings')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/email-management',
    );
    expect(component.isExpanded('settings')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl(
      '/admin/_dev',
    );
    expect(component.isExpanded('settings')).toBeTrue();

    (component as unknown as { autoExpandForUrl: (u: string) => void }).autoExpandForUrl('/other');

    expect(component.isSectionActive(['/admin/test'])).toBeFalse();
  });
});
