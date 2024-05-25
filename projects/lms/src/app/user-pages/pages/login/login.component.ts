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
import { AuthService, LoginStatus } from '../../../core/services/auth-service.service';

const storageKeys = {
  userName: 'rememberedUsername',
  password: 'rememberedPassword',
};

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
    rememberMe: [false],
  });
  loginStatus: LoginStatus;

  constructor(
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
  ) {
    const rememberedUsername = localStorage.getItem(storageKeys.userName);
    const rememberedPassword = localStorage.getItem(storageKeys.password);
    if (rememberedUsername && rememberedPassword) {
      this.loginForm.setValue({
        username: rememberedUsername,
        password: rememberedPassword,
        rememberMe: true,
      });
    }
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.getRawValue();
      this.authService.logIn(username, password).then((loginStatus) => {
        if (loginStatus === 'Success') {
          this.checkRememberMe(username, password);
          this.router.navigate(['/dashboard']);
        } else {
          this.loginStatus = loginStatus;
        }
      });
    } else {
      this.snackBar.open('Invalid User Name or Password!', 'Close', {
        duration: 5000,
      });
    }
  }

  private checkRememberMe(username: string, password: string) {
    if (this.loginForm.value.rememberMe) {
      localStorage.setItem(storageKeys.userName, username);
      localStorage.setItem(storageKeys.password, password);
    } else {
      localStorage.removeItem(storageKeys.userName);
      localStorage.removeItem(storageKeys.password);
    }
  }
}
