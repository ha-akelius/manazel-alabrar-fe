import { StudentPathInstance } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { StudentPathInstancePropInfo } from '../prop-info/student-path-instance.prop-info';
import { WithPropType } from '../utils/type-utils';

export const studentPathInstanceGuiInfo: WithPropType<StudentPathInstance, GuiPropInformation> = {
  mark: {
    propInformation: StudentPathInstancePropInfo.mark,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  fullMark: {
    propInformation: StudentPathInstancePropInfo.fullMark,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  studentId: {
    propInformation: StudentPathInstancePropInfo.studentId,
    guiInfo: {
      label: '',
      inputType: InputType.relation,
    },
  },
  studentName: {
    propInformation: StudentPathInstancePropInfo.studentName,
    guiInfo: {
      label: '',
      inputType: InputType.unknown,
      hide: {
        form: true,
        list: true,
      },
    },
  },
  pathInstanceId: {
    propInformation: StudentPathInstancePropInfo.pathInstanceId,
    guiInfo: {
      label: '',
      inputType: InputType.relation,
    },
  },
  pathInstanceName: {
    propInformation: StudentPathInstancePropInfo.pathInstanceName,
    guiInfo: {
      label: '',
      inputType: InputType.unknown,
      hide: {
        form: true,
        list: true,
      },
    },
  },
  pathId: {
    propInformation: StudentPathInstancePropInfo.pathId,
    guiInfo: {
      label: '',
      inputType: InputType.relation,
    },
  },
  pathName: {
    propInformation: StudentPathInstancePropInfo.pathName,
    guiInfo: {
      label: '',
      inputType: InputType.unknown,
      hide: {
        form: true,
        list: true,
      },
    },
  },
};

export const studentPathInstanceSchema: SchemaInfo<StudentPathInstance> = {
  schema: studentPathInstanceGuiInfo,
  label: $localize`studnet path instance`,
  labelPlural: $localize`studnet path instances`,
  api: 'studentPathInstance',
};
