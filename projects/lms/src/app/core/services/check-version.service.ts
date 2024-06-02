import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { translationKeys } from '../../../../../../src/app/core/models/translations';

@Injectable({
  providedIn: 'root',
})
export class CheckVersionService {
  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {}

  checkVersion() {
    if (!this.swUpdate.isEnabled) {
      // this.showSnack();
      return;
    }

    this.swUpdate.versionUpdates.pipe(filter((v) => v.type === 'VERSION_READY')).subscribe(() => this.showSnack());
  }

  private showSnack() {
    const snackBarRef = this.snackBar.open(
      this.translateService.instant(translationKeys.new_version.msg),
      this.translateService.instant(translationKeys.new_version.update_now),
      {
        duration: 10000,
      },
    );
    snackBarRef.onAction().subscribe(() => location.reload());
  }
}
