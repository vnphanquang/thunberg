import type {
  i18n,
  TFunction,
} from 'i18next';
import type {
  Writable,
  Readable
} from 'svelte/store';
import {
  writable,
  derived,
} from 'svelte/store';

import type { I18NLang } from '@thunberg/blog-i18n';

export class I18NService {
  public locale: Writable<I18NLang>;
  public t: Readable<TFunction>;

  constructor(i18n: i18n) {
    this.locale = this.createLocale(i18n);
    this.t = this.createTranslate(i18n);
  }

  private createLocale(i18n: i18n) {
    const { subscribe, set, update } = writable<I18NLang>(i18n.language as I18NLang);

    const setLocale = (value: I18NLang) => {
      i18n.changeLanguage(value);
      set(value);
    };

    const updateLocale = (updater: (value: I18NLang) => I18NLang) => {
      update(currentValue => {
        const nextLocale = updater(currentValue);
        i18n.changeLanguage(nextLocale);
        return nextLocale;
      });
    };

    return {
      subscribe,
      update: updateLocale,
      set: setLocale,
    };
  }

  private createTranslate(i18n: i18n) {
    return derived([this.locale], () => {
      return (...params: Parameters<TFunction>) => i18n.t(...params);
    });
  }
}
