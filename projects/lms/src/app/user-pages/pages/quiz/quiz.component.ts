import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { translationKeys } from '../../../../../../../src/app/core/models/translations';
import { ExamComponent, ExamResult } from '../../../core/components/exam/exam.component';
import { BFF } from '../../models/schema-bff';
import { StudentService } from '../../services/student.service';
import { getUserRouteInfo } from '../../user-pages-routing';
import { UserStore } from '../../user-state';

@Component({
  standalone: true,
  imports: [CommonModule, ExamComponent, TranslateModule],
  template: `
    <h1 class="header">
      {{ quiz.title }}
    </h1>
    <h4 *ngIf="quiz.mark !== undefined">
      {{ t.quizzes.mark | translate }} {{ quiz.mark }} {{ t.quizzes.from | translate }} {{ quiz.fullMark }}
    </h4>
    <app-exam [questions]="questions" [done]="quiz.mark !== undefined" (finishExam)="finishExam($event)"></app-exam>
  `,
})
export class QuizComponent {
  routeInfo = getUserRouteInfo();
  t = translationKeys;
  quiz = this.routeInfo.quiz!;
  questions = this.quiz.questions!;

  studentService = inject(StudentService);
  userStore = inject(UserStore);

  finishExam(degree: ExamResult) {
    const body: BFF.StudentQuizBody = {
      courseId: this.routeInfo.courseId,
      quizId: this.routeInfo.quizId,
      fullMark: degree.fullMark,
      mark: degree.mark,
      answeredOptions: [],
    };
    this.studentService.finishQuiz(body).subscribe(() => {
      this.quiz.mark = degree.mark;
      this.quiz.fullMark = degree.fullMark;
      this.userStore.resetStudent();
    });
  }
}
