import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Media } from '@prisma/client';
import { APIService } from '../../../core/services/api.service';
import { UploadService } from './../../service/upload.service';

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
    public uploadService: UploadService,
  ) {
    this.mediaToDelete = data;
  }

  apiService = inject(APIService);
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  confirmDelete() {
    this.apiService.media.delete(this.mediaToDelete.id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  confirmReplace() {
    this.fileInput.nativeElement.files = null;
    this.fileInput.nativeElement.click();
  }

  handleFileInput() {
    const files = this.fileInput.nativeElement.files;
    if (files && files.length > 0) {
      const newFile = files[0];
      this.uploadService.uploadFile(this.mediaToDelete.id, newFile).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
