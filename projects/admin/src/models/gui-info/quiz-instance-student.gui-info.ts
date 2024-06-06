import { QuizInstanceStudent } from '@prisma/client';
import { GuiPropInformation, InputType, SchemaInfo } from '../../app/shared/model/json-schema';
import { QuizInstanceStudentPropInfo } from '../prop-info/quiz-instance-student.prop-info';
import { WithPropType } from '../utils/type-utils';

export const quizInstanceStudentGuiInfo: WithPropType<QuizInstanceStudent, GuiPropInformation> = {
  fullMark: {
    propInformation: QuizInstanceStudentPropInfo.fullMark,
    guiInfo: {
      label: $localize`full mark`,
      inputType: InputType.input,
    },
  },
  mark: {
    propInformation: QuizInstanceStudentPropInfo.mark,
    guiInfo: {
      label: $localize`mark`,
      inputType: InputType.input,
    },
  },
  date: {
    propInformation: QuizInstanceStudentPropInfo.date,
    guiInfo: {
      label: $localize`date`,
      inputType: InputType.dateTime,
    },
  },
  quizId: {
    propInformation: QuizInstanceStudentPropInfo.quizId,
    guiInfo: {
      label: $localize`quiz`,
      inputType: InputType.relation,
    },
  },
  quizName: {
    propInformation: QuizInstanceStudentPropInfo.quizName,
    guiInfo: {
      label: '',
      inputType: InputType.unknown,
      hide: {
        form: true,
        list: true,
      },
    },
  },
  studentId: {
    propInformation: QuizInstanceStudentPropInfo.studentId,
    guiInfo: {
      label: $localize`student`,
      inputType: InputType.relation,
    },
  },
  studentName: {
    propInformation: QuizInstanceStudentPropInfo.studentName,
    guiInfo: {
      label: '',
      inputType: InputType.unknown,
      hide: {
        form: true,
        list: true,
      },
    },
  },
  answerOptions: {
    propInformation: QuizInstanceStudentPropInfo.answerOptions,
    guiInfo: {
      label: '',
      inputType: InputType.input,
      hide: {
        form: true,
        list: true,
      },
    },
  },
};

export const quizInstanceStudentSchema: SchemaInfo<QuizInstanceStudent> = {
  schema: quizInstanceStudentGuiInfo,
  label: $localize`quiz instance`,
  labelPlural: $localize`quiz instances`,
  api: 'quizInstanceStudent',
};
