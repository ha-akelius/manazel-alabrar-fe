import { CourseInstance } from '@prisma/client';
import { z } from 'zod';
import { ZodOutputFor } from '../utils/type-utils';

export const CourseInstanceValidation = z.object({
  name: z.string(),
  courseId: z.number(),
  courseName: z.string(),
  pathInstanceId: z.number(),
  pathInstanceName: z.string(),
  description: z.string(),
  dateFrom: z.coerce.date(),
  dateTo: z.coerce.date(),
  book: z.string(),
  pageFrom: z.number(),
  pageTo: z.number(),
  teacherId: z.number(),
  teacherName: z.string(),
}) satisfies ZodOutputFor<CourseInstance>;
