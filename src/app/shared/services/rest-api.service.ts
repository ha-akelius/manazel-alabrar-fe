import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';

export class RestApiService<T, Select, CreateInput, UpdateInput> {
  apiUrl = `/api/${this.apiName}`;

  constructor(private apiName: string, private httpClient: HttpClient) {}

  findAll(x?: Select, page?: number, size?: number): Observable<Result<T[]>> {
    const params: { filter?: string; page?: number; size?: number } = {};
    if (x) {
      params.filter = JSON.stringify(x);
    }

    if (page) {
      params.page = page;
    }
    if (size) {
      params.size = size;
    }

    return this.httpClient.get<Result<T[]>>(this.apiUrl, { params });
  }

  findOne(id: string | number): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${id}`);
  }

  create(obj: CreateInput): Observable<T> {
    return this.httpClient.post<T>(this.apiUrl, obj);
  }

  update(id: string | number, obj: UpdateInput): Observable<T> {
    return this.httpClient.patch<T>(`${this.apiUrl}/${id}`, obj);
  }

  delete(id: string | number): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiUrl}/${id}`);
  }
}
