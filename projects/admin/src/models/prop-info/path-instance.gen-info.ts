/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const description: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'description',
};
const dateFrom: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
  name: 'dateFrom',
};
const dateTo: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
  name: 'dateTo',
};
const numberOfStudents: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'numberOfStudents',
};
const numberOfRegisteredStudents: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'numberOfRegisteredStudents',
  defaultValue: 0,
};
const stilOpen: PropPrismaInformation<boolean, 'boolean'> = {
  type: 'boolean',
  name: 'stilOpen',
  defaultValue: false,
  optional: true,
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
