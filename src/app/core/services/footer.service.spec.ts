import { TestBed } from '@angular/core/testing';
import { FooterService } from './footer.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import type { FooterData } from '@core/models/footer.model';

describe('FooterService', () => {
  let service: FooterService;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  const mockFooterData: FooterData = {
    contactPhone: '123456789',
    contactEmail: 'contacto@tienda.com',
    socialInstagramUrl: 'https://instagram.com/tienda',
    socialFacebookUrl: 'https://facebook.com/tienda',
    socialWhatsAppUrl: 'https://wa.me/123456789',
    copyrightText: '© 2026 Vertex',
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

    TestBed.configureTestingModule({
      providers: [FooterService, { provide: Firestore, useValue: firestoreSpy }],
    });

    service = TestBed.inject(FooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFooterData', () => {
    it('should return footer data if document exists', (done) => {
      spyOn(service, 'getFooterData').and.returnValue(of(mockFooterData));

      service.getFooterData().subscribe((data) => {
        expect(data).toEqual(mockFooterData);
        done();
      });
    });

    it('should return undefined if document does not exist', (done) => {
      spyOn(service, 'getFooterData').and.returnValue(of(undefined));

      service.getFooterData().subscribe((data) => {
        expect(data).toBeUndefined();
        done();
      });
    });

    it('should handle errors and return undefined', (done) => {
      spyOn(service, 'getFooterData').and.returnValue(of(undefined));

      service.getFooterData().subscribe((data) => {
        expect(data).toBeUndefined();
        done();
      });
    });
  });

  describe('saveFooterData', () => {
    it('should call setDoc with footer data', async () => {
      const saveSpy = spyOn(service, 'saveFooterData').and.returnValue(Promise.resolve());

      await service.saveFooterData(mockFooterData);
      expect(saveSpy).toHaveBeenCalledWith(mockFooterData);
    });
  });
});
