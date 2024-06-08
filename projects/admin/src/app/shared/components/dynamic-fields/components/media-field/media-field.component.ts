import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { Media } from '@prisma/client';
import { startWith } from 'rxjs';
import { FormComponent, NoopValueAccessorDirective } from '../../../../../../core/components/table/table';
import { APIService } from '../../../../../../core/services/api.service';
import { MediaItemComponent } from '../../../media-item/media-item.component';
import { translations } from './../../../../../translations/index';
import { MediaDialogComponent } from './media-dialog.component';

@Component({
  selector: 'app-media-field',
  standalone: true,
  hostDirectives: [NoopValueAccessorDirective],
  imports: [MediaItemComponent, MatButtonModule, MatLabel],
  template: `
    <mat-label>{{ propInfo.guiInfo.label }}</mat-label>
    <app-media-item [media]="media" />
    <button mat-raised-button color="primary" (click)="openMediaDialog()">{{ translations.choose }}</button>
  `,
  styles: [
    `
      :host,
      app-media-item {
        display: block;
      }
    `,
  ],
})
export class MediaFieldComponent extends FormComponent<number> implements OnInit {
  apiService = inject(APIService);
  dialog = inject(MatDialog);
  media: Media | null = null;
  translations = translations.general;

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(startWith(this.formControl.value)).subscribe((mediaId) => {
      if (mediaId) {
        this.apiService.media.findOne(mediaId).subscribe((media) => {
          this.media = media;
        });
      }
    });
  }

  openMediaDialog(): void {
    MediaDialogComponent.openDialog(this.dialog, this.media).subscribe((media) => {
      if (media) {
        this.media = media;
        this.formControl.setValue(media.id);
        this.getNameControl()?.setValue(media.name);
        this.getUrlControl()?.setValue(media.url);
      }
    });
  }

  private getNameControl(): AbstractControl | null | undefined {
    const nameKey = this.propInfo.propInformation.basic.name.replace('Id', 'Name');
    return this.parentFormGroup?.get(nameKey);
  }

  private getUrlControl(): AbstractControl | null | undefined {
    const nameKey = this.propInfo.propInformation.basic.name.replace('Id', 'Url');
    return this.parentFormGroup?.get(nameKey);
  }
}
