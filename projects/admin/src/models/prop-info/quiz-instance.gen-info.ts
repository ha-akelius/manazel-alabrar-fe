/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
import { Questions } from '../../json-models';
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
const questions: PropPrismaInformation<Questions, 'Questions'> = {
  type: 'Questions',
  name: 'questions',
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
export const QuizInstanceGenInfo = { name, dateFrom, dateTo, mark, questions, courseInstanceId, courseInstanceName };
