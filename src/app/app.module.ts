import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TranslateModule } from '../../projects/dz-translate/src/lib/translate.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultTranslationKey: 'it',
      localStorageCurrentLanguageKey: 'CUSTOM_CURRENT_LANGUAGE_KEY',
      localStorageTranslationKey: 'CUSTOM_TRANSLATION_KEY',
      isContinuouslyCheckActive: true,
      url: '/assets/my-translations/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
