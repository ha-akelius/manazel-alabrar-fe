import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  http = inject(HttpClient);

  uploadFile(mediaId: number, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('files', file);

    return this.http.post(`/api/media/upload/${mediaId}`, formData).pipe(map(() => undefined));
  }
}
