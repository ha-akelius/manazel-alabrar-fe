import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CourseInstance,
  Media,
  PathInstance,
  Prisma,
  QuizInstance,
  QuizInstanceStudent,
  Student,
  StudentPathInstance,
} from '@prisma/client';
import { Observable } from 'rxjs';
import { FinishStudentLesson, Lesson, Question } from '../models/schema';
// import { BFF } from '../models/schema-bff';
// import { courses, student } from './student-mock';

export type CourseFE = Omit<CourseInstance, 'lessons'> & { lessons: Lesson[]; book: Media };
export type QuizzFE = Omit<QuizInstance, 'questions'> & { questions: Question[]; quizStudents: QuizInstanceStudent[] };

export type CourseInstanceInfo = CourseFE & { quizzes: QuizzFE[] };
export type PathInstanceInfo = PathInstance & { courseInstance: CourseInstanceInfo[] };
export type StudentPathInstanceInfo = StudentPathInstance & { pathInstance: PathInstanceInfo };

export type StudentInfo = Student & { studentPathInstance: StudentPathInstanceInfo[] };
export type QuizInstanceStudentInfo = Omit<Prisma.QuizInstanceStudentCreateInput, 'quiz' | 'student'> & {
  quizId: number;
  studentId: number;
};

export interface Response<T> {
  data?: T;
  error?: {
    message: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  loadStudent(): Observable<StudentInfo> {
    // return of(student);
    return this.http.get<StudentInfo>('/api/student/my-paths');
  }

  loadOpenPath(): Observable<PathInstance[]> {
    return this.http.get<PathInstance[]>('/api/student/open-paths');
  }

  register(path: number) {
    return this.http.get<StudentPathInstance>('/api/student/register/' + path);
  }

  // saveProfile(name: string): Observable<BFF.saveProfile.response> {
  //   return this.http.post<BFF.saveProfile.response>('/api/user/open-paths/save-profile', { name });
  // }

  finishLesson(sudentQuizBody: FinishStudentLesson): Observable<CourseFE> {
    return this.http.post<CourseFE>(`/api/student/finish-lesson`, sudentQuizBody);
  }

  finishExam(sudentQuizBody: QuizInstanceStudentInfo): Observable<QuizzFE> {
    return this.http.post<QuizzFE>(`/api/student/finish-exam`, sudentQuizBody);
  }
}
