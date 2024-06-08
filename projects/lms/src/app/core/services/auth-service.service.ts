import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '@prisma/client';

const storage = {
  username: 'username',
  password: 'password',
  token: 'token',
};

export type LoginStatus = 'Success' | 'Unauthorized' | 'unkown_error';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSignal = signal<boolean>(this.hasToken());

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private translateService: TranslateService,
  ) {}

  getToken(): string | null {
    return localStorage.getItem(storage.token);
  }

  logIn(username: string, password: string): Promise<LoginStatus> {
    localStorage.setItem(storage.username, username);
    localStorage.setItem(storage.password, password);
    return new Promise<LoginStatus>((resolve) => {
      this.httpClient
        .post<{ access_token: string; roles: Role[] }>('/api/auth/login', { username, password })
        .subscribe({
          next: ({ access_token, roles }) => {
            if (!roles.includes(Role.STUDENT)) {
              resolve('Unauthorized');
            }
            localStorage.setItem(storage.token, access_token);
            this.loggedInSignal.set(true);
            resolve('Success');
          },
          error: (error: HttpErrorResponse) => {
            this.loggedInSignal.set(false);
            resolve(error.status === 401 ? 'Unauthorized' : 'unkown_error');
          },
        });
    });
  }

  logOut(): void {
    this.loggedInSignal.set(false);
    this.router.navigate([this.translateService.currentLang ?? 'ar', 'login']);
  }

  isLoggedIn(): boolean {
    return this.loggedInSignal();
  }

  loggedInStatus = this.loggedInSignal.asReadonly();

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate([this.translateService.currentLang ?? 'ar', 'login']);
      return false;
    }
    return true;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(storage.token);
  }
}
