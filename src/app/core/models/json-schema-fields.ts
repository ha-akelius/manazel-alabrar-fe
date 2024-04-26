import { IsDate, IsInt, Length } from 'class-validator';
import { Student } from './dummy-interfaces';
export class media {
  url: string;
}
export class Lesson {
  @Length(2, 50)
  name: string;
  description: string;
  @IsInt()
  pageNumber: number;
  @IsInt()
  toPageNumber: number;
  audio: media;
  @IsDate()
  date: Date;
  questins: Question[];
  students: StudentLesson[];
}

export enum QuestionType {
  SingleChoice = 'SingleChoice',
  MultiChoice = 'MultiChoice',
}
export class Question {
  questionType: QuestionType;
  @Length(2, 50)
  name: string;
  answers: Answer[];
  mark: number;
}

export class Answer {
  @Length(2, 100)
  name: string;
  correct: boolean;
}

export class StudentLesson {
  student: Student;
  studentName: string;
  done: boolean;
  mark?: number;
  answeredOptions: string;
}
