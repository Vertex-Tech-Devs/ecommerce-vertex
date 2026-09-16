import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import type { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NonStaffGuard } from './non-staff.guard';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';

describe('NonStaffGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      isStaff$: of(false),
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

  it('should allow access (return true) if user is not staff', (done) => {
    Object.defineProperty(authServiceSpy, 'isStaff$', { get: () => of(false) });

    TestBed.runInInjectionContext(() => {
      const result = NonStaffGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ) as Observable<UrlTree | boolean>;
      if (typeof result === 'boolean') {
        expect(result).toBe(true);
        done();
      } else {
        result.subscribe((val) => {
          expect(val).toBe(true);
          done();
        });
      }
    });
  });

  it('should redirect to /admin/orders if user is staff', (done) => {
    const dummyUrlTree = {} as UrlTree;
    routerSpy.createUrlTree.and.returnValue(dummyUrlTree);
    Object.defineProperty(authServiceSpy, 'isStaff$', { get: () => of(true) });

    TestBed.runInInjectionContext(() => {
      const result = NonStaffGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ) as Observable<UrlTree | boolean>;
      if (typeof result === 'boolean') {
        fail('Expected observable result');
        done();
      } else {
        result.subscribe((val) => {
          expect(val).toBe(dummyUrlTree);
          expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/admin/orders']);
          done();
        });
      }
    });
  });
});
