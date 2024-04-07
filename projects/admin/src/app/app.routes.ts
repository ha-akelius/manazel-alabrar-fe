import { Routes } from '@angular/router';
import { AuthService } from './auth-service.service';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormPageComponent } from './shared/components/form-page/form-page.component';
import { ListPageComponent } from './shared/components/list-page/list-page.component';

const publicRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];
const protectedRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'app',
    canActivate: [AuthService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'list/:entityName', component: ListPageComponent },
      { path: 'edit/:entityName/:id', component: FormPageComponent },
      { path: 'create/:entityName', component: FormPageComponent },
    ],
  },
];

export const routes: Routes = [...publicRoutes, ...protectedRoutes];
