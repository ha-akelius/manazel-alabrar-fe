import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Media, MediaFolder, MediaType, Prisma } from '@prisma/client';
import { switchMap } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { SafePipe } from '../../pipes/safe.pipe';
import { UploadService } from '../../service/upload.service';
import { MediaItemComponent } from '../../shared/components/media-item/media-item.component';
import { translations } from '../../translations';
import { MediaDialogComponent } from '../media-details/media-details.component';
@Component({
  selector: 'app-media',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MediaItemComponent,
    SafePipe,
  ],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  apiService = inject(APIService);
  uploadService = inject(UploadService);
  dialog = inject(MatDialog);
  sanitizer = inject(DomSanitizer);
  translations = translations.general;
  @ViewChild('fileReplaceInput') fileReplaceInput: ElementRef<HTMLInputElement>;
  @Input() selectable = false;
  @Output() selected = new EventEmitter<Media>();

  path: MediaFolder[] = [];
  currentFolder: MediaFolder | null = null;
  subFolders: MediaFolder[] = [];
  medias: Media[] = [];

  selectedMediaIds: number[] = [];
  currentMedia: Media;

  get deleteAllChecked() {
    return this.selectedMediaIds.length === this.medias.length;
  }

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
        this.subFolders = results.items;
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
        this.medias = results.items;
      });
  }

  filterMediaByParent(parent: MediaFolder): void {
    this.getMediaFiles(parent.id);
    this.getMediaFolders(parent.id);
    this.currentFolder = parent;
  }

  onFolderClick(folder: MediaFolder): void {
    this.filterMediaByParent(folder);
    this.path.push(folder);
  }

  navigateToParent(index: number): void {
    this.currentFolder = null;
    if (index >= 0 && index < this.path.length) {
      if (index > 0) {
        const parent = this.path[index - 1];
        this.filterMediaByParent(parent);
        this.path = this.path.slice(0, index);
      } else {
        this.path = [];
        this.getMediaFolders(null);
        this.medias = [];
      }
    }
  }

  uploadFile(target: EventTarget | null) {
    if (target && target instanceof HTMLInputElement && this.currentFolder?.id) {
      const files = target.files;

      if (files?.length) {
        for (let i = 0; i < files.length; i++) {
          this.apiService.media
            .create(this.createMedia())
            .pipe(switchMap((media) => this.uploadService.uploadFile(media.id, files[i])))
            .subscribe(() => {
              this.filterMediaByParent(this.currentFolder!);
            });
        }
      }
    }
  }

  private createMedia(): Prisma.MediaCreateInput {
    return {
      name: 'test',
      folderId: this.currentFolder?.id,
      folderName: this.currentFolder?.name,
      mimetype: '',
      type: MediaType.IMAGE,
      size: 123,
      url: '',
      ext: '',
    } as unknown as Prisma.MediaCreateInput;
  }
  confirmDelete(media: Media): void {
    this.apiService.media.delete(media.id).subscribe(() => {
      this.medias = this.medias.filter((item) => item.id !== media.id);
    });
  }

  confirmReplace(media: Media): void {
    this.fileReplaceInput.nativeElement.files = null;
    this.fileReplaceInput.nativeElement.click();
    this.currentMedia = media;
  }

  replaceFile(): void {
    const file = this.fileReplaceInput.nativeElement.files?.[0];
    this.uploadService.uploadFile(this.currentMedia.id, file!).subscribe(() => {
      this.filterMediaByParent(this.currentFolder!);
    });
  }

  addFolder(): void {
    MediaDialogComponent.openDialog({ action: $localize`add`, name: '' }, this.dialog).subscribe((result) => {
      if (result) {
        const newFolder = {
          name: result,
          parentId: this.currentFolder?.id,
          parentName: this.currentFolder?.name,
          createdDate: new Date(),
          updatedDate: new Date(),
          createdUserName: '',
          createdUserId: 0,
          updatedUserName: '',
          updatedUserId: 0,
        };

        this.apiService.mediaFolder.create(newFolder).subscribe(() => {
          this.getMediaFolders(this.currentFolder?.id || null);
        });
      }
    });
  }

  isSelected(mediaId: number): boolean {
    return this.selectedMediaIds.includes(mediaId);
  }

  toggleSelection(mediaId: number): void {
    if (this.isSelected(mediaId)) {
      this.selectedMediaIds = this.selectedMediaIds.filter((id) => id !== mediaId);
    } else {
      this.selectedMediaIds.push(mediaId);
    }
  }

  toggleDeleteAll(event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedMediaIds = this.medias.map((media) => media.id);
    } else {
      this.selectedMediaIds = [];
    }
  }

  deleteAll(): void {
    for (const mediaId of this.selectedMediaIds) {
      this.apiService.media.delete(mediaId).subscribe(() => {
        this.medias = this.medias.filter((item) => item.id !== mediaId);
      });
    }
    this.selectedMediaIds = [];
  }

  isFolderEmpty(folder: MediaFolder): boolean {
    return this.medias.every((media) => media.folderId !== folder.id);
  }

  deleteFolder(folder: MediaFolder): void {
    this.apiService.mediaFolder.delete(folder.id).subscribe(() => {
      this.getMediaFolders(this.currentFolder?.id || null);
    });
  }

  confirmSelect(media: Media): void {
    this.selected.emit(media);
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  renameFolder(folder: MediaFolder): void {
    MediaDialogComponent.openDialog({ action: $localize`rename`, name: folder.name }, this.dialog).subscribe(
      (newName) => {
        if (newName) {
          const updateData = { name: newName };
          this.apiService.mediaFolder.update(folder.id, updateData).subscribe(() => {
            window.location.reload();
          });
        }
      },
    );
  }
}
