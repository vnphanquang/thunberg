import type {
  i18n,
  TFunction,
} from 'i18next';
import type {
  Writable,
  Readable
} from 'svelte/store';

import type { I18NLang } from '@vnphanquang/i18n';

import { I18NService } from './service';

export type I18NContext = {
  t: Readable<TFunction>;
  locale: Writable<I18NLang>;
};

export function constructI18NContext(i18n: i18n): I18NContext {
  const i18nService = new I18NService(i18n);
  const context: I18NContext = {
    t: i18nService.t,
    locale: i18nService.locale,
  };
  return context;
}
