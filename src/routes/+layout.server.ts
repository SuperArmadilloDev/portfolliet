/* eslint-disable @typescript-eslint/ban-ts-comment */
import { loadTranslations, translations } from '$lib/i18n';

/** @type {import('@sveltejs/kit').ServerLoad} */
export const load = async ({ url, locals }) => {
  const { pathname } = url;
  //@ts-ignore
  const { lang } = locals;

  const route = pathname.replace(new RegExp(`^/${lang}`), '');

  await loadTranslations(lang, route);

  return { i18n: { route, lang }, translations: translations.get() };
};