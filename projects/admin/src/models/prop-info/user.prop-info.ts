/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, Language, Role } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { UserGenInfo } from './user.gen-info';
const name: PropInformation<string, 'string'> = {
  basic: UserGenInfo.name,
};
const email: PropInformation<string, 'string'> = {
  basic: UserGenInfo.email,
};
const password: PropInformation<string, 'string'> = {
  basic: UserGenInfo.password,
};
const language: PropInformation<Language, 'Language'> = {
  basic: UserGenInfo.language,
};
const roles: PropInformation<Role, 'Role'> = {
  basic: UserGenInfo.roles,
};
export const UserPropInfo: WithPropType<User, PropInformation<any, any>> = {
  name: name,
  email: email,
  password: password,
  language: language,
  roles: roles,
};
