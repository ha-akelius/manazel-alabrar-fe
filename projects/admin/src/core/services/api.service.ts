import { Injectable } from '@angular/core';
import {
  Path,
  PathInstance,
  Course,
  CourseInstance,
  StudentPathInstance,
  Student,
  QuizInstance,
  QuizInstanceStudent,
  Teacher,
  Prisma,
} from '@prisma/client';
import { RestApiService } from '../../shared/services/rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  path = new RestApiService<Path, Prisma.PathFindManyArgs, Prisma.PathCreateInput, Prisma.PathUpdateInput>('path');

  pathInstance = new RestApiService<
    PathInstance,
    Prisma.PathInstanceFindManyArgs,
    Prisma.PathInstanceCreateInput,
    Prisma.PathInstanceUpdateInput
  >('path-instance');

  course = new RestApiService<Course, Prisma.CourseFindManyArgs, Prisma.CourseCreateInput, Prisma.CourseUpdateInput>(
    'course',
  );

  courseInstance = new RestApiService<
    CourseInstance,
    Prisma.CourseInstanceFindManyArgs,
    Prisma.CourseInstanceCreateInput,
    Prisma.CourseInstanceUpdateInput
  >('course-instance');

  studentPathInstance = new RestApiService<
    StudentPathInstance,
    Prisma.StudentPathInstanceFindManyArgs,
    Prisma.StudentPathInstanceCreateInput,
    Prisma.StudentPathInstanceUpdateInput
  >('student-path-instance');

  student = new RestApiService<
    Student,
    Prisma.StudentFindManyArgs,
    Prisma.StudentCreateInput,
    Prisma.StudentUpdateInput
  >('student');

  quizInstance = new RestApiService<
    QuizInstance,
    Prisma.QuizInstanceFindManyArgs,
    Prisma.QuizInstanceCreateInput,
    Prisma.QuizInstanceUpdateInput
  >('quiz-instance');

  quizInstanceStudent = new RestApiService<
    QuizInstanceStudent,
    Prisma.QuizInstanceStudentFindManyArgs,
    Prisma.QuizInstanceStudentCreateInput,
    Prisma.QuizInstanceStudentUpdateInput
  >('quiz-instance-student');

  teacher = new RestApiService<
    Teacher,
    Prisma.TeacherFindManyArgs,
    Prisma.TeacherCreateInput,
    Prisma.TeacherUpdateInput
  >('teacher');
}
