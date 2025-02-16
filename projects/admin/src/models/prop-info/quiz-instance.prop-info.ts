/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuizInstance } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { QuizInstanceGenInfo } from './quiz-instance.gen-info';
import { Questions } from '../../json-models';
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
const questions: PropInformation<Questions, 'Questions'> = {
  basic: QuizInstanceGenInfo.questions,
};
const courseInstanceId: PropInformation<number, 'number'> = {
  basic: QuizInstanceGenInfo.courseInstanceId,
};
const courseInstanceName: PropInformation<string, 'string'> = {
  basic: QuizInstanceGenInfo.courseInstanceName,
};
export const QuizInstancePropInfo: WithPropType<QuizInstance, PropInformation<any, any>> = {
  name: name,
  dateFrom: dateFrom,
  dateTo: dateTo,
  mark: mark,
  questions: questions,
  courseInstanceId: courseInstanceId,
  courseInstanceName: courseInstanceName,
};
