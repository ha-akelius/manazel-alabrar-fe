/* eslint-disable @typescript-eslint/no-explicit-any */
import { MediaFolder } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { MediaFolderGenInfo } from './media-folder.gen-info';
const name: PropInformation<string, 'string'> = {
  basic: MediaFolderGenInfo.name,
};
const parentId: PropInformation<number, 'number'> = {
  basic: MediaFolderGenInfo.parentId,
};
const parentName: PropInformation<string, 'string'> = {
  basic: MediaFolderGenInfo.parentName,
};
export const MediaFolderPropInfo: WithPropType<MediaFolder, PropInformation<any, any>> = {
  name: name,
  parentId: parentId,
  parentName: parentName,
};
