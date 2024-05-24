import { StudentLesson, StudentQuiz } from './schema';

export namespace BFF {
  export interface Response<T> {
    data?: T;
    error?: {
      message: string;
    };
  }

  export namespace myPaths {
    export interface Course {
      id: number;
      pathId: number;
      title: string;
      description: string;
      dateFrom: Date;
      dateTo: Date;
      book?: string;
      lessons: Lesson[];
      progress: number;
      quizzes: Quiz[];
    }

    export interface PathInfo {
      id: number;
      title: string;
      description: string;
    }

    export interface Path extends PathInfo {
      courses: Course[];
      progress: number;
    }

    export interface Student {
      name: string;
      title: string;
      lastTitle: string;
      image: string;
      paths: Path[];
    }

    export type response = Response<Student>;
  }

  export namespace openPath {
    export interface Path {
      title: string;
      description: string;
      id: number;
    }
    export interface PathInstance {
      path: Path;
      title: string;
      description: string;
      dateFrom: Date;
      dateTo: Date;
      numberOfStudents: number;
      numberOfRegisteredStudents: number;
      stillOpen: boolean;
      id: number;
    }

    export type response = Response<PathInstance[]>;
  }

  export namespace saveProfile {
    export interface Profile {
      name: string;
    }

    export type response = Response<Profile>;
  }
  export namespace studentLessonResponse {
    export type response = Response<StudentLesson>;
  }

  export namespace register {
    export enum Errors {
      PATH_NOT_FOUND = 'PATH_NOT_FOUND',
    }
    export type response = Response<openPath.PathInstance[]>;
  }

  export interface Answer {
    title: string;
    correct?: boolean;
  }

  export enum QuestionType {
    SingleChoice = 'SingleChoice',
    MultiChoice = 'MultiChoice',
  }

  export interface Question {
    title: string;
    answers: Answer[];
    mark?: number;
    questionType: QuestionType;
  }

  export interface Lesson {
    lessonId: number;
    title: string;
    pageNumber?: number;
    description: string;
    present: boolean;
    audio?: string;
    done: boolean;
    date: Date;
    mark: number;
    questions: Question[];
    answeredOptions: number[][];
  }

  export interface Quiz {
    dateFrom: Date;
    dateTo: Date;
    doneOnDate: Date;
    title: string;
    questions: Question[];
    mark?: number;
    fullMark?: number;
    answeredOptions?: number[][];
  }

  export type StudentLessonBody = Omit<StudentLesson, 'student' | 'date'> & {
    courseId: number;
    lessonId: number;
  };

  export type StudentQuizBody = Omit<StudentQuiz, 'student' | 'date'> & {
    courseId: number;
    quizId: number;
  };
}
