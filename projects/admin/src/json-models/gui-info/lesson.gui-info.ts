import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../app/shared/model/json-schema';
import { WithPropType } from '../../models/utils/type-utils';
import { Lesson } from '../lessons';
import { jsonPropInfos } from '../prop-info';

export const lessonGuiInfo: WithPropType<Lesson, GuiPropInformation> = {
  name: {
    propInformation: jsonPropInfos.LessonPropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  description: {
    propInformation: jsonPropInfos.LessonPropInfo.description,
    guiInfo: {
      label: $localize`description`,
      inputType: InputType.textarea,
    },
  },
  pageNumber: {
    propInformation: jsonPropInfos.LessonPropInfo.pageNumber,
    guiInfo: {
      label: $localize`page from`,
      inputType: InputType.input,
    },
  },
  toPageNumber: {
    propInformation: jsonPropInfos.LessonPropInfo.toPageNumber,
    guiInfo: {
      label: $localize`page to`,
      inputType: InputType.input,
    },
  },
  audioId: {
    propInformation: jsonPropInfos.LessonPropInfo.audioId,
    guiInfo: {
      label: $localize`audio`,
      inputType: InputType.input,
    },
  },
  date: {
    propInformation: jsonPropInfos.LessonPropInfo.date,
    guiInfo: {
      label: $localize`date`,
      inputType: InputType.dateTime,
    },
  },
  questins: {
    propInformation: jsonPropInfos.LessonPropInfo.questins,
    guiInfo: {
      label: $localize`questions`,
      inputType: InputType.json,
    },
  },
  students: {
    propInformation: jsonPropInfos.LessonPropInfo.students,
    guiInfo: {
      label: $localize`students`,
      inputType: InputType.json,
    },
  },
  audioName: {
    propInformation: jsonPropInfos.LessonPropInfo.audioName,
    guiInfo: {
      label: '',
      inputType: InputType.json,
      hide: {
        form: true,
        list: true,
      },
    },
  },
};

export const lessonSchema: JSONSchemaInfo<Lesson> = {
  schema: lessonGuiInfo,
  label: $localize`lesson`,
  labelPlural: $localize`lessons`,
};
