/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
import { Student_info, PathInformation } from '../../json-models';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const student_info: PropPrismaInformation<Student_info, 'Student_info'> = {
  type: 'Student_info',
  name: 'student_info',
};
const pathInformation: PropPrismaInformation<PathInformation, 'PathInformation'> = {
  type: 'PathInformation',
  name: 'pathInformation',
};
export const StudentGenInfo = { name, student_info, pathInformation };
