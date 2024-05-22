import { PropPrismaInformation } from '../../models/utils/type-utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
const studentId: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'studentId',
  ref: 'Student',
};

const mark: PropPrismaInformation<number, 'number'> = {
  type: 'number',
  name: 'mark',
  optional: true,
};
const studentName: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'studentName',
};

const answeredOptions: PropPrismaInformation<string, 'string'> = {
  type: 'string',
  name: 'answeredOptions',
  optional: true,
};

const done: PropPrismaInformation<boolean, 'boolean'> = {
  type: 'boolean',
  name: 'done',
};
export const StudentLessonGenInfo = { studentId, studentName, done, mark, answeredOptions };
