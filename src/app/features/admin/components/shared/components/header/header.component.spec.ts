import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { provideRouter, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { signal } from '@angular/core';
import { Header } from './header';
import { AuthService } from '@core/services/auth.service';
import { StoreConfigService } from '@core/services/store-config.service';

describe('Header (Admin)', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;
  let router: Router;
  let currentUserSubject: BehaviorSubject<{ email?: string } | null>;
  let mockDocument: Document;

  beforeEach(async () => {
    currentUserSubject = new BehaviorSubject<{ email?: string } | null>({
      email: 'admin@vertex.com',
    });

    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      currentUser$: currentUserSubject.asObservable(),
    });
    authServiceSpy.logout.and.returnValue(Promise.resolve());

    storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', [], {
      storeName: signal('Vertex Admin'),
      logoUrl: signal('https://example.com/logo.png'),
    });

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    mockDocument = TestBed.inject(DOCUMENT);

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the admin header component', () => {
    expect(component).toBeTruthy();
    expect(component.storeName()).toBe('Vertex Admin');
    expect(component.logoUrl()).toBe('https://example.com/logo.png');
  });

  describe('userDisplayName', () => {
    it('should extract username from email', () => {
      expect(component.userDisplayName()).toBe('admin');
    });

    it('should return "Usuario" if user or email is missing', () => {
      currentUserSubject.next(null);
      fixture.detectChanges();
      expect(component.userDisplayName()).toBe('Usuario');

      currentUserSubject.next({ email: undefined });
      fixture.detectChanges();
      expect(component.userDisplayName()).toBe('Usuario');
    });
  });

  describe('onToggleSidebar', () => {
    it('should stop propagation and emit toggleSidebarEvent', () => {
      const eventSpy = jasmine.createSpyObj('Event', ['stopPropagation']);
      spyOn(component.toggleSidebarEvent, 'emit');

      component.onToggleSidebar(eventSpy as Event);

      expect(eventSpy.stopPropagation).toHaveBeenCalled();
      expect(component.toggleSidebarEvent.emit).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call authService.logout', () => {
      component.logout();
      expect(authServiceSpy.logout).toHaveBeenCalled();
    });
  });

  describe('scrollToTop', () => {
    it('should scroll elements to top when url is /admin/dashboard', () => {
      spyOnProperty(router, 'url', 'get').and.returnValue('/admin/dashboard?query=1');
      spyOn(window, 'scrollTo');
      spyOn(mockDocument.documentElement, 'scrollTo');
      spyOn(mockDocument.body, 'scrollTo');

      const mockMainContainer = document.createElement('div');
      spyOn(mockMainContainer, 'scrollTo');
      spyOn(mockDocument, 'querySelector').and.callFake((selector: string) => {
        if (selector === '.admin-shell__main') return mockMainContainer;
        return null;
      });

      component.scrollToTop();

      const expectedConfig = { top: 0, behavior: 'smooth' };
      expect(window.scrollTo as jasmine.Spy).toHaveBeenCalledWith(expectedConfig);
      expect(mockDocument.documentElement.scrollTo as jasmine.Spy).toHaveBeenCalledWith(
        expectedConfig,
      );
      expect(mockDocument.body.scrollTo as jasmine.Spy).toHaveBeenCalledWith(expectedConfig);
      expect(mockMainContainer.scrollTo as jasmine.Spy).toHaveBeenCalledWith(expectedConfig);
    });

    it('should scroll when url is /admin or /admin/', () => {
      spyOnProperty(router, 'url', 'get').and.returnValue('/admin');
      spyOn(window, 'scrollTo');

      component.scrollToTop();

      expect(window.scrollTo as jasmine.Spy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should NOT scroll when url is not an admin dashboard route', () => {
      spyOnProperty(router, 'url', 'get').and.returnValue('/admin/products');
      spyOn(window, 'scrollTo');

      component.scrollToTop();

      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });
});
