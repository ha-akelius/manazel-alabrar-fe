import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';
import { getRouteParam } from '../core/utils/params';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    pathMatch: 'full',
    loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'callback/:provider',
    pathMatch: 'full',
    canMatch: [() => inject(AuthenticationService).saveToken(getRouteParam('provider') || 'google')],
    component: HomepageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomepageComponent,
    // redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule {}
