import { User } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { RolesFormComponent } from '../hooks/user/roles-form/roles-form.component';
import { RolesListComponent } from '../hooks/user/roles-list/roles-list.component';
import { UserPropInfo } from '../prop-info/user.prop-info';
import { WithPropType } from '../utils/type-utils';

export const userGuiInfo: WithPropType<User, GuiPropInformation> = {
  name: {
    propInformation: UserPropInfo.name,
    guiInfo: {
      label: $localize`name`,

      inputType: InputType.input,
    },
  },
  email: {
    propInformation: UserPropInfo.email,
    guiInfo: {
      label: $localize`email`,
      inputType: InputType.input,
    },
  },
  password: {
    propInformation: UserPropInfo.password,
    guiInfo: {
      label: $localize`password`,
      inputType: InputType.input,
      hide: {
        list: true,
      },
    },
  },
  language: {
    propInformation: UserPropInfo.language,
    guiInfo: {
      label: $localize`language`,
      inputType: InputType.input,
    },
  },
  roles: {
    propInformation: UserPropInfo.roles,
    guiInfo: {
      label: $localize`roles`,
      inputType: InputType.input,
      hooks: {
        list: RolesListComponent,
        form: RolesFormComponent,
      },
    },
  },
};

export const userSchema: SchemaInfo<User> = {
  schema: userGuiInfo,
  label: $localize`user`,
  labelPlural: $localize`users`,
  api: 'user',
};
