import { User } from '@prisma/client';
import { HookType } from '../../app/shared/model/json-schema';
import { ImportantProps } from '../utils/type-utils';
import { RolesListComponent } from './user/roles-list/roles-list.component';

export const userHooks: HookType<ImportantProps<User>> = {
  roles: {
    list: RolesListComponent,
  },
};
