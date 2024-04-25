import { User } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const user: Record<keyof PropType<User>, string> = {
  id: '',
  name: $localize`name`,
  email: $localize`email`,
  password: $localize`password`,
  language: $localize`language`,
  roles: $localize`roles`,
};
