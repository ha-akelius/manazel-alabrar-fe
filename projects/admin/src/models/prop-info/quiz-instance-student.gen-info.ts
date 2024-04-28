/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const fullMark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
};
const mark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
};
const date: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
};
const quizId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'QuizInstance',
};
const quizName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
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
const pathInstanceString: PropPrismaInformation<string, 'string'> = {
  type: 'string',
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
