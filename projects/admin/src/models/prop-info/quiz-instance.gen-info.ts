/* eslint-disable @typescript-eslint/no-explicit-any */
import { Question } from '../../json-models/lessons';
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const dateFrom: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
  name: 'dateFrom',
};
const dateTo: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
  name: 'dateTo',
};
const mark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'mark',
};
const courseInstanceId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'courseInstanceId',
  ref: 'CourseInstance',
};
const courseInstanceName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'courseInstanceName',
};

const questions: PropPrismaInformation<Question, 'Question'> = {
  type: 'Question',
  name: 'questions',
  array: true,
};

export const QuizInstanceGenInfo = {
  name,
  dateFrom,
  dateTo,
  mark,
  courseInstanceId,
  courseInstanceName,
  questions,
};
