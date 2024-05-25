import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(data: ConfirmDialogData) {
    return this.dialog.open(ConfirmDialogComponent, { data });
  }
}
