/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const fullMark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'fullMark',
};
const mark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'mark',
};
const date: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
  name: 'date',
};
const quizId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'quizId',
  ref: 'QuizInstance',
};
const quizName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'quizName',
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
const pathInstanceString: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'pathInstanceString',
};
export const QuizInstanceStudentGenInfo = {
  fullMark,
  mark,
  date,
  quizId,
  quizName,
  studentId,
  studentName,
  pathInstanceId,
  pathInstanceString,
};
