import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		// files: {
		// 	hooks:{
		// 		server: 'src/hooks/server/index.ts',
		// 		client: 'src/hooks/client/index'
		// 	},
		// }
	}
};

export default config;
