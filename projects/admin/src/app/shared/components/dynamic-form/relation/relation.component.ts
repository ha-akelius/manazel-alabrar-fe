import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { Result } from '../../../../../shared/models/result';
import { RestApiService } from '../../../../../shared/services/rest-api.service';
import { DBService } from './../../../../../../../../src/app/core/services/db.service';

type realtionType = { id: number; name: string };
type resultType = Result<realtionType>;

function toLowerCaseFirstLetter(str: string): string {
  return str[0].toLowerCase() + str.slice(1).toLowerCase();
}

@Component({
  selector: 'app-relation',
  standalone: true,
  imports: [JsonPipe, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
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
export class RelationComponent implements OnInit, ControlValueAccessor {
  filterControl = new FormControl<realtionType | string>('');
  selectedValue: realtionType;
  @Input({ required: true }) entityName: string;
  @Output() name = new EventEmitter<string>();

  dbService = inject(DBService);
  service: RestApiService<realtionType, unknown, unknown, unknown>;
  result: resultType = {
    items: [],
    pages: 0,
  };

  constructor() {
    this.filterControl.valueChanges.pipe(takeUntilDestroyed(), debounceTime(300)).subscribe(() => {
      if (!this.filterControl.value || typeof this.filterControl.value === 'string') {
        this.filterByName();
      } else {
        this.selectedValue = this.filterControl.value;
        this.onChange(this.selectedValue.id);
        this.name.emit(this.selectedValue.name);
      }
    });
  }

  ngOnInit(): void {
    this.service = this.dbService[toLowerCaseFirstLetter(this.entityName) as keyof DBService] as never;
    this.filterByName();
  }

  filterByName(): void {
    const where = this.filterControl.value ? { name: { contains: this.filterControl.value } } : undefined;
    this.service.findAll({ where }).subscribe((result: resultType) => {
      this.result = result;
    });
  }

  onChange: (id: number) => void;

  writeValue(obj: number): void {
    this.service.findAll({ where: { id: obj } }).subscribe((result: resultType) => {
      this.result = result;
      this.selectedValue = this.result.items[0];
      this.filterControl.setValue(this.selectedValue);
    });
  }
  registerOnChange(fn: (id: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(): void {}

  displayFn(relation: realtionType): string {
    return relation ? relation.name : '';
  }
}
