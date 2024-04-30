import { User, Language, Role } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const UserValidation = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  language: z.nativeEnum(Language),
  roles: z.nativeEnum(Role),
}) satisfies ZodOutputFor<User>;
