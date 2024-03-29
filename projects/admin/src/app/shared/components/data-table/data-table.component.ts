import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasicRecord, TableColumn } from '../../../../core/components/table/table';
import { TableComponent } from '../../../../core/components/table/table.component';
import { APIService } from '../../../../core/services/api.service';
import { Result } from '../../../../shared/models/result';
import { JSONSchema, SchemaInfo } from '../../model/json-schema';
import { schemaInfo } from '../../model/schame';
import { ActionsDataTableComponent } from './actions-data-table/actions-data-table.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  imports: [TableComponent, MatButtonModule, RouterModule],
  providers: [DatePipe],
})
export class DataTableComponent<T extends BasicRecord> implements OnInit {
  datePipe = inject(DatePipe);
  apiService = inject(APIService);

  @Input() entityName: string = '';
  tableColumns: TableColumn<T>[] = [];
  schemaInfo!: SchemaInfo;
  result: Result<T> = {
    items: [],
    pages: 0,
  };

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName, this.apiService);

    this.fetchData();

    this.tableColumns = [];
    for (const key in this.schemaInfo.schema.properties) {
      const property: JSONSchema = this.schemaInfo.schema.properties[key];
      const type = Array.isArray(property.type) ? property.type[0] : property.type;
      if (type !== 'array') {
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

  fetchData() {
    this.schemaInfo.api.findAll().subscribe((result) => {
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
}
