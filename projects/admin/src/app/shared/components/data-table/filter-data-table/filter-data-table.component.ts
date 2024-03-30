import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output, forwardRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JSONSchema7TypeName } from 'json-schema';
import { Subscription } from 'rxjs';
import { JSONSchema } from '../../../model/json-schema';
import { fromJsonTypeToHtmlType, getFirstType } from '../../../model/schame';

export interface Filter {
  field: string;
  operator: string;
  value: string;
  type: JSONSchema7TypeName;
}

function getFilterForm() {
  const retVal = new FormGroup({
    field: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    operator: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    value: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl('' as string, { nonNullable: true, validators: [Validators.required] }),
  });
  return retVal;
}
type FilterForm = ReturnType<typeof getFilterForm>;

@Component({
  selector: 'app-filter-data-table',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    KeyValuePipe,
  ],
  templateUrl: './filter-data-table.component.html',
  styleUrl: './filter-data-table.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterDataTableComponent),
      multi: true,
    },
  ],
})
export class FilterDataTableComponent implements OnDestroy {
  @Input() schema: JSONSchema;
  @Output() search = new EventEmitter<Filter[]>();
  filters = new FormArray<FilterForm>([]);

  subscribe = new Subscription();

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  triggerSearch() {
    this.search.emit(this.filters.getRawValue() as Filter[]);
  }

  addFilter(): void {
    const filter = getFilterForm();
    this.subscribe.add(filter.controls.field.valueChanges.subscribe((field) => this.setType(field, filter)));
    this.filters.push(filter);
  }

  removeFilter(index: number): void {
    this.filters.removeAt(index);
  }

  setType(field: string, filterForm: FilterForm): void {
    const property = this.schema.properties[filterForm.controls.field.value];
    filterForm.controls.type.setValue(fromJsonTypeToHtmlType(getFirstType(property) ?? 'null'));
  }
}
