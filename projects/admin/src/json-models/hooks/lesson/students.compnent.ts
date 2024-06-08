import { Component } from '@angular/core';
import { MatLabel } from '@angular/material/form-field';
import { FormFieldComponent, TableColumn, fromGuiTableColumn } from '../../../core/components/table/table';
import { TableComponent } from '../../../core/components/table/table.component';
import { studentLessonGuiInfo } from '../../gui-info/student-lesson.gui-info';
import { Lesson, StudentLesson } from '../../lessons';

@Component({
  standalone: true,
  imports: [TableComponent, MatLabel],
  styles: [
    `
      :host {
        width: 100%;
        grid-column: span 12;
      }

      app-table {
        display: block;
        width: 100%;
      }
    `,
  ],
  template: `
    <mat-label>{{ propInfo.guiInfo.label }}</mat-label>
    <app-table [isPageable]="true" [tableColumns]="tableColumns" [tableData]="formControl.value" />
  `,
})
export class StudentListComponent extends FormFieldComponent<Lesson['students']> {
  tableColumns: TableColumn<StudentLesson>[] = [
    fromGuiTableColumn(studentLessonGuiInfo.studentId),
    fromGuiTableColumn(studentLessonGuiInfo.done),
    fromGuiTableColumn(studentLessonGuiInfo.mark),
  ];
}
