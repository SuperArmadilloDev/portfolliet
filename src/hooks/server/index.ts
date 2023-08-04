/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { MaybePromise, NavigationEvent, RequestEvent, ResolveOptions } from '@sveltejs/kit';
import { defaultLocale, locales, setLocale, setRoute } from 'src/lib/i18n';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({event, resolve}: {
  event: RequestEvent,
  resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>
}) => {
  const { url, request } = event;
  const { pathname } = url;

  // Get defined locales
  const supportedLocales = locales.get().map((l) => l.toLowerCase());

  // Try to get locale from `pathname`.
  let locale = supportedLocales.find((l) => l === `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase());

  // If route locale is not supported
  if (!locale) {
    // Get user preferred locale
    locale = `${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();

    // Set default locale if user preferred locale does not match
    if (!supportedLocales.includes(locale)) locale = defaultLocale;

    // 301 redirect
    return new Response(undefined, { headers: { 'location': `/${locale}${pathname}` }, status: 301 });
  }

  // Add html `lang` attribute
  return resolve({ ...event, locals: { lang: locale } }, {
    transformPageChunk: ({ html }) => html.replace(/<html.*>/, `<html lang="${locale}">`),
  });
};

/** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError = async ({event, error}: {event: NavigationEvent, error: unknown}) => {
  // eslint-disable-next-line no-console
  console.error(error);
  // @ts-ignore
  const { locals } = event;


  const { lang } = locals;

  await setLocale(lang);
  await setRoute('error');

  return locals;
};