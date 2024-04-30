import { Student } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { StudentPropInfo } from '../prop-info/student.prop-info';
import { WithPropType } from '../utils/type-utils';

export const studentGuiInfo: WithPropType<Student, GuiPropInformation> = {
  name: {
    propInformation: StudentPropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
};

export const studentSchema: SchemaInfo<Student> = {
  schema: studentGuiInfo,
  label: $localize`student`,
  labelPlural: $localize`students`,
  api: 'student',
};
