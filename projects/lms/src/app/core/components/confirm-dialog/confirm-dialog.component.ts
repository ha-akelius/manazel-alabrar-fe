import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { translationKeys } from '../../../../../../../src/app/core/models/translations';

export interface ConfirmDialogData {
  msg: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, TranslateModule],
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  translationKeys = translationKeys;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
