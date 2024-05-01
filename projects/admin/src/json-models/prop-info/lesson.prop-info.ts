/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropInformation, WithPropType } from '../../models/utils/type-utils';
import { Lesson, Media, Question } from '../lessons';
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

const audio: PropInformation<Media, 'Media'> = {
  basic: LessonGenInfo.audio,
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
  audio: audio,
  date: date,
  questins: questins,
  students: students,
};
