import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HomepageExamTransParams, translationKeys } from '../../../../../../../src/app/core/models/translations';
import { SharedModule } from '../../../../../../../src/app/core/modules/shared.module';
import { Lesson } from '../../models/schema';
import { LessonParams, QuizParams, userPageRouting } from '../../user-pages-routing';
import { UserStore } from '../../user-state';
import { CourseFE, QuizzFE } from './../../services/student.service';

function sameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

interface LessonItem {
  courseName: string;
  lessonName: string;
  lessonParams: LessonParams;
}

interface QuizItem {
  exam: QuizzFE;
  transParam: HomepageExamTransParams;
  quizParams: QuizParams;
}

@Component({
  selector: 'app-user-homepage',
  standalone: true,
  imports: [SharedModule, MatDatepickerModule, FormsModule],
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss'],
})
export class UserHomepageComponent implements OnInit {
  _currentDate = new Date();
  lessons: LessonItem[] = [];
  quizzes: QuizItem[] = [];
  lessonRouter = userPageRouting.lesson.path;
  quizRouter = userPageRouting.quiz.path;
  translationKeys = translationKeys;

  get currentDate(): Date {
    return this._currentDate;
  }

  set currentDate(date: Date) {
    this._currentDate = date;
    this.filterCourses();
  }

  constructor(
    private userStore: UserStore,
    private datePipe: DatePipe,
  ) {}

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
      .studentQuizzesResponse()
      .map((f) => this.mapExamToExamItem(f))
      .flat()
      .flat();
  }

  private mapExamToExamItem(e: QuizzFE): QuizItem {
    return {
      exam: e,
      transParam: {
        name: e.name,
        from: this.datePipe.transform(e.dateFrom)!,
        to: this.datePipe.transform(e.dateTo)!,
      },
      quizParams: {
        courseId: e.courseInstanceId,
        quizId: e.id,
      },
    };
  }

  private filterCourses() {
    this.lessons = this.userStore
      .studentCoursesResponse()
      .map((c) => this.getLessonsForToday(c))
      .flat();
  }

  private getLessonsForToday(c: CourseFE): LessonItem[] {
    return c.lessons
      .filter((lesson) => sameDay(lesson.date, this.currentDate))
      .map((l, index) => this.createLessonItem(c, l, index));
  }

  private createLessonItem(course: CourseFE, lesson: Lesson, index: number): LessonItem {
    return {
      courseName: course.name,
      lessonName: lesson.name,
      lessonParams: {
        courseId: course.id,
        lessonId: index,
      },
    };
  }

  private changeDate(add: number): void {
    this.currentDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + add));
  }
}
