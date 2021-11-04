import type { i18n, InitOptions } from 'i18next';

import { deepmerge } from '@vnphanquang/common';

import * as ENError from "./locales/en/error.json";
import * as ENPlaceholder from "./locales/en/placeholder.json";
import * as ENValidation from "./locales/en/validation.json";
import { I18NLang, I18NS } from './constants';

// TODO: Extend && Optimize
// 1. Auto-detect browser language: i18next-browser-languagedetector
// 2. Lazy-load resources & namespaces from either main process or backend

const defaultInitOptions: InitOptions = {
  fallbackLng: I18NLang.en,
  // debug: false,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
};

export function initI18N(
  i18nInstance: i18n,
  initOptions: InitOptions = {}
): void {
  i18nInstance.init(deepmerge(defaultInitOptions, initOptions));
}

export function initI18NVnphanquang(
  i18nInstance: i18n,
  initOptions: InitOptions = {}
): void {
  initI18N(
    i18nInstance,
    deepmerge(
      {
        ns: Object.values(I18NS),
        resources: {
          [I18NLang.en]: {
            [I18NS.Validation]: ENValidation,
            [I18NS.Placeholder]: ENPlaceholder,
            [I18NS.Error]: ENError,
          },
        },
      },
      initOptions
    )
  );
}
