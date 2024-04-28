/* eslint-disable @typescript-eslint/no-explicit-any */
import { Teacher } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { TeacherGenInfo } from './teacher.gen-info';
const name: PropInformation<string, 'string'> = {
  basic: TeacherGenInfo.name,
};
export const TeacherPropInfo: WithPropType<
  Teacher,
  PropInformation<any, any>
> = { name: name };
