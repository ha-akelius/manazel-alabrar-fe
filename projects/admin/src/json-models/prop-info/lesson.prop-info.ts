/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropInformation, WithPropType } from '../../models/utils/type-utils';
import { Lesson, Question, StudentLesson } from '../lessons';
import { LessonGenInfo } from './lesson.gen-info';

const name: PropInformation<string, 'string'> = {
  basic: LessonGenInfo.name,
};

const description: PropInformation<string, 'string'> = {
  basic: LessonGenInfo.description,
};

const pageNumber: PropInformation<number, 'number'> = {
  basic: LessonGenInfo.pageNumber,
};

const toPageNumber: PropInformation<number, 'number'> = {
  basic: LessonGenInfo.toPageNumber,
};

const audioId: PropInformation<number, 'number'> = {
  basic: LessonGenInfo.audioId,
};

const audioName: PropInformation<string, 'string'> = {
  basic: LessonGenInfo.audioName,
};

const date: PropInformation<Date, 'Date'> = {
  basic: LessonGenInfo.date,
};

const questins: PropInformation<Question, 'Question'> = {
  basic: LessonGenInfo.questins,
};

const students: PropInformation<StudentLesson, 'StudentLesson'> = {
  basic: LessonGenInfo.students,
};

export const LessonPropInfo: WithPropType<Lesson, PropInformation<any, any>> = {
  name: name,
  description: description,
  pageNumber: pageNumber,
  toPageNumber: toPageNumber,
  audioId: audioId,
  audioName: audioName,
  date: date,
  questins: questins,
  students: students,
};
