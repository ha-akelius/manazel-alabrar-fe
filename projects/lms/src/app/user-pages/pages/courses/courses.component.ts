import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BFF } from '../../models/schema-bff';
import { UserStore } from '../../user-state';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  @HostBinding('class') classes = 'cards';

  paths: BFF.myPaths.Path[];

  constructor(userStore: UserStore) {
    this.paths = userStore.studentResponse().data!.paths;
  }
}
