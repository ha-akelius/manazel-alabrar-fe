import { QuizInstance } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const QuizInstanceValidation = z.object({
  name: z.string(),
  dateFrom: z.coerce.date(),
  dateTo: z.coerce.date(),
  mark: z.number(),
  courseInstanceId: z.number(),
  courseInstanceName: z.string(),
}) satisfies ZodOutputFor<QuizInstance>;
