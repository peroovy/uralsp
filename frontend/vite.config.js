import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: { 
		port: 3000,
		host: '127.0.0.1',
	}
	
};

export default config;
