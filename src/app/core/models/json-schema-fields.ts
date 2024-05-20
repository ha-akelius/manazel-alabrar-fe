import { Student } from '@prisma/client';

export interface media {
  url: string;
}
export interface Lesson {
  name: string;
  description: string;
  pageNumber: number;
  toPageNumber: number;
  audio: media;
  date: Date;
  questins: Question[];
  students: StudentLesson[];
}

export enum QuestionType {
  SingleChoice = 'SingleChoice',
  MultiChoice = 'MultiChoice',
}
export interface Question {
  questionType: QuestionType;
  name: string;
  answers: Answer[];
  mark: number;
}

export interface Answer {
  name: string;
  correct: boolean;
}

export interface StudentLesson {
  student: Student;
  studentName: string;
  done: boolean;
  mark?: number;
  answeredOptions: string;
}
