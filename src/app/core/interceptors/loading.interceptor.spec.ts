import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import type { HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { loadingInterceptor } from './loading.interceptor';
import { Subject } from 'rxjs';

describe('loadingInterceptor', () => {
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [{ provide: LoadingService, useValue: loadingServiceSpy }],
    });
  });

  it('should call loadingService.show() on first request and loadingService.hide() when request completes', () => {
    const req = new HttpRequest('GET', '/api/test');
    const responseSubject = new Subject<HttpEvent<unknown>>();
    const nextHandler: HttpHandlerFn = () => responseSubject.asObservable();

    TestBed.runInInjectionContext(() => {
      const result$ = loadingInterceptor(req, nextHandler);

      let completed = false;
      const sub = result$.subscribe({
        complete: () => {
          completed = true;
        },
      });

      expect(loadingServiceSpy.show).toHaveBeenCalled();
      expect(loadingServiceSpy.hide).not.toHaveBeenCalled();

      responseSubject.next(new HttpResponse({ status: 200 }));
      responseSubject.complete();

      expect(completed).toBeTrue();
      expect(loadingServiceSpy.hide).toHaveBeenCalled();
      sub.unsubscribe();
    });
  });

  it('should handle concurrent requests properly without duplicate show or premature hide', () => {
    loadingServiceSpy.show.calls.reset();
    loadingServiceSpy.hide.calls.reset();

    const req1 = new HttpRequest('GET', '/api/test1');
    const req2 = new HttpRequest('GET', '/api/test2');

    const subject1 = new Subject<HttpEvent<unknown>>();
    const subject2 = new Subject<HttpEvent<unknown>>();

    TestBed.runInInjectionContext(() => {
      const result1$ = loadingInterceptor(req1, () => subject1.asObservable());
      const result2$ = loadingInterceptor(req2, () => subject2.asObservable());

      const sub1 = result1$.subscribe();
      const sub2 = result2$.subscribe();

      expect(loadingServiceSpy.show).toHaveBeenCalled();

      subject1.next(new HttpResponse({ status: 200 }));
      subject1.complete();
      expect(loadingServiceSpy.hide).not.toHaveBeenCalled();

      subject2.next(new HttpResponse({ status: 200 }));
      subject2.complete();
      expect(loadingServiceSpy.hide).toHaveBeenCalled();

      sub1.unsubscribe();
      sub2.unsubscribe();
    });
  });
});
