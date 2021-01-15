import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

/*
 * Usage -> value | translate:'key'
*/
@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
  }

  transform(value: string, key: string): string {
    return this.translateService.translate(value, key);
  }
}

@Pipe({ name: 'translateContinuously', pure: false })
export class TranslateContinuouslyPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
  }

  transform(value: string, key: string): string {
    return this.translateService.translate(value, key);
  }
}
