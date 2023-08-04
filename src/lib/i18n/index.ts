import i18n from 'sveltekit-i18n';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
const config = {
  fallbackLocale: 'en',
  translations: {
    en: { lang },
    fr: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'layout',
      loader: async () => (await import('./en/layout.json')).default,
    },
    {
      locale: 'fr',
      key: 'layout',
      loader: async () => (await import('./fr/layout.json')).default,
    },
  ]
};

export const defaultLocale = 'en';

export const { t, locale, locales, loading, addTranslations, loadTranslations, translations, setRoute, setLocale } = new i18n(config);

// Translations logs
loading.subscribe(async ($loading) => {
  if ($loading) {
    console.log('Loading translations...');

    await loading.toPromise();
    console.log('Updated translations', translations.get());
  }
});