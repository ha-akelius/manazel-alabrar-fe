import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getRouteUrl } from '../../../../src/app/core/models/route-info';
import { AuthService } from './core/services/auth-service.service';
import { UserLayoutComponent } from './user-pages/components/user-layout/user-layout.component';
import { CourseDetailComponent } from './user-pages/pages/course-detail/course-detail.component';
import { CoursesComponent } from './user-pages/pages/courses/courses.component';
import { LessonComponent } from './user-pages/pages/lesson/lesson.component';
import { LoginComponent } from './user-pages/pages/login/login.component';
import { PathComponent } from './user-pages/pages/path/path.component';
import { ProfileComponent } from './user-pages/pages/profile/profile.component';
import { QuizComponent } from './user-pages/pages/quiz/quiz.component';
import { QuizzesComponent } from './user-pages/pages/quizzes/quizzes.component';
import { UserHomepageComponent } from './user-pages/pages/user-homepage/user-homepage.component';
import { userPageRouting } from './user-pages/user-pages-routing';

const publicRoutes: Routes = [{ path: 'login', component: LoginComponent }];
const protectedRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthService],
    component: UserLayoutComponent,
    children: [
      { path: userPageRouting.home.path, component: UserHomepageComponent },
      { path: getRouteUrl(userPageRouting.course), component: CoursesComponent },
      { path: getRouteUrl(userPageRouting.profile), component: ProfileComponent },
      { path: getRouteUrl(userPageRouting.courseDetail), component: CourseDetailComponent },
      { path: getRouteUrl(userPageRouting.path), component: PathComponent },
      { path: getRouteUrl(userPageRouting.lesson), component: LessonComponent },
      { path: getRouteUrl(userPageRouting.quizzes), component: QuizzesComponent },
      { path: getRouteUrl(userPageRouting.quiz), component: QuizComponent },
    ],
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ar',
    pathMatch: 'full',
  },
  {
    path: ':language',
    resolve: {
      translate: (route: ActivatedRouteSnapshot) => {
        const language = route.params['language'];
        const translateService = inject(TranslateService);
        return translateService.use(language!);
      },
    },
    children: [...publicRoutes, ...protectedRoutes],
  },
];
