import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '@prisma/client';
import { FormComponent } from '../../../../core/components/table/table';

@Component({
  selector: 'app-roles-form',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule],
  templateUrl: './roles-form.component.html',
  styleUrl: './roles-form.component.scss',
})
export class RolesFormComponent extends FormComponent<Role[]> {
  options = [Role.STUDENT, Role.TEACHER];
}
