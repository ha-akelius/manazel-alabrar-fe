import { Component, HostBinding } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Role } from '@prisma/client';
import { translations } from '../../../app/translations';
import { FormFieldComponent } from '../../../core/components/table/table';

@Component({
  selector: 'app-roles-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule],
  template: `
    @if (!record) {
      <mat-form-field>
        <mat-label>{{ propInfo.guiInfo.label }}</mat-label>
        <input
          matInput
          type="password"
          [required]="!propInfo.propInformation.basic.optional"
          [formControl]="formControl"
        />
      </mat-form-field>
    }
  `,
})
export class PasswordFormComponent extends FormFieldComponent<string> {
  options = [Role.STUDENT, Role.TEACHER];
  @HostBinding('class') className = 'col-xs-12 col-sm-6 col-lg-4 padded-field';
  translations = translations;
}
