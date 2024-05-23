import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService, sessionKeys } from './storage.service';

export const LOGIN_INFO = 'login_info';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginTracker = new BehaviorSubject(this.isLoggedIn());

  loggedInStatus$ = this.loginTracker.asObservable();

  constructor(private router: Router, private ss: StorageService) {}

  saveToken(providerName: string, user?: { identifier: string; password: string }): Promise<boolean> {
    const requestInit: RequestInit | undefined = !user
      ? undefined
      : {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header if sending JSON data
            'cache-control': 'no-cache',
          },
          body: JSON.stringify(user), // Convert the data to JSON string
        };
    const callBack = !user ? `/callback${location.search}` : '';

    return fetch(`/api/auth/${providerName}${callBack}`, requestInit)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        this.ss.setItem(sessionKeys.jwt, res.jwt);
        this.ss.setItem(sessionKeys.username, res.user.username);
        if (user) {
          this.ss.setItem(LOGIN_INFO, JSON.stringify(user));
        }
        this.loginTracker.next(true);
        this.router.navigateByUrl('/ar/user');
      })
      .then(() => true);
  }

  logout() {
    this.ss.clear();
    this.loginTracker.next(false);
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return this.ss.getItem('jwt') !== null;
  }

  getPersistedToken(): string {
    return this.ss.getItem('jwt') || '';
  }

  getAuthHeader() {
    return {
      headers: { Authorization: `Bearer ${this.getPersistedToken()}` },
    };
  }
}
