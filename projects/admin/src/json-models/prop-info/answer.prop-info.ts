/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropInformation, WithPropType } from '../../models/utils/type-utils';
import { Answer } from '../lessons';
import { AnswerGenInfo } from './answer.gen-info';

const name: PropInformation<string, 'string'> = {
  basic: AnswerGenInfo.name,
};
const correct: PropInformation<boolean, 'boolean'> = {
  basic: AnswerGenInfo.correct,
};
export const AnswerPropInfo: WithPropType<Answer, PropInformation<any, any>> = {
  name: name,
  correct: correct,
};
