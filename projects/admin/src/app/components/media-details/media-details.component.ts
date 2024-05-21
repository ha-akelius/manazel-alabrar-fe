import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Media } from '@prisma/client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media-dialog',
  standalone: true,
  imports: [MatDialogActions, MatButtonModule, MatDialogModule, MatInputModule, FormsModule],
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss',
})
export class MediaDialogComponent {
  mediaToDelete: Media;

  constructor(
    public dialogRef: MatDialogRef<MediaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; name: string },
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  static openDialog(data: { action: string; name: string }, dialog: MatDialog): Observable<string> {
    return dialog
      .open(MediaDialogComponent, {
        data,
        width: '300px',
      })
      .afterClosed();
  }
}
