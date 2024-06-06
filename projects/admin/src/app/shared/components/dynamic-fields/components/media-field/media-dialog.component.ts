import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Media } from '@prisma/client';
import { Observable } from 'rxjs';
import { MediaComponent } from '../../../../../components/media/media.component';
import { translations } from './../../../../../translations/index';

@Component({
  standalone: true,
  template: `
    <h2 mat-dialog-title>{{ translations.choose }}</h2>
    <mat-dialog-content>
      <app-media [selectable]="true" (selected)="onSelected($event)" />
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>{{ translations.cancel }}</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MediaComponent],
})
export class MediaDialogComponent {
  public data: Media | null | undefined = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<MediaDialogComponent>);

  translations = translations.general;

  static openDialog(dialog: MatDialog, data: MediaDialogComponent['data']): Observable<Media | null> {
    return dialog.open(MediaDialogComponent, { data }).afterClosed();
  }

  onSelected(meida: Media) {
    this.dialogRef.close(meida);
  }
}
