import type { Theme } from 'src/types';
import {writable} from 'svelte/store';

export const theme = writable<Theme>();