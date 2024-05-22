import { MediaType } from '@prisma/client';

export const mediaType: Record<MediaType, string> = {
  IMAGE: $localize`image`,
  VIDEO: $localize`video`,
  PDF: $localize`pdf`,
};
