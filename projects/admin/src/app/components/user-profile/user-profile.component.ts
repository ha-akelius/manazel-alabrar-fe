import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Language, User } from '@prisma/client';
import { APIService } from '../../../core/services/api.service';
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
  passordForm = this.getPasswordFormGroup();
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
    this.passordForm.patchValue({
      password: form.password,
    });
  }

  save(): void {
    const updatedUser = this.form.value;
    this.saveUser(updatedUser);
    this.openSnackbar($localize`done successfully`);
  }
  cancel(): void {
    this.form.patchValue(this.user);
    this.openSnackbar($localize`cancel done`);
  }
  resetPasswordForm(): void {
    this.passordForm.reset();
    this.passordForm.patchValue(this.user);
    this.openSnackbar($localize`done successfully`);
  }

  resetPassword(): void {
    const password = this.passordForm.getRawValue().password;
    this.saveUser({ password });
    this.openSnackbar($localize`cancel done`);
  }

  private saveUser(updatedUser: Partial<User>) {
    this.user = { ...this.user, ...updatedUser };
    this.apiService.user.update(this.authService.getUserId(), this.user).subscribe((user) => {
      this.form.patchValue(user);
    });
  }

  matchpassword(): ValidatorFn {
    return (control1) => {
      const control = control1.parent as ReturnType<UserProfileComponent['getPasswordFormGroup']>;
      if (!control) return null;
      const password = control.controls.password.value;
      const confirmpassword = control.controls.confirmpassword.value;
      if (password !== confirmpassword) {
        return {
          passwordmatcherror: true,
        };
      }
      return null;
    };
  }

  getFormGroup() {
    return this.fb.group({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      language: new FormControl<Language>(Language.ar, { nonNullable: true }),
    });
  }

  getPasswordFormGroup() {
    return this.fb.group({
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmpassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, this.matchpassword()],
      }),
    });
  }

  private openSnackbar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
