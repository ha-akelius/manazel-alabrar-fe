import { StudentPathInstance } from '@prisma/client';
import { PropType } from '../shared/model/json-schema';

export const studentPathInstance: Record<keyof PropType<StudentPathInstance>, string> = {
  id: $localize`number`,
  mark: $localize`mark`,
  fullMark: $localize`full mark`,
  studentId: '',
  studentName: $localize`student`,
  pathInstanceId: '',
  pathInstanceName: $localize`path instance`,
  pathId: '',
  pathName: $localize`path`,
};
