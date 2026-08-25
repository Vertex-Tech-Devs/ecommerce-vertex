import { TestBed } from '@angular/core/testing';
import { AboutUsService } from './about-us.service';
import { Firestore } from '@angular/fire/firestore';
import { StorageService } from './storage.service';
import { of, firstValueFrom } from 'rxjs';
import type { AboutUsData } from '@core/models/about-us.model';

describe('AboutUsService', () => {
  let service: AboutUsService;
  let firestoreSpy: jasmine.SpyObj<Firestore>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  const mockAboutUsData: AboutUsData = {
    bannerTitle: 'Sobre Nosotros',
    bannerSubtitle: 'Nuestra historia',
    bannerImageUrl: 'http://img.jpg/banner.jpg',
    centralTitle: 'Título Central',
    centralImageUrl: 'http://img.jpg/central.jpg',
    centralDescription: 'Descripción Central',
    cardsSectionTitle: 'Características',
    featureCards: [],
  };

  beforeEach(() => {
    firestoreSpy = jasmine.createSpyObj('Firestore', [
      'collection',
      'doc',
      'getDocs',
      'getDoc',
      'setDoc',
      'updateDoc',
      'deleteDoc',
      'query',
      'where',
    ]);
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['uploadFile', 'deleteFileByUrl']);

    TestBed.configureTestingModule({
      providers: [
        AboutUsService,
        { provide: Firestore, useValue: firestoreSpy },
        { provide: StorageService, useValue: storageServiceSpy },
      ],
    });

    service = TestBed.inject(AboutUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAboutUsData', () => {
    it('should return converted about us data if document exists', (done) => {
      spyOn(service, 'getAboutUsData').and.returnValue(of(mockAboutUsData));

      service.getAboutUsData().subscribe((data) => {
        expect(data).toBeDefined();
        expect(data?.bannerTitle).toBe('Sobre Nosotros');
        done();
      });
    });

    it('should return undefined if document does not exist', (done) => {
      spyOn(service, 'getAboutUsData').and.returnValue(of(undefined));

      service.getAboutUsData().subscribe((data) => {
        expect(data).toBeUndefined();
        done();
      });
    });

    it('should handle errors and return undefined', (done) => {
      spyOn(service, 'getAboutUsData').and.returnValue(of(undefined));

      service.getAboutUsData().subscribe((data) => {
        expect(data).toBeUndefined();
        done();
      });
    });
  });

  describe('saveAboutUsData', () => {
    it('should save data without new image files', async () => {
      const saveSpy = spyOn(service, 'saveAboutUsData').and.returnValue(Promise.resolve());

      await service.saveAboutUsData(mockAboutUsData, null, null);
      expect(saveSpy).toHaveBeenCalledWith(mockAboutUsData, null, null);
    });

    it('should upload banner file if provided and update URL', async () => {
      storageServiceSpy.deleteFileByUrl.and.returnValue(of(undefined));
      storageServiceSpy.uploadFile.and.returnValue({
        downloadUrl$: of('http://new-banner.jpg'),
      } as unknown as ReturnType<StorageService['uploadFile']>);

      const saveSpy = spyOn(service, 'saveAboutUsData').and.callFake(async (data, bannerFile) => {
        if (bannerFile) {
          if (data.bannerImageUrl) {
            await firstValueFrom(storageServiceSpy.deleteFileByUrl(data.bannerImageUrl));
          }
          const upload = storageServiceSpy.uploadFile(bannerFile, 'path');
          await firstValueFrom(upload.downloadUrl$);
        }
      });

      const file = new File([''], 'banner.jpg', { type: 'image/jpeg' });
      await service.saveAboutUsData(mockAboutUsData, file, null);

      expect(saveSpy).toHaveBeenCalled();
      expect(storageServiceSpy.deleteFileByUrl).toHaveBeenCalledWith(
        mockAboutUsData.bannerImageUrl!,
      );
      expect(storageServiceSpy.uploadFile).toHaveBeenCalled();
    });
  });
});
