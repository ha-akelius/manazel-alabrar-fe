/* eslint-disable @typescript-eslint/no-explicit-any */
import { Student } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { StudentGenInfo } from './student.gen-info';
const name: PropInformation<string, 'string'> = {
  basic: StudentGenInfo.name,
};
export const StudentPropInfo: WithPropType<
  Student,
  PropInformation<any, any>
> = { name: name };
