import { Component, Input, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Result } from '../../../../../shared/models/result';
import { RestApiService } from '../../../../../shared/services/rest-api.service';
import { DBService } from './../../../../../../../../src/app/core/services/db.service';

type realtionType = { id: number; name: string };
type resultType = Result<realtionType>;

@Component({
  selector: 'app-relation',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './relation.component.html',
  styleUrl: './relation.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RelationComponent),
      multi: true,
    },
  ],
})
export class RelationComponent implements ControlValueAccessor {
  idControl = new FormControl<number | undefined>(undefined);
  @Input({ required: true }) entityName: keyof DBService;

  dbService = inject(DBService);
  result: resultType = {
    items: [],
    pages: 0,
  };

  findAll() {
    const service: RestApiService<realtionType, unknown, unknown, unknown> = this.dbService[this.entityName] as never;
    service.findAll({ where: { name: { contains: '123' } } }).subscribe((result: resultType) => {
      this.result = result;
    });
  }

  onChange: (id: number) => void;

  writeValue(obj: number): void {
    this.idControl.setValue(obj);
  }
  registerOnChange(fn: (id: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(): void {}
}
