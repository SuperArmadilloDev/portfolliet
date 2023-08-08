import  {supportedLocales as suppLocales, defaultLocale as defLocale} from '$lib/translations/languages.json';

export const defaultLocale = defLocale;
export const supportedLocales = suppLocales;

export type SupportedLocale = (typeof supportedLocales)[number]


export const isSupportedLocale = (locale: unknown): locale is SupportedLocale =>
	typeof locale === 'string' && supportedLocales.includes(locale as SupportedLocale);