import { MediaFolder } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { MediaFolderPropInfo } from '../prop-info/media-folder.prop-info';
import { WithPropType } from '../utils/type-utils';

export const mediaFolderGuiInfo: WithPropType<MediaFolder, GuiPropInformation> = {
  name: {
    propInformation: MediaFolderPropInfo.name,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  parentId: {
    propInformation: MediaFolderPropInfo.parentId,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  parentName: {
    propInformation: MediaFolderPropInfo.parentName,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
};

export const mediaFolderSchema: SchemaInfo<MediaFolder> = {
  schema: mediaFolderGuiInfo,
  label: '',
  labelPlural: '',
  api: 'mediaFolder',
};
