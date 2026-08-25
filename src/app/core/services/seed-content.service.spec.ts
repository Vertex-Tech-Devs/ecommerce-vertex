import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SeedContentService } from './seed-content.service';
import { StoreConfigService } from './store-config.service';

describe('SeedContentService', () => {
  let service: SeedContentService;
  let firestoreSpy: jasmine.SpyObj<Firestore>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;

  beforeEach(() => {
    firestoreSpy = jasmine.createSpyObj('Firestore', ['type']);
    storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', [], {
      storeName: signal('Mi Tienda'),
    });

    TestBed.configureTestingModule({
      providers: [
        SeedContentService,
        { provide: Firestore, useValue: firestoreSpy },
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
      ],
    });

    service = TestBed.inject(SeedContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should seed attributes', fakeAsync(() => {
    spyOn(service, 'run').and.returnValue(Promise.resolve(undefined as never));

    let completed = false;
    void service.seedAttributes().then(() => {
      completed = true;
    });

    tick();
    expect(completed).toBeTrue();
  }));

  it('should seed categories and return mapping', fakeAsync(() => {
    let callCount = 0;
    spyOn(service, 'run').and.callFake(() => {
      callCount++;
      return Promise.resolve({ id: `cat-id-${callCount}` } as never);
    });

    let catMap: Record<string, { id: string; name: string }> | null = null;
    void service.seedCategories().then((res) => {
      catMap = res;
    });

    tick();
    expect(catMap).toBeTruthy();
    if (catMap) {
      expect(catMap['remeras']).toEqual({ id: 'cat-id-1', name: 'Remeras' });
    }
  }));

  it('should seed hero banner', fakeAsync(() => {
    spyOn(service, 'run').and.returnValue(Promise.resolve(undefined as never));

    const mockCats = {
      remeras: { id: 'cat-1', name: 'Remeras' },
    };

    let completed = false;
    void service.seedHeroBanner(mockCats).then(() => {
      completed = true;
    });

    tick();
    expect(completed).toBeTrue();
  }));

  it('should seed about us section', fakeAsync(() => {
    spyOn(service, 'run').and.returnValue(Promise.resolve(undefined as never));

    let completed = false;
    void service.seedAboutUs().then(() => {
      completed = true;
    });

    tick();
    expect(completed).toBeTrue();
  }));

  it('should seed footer with default and override store names', fakeAsync(() => {
    spyOn(service, 'run').and.returnValue(Promise.resolve(undefined as never));

    let completedDefault = false;
    void service.seedFooter().then(() => {
      completedDefault = true;
    });

    tick();
    expect(completedDefault).toBeTrue();

    let completedOverride = false;
    void service.seedFooter('Tienda Personalizada').then(() => {
      completedOverride = true;
    });

    tick();
    expect(completedOverride).toBeTrue();
  }));
});
