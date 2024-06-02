import { Course } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { CoursePropInfo } from '../prop-info/course.prop-info';
import { WithPropType } from '../utils/type-utils';

export const courseGuiInfo: WithPropType<Course, GuiPropInformation> = {
  name: {
    propInformation: CoursePropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  pathId: {
    propInformation: CoursePropInfo.pathId,
    guiInfo: {
      label: $localize`path`,
      inputType: InputType.relation,
    },
  },
  pathName: {
    propInformation: CoursePropInfo.pathName,
    guiInfo: {
      label: '',
      inputType: InputType.unknown,
      hide: {
        form: true,
        list: true,
      },
    },
  },
  lessons: {
    propInformation: CoursePropInfo.lessons,
    guiInfo: {
      label: $localize`lessons`,
      inputType: InputType.jsonArray,
      hide: {
        form: false,
      },
    },
  },
  quiz: {
    propInformation: CoursePropInfo.quiz,
    guiInfo: {
      label: $localize`quizzes`,
      inputType: InputType.jsonArray,
      hide: {
        list: false,
      },
    },
  },
};

export const courseSchema: SchemaInfo<Course> = {
  schema: courseGuiInfo,
  label: $localize`course`,
  labelPlural: $localize`courses`,
  api: 'course',
};
