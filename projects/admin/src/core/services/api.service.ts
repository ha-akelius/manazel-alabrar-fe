import { Injectable } from '@angular/core';
import {
  Path,
  PathInstance,
  Course,
  CourseInstance,
  StudentPathInstance,
  QuizInstance,
  QuizInstanceStudent,
  Student,
  Teacher,
  User,
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

  student = new RestApiService<
    Student,
    Prisma.StudentFindManyArgs,
    Prisma.StudentCreateInput,
    Prisma.StudentUpdateInput
  >('student');

  teacher = new RestApiService<
    Teacher,
    Prisma.TeacherFindManyArgs,
    Prisma.TeacherCreateInput,
    Prisma.TeacherUpdateInput
  >('teacher');

  user = new RestApiService<User, Prisma.UserFindManyArgs, Prisma.UserCreateInput, Prisma.UserUpdateInput>('user');
}
