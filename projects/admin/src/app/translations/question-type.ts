import { QuestionType } from '../../json-models/lessons';

export const questionType: Record<QuestionType, string> = {
  [QuestionType.SingleChoice]: $localize`single choice`,
  [QuestionType.MultiChoice]: $localize`multi choice`,
};
