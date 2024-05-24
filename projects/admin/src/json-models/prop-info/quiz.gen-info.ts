import { PropPrismaInformation } from '../../models/utils/type-utils';

const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};

export const QuizGenInfo = {
  name,
};
