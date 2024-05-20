/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const parentId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'parentId',
  optional: true,
  ref: 'MediaFolder',
};
const parentName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'parentName',
  optional: true,
};
export const MediaFolderGenInfo = { name, parentId, parentName };
