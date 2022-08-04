import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: { 
		port: 4201,
		host: '127.0.0.1',
		proxy: {
			'/api/': 'http://localhost:8000/',
		}
	} 
	
};

export default config;
