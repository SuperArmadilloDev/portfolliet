/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { MaybePromise, NavigationEvent, RequestEvent, ResolveOptions } from '@sveltejs/kit';
import { defaultLocale, locales, setLocale, setRoute } from '$lib/i18n';
import type { Theme } from 'src/types';

export const isValidTheme = (theme: FormDataEntryValue | null): theme is Theme =>
  !! theme && (theme === 'light' || theme === 'dark' || theme === 'auto');

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({event, resolve}: {
  event: RequestEvent,
  resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>
}) => {
  const { url, request, cookies, locals } = event;
  const { pathname } = url;

  const theme = cookies.get('theme') ?? 'auto';

  if (isValidTheme(theme))
    locals.theme = theme;

  const supportedLocales = locales.get().map((l) => l.toLowerCase());

  let locale = supportedLocales.find((l) => l === `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase());

  if (!locale) {
    locale = `${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();

    if (!supportedLocales.includes(locale)) locale = defaultLocale;

    return new Response(undefined, { headers: { 'location': `/${locale}${pathname}` }, status: 301 });
  }

  return resolve({ ...event, locals: { lang: locale } }, {
    transformPageChunk: ({ html }) => html.replace(/<html.*>/, `<html lang="${locale} data-theme="${theme}">`),
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