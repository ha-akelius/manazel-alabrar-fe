/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const description: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'description',
};
export const PathGenInfo = { name, description };
