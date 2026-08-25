import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import type { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { checkoutGuard } from './checkout.guard';

describe('checkoutGuard', () => {
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    cartServiceSpy = jasmine.createSpyObj('CartService', ['itemCount']);
    routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    routerSpy.createUrlTree.and.returnValue({} as UrlTree);

    TestBed.configureTestingModule({
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should redirect to /shop/cart when cart is empty (itemCount === 0)', () => {
    const dummyUrlTree = {} as UrlTree;
    cartServiceSpy.itemCount.and.returnValue(0);
    routerSpy.createUrlTree.and.returnValue(dummyUrlTree);

    TestBed.runInInjectionContext(() => {
      const result = checkoutGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      expect(result).toBe(dummyUrlTree);
      expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/cart']);
    });
  });

  it('should allow access (return true) when cart has items (itemCount > 0)', () => {
    cartServiceSpy.itemCount.and.returnValue(3);

    TestBed.runInInjectionContext(() => {
      const result = checkoutGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

      expect(result).toBe(true);
      expect(routerSpy.createUrlTree).not.toHaveBeenCalled();
    });
  });
});
