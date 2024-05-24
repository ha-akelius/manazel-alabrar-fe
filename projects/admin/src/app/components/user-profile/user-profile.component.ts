import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Language, User } from '@prisma/client';
import { APIService } from '../../../core/services/api.service';
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
  languagesList: string[] = ['Arabic', 'English'];
  apiService = inject(APIService);
  userId = '2';
  user: User;
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    language: new FormControl<Language>(Language.ar, { nonNullable: true }),
  });

  constructor() {
    this.getUserById(this.userId);
  }

  getUserById(userId: string): void {
    this.apiService.user.findOne(userId).subscribe((user) => {
      this.user = user;
      this.fillFormWithUserData();
    });
  }

  fillFormWithUserData(): void {
    this.form.setValue(this.user);
  }

  save(): void {
    const updatedUser = this.form.value;
    this.apiService.user.update(this.userId, updatedUser).subscribe(() => {
      this.fillFormWithUserData();
    });
  }
}
