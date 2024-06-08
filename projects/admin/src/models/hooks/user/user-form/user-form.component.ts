import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '@prisma/client';
import { SchemaFormComponent } from '../../../../core/components/table/table';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ResetPasswordComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent extends SchemaFormComponent<User> {}
