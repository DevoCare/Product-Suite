import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { Medication, LabResult, Allergy, Immunization } from '../../shared/data-access';
import { HealthRecordsService } from '../data-access/health-records.service';

@Component({
  selector: 'app-health-records',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TabViewModule, TagModule, TableModule],
  template: `
    <div class="records-page" [class.loading]="isLoading()">
      <header class="page-header"><h1>Health Records</h1><p>View your complete health information</p></header>
      
      @if (isLoading()) {
        <div class="flex justify-center p-8"><i class="pi pi-spin pi-spinner text-4xl"></i></div>
      } @else {
        <p-tabView>
          <p-tabPanel header="Medications">
            <div class="medications-grid">
              @for (med of medications(); track med.id) {
                <div class="medication-card" [class.controlled]="med.isControlled">
                  <div class="med-header"><h3>{{ med.medicationName }}</h3>@if (med.isControlled) { <p-tag value="Controlled" severity="warning"></p-tag> }</div>
                  <p class="generic">{{ med.genericName }}</p>
                  <div class="med-details"><p><strong>Dosage:</strong> {{ med.dosage }}</p><p><strong>Frequency:</strong> {{ med.frequency }}</p><p><strong>Prescriber:</strong> {{ med.prescribedBy }}</p></div>
                  <div class="med-refill"><span>{{ med.refillsRemaining }} refills remaining</span>@if (med.canRequestRefill) { <button pButton label="Request Refill" icon="pi pi-refresh" class="p-button-sm"></button> }</div>
                </div>
              } @empty { <p class="empty">No medications on file</p> }
            </div>
          </p-tabPanel>
          <p-tabPanel header="Lab Results">
            <p-table [value]="labResults()" [paginator]="true" [rows]="10" styleClass="p-datatable-sm">
              <ng-template pTemplate="header"><tr><th>Test Name</th><th>Date</th><th>Ordered By</th><th>Status</th><th></th></tr></ng-template>
              <ng-template pTemplate="body" let-lab><tr [class.highlight]="lab.isNew"><td>{{ lab.testName }}@if (lab.isNew) { <p-tag value="New" severity="info" class="ml-2"></p-tag> }</td><td>{{ lab.resultDate | date:'MMM d, y' }}</td><td>{{ lab.orderedBy }}</td><td><p-tag [value]="lab.status" [severity]="lab.hasAbnormal ? 'danger' : 'success'"></p-tag></td><td><button pButton icon="pi pi-eye" class="p-button-text"></button></td></tr></ng-template>
              <ng-template pTemplate="emptymessage"><tr><td colspan="5" class="text-center p-4">No lab results found</td></tr></ng-template>
            </p-table>
          </p-tabPanel>
          <p-tabPanel header="Allergies">
            <div class="allergies-list">
              @for (allergy of allergies(); track allergy.id) {
                <div class="allergy-card" [class]="allergy.severity"><i class="pi pi-exclamation-triangle"></i><div><h4>{{ allergy.allergen }}</h4><p>{{ allergy.reaction }} • {{ allergy.severity }}</p></div></div>
              } @empty { <p class="empty">No allergies on file</p> }
            </div>
          </p-tabPanel>
          <p-tabPanel header="Immunizations">
            <p-table [value]="immunizations()" styleClass="p-datatable-sm">
              <ng-template pTemplate="header"><tr><th>Vaccine</th><th>Date</th><th>Location</th><th>Status</th></tr></ng-template>
              <ng-template pTemplate="body" let-imm><tr><td>{{ imm.vaccineName }}</td><td>{{ imm.administeredDate | date:'MMM d, y' }}</td><td>{{ imm.location }}</td><td><p-tag [value]="imm.seriesComplete ? 'Complete' : 'In Progress'" [severity]="imm.seriesComplete ? 'success' : 'warning'"></p-tag></td></tr></ng-template>
              <ng-template pTemplate="emptymessage"><tr><td colspan="4" class="text-center p-4">No immunizations found</td></tr></ng-template>
            </p-table>
          </p-tabPanel>
        </p-tabView>
      }
    </div>
  `,
  styles: [`.records-page{max-width:1200px;margin:0 auto}.page-header{margin-bottom:2rem}.page-header h1{margin:0}.page-header p{color:var(--text-color-secondary);margin:0.5rem 0 0}.medications-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1rem}.medication-card{padding:1.25rem;background:var(--surface-card);border-radius:var(--border-radius);box-shadow:var(--card-shadow)}.medication-card.controlled{border-left:4px solid var(--orange-500)}.med-header{display:flex;justify-content:space-between;align-items:flex-start}.med-header h3{margin:0}.generic{color:var(--text-color-secondary);font-size:0.875rem;margin:0.25rem 0 1rem}.med-details p{margin:0.25rem 0;font-size:0.875rem}.med-refill{display:flex;justify-content:space-between;align-items:center;margin-top:1rem;padding-top:1rem;border-top:1px solid var(--surface-border)}.med-refill span{font-size:0.875rem;color:var(--text-color-secondary)}.allergies-list{display:flex;flex-direction:column;gap:0.75rem}.allergy-card{display:flex;align-items:center;gap:1rem;padding:1rem;background:var(--surface-card);border-radius:var(--border-radius);border-left:4px solid var(--yellow-500)}.allergy-card.severe,.allergy-card.life_threatening{border-left-color:var(--red-500)}.allergy-card i{font-size:1.5rem;color:var(--yellow-500)}.allergy-card.severe i,.allergy-card.life_threatening i{color:var(--red-500)}.allergy-card h4{margin:0}.allergy-card p{margin:0.25rem 0 0;font-size:0.875rem;color:var(--text-color-secondary)}.empty{text-align:center;padding:2rem;color:var(--text-color-secondary)}.highlight{background:var(--primary-50)}.ml-2{margin-left:0.5rem}.loading{opacity:0.7;pointer-events:none}`]
})
export class HealthRecordsComponent implements OnInit {
  private recordsService = inject(HealthRecordsService);

  medications = this.recordsService.medications;
  labResults = this.recordsService.labResults;
  allergies = this.recordsService.allergies;
  immunizations = this.recordsService.immunizations;
  isLoading = this.recordsService.isLoading;

  ngOnInit() {
    this.recordsService.loadRecords();
  }
}
