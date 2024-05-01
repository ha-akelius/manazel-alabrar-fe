import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../app/shared/model/json-schema';
import { WithPropType } from '../../models/utils/type-utils';
import { Answer } from '../lessons';
import { propInfos } from '../prop-info';

export const answerGuiInfo: WithPropType<Answer, GuiPropInformation> = {
  name: {
    propInformation: propInfos.AnswerPropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  correct: {
    propInformation: propInfos.AnswerPropInfo.correct,
    guiInfo: {
      label: $localize`correct`,
      inputType: InputType.boolean,
    },
  },
};

export const answerSchema: JSONSchemaInfo<Answer> = {
  schema: answerGuiInfo,
  label: $localize`answer`,
  labelPlural: $localize`answers`,
};
