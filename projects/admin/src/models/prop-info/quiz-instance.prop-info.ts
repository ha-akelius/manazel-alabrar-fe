/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuizInstance } from '@prisma/client';
import { Question } from '../../json-models/lessons';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { QuizInstanceGenInfo } from './quiz-instance.gen-info';
const name: PropInformation<string, 'string'> = {
  basic: QuizInstanceGenInfo.name,
};
const dateFrom: PropInformation<Date, 'Date'> = {
  basic: QuizInstanceGenInfo.dateFrom,
};
const dateTo: PropInformation<Date, 'Date'> = {
  basic: QuizInstanceGenInfo.dateTo,
};
const mark: PropInformation<number, 'number'> = {
  basic: QuizInstanceGenInfo.mark,
};
const courseInstanceId: PropInformation<number, 'number'> = {
  basic: QuizInstanceGenInfo.courseInstanceId,
};
const courseInstanceName: PropInformation<string, 'string'> = {
  basic: QuizInstanceGenInfo.courseInstanceName,
};

const questions: PropInformation<Question, 'Question'> = {
  basic: QuizInstanceGenInfo.questions,
};
export const QuizInstancePropInfo: WithPropType<QuizInstance, PropInformation<any, any>> = {
  name: name,
  dateFrom: dateFrom,
  dateTo: dateTo,
  mark: mark,
  courseInstanceId: courseInstanceId,
  courseInstanceName: courseInstanceName,
  questions: questions,
};
