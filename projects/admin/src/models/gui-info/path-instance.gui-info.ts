import { PathInstance } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { PathInstancePropInfo } from '../prop-info/path-instance.prop-info';
import { WithPropType } from '../utils/type-utils';

export const pathInstanceGuiInfo: WithPropType<PathInstance, GuiPropInformation> = {
  name: {
    propInformation: PathInstancePropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  description: {
    propInformation: PathInstancePropInfo.description,
    guiInfo: {
      label: $localize`description`,
      inputType: InputType.input,
    },
  },
  dateFrom: {
    propInformation: PathInstancePropInfo.dateFrom,
    guiInfo: {
      label: $localize`date from`,
      inputType: InputType.dateTime,
    },
  },
  dateTo: {
    propInformation: PathInstancePropInfo.dateTo,
    guiInfo: {
      label: $localize`date to`,
      inputType: InputType.dateTime,
    },
  },
  numberOfStudents: {
    propInformation: PathInstancePropInfo.numberOfStudents,
    guiInfo: {
      label: $localize`number of students`,
      inputType: InputType.input,
    },
  },
  numberOfRegisteredStudents: {
    propInformation: PathInstancePropInfo.numberOfRegisteredStudents,
    guiInfo: {
      label: $localize`number of registered students`,
      inputType: InputType.input,
    },
  },
  stilOpen: {
    propInformation: PathInstancePropInfo.stilOpen,
    guiInfo: {
      label: $localize`still open`,
      inputType: InputType.boolean,
    },
  },
  pathId: {
    propInformation: PathInstancePropInfo.pathId,
    guiInfo: {
      label: $localize`path`,
      inputType: InputType.relation,
    },
  },
  pathName: {
    propInformation: PathInstancePropInfo.pathName,
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

export const pathInstanceSchema: SchemaInfo<PathInstance> = {
  schema: pathInstanceGuiInfo,
  label: $localize`path instance`,
  labelPlural: $localize`path instances`,
  api: 'pathInstance',
};
