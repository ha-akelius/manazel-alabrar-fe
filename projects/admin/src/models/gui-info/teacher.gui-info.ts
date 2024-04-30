import { Teacher } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { TeacherPropInfo } from '../prop-info/teacher.prop-info';
import { WithPropType } from '../utils/type-utils';

export const teacherGuiInfo: WithPropType<Teacher, GuiPropInformation> = {
  name: {
    propInformation: TeacherPropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
};

export const teacherSchema: SchemaInfo<Teacher> = {
  schema: teacherGuiInfo,
  label: $localize`teacher`,
  labelPlural: $localize`teachers`,
  api: 'teacher',
};
