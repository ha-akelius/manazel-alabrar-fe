/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const description: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const dateFrom: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
};
const dateTo: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
};
const numberOfStudents: PropPrismaInformation<number, 'number'> = {
  type: 'number',
};
const numberOfRegisteredStudents: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  defaultValue: 0,
};
const stilOpen: PropPrismaInformation<boolean, 'boolean'> = {
  type: 'boolean',
  defaultValue: false,
  optional: true,
};
const pathId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'Path',
};
const pathName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
export const PathInstanceGenInfo = {
  name,
  description,
  dateFrom,
  dateTo,
  numberOfStudents,
  numberOfRegisteredStudents,
  stilOpen,
  pathId,
  pathName,
};
