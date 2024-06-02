import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { QuizzesPageFromToTransParams, translationKeys } from '../../../../../../../src/app/core/models/translations';
import { CoreModule } from '../../../../../../../src/app/core/modules/core.module';
import { TableColumn } from '../../../core/components/table/table';
import { UserStore } from '../../user-state';
import { canTakeQuiz } from '../../utils/quiz-utils';
import { QuizzFE } from './../../services/student.service';

interface QuizInfo {
  facultyName: string;
  courseName: string;
  quizName: string;
  mark?: string;
  canTake: boolean;
  fromTo: string;
}

@Component({
  standalone: true,
  imports: [CoreModule],
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent {
  translationKeys = translationKeys;

  courses: QuizzFE[] = [];

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

  private createQuizInfo(quiz: QuizzFE): QuizInfo {
    const fromTo = this.translateService.instant(translationKeys.quizzesPage.from_to, {
      from: this.datePipe.transform(quiz.dateFrom),
      to: this.datePipe.transform(quiz.dateTo),
    } as QuizzesPageFromToTransParams);
    const fromTrans = this.translateService.instant(translationKeys.from);
    const course = this.userStore.studentCoursesResponse().find((f) => f.id === quiz.courseInstanceId)!;
    return {
      facultyName: course.pathInstanceName,
      courseName: course.name,
      quizName: quiz.name,
      mark: quiz.mark !== undefined ? `${quiz.mark}  ${fromTrans} ${quiz.mark}` : '',
      canTake: canTakeQuiz(quiz),
      fromTo,
    };
  }

  getQuizzes(): QuizInfo[] {
    return this.userStore.studentQuizzesResponse().map((f) => this.createQuizInfo(f));
  }
}
