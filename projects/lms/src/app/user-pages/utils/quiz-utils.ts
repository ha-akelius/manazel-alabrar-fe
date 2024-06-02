import { QuizInstance } from '@prisma/client';

export function canTakeQuiz(quiz: Omit<QuizInstance, 'questions'>): boolean {
  const date = new Date();
  return quiz.dateFrom < date && quiz.dateTo > date;
}
