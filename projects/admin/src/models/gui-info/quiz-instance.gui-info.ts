import { QuizInstance } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { jsonPropInfos } from '../../json-models/prop-info';
import { QuizInstancePropInfo } from '../prop-info/quiz-instance.prop-info';
import { WithPropType } from '../utils/type-utils';

export const quizInstanceGuiInfo: WithPropType<QuizInstance, GuiPropInformation> = {
  name: {
    propInformation: QuizInstancePropInfo.name,
    guiInfo: {
      label: $localize`name`,
      inputType: InputType.input,
    },
  },
  dateFrom: {
    propInformation: QuizInstancePropInfo.dateFrom,
    guiInfo: {
      label: $localize`date from`,
      inputType: InputType.dateTime,
    },
  },
  dateTo: {
    propInformation: QuizInstancePropInfo.dateTo,
    guiInfo: {
      label: $localize`date to`,
      inputType: InputType.dateTime,
    },
  },
  mark: {
    propInformation: QuizInstancePropInfo.mark,
    guiInfo: {
      label: $localize`mark`,
      inputType: InputType.input,
    },
  },
  courseInstanceId: {
    propInformation: QuizInstancePropInfo.courseInstanceId,
    guiInfo: {
      label: $localize`course`,
      inputType: InputType.relation,
    },
  },
  courseInstanceName: {
    propInformation: QuizInstancePropInfo.courseInstanceName,
    guiInfo: {
      label: '',
      inputType: InputType.unknown,
      hide: {
        form: true,
        list: true,
      },
    },
  },
  questions: {
    propInformation: jsonPropInfos.LessonPropInfo.questions,
    guiInfo: {
      label: $localize`questions`,
      inputType: InputType.json,
    },
  },
};

export const quizInstanceSchema: SchemaInfo<QuizInstance> = {
  schema: quizInstanceGuiInfo,
  label: 'quiz instance',
  labelPlural: 'quiz instances',
  api: 'quizInstance',
};
