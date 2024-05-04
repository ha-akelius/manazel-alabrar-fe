import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Media, MediaFolder } from '@prisma/client';
import { APIService } from '../../../core/services/api.service';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule, MatCardModule],
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
  currentfolder: MediaFolder | null = null;
  path: MediaFolder[] = [];

  filteredMediaFolders: MediaFolder[] = [];
  filteredMedias: Media[] = [];

  apiService = inject(APIService);

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
  }

  navigateToParent(index: number): void {
    if (index >= 0 && index < this.path.length) {
      if (index > 0) {
        const parent = this.path[index - 1];
        this.filterMediaByParent(parent);
        this.path = this.path.slice(0, index);
      } else {
        this.path = [];
        this.getMediaFolders(null);
      }
    }
  }
}
