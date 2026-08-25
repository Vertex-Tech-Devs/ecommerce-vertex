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
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      isAdmin$: of(false),
    });
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

  it('should redirect to /admin/login if user is not admin', (done) => {
    const dummyUrlTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(dummyUrlTree);

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
});
