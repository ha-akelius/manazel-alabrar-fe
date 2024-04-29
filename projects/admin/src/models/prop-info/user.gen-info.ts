/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
import { Language, Role } from '@prisma/client';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'name',
};
const email: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'email',
};
const password: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'password',
};
const language: PropPrismaInformation<Language, 'Language'> = {
  type: 'Language',
  name: 'language',
};
const roles: PropPrismaInformation<Role, 'Role'> = {
  type: 'Role',
  name: 'roles',
  array: true,
};
export const UserGenInfo = { name, email, password, language, roles };
