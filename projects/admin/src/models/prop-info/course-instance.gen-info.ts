/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const courseId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'courseId',
  ref: 'Course',
};
const courseName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'courseName',
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
const book: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'book',
};
const pageFrom: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'pageFrom',
};
const pageTo: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'pageTo',
};
const teacherId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'teacherId',
  ref: 'Teacher',
};
const teacherName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'teacherName',
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
