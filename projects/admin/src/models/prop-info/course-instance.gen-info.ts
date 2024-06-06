/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
import { Lessons } from '../../json-models';
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
const bookId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'bookId',
  ref: 'Media',
};
const bookName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'bookName',
};
const lessons: PropPrismaInformation<Lessons, 'Lessons'> = {
  type: 'Lessons',
  name: 'lessons',
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
  bookId,
  bookName,
  lessons,
  pageFrom,
  pageTo,
  teacherId,
  teacherName,
};
