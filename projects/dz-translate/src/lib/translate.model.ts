export interface Translation {
  id: string;
  version: string;

  [t: string]: object | string;
}

export interface CurrentLanguage {
  translationId: string;
  translationVersion: string;
}

export interface TranslateConfiguration {
  url?: string;
  defaultTranslationKey?: string;
  localStorageTranslationKey?: string;
  localStorageCurrentLanguageKey?: string;
  isContinuouslyCheckActive?: boolean;
}
