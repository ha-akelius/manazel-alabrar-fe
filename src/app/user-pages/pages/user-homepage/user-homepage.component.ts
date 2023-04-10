import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomepageExamTransParams, translationKeys } from '../../../core/models/translations';
import { SharedModule } from '../../../core/modules/shared.module';
import { BFF } from '../../models/student';
import { LessonParams, QuizParams, userPageRouting } from '../../user-pages-routing';
import { UserStore } from '../../user-state';
import { canTakeQuiz } from '../../utils/quiz-utils';

function sameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

interface LessonItem {
  courseName: string;
  lessonName: string;
  lessonParams: LessonParams;
}

interface QuizItem {
  exam: BFF.Quiz;
  transParam: HomepageExamTransParams;
  quizParams: QuizParams;
}

@Component({
  selector: 'app-user-homepage',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss'],
})
export class UserHomepageComponent implements OnInit {
  currentDate = new Date();
  lessons: LessonItem[] = [];
  quizzes: QuizItem[] = [];
  lessonRouter = userPageRouting.lesson.path;
  quizRouter = userPageRouting.quiz.path;
  translationKeys = translationKeys;

  constructor(private userStore: UserStore, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.changeDate(0);
    this.prepareExams();
  }

  nextDate(): void {
    this.changeDate(-1);
  }

  previousDate(): void {
    this.changeDate(1);
  }

  private prepareExams() {
    const today = new Date();
    this.quizzes = this.userStore
      .get()
      .student.faculties.map((f) =>
        f.courses.map((c) =>
          c.quizzes.filter(canTakeQuiz).map((e, examIndex) => this.mapExamToExamItem(f, c, e, examIndex))
        )
      )
      .flat()
      .flat();
  }

  private mapExamToExamItem(f: BFF.Faculty, c: BFF.Course, e: BFF.Quiz, examIndex: number): QuizItem {
    return {
      exam: e,
      transParam: {
        name: e.title,
        from: this.datePipe.transform(e.dateFrom)!,
        to: this.datePipe.transform(e.dateTo)!,
      },
      quizParams: {
        facultyId: f.id,
        courseId: c.id,
        quizId: examIndex,
      },
    };
  }

  private filterCourses() {
    this.lessons = this.userStore
      .get()
      .student.faculties.map((faculty) => faculty.courses.map((c) => this.getLessonsForToday(c)))
      .flat()
      .flat();
  }

  private getLessonsForToday(c: BFF.Course): LessonItem[] {
    return c.lessons.filter((lesson) => sameDay(lesson.date, this.currentDate)).map((l) => this.createLessonItem(c, l));
  }

  private createLessonItem(course: BFF.Course, lesson: BFF.Lesson): LessonItem {
    return {
      courseName: course.title,
      lessonName: lesson.title,
      lessonParams: {
        courseId: course.id,
        lessonId: lesson.lessonId,
        facultyId: course.facultyId,
      },
    };
  }

  private changeDate(add: number): void {
    this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + add));
    this.filterCourses();
  }
}
