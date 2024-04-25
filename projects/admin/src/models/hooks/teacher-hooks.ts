import { Teacher } from '@prisma/client';
import { HookType } from '../../app/shared/model/json-schema';
import { ImportantProps } from '../utils/type-utils';

export const teacherHooks: HookType<ImportantProps<Teacher>> = {};
