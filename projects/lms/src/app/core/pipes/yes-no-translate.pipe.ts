import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translationKeys } from '../../../../../../src/app/core/models/translations';

@Pipe({
  standalone: true,
  name: 'yesNoTranslate',
})
export class YesNoTranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: boolean): string {
    return this.translate.instant(value ? translationKeys.yes : translationKeys.no);
  }
}
