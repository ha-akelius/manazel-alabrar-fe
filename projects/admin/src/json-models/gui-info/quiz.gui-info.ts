import { GuiPropInformation, JSONSchemaInfo } from '../../app/shared/model/json-schema';
import { quizInstanceGuiInfo } from '../../models/gui-info/quiz-instance.gui-info';
import { WithPropType } from '../../models/utils/type-utils';
import { Quiz } from '../quizzes';

const quizInstanceGuiTemp = structuredClone(quizInstanceGuiInfo);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { courseInstanceName, courseInstanceId, ...otherProps } = quizInstanceGuiTemp;

export const quizGuiInfo: WithPropType<Quiz, GuiPropInformation> = otherProps;

export const quizSchema: JSONSchemaInfo<Quiz> = {
  schema: quizGuiInfo,
  label: $localize`quiz`,
  labelPlural: $localize`quizzes`,
};
