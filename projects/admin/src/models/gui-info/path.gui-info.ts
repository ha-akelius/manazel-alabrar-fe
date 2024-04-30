import { Path } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { PathPropInfo } from '../prop-info/path.prop-info';
import { WithPropType } from '../utils/type-utils';

export const pathGuiInfo: WithPropType<Path, GuiPropInformation> = {
  name: {
    propInformation: PathPropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  description: {
    propInformation: PathPropInfo.description,
    guiInfo: {
      label: $localize`path instance`,
      inputType: InputType.input,
    },
  },
};

export const pathSchema: SchemaInfo<Path> = {
  schema: pathGuiInfo,
  label: '',
  labelPlural: '',
  api: 'path',
};
