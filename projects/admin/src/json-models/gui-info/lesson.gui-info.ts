import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../app/shared/model/json-schema';
import { WithPropType } from '../../models/utils/type-utils';
import { Lesson } from '../lessons';
import { propInfos } from '../prop-info';

export const lessonGuiInfo: WithPropType<Lesson, GuiPropInformation> = {
  name: {
    propInformation: propInfos.LessonPropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  description: {
    propInformation: propInfos.LessonPropInfo.description,
    guiInfo: {
      label: $localize`description`,
      inputType: InputType.input,
    },
  },
  pageNumber: {
    propInformation: propInfos.LessonPropInfo.pageNumber,
    guiInfo: {
      label: $localize`pageNumber`,
      inputType: InputType.input,
    },
  },
  toPageNumber: {
    propInformation: propInfos.LessonPropInfo.toPageNumber,
    guiInfo: {
      label: $localize`toPageNumber`,
      inputType: InputType.input,
    },
  },
  audioId: {
    propInformation: propInfos.LessonPropInfo.audioId,
    guiInfo: {
      label: $localize`audio`,
      inputType: InputType.input,
    },
  },
  date: {
    propInformation: propInfos.LessonPropInfo.date,
    guiInfo: {
      label: $localize`date`,
      inputType: InputType.dateTime,
    },
  },
  questins: {
    propInformation: propInfos.LessonPropInfo.questins,
    guiInfo: {
      label: $localize`questins`,
      inputType: InputType.list,
    },
  },
  students: {
    propInformation: propInfos.LessonPropInfo.students,
    guiInfo: {
      label: $localize`students`,
      inputType: InputType.list,
    },
  },
};

export const lessonSchema: JSONSchemaInfo<Lesson> = {
  schema: lessonGuiInfo,
  label: $localize`lesson`,
  labelPlural: $localize`lessons`,
};
