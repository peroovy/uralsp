import { browser } from '$app/env';
import { writable } from 'svelte/store';

const defaultValue = '';
const initialValue = browser ? window.localStorage.getItem('contest') ?? defaultValue : defaultValue;
export const contest = writable<string>(initialValue);

contest.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('contest', value);
    }
});

export { contest as default };