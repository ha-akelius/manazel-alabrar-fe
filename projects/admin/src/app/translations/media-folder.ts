import { MediaFolder } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const mediaFolder: Record<keyof PropType<MediaFolder>, string> = {
  id: '',
  name: '',
  parentId: '',
  parentName: '',
};
