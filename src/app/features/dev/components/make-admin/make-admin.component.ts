import type { OnInit } from '@angular/core';
import { Component, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import type { User } from '@angular/fire/auth';

type Step = 'idle' | 'writing' | 'waiting' | 'verifying' | 'done' | 'error';

@Component({
  selector: 'app-make-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="card">
        <h1>🔧 Dev: Asignar rol Admin</h1>

        <ng-container *ngIf="currentUser; else notLoggedIn">
          <p class="user-info">
            Sesión: <strong>{{ currentUser.email }}</strong>
          </p>

          <ng-container *ngIf="isAdmin; else notAdmin">
            <div class="status success">✅ Este usuario ya tiene el rol de admin.</div>
            <div class="actions">
              <button class="btn primary" (click)="go('/admin/dashboard')">Ir al Dashboard</button>
              <button class="btn secondary" (click)="go('/admin/_dev/seed')">Ir al Seed</button>
            </div>
          </ng-container>

          <ng-template #notAdmin>
            <div class="steps" *ngIf="step !== 'idle'">
              <div
                class="step"
                [class.active]="step === 'writing'"
                [class.done]="isStepDone('writing')"
              >
                <span class="icon">{{
                  isStepDone('writing') ? '✅' : step === 'writing' ? '⏳' : '⬜'
                }}</span>
                Escribiendo rol en Firestore
              </div>
              <div
                class="step"
                [class.active]="step === 'waiting'"
                [class.done]="isStepDone('waiting')"
              >
                <span class="icon">{{
                  isStepDone('waiting') ? '✅' : step === 'waiting' ? '⏳' : '⬜'
                }}</span>
                Esperando Cloud Function
              </div>
              <div
                class="step"
                [class.active]="step === 'verifying'"
                [class.done]="isStepDone('verifying')"
              >
                <span class="icon">{{
                  isStepDone('verifying') ? '✅' : step === 'verifying' ? '⏳' : '⬜'
                }}</span>
                Verificando token ({{ pollCount }}/{{ maxPolls }})
              </div>
            </div>

            <div class="status error" *ngIf="step === 'error'">❌ {{ errorMessage }}</div>

            <div class="status success" *ngIf="step === 'done'">
              ✅ ¡Listo! Token actualizado con el claim admin.
            </div>

            <div class="actions" *ngIf="step === 'done'">
              <button class="btn primary" (click)="go('/admin/dashboard')">Ir al Dashboard</button>
              <button class="btn secondary" (click)="go('/admin/_dev/seed')">Ir al Seed</button>
            </div>

            <button
              *ngIf="step === 'idle' || step === 'error'"
              class="btn primary"
              (click)="makeAdmin()"
              [disabled]="step !== 'idle' && step !== 'error'"
            >
              Asignarme rol Admin
            </button>
          </ng-template>
        </ng-container>

        <ng-template #notLoggedIn>
          <p>No hay ningún usuario con sesión iniciada.</p>
          <button class="btn primary" (click)="go('/admin/login')">Iniciar sesión</button>
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #f0f2f5;
      }
      .card {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        width: 100%;
        max-width: 480px;
      }
      h1 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }
      .user-info {
        color: #666;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
      }
      .steps {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        margin-bottom: 1.5rem;
      }
      .step {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: #999;
      }
      .step.active {
        color: #1a73e8;
        font-weight: 600;
      }
      .step.done {
        color: #2e7d32;
      }
      .status {
        padding: 0.75rem 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-size: 0.9rem;
      }
      .status.success {
        background: #e8f5e9;
        color: #2e7d32;
      }
      .status.error {
        background: #fdecea;
        color: #c62828;
      }
      .actions {
        display: flex;
        gap: 0.75rem;
        margin-top: 0.5rem;
      }
      .btn {
        padding: 0.6rem 1.2rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
      }
      .btn.primary {
        background: #1a73e8;
        color: white;
      }
      .btn.secondary {
        background: #f1f3f4;
        color: #333;
      }
      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ],
})
export class MakeAdminComponent implements OnInit {
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private router = inject(Router);
  private injector = inject(EnvironmentInjector);

  currentUser: User | null = null;
  isAdmin = false;
  step: Step = 'idle';
  errorMessage = '';
  pollCount = 0;
  readonly maxPolls = 8;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        void user.getIdTokenResult(true).then((token) => {
          this.isAdmin = token.claims['admin'] === true;
        });
      }
    });
  }

  isStepDone(s: Step): boolean {
    const order: Step[] = ['idle', 'writing', 'waiting', 'verifying', 'done'];
    return order.indexOf(this.step) > order.indexOf(s);
  }

  go(path: string): void {
    void this.router.navigate([path]);
  }

  async makeAdmin(): Promise<void> {
    if (!this.currentUser?.email) {
      return;
    }

    this.step = 'writing';
    this.errorMessage = '';
    this.pollCount = 0;

    try {
      await runInInjectionContext(this.injector, () => {
        const ref = doc(this.firestore, `admin_roles/${this.currentUser!.email!.toLowerCase()}`);
        return setDoc(ref, { role: 'admin' });
      });

      this.step = 'waiting';
      await this.pollForAdminClaim();
    } catch (err: unknown) {
      this.step = 'error';
      this.errorMessage = (err as Error).message ?? 'Error desconocido.';
    }
  }

  private async pollForAdminClaim(): Promise<void> {
    this.step = 'verifying';

    for (let i = 0; i < this.maxPolls; i++) {
      this.pollCount = i + 1;
      await new Promise((r) => setTimeout(r, 2000));

      await this.currentUser!.getIdToken(true);
      const result = await this.currentUser!.getIdTokenResult();

      if (result.claims['admin'] === true) {
        this.isAdmin = true;
        this.step = 'done';
        return;
      }
    }

    this.step = 'error';
    this.errorMessage = `La Cloud Function no respondió en ${this.maxPolls * 2} segundos. Verificá que esté deployada y reintentá.`;
  }
}
