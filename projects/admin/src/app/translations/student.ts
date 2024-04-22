import { Student } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const student: Record<keyof PropType<Student>, string> = {
  id: $localize`number`,
  name: $localize`name`,
  password: $localize`password`,
  student_info: '',
  pathInformation: $localize`paths`,
};
