import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import type { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DevGuard } from './dev.guard';
import { environment } from '../../../environments/environment';

describe('DevGuard (Seed Data Guard)', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let originalSeedDataEnabled: boolean;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    originalSeedDataEnabled = environment.features.seedDataEnabled;

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }],
    });
  });

  afterEach(() => {
    environment.features.seedDataEnabled = originalSeedDataEnabled;
  });

  it('should allow access when seedDataEnabled is true', () => {
    environment.features.seedDataEnabled = true;

    TestBed.runInInjectionContext(() => {
      const result = DevGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      expect(result).toBe(true);
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  it('should navigate to /admin/dashboard and return false when seedDataEnabled is false', () => {
    environment.features.seedDataEnabled = false;

    TestBed.runInInjectionContext(() => {
      const result = DevGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      expect(result).toBe(false);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/dashboard']);
    });
  });
});
