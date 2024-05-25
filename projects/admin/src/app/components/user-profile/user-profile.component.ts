import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
  translations = translations.language;
  languages = Object.values(Language);
  apiService = inject(APIService);
  authService = inject(AuthService);
  form: FormGroup;

  constructor() {
    this.getUserById(this.authService.getUserId());
    this.form = new FormGroup(
      {
        name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        password: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(8)],
        }),
        confirmpassword: new FormControl(''),
        language: new FormControl<Language>(Language.ar, { nonNullable: true }),
      },
      {
        validators: this.matchpassword,
      },
    );
  }

  getUserById(userId: number): void {
    this.apiService.user.findOne(userId).subscribe((form) => {
      this.fillFormWithUserData(form);
    });
  }

  fillFormWithUserData(form: User): void {
    this.form.patchValue(form);
  }

  save(): void {
    if (this.form.valid) {
      const updatedUser = this.form.value;
      this.apiService.user.update(this.authService.getUserId(), updatedUser).subscribe((user) => {
        this.form.patchValue(user);
      });
    }
  }

  matchpassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmpassword = control.get('confirmpassword');
    if (password && confirmpassword && password?.value != confirmpassword?.value) {
      return {
        passwordmatcherror: true,
      };
    }
    return null;
  };
}
