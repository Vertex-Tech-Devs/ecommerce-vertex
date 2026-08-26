import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import type { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AdminGuard } from './admin.guard';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';

describe('AdminGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated'], {
      isAdmin$: of(false),
    });
    authServiceSpy.isAuthenticated.and.returnValue(of(false));
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    routerSpy.createUrlTree.and.returnValue({} as UrlTree);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should allow access (return true) if user is admin', (done) => {
    Object.defineProperty(authServiceSpy, 'isAdmin$', { get: () => of(true) });

    TestBed.runInInjectionContext(() => {
      const result = AdminGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ) as Observable<UrlTree | boolean>;

      result.subscribe((val) => {
        expect(val).toBe(true);
        done();
      });
    });
  });

  it('should redirect to /admin/login (no params) if user is not authenticated', (done) => {
    const dummyUrlTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(dummyUrlTree);
    // isAdmin$ emits false (default), isAuthenticated returns false → not logged in
    authServiceSpy.isAuthenticated.and.returnValue(of(false));

    TestBed.runInInjectionContext(() => {
      const result = AdminGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ) as Observable<UrlTree | boolean>;

      result.subscribe((val) => {
        expect(val).toBe(dummyUrlTree);
        expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/admin/login']);
        done();
      });
    });
  });

  it('should redirect to /admin/login?unauthorized=1 if user is authenticated but not admin', (done) => {
    const dummyUrlTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(dummyUrlTree);
    // isAdmin$ emits false, but isAuthenticated returns true → logged in, no permissions
    authServiceSpy.isAuthenticated.and.returnValue(of(true));

    TestBed.runInInjectionContext(() => {
      const result = AdminGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ) as Observable<UrlTree | boolean>;

      result.subscribe((val) => {
        expect(val).toBe(dummyUrlTree);
        expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/admin/login'], {
          queryParams: { unauthorized: '1' },
        });
        done();
      });
    });
  });
});
