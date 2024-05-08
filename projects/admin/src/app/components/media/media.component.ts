import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Media, MediaFolder, MediaType, Prisma } from '@prisma/client';
import { APIService } from '../../../core/services/api.service';
import { MediaDialogComponent } from '../media-details/media-details.component';
@Component({
  selector: 'app-media',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule, MatCardModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  currentfolder: MediaFolder | null = null;
  path: MediaFolder[] = [];
  activeFolder: MediaFolder | null = null;
  filteredMediaFolders: MediaFolder[] = [];
  filteredMedias: Media[] = [];

  apiService = inject(APIService);

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getMediaFolders(null);
  }

  getMediaFolders(parentId: number | null): void {
    this.apiService.mediaFolder
      .findAll({
        where: {
          parentId: parentId,
        },
      })
      .subscribe((results) => {
        this.filteredMediaFolders = results.items;
      });
  }

  getMediaFiles(parentId: number): void {
    this.apiService.media
      .findAll({
        where: {
          folderId: parentId,
        },
      })
      .subscribe((results) => {
        this.filteredMedias = results.items;
      });
  }

  filterMediaByParent(parent: MediaFolder): void {
    this.getMediaFiles(parent.id);
    this.getMediaFolders(parent.id);
    this.currentfolder = parent;
    this.path.push(parent);
  }

  onFolderClick(folder: MediaFolder): void {
    this.filterMediaByParent(folder);
    this.activeFolder = folder;
  }

  navigateToParent(index: number): void {
    this.activeFolder = null;
    if (index >= 0 && index < this.path.length) {
      if (index > 0) {
        const parent = this.path[index - 1];
        this.filterMediaByParent(parent);
        this.path = this.path.slice(0, index);
      } else {
        this.path = [];
        this.getMediaFolders(null);
        this.filteredMedias = [];
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadFile(event: any) {
    if (this.currentfolder?.id) {
      const files: File[] = event.target.files;

      if (files.length === 0) {
        return;
      }

      for (let i = 0; i < files.length; i++) {
        this.apiService.media.create(this.createMedia()).subscribe(
          (media) => this.uploadFile2(media, files[i]),
          (error) => console.error('Error creating media:', error),
        );
      }
    }
  }

  private uploadFile2(media: Media, file: File): void {
    console.log('Media created successfully:', media);

    const formData = new FormData();
    formData.append('files', file);

    this.http.post(`/api/media/upload/${media.id}`, formData).subscribe(
      () => {
        console.log('File uploaded successfully');
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
    );
  }

  private createMedia(): Prisma.MediaCreateInput {
    return {
      name: 'test',
      folderId: this.currentfolder!.id,
      folderName: this.currentfolder!.name,
      mimetype: '',
      type: MediaType.IMAGE,
      size: 123,
      url: '',
      ext: '',
    } as unknown as Prisma.MediaCreateInput;
  }

  openDialog(media: Media): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dialogRef = this.dialog.open(MediaDialogComponent, {
      width: '250px',
      data: media,
    });
  }
  fileName = '';
}
