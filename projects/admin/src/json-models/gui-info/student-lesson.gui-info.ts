import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../app/shared/model/json-schema';
import { WithPropType } from '../../models/utils/type-utils';
import { StudentLesson } from '../lessons';
import { propInfos } from '../prop-info';

export const studentLessonGuiInfo: WithPropType<StudentLesson, GuiPropInformation> = {
  studentId: {
    propInformation: propInfos.StudentLessonPropInfo.studentId,
    guiInfo: {
      label: $localize`student`,
      inputType: InputType.relation,
    },
  },
  studentName: {
    propInformation: propInfos.StudentLessonPropInfo.studentName,
    guiInfo: {
      label: '',
      inputType: InputType.boolean,
      hide: {
        list: true,
        form: true,
      },
    },
  },
  done: {
    propInformation: propInfos.StudentLessonPropInfo.done,
    guiInfo: {
      label: $localize`done`,
      inputType: InputType.boolean,
    },
  },
  mark: {
    propInformation: propInfos.StudentLessonPropInfo.mark,
    guiInfo: {
      label: $localize`mark`,
      inputType: InputType.input,
    },
  },
};

export const studentSchema: JSONSchemaInfo<StudentLesson> = {
  schema: studentLessonGuiInfo,
  label: $localize`student`,
  labelPlural: $localize`students`,
};
