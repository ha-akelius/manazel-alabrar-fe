import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { translationKeys } from '../../../../../../../src/app/core/models/translations';
import { ExamComponent, ExamResult } from '../../../core/components/exam/exam.component';
import { StudentService } from '../../services/student.service';
import { getUserRouteInfo } from '../../user-pages-routing';
import { UserStore } from '../../user-state';

@Component({
  standalone: true,
  imports: [CommonModule, ExamComponent, TranslateModule],
  template: `
    <h1 class="header">
      {{ quiz.name }}
    </h1>
    <h4 *ngIf="quiz.mark !== undefined">
      {{ t.quizzes.mark | translate }} {{ quiz.mark }} {{ t.quizzes.from | translate }} {{ quiz.mark }}
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
    const quiz = this.routeInfo.quiz!;
    const sudentQuizBody = {
      fullMark: quiz.mark,
      mark: degree.mark,
      date: new Date(),
      quizId: quiz.id,
      quizName: quiz.name,
      studentId: this.userStore.studnet().id,
      studentName: this.userStore.studnet().name,
      answerOptions: degree.answeredOptions,
      createdDate: new Date(),
      updatedDate: new Date(),
      createdUserName: this.userStore.studnet().name,
      createdUserId: this.userStore.studnet().id,
      updatedUserName: this.userStore.studnet().name,
      updatedUserId: this.userStore.studnet().id,
    };

    this.studentService.finishExam(sudentQuizBody).subscribe((quiz) => {
      this.quiz = quiz;
      this.userStore.resetStudent();
    });
  }
}
