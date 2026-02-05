import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PatientUser } from '../../shared/data-access';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _user = signal<PatientUser | null>(null);
  private _isAuthenticated = signal(false);
  private _mfaRequired = signal(false);
  private _mfaVerified = signal(false);
  private _isLoading = signal(false);

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly mfaRequired = this._mfaRequired.asReadonly();
  readonly mfaVerified = this._mfaVerified.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly isFullyAuthenticated = computed(() =>
    this._isAuthenticated() && (!this._mfaRequired() || this._mfaVerified())
  );

  constructor() {
    this.checkStoredSession();
  }

  private async checkStoredSession(): Promise<void> {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await firstValueFrom(this.http.get<PatientUser>(`${environment.apiUrl}/auth/me`));
        this._user.set(user);
        this._isAuthenticated.set(true);
        this._mfaRequired.set(user.mfaEnabled || false);
        this._mfaVerified.set(true); // Assuming token session handles MFA once verified
      } catch {
        this.clearSession();
      }
    }
  }

  async register(userData: Partial<PatientUser> & { password?: string }): Promise<{ success: boolean; error?: string }> {
    this._isLoading.set(true);
    try {
      const response = await firstValueFrom(
        this.http.post<{ token: string }>(`${environment.apiUrl}/auth/register`, userData)
      );

      localStorage.setItem('token', response.token);

      // Get user details
      const user = await firstValueFrom(this.http.get<PatientUser>(`${environment.apiUrl}/auth/me`));

      this._user.set(user);
      this._isAuthenticated.set(true);
      this._mfaRequired.set(user.mfaEnabled || false);
      this._mfaVerified.set(true); // Initial registration might skip MFA or have it off

      this.router.navigate(['/dashboard']);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.error?.msg || 'Registration failed' };
    } finally {
      this._isLoading.set(false);
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this._isLoading.set(true);
    try {
      const response = await firstValueFrom(
        this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, { email, password })
      );

      localStorage.setItem('token', response.token);

      // Get user details
      const user = await firstValueFrom(this.http.get<PatientUser>(`${environment.apiUrl}/auth/me`));

      this._user.set(user);
      this._isAuthenticated.set(true);
      this._mfaRequired.set(user.mfaEnabled || false);
      this._mfaVerified.set(false);

      if (user.mfaEnabled) {
        this.router.navigate(['/mfa']);
      } else {
        this._mfaVerified.set(true);
        this.router.navigate(['/dashboard']);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.error?.msg || 'Invalid credentials' };
    } finally {
      this._isLoading.set(false);
    }
  }

  async verifyMfa(code: string): Promise<{ success: boolean; error?: string }> {
    this._isLoading.set(true);
    try {
      // Mock MFA verification for now as it's not in backend yet
      await new Promise(r => setTimeout(r, 500));
      if (code === '123456' || code.length === 6) {
        this._mfaVerified.set(true);
        this.router.navigate(['/dashboard']);
        return { success: true };
      }
      return { success: false, error: 'Invalid code' };
    } finally {
      this._isLoading.set(false);
    }
  }

  async resendMfaCode(method: 'sms' | 'email'): Promise<boolean> {
    await new Promise(r => setTimeout(r, 300));
    return true;
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  private clearSession(): void {
    localStorage.removeItem('token');
    this._user.set(null);
    this._isAuthenticated.set(false);
    this._mfaRequired.set(false);
    this._mfaVerified.set(false);
  }
}
