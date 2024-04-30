import { QuizInstanceStudent } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const quizInstanceStudent: Record<keyof PropType<QuizInstanceStudent>, string> = {
  id: '',
  pathInstanceId: '',
  mark: $localize`mark`,
  fullMark: $localize`full mark`,
  studentId: '',
  studentName: $localize`studnet`,
  date: $localize`date`,
  quizId: '',
  quizName: $localize`quiz`,
  pathInstanceString: $localize`Path`,
  answerOptions: $localize`answers`,
};
