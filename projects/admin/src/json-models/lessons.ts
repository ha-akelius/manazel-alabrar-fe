import { QuizInstance } from '@prisma/client';

export type Lessons = Lesson[];
export type Questions = Question[];
export type AnswerOptions = number[][];
export type Quiz = QuizInstance;

export class Lesson {
  name: string;
  description: string;
  pageNumber: number;
  toPageNumber: number;
  audioId: number;
  audioUrl: string;
  date: Date;
  questions: Question[];
  students: StudentLesson[];
}

export enum QuestionType {
  SingleChoice = 'SingleChoice',
  MultiChoice = 'MultiChoice',
}

export class Question {
  questionType: QuestionType;
  name: string;
  answers: Answer[];
  mark: number;
}

export class Answer {
  name: string;
  correct: boolean;
}

export class StudentLesson {
  studentId: number;
  studentName: string;
  done: boolean;
  mark?: number;
  answeredOptions: string;
}
