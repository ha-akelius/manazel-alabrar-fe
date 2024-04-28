/* eslint-disable @typescript-eslint/no-explicit-any */
import { PathInstance } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { PathInstanceGenInfo } from './path-instance.gen-info';
const name: PropInformation<string, 'string'> = {
  basic: PathInstanceGenInfo.name,
};
const description: PropInformation<string, 'string'> = {
  basic: PathInstanceGenInfo.description,
};
const dateFrom: PropInformation<Date, 'Date'> = {
  basic: PathInstanceGenInfo.dateFrom,
};
const dateTo: PropInformation<Date, 'Date'> = {
  basic: PathInstanceGenInfo.dateTo,
};
const numberOfStudents: PropInformation<number, 'number'> = {
  basic: PathInstanceGenInfo.numberOfStudents,
};
const numberOfRegisteredStudents: PropInformation<number, 'number'> = {
  basic: PathInstanceGenInfo.numberOfRegisteredStudents,
};
const stilOpen: PropInformation<boolean, 'boolean'> = {
  basic: PathInstanceGenInfo.stilOpen,
};
const pathId: PropInformation<number, 'number'> = {
  basic: PathInstanceGenInfo.pathId,
};
const pathName: PropInformation<string, 'string'> = {
  basic: PathInstanceGenInfo.pathName,
};
export const PathInstancePropInfo: WithPropType<
  PathInstance,
  PropInformation<any, any>
> = {
  name: name,
  description: description,
  dateFrom: dateFrom,
  dateTo: dateTo,
  numberOfStudents: numberOfStudents,
  numberOfRegisteredStudents: numberOfRegisteredStudents,
  stilOpen: stilOpen,
  pathId: pathId,
  pathName: pathName,
};
