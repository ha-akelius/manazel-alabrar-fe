/* eslint-disable @typescript-eslint/no-explicit-any */
import { Media, MediaType } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { MediaGenInfo } from './media.gen-info';
const name: PropInformation<string, 'string'> = {
  basic: MediaGenInfo.name,
};
const url: PropInformation<string, 'string'> = {
  basic: MediaGenInfo.url,
};
const ext: PropInformation<string, 'string'> = {
  basic: MediaGenInfo.ext,
};
const mimetype: PropInformation<string, 'string'> = {
  basic: MediaGenInfo.mimetype,
};
const type: PropInformation<MediaType, 'MediaType'> = {
  basic: MediaGenInfo.type,
};
const size: PropInformation<number, 'number'> = {
  basic: MediaGenInfo.size,
};
const folderId: PropInformation<number, 'number'> = {
  basic: MediaGenInfo.folderId,
};
const folderName: PropInformation<string, 'string'> = {
  basic: MediaGenInfo.folderName,
};
export const MediaPropInfo: WithPropType<Media, PropInformation<any, any>> = {
  name: name,
  url: url,
  ext: ext,
  mimetype: mimetype,
  type: type,
  size: size,
  folderId: folderId,
  folderName: folderName,
};
