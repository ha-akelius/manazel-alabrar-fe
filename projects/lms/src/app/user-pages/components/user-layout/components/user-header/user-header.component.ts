import { Component, EventEmitter, Output, Signal } from '@angular/core';
import { Student } from '@prisma/client';
import { translationKeys } from '../../../../../../../../../src/app/core/models/translations';
import { SharedModule } from '../../../../../../../../../src/app/core/modules/shared.module';
import { AuthService } from '../../../../../core/services/auth-service.service';
import { menus, userPageRouting } from '../../../../user-pages-routing';
import { UserStore } from '../../../../user-state';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();
  menus = menus;

  profilePath = userPageRouting.profile.path;

  translationKeys = translationKeys;
  student: Signal<Student>;

  constructor(
    private userStore: UserStore,
    private authenticationService: AuthService,
  ) {
    this.student = this.userStore.studnet;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  logout() {
    this.authenticationService.logOut();
  }
}
