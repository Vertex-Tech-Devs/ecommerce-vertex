import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import type { HttpHandlerFn } from '@angular/common/http';
import { httpErrorInterceptor } from './http-error.interceptor';
import { of, throwError } from 'rxjs';

describe('httpErrorInterceptor', () => {
  let consoleSpy: jasmine.Spy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'error');
    TestBed.configureTestingModule({});
  });

  it('should pass through successful HTTP requests without error', (done) => {
    const req = new HttpRequest('GET', '/api/data');
    const response = new HttpResponse({ status: 200, body: { data: 'ok' } });
    const nextHandler: HttpHandlerFn = () => of(response);

    TestBed.runInInjectionContext(() => {
      httpErrorInterceptor(req, nextHandler).subscribe({
        next: (res) => {
          expect(res).toBe(response);
          expect(consoleSpy).not.toHaveBeenCalled();
          done();
        },
        error: () => {
          fail('Should not emit error on success');
        },
      });
    });
  });

  it('should format and log client-side error (ErrorEvent) and re-throw error', (done) => {
    const req = new HttpRequest('GET', '/api/client-error');
    const errorEvent = new ErrorEvent('NetworkError', { message: 'Conexión fallida' });
    const errorResponse = new HttpErrorResponse({
      error: errorEvent,
      status: 0,
      statusText: 'Unknown Error',
      url: '/api/client-error',
    });

    const nextHandler: HttpHandlerFn = () => throwError(() => errorResponse);

    TestBed.runInInjectionContext(() => {
      httpErrorInterceptor(req, nextHandler).subscribe({
        next: () => {
          fail('Should throw error');
        },
        error: (err: HttpErrorResponse) => {
          expect(err).toBe(errorResponse);
          expect(consoleSpy).toHaveBeenCalledWith(
            '[Store HTTP Error]',
            'Error de cliente: Conexión fallida',
            jasmine.objectContaining({
              url: '/api/client-error',
              method: 'GET',
              status: 0,
            }),
          );
          done();
        },
      });
    });
  });

  it('should format and log backend server error and re-throw error', (done) => {
    const req = new HttpRequest('POST', '/api/server-error', null);
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Internal Server Error' },
      status: 500,
      statusText: 'Internal Server Error',
      url: '/api/server-error',
    });

    const nextHandler: HttpHandlerFn = () => throwError(() => errorResponse);

    TestBed.runInInjectionContext(() => {
      httpErrorInterceptor(req, nextHandler).subscribe({
        next: () => {
          fail('Should throw error');
        },
        error: (err: HttpErrorResponse) => {
          expect(err).toBe(errorResponse);
          expect(consoleSpy).toHaveBeenCalledWith(
            '[Store HTTP Error]',
            jasmine.stringMatching(/^Error de servidor \(500\):/),
            jasmine.objectContaining({
              url: '/api/server-error',
              method: 'POST',
              status: 500,
            }),
          );
          done();
        },
      });
    });
  });
});
