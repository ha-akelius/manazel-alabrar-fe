/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output, forwardRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { WithPropType } from '../../../../../models/utils/type-utils';
import { GuiPropInformation } from '../../../model/json-schema';
import { fromJsonTypeToHtmlType, htmlInputType } from '../../../model/schame';
import { typeOperator } from './filter-data-table';

export interface Filter {
  field: string;
  operator: string;
  value: string;
  type: string;
}

function getFilterForm() {
  const retVal = new FormGroup({
    field: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    operator: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    value: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl('' as htmlInputType, { nonNullable: true, validators: [Validators.required] }),
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
    MatChipsModule,
    MatInputModule,
    MatButtonModule,
    KeyValuePipe,
  ],
  templateUrl: './filter-data-table.component.html',
  styleUrls: ['./filter-data-table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterDataTableComponent),
      multi: true,
    },
  ],
})
export class FilterDataTableComponent implements OnDestroy {
  @Input() schema: WithPropType<any, GuiPropInformation>;
  @Output() search = new EventEmitter<Filter[]>();
  filters = new FormArray<FilterForm>([]);

  subscribe = new Subscription();

  typeOperator = typeOperator;

  isFilterListOpen = false;

  toggleFilterList(): void {
    this.isFilterListOpen = !this.isFilterListOpen;
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  triggerSearch() {
    this.search.emit(this.filters.value as Filter[]);
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
    const property = this.schema[field];
    const type = property.propInformation.basic.type ?? 'null';
    filterForm.controls.type.setValue(fromJsonTypeToHtmlType(field, type));
  }
}
