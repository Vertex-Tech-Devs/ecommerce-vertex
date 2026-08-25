import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FirstRunWizard } from './first-run-wizard';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';

describe('FirstRunWizard', () => {
  let component: FirstRunWizard;
  let fixture: ComponentFixture<FirstRunWizard>;
  let storeConfigServiceSpy: jasmine.SpyObj<StoreConfigService>;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;

  beforeEach(async () => {
    spyOn(console, 'error');
    storeConfigServiceSpy = jasmine.createSpyObj('StoreConfigService', [
      'saveConfig',
      'loadConfig',
    ]);
    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['success', 'error']);

    storeConfigServiceSpy.saveConfig.and.returnValue(Promise.resolve());
    storeConfigServiceSpy.loadConfig.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      imports: [FirstRunWizard, ReactiveFormsModule],
      providers: [
        { provide: StoreConfigService, useValue: storeConfigServiceSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FirstRunWizard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
    expect(component.currentStep()).toBe(1);
  });

  it('should not advance to step 2 if step 1 storeName is invalid', () => {
    component.form.patchValue({ storeName: '' });
    component.nextStep();
    expect(component.currentStep()).toBe(1);
  });

  it('should advance to step 2 if storeName is valid', () => {
    component.form.patchValue({ storeName: 'Mi Tienda' });
    component.nextStep();
    expect(component.currentStep()).toBe(2);
  });

  it('should not advance to step 3 if step 2 colors are invalid', () => {
    component.form.patchValue({ storeName: 'Mi Tienda' });
    component.nextStep();
    component.form.patchValue({ primaryColor: '' });
    component.nextStep();
    expect(component.currentStep()).toBe(2);
  });

  it('should advance to step 3 when colors are valid', () => {
    component.form.patchValue({ storeName: 'Mi Tienda' });
    component.nextStep();
    component.nextStep();
    expect(component.currentStep()).toBe(3);
  });

  it('should go back step via prevStep()', () => {
    component.currentStep.set(2);
    component.prevStep();
    expect(component.currentStep()).toBe(1);
  });

  it('should show error alert on submit if form is invalid', async () => {
    component.form.patchValue({ email: 'invalid-email' });
    await component.onSubmit();

    expect(sweetAlertSpy.error).toHaveBeenCalledWith(
      'Formulario incompleto',
      'Completá todos los campos obligatorios antes de continuar.',
    );
    expect(storeConfigServiceSpy.saveConfig).not.toHaveBeenCalled();
  });

  it('should save config and load config on valid submit', fakeAsync(() => {
    component.form.patchValue({
      storeName: 'Tienda Test',
      tagline: 'Eslogan',
      primaryColor: '#123456',
      accentColor: '#654321',
      phone: '12345678',
      email: 'test@tienda.com',
    });

    component.onSubmit();
    tick();

    expect(storeConfigServiceSpy.saveConfig).toHaveBeenCalled();
    expect(storeConfigServiceSpy.loadConfig).toHaveBeenCalled();
    expect(sweetAlertSpy.success).toHaveBeenCalledWith(
      '¡Felicitaciones!',
      'Tu tienda ha sido configurada e inicializada con éxito.',
    );
    expect(component.isSubmitting()).toBeFalse();
  }));

  it('should handle error when saveConfig fails during submit', fakeAsync(() => {
    storeConfigServiceSpy.saveConfig.and.returnValue(Promise.reject(new Error('Save failed')));
    component.form.patchValue({
      storeName: 'Tienda Test',
      tagline: 'Eslogan',
      primaryColor: '#123456',
      accentColor: '#654321',
      phone: '12345678',
      email: 'test@tienda.com',
    });

    component.onSubmit();
    tick();

    expect(sweetAlertSpy.error).toHaveBeenCalledWith(
      'Error',
      'No se pudo guardar la configuración de la tienda.',
    );
    expect(component.isSubmitting()).toBeFalse();
  }));
});
