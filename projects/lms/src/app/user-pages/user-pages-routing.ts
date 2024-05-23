import { inject } from '@angular/core';
import { RouteInfo } from '../../../../../src/app/core/models/route-info';
import { getRouteNumberParam } from '../../../../../src/app/core/utils/params';
import { BFF } from './models/schema-bff';
import { UserStore } from './user-state';

export interface CourseDetailParams {
  [UserParameters.courseId]: number;
}

export interface LessonParams {
  [UserParameters.pathId]: number;
  [UserParameters.courseId]: number;
  [UserParameters.lessonId]: number;
}

export interface QuizParams {
  [UserParameters.pathId]: number;
  [UserParameters.courseId]: number;
  [UserParameters.quizId]: number;
}

export interface MenuInfo {
  path: string;
  title: string;
}

export enum UserParameters {
  courseId = 'courseId',
  lessonId = 'lessonId',
  pathId = 'pathId',
  quizId = 'quizId',
}

const home: RouteInfo = { path: 'dashboard' };
const course: RouteInfo = { path: 'course' };
const profile: RouteInfo = { path: 'profile' };
const path: RouteInfo = { path: 'path' };
const courseDetail: RouteInfo = {
  path: 'course',
  parameters: [UserParameters.pathId, UserParameters.courseId],
};
const lesson: RouteInfo = {
  path: 'lesson',
  parameters: [UserParameters.pathId, UserParameters.courseId, UserParameters.lessonId],
};
const quiz: RouteInfo = {
  path: 'quiz',
  parameters: [UserParameters.pathId, UserParameters.courseId, UserParameters.quizId],
};

const quizzes: RouteInfo = {
  path: 'quiz',
};

export const userPageRouting = {
  home,
  course,
  courseDetail,
  path,
  profile,
  lesson,
  quizzes,
  quiz,
};

export const menus: MenuInfo[] = [
  {
    path: home.path,
    title: 'الصفحة الرئيسية',
  },
  {
    path: path.path,
    title: 'مسارات مفتوحة',
  },
  {
    path: course.path,
    title: 'المقرارات',
  },
  {
    path: quizzes.path,
    title: 'الاختبارات',
  },
];

export interface UserRouteInfo {
  [UserParameters.pathId]: number;
  [UserParameters.courseId]: number;
  [UserParameters.lessonId]: number;
  [UserParameters.quizId]: number;

  path: BFF.myPaths.Path;
  course: BFF.myPaths.Course;
  lesson?: BFF.Lesson;
  quiz?: BFF.Quiz;
}

export function getUserRouteInfo(): UserRouteInfo {
  const userStore = inject(UserStore);

  const pathId = getRouteNumberParam(UserParameters.pathId);
  const courseId = getRouteNumberParam(UserParameters.courseId);
  const lessonId = getRouteNumberParam(UserParameters.lessonId);
  const quizId = getRouteNumberParam(UserParameters.quizId);

  const path = userStore.studentResponse().data?.paths.find((f) => f.id === pathId)!;
  const course = path?.courses.find((c) => c.id === courseId)!;
  const lesson = course?.lessons.find((l) => l.lessonId === lessonId);
  const quiz = course?.quizzes[quizId];

  return { pathId, courseId, lessonId, quizId, path, course, lesson, quiz };
}
