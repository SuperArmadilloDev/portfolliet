import type { Handle, MaybePromise, RequestEvent, ResolveOptions } from '@sveltejs/kit';
import { isValidTheme, isSupportedLocale, defaultLocale, supportedLocalesKeys } from 'src/types';

import {match} from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export const handle: Handle = async ({event, resolve}: {
  event: RequestEvent,
  resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>
}) => {

  const theme = event.cookies.get('theme') ?? 'auto';
  if (isValidTheme(theme)) event.locals.theme = theme;


  const languages = new Negotiator({
    headers: {'accept-language': event.request.headers.get('accept-language') || ''},
  }).languages();

  const browserLocale = event.cookies.get('locale') ?? match(languages, [...supportedLocalesKeys], defaultLocale);

  const localeInUrl = supportedLocalesKeys.find((l) => l === `${event.url.pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase());

  if (!localeInUrl)
    if(isSupportedLocale(browserLocale))
      return new Response(undefined, { headers: { 'location': `/${browserLocale}${event.url.pathname}` }, status: 301 });
    else
      return new Response(undefined, { status: 404, statusText: 'current language not found' });

  event.locals.locale = browserLocale;

  return await resolve(event, {
		transformPageChunk: ({html}) =>
			html.replace('%LANGUAGE%', browserLocale).replace('%THEME%', theme),
	});
};