import { Component, Input, inject } from '@angular/core';
<<<<<<< Updated upstream
import { MatAutocompleteModule } from '@angular/material/autocomplete';
=======
import { ControlValueAccessor, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
>>>>>>> Stashed changes
import { Result } from '../../../../../shared/models/result';
import { DBService } from './../../../../../../../../src/app/core/services/db.service';

@Component({
  selector: 'app-relation',
  standalone: true,
<<<<<<< Updated upstream
  imports: [MatAutocompleteModule],
  templateUrl: './relation.component.html',
  styleUrl: './relation.component.scss',
})
export class RelationComponent {
  @Input({ required: true }) entityName: keyof DBService;

  dbService = inject(DBService);
  result: Result<{ id: number; email: string; name: string | null }[]>;

  findAll() {
    this.dbService[this.entityName].findAll().subscribe((result) => {
=======
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './relation.component.html',
  styleUrl: './relation.component.scss',
})
export class RelationComponent implements ControlValueAccessor {
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  @Input({ required: true }) entityName: keyof DBService;

  dbService = inject(DBService);
  result: Result<{ id: number; email: string; name: string | null }>;

  findAll() {
    this.dbService[this.entityName].findAll({ where: { name: { contains: '123' } } }).subscribe((result) => {
>>>>>>> Stashed changes
      this.result = result;
    });
  }
}
