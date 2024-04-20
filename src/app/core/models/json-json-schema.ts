export interface Person {
  firstName: string;
  lastName: string;
  age: number;
  socials: string[];
  posts: Post[];
}
export interface Post {
  firstName: string;
  lastName: string;
  age: number;
  socials: string[];
  person: Person;
}
export interface media {
  url: string;
}
export interface Lesson {
  title: string;
  description: string;
  pageNumber: number;
  toPageNumber: number;
  audio: media;
  date: Date;
  courseInstance: CourseInstance;
}
export enum QuestionType {
  SingleChoice = 'SingleChoice',
  MultiChoice = 'MultiChoice',
}
export interface Question {
  questionType: QuestionType;
  title: string;
  answers: Answer[];
  mark?: number;
  quiz: Quiz;
}

export interface Answer {
  title: string;
  correct: boolean;
  question: Question;
}

export interface StudentLesson {
  student: Student;
  done: boolean;
  mark?: number;
  answeredOptions: unknown;
}

export interface Course {
  title: string;
  course_instances?: CourseInstance[];
  path: Path;
  id: number;
}
export interface CourseInstance {
  course?: Course;
  path_instance?: StudentPathInstance;
  title: string;
  description: string;
  dateFrom?: Date;
  dateTo?: Date;
  book?: media;
  lessons: Lesson[];
  quizzes: Quiz[];
  id: number;
  teacher: Teacher;
}
export interface Path {
  id: number;
  name: string;
  description: string;
  studentpathinstance: StudentPathInstance[];
  cources: Course[];
}
export interface StudentPathInstance {
  path: Path;
  title: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  numberOfStudents: number;
  numberOfRegisteredStudents: number;
  stillOpen: boolean;
  course_instances?: CourseInstance[];
  quizInstanceStudents: QuizInstanceStudent[];
  students: Student;
  id: number;
}

export interface Student {
  id: number;
  name: string;
  password: string;
  quizStudents: QuizInstanceStudent[];
  studentpathinstance: StudentPathInstance[];
  studentlesson: StudentLesson[];
}
export interface Quiz {
  title: string;
  dateFrom: Date;
  dateTo: Date;
  mark?: number;
  questions: Question[];
  student_quizzes: QuizInstanceStudent[];
  courseInstance: CourseInstance;
}
export interface QuizInstanceStudent {
  student: Student;
  date: Date;
  mark: number;
  fullMark: number;
  answeredOptions: unknown;
  quiz: Quiz;
  studentpathinstance: StudentPathInstance;
}

export interface Teacher {
  id: number;
  name: string;
  password: string;
  phone: number;
  email: string;
  courseInstances: CourseInstance[];
}
