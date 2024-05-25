export interface media {
  url: string;
}
export enum UserRelations {
  teacherFor = 'teacherFor',
  paths = 'paths',
  courses = 'courses',
  pathInstances = 'pathInstances',
  pathInstanceRefs = 'pathInstanceRefs',
}

export enum CourseRelations {
  course_instances = 'course_instances',
  path = 'path',
}

export enum CourseInstanceRelations {
  course = 'course',
  path_instance = 'path_instance',
  book = 'book',
  lessons = 'lessons',
  quizzes = 'quizzes',
}

export enum PathRelations {
  courses = 'courses',
  teacher = 'teacher',
  students = 'students',
  path_instances = 'path_instances',
}

export enum PathInstanceRelations {
  path = 'path',
  teacher = 'teacher',
  course_instances = 'course_instances',
  students = 'students',
}

export enum LessonRelations {
  audio = 'audio',
  questions = 'questions',
  student_activities = 'student_activities',
}

export enum StudentLessonRelations {
  student = 'student',
}

export enum QuestionRelations {
  answers = 'answers',
}

export enum QuizRelations {
  questions = 'questions',
  student_quizzes = 'student_quizzes',
}

export enum StudentQuizRelations {
  student = 'student',
}

export enum CourseResultRelations {
  course = 'course',
  course_instance = 'course_instance',
  path = 'path',
}

export enum PathResultRelations {
  path = 'path',
  path_instance = 'path_instance',
}

export enum UserAttributes {
  name = 'name',
  firstName = 'firstName',
  lastName = 'lastName',
  status = 'status',
  username = 'username',
  email = 'email',
  provider = 'provider',
  password = 'password',
  resetPasswordToken = 'resetPasswordToken',
  confirmationToken = 'confirmationToken',
  confirmed = 'confirmed',
  blocked = 'blocked',
  teacherFor = 'teacherFor',
  paths = 'paths',
  courses = 'courses',
  pathInstances = 'pathInstances',
  pathInstanceRefs = 'pathInstanceRefs',
  id = 'id',
}

export enum CourseAttributes {
  title = 'title',
  course_instances = 'course_instances',
  path = 'path',
  id = 'id',
}

export enum CourseInstanceAttributes {
  course = 'course',
  path_instance = 'path_instance',
  title = 'title',
  description = 'description',
  dateFrom = 'dateFrom',
  dateTo = 'dateTo',
  book = 'book',
  lessons = 'lessons',
  quizzes = 'quizzes',
  id = 'id',
}

export enum PathAttributes {
  title = 'title',
  description = 'description',
  courses = 'courses',
  teacher = 'teacher',
  students = 'students',
  path_instances = 'path_instances',
  id = 'id',
}

export enum PathInstanceAttributes {
  path = 'path',
  title = 'title',
  description = 'description',
  dateFrom = 'dateFrom',
  dateTo = 'dateTo',
  teacher = 'teacher',
  numberOfStudents = 'numberOfStudents',
  numberOfRegisteredStudents = 'numberOfRegisteredStudents',
  stillOpen = 'stillOpen',
  course_instances = 'course_instances',
  students = 'students',
  id = 'id',
}

export enum LessonAttributes {
  title = 'title',
  description = 'description',
  pageNumber = 'pageNumber',
  toPageNumber = 'toPageNumber',
  audio = 'audio',
  date = 'date',
  questions = 'questions',
  student_activities = 'student_activities',
}

export enum StudentLessonAttributes {
  student = 'student',
  done = 'done',
  mark = 'mark',
}

export enum AnswerAttributes {
  title = 'title',
  correct = 'correct',
}

export enum QuestionAttributes {
  questionType = 'questionType',
  title = 'title',
  answers = 'answers',
  mark = 'mark',
}

export enum QuizAttributes {
  title = 'title',
  dateFrom = 'dateFrom',
  dateTo = 'dateTo',
  mark = 'mark',
  questions = 'questions',
  student_quizzes = 'student_quizzes',
}

export enum StudentQuizAttributes {
  student = 'student',
  date = 'date',
  mark = 'mark',
  fullMark = 'fullMark',
}

export enum CourseResultAttributes {
  course = 'course',
  course_instance = 'course_instance',
  path = 'path',
  mark = 'mark',
}

export enum PathResultAttributes {
  path = 'path',
  path_instance = 'path_instance',
}

export interface User {
  name: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  username: string;
  email: string;
  provider?: string;
  password?: string;
  resetPasswordToken?: string;
  confirmationToken?: string;
  confirmed?: boolean;
  blocked?: boolean;
  teacherFor?: PathInstance[];
  paths?: Path[];
  courses?: CourseResult[];
  pathInstances?: PathResult[];
  pathInstanceRefs?: PathInstance[];
  id: number;
}

export interface Course {
  title: string;
  course_instances?: CourseInstance[];
  path: Path;
  id: number;
}

export interface CourseInstance {
  course?: Course;
  path_instance?: PathInstance;
  title: string;
  description: string;
  dateFrom?: Date;
  dateTo?: Date;
  book?: media;
  lessons: Lesson[];
  quizzes?: Quiz[];
  id: number;
}

export interface Path {
  title: string;
  description: string;
  courses?: Course[];
  teacher?: User;
  students?: User[];
  path_instances?: PathInstance[];
  id: number;
}

export interface PathInstance {
  path: Path;
  title: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  teacher: User;
  numberOfStudents: number;
  numberOfRegisteredStudents: number;
  stillOpen: boolean;
  course_instances?: CourseInstance[];
  students?: User[];
  id: number;
}

export interface Lesson {
  title: string;
  description?: string;
  pageNumber?: number;
  toPageNumber?: number;
  audio?: media;
  date: Date;
  questions?: Question[];
  student_activities?: StudentLesson[];
}

export interface StudentLesson {
  student?: User;
  done?: boolean;
  mark?: number;
  answeredOptions?: number[][];
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
  questionType: QuestionType;
  title: string;
  answers: Answer[];
  mark?: number;
}

export interface Quiz {
  title: string;
  dateFrom: Date;
  dateTo: Date;
  mark?: number;
  questions: Question[];
  student_quizzes?: StudentQuiz[];
}

export interface StudentQuiz {
  student?: User;
  date: Date;
  mark: number;
  fullMark: number;
  answeredOptions: number[][];
}

export interface CourseResult {
  course?: Course;
  course_instance?: CourseInstance;
  path?: Path;
  mark?: number;
}

export interface PathResult {
  path?: Path;
  path_instance?: PathInstance;
}
