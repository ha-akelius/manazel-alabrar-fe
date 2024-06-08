import { PropPrismaInformation } from '../../models/utils/type-utils';
import { Question, StudentLesson } from '../lessons';

/* eslint-disable @typescript-eslint/no-explicit-any */
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};

const description: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'description',
};

const pageNumber: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'pageNumber',
};

const toPageNumber: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'toPageNumber',
};

const audioId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'Media',
  name: 'audioId',
};

const audioUrl: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'audioUrl',
};

const date: PropPrismaInformation<Date, 'Date'> = {
  type: 'Date',
  name: 'date',
};

const questions: PropPrismaInformation<Question, 'Question'> = {
  type: 'Question',
  name: 'questions',
  array: true,
};

const students: PropPrismaInformation<StudentLesson, 'StudentLesson'> = {
  type: 'StudentLesson',
  name: 'students',
  array: true,
};

export const LessonGenInfo = {
  name,
  description,
  pageNumber,
  toPageNumber,
  audioId,
  audioUrl,
  date,
  questions,
  students,
};
