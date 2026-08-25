import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import type { RouterStateSnapshot } from '@angular/router';
import { signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { StoreConfigService } from '@core/services/store-config.service';
import { StoreTitleStrategy } from './store-title.strategy';

describe('StoreTitleStrategy', () => {
  let strategy: StoreTitleStrategy;
  let titleSpy: jasmine.SpyObj<Title>;
  let storeNameSignal: WritableSignal<string>;

  beforeEach(() => {
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    storeNameSignal = signal<string>('Mi Tienda');

    TestBed.configureTestingModule({
      providers: [
        StoreTitleStrategy,
        { provide: Title, useValue: titleSpy },
        {
          provide: StoreConfigService,
          useValue: { storeName: storeNameSignal },
        },
      ],
    });

    strategy = TestBed.inject(StoreTitleStrategy);
  });

  it('should update title with routeTitle and storeName when both exist', () => {
    spyOn(strategy, 'buildTitle').and.returnValue('Productos');

    strategy.updateTitle({} as RouterStateSnapshot);
    TestBed.flushEffects();

    expect(titleSpy.setTitle).toHaveBeenCalledWith('Productos | Mi Tienda');
  });

  it('should update title with routeTitle only when storeName is empty', () => {
    storeNameSignal.set('');
    spyOn(strategy, 'buildTitle').and.returnValue('Catálogo');

    strategy.updateTitle({} as RouterStateSnapshot);
    TestBed.flushEffects();

    expect(titleSpy.setTitle).toHaveBeenCalledWith('Catálogo');
  });

  it('should update title with storeName only when routeTitle is undefined', () => {
    storeNameSignal.set('Tienda Vertex');
    spyOn(strategy, 'buildTitle').and.returnValue(undefined);

    strategy.updateTitle({} as RouterStateSnapshot);
    TestBed.flushEffects();

    expect(titleSpy.setTitle).toHaveBeenCalledWith('Tienda Vertex');
  });

  it('should not update title when both routeTitle and storeName are empty', () => {
    titleSpy.setTitle.calls.reset();
    storeNameSignal.set('');
    spyOn(strategy, 'buildTitle').and.returnValue(undefined);

    strategy.updateTitle({} as RouterStateSnapshot);
    TestBed.flushEffects();

    expect(titleSpy.setTitle).not.toHaveBeenCalled();
  });
});
