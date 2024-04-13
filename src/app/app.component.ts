import { Direction } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './core/modules/shared.module';
import { CheckVersionService } from './core/services/check-version.service';
import { IconService } from './core/services/icon.service';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SharedModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'manazel-alabrar-fe';
  direction: Direction = 'ltr';

  constructor(iconService: IconService, translateService: TranslateService, checkVersionService: CheckVersionService) {
    iconService.init();
    translateService.onLangChange.subscribe((e) => {
      this.direction = e.lang === 'ar' ? 'rtl' : 'ltr';
    });
    checkVersionService.checkVersion();
  }
}
