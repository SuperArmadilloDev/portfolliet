// import i18n from 'sveltekit-i18n';
import { defaultLocale, supportedLocales } from './languages.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Cache from 'i18next-localstorage-cache';
import layoutFR from './fr/layout.json';
import layoutEN from './en/layout.json';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { createI18nStore, isLoading } from 'svelte-i18next';

console.log(layoutEN);
console.log(layoutFR);
console.table(Object.keys(supportedLocales));

i18next
.use(HttpBackend)
.use(LanguageDetector)
.init({
  detection: {
    order: ['querystring', 'localStorage', 'navigator'],
    caches: ['localStorage'],
    lookupQuerystring: 'lng',
    lookupLocalStorage: 'locale',
  },
  fallbackLng: 'en',
  // defaultNS: 'en',
  lng: 'en',
  // ns: Object.keys(supportedLocales),
  // ns: ['en', 'fr'],
  ns: 'layout',
  backend: {
    loadPath: '/src/lib/translations/{{lng}}/{{ns}}.json',
  },
  debug: true,
  // cleanCode: true,
  // resources: {
  //    en: {
  //     translation: {
  //       test: 'some doo doo'
  //     }
  //   },
  //    fr: {
  //     translation: {
  //       test: 'juif'
  //     }
  //   },
  //   //  fr: {...layoutFR}
  //  },
   interpolation: {
     escapeValue: false
   }
 });
 export const i18n = createI18nStore(i18next);
