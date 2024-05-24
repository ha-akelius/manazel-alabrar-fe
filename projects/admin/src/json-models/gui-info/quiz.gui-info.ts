import { GuiPropInformation, InputType, JSONSchemaInfo } from '../../app/shared/model/json-schema';
import { WithPropType } from '../../models/utils/type-utils';
import { jsonPropInfos } from '../prop-info';
import { Quiz } from '../quizzes';

export const quizGuiInfo: WithPropType<Quiz, GuiPropInformation> = {
  name: {
    propInformation: jsonPropInfos.QuizPropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
};

export const quizSchema: JSONSchemaInfo<Quiz> = {
  schema: quizGuiInfo,
  label: $localize`quiz`,
  labelPlural: $localize`quizzes`,
};
