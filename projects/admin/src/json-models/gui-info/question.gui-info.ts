import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../app/shared/model/json-schema';
import { translations } from '../../app/translations';
import { WithPropType } from '../../models/utils/type-utils';
import { Question } from '../lessons';
import { jsonPropInfos } from '../prop-info';

export const questionGuiInfo: WithPropType<Question, GuiPropInformation> = {
  name: {
    propInformation: jsonPropInfos.QuestionPropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  mark: {
    propInformation: jsonPropInfos.QuestionPropInfo.mark,
    guiInfo: {
      label: $localize`mark`,
      inputType: InputType.input,
    },
  },
  questionType: {
    propInformation: jsonPropInfos.QuestionPropInfo.questionType,
    guiInfo: {
      label: $localize`type`,
      inputType: InputType.enum,
      options: translations.questionType,
    },
  },
  answers: {
    propInformation: jsonPropInfos.QuestionPropInfo.answers,
    guiInfo: {
      label: $localize`answers`,
      inputType: InputType.json,
    },
  },
};

export const questionSchema: JSONSchemaInfo<Question> = {
  schema: questionGuiInfo,
  label: $localize`question`,
  labelPlural: $localize`questions`,
};
