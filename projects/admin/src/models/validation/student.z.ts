import { Student } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const StudentValidation = z.object({
  name: z.string(),
}) satisfies ZodOutputFor<Student>;
