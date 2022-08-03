import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: { 
		port: 4200,
		host: 'localhost',
		proxy: {
			'/api/': 'http://localhost:8000/',
		}
	} 
	
};

export default config;
