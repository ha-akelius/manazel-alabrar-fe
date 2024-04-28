import { Path } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { PathGenInfo } from './path.gen-info';

const name: PropInformation<string, 'string'> = {
  basic: PathGenInfo.name,
  extra: {
    min: 3,
  },
};
const description: PropInformation<string, 'string'> = {
  basic: PathGenInfo.name,
};

export const PathPropInfo: WithPropType<Path, PropInformation<any, any>> = {
  name: name,
  description: description,
};
