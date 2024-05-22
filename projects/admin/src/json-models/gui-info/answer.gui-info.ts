import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../app/shared/model/json-schema';
import { WithPropType } from '../../models/utils/type-utils';
import { Answer } from '../lessons';
import { jsonPropInfos } from '../prop-info';

export const answerGuiInfo: WithPropType<Answer, GuiPropInformation> = {
  name: {
    propInformation: jsonPropInfos.AnswerPropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  correct: {
    propInformation: jsonPropInfos.AnswerPropInfo.correct,
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
