import { fail, type Actions } from '@sveltejs/kit';
import { isValidTheme, isSupportedLocale } from 'src/types';

const TEN_YEARS_IN_SECONDS = 10 * 365 * 24 * 60 * 60;

export const actions: Actions = {
  theme: async ({ cookies, request }) => {
    const data = await request.formData();
    const theme = data.get('theme') as string;

    if (!isValidTheme(theme))
      return fail(400, { theme, missing: true });

    cookies.set('theme', theme, { path: '/', maxAge: TEN_YEARS_IN_SECONDS });

    return { success: true };
  },
  locale: async ({ cookies, request }) => {
    const data = await request.formData();
    const locale = data.get('locale');
    if (!isSupportedLocale(locale))
      return fail(400, { locale, missing: true });

    cookies.set('locale', locale as string, { path: '/', maxAge: TEN_YEARS_IN_SECONDS });

    return { success: false };
  },
};