import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionComponent } from '../QuestionComponent';

@Component({
  selector: 'app-single-choice',
  standalone: true,
  imports: [CommonModule, MatRadioModule],
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.scss', '../question.scss'],
})
export class SingleChoiceComponent extends QuestionComponent implements OnInit {
  selectedAnswer = -1;

  ngOnInit(): void {
    this.selectedAnswer = this.answeredOptions()?.[0] ?? -1;
  }

  saveValue(value: number) {
    this.selectedAnswer = value;
    super.triggerScore(this.question().answers[this.selectedAnswer].correct!, [this.selectedAnswer]);
  }
}
