import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSignal = signal<boolean>(this.hasToken());

  constructor(private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('username') && !!localStorage.getItem('password');
  }

  logIn(username: string, password: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    this.loggedInSignal.set(true);
  }

  logOut(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
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
}
