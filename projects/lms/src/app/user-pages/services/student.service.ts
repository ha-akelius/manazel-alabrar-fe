import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BFF } from '../models/schema-bff';
// import { courses, student } from './student-mock';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  loadStudent(): Observable<BFF.myPaths.response> {
    // return of(student);
    return this.http.get<BFF.myPaths.response>('/api/user/my-paths');
  }

  loadOpenPath(): Observable<BFF.openPath.response> {
    return this.http.get<BFF.openPath.response>('/api/user/open-paths');
  }

  register(path: number): Observable<BFF.register.response> {
    return this.http.get<BFF.register.response>('/api/user/open-paths/register/' + path);
  }

  saveProfile(name: string): Observable<BFF.saveProfile.response> {
    return this.http.post<BFF.saveProfile.response>('/api/user/open-paths/save-profile', { name });
  }

  finishLesson(sudentQuizBody: BFF.StudentLessonBody): Observable<BFF.studentLessonResponse.response> {
    return this.http.post<BFF.studentLessonResponse.response>(`/api/user/open-paths/finish-lesson`, sudentQuizBody);
  }

  finishExam(sudentQuizBody: BFF.StudentLessonBody): Observable<BFF.studentLessonResponse.response> {
    return this.http.post<BFF.studentLessonResponse.response>(`/api/user/open-paths/finish-exam`, sudentQuizBody);
  }

  finishQuiz(body: BFF.StudentQuizBody): Observable<BFF.studentLessonResponse.response> {
    return this.http.post<BFF.studentLessonResponse.response>(`/api/user/open-paths/finish-quiz`, body);
  }
}
