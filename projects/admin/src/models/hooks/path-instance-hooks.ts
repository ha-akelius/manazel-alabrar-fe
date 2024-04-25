import { PathInstance } from '@prisma/client';
import { HookType } from '../../app/shared/model/json-schema';
import { ImportantProps } from '../utils/type-utils';

export const pathInstanceHooks: HookType<ImportantProps<PathInstance>> = {};
