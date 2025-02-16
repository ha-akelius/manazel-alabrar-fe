/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { CourseGenInfo } from './course.gen-info';
import { Lessons, Quiz } from '../../json-models';
const name: PropInformation<string, 'string'> = {
  basic: CourseGenInfo.name,
};
const pathId: PropInformation<number, 'number'> = {
  basic: CourseGenInfo.pathId,
};
const pathName: PropInformation<string, 'string'> = {
  basic: CourseGenInfo.pathName,
};
const lessons: PropInformation<Lessons, 'Lessons'> = {
  basic: CourseGenInfo.lessons,
};
const quiz: PropInformation<Quiz, 'Quiz'> = {
  basic: CourseGenInfo.quiz,
};
const bookId: PropInformation<number, 'number'> = {
  basic: CourseGenInfo.bookId,
};
const bookName: PropInformation<string, 'string'> = {
  basic: CourseGenInfo.bookName,
};
export const CoursePropInfo: WithPropType<Course, PropInformation<any, any>> = {
  name: name,
  pathId: pathId,
  pathName: pathName,
  lessons: lessons,
  quiz: quiz,
  bookId: bookId,
  bookName: bookName,
};
