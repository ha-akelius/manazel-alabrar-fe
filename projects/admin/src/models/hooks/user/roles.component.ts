import { Component, HostBinding } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '@prisma/client';
import { translations } from '../../../app/translations';
import { FormFieldComponent } from '../../../core/components/table/table';

@Component({
  selector: 'app-roles-form',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule],
  template: `
    <mat-form-field>
      <mat-label>{{ translations.general.roles }}</mat-label>
      <mat-select [formControl]="formControl" multiple>
        @for (option of options; track option) {
          <mat-option [value]="option">{{ translations.role[option] }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class RolesFormComponent extends FormFieldComponent<Role[]> {
  options = Object.values(Role);
  @HostBinding('class') className = 'col-xs-12 col-sm-6 col-lg-4 padded-field';
  translations = translations;
}
