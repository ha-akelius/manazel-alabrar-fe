import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { translationKeys } from '../../../../../../../src/app/core/models/translations';
import { Question, QuestionType } from '../../../user-pages/models/schema';
import { MultiChoiceComponent } from './components/multi-choice/multi-choice.component';
import { SingleChoiceComponent } from './components/single-choice/single-choice.component';
import { ExamStore, StudentAnswer } from './exam.store';

function sumArray(arr: number[]): number {
  // Using the reduce method to accumulate the sum
  const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return sum;
}

export interface ExamResult {
  mark: number;
  fullMark: number;
  answeredOptions: number[][];
}

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, TranslateModule, SingleChoiceComponent, MultiChoiceComponent],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  providers: [ExamStore],
})
export class ExamComponent implements OnInit {
  examStore = inject(ExamStore);
  translateService = inject(TranslateService);

  @Input() questions: Question[] = [];
  @Input() answeredOptions?: number[][];
  @Input({ required: true }) done: boolean = false;
  @Output() finishExam = new EventEmitter<ExamResult>();

  qt = QuestionType;
  translationKeys = translationKeys;

  disableDoneBtn = computed(() => {
    const answers = this.examStore.answers();
    const doneAllQeustions = answers.filter((a) => a.answered).length === answers.length;
    return !doneAllQeustions;
  });

  ngOnInit(): void {
    const answers: StudentAnswer[] = this.questions.map((question, index) => ({
      question,
      isCorrect: false,
      answered: false,
      answeredOptions: this.answeredOptions?.[index] ?? [],
    }));

    this.examStore.answers.set(answers);
    this.examStore.checkAnswer.set(this.done);
  }

  toggleCheck() {
    this.examStore.checkAnswer.set(!this.examStore.checkAnswer());
    const answers = this.examStore.answers();
    const mark = sumArray(answers.filter((a) => a.isCorrect).map((a) => a.question.mark || 1));
    const fullMark = sumArray(answers.map((a) => a.question.mark || 1));
    const answeredOptions = answers.map((a) => a.answeredOptions ?? []);

    this.finishExam.emit({ mark, fullMark, answeredOptions });
  }
}
