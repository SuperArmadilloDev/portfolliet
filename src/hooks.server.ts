import type { Handle, MaybePromise, RequestEvent, ResolveOptions } from '@sveltejs/kit';
import { isValidTheme, isSupportedLocale, defaultLocale, supportedLocalesKeys, type Theme } from 'src/types';

export const handle: Handle = async ({event, resolve}: {
  event: RequestEvent,
  resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>
}) => {

  const theme  = event.cookies.get('theme') ?? 'auto';
  if (isValidTheme(theme)) event.locals.theme = theme;


  // let browserLocale = `${`${event.request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();

  // const localeInUrl = supportedLocalesKeys.find((l) => l === `${event.url.pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase());


  // if (!localeInUrl) {
  //   if(!isSupportedLocale(browserLocale)) browserLocale = defaultLocale;

  //   event.locals.locale = browserLocale;
  //   return new Response(undefined, { headers: { 'location': `/${browserLocale}${event.url.pathname}` }, status: 301 });
  // }

  // event.locals.locale = localeInUrl;


  return await resolve( event, {
		transformPageChunk: ({html}) =>
			html.replace('%THEME%', theme),
	});
};