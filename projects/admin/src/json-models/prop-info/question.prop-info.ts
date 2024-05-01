/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropInformation, WithPropType } from '../../models/utils/type-utils';
import { Answer, Question, QuestionType } from '../lessons';
import { QuestionGenInfo } from './question.gen-info';

const name: PropInformation<string, 'string'> = {
  basic: QuestionGenInfo.name,
};
const questionType: PropInformation<QuestionType, 'QuestionType'> = {
  basic: QuestionGenInfo.questionType,
};
const mark: PropInformation<number, 'number'> = {
  basic: QuestionGenInfo.mark,
};
const answers: PropInformation<Answer, 'Answer'> = {
  basic: QuestionGenInfo.answers,
};

export const QuestionPropInfo: WithPropType<Question, PropInformation<any, any>> = {
  name: name,
  questionType: questionType,
  mark: mark,
  answers: answers,
};
