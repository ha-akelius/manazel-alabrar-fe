import { CourseInstance } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { CourseInstancePropInfo } from '../prop-info/course-instance.prop-info';
import { WithPropType } from '../utils/type-utils';

export const courseInstanceGuiInfo: WithPropType<CourseInstance, GuiPropInformation> = {
  name: {
    propInformation: CourseInstancePropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  courseId: {
    propInformation: CourseInstancePropInfo.courseId,
    guiInfo: {
      label: $localize`course`,
      inputType: InputType.relation,
    },
  },
  courseName: {
    propInformation: CourseInstancePropInfo.courseName,
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
    propInformation: CourseInstancePropInfo.pathInstanceId,
    guiInfo: {
      label: $localize`path`,
      inputType: InputType.relation,
    },
  },
  pathInstanceName: {
    propInformation: CourseInstancePropInfo.pathInstanceName,
    guiInfo: {
      label: '',
      inputType: InputType.unknown,
      hide: {
        form: true,
        list: true,
      },
    },
  },
  description: {
    propInformation: CourseInstancePropInfo.description,
    guiInfo: {
      label: $localize`description`,
      inputType: InputType.input,
    },
  },
  dateFrom: {
    propInformation: CourseInstancePropInfo.dateFrom,
    guiInfo: {
      label: $localize`date from`,
      inputType: InputType.dateTime,
    },
  },
  dateTo: {
    propInformation: CourseInstancePropInfo.dateTo,
    guiInfo: {
      label: $localize`date to`,
      inputType: InputType.dateTime,
    },
  },
  book: {
    propInformation: CourseInstancePropInfo.book,
    guiInfo: {
      label: $localize`book`,
      inputType: InputType.input,
    },
  },
  pageFrom: {
    propInformation: CourseInstancePropInfo.pageFrom,
    guiInfo: {
      label: $localize`page from`,
      inputType: InputType.input,
    },
  },
  pageTo: {
    propInformation: CourseInstancePropInfo.pageTo,
    guiInfo: {
      label: $localize`page to`,
      inputType: InputType.input,
    },
  },
  teacherId: {
    propInformation: CourseInstancePropInfo.teacherId,
    guiInfo: {
      label: $localize`teacher`,
      inputType: InputType.relation,
    },
  },
  teacherName: {
    propInformation: CourseInstancePropInfo.teacherName,
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

export const courseInstanceSchema: SchemaInfo<CourseInstance> = {
  schema: courseInstanceGuiInfo,
  label: $localize`course instance`,
  labelPlural: $localize`course instances`,
  api: 'courseInstance',
};
