/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppStoreService } from '../app.store.service';
import { AuthService, LoginStatus } from '../auth-service.service';

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
export class LoginComponent implements OnInit {
  loginForm = this.builder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  loginStatus: LoginStatus;
  rememberMe: boolean = false;
  password: string = '';
  rememberedUsername: string = '';
  rememberedPassword: string = '';
  constructor(
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private appStore: AppStoreService,
    private router: Router,
  ) {}

  ngOnInit() {
    const rememberedUsername = localStorage.getItem(storageKeys.userName);
    const rememberedPassword = localStorage.getItem(storageKeys.password);
    if (rememberedUsername && rememberedPassword) {
      this.rememberMe = true;
      this.rememberedUsername = rememberedUsername;
      this.rememberedPassword = rememberedPassword;
    }
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.getRawValue();
      this.authService.logIn(username, password).then((loginStatus) => {
        if (loginStatus === 'Success') {
          if (this.rememberMe) {
            localStorage.setItem(storageKeys.userName, username);
            localStorage.setItem(storageKeys.password, password);
          }
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

  rememberPassword() {
    if (this.rememberMe) {
      localStorage.setItem(storageKeys.userName, this.rememberedUsername);
      localStorage.setItem(storageKeys.password, this.rememberedPassword);
    } else {
      localStorage.removeItem(storageKeys.userName);
      localStorage.removeItem(storageKeys.password);
    }
  }
}
