/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
import { Lessons, Quiz } from '../../json-models';
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
const lessons: PropPrismaInformation<Lessons, 'Lessons'> = {
  type: 'Lessons',
  name: 'lessons',
};
const quiz: PropPrismaInformation<Quiz, 'Quiz'> = {
  type: 'Quiz',
  name: 'quiz',
};
const bookId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'bookId',
  optional: true,
  ref: 'Media',
};
const bookName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'bookName',
  optional: true,
};
export const CourseGenInfo = { name, pathId, pathName, lessons, quiz, bookId, bookName };
