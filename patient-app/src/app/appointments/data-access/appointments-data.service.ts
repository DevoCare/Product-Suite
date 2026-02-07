import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Appointment } from '../../shared/data-access';

@Injectable({ providedIn: 'root' })
export class AppointmentsDataService {
  private http = inject(HttpClient);

  private readonly _appointments = signal<Appointment[]>([]);
  private readonly _isLoading = signal(false);

  readonly appointments = this._appointments.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly upcomingAppointments = computed(() =>
    this._appointments().filter(a => a.status === 'scheduled' || a.status === 'confirmed' || a.status === 'checked-in')
  );

  readonly pastAppointments = computed(() =>
    this._appointments().filter(a => a.status === 'completed' || a.status === 'cancelled' || a.status === 'no-show')
  );

  async loadAppointments(): Promise<void> {
    this._isLoading.set(true);
    try {
      const appts = await firstValueFrom(this.http.get<Appointment[]>(`${environment.apiUrl}/appointments`));
      this._appointments.set(appts);
    } catch (err) {
      console.error('Failed to load appointments', err);
    } finally {
      this._isLoading.set(false);
    }
  }

  async confirmAppointment(appointmentId: string): Promise<boolean> {
    try {
      await firstValueFrom(this.http.put(`${environment.apiUrl}/appointments/${appointmentId}`, { status: 'confirmed', confirmationRequired: false }));
      this._appointments.update(appts =>
        appts.map(a => a.id === appointmentId ? { ...a, status: 'confirmed' as const, confirmationRequired: false } : a)
      );
      return true;
    } catch {
      return false;
    }
  }

  async cancelAppointment(appointmentId: string, reason: string): Promise<boolean> {
    try {
      await firstValueFrom(this.http.put(`${environment.apiUrl}/appointments/${appointmentId}`, { status: 'cancelled', reason }));
      this._appointments.update(appts =>
        appts.map(a => a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a)
      );
      return true;
    } catch {
      return false;
    }
  }

  async checkIn(appointmentId: string): Promise<boolean> {
    try {
      await firstValueFrom(this.http.put(`${environment.apiUrl}/appointments/${appointmentId}`, { status: 'checked-in' }));
      this._appointments.update(appts =>
        appts.map(a => a.id === appointmentId ? { ...a, status: 'checked-in' as const } : a)
      );
      return true;
    } catch {
      return false;
    }
  }
}
