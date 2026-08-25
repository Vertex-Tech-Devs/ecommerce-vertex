import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import type {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateFn,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';
import { map, take } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    take(1),
    map((isAuth) => (isAuth ? true : router.createUrlTree(['/admin/login']))),
  );
};

describe('AuthGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    routerSpy.createUrlTree.and.returnValue({} as UrlTree);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should allow access if user is authenticated', (done) => {
    authServiceSpy.isAuthenticated.and.returnValue(of(true));

    TestBed.runInInjectionContext(() => {
      const result = AuthGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ) as Observable<UrlTree | boolean>;

      result.subscribe((val) => {
        expect(val).toBe(true);
        done();
      });
    });
  });

  it('should redirect to /admin/login if user is not authenticated', (done) => {
    const dummyUrlTree = {} as UrlTree;
    authServiceSpy.isAuthenticated.and.returnValue(of(false));
    routerSpy.createUrlTree.and.returnValue(dummyUrlTree);

    TestBed.runInInjectionContext(() => {
      const result = AuthGuard(
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
