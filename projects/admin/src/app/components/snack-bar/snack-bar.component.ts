import { Component } from '@angular/core';
import { translations } from '../../translations';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  translations = translations.general;
}
