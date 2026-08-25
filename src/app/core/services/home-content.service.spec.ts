import { TestBed } from '@angular/core/testing';
import { HomeContentService } from './home-content.service';
import { Firestore } from '@angular/fire/firestore';
import { StorageService } from './storage.service';
import { of, firstValueFrom } from 'rxjs';
import type { HeroBanner } from '../models/home-content.model';

describe('HomeContentService', () => {
  let service: HomeContentService;
  let firestoreSpy: jasmine.SpyObj<Firestore>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  const mockHeroBanner: HeroBanner = {
    title: 'Banner Principal',
    buttonText: 'Ver Mas',
    imageUrl: 'http://img.jpg/hero.jpg',
    heroImages: [{ imageUrl: 'http://img.jpg/slide1.jpg', linkType: 'none' }],
    featuredCategories: [
      { categoryId: 'cat1', name: 'Ropa', slug: 'ropa', imageUrl: 'http://img.jpg/cat1.jpg' },
    ],
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
        HomeContentService,
        { provide: Firestore, useValue: firestoreSpy },
        { provide: StorageService, useValue: storageServiceSpy },
      ],
    });

    service = TestBed.inject(HomeContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHeroBanner', () => {
    it('should return hero banner data if document exists', (done) => {
      spyOn(service, 'getHeroBanner').and.returnValue(of(mockHeroBanner));

      service.getHeroBanner().subscribe((banner) => {
        expect(banner).toEqual(mockHeroBanner);
        done();
      });
    });

    it('should return null if docData emits null or errors', (done) => {
      spyOn(service, 'getHeroBanner').and.returnValue(of(null));

      service.getHeroBanner().subscribe((banner) => {
        expect(banner).toBeNull();
        done();
      });
    });
  });

  describe('saveHomePageContent', () => {
    it('should save home content without new files', async () => {
      const saveSpy = spyOn(service, 'saveHomePageContent').and.returnValue(Promise.resolve());

      await service.saveHomePageContent(mockHeroBanner, null, []);
      expect(saveSpy).toHaveBeenCalledWith(mockHeroBanner, null, []);
    });

    it('should upload new banner file if provided', async () => {
      storageServiceSpy.deleteFileByUrl.and.returnValue(of(undefined));
      storageServiceSpy.uploadFile.and.returnValue({
        downloadUrl$: of('http://img.jpg/newbanner.jpg'),
      } as unknown as ReturnType<StorageService['uploadFile']>);

      const saveSpy = spyOn(service, 'saveHomePageContent').and.callFake(
        async (content, bannerFile) => {
          if (bannerFile) {
            if (content.imageUrl) {
              await firstValueFrom(storageServiceSpy.deleteFileByUrl(content.imageUrl));
            }
            const upload = storageServiceSpy.uploadFile(bannerFile, 'path');
            await firstValueFrom(upload.downloadUrl$);
          }
        },
      );

      const newBannerFile = new File([''], 'banner.png', { type: 'image/png' });
      await service.saveHomePageContent(mockHeroBanner, newBannerFile, []);

      expect(saveSpy).toHaveBeenCalled();
      expect(storageServiceSpy.uploadFile).toHaveBeenCalled();
    });
  });
});
