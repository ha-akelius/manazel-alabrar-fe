import { QuizInstance } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const quizInstance: Record<keyof PropType<QuizInstance>, string> = {
  id: $localize`number`,
  name: $localize`name`,
  dateFrom: $localize`date from`,
  dateTo: $localize`date to`,
  mark: $localize`mark`,
  questions: $localize`questions`,
  courseInstanceId: '',
  courseInstanceName: $localize`course`,
};
