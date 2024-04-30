import { Path } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const path: Record<keyof PropType<Path>, string> = {
  id: $localize`path number`,
  name: $localize`name`,
  description: $localize`description`,
};
