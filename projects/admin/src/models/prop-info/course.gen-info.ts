/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const pathId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'pathId',
  ref: 'Path',
};
const pathName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'pathName',
};
export const CourseGenInfo = { name, pathId, pathName };
