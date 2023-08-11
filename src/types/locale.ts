import  {supportedLocales as suppLocales, defaultLocale as defLocale} from '$lib/translations/languages.json';

export const defaultLocale = defLocale;
export const supportedLocales = suppLocales;

export const supportedLocalesKeys = Object.keys(supportedLocales).map(l => l.toLocaleLowerCase());

export type SupportedLocale = (typeof supportedLocalesKeys)[number]

export const isSupportedLocale = (locale: unknown): locale is SupportedLocale =>
	typeof locale === 'string' && supportedLocalesKeys.includes(locale as SupportedLocale);