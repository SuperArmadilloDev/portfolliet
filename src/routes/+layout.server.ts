import { loadTranslations, translations } from 'src/lib/translations';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({url, locals}) => {
	const { theme, locale } = locals;
	const { pathname } = url;
	const route = pathname.replace(new RegExp(`^/${locale}`), '');

	await loadTranslations(locale, route);

	return {
		theme,
		i18n: {route, locale}, translations: translations.get()
	};
};