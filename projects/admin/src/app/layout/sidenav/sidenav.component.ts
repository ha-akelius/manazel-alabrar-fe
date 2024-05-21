import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { courseInstanceSchema } from '../../../models/gui-info/course-instance.gui-info';
import { courseSchema } from '../../../models/gui-info/course.gui-info';
import { pathInstanceSchema } from '../../../models/gui-info/path-instance.gui-info';
import { pathSchema } from '../../../models/gui-info/path.gui-info';
import { userSchema } from '../../../models/gui-info/user.gui-info';

interface MenuItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatIconModule, MatListModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  menuItems: MenuItem[] = [
    { label: pathSchema.label, path: '/list/path' },
    { label: pathInstanceSchema.label, path: '/list/pathinstance' },
    { label: courseSchema.label, path: '/list/course' },
    { label: courseInstanceSchema.label, path: '/list/courseinstance' },
    { label: userSchema.label, path: '/list/user' },
  ];
}
