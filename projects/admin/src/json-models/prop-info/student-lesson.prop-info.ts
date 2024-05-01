/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropInformation, WithPropType } from '../../models/utils/type-utils';
import { StudentLesson } from '../lessons';
import { StudentLessonGenInfo } from './student-lesson.gen-info';

const studentId: PropInformation<number, 'number'> = {
  basic: StudentLessonGenInfo.studentId,
};
const studentName: PropInformation<string, 'string'> = {
  basic: StudentLessonGenInfo.studentName,
};
const done: PropInformation<boolean, 'boolean'> = {
  basic: StudentLessonGenInfo.done,
};

const mark: PropInformation<number, 'number'> = {
  basic: StudentLessonGenInfo.mark,
};
const answeredOptions: PropInformation<string, 'string'> = {
  basic: StudentLessonGenInfo.answeredOptions,
};
export const StudentLessonPropInfo: WithPropType<StudentLesson, PropInformation<any, any>> = {
  studentId: studentId,
  studentName: studentName,
  done: done,
  mark: mark,
  answeredOptions: answeredOptions,
};
