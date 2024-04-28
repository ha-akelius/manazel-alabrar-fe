/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropPrismaInformation } from '../utils/type-utils';
import { Language, Role } from '@prisma/client';
const name: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const email: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const password: PropPrismaInformation<string, 'string'> = {
  type: 'string',
};
const language: PropPrismaInformation<Language, 'Language'> = {
  type: 'Language',
};
const roles: PropPrismaInformation<Role, 'Role'> = {
  type: 'Role',
  array: true,
};
export const UserGenInfo = { name, email, password, language, roles };
