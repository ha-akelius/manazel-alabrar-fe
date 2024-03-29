import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  computed,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { BasicRecord, TableColumn } from './table';

@Directive({
  selector: '[appColDef]',
  standalone: true,
})
export class ColumnDefinitionDirective {
  @Input() appColDef: string = '';

  constructor(public templateRef: TemplateRef<never>) {}
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, CommonModule, MatSortModule, MatPaginatorModule, TranslateModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T extends BasicRecord> implements AfterViewInit, AfterContentChecked {
  isPageable = input(false);
  tableColumns = input<TableColumn<T>[]>([]);
  paginationSizes = input<number[]>([5, 10, 15]);
  defaultPageSize = input<number>(10);
  displayedColumns = computed(() => this.tableColumns().map((tableColumn: TableColumn<T>) => tableColumn.name));

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() fetchData = new EventEmitter<void>();

  tableDataSource = new MatTableDataSource([] as T[]);
  templates: Map<string, TemplateRef<never>> = new Map();

  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  @ContentChildren(ColumnDefinitionDirective, { descendants: true })
  _contentRowDefs?: QueryList<ColumnDefinitionDirective>;
  triggerChagnes = new Subject<void>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: T[]) {
    this.setTableDataSource(data);
  }

  constructor() {
    this.triggerChagnes.pipe(takeUntilDestroyed()).subscribe(() => this.triggerFetchData());
  }

  ngAfterContentChecked(): void {
    this._contentRowDefs?.forEach((t) => {
      this.templates.set(t.appColDef, t.templateRef);
    });
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
  }

  setTableDataSource(data: T[]) {
    this.tableDataSource = new MatTableDataSource<T>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns().find((column: TableColumn<T>) => column.name === sortParameters.active)!
      .dataKey as unknown as string;
    this.sort.emit(sortParameters);
  }

  getCompInputs(inputs: Record<string, unknown> | undefined, record: unknown): Record<string, unknown> | undefined {
    return { ...(inputs ?? {}), record: record, onChange: this.triggerChagnes };
  }

  private triggerFetchData(): void {
    return this.fetchData.emit();
  }
}
