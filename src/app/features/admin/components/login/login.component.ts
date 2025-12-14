import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm!: FormGroup;
  authErrorMessage = '';
  isAlreadyLogged = false;
  isSubmitting = false;
  showPassword = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.authService.isAuthenticated().pipe(take(1)).subscribe((isAuth) => {
      this.isAlreadyLogged = isAuth;
    });

    this.route.queryParams.subscribe(params => {
      if (params['authError']) {
        this.authErrorMessage = 'Debes iniciar sesión para acceder al panel de administración.';
      }
    });
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).pipe(take(1)).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: (err: any) => {
        this.authErrorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
        this.isSubmitting = false;
      }
    });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.isAlreadyLogged = false;
  }
}