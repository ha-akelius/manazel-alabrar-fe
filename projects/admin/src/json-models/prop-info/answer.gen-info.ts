import { PropPrismaInformation } from '../../models/utils/type-utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const correct: PropPrismaInformation<boolean, 'boolean'> = {
  type: 'boolean',
  name: 'correct',
};
export const AnswerGenInfo = { name, correct };
