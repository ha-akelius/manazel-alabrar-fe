/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from '@prisma/client';
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
export const CoursePropInfo: WithPropType<Course, PropInformation<any, any>> = {
  name: name,
  pathId: pathId,
  pathName: pathName,
};
