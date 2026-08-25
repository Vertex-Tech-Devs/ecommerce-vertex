import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { SeedProductsService } from './seed-products.service';
import type { SeedProduct } from './seed-products.service';

describe('SeedProductsService', () => {
  let service: SeedProductsService;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    firestoreSpy = jasmine.createSpyObj('Firestore', ['type']);

    TestBed.configureTestingModule({
      providers: [SeedProductsService, { provide: Firestore, useValue: firestoreSpy }],
    });

    service = TestBed.inject(SeedProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate variant combinations correctly', () => {
    const serviceRecord = service as unknown as Record<
      string,
      (attrs: unknown[], ids: string[]) => Record<string, string>[]
    >;
    const generateFn = serviceRecord['generateVariantCombinations'].bind(service);
    const attrs = [
      { id: 'attr-1', name: 'Talle', values: ['S', 'M'] },
      { id: 'attr-2', name: 'Color', values: ['Negro'] },
    ];

    const combos = generateFn(attrs, ['attr-1', 'attr-2']);
    expect(combos.length).toBe(2);
    expect(combos[0]).toEqual({ 'attr-1': 'S', 'attr-2': 'Negro' });
    expect(combos[1]).toEqual({ 'attr-1': 'M', 'attr-2': 'Negro' });

    const emptyCombos = generateFn([], ['attr-1']);
    expect(emptyCombos).toEqual([]);
  });

  it('should seed products given category mappings', fakeAsync(() => {
    spyOn(
      service as unknown as { run: (fn: () => Promise<unknown>) => Promise<unknown> },
      'run',
    ).and.callFake((fn: () => Promise<unknown>) => {
      const str = fn.toString();
      if (str.includes('getDocs')) {
        return Promise.resolve({
          docs: [
            {
              id: 'attr-talle',
              data: () => ({ name: 'Talle (ropa)', values: ['S', 'M'] }),
            },
          ],
        });
      }
      if (str.includes('addDoc')) {
        return Promise.resolve({ id: 'prod-doc-1' });
      }
      return Promise.resolve(undefined);
    });

    const mockCats = {
      remeras: { id: 'cat-remeras', name: 'Remeras' },
    };

    let result: SeedProduct[] | null = null;
    void service.seedProducts(mockCats).then((prods) => {
      result = prods;
    });

    tick();
    expect(result).toBeTruthy();
    expect(Array.isArray(result)).toBeTrue();
  }));
});
