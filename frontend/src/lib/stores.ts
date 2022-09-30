import { writable } from 'svelte/store';

const initialValue = '';
export const store_token = writable<string>(initialValue);