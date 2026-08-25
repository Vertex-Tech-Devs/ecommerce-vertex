import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AboutUsManagement } from './about-us-management';
import { AboutUsService } from '@core/services/about-us.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { StorageService } from '@core/services/storage.service';
import type { AboutUsData } from '@core/models/about-us.model';

describe('AboutUsManagement', () => {
  let component: AboutUsManagement;
  let fixture: ComponentFixture<AboutUsManagement>;
  let aboutUsServiceSpy: jasmine.SpyObj<AboutUsService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  const mockAboutUsData: AboutUsData = {
    bannerTitle: 'Sobre Nosotros',
    bannerSubtitle: 'Nuestra historia',
    bannerImageUrl: 'https://example.com/banner.jpg',
    centralTitle: 'Nuestra Misión',
    centralImageUrl: 'https://example.com/central.jpg',
    centralDescription:
      'Esta es una descripción larga de la empresa para cumplir la validaciones de longitud mínima de cincuenta caracteres.',
    cardsSectionTitle: 'Valores',
    featureCards: [
      { icon: 'stars', title: 'Calidad', content: 'Alta calidad' },
      { icon: 'rocket', title: 'Innovación', content: 'Constante' },
    ],
  };

  beforeEach(async () => {
    aboutUsServiceSpy = jasmine.createSpyObj('AboutUsService', [
      'getAboutUsData',
      'saveAboutUsData',
    ]);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', [
      'error',
      'success',
      'warning',
      'confirm',
      'loading',
      'close',
    ]);
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['uploadFile']);

    aboutUsServiceSpy.getAboutUsData.and.returnValue(of(mockAboutUsData));

    await TestBed.configureTestingModule({
      imports: [AboutUsManagement, ReactiveFormsModule],
      providers: [
        { provide: AboutUsService, useValue: aboutUsServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and populate form with data', () => {
    expect(component).toBeTruthy();
    expect(component.isLoading).toBeFalse();
    expect(component.aboutUsForm.get('bannerTitle')?.value).toBe('Sobre Nosotros');
    expect(component.featureCards.length).toBe(2);
  });

  it('should toggle mobile section', () => {
    component.toggleMobileSection(2);
    expect(component.mobileActiveSection).toBe(2);

    component.toggleMobileSection(2);
    expect(component.mobileActiveSection).toBe(0);
  });

  it('should select card icon', () => {
    component.selectCardIcon(0, 'heart');
    expect(component.featureCards.at(0).get('icon')?.value).toBe('heart');
  });

  it('should add feature card up to maximum 3', () => {
    expect(component.featureCards.length).toBe(2);
    component.addFeatureCard();
    expect(component.featureCards.length).toBe(3);

    component.addFeatureCard();
    expect(component.featureCards.length).toBe(3);
  });

  it('should remove feature card when confirmed and length > 2', fakeAsync(() => {
    component.addFeatureCard();
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));

    component.removeFeatureCard(2);
    tick();

    expect(sweetAlertServiceSpy.confirm).toHaveBeenCalled();
    expect(component.featureCards.length).toBe(2);
  }));

  it('should not remove feature card if count is <= 2', () => {
    expect(component.featureCards.length).toBe(2);
    component.removeFeatureCard(0);
    expect(sweetAlertServiceSpy.confirm).not.toHaveBeenCalled();
  });

  it('should handle banner image upload on file selection', fakeAsync(() => {
    storageServiceSpy.uploadFile.and.returnValue({
      progress$: of(100),
      downloadUrl$: of('https://example.com/new-banner.jpg'),
    } as ReturnType<StorageService['uploadFile']>);

    const file = new File(['fake image'], 'banner.png', { type: 'image/png' });
    const event = {
      target: { files: [file], value: 'banner.png' },
    } as unknown as Event;

    component.onFileSelected(event, 'banner');
    tick();

    expect(storageServiceSpy.uploadFile).toHaveBeenCalledWith(file, 'pages/about-us/banner');
    expect(component.aboutUsForm.get('bannerImageUrl')?.value).toBe(
      'https://example.com/new-banner.jpg',
    );
  }));

  it('should reject invalid non-image file on selection', () => {
    const file = new File(['text'], 'doc.pdf', { type: 'application/pdf' });
    const event = {
      target: { files: [file], value: 'doc.pdf' },
    } as unknown as Event;

    component.onFileSelected(event, 'central');
    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith(
      'Archivo no válido',
      jasmine.any(String),
    );
  });

  it('should handle error when uploading image fails', fakeAsync(() => {
    storageServiceSpy.uploadFile.and.returnValue({
      progress$: of(0),
      downloadUrl$: throwError(() => new Error('Upload failed')),
    } as ReturnType<StorageService['uploadFile']>);

    const file = new File(['fake image'], 'central.png', { type: 'image/png' });
    const event = {
      target: { files: [file], value: 'central.png' },
    } as unknown as Event;

    component.onFileSelected(event, 'central');
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith(
      'Error al subir imagen',
      jasmine.any(String),
    );
  }));

  it('should prevent submission if upload is in progress', () => {
    component.isUploadingBanner.set(true);
    component.onSubmit();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith(
      'Carga en progreso',
      jasmine.any(String),
    );
  });

  it('should submit form successfully when valid', fakeAsync(() => {
    aboutUsServiceSpy.saveAboutUsData.and.returnValue(Promise.resolve());

    component.onSubmit();
    tick();

    expect(sweetAlertServiceSpy.loading).toHaveBeenCalledWith('Guardando Cambios...');
    expect(aboutUsServiceSpy.saveAboutUsData).toHaveBeenCalled();
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith('¡Guardado!', jasmine.any(String));
  }));

  it('should show error on submit if form is invalid', () => {
    component.aboutUsForm.patchValue({ bannerTitle: '' });
    component.onSubmit();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith(
      'Formulario Inválido',
      jasmine.any(String),
    );
  });

  it('should handle error when saveAboutUsData fails', fakeAsync(() => {
    aboutUsServiceSpy.saveAboutUsData.and.returnValue(Promise.reject(new Error('Save error')));

    component.onSubmit();
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error', jasmine.any(String));
  }));

  it('should reset form data on resetForm call', () => {
    component.aboutUsForm.patchValue({ bannerTitle: 'Changed Title' });
    component.resetForm();

    expect(component.aboutUsForm.get('bannerTitle')?.value).toBe('Sobre Nosotros');
  });
});
