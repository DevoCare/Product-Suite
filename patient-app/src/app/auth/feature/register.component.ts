import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../data-access';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, CardModule, InputTextModule, PasswordModule, ButtonModule],
    template: `
    <div class="register-container">
      <p-card styleClass="register-card">
        <ng-template pTemplate="header">
          <div class="register-header">
            <div class="logo">
              <i class="pi pi-heart-fill"></i>
              <span>GoHealth</span>
            </div>
            <h1>Create Account</h1>
            <p>Join the patient portal to manage your health</p>
          </div>
        </ng-template>

        <div class="register-form">
          <div class="formgrid grid">
            <div class="field col-12 md:col-6">
              <label for="firstName">First Name</label>
              <input id="firstName" type="text" pInputText [(ngModel)]="firstName" class="w-full" />
            </div>
            <div class="field col-12 md:col-6">
              <label for="lastName">Last Name</label>
              <input id="lastName" type="text" pInputText [(ngModel)]="lastName" class="w-full" />
            </div>
          </div>

          <div class="field">
            <label for="email">Email</label>
            <input id="email" type="email" pInputText [(ngModel)]="email" placeholder="email@example.com" class="w-full" />
          </div>

          <div class="field">
            <label for="password">Password</label>
            <p-password id="password" [(ngModel)]="password" [toggleMask]="true" styleClass="w-full" inputStyleClass="w-full" />
          </div>

          @if (errorMessage()) {
            <div class="error-message">
              <i class="pi pi-exclamation-circle"></i>
              {{ errorMessage() }}
            </div>
          }

          <button pButton label="Sign Up" icon="pi pi-user-plus" class="w-full" [loading]="authService.isLoading()" (click)="register()"></button>

          <div class="login-link">
            <span>Already have an account? </span>
            <a routerLink="/login">Sign In</a>
          </div>
        </div>

        <ng-template pTemplate="footer">
          <div class="trust-badges">
            <span><i class="pi pi-shield"></i> HIPAA Compliant</span>
            <span><i class="pi pi-lock"></i> 256-bit Encryption</span>
          </div>
        </ng-template>
      </p-card>
    </div>
  `,
    styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--teal-600) 0%, var(--teal-800) 100%);
      padding: 1rem;
    }
    :host ::ng-deep .register-card { width: 100%; max-width: 500px; }
    .register-header { text-align: center; padding: 2rem 2rem 1rem; }
    .logo { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 1.5rem; font-weight: 700; color: var(--teal-600); margin-bottom: 1rem; }
    .logo i { font-size: 2rem; }
    .register-header h1 { margin: 0 0 0.5rem; font-size: 1.5rem; }
    .register-header p { margin: 0; color: var(--text-color-secondary); }
    .register-form { padding: 0 1rem; }
    .field { margin-bottom: 1.25rem; }
    .field label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
    .error-message { background: var(--red-50); color: var(--red-700); padding: 0.75rem; border-radius: var(--border-radius); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
    .login-link { margin-top: 1.5rem; text-align: center; padding: 1rem; }
    .login-link a { color: var(--teal-600); font-weight: 600; text-decoration: none; }
    .login-link a:hover { text-decoration: underline; }
    .trust-badges { display: flex; justify-content: center; gap: 1.5rem; padding: 1rem; border-top: 1px solid var(--surface-border); }
    .trust-badges span { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: var(--text-color-secondary); }
    .w-full { width: 100%; }
  `]
})
export class RegisterComponent {
    readonly authService = inject(AuthService);

    firstName = '';
    lastName = '';
    email = '';
    password = '';
    errorMessage = signal<string | null>(null);

    async register(): Promise<void> {
        if (!this.email || !this.password || !this.firstName || !this.lastName) {
            this.errorMessage.set('All fields are required');
            return;
        }

        this.errorMessage.set(null);
        const result = await this.authService.register({
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName
        });

        if (!result.success) {
            this.errorMessage.set(result.error || 'Registration failed');
        }
    }
}
