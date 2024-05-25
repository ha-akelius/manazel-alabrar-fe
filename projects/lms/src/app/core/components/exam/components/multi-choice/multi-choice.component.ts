import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { QuestionComponent } from '../QuestionComponent';

@Component({
  selector: 'app-multi-choice',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './multi-choice.component.html',
  styleUrls: ['./multi-choice.component.scss', '../question.scss'],
})
export class MultiChoiceComponent extends QuestionComponent {
  checked: boolean[] = [];
  changeValue(t: MatCheckboxChange, index: number) {
    this.checked[index] = t.checked;
    const isCorrect = this.question().answers.every((a, index) => a.correct === this.checked[index]);
    const answers = this.checked.filter((element, index) => element).map((element, index) => index);
    super.triggerScore(isCorrect, answers);
  }

  override questionFetched(): void {
    this.checked = this.question().answers.map((a, index) => this.answeredOptions().includes(index));
  }
}
