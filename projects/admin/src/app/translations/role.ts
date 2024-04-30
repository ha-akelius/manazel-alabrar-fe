import { Role } from '@prisma/client';

export const role: Record<Role, string> = {
  TEACHER: $localize`teacher`,
  STUDENT: $localize`student`,
};
