import { Component, HostBinding } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '@prisma/client';
import { FormFieldComponent } from '../../../../core/components/table/table';

@Component({
  selector: 'app-roles-form',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule],
  templateUrl: './roles-form.component.html',
  styleUrl: './roles-form.component.scss',
})
export class RolesFormComponent extends FormFieldComponent<Role[]> {
  options = [Role.STUDENT, Role.TEACHER];
  @HostBinding('class') className = 'col-xs-12 col-sm-6 col-lg-4 padded-field';
}
