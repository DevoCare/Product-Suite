import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Medication, LabResult, Allergy, Immunization } from '../../shared/data-access';

@Injectable({ providedIn: 'root' })
export class HealthRecordsService {
    private http = inject(HttpClient);

    private _medications = signal<Medication[]>([]);
    private _labResults = signal<LabResult[]>([]);
    private _allergies = signal<Allergy[]>([]);
    private _immunizations = signal<Immunization[]>([]);
    private _isLoading = signal(false);

    readonly medications = this._medications.asReadonly();
    readonly labResults = this._labResults.asReadonly();
    readonly allergies = this._allergies.asReadonly();
    readonly immunizations = this._immunizations.asReadonly();
    readonly isLoading = this._isLoading.asReadonly();

    async loadRecords(): Promise<void> {
        this._isLoading.set(true);
        try {
            const records = await firstValueFrom(this.http.get<any[]>(`${environment.apiUrl}/records`));

            this._medications.set(records.filter(r => r.type === 'medication'));
            this._labResults.set(records.filter(r => r.type === 'lab'));
            this._allergies.set(records.filter(r => r.type === 'allergy'));
            this._immunizations.set(records.filter(r => r.type === 'immunization'));
        } catch (err) {
            console.error('Failed to load health records', err);
        } finally {
            this._isLoading.set(false);
        }
    }
}
