import { CourseInstance } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const courseInstance: Record<keyof PropType<CourseInstance>, string> = {
  id: $localize`number`,
  name: $localize`name`,
  courseId: '',
  courseName: $localize`course`,
  pathInstanceId: '',
  pathInstanceName: $localize`path instance`,
  description: $localize`description`,
  dateFrom: $localize`from date`,
  dateTo: $localize`to date`,
  book: $localize`book`,
  lessons: $localize`lessons`,
  pageFrom: $localize`page from`,
  pageTo: $localize`page to`,
  teacherId: $localize`teacher`,
  teacherName: $localize`teacher`,
};
