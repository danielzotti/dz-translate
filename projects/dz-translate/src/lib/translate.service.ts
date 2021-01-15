import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITranslation, ICurrentLanguage, } from './translate.model';

@Injectable()
export class TranslateService {

  constructor(private http: HttpClient) {
  }

  public static URL: string = window.location.origin + '/assets/translations/';
  public static DEFAULT: string = 'it';
  public static TRANSLATION: string = 'translation';
  public static CURRENT_LANGUAGE: string = 'currentLanguage';


  public static getValue = (key: string) => {

    if (typeof key !== 'string') {
      return null;
    }

    const translationDb = localStorage.getItem(TranslateService.TRANSLATION);

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

    return text ? text : null;
  };

  public static hasTranslation = (key) => {
    return TranslateService.getValue(key) != null;
  };

  public static translate = (defaultValue: string, key: string) => {
    const translation = TranslateService.getValue(key);
    if (translation != null) {
      return translation;
    }
    return defaultValue;
  };

  public set = (translationId: string) => {
    this.http.get(TranslateService.URL + translationId + '.json')
      .subscribe((newTranslation: ITranslation) => {
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

  public getId = (): string => {

    const currentLanguage: string = localStorage.getItem(TranslateService.CURRENT_LANGUAGE);

    if (currentLanguage != null) {
      try {
        const language = JSON.parse(currentLanguage) as ICurrentLanguage;
        return typeof language.translationId === 'string' ? language.translationId : null;
      } catch(e) {
        console.log('[translate.service]', e);
      }
    }

    return null;
  };

  public load = (translationId: string = TranslateService.DEFAULT): Promise<boolean> => {
    return new Promise((resolve, reject) => {

      this.http.get(TranslateService.URL + translationId + '.json')
        .subscribe((newTranslation: ITranslation) => {
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

  private saveTranslation = (newTranslation: ITranslation) => {
    const newCurrentLanguage: ICurrentLanguage = {
      translationId: newTranslation.id,
      translationVersion: newTranslation.version
    };

    localStorage.setItem(TranslateService.TRANSLATION, JSON.stringify(newTranslation));
    localStorage.setItem(TranslateService.CURRENT_LANGUAGE, JSON.stringify(newCurrentLanguage));
  };
}
