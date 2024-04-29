/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const mark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'mark',
};
const fullMark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'fullMark',
};
const studentId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'studentId',
  ref: 'Student',
};
const studentName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'studentName',
};
const pathInstanceId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'pathInstanceId',
  ref: 'PathInstance',
};
const pathInstanceName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'pathInstanceName',
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
