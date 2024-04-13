import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasicRecord, TableColumn } from '../../../../core/components/table/table';
import { TableComponent } from '../../../../core/components/table/table.component';
import { APIService } from '../../../../core/services/api.service';
import { Result } from '../../../../shared/models/result';
import { JSONSchema, SchemaInfo } from '../../model/json-schema';
import { getPropertyType, numberTypes, schemaInfo } from '../../model/schame';
import { ActionsDataTableComponent } from './actions-data-table/actions-data-table.component';
import { Filter, FilterDataTableComponent } from './filter-data-table/filter-data-table.component';
import { RelationLinkComponent } from './relation-link/relation-link.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  imports: [TableComponent, FilterDataTableComponent, ReactiveFormsModule, MatButtonModule, RouterModule],
  providers: [DatePipe],
})
export class DataTableComponent<T extends BasicRecord> implements OnInit {
  datePipe = inject(DatePipe);
  apiService = inject(APIService);

  @Input() entityName: string = '';
  tableColumns: TableColumn<T>[] = [];
  schemaInfo!: SchemaInfo<T>;
  result: Result<T> = {
    items: [],
    pages: 0,
  };
  filters = new FormControl([] as Filter[], { nonNullable: true });

  constructor() {
    this.filters.valueChanges.pipe(takeUntilDestroyed()).subscribe((filters) => this.fetchData(filters));
  }

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName, this.apiService);

    this.fetchData();

    this.tableColumns = [];
    for (const key in this.schemaInfo.schema.properties) {
      const property: JSONSchema = this.schemaInfo.schema.properties[key];
      const type = getPropertyType(property);
      if (property.$ref) {
        const tableColumn: TableColumn<T> = {
          name: key,
          dataKey: key as keyof T,
          // fn: this.getRelationFn(key),
          componentDef: {
            component: RelationLinkComponent,
            inputs: {
              key: key,
              refEntityName: 'post',
            },
          },
        };
        this.tableColumns.push(tableColumn);
      } else if (type !== 'array') {
        const tableColumn: TableColumn<T> = {
          name: key,
          dataKey: key as keyof T,
          fn: this.getFn(key),
        };
        this.tableColumns.push(tableColumn);
      }
    }
    this.tableColumns.push({
      name: 'action',
      componentDef: {
        component: ActionsDataTableComponent<T>,
        inputs: { entityName: this.entityName },
      },
    });
  }

  fetchData(filters: Filter[] = this.filters.value) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    filters.forEach(
      (filter) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (where[filter.field as any] = {
          [filter.operator]: numberTypes.includes(filter.type) ? +filter.value : filter.value,
        }),
    );
    this.schemaInfo.api.findAll({ where }).subscribe((result) => {
      this.result = result;
    });
  }

  private getFn(key: string): ((value: T[keyof T] | undefined) => string) | undefined {
    if (key.toLocaleLowerCase().indexOf('date') > 0) {
      return (value: T[keyof T] | undefined) => this.datePipe.transform(value as string) ?? '';
    } else {
      return undefined;
    }
  }

  private getRelationFn(key: string): ((value: T[keyof T] | undefined, x: T) => string) | undefined {
    return (_value: T[keyof T] | undefined, x: T) => {
      const idKey = (key + 'Id') as keyof T;
      const nameKey = (key + 'Name') as keyof T;
      if (x[idKey]) {
        return x[idKey] + ': ' + x[nameKey];
      } else {
        return '';
      }
    };
  }
}
