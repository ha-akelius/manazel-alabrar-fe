import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableColumn } from '../../../core/components/table/table';
import { ColumnDefinitionDirective, TableComponent } from '../../../core/components/table/table.component';
import { translationKeys } from '../../../core/models/translations';
import { YesNoTranslatePipe } from '../../../core/pipes/yes-no-translate.pipe';
import { getUserRouteInfo, userPageRouting } from '../../user-pages-routing';

interface LessonRow {
  title: string;
  done: string;
  present: string;
  mark: string;
  date: string;
  lessonId: number;
}

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    ColumnDefinitionDirective,
    MatTableModule,
    TranslateModule,
    RouterModule,
    DatePipe,
    YesNoTranslatePipe,
  ],
  providers: [YesNoTranslatePipe],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent {
  private translate = inject(TranslateService);

  translationKeys = translationKeys;
  lessonRouter = userPageRouting.lesson.path;

  routeInfo = getUserRouteInfo();
  pathId = this.routeInfo.pathId;
  courseId = this.routeInfo.courseId;
  course = this.routeInfo.course;
  lessons: LessonRow[] = this.course?.lessons!.map((l, i) => ({
    title: l.title,
    done: this.yesNoTranslatePipe.transform(l.done),
    present: this.yesNoTranslatePipe.transform(l.present),
    mark: l.mark !== undefined ? `${l.mark} ${this.translate.instant(translationKeys.from)} ${l.questions.length}` : '',
    date: this.datePipe.transform(l.date, 'YYYY-dd-MM')!,
    lessonId: i,
  }));

  ordersTableColumns: TableColumn<LessonRow>[] = this.initializeColumns();

  constructor(
    private datePipe: DatePipe,
    private yesNoTranslatePipe: YesNoTranslatePipe,
  ) {}

  initializeColumns(): TableColumn<LessonRow>[] {
    return [
      {
        name: translationKeys.lesson,
        dataKey: 'title',
        position: 'left',
      },
      {
        name: translationKeys.lesson_finished,
        dataKey: 'done',
      },
      {
        name: translationKeys.lesson_present,
        dataKey: 'present',
      },
      {
        name: translationKeys.lesson_mark,
        dataKey: 'mark',
      },
      {
        name: translationKeys.date,
        dataKey: 'date',
      },
    ];
  }
}
