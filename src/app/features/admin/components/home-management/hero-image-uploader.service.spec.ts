import { TestBed } from '@angular/core/testing';
import { HeroImageUploaderService } from './hero-image-uploader.service';
import { ImageValidationService } from '@core/services/image-validation.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';

describe('HeroImageUploaderService', () => {
  let service: HeroImageUploaderService;
  let imageValidationServiceSpy: jasmine.SpyObj<ImageValidationService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;

  beforeEach(() => {
    imageValidationServiceSpy = jasmine.createSpyObj('ImageValidationService', [
      'validateHeroImage',
      'getQualityRecommendations',
    ]);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', ['error', 'confirm']);

    imageValidationServiceSpy.getQualityRecommendations.and.returnValue({
      idealResolution: '1920x1080',
    } as ReturnType<ImageValidationService['getQualityRecommendations']>);

    TestBed.configureTestingModule({
      providers: [
        HeroImageUploaderService,
        { provide: ImageValidationService, useValue: imageValidationServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
      ],
    });

    service = TestBed.inject(HeroImageUploaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate allowed file extensions and types', () => {
    const validFile = new File([''], 'hero.jpg', { type: 'image/jpeg' });
    const invalidFile = new File([''], 'doc.pdf', { type: 'application/pdf' });

    expect(service.isValidFile(validFile)).toBeTrue();
    expect(service.isValidFile(invalidFile)).toBeFalse();
  });

  it('should return null if processFiles is called with empty file input', async () => {
    const event = { target: { files: [] } } as unknown as Event;
    const result = await service.processFiles(event, 0);
    expect(result).toBeNull();
  });

  it('should error and return null if count exceeds limit', async () => {
    const file = new File([''], 'hero1.png', { type: 'image/png' });
    const event = {
      target: { files: [file], value: 'hero1.png' },
    } as unknown as Event;

    const result = await service.processFiles(event, 5);

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith(
      'Límite de imágenes',
      jasmine.any(String),
    );
    expect(result).toBeNull();
  });

  it('should process valid high quality files successfully', async () => {
    imageValidationServiceSpy.validateHeroImage.and.returnValue(
      Promise.resolve({ valid: true, errors: [] }),
    );

    const file = new File(['dummy data'], 'hero.png', { type: 'image/png' });
    const event = {
      target: { files: [file], value: 'hero.png' },
    } as unknown as Event;

    const batchPromise = service.processFiles(event, 0);
    const batch = await batchPromise;

    expect(batch).not.toBeNull();
    expect(batch?.files.length).toBe(1);
    expect(batch?.files[0].name).toBe('hero.png');
    expect(batch?.previews.length).toBe(1);
  });

  it('should warn on low quality files and allow user to cancel', async () => {
    imageValidationServiceSpy.validateHeroImage.and.returnValue(
      Promise.resolve({ valid: false, errors: ['Low resolution'] }),
    );
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(false));

    const file = new File(['dummy data'], 'lowres.png', { type: 'image/png' });
    const event = {
      target: { files: [file], value: 'lowres.png' },
    } as unknown as Event;

    const result = await service.processFiles(event, 0);

    expect(sweetAlertServiceSpy.confirm).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should accept low quality files if user confirms warning', async () => {
    imageValidationServiceSpy.validateHeroImage.and.returnValue(
      Promise.resolve({ valid: false, errors: ['Low resolution'] }),
    );
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));

    const file = new File(['dummy data'], 'lowres.png', { type: 'image/png' });
    const event = {
      target: { files: [file], value: 'lowres.png' },
    } as unknown as Event;

    const batch = await service.processFiles(event, 0);

    expect(batch).not.toBeNull();
    expect(batch?.files.length).toBe(1);
  });
});
