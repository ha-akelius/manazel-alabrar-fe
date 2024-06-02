/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lesson } from '../../json-models/lessons';
import { Quiz } from '../../json-models/quizzes';
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

const quiz: PropPrismaInformation<Quiz, 'Quiz'> = {
  type: 'Quiz',
  name: 'quiz',
  array: false,
};
export const CourseGenInfo = { name, pathId, pathName, lessons, quiz };
