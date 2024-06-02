import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PathInstance } from '@prisma/client';
import { UserStore } from '../../user-state';
import { CourseFE } from './../../services/student.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  @HostBinding('class') classes = 'cards';

  paths: PathInstance[];
  courses: CourseFE[];

  constructor(userStore: UserStore) {
    this.paths = userStore.currentPathesResponse();
    this.courses = userStore.studentCoursesResponse();
  }
}
