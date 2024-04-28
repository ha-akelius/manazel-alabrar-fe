/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const dateFrom: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
};
const dateTo: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
};
const mark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
};
const courseInstanceId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'CourseInstance',
};
const courseInstanceName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
export const QuizInstanceGenInfo = {
  name,
  dateFrom,
  dateTo,
  mark,
  courseInstanceId,
  courseInstanceName,
};
