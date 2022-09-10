import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
//import { vite } from 'vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		browser: true,
	}),
	
	kit: {
		adapter: adapter({
			fallback: 'index.html',
		})
	}
};

export default config;
