import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { QuizzesPageFromToTransParams, translationKeys } from '../../../../../../../src/app/core/models/translations';
import { CoreModule } from '../../../../../../../src/app/core/modules/core.module';
import { TableColumn } from '../../../core/components/table/table';
import { BFF } from '../../models/schema-bff';
import { QuizParams } from '../../user-pages-routing';
import { UserStore } from '../../user-state';
import { canTakeQuiz } from '../../utils/quiz-utils';

interface QuizInfo {
  facultyName: string;
  courseName: string;
  quizName: string;
  mark?: string;
  canTake: boolean;
  fromTo: string;
  quizParams: QuizParams;
}

@Component({
  standalone: true,
  imports: [CoreModule],
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent {
  translationKeys = translationKeys;

  courses: BFF.myPaths.Course[] = [];

  quizzes: QuizInfo[] = this.getQuizzes();
  quizzesTableColumns: TableColumn<QuizInfo>[] = this.initializeColumns();

  constructor(
    private userStore: UserStore,
    private datePipe: DatePipe,
    private translateService: TranslateService,
  ) {}

  initializeColumns(): TableColumn<QuizInfo>[] {
    return [
      {
        name: 'quizzes.exam_name',
        dataKey: 'quizName',
      },
      {
        name: 'quizzes.faculty',
        dataKey: 'facultyName',
      },
      {
        name: 'course',
        dataKey: 'courseName',
      },
      {
        name: 'quizzes.from',
        dataKey: 'fromTo',
      },
      {
        name: 'quizzes.mark',
        dataKey: 'mark',
      },
    ];
  }

  private createQuizInfo(
    faculty: BFF.myPaths.Path,
    course: BFF.myPaths.Course,
    quiz: BFF.Quiz,
    quizIndex: number,
  ): QuizInfo {
    const fromTo = this.translateService.instant(translationKeys.quizzesPage.from_to, {
      from: this.datePipe.transform(quiz.dateFrom),
      to: this.datePipe.transform(quiz.dateTo),
    } as QuizzesPageFromToTransParams);
    const fromTrans = this.translateService.instant(translationKeys.from);
    return {
      facultyName: faculty.title,
      courseName: course.title,
      quizName: quiz.title,
      mark: quiz.mark !== undefined ? `${quiz.mark}  ${fromTrans} ${quiz.fullMark}` : '',
      canTake: canTakeQuiz(quiz),
      fromTo,
      quizParams: {
        pathId: faculty.id,
        courseId: course.id,
        quizId: quizIndex,
      },
    };
  }

  getQuizzes(): QuizInfo[] {
    return this.userStore
      .studentResponse()
      .data!.paths.map((f) => f.courses.map((c) => c.quizzes.map((q, index) => this.createQuizInfo(f, c, q, index))))
      .flat()
      .flat();
  }
}
