import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import \'./src/style/main.scss\';'
            }
        }
	},
	resolve: {
        alias: {
            src: path.resolve('src/'),
        },
    }
});
