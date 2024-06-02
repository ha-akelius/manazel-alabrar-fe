import { Injectable, signal } from '@angular/core';
import { Question } from '../../../user-pages/models/schema';

export interface StudentAnswer {
  question: Question;
  isCorrect: boolean;
  answered: boolean;
  answeredOptions?: number[];
}

@Injectable()
export class ExamStore {
  answers = signal<StudentAnswer[]>([]);
  checkAnswer = signal(false);
}
