import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@prisma/client';

const storage = {
  username: 'username',
  token: 'token',
  userId: 'userId',
  roles: 'roles',
};

export type LoginStatus = 'Success' | 'Unauthorized' | 'unkown_error';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSignal = signal<boolean>(this.hasToken());
  loggedInStatus = this.loggedInSignal.asReadonly();

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

  getRoles(): Role[] {
    const roles = localStorage.getItem(storage.roles);
    if (!roles) {
      return [];
    }
    return JSON.parse(roles);
  }

  isAdmin() {
    return this.getRoles().includes(Role.ADMIN);
  }

  getUserName(): string {
    return localStorage.getItem(storage.username)!;
  }

  logIn(username: string, password: string): Promise<LoginStatus> {
    return new Promise<LoginStatus>((resolve) => {
      this.httpClient
        .post<{ access_token: string; userId: number; roles: Role[] }>('/api/auth/login', { username, password })
        .subscribe({
          next: ({ access_token, userId, roles }) => {
            localStorage.setItem(storage.username, username);
            localStorage.setItem(storage.token, access_token);
            localStorage.setItem(storage.userId, userId + '');
            localStorage.setItem(storage.roles, JSON.stringify(roles));
            if (!roles.includes(Role.ADMIN) && !roles.includes(Role.TEACHER)) {
              this.loggedInSignal.set(false);
              resolve('Unauthorized');
            }
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
    localStorage.removeItem(storage.token);
    localStorage.removeItem(storage.userId);
    localStorage.removeItem(storage.roles);
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
