import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckVersionService } from './core/services/check-version.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  title = 'lms';

  constructor(checkVersionService: CheckVersionService) {
    checkVersionService.checkVersion();
  }
}
