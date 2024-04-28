/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const description: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
export const PathGenInfo = { name, description };
