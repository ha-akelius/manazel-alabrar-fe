/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuizInstancePropInfo } from '../../models/prop-info/quiz-instance.prop-info';
import { PropInformation, WithPropType } from '../../models/utils/type-utils';
import { Quiz } from '../quizzes';

export const QuizPropInfo: WithPropType<Quiz, PropInformation<any, any>> = QuizInstancePropInfo;
