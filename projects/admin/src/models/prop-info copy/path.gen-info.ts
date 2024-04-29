import { PropPrismaInformation } from '../utils/type-utils';

const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
// const description: PropPrismaInformation<number> = {
//   type: 'number',
// };

export const PathGenInfo = {
  name: name,
};
