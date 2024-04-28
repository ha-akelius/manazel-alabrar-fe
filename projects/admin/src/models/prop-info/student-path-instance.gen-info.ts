/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const mark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
};
const fullMark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
};
const studentId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'Student',
};
const studentName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const pathInstanceId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'PathInstance',
};
const pathInstanceName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const pathId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'Path',
};
const pathName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
export const StudentPathInstanceGenInfo = {
  mark,
  fullMark,
  studentId,
  studentName,
  pathInstanceId,
  pathInstanceName,
  pathId,
  pathName,
};
