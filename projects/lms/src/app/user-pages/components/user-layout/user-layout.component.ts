import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { LoadingService } from '../../services/loading-service';
import { UserStore } from '../../user-state';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserSidenavListComponent } from './components/user-sidenav-list/user-sidenav-list.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [MatSidenavModule, RouterModule, CommonModule, UserSidenavListComponent, UserHeaderComponent],
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  providers: [UserStore],
})
export class UserLayoutComponent {
  student = inject(UserStore).studentResponse;
  loading = inject(LoadingService).loading;
}
