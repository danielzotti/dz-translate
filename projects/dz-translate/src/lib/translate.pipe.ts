import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

/*
 * Usage -> value | translate:'key'
*/
@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
  transform(value: string, key: string): string {
    return TranslateService.translate(value, key);
  }
}
