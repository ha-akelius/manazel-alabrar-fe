import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Language, User } from '@prisma/client';
import { APIService } from '../../../core/services/api.service';
import { ResetPasswordComponent } from '../../../models/hooks/user/reset-password/reset-password.component';
import { AuthService } from '../../auth-service.service';
import { translations } from '../../translations';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    ResetPasswordComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  translations = translations;
  languages = Object.values(Language);
  apiService = inject(APIService);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  form = this.getFormGroup();
  user: User;
  durationInSeconds = 3;

  constructor(private fb: FormBuilder) {
    this.getUserById(this.authService.getUserId());
  }

  getUserById(userId: number): void {
    this.apiService.user.findOne(userId).subscribe((form) => {
      this.user = form;
      this.fillFormWithUserData(form);
    });
  }

  fillFormWithUserData(form: User): void {
    this.form.patchValue(form);
  }

  save(): void {
    const updatedUser = this.form.value;
    this.saveUser(updatedUser);
  }
  cancel(): void {
    this.form.patchValue(this.user);
    this.openSnackbar($localize`cancel done`);
  }

  private saveUser(updatedUser: Partial<User>) {
    this.user = { ...this.user, ...updatedUser };
    this.apiService.user.update(this.authService.getUserId(), this.user).subscribe((user) => {
      this.form.patchValue(user);
      this.openSnackbar($localize`done successfully`);
    });
  }

  getFormGroup() {
    return this.fb.group({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      language: new FormControl<Language>(Language.ar, { nonNullable: true }),
    });
  }

  private openSnackbar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
