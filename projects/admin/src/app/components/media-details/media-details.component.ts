import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Media } from '@prisma/client';
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
    @Inject(MAT_DIALOG_DATA) public data: { folderName: string },
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
