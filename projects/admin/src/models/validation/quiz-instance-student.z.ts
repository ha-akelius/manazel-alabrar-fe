import { QuizInstanceStudent } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const QuizInstanceStudentValidation = z.object({
  fullMark: z.number(),
  mark: z.number(),
  date: z.coerce.date(),
  quizId: z.number(),
  quizName: z.string(),
  studentId: z.number(),
  studentName: z.string(),
  pathInstanceId: z.number(),
  pathInstanceString: z.string(),
}) satisfies ZodOutputFor<QuizInstanceStudent>;
