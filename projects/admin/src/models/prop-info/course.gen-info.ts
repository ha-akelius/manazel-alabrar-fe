/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const pathId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  ref: 'Path',
};
const pathName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
export const CourseGenInfo = { name, pathId, pathName };
