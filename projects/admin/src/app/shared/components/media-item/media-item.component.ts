import { Component, Input } from '@angular/core';
import { Media } from '@prisma/client';
import { SafePipe } from '../../../pipes/safe.pipe';
import { translations } from '../../../translations';

@Component({
  selector: 'app-media-item',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './media-item.component.html',
  styleUrl: './media-item.component.scss',
})
export class MediaItemComponent {
  @Input() media: Media | null = null;
  translations = translations.general;

  isImage(media: Media) {
    return media.mimetype.startsWith('image/');
  }

  isPdf(media: Media) {
    return media.mimetype === 'application/pdf';
  }
}
