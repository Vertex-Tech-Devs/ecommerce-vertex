import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { FooterManagement } from './footer-management';
import { FooterService } from '@core/services/footer.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { FooterData } from '@core/models/footer.model';

describe('FooterManagement', () => {
  let component: FooterManagement;
  let fixture: ComponentFixture<FooterManagement>;
  let footerServiceSpy: jasmine.SpyObj<FooterService>;
  let sweetAlertServiceSpy: jasmine.SpyObj<SweetAlertService>;

  const mockFooterData: FooterData = {
    contactPhone: '1122334455',
    contactEmail: 'admin@vertex.com',
    socialInstagramUrl: 'https://instagram.com/vertex',
    socialFacebookUrl: 'https://facebook.com/vertex',
    socialWhatsAppUrl: 'https://wa.me/1122334455',
    copyrightText: 'Copyright Vertex 2026',
  };

  beforeEach(async () => {
    footerServiceSpy = jasmine.createSpyObj('FooterService', ['getFooterData', 'saveFooterData']);
    sweetAlertServiceSpy = jasmine.createSpyObj('SweetAlertService', [
      'loading',
      'success',
      'error',
      'confirm',
    ]);

    footerServiceSpy.getFooterData.and.returnValue(of(mockFooterData));

    await TestBed.configureTestingModule({
      imports: [FooterManagement, ReactiveFormsModule],
      providers: [
        { provide: FooterService, useValue: footerServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create footer management component and populate form with loaded data', fakeAsync(() => {
    tick();
    expect(component).toBeTruthy();
    expect(component.isLoading()).toBeFalse();
    expect(component.isSubmitting).toBeFalse();
    expect(component.email.value).toBe('admin@vertex.com');
    expect(component.copyright.value).toBe('Copyright Vertex 2026');
    expect(component.instagram.value).toBe('https://instagram.com/vertex');
    expect(component.facebook.value).toBe('https://facebook.com/vertex');
    expect(component.whatsapp.value).toBe('https://wa.me/1122334455');
  }));

  it('should build empty form when getFooterData emits undefined', fakeAsync(() => {
    footerServiceSpy.getFooterData.and.returnValue(of(undefined));
    const emptyFixture = TestBed.createComponent(FooterManagement);
    emptyFixture.detectChanges();
    tick();

    expect(emptyFixture.componentInstance.isLoading()).toBeFalse();
    expect(emptyFixture.componentInstance.email.value).toBe('');
    expect(emptyFixture.componentInstance.copyright.value).toBe('');
  }));

  it('should build form with defaults when getFooterData emits empty object', fakeAsync(() => {
    footerServiceSpy.getFooterData.and.returnValue(of({} as FooterData));
    const emptyObjFixture = TestBed.createComponent(FooterManagement);
    emptyObjFixture.detectChanges();
    tick();

    expect(emptyObjFixture.componentInstance.email.value).toBe('');
    expect(emptyObjFixture.componentInstance.contactPhone.value).toBe('');
  }));

  it('should handle error when loading footer data', fakeAsync(() => {
    footerServiceSpy.getFooterData.and.returnValue(throwError(() => new Error('Load err')));
    const errFixture = TestBed.createComponent(FooterManagement);
    const errComp = errFixture.componentInstance;
    errFixture.detectChanges();
    tick();

    expect(errComp.isLoading()).toBeFalse();
    expect(errComp.email.value).toBe('');
  }));

  it('should show warning on submit if form is invalid', fakeAsync(() => {
    component.footerForm.patchValue({ contactEmail: 'invalid-email' });
    component.onSubmit();
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith(
      'Formulario Inválido',
      jasmine.any(String),
    );
    expect(footerServiceSpy.saveFooterData).not.toHaveBeenCalled();
  }));

  it('should save footer data successfully on submit when form is valid', fakeAsync(() => {
    footerServiceSpy.saveFooterData.and.returnValue(Promise.resolve());

    component.onSubmit();
    tick();

    expect(sweetAlertServiceSpy.loading).toHaveBeenCalledWith('Actualizando Footer...');
    expect(footerServiceSpy.saveFooterData).toHaveBeenCalledWith(mockFooterData);
    expect(sweetAlertServiceSpy.success).toHaveBeenCalledWith('¡Actualizado!', jasmine.any(String));
    expect(component.isSaving()).toBeFalse();
  }));

  it('should handle submit when form values contain nulls', fakeAsync(() => {
    footerServiceSpy.saveFooterData.and.returnValue(Promise.resolve());

    component.footerForm.setValue({
      contactPhone: null,
      contactEmail: 'admin@vertex.com',
      socialInstagramUrl: null,
      socialFacebookUrl: null,
      socialWhatsAppUrl: null,
      copyrightText: 'Copyright Vertex 2026',
    });

    component.onSubmit();
    tick();

    expect(footerServiceSpy.saveFooterData).toHaveBeenCalledWith({
      contactPhone: '',
      contactEmail: 'admin@vertex.com',
      socialInstagramUrl: '',
      socialFacebookUrl: '',
      socialWhatsAppUrl: '',
      copyrightText: 'Copyright Vertex 2026',
    });
  }));

  it('should handle error when saveFooterData fails', fakeAsync(() => {
    footerServiceSpy.saveFooterData.and.returnValue(Promise.reject(new Error('Save error')));

    component.onSubmit();
    tick();

    expect(sweetAlertServiceSpy.error).toHaveBeenCalledWith('Error', jasmine.any(String));
    expect(component.isSaving()).toBeFalse();
  }));

  it('should reset form when user confirms resetForm', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(true));
    component.footerForm.patchValue({ contactEmail: 'changed@vertex.com' });

    component.resetForm();
    tick();

    expect(sweetAlertServiceSpy.confirm).toHaveBeenCalled();
    expect(component.email.value).toBe('admin@vertex.com');
  }));

  it('should not reset form if user cancels resetForm', fakeAsync(() => {
    sweetAlertServiceSpy.confirm.and.returnValue(Promise.resolve(false));
    component.footerForm.patchValue({ contactEmail: 'changed@vertex.com' });

    component.resetForm();
    tick();

    expect(component.email.value).toBe('changed@vertex.com');
  }));

  it('should focus firstInput when data loading completes', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(component.firstInput).toBeDefined();
    if (component.firstInput) {
      spyOn(component.firstInput.nativeElement, 'focus');
      (component as unknown as { scheduleAutofocus: () => void }).scheduleAutofocus();
      tick();
      expect(component.firstInput.nativeElement.focus).toHaveBeenCalled();
    }
  }));

  it('should gracefully handle scheduleAutofocus when firstInput is undefined', fakeAsync(() => {
    component.firstInput = undefined;
    expect(() => {
      (component as unknown as { scheduleAutofocus: () => void }).scheduleAutofocus();
      tick();
    }).not.toThrow();
  }));
});
