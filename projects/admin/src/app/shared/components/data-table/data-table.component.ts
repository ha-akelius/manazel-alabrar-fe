import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Type, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { BasicRecord, TableColumn, TableColumnComponent } from '../../../../core/components/table/table';
import { TableComponent } from '../../../../core/components/table/table.component';
import { APIService } from '../../../../core/services/api.service';
import { Result } from '../../../../shared/models/result';
import { translations } from '../../../translations';
import { GuiPropInformation, InputType, SchemaInfo } from '../../model/json-schema';
import { apiService, assertSchemaInfo, numberTypes } from '../../model/schame';
import { ActionsDataTableComponent } from './actions-data-table/actions-data-table.component';
import { Filter, FilterDataTableComponent } from './filter-data-table/filter-data-table.component';
import { RelationLinkComponent } from './relation-link/relation-link.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  imports: [
    TableComponent,
    FilterDataTableComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
  ],
  providers: [DatePipe],
})
export class DataTableComponent<T extends BasicRecord> implements OnInit, OnChanges {
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
  translations = translations.general;

  constructor() {
    this.filters.valueChanges.pipe(takeUntilDestroyed()).subscribe((filters) => this.fetchData(filters));
  }
  ngOnChanges(): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.schemaInfo = assertSchemaInfo(this.entityName);

    this.fetchData();

    this.tableColumns = [];
    for (const propInfo of Object.values(this.schemaInfo.schema)) {
      if (propInfo.guiInfo.hide?.list) {
        continue;
      }
      if (propInfo.propInformation.basic.ref) {
        const tableColumn: TableColumn<T> = {
          name: propInfo.propInformation.basic.name,
          displayName: propInfo.guiInfo.label,
          dataKey: propInfo.propInformation.basic.name as keyof T,
          componentDef: {
            component: RelationLinkComponent,
            inputs: {
              key: propInfo.propInformation.basic.name,
              refEntityName: propInfo.propInformation.basic.ref,
            },
          },
        };
        this.tableColumns.push(tableColumn);
        // } else if (type !== 'array') {
      } else {
        const tableColumn: TableColumn<T> = {
          name: propInfo.propInformation.basic.name,
          displayName: propInfo.guiInfo.label,
          dataKey: propInfo.propInformation.basic.name as keyof T,
          fn: this.getFn(propInfo),
          componentDef: propInfo.guiInfo.hooks?.list
            ? { component: propInfo.guiInfo.hooks?.list as Type<TableColumnComponent<unknown, T>> }
            : undefined,
        };
        this.tableColumns.push(tableColumn);
      }
    }

    this.tableColumns.push({
      name: 'action',
      displayName: 'action',
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
    apiService(this.schemaInfo.api, this.apiService)
      .findAll({ where })
      .subscribe((result) => {
        this.result = result as Result<T>;
      });
  }

  private getFn(prop: GuiPropInformation): ((value: T[keyof T] | undefined) => string) | undefined {
    const key = prop.propInformation.basic.name;
    if (key.toLocaleLowerCase().indexOf('date') >= 0 && key.toLocaleLowerCase().indexOf('update') < 0) {
      return (value: T[keyof T] | undefined) => this.datePipe.transform(value as string) ?? '';
    }
    if (prop.guiInfo.inputType === InputType.jsonArray) {
      return (value: T[keyof T] | undefined) => (value ? this.formatArray(prop, value as Array<unknown>) : '');
    } else {
      return undefined;
    }
  }

  private formatArray(prop: GuiPropInformation, value: Array<unknown>): string {
    return prop.guiInfo.label + ' (' + value.length + ')';
  }
}
