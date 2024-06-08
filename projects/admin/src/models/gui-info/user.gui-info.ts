import { User } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { translations } from '../../app/translations';
import { LanguageFormComponent } from '../hooks/user/language.component';
import { PasswordFormComponent } from '../hooks/user/password.component';
import { RolesFormComponent } from '../hooks/user/roles.component';
import { UserFormComponent } from '../hooks/user/user-form/user-form.component';
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
      hooks: {
        form: PasswordFormComponent,
      },
    },
  },
  language: {
    propInformation: UserPropInfo.language,
    guiInfo: {
      label: $localize`language`,
      inputType: InputType.input,
      hooks: {
        listFn: (language: string) => translations.language[language as keyof typeof translations.language],
        form: LanguageFormComponent,
      },
    },
  },
  roles: {
    propInformation: UserPropInfo.roles,
    guiInfo: {
      label: $localize`roles`,
      inputType: InputType.input,
      hooks: {
        listFn: (roles: string[]) =>
          roles.map((role) => translations.role[role as keyof typeof translations.role]).join(', '),
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
  hooks: {
    form: UserFormComponent,
  },
};
