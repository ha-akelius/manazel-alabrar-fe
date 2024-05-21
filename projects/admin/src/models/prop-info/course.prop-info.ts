/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@prisma/client';
import { Lesson } from '../../json-models/lessons';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { CourseGenInfo } from './course.gen-info';
const name: PropInformation<string, 'string'> = {
  basic: CourseGenInfo.name,
};
const pathId: PropInformation<number, 'number'> = {
  basic: CourseGenInfo.pathId,
};
const pathName: PropInformation<string, 'string'> = {
  basic: CourseGenInfo.pathName,
};

const lessons: PropInformation<Lesson, 'Lesson'> = {
  basic: CourseGenInfo.lessons,
};

export const CoursePropInfo: WithPropType<Course, PropInformation<any, any>> = {
  name: name,
  pathId: pathId,
  pathName: pathName,
  lessons: lessons,
};
