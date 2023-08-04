import { derived } from 'svelte/store';
import type {Writable} from 'svelte/store';
// import type { Theme } from 'src/types';

export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

export const theme = derived(session)