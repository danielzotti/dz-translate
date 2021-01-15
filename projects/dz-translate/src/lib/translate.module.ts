import { NgModule, ModuleWithProviders, forwardRef, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { TranslateService } from './translate.service';
import { TranslateDirective } from './translate.directive';
import { TranslateContinuouslyPipe, TranslatePipe } from './translate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TranslateConfiguration } from './translate.model';


export function getTranslateServiceAndLoad(translate: TranslateService): () => Promise<boolean> {
  return () => translate.load();
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [
    TranslateDirective,
    TranslateContinuouslyPipe,
    TranslatePipe,
  ],
  exports: [
    TranslateDirective,
    TranslateContinuouslyPipe,
    TranslatePipe,
  ],
})

export class TranslateModule {
  static forRoot(configuration?: TranslateConfiguration): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: [
        TranslateService,
        {
          provide: APP_INITIALIZER,
          useFactory: getTranslateServiceAndLoad,
          deps: [TranslateService], multi: true
        },
        {
          provide: 'TRANSLATE_SERVITCE_CONFIG_TOKEN',
          useValue: configuration
        }
      ],
    };
  }

  static forFeature(configuration?: TranslateConfiguration): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forRoot(configuration);
  }
}

// The token that makes the raw options available to the following factory function.
// NOTE: This value has to be exported otherwise the AoT compiler won't see it.
// export const FOR_ROOT_CONFIGURATION_TOKEN = new InjectionToken<TranslateConfiguration>('forRoot() TranslateConfiguration');
