import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Translation, CurrentLanguage, TranslateConfiguration, } from './translate.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TranslateService {

  constructor(@Inject('TRANSLATE_SERVITCE_CONFIG_TOKEN') private config: TranslateConfiguration, private http: HttpClient) {

  }

  url: string = this.config?.url || window.location.origin + '/assets/my-translations/';
  defaultTranslationKey: string = this.config?.defaultTranslationKey || 'it';
  localStorageTranslationKey: string = this.config?.localStorageTranslationKey || 'dz-translate_translation';
  localStorageCurrentLanguageKey: string = this.config?.localStorageCurrentLanguageKey || 'dz-translate_currentLanguage';
  isContinuouslyCheckActive: boolean = this.config?.isContinuouslyCheckActive || false;

  currentTranslationId$: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTranslationKey);

  memo: { [props: string]: string; } = {};

  getValue = (key: string) => {

    if (typeof key !== 'string') {
      return null;
    }

    if (key && key in this.memo) {
      return this.memo[key];
    }

    const translationDb = localStorage.getItem(this.localStorageTranslationKey);

    if (translationDb == null) {
      return null;
    }

    let translationModel = null;

    try {
      translationModel = JSON.parse(translationDb);
    } catch(ex) {
      console.log('[translate.service]', ex);
    }

    if (translationModel == null) {
      return null;
    }

    const text = key.split('.').reduce((o, i) => {
      return (o !== undefined && o !== null) ? o[i] : null;
    }, translationModel);
    this.memo[key] = text;
    return text ? text : null;
  };

  hasTranslation = (key) => {
    return this.getValue(key) != null;
  };

  translate = (defaultValue: string, key: string) => {
    const translation = this.getValue(key);
    if (translation != null) {
      return translation;
    }
    return defaultValue;
  };

  set = (translationId: string) => {
    this.http.get(this.url + translationId + '.json')
      .subscribe((newTranslation: Translation) => {
          this.saveTranslation(newTranslation);
        },
        (res) => {
          console.error('There is a problem on setting the translation');
        },
        () => {
          window.location.reload();
        }
      );
  };

  getId = (): string => {

    const currentLanguage: string = localStorage.getItem(this.localStorageCurrentLanguageKey);

    if (currentLanguage != null) {
      try {
        const language = JSON.parse(currentLanguage) as CurrentLanguage;
        return typeof language.translationId === 'string' ? language.translationId : null;
      } catch(e) {
        console.log('[translate.service]', e);
      }
    }

    return null;
  };

  load = (translationId: string = this.defaultTranslationKey): Promise<boolean> => {
    return new Promise((resolve, reject) => {

      this.http.get(this.url + translationId + '.json')
        .subscribe((newTranslation: Translation) => {
            this.saveTranslation(newTranslation);
            resolve(true);
          },
          (res) => {
            console.error('There is a problem with the translation file');
            resolve(true);
          }
        );

    });
  };

  private saveTranslation = (newTranslation: Translation) => {
    const newCurrentLanguage: CurrentLanguage = {
      translationId: newTranslation.id,
      translationVersion: newTranslation.version
    };

    localStorage.setItem(this.localStorageTranslationKey, JSON.stringify(newTranslation));
    localStorage.setItem(this.localStorageCurrentLanguageKey, JSON.stringify(newCurrentLanguage));
    this.memo = {};
    this.currentTranslationId$.next(newTranslation.id);
  };
}
