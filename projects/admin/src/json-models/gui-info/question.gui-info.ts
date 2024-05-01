import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../app/shared/model/json-schema';
import { WithPropType } from '../../models/utils/type-utils';
import { Question } from '../lessons';
import { propInfos } from '../prop-info';

export const questionGuiInfo: WithPropType<Question, GuiPropInformation> = {
  name: {
    propInformation: propInfos.QuestionPropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  questionType: {
    propInformation: propInfos.QuestionPropInfo.questionType,
    guiInfo: {
      label: $localize`type`,
      inputType: InputType.boolean,
    },
  },
  answers: {
    propInformation: propInfos.QuestionPropInfo.answers,
    guiInfo: {
      label: $localize`answers`,
      inputType: InputType.list,
    },
  },
  mark: {
    propInformation: propInfos.QuestionPropInfo.mark,
    guiInfo: {
      label: $localize`mark`,
      inputType: InputType.list,
    },
  },
};

export const questionSchema: JSONSchemaInfo<Question> = {
  schema: questionGuiInfo,
  label: $localize`question`,
  labelPlural: $localize`questions`,
};
