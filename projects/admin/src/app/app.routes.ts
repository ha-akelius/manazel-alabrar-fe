import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { FormPageComponent } from './shared/components/form-page/form-page.component';
import { ListPageComponent } from './shared/components/list-page/list-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list/:entityName', component: ListPageComponent },
  { path: 'edit/:entityName/:id', component: FormPageComponent },
  { path: 'create/:entityName', component: FormPageComponent },
  { path: 'dashboard', component: DashboardComponent },
];
