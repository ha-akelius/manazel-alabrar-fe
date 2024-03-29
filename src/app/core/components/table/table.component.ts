import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from '../../modules/shared.module';
import { TableColumn } from './table';

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
  imports: [SharedModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit, AfterViewInit, AfterContentChecked {
  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[] = [];
  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn<T>[] = [];
  @Input() rowActionIcon?: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<never> = new EventEmitter<never>();

  @ContentChildren(ColumnDefinitionDirective, { descendants: true })
  _contentRowDefs?: QueryList<ColumnDefinitionDirective>;

  templates: Map<string, TemplateRef<never>> = new Map();
  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: never[]) {
    this.setTableDataSource(data);
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn<never>) => tableColumn.name);
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon, ...columnNames];
    } else {
      this.displayedColumns = columnNames;
    }
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

  setTableDataSource(data: never[]) {
    this.tableDataSource = new MatTableDataSource(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find((column) => column.name === sortParameters.active)!
      .dataKey as string;
    this.sort.emit(sortParameters);
  }

  emitRowAction(row: never) {
    this.rowAction.emit(row);
  }
}
