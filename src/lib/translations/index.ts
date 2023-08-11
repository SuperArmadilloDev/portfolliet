import i18n, { type Config } from 'sveltekit-i18n';
import { defaultLocale, supportedLocales } from './languages.json';
import * as fs from 'fs';
import * as path from 'path';
// import { fileURLToPath } from 'url';


type Loaders = {
  locale: string,
  key: string,
  loader: () => Promise<unknown>
}

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// function createLoaders() {
//   const loaders: Loaders[] = [];
//   Object.keys(supportedLocales).forEach(locale => {
//     const dirPath = path.resolve(__dirname, `./titi/${locale}`);
//     const files = fs.readdirSync(dirPath);

//   files.forEach(file => {
//         loaders.push({
//           locale,
//           key: file.replace('.json', ''),
//           /* @vite-ignore */
//           loader: async () => (await import(`./titi/${locale}/${file}`)).default,
//         });
//       }
//     );
//   });

//   return (loaders);
// }

// const config = {
//     fallbackLocale: defaultLocale,
//     translations: {...supportedLocales},
//     loaders: createLoaders()
// };


function getTranslation() {

  // eslint-disable-next-line
  const objectTest: any = {}; // type here is any because this variable must be of type: T<any, string>
  Object.keys(supportedLocales).forEach(key => {
    objectTest[`${key}`] = {supportedLocales};
  });
  return objectTest;
}

const config = {
  fallbackLocale: defaultLocale,
  translations: getTranslation(),
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

export const { t, locale, locales, loading, addTranslations, loadTranslations, translations, setRoute, setLocale } = new i18n(config);

// Translations logs
// loading.subscribe(async ($loading) => {
//     if ($loading) {
//       console.info('Loading translations...');

//       await loading.toPromise();
//       console.info('Updated translations', translations.get());
//     }
//   });