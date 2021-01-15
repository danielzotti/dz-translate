import { NgModule, ModuleWithProviders, forwardRef, APP_INITIALIZER } from '@angular/core';
import { TranslateService } from './translate.service';
import { TranslateDirective } from './translate.directive';
import { TranslatePipe } from './translate.pipe';
import { HttpClientModule } from '@angular/common/http';


export function getTranslateServiceAndLoad(translate: TranslateService): () => Promise<boolean> {
  return () => translate.load();
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    TranslateDirective,
    TranslatePipe,
  ],
  exports: [
    TranslateDirective,
    TranslatePipe,
  ],
})

export class TranslateModule {
  static forRoot(): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: [
        forwardRef(() => TranslateService),
        {
          provide: APP_INITIALIZER,
          useFactory: getTranslateServiceAndLoad,
          deps: [TranslateService], multi: true
        },
      ],
    };
  }
}
