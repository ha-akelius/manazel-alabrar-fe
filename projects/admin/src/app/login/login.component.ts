import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.builder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    if (this.loginForm.valid) {
      this.authService.logIn(this.loginForm.getRawValue().username, this.loginForm.getRawValue().password);
      this.router.navigate(['/home']);
    } else {
      this.snackBar.open('Invalid User Name or Password!', 'Close', {
        duration: 5000,
      });
    }
  }
}
