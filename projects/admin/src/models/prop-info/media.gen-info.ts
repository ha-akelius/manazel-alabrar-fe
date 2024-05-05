/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
import { MediaType } from '@prisma/client';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const url: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'url',
};
const ext: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'ext',
};
const type: PropPrismaInformation<MediaType, 'MediaType'> = {
  type: 'MediaType',
  name: 'type',
};
const size: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'size',
};
const folderId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'folderId',
  ref: 'MediaFolder',
};
const folderName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'folderName',
};
export const MediaGenInfo = { name, url, ext, type, size, folderId, folderName };
