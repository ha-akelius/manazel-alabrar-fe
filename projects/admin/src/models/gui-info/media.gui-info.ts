import { Media } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { MediaPropInfo } from '../prop-info/media.prop-info';
import { WithPropType } from '../utils/type-utils';

export const mediaGuiInfo: WithPropType<Media, GuiPropInformation> = {
  name: {
    propInformation: MediaPropInfo.name,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  url: {
    propInformation: MediaPropInfo.url,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  ext: {
    propInformation: MediaPropInfo.ext,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  mimetype: {
    propInformation: MediaPropInfo.mimetype,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  type: {
    propInformation: MediaPropInfo.type,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  size: {
    propInformation: MediaPropInfo.size,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  folderId: {
    propInformation: MediaPropInfo.folderId,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
  folderName: {
    propInformation: MediaPropInfo.folderName,
    guiInfo: {
      label: '',
      inputType: InputType.input,
    },
  },
};

export const mediaSchema: SchemaInfo<Media> = {
  schema: mediaGuiInfo,
  label: '',
  labelPlural: '',
  api: 'media',
};
