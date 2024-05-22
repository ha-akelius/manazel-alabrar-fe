/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, LoginStatus } from '../auth-service.service';

const rememberToken = 'rememberToken';

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
  rememberMe = new FormControl(true);
  loginStatus: LoginStatus;
  constructor(
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    const rememberedInformation = localStorage.getItem(rememberToken);
    if (rememberedInformation) {
      this.rememberMe.setValue(true);
      this.loginForm.setValue(JSON.parse(rememberedInformation));
    }
  }
  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.getRawValue();
      this.authService.logIn(username, password).then((loginStatus) => {
        if (this.rememberMe.value) {
          localStorage.setItem(rememberToken, JSON.stringify(this.loginForm.getRawValue()));
        }
        if (loginStatus === 'Success') {
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

  remember(save: boolean) {
    if (!save) {
      localStorage.removeItem(rememberToken);
    }
  }
}
