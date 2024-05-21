import { PropPrismaInformation } from '../../models/utils/type-utils';
import { Answer, QuestionType } from '../lessons';

/* eslint-disable @typescript-eslint/no-explicit-any */
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const questionType: PropPrismaInformation<QuestionType, 'QuestionType'> = {
  type: 'QuestionType',
  name: 'questionType',
  enum: true,
};
const mark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'mark',
};

const answers: PropPrismaInformation<Answer, 'Answer'> = {
  type: 'Answer',
  name: 'answers',
  array: true,
};
export const QuestionGenInfo = { name, questionType, mark, answers };
