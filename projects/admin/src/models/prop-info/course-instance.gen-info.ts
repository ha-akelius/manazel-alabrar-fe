/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const courseId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'Course',
};
const courseName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const pathInstanceId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'PathInstance',
};
const pathInstanceName: PropPrismaInformation<string, 'string'> = {
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
const book: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const pageFrom: PropPrismaInformation<number, 'number'> = {
  type: 'number',
};
const pageTo: PropPrismaInformation<number, 'number'> = {
  type: 'number',
};
const teacherId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'Teacher',
};
const teacherName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
export const CourseInstanceGenInfo = {
  name,
  courseId,
  courseName,
  pathInstanceId,
  pathInstanceName,
  description,
  dateFrom,
  dateTo,
  book,
  pageFrom,
  pageTo,
  teacherId,
  teacherName,
};
