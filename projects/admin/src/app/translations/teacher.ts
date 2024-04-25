import { Teacher } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const teacher: Record<keyof PropType<Teacher>, string> = {
  id: $localize`number`,
  name: $localize`name`,
};
