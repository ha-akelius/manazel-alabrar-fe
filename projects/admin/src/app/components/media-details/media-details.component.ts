import { Component, Inject, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Media } from '@prisma/client';
import { APIService } from '../../../core/services/api.service';

@Component({
  selector: 'app-media-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.scss',
})
export class MediaDialogComponent {
  mediaToDelete: Media;

  constructor(
    public dialogRef: MatDialogRef<MediaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Media,
  ) {
    this.mediaToDelete = data;
    console.log(data);
  }

  apiService = inject(APIService);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ViewChild('fileInput') fileInput: any;
  confirmDelete() {
    this.apiService.media.delete(this.mediaToDelete.id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  confirmReplace() {
    this.fileInput.nativeElement.value = null;
    this.fileInput.nativeElement.click();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFileInput(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFile = files[0];

      this.apiService.media.update(this.mediaToDelete.id, newFile).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
