import { PathInstance } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const PathInstanceValidation = z.object({
  name: z.string(),
  description: z.string(),
  dateFrom: z.coerce.date(),
  dateTo: z.coerce.date(),
  numberOfStudents: z.number(),
  numberOfRegisteredStudents: z.number(),
  stilOpen: z.boolean().optional(),
  pathId: z.number(),
  pathName: z.string(),
}) satisfies ZodOutputFor<PathInstance>;
