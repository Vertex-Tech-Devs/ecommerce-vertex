/// <reference types="jasmine" />

/**
 * 🧪 Testing Utilities y Helpers
 * 
 * Colección de funciones y mocks reutilizables para facilitar el testing
 */

import { of, Observable, throwError } from 'rxjs';
import { Product } from '../../core/models/product.model';

// ============================================================================
// MOCK DATA FACTORIES
// ============================================================================

/**
 * Factory para crear productos de prueba
 */
export function createMockProduct(overrides?: Partial<Product>): Product {
  return {
    id: '1',
    name: 'Test Product',
    description: 'A test product',
    price: 100,
    categoryId: 'cat1',
    variants: [],
    inStock: true,
    image: 'test.jpg',
    ...overrides
  } as Product;
}

/**
 * Factory para crear múltiples productos de prueba
 */
export function createMockProducts(count: number = 3): Product[] {
  return Array.from({ length: count }, (_, i) => 
    createMockProduct({
      id: `${i + 1}`,
      name: `Product ${i + 1}`,
      price: (i + 1) * 100
    })
  );
}

/**
 * Factory para crear usuario de prueba
 */
export function createMockUser(overrides?: any): any {
  return {
    uid: 'user-123',
    email: 'test@example.com',
    displayName: 'Test User',
    roles: ['user'],
    ...overrides
  };
}

/**
 * Factory para crear usuario admin
 */
export function createMockAdmin(overrides?: any): any {
  return createMockUser({
    roles: ['admin'],
    ...overrides
  });
}

// ============================================================================
// SERVICE MOCKS
// ============================================================================

/**
 * Crear mock de ProductService
 */
export function createMockProductService(): any {
  return {
    getProducts: jasmine.createSpy('getProducts').and.returnValue(of(createMockProducts())),
    getProductById: jasmine.createSpy('getProductById').and.returnValue(of(createMockProduct())),
    createProduct: jasmine.createSpy('createProduct').and.returnValue(of(createMockProduct())),
    updateProduct: jasmine.createSpy('updateProduct').and.returnValue(of(createMockProduct())),
    deleteProduct: jasmine.createSpy('deleteProduct').and.returnValue(of(void 0)),
    getProductsByQuery: jasmine.createSpy('getProductsByQuery').and.returnValue(of(createMockProducts()))
  };
}

/**
 * Crear mock de AuthService
 */
export function createMockAuthService(): any {
  return {
    login: jasmine.createSpy('login').and.returnValue(of({ user: createMockUser() })),
    logout: jasmine.createSpy('logout').and.returnValue(Promise.resolve()),
    isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(of(true)),
    currentUser$: of(createMockUser()),
    isAdmin$: of(false),
    changePassword: jasmine.createSpy('changePassword').and.returnValue(Promise.resolve(true))
  };
}

/**
 * Crear mock de CartService
 */
export function createMockCartService(): any {
  return {
    items: jasmine.createSpy('items').and.returnValue(of([])),
    addItem: jasmine.createSpy('addItem').and.returnValue(of(void 0)),
    removeItem: jasmine.createSpy('removeItem').and.returnValue(of(void 0)),
    clearCart: jasmine.createSpy('clearCart').and.returnValue(of(void 0)),
    getTotal: jasmine.createSpy('getTotal').and.returnValue(of(0))
  };
}

// ============================================================================
// OBSERVABLE HELPERS
// ============================================================================

/**
 * Helper para crear observable de error
 */
export function createErrorObservable(message: string = 'Test error'): Observable<never> {
  return throwError(() => new Error(message));
}

/**
 * Helper para simular delay en observable
 */
export function createDelayedObservable<T>(value: T, delayMs: number = 0): Observable<T> {
  return new Observable(observer => {
    const timeout = setTimeout(() => {
      observer.next(value);
      observer.complete();
    }, delayMs);

    return () => clearTimeout(timeout);
  });
}

// ============================================================================
// COMMON TEST SETUP FUNCTIONS
// ============================================================================

/**
 * Setup común para tests de servicios
 */
export function setupServiceTest(serviceClass: any, mocks?: any) {
  const TestBed = require('@angular/core/testing').TestBed;
  const providers = [serviceClass];
  
  if (mocks) {
    Object.entries(mocks).forEach(([key, value]) => {
      providers.push({ provide: key, useValue: value });
    });
  }

  TestBed.configureTestingModule({ providers });
  return TestBed.inject(serviceClass);
}

/**
 * Setup común para tests de componentes
 */
export function setupComponentTest(componentClass: any, mocks?: any) {
  const TestBed = require('@angular/core/testing').TestBed;
  const imports = [componentClass];
  const providers = [];

  if (mocks) {
    Object.entries(mocks).forEach(([key, value]) => {
      providers.push({ provide: key, useValue: value });
    });
  }

  TestBed.configureTestingModule({ 
    imports,
    providers 
  });
  
  const fixture = TestBed.createComponent(componentClass);
  return { fixture, component: fixture.componentInstance };
}

// ============================================================================
// ASSERTION HELPERS
// ============================================================================

/**
 * Helper para asertar que dos productos son iguales
 */
export function expectProductsEqual(actual: Product, expected: Product) {
  expect(actual.id).toBe(expected.id);
  expect(actual.name).toBe(expected.name);
  expect(actual.price).toBe(expected.price);
}

/**
 * Helper para asertar que dos usuarios son iguales
 */
export function expectUsersEqual(actual: any, expected: any) {
  expect(actual.uid).toBe(expected.uid);
  expect(actual.email).toBe(expected.email);
  expect(actual.roles).toEqual(expected.roles);
}

// ============================================================================
// DOM QUERY HELPERS
// ============================================================================

/**
 * Helper para buscar elementos por selector
 */
export function findByCss(fixture: any, selector: string): any {
  return fixture.debugElement.query((el: any) => 
    el.nativeElement.matches(selector)
  );
}

/**
 * Helper para buscar todos los elementos por selector
 */
export function findAllByCss(fixture: any, selector: string): any[] {
  return fixture.debugElement.queryAll((el: any) => 
    el.nativeElement.matches(selector)
  );
}

/**
 * Helper para obtener texto de un elemento
 */
export function getTextContent(fixture: any, selector: string): string {
  const element = fixture.debugElement.query((el: any) => 
    el.nativeElement.matches(selector)
  );
  return element ? element.nativeElement.textContent.trim() : '';
}

// ============================================================================
// ASYNC HELPERS
// ============================================================================

/**
 * Helper para esperar un tiempo determinado
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Helper para simular cambios de detección en Angular
 */
export function detectChanges(fixture: any): void {
  fixture.detectChanges();
}

/**
 * Helper para simular cambios de detección y esperar
 */
export async function detectChangesAndWait(fixture: any, ms: number = 0): Promise<void> {
  fixture.detectChanges();
  await wait(ms);
  fixture.detectChanges();
}
