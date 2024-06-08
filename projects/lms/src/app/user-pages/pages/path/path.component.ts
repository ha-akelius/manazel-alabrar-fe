import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { translationKeys } from '../../../../../../../src/app/core/models/translations';
import { md } from '../../../../../../../src/app/utils/markdown.utils';
import { ConfirmDialogService } from '../../../core/components/confirm-dialog/confirm-dialog.service';
import { LoadingService } from '../../services/loading-service';
import { UserStore } from '../../user-state';

@Component({
  selector: 'app-path',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss'],
})
export class PathComponent implements OnInit {
  @HostBinding('class') classes = 'cards';

  openPathResponse = this.userStore.openPathsResponse;

  translationKeys = translationKeys;
  error: { message: string } | undefined;

  constructor(
    private userStore: UserStore,
    private confirmDialogService: ConfirmDialogService,
    public loadingService: LoadingService,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.userStore.loadOpenPaths();
  }

  getDescription(description: string) {
    return md.parse(description);
  }

  register(pathId: number) {
    this.confirmDialogService
      .openDialog({ msg: this.translateService.instant(this.translationKeys.path.register_confirm) })
      .afterClosed()
      .subscribe((accepted) => {
        if (accepted) {
          this.userStore.register(pathId).subscribe((response) => {
            if (response) {
              this.userStore.resetStudent();
              this.userStore.loadOpenPaths();
              this.snackBar.open(this.translateService.instant(translationKeys.path.register_done));
            }
          });
        }
      });
  }
}
