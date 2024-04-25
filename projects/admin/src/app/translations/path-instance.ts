import { PathInstance } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const pathInstance: Record<keyof PropType<PathInstance>, string> = {
  id: $localize`number`,
  name: $localize`name`,
  description: $localize`description`,
  dateFrom: $localize`date from`,
  dateTo: $localize`date to`,
  numberOfStudents: $localize`number of student`,
  numberOfRegisteredStudents: $localize`number of registered student`,
  stilOpen: $localize`still open`,
  pathId: $localize`path`,
  pathName: '',
};
