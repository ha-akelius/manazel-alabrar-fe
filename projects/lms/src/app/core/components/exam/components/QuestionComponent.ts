import { computed, Directive, inject, Input } from '@angular/core';
import { ExamStore } from '../exam.store';

@Directive()
export class QuestionComponent {
  store = inject(ExamStore);

  @Input() qIndex: number = 0;

  question = computed(() => this.store.answers()[this.qIndex].question);
  answeredOptions = computed(() => this.store.answers()[this.qIndex].answeredOptions ?? []);
  checkAnswer = this.store.checkAnswer;
  isCorrect: boolean = false;

  protected questionFetched() {}

  triggerScore(correct: boolean, choices: number[]) {
    this.isCorrect = correct;
    this.store.answers.update((a) => {
      a[this.qIndex].isCorrect = correct;
      a[this.qIndex].answered = true;
      a[this.qIndex].answeredOptions = choices;
      return [...a];
    });
  }
}
