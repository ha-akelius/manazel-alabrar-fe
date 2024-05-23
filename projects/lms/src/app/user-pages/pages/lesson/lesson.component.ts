import { Component, ElementRef, HostBinding, Inject, OnInit, inject } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { translationKeys } from '../../../../../../../src/app/core/models/translations';
import { SharedModule } from '../../../../../../../src/app/core/modules/shared.module';
import { ExamComponent, ExamResult } from '../../../core/components/exam/exam.component';
import { SafePipe } from '../../../core/pipes/safe-url.pipe';
import { BFF } from '../../models/schema-bff';
import { StudentService } from '../../services/student.service';
import { getUserRouteInfo } from '../../user-pages-routing';
import { UserStore } from '../../user-state';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [SharedModule, ExamComponent, SafePipe, NgxExtendedPdfViewerModule],
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  private userStore = inject(UserStore);
  private studentService = inject(StudentService);

  @HostBinding('class') class = 'page';

  routeInfo = getUserRouteInfo();
  lesson = this.routeInfo.lesson!;
  course = this.routeInfo.course;

  pdfUrl = '';

  translationKeys = translationKeys;
  elem: any;

  constructor(
    @Inject(DOCUMENT) private document: any,
    public element: ElementRef<Element>,
  ) {}

  ngOnInit() {
    setTimeout(async () => {
      if (this.course.book) {
        const pdfBlob = await fetch(this.course.book!).then((r) => r.blob());
        this.pdfUrl = URL.createObjectURL(pdfBlob);
      }
    }, 300);
  }

  toggleFullScreen() {
    this.elem = this.element.nativeElement.querySelector('ngx-extended-pdf-viewer');
    if (document.fullscreenElement !== null) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
  }
  finishLesson(finished: boolean) {
    const sudentQuizBody: BFF.StudentLessonBody = {
      courseId: this.routeInfo.course.id,
      lessonId: this.routeInfo.lessonId,
      done: finished,
    };
    this.studentService.finishLesson(sudentQuizBody).subscribe();
  }

  finishExam(mark: ExamResult) {
    this.lesson.mark = mark.mark;
    const sudentQuizBody: BFF.StudentLessonBody = {
      courseId: this.routeInfo.course.id,
      lessonId: this.routeInfo.lessonId,
      mark: mark.mark,
      answeredOptions: mark.answeredOptions,
    };
    this.studentService.finishExam(sudentQuizBody).subscribe((s) => {});
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}
