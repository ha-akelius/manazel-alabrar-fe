import { BFF } from '../models/schema-bff';

export function canTakeQuiz(quiz: BFF.Quiz): boolean {
  const date = new Date();
  return quiz.dateFrom < date && quiz.dateTo > date;
}
