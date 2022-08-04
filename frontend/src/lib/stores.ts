import { browser } from '$app/env';
import { writable } from 'svelte/store';

const defaultValue = '';
const initialValue = browser ? window.localStorage.getItem('contest') ?? defaultValue : defaultValue;
const initialValue2 = browser ? window.localStorage.getItem('search_params') ?? defaultValue : defaultValue;
export const contest = writable<string>(initialValue);
export const searchparams = writable<string>(initialValue2);

contest.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('contest', value);
    }
});
searchparams.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('search_params', value);
    }
});