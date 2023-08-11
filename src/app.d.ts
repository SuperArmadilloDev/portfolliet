// See https://kit.svelte.dev/docs/types#app

import type { Theme } from './types';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			locale: string,
			theme: Theme
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
