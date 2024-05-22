import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../app/shared/model/json-schema';
import { WithPropType } from '../../models/utils/type-utils';
import { StudentLesson } from '../lessons';
import { jsonPropInfos } from '../prop-info';

export const studentLessonGuiInfo: WithPropType<StudentLesson, GuiPropInformation> = {
  studentId: {
    propInformation: jsonPropInfos.StudentLessonPropInfo.studentId,
    guiInfo: {
      label: $localize`student`,
      inputType: InputType.relation,
    },
  },
  studentName: {
    propInformation: jsonPropInfos.StudentLessonPropInfo.studentName,
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
    propInformation: jsonPropInfos.StudentLessonPropInfo.done,
    guiInfo: {
      label: $localize`done`,
      inputType: InputType.boolean,
    },
  },
  mark: {
    propInformation: jsonPropInfos.StudentLessonPropInfo.mark,
    guiInfo: {
      label: $localize`mark`,
      inputType: InputType.input,
    },
  },
  answeredOptions: {
    propInformation: jsonPropInfos.StudentLessonPropInfo.answeredOptions,
    guiInfo: {
      label: '',
      inputType: InputType.input,
      hide: {
        form: true,
        list: true,
      },
    },
  },
};

export const studentLessonSchema: JSONSchemaInfo<StudentLesson> = {
  schema: studentLessonGuiInfo,
  label: $localize`student`,
  labelPlural: $localize`students`,
};
