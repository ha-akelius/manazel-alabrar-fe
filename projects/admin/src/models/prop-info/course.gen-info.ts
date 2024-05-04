/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lesson } from '../../json-models/lessons';
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const pathId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'pathId',
  ref: 'Path',
};
const pathName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'pathName',
};

const lessons: PropPrismaInformation<Lesson, 'Lesson'> = {
  type: 'Lesson',
  name: 'lessons',
  array: true,
};
export const CourseGenInfo = { name, pathId, pathName, lessons };
