import { StudentPathInstance } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const StudentPathInstanceValidation = z.object({
  mark: z.number(),
  fullMark: z.number(),
  studentId: z.number(),
  studentName: z.string(),
  pathInstanceId: z.number(),
  pathInstanceName: z.string(),
  pathId: z.number(),
  pathName: z.string(),
}) satisfies ZodOutputFor<StudentPathInstance>;
