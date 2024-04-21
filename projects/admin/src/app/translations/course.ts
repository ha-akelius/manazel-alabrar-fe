import { Course } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const course: Record<keyof PropType<Course>, string> = {
  id: $localize`number`,
  name: $localize`name`,
  pathId: '',
  pathName: $localize`path`,
  lessons: $localize`lessons`,
  quiz: $localize`quiz`,
};
