import type { Handle, MaybePromise, RequestEvent, ResolveOptions } from '@sveltejs/kit';
import { isValidTheme } from 'src/types/theme';

export const handle: Handle = async (input) => {
  const {event, resolve} = input;

  const theme = event.cookies.get('theme') ?? 'auto';


  if (isValidTheme(theme)) event.locals.theme = theme;

  console.log(theme);
  return await resolve(event, {
		transformPageChunk: ({html}) =>
			html.replace('%THEME%', theme),
	});
};