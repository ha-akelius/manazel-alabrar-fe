import { Role } from '@prisma/client';

export const role: Record<Role, string> = {
  ADMIN: $localize`admin`,
  TEACHER: $localize`teacher`,
  STUDENT: $localize`student`,
};
