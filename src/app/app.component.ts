import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../projects/dz-translate/src/lib/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  dynamicKey = 'app.examples.dynamicKey';
  currentTranslationKey: string;

  constructor(private translateService: TranslateService) {

  }

  ngOnInit(): void {
    this.currentTranslationKey = this.translateService.getId();
  }

  setLanguageTo = (translationId: string) => {
    this.translateService.load(translationId).then((res) => {
      this.currentTranslationKey = this.translateService.getId();
      console.log(`new language: ${ this.currentTranslationKey }`);
    });
  };

}
