/* eslint-disable @typescript-eslint/no-explicit-any */
import { Path } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { PathGenInfo } from './path.gen-info';
const name: PropInformation<string, 'string'> = {
  basic: PathGenInfo.name,
};
const description: PropInformation<string, 'string'> = {
  basic: PathGenInfo.description,
};
export const PathPropInfo: WithPropType<Path, PropInformation<any, any>> = {
  name: name,
  description: description,
};
