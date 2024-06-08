import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth-service.service';
import { translations } from '../../translations';
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatIconModule, CommonModule, MatToolbarModule, MatMenuModule, RouterModule],
})
export class HeaderComponent {
  translations = translations.general;
  authService = inject(AuthService);

  @Output() toggleSidebarForMe: EventEmitter<unknown> = new EventEmitter();

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(): void {
    this.authService.logOut();
  }
}
