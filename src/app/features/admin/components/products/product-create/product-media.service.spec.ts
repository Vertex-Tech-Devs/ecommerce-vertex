import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of, throwError, config } from 'rxjs';
import { ProductMediaService } from './product-media.service';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';

describe('ProductMediaService', () => {
  let service: ProductMediaService;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;
  let fb: FormBuilder;
  let originalUnhandled: ((err: unknown) => void) | null = null;

  beforeEach(() => {
    originalUnhandled = config.onUnhandledError;
    config.onUnhandledError = () => {};

    storageServiceSpy = jasmine.createSpyObj('StorageService', ['uploadFile']);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', ['error', 'confirm']);

    TestBed.configureTestingModule({
      providers: [
        ProductMediaService,
        FormBuilder,
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
      ],
    });

    service = TestBed.inject(ProductMediaService);
    fb = TestBed.inject(FormBuilder);
  });

  afterEach(() => {
    config.onUnhandledError = originalUnhandled;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload main image and invoke callbacks', () => {
    const file = new File(['dummy'], 'main.jpg', { type: 'image/jpeg' });
    storageServiceSpy.uploadFile.and.returnValue({
      progress$: of(50, 100),
      downloadUrl$: of('https://example.com/main.jpg'),
    } as ReturnType<StorageService['uploadFile']>);

    const onProgressSpy = jasmine.createSpy('onProgress');
    const onCompleteSpy = jasmine.createSpy('onComplete');

    service.uploadMainImage(file, 'p1', onProgressSpy, onCompleteSpy);

    expect(storageServiceSpy.uploadFile).toHaveBeenCalledWith(file, 'products/p1');
    expect(onProgressSpy).toHaveBeenCalledWith(50);
    expect(onProgressSpy).toHaveBeenCalledWith(100);
    expect(onCompleteSpy).toHaveBeenCalledWith('https://example.com/main.jpg');
  });

  it('should handle error when uploadMainImage downloadUrl fails', fakeAsync(() => {
    spyOn(console, 'error');
    const file = new File(['dummy'], 'main.jpg', { type: 'image/jpeg' });
    storageServiceSpy.uploadFile.and.returnValue({
      progress$: of(0),
      downloadUrl$: throwError(() => new Error('Download url error')),
    } as ReturnType<StorageService['uploadFile']>);

    const onProgressSpy = jasmine.createSpy('onProgress');
    const onCompleteSpy = jasmine.createSpy('onComplete');

    service.uploadMainImage(file, 'p1', onProgressSpy, onCompleteSpy);
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error de Carga', jasmine.any(String));
  }));

  it('should upload gallery image and invoke callbacks with index', () => {
    const file = new File(['dummy'], 'gal.jpg', { type: 'image/jpeg' });
    storageServiceSpy.uploadFile.and.returnValue({
      progress$: of(75),
      downloadUrl$: of('https://example.com/gal.jpg'),
    } as ReturnType<StorageService['uploadFile']>);

    const onProgressSpy = jasmine.createSpy('onProgress');
    const onCompleteSpy = jasmine.createSpy('onComplete');

    service.uploadGalleryImage(file, 'p1', 2, onProgressSpy, onCompleteSpy);

    expect(storageServiceSpy.uploadFile).toHaveBeenCalledWith(file, 'products/p1');
    expect(onProgressSpy).toHaveBeenCalledWith(2, 75);
    expect(onCompleteSpy).toHaveBeenCalledWith('https://example.com/gal.jpg');
  });

  it('should handle error when uploadGalleryImage downloadUrl fails', fakeAsync(() => {
    spyOn(console, 'error');
    const file = new File(['dummy'], 'gal.jpg', { type: 'image/jpeg' });
    storageServiceSpy.uploadFile.and.returnValue({
      progress$: of(0),
      downloadUrl$: throwError(() => new Error('Download url error')),
    } as ReturnType<StorageService['uploadFile']>);

    const onProgressSpy = jasmine.createSpy('onProgress');
    const onCompleteSpy = jasmine.createSpy('onComplete');

    service.uploadGalleryImage(file, 'p1', 1, onProgressSpy, onCompleteSpy);
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error de Carga', jasmine.any(String));
  }));

  it('should create an image FormControl with validators', () => {
    const control = service.createImageControl(fb, 'https://example.com/img.png');
    expect(control.value).toBe('https://example.com/img.png');
    expect(control.valid).toBeTrue();

    control.setValue('invalid-url');
    expect(control.valid).toBeFalse();
  });

  it('should confirm and remove image from FormArray', async () => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));
    const imagesArray = fb.array([fb.control('img1'), fb.control('img2')]);

    const result = await service.confirmRemoveImage(imagesArray, 0);

    expect(result).toBeTrue();
    expect(imagesArray.length).toBe(1);
    expect(imagesArray.at(0).value).toBe('img2');
  });

  it('should not remove image if confirm is cancelled', async () => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(false));
    const imagesArray = fb.array([fb.control('img1')]);

    const result = await service.confirmRemoveImage(imagesArray, 0);

    expect(result).toBeFalse();
    expect(imagesArray.length).toBe(1);
  });
});
