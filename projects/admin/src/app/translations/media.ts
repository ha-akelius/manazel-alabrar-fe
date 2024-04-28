import { Media } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const media: Record<keyof PropType<Media>, string> = {
  size: '',
  id: '',
  name: '',
  url: '',
  ext: '',
  type: '',
  folderId: '',
  folderName: '',
};
