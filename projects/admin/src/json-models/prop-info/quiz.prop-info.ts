/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropInformation, WithPropType } from '../../models/utils/type-utils';
import { Quiz } from '../quizzes';
import { LessonGenInfo } from './lesson.gen-info';

const name: PropInformation<string, 'string'> = {
  basic: LessonGenInfo.name,
};

export const QuizPropInfo: WithPropType<Quiz, PropInformation<any, any>> = {
  name: name,
};
