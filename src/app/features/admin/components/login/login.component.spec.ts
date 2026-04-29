import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import type { UserCredential } from '@angular/fire/auth';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '@core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'logout', 'isAuthenticated']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    authServiceSpy.isAuthenticated.and.returnValue(of(false));
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({}) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('formControls getter should return the form controls', () => {
    expect(component.formControls['email']).toBeTruthy();
    expect(component.formControls['password']).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an invalid form', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark form as invalid when email is missing', () => {
    component.loginForm.patchValue({ email: '', password: 'password123' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark form as invalid when password is missing', () => {
    component.loginForm.patchValue({ email: 'test@example.com', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark form as invalid for a malformed email', () => {
    component.loginForm.patchValue({ email: 'not-an-email', password: 'password123' });
    expect(component.loginForm.get('email')?.errors?.['email']).toBeTruthy();
  });

  it('should be valid when email and password are filled correctly', () => {
    component.loginForm.patchValue({ email: 'admin@example.com', password: 'secret' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should not call login when form is invalid', () => {
    component.onSubmit();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should call login with form values when form is valid', () => {
    authServiceSpy.login.and.returnValue(of({} as UserCredential));
    component.loginForm.patchValue({ email: 'admin@example.com', password: 'secret' });

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('admin@example.com', 'secret');
  });

  it('should navigate to /admin after successful login', () => {
    authServiceSpy.login.and.returnValue(of({} as UserCredential));
    component.loginForm.patchValue({ email: 'admin@example.com', password: 'secret' });

    component.onSubmit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should set authErrorMessage when login fails', () => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('auth/wrong-password')));
    component.loginForm.patchValue({ email: 'admin@example.com', password: 'wrong' });

    component.onSubmit();

    expect(component.authErrorMessage).toBeTruthy();
    expect(component.isSubmitting).toBeFalse();
  });

  it('should detect authError query param and set error message', () => {
    // Re-create component with authError param
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ authError: '1' }) },
        },
      ],
    });

    const f2 = TestBed.createComponent(LoginComponent);
    f2.detectChanges();

    expect(f2.componentInstance.authErrorMessage).toBeTruthy();
  });

  it('should set isAlreadyLogged to true when user is already authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(of(true));

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
      ],
    });

    const f3 = TestBed.createComponent(LoginComponent);
    f3.detectChanges();

    expect(f3.componentInstance.isAlreadyLogged).toBeTrue();
  });
});
