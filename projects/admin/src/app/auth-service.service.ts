import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

const storage = {
  username: 'username',
  password: 'password',
  token: 'token',
  userId: 'userId',
};

export type LoginStatus = 'Success' | 'Unauthorized' | 'unkown_error';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSignal = signal<boolean>(this.hasToken());

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) {}

  getToken(): string | null {
    return localStorage.getItem(storage.token);
  }

  getUserId(): number {
    return Number(localStorage.getItem(storage.userId));
  }

  logIn(username: string, password: string): Promise<LoginStatus> {
    localStorage.setItem(storage.username, username);
    localStorage.setItem(storage.password, password);
    return new Promise<LoginStatus>((resolve) => {
      this.httpClient
        .post<{ access_token: string; userId: number }>('/api/auth/login', { username, password })
        .subscribe({
          next: ({ access_token, userId }) => {
            localStorage.setItem(storage.token, access_token);
            localStorage.setItem(storage.userId, userId + '');
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
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedInSignal();
  }

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(storage.token);
  }
}
