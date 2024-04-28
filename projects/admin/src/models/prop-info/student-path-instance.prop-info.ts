/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentPathInstance } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { StudentPathInstanceGenInfo } from './student-path-instance.gen-info';
const mark: PropInformation<number, 'number'> = {
  basic: StudentPathInstanceGenInfo.mark,
};
const fullMark: PropInformation<number, 'number'> = {
  basic: StudentPathInstanceGenInfo.fullMark,
};
const studentId: PropInformation<number, 'number'> = {
  basic: StudentPathInstanceGenInfo.studentId,
};
const studentName: PropInformation<string, 'string'> = {
  basic: StudentPathInstanceGenInfo.studentName,
};
const pathInstanceId: PropInformation<number, 'number'> = {
  basic: StudentPathInstanceGenInfo.pathInstanceId,
};
const pathInstanceName: PropInformation<string, 'string'> = {
  basic: StudentPathInstanceGenInfo.pathInstanceName,
};
const pathId: PropInformation<number, 'number'> = {
  basic: StudentPathInstanceGenInfo.pathId,
};
const pathName: PropInformation<string, 'string'> = {
  basic: StudentPathInstanceGenInfo.pathName,
};
export const StudentPathInstancePropInfo: WithPropType<
  StudentPathInstance,
  PropInformation<any, any>
> = {
  mark: mark,
  fullMark: fullMark,
  studentId: studentId,
  studentName: studentName,
  pathInstanceId: pathInstanceId,
  pathInstanceName: pathInstanceName,
  pathId: pathId,
  pathName: pathName,
};
