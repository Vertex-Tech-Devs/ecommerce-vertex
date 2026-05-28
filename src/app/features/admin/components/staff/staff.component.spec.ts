import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { StaffComponent, type AdminRole } from './staff.component';
import { Functions } from '@angular/fire/functions';
import type { HttpsCallable } from '@angular/fire/functions';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { AuthService } from '@core/services/auth.service';

describe('StaffComponent', () => {
  let component: StaffComponent;
  let fixture: ComponentFixture<StaffComponent>;
  let functionsSpy: jasmine.SpyObj<Functions>;
  let sweetAlertSpy: jasmine.SpyObj<SweetAlertService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockStaff: AdminRole[] = [
    { email: 'admin1@test.com', role: 'admin' },
    { email: 'admin2@test.com', role: 'admin' },
  ];

  beforeEach(async () => {
    functionsSpy = jasmine.createSpyObj('Functions', ['']);
    // We spy on global/angular fire httpsCallable helper inside tests by mocking the return calls or stubbing
    sweetAlertSpy = jasmine.createSpyObj('SweetAlertService', ['success', 'error', 'confirm']);
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      currentUser$: of({ email: 'myadmin@test.com' }),
    });

    await TestBed.configureTestingModule({
      imports: [StaffComponent, ReactiveFormsModule],
      providers: [
        { provide: Functions, useValue: functionsSpy },
        { provide: SweetAlertService, useValue: sweetAlertSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffComponent);
    component = fixture.componentInstance;

    // Stub loadStaff so it doesn't trigger compile/injection errors on functions
    spyOn(component, 'loadStaff').and.returnValue(Promise.resolve());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent adding duplicate email and set correct error message', async () => {
    component.staffList.set(mockStaff);

    component.staffForm.patchValue({
      email: 'ADMIN1@test.com', // Test case insensitivity
      role: 'admin',
    });

    await component.addStaff();

    expect(component.addError()).toBe('Este email ya está autorizado como administrador.');
    expect(sweetAlertSpy.success).not.toHaveBeenCalled();
  });

  it('should allow adding new non-duplicate email', async () => {
    component.staffList.set(mockStaff);

    spyOn(component, 'getCallable').and.returnValue((() =>
      Promise.resolve({ data: { success: true } })) as unknown as HttpsCallable<unknown, unknown>);

    component.staffForm.patchValue({
      email: 'newadmin@test.com',
      role: 'admin',
    });

    await component.addStaff();

    expect(component.addError()).toBe('');
    expect(sweetAlertSpy.success).toHaveBeenCalled();
  });

  it('should prevent user from removing themselves', async () => {
    await component.removeStaff('myadmin@test.com');

    expect(sweetAlertSpy.error).toHaveBeenCalledWith(
      'Acción no permitida',
      'No podés revocar tus propios privilegios de administrador.'
    );
    expect(sweetAlertSpy.confirm).not.toHaveBeenCalled();
  });
});
