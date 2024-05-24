import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = signal(false);

  updateLoading(loading: boolean) {
    this.loading.set(loading);
  }
}
