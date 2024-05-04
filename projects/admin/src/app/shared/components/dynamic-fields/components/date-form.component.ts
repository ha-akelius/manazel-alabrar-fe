import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from '../../../../../core/components/table/table';

@Component({
  selector: 'app-date-form',
  standalone: true,
  imports: [MatInputModule, MatDatepickerModule, ReactiveFormsModule],
  template: `
    <mat-form-field>
      <mat-label>{{ propInfo.guiInfo.label }}</mat-label>
      <input
        matInput
        [matDatepicker]="myDatepicker"
        placeholder="Choose a date"
        [formControl]="formControl"
        (click)="myDatepicker.open()"
      />
      <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
      <mat-datepicker #myDatepicker></mat-datepicker>
    </mat-form-field>
  `,
})
export class DateFormComponent extends FormComponent {}
