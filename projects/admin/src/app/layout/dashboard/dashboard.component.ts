import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-dashboared',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    CurrencyPipe,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
