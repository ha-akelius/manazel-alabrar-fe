import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../../../../../../../../src/app/core/modules/shared.module';
import { menus } from '../../../../user-pages-routing';

@Component({
  selector: 'app-user-sidenav-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-sidenav-list.component.html',
  styleUrls: ['./user-sidenav-list.component.scss'],
})
export class UserSidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  menus = menus;

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}
