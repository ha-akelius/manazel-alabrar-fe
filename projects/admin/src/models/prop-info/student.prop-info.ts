/* eslint-disable @typescript-eslint/no-explicit-any */
import { Student } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { StudentGenInfo } from './student.gen-info';
import { Student_info, PathInformation } from '../../json-models';
const name: PropInformation<string, 'string'> = {
  basic: StudentGenInfo.name,
};
const student_info: PropInformation<Student_info, 'Student_info'> = {
  basic: StudentGenInfo.student_info,
};
const pathInformation: PropInformation<PathInformation, 'PathInformation'> = {
  basic: StudentGenInfo.pathInformation,
};
export const StudentPropInfo: WithPropType<Student, PropInformation<any, any>> = {
  name: name,
  student_info: student_info,
  pathInformation: pathInformation,
};
