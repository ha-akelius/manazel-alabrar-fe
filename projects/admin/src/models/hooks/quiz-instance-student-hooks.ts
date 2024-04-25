import { QuizInstanceStudent } from '@prisma/client';
import { HookType } from '../../app/shared/model/json-schema';
import { ImportantProps } from '../utils/type-utils';

export const quizInstanceStudentHooks: HookType<ImportantProps<QuizInstanceStudent>> = {};
