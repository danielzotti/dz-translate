import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { TranslateService } from './translate.service';

@Directive({ selector: '[dz-translate]' })
export class TranslateDirective implements OnChanges {
  @Input('dz-translate')
  key: string;

  @Input('dz-translate-target')
  target: string;

  value: string;

  constructor(private el: ElementRef, private translateService: TranslateService) {
    if(this.translateService.isContinuouslyCheckActive) {
      this.translateService.currentTranslationId$.subscribe(res => {
        this.activate();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.activate();
  }

  public activate = () => {
    const element: HTMLElement = this.el.nativeElement;

    const translation = this.translateService.translate(this.value, this.key);

    if (translation != null) {
      element.classList.add('pc-translate');

      if (typeof this.target !== 'undefined' && this.target != null) {
        element[this.target] = translation;
      } else {
        element.innerHTML = translation;
      }
    }
  };
}
