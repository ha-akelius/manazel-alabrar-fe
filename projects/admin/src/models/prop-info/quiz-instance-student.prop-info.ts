/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuizInstanceStudent } from '@prisma/client';
import { PropInformation, WithPropType } from '../utils/type-utils';
import { QuizInstanceStudentGenInfo } from './quiz-instance-student.gen-info';
const fullMark: PropInformation<number, 'number'> = {
  basic: QuizInstanceStudentGenInfo.fullMark,
};
const mark: PropInformation<number, 'number'> = {
  basic: QuizInstanceStudentGenInfo.mark,
};
const date: PropInformation<Date, 'Date'> = {
  basic: QuizInstanceStudentGenInfo.date,
};
const quizId: PropInformation<number, 'number'> = {
  basic: QuizInstanceStudentGenInfo.quizId,
};
const quizName: PropInformation<string, 'string'> = {
  basic: QuizInstanceStudentGenInfo.quizName,
};
const studentId: PropInformation<number, 'number'> = {
  basic: QuizInstanceStudentGenInfo.studentId,
};
const studentName: PropInformation<string, 'string'> = {
  basic: QuizInstanceStudentGenInfo.studentName,
};
const pathInstanceId: PropInformation<number, 'number'> = {
  basic: QuizInstanceStudentGenInfo.pathInstanceId,
};
const pathInstanceString: PropInformation<string, 'string'> = {
  basic: QuizInstanceStudentGenInfo.pathInstanceString,
};
export const QuizInstanceStudentPropInfo: WithPropType<
  QuizInstanceStudent,
  PropInformation<any, any>
> = {
  fullMark: fullMark,
  mark: mark,
  date: date,
  quizId: quizId,
  quizName: quizName,
  studentId: studentId,
  studentName: studentName,
  pathInstanceId: pathInstanceId,
  pathInstanceString: pathInstanceString,
};
