import { Teacher } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const TeacherValidation = z.object({
  name: z.string(),
}) satisfies ZodOutputFor<Teacher>;
