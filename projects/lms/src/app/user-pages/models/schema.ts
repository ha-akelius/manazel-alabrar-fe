export interface Response<T> {
  data?: T;
  error?: {
    message: string;
  };
}
export type Lessons = Lesson[];

export class Lesson {
  name: string;
  description: string;
  pageNumber: number;
  toPageNumber: number;
  audioId: number;
  audioName: string;
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
  fullMark?: number;
  answeredOptions: number[][];
}

export class FinishStudentLesson {
  studentLesson: StudentLesson;
  courseId: number;
  lessonId: number;
}
