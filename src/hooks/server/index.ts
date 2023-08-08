import type { Handle } from '@sveltejs/kit';
import { isValidTheme, defaultLocale, isSupportedLocale, supportedLocales } from 'src/types';

import {match} from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export const handle: Handle = async (input) => {
  const {event, resolve} = input;

  const theme = event.cookies.get('theme') ?? 'auto';
  if (isValidTheme(theme)) event.locals.theme = theme;

  const languages = new Negotiator({
    headers: {'accept-language': event.request.headers.get('accept-language') || ''},
  }).languages();

  const locale = event.cookies.get('locale') ?? match(languages, [...supportedLocales], defaultLocale);

  if (isSupportedLocale(locale)) {
    event.locals.locale = locale;
    // event.locals.dictionary = (await import(`./dictionaries/${locale}.json`)).default;
  }

  return await resolve(event, {
		transformPageChunk: ({html}) =>
			html.replace('%LANGUAGE%', locale).replace('%THEME%', theme),
	});
};