import { Path } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const PathValidation = z.object({
  name: z.string(),
  description: z.string(),
}) satisfies ZodOutputFor<Path>;
