/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
import { AnswerOptions } from '../../json-models';
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
const answerOptions: PropPrismaInformation<AnswerOptions, 'AnswerOptions'> = {
  type: 'AnswerOptions',
  name: 'answerOptions',
};
export const QuizInstanceStudentGenInfo = {
  fullMark,
  mark,
  date,
  quizId,
  quizName,
  studentId,
  studentName,
  answerOptions,
};
