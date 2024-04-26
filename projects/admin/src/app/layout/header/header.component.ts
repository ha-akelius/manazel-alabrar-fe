import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatIconModule, CommonModule, MatToolbarModule, MatMenuModule],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  @Output() toggleSidebarForMe: EventEmitter<unknown> = new EventEmitter();

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }
}
