import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@prisma/client';
import { translations } from '../../../../app/translations';
import { APIService } from '../../../../core/services/api.service';

@Component({
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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  durationInSeconds = 3;
  apiService = inject(APIService);
  snackBar = inject(MatSnackBar);
  translations = translations;

  passordForm = this.getPasswordFormGroup();

  @Input({ required: true }) user: User;

  ngOnInit(): void {
    this.passordForm.patchValue({ password: this.user.password });
  }

  matchpassword(): ValidatorFn {
    return (control1) => {
      const control = control1.parent as ReturnType<ResetPasswordComponent['getPasswordFormGroup']>;
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

  getPasswordFormGroup() {
    return new FormGroup({
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

  resetPasswordForm(): void {
    this.passordForm.reset();
    this.passordForm.patchValue(this.user);
  }

  resetPassword(): void {
    const password = this.passordForm.getRawValue().password;
    this.saveUser({ password });
    this.openSnackbar($localize`cancel done`);
  }

  private openSnackbar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  private saveUser(updatedUser: Partial<User>) {
    this.user = { ...this.user, ...updatedUser };
    this.apiService.user.update(this.user.id, this.user).subscribe(() => {
      this.openSnackbar($localize`done successfully`);
    });
  }
}
