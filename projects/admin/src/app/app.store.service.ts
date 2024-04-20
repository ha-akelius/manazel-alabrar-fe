import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  language = signal('en');
  isRtl = computed(() => this.language() === 'ar');

  changeLanguage(language: string): void {
    this.language.set(language);
    const dir = this.isRtl() ? 'rtl' : 'ltr';
    document.body.dir = dir;
  }
}
