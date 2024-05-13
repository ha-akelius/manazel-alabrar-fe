import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Media, MediaFolder, MediaType, Prisma } from '@prisma/client';
import { switchMap } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { UploadService } from '../../service/upload.service';
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
  activatedFolder: MediaFolder | null = null;
  filteredMediaFolders: MediaFolder[] = [];
  filteredMedias: Media[] = [];
  fileName = '';
  apiService = inject(APIService);
  dialog = inject(MatDialog);
  uploadService = inject(UploadService);

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
  }

  onFolderClick(folder: MediaFolder): void {
    this.filterMediaByParent(folder);
    this.activatedFolder = folder;
    this.path.push(folder);
  }

  navigateToParent(index: number): void {
    this.activatedFolder = null;
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

  uploadFile(target: EventTarget | null) {
    if (target && target instanceof HTMLInputElement && this.currentfolder?.id) {
      const files = target.files;

      if (files?.length) {
        for (let i = 0; i < files.length; i++) {
          this.apiService.media
            .create(this.createMedia())
            .pipe(switchMap((media) => this.uploadService.uploadFile(media.id, files[i])))
            .subscribe(() => {
              this.filterMediaByParent(this.activatedFolder!);
            });
        }
      }
    }
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
    this.dialog.open(MediaDialogComponent, {
      width: '250px',
      data: media,
    });
  }
}
